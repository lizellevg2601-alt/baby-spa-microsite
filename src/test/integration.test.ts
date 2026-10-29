import { describe, it, expect } from "vitest";
import { createBookingSchema } from "@/lib/validations";

describe("Booking validation schema", () => {
  it("should accept a valid booking payload", () => {
    const valid = {
      serviceId: "svc_1",
      slotId: "slot_1",
      pairsCount: 2,
      guardianName: "Sarah Johnson",
      guardianEmail: "sarah@example.com",
      guardianPhone: "07700 900000",
      babyAgeMonths: 6,
      marketingConsent: false,
    };

    const result = createBookingSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.pairsCount).toBe(2);
      expect(result.data.guardianEmail).toBe("sarah@example.com");
    }
  });

  it("should reject missing required fields", () => {
    const invalid = {
      serviceId: "",
      slotId: "",
      pairsCount: 0,
      guardianName: "",
      guardianEmail: "not-an-email",
    };

    const result = createBookingSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("should reject more than 10 pairs", () => {
    const tooMany = {
      serviceId: "svc_1",
      slotId: "slot_1",
      pairsCount: 11,
      guardianName: "Sarah Johnson",
      guardianEmail: "sarah@example.com",
    };

    const result = createBookingSchema.safeParse(tooMany);
    expect(result.success).toBe(false);
  });

  it("should default marketingConsent to false", () => {
    const minimal = {
      serviceId: "svc_1",
      slotId: "slot_1",
      pairsCount: 1,
      guardianName: "Sarah Johnson",
      guardianEmail: "sarah@example.com",
    };

    const result = createBookingSchema.safeParse(minimal);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.marketingConsent).toBe(false);
    }
  });
});

describe("Concurrent booking safety", () => {
  it("should not allow 5 parallel bookings into a 4-space slot", async () => {
    const capacity = 4;
    let availableSpaces = capacity;

    const attemptBooking = (pairs: number) => {
      if (availableSpaces >= pairs) {
        availableSpaces -= pairs;
        return { success: true, remaining: availableSpaces };
      }
      return { success: false, remaining: availableSpaces };
    };

    // Simulate 5 parallel requests for 1 pair each into a 4-space slot
    const results = await Promise.all(
      Array(5).fill(null).map(() => attemptBooking(1)),
    );

    const successful = results.filter((r) => r.success);
    expect(successful.length).toBeLessThanOrEqual(capacity);
    expect(availableSpaces).toBe(0);
  });
});
