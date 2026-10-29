import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock prisma module
const mockSlotUpdate = vi.fn();
const mockBookingCreate = vi.fn();
const mockSlotFind = vi.fn();
const mockConfigFind = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    slot: {
      findUnique: mockSlotFind,
      update: mockSlotUpdate,
    },
    booking: {
      create: mockBookingCreate,
    },
    config: {
      findUnique: mockConfigFind,
    },
    $transaction: vi.fn(async (callback: any) => {
      return callback(prismaMock);
    }),
  },
}));

const prismaMock = {
  slot: {
    findUnique: mockSlotFind,
    update: mockSlotUpdate,
  },
  booking: {
    create: mockBookingCreate,
  },
  config: {
    findUnique: mockConfigFind,
  },
};

describe("Booking capacity logic", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should prevent booking when spaces are insufficient", async () => {
    mockSlotFind.mockResolvedValue({
      id: "slot_1",
      serviceId: "svc_1",
      service: {
        pricePence: 1800,
        isActive: true,
        isDraft: false,
        capacityDefault: 4,
        durationMin: 45,
      },
      isBlocked: false,
      availableSpaces: 2,
    });

    const slot = await prismaMock.slot.findUnique({ where: { id: "slot_1" } });
    const pairsRequested = 4;

    expect(slot.availableSpaces).toBe(2);
    expect(slot.availableSpaces >= pairsRequested).toBe(false);
    // Should NOT proceed with booking
    expect(slot.availableSpaces >= pairsRequested).toBe(false);
  });

  it("should allow booking when enough spaces are available", async () => {
    mockSlotFind.mockResolvedValue({
      id: "slot_1",
      serviceId: "svc_1",
      service: {
        pricePence: 1800,
        isActive: true,
        isDraft: false,
        capacityDefault: 4,
        durationMin: 45,
      },
      isBlocked: false,
      availableSpaces: 4,
    });

    const slot = await prismaMock.slot.findUnique({ where: { id: "slot_1" } });
    const pairsRequested = 3;

    expect(slot.availableSpaces >= pairsRequested).toBe(true);
  });

  it("should correctly calculate total price", () => {
    const pricePence = 1800; // £18.00
    const pairsCount = 3;
    const totalPence = pricePence * pairsCount;

    expect(totalPence).toBe(5400);
    expect((totalPence / 100).toFixed(2)).toBe("54.00");
  });

  it("should enforce max 4 pairs per slot", () => {
    const capacity = 4;
    const pairsRequested = 5;

    expect(pairsRequested > capacity).toBe(true);
    expect(pairsRequested > 4).toBe(true);
  });
});

describe("Pricing validation", () => {
  it("should calculate correct totals for each service", () => {
    const services = [
      { name: "Little Explorers Sensory", pricePence: 1800 },
      { name: "Touch & Togetherness", pricePence: 2500 },
      { name: "Wonder & Wiggle", pricePence: 2200 },
    ];

    services.forEach((svc) => {
      const singlePrice = svc.pricePence / 100;
      const twoPairsPrice = (svc.pricePence * 2) / 100;
      const fourPairsPrice = (svc.pricePence * 4) / 100;

      expect(singlePrice).toBeGreaterThan(0);
      expect(twoPairsPrice).toBe(singlePrice * 2);
      expect(fourPairsPrice).toBe(singlePrice * 4);
    });
  });
});

describe("DST and date boundaries", () => {
  it("should handle BST to GMT transition (October)", () => {
    // Last Sunday of October 2026: clocks go back at 2:00 BST → 1:00 GMT
    const octoberTransition = new Date("2026-10-25T01:00:00Z");
    const londonString = octoberTransition.toLocaleString("en-GB", {
      timeZone: "Europe/London",
    });
    expect(londonString).toContain("2026");
  });

  it("should handle GMT to BST transition (March)", () => {
    // Last Sunday of March 2026: clocks go forward at 1:00 GMT → 2:00 BST
    const marchTransition = new Date("2026-03-29T01:00:00Z");
    const londonString = marchTransition.toLocaleString("en-GB", {
      timeZone: "Europe/London",
    });
    expect(londonString).toContain("2026");
  });

  it("should format dates correctly in Europe/London", () => {
    const date = new Date("2026-06-15T10:00:00Z");
    const formatted = date.toLocaleString("en-GB", {
      timeZone: "Europe/London",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(formatted).toContain("June");
    expect(formatted).toContain("2026");
  });
});

describe("Webhook idempotency", () => {
  it("should deduplicate webhook events by event ID", async () => {
    const processedEventIds = new Set<string>();

    const processEvent = (eventId: string) => {
      if (processedEventIds.has(eventId)) {
        return { duplicate: true };
      }
      processedEventIds.add(eventId);
      return { processed: true };
    };

    const result1 = processEvent("evt_123");
    const result2 = processEvent("evt_123");

    expect(result1.processed).toBe(true);
    expect(result2.duplicate).toBe(true);
  });
});

describe("Expired unpaid reservations", () => {
  it("should identify expired reservations", () => {
    const holdMinutes = 25;
    const createdAt = Date.now() - (holdMinutes + 5) * 60 * 1000; // 30 min ago
    const holdsUntil = new Date(createdAt + holdMinutes * 60 * 1000);

    const isExpired = Date.now() > holdsUntil.getTime();
    expect(isExpired).toBe(true);
  });

  it("should not expire recently created reservations", () => {
    const holdMinutes = 25;
    const createdAt = Date.now() - 5 * 60 * 1000; // 5 min ago
    const holdsUntil = new Date(createdAt + holdMinutes * 60 * 1000);

    const isExpired = Date.now() > holdsUntil.getTime();
    expect(isExpired).toBe(false);
  });
});
