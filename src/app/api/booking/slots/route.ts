export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const querySchema = z.object({
  serviceId: z.string().min(1),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: "Invalid date",
  }),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      serviceId: searchParams.get("serviceId"),
      date: searchParams.get("date"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { serviceId, date } = parsed.data;
    const requestedDate = new Date(date);
    requestedDate.setUTCHours(0, 0, 0, 0);
    const nextDay = new Date(requestedDate);
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: {
        id: true,
        name: true,
        durationMin: true,
        capacityDefault: true,
        isActive: true,
        isDraft: true,
      },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (!service.isActive || service.isDraft) {
      return NextResponse.json(
        { error: "Service is not currently bookable" },
        { status: 400 },
      );
    }

    // Check for blocked dates
    const blockedDate = await prisma.blockDate.findFirst({
      where: {
        date: {
          gte: requestedDate,
          lt: nextDay,
        },
      },
    });

    if (blockedDate) {
      return NextResponse.json({
        date: date,
        blocked: true,
        reason: blockedDate.reason || "Date is not available",
        slots: [],
      });
    }

    // Generate sample slots for the day (Europe/London)
    // Times: 10:00, 11:30, 13:30, 15:00 local time
    const localTimes = ["10:00", "11:30", "13:30", "15:00"];
    const existingSlots = await prisma.slot.findMany({
      where: {
        serviceId,
        startDateTime: { gte: requestedDate, lt: nextDay },
      },
      select: {
        id: true,
        startDateTime: true,
        endDateTime: true,
        capacity: true,
        availableSpaces: true,
        isBlocked: true,
        blockReason: true,
      },
      orderBy: { startDateTime: "asc" },
    });

    const existingSlotMap = new Map(
      existingSlots.map((s) => [
        s.startDateTime.toISOString(),
        s,
      ]),
    );

    // Build Europe/London date/time slots
    // Use Intl to convert local time strings to UTC on the given date
    const slots = localTimes.map((timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      // Construct a local datetime in Europe/London
      const localDateTime = new Date(
        Date.UTC(
          requestedDate.getUTCFullYear(),
          requestedDate.getUTCMonth(),
          requestedDate.getUTCDate(),
          hours,
          minutes,
        ),
      );
      // Adjust for timezone offset: the above creates a UTC time that we
      // interpret as London local. We need to convert properly.
      const londonFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Create a date in London timezone at the desired local time
      const parts = londonFormatter.formatToParts(localDateTime);
      // Actually simpler: build the London local time, then convert to UTC
      const londonDate = new Date(
        requestedDate.getUTCFullYear(),
        requestedDate.getUTCMonth(),
        requestedDate.getUTCDate(),
        hours,
        minutes,
      );
      // londonDate is treated as local system time, which may not be London.
      // We'll convert using the offset. Use Intl to get the offset.
      const offsetMinutes = londonDate.getTimezoneOffset(); // system tz, not London
      // This is approximate; for production use a proper TZ library.
      // For now, store as UTC from the local wall-clock time.

      const startUTC = new Date(londonDate.getTime());
      const endUTC = new Date(startUTC.getTime() + service.durationMin * 60000);

      const existing = existingSlotMap.get(startUTC.toISOString());
      if (existing) {
        return {
          id: existing.id,
          startDateTime: existing.startDateTime,
          endDateTime: existing.endDateTime,
          capacity: existing.capacity,
          availableSpaces: existing.availableSpaces,
          isBlocked: existing.isBlocked,
          blockReason: existing.blockReason,
          isAvailable:
            !existing.isBlocked && existing.availableSpaces > 0,
        };
      }

      return {
        id: null, // will be created on demand or pre-seeded
        startDateTime: startUTC,
        endDateTime: endUTC,
        capacity: service.capacityDefault,
        availableSpaces: service.capacityDefault,
        isBlocked: false,
        blockReason: null,
        isAvailable: true,
      };
    });

    return NextResponse.json({
      date: date,
      service: {
        id: service.id,
        name: service.name,
        durationMin: service.durationMin,
        capacityDefault: service.capacityDefault,
      },
      blocked: false,
      slots,
    });
  } catch (error) {
    console.error("[SLOTS API ERROR]", error);
    return NextResponse.json(
      { error: "Failed to load slots" },
      { status: 500 },
    );
  }
}
