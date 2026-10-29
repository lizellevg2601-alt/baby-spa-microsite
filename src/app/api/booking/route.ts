import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { createBookingSchema } from "@/lib/validations";
import { sendEmail, bookingConfirmationEmail } from "@/lib/email";
import { getAdminSession } from "@/lib/auth";

const HOLD_MINUTES_DEFAULT = 25;

export async function POST(request: NextRequest) {
  // Check if bookings are enabled
  let bookingsEnabled = false;
  try {
    const config = await prisma.config.findUnique({
      where: { id: "config" },
    });
    bookingsEnabled = !!config?.bookingsEnabled;
  } catch {
    // Default to disabled if config is unavailable
    bookingsEnabled = false;
  }

  if (!bookingsEnabled) {
    return NextResponse.json(
      {
        error: "Bookings are not yet open",
        message: "Please join the waitlist to be the first to hear when bookings launch.",
      },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const parsed = createBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const {
      serviceId,
      slotId,
      pairsCount,
      guardianName,
      guardianEmail,
      guardianPhone,
      babyAgeMonths,
      marketingConsent,
    } = parsed.data;

    // Fetch the slot with service, using a transaction for atomic capacity check
    const result = await prisma.$transaction(async (tx) => {
      // Lock the slot row to prevent concurrent overselling
      const slot = await tx.slot.findUnique({
        where: { id: slotId },
        include: { service: true },
      });

      if (!slot) {
        throw new Error("SLOT_NOT_FOUND");
      }

      if (!slot.service.isActive || slot.service.isDraft) {
        throw new Error("SERVICE_NOT_BOOKABLE");
      }

      if (slot.isBlocked) {
        throw new Error("SLOT_BLOCKED");
      }

      if (slot.availableSpaces < pairsCount) {
        throw new Error("NOT_ENOUGH_SPACES");
      }

      // Get hold duration from config
      const config = await tx.config.findUnique({
        where: { id: "config" },
      });
      const holdMinutes = config?.holdMinutes ?? HOLD_MINUTES_DEFAULT;

      const holdsUntil = new Date(
        Date.now() + holdMinutes * 60 * 1000,
      );

      // Create pending reservation
      const reference = `TTL-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const totalPence = slot.service.pricePence * pairsCount;

      const reservation = await tx.booking.create({
        data: {
          reference,
          serviceId,
          slotId,
          status: "PENDING",
          pairsCount,
          totalPence,
          currency: "gbp",
          guardianName,
          guardianEmail,
          guardianPhone: guardianPhone || null,
          babyAgeMonths: babyAgeMonths ?? null,
          marketingConsent: marketingConsent ?? false,
          holdsUntil,
        },
        include: {
          attendee: {
            create: {
              guardianName,
              guardianEmail,
              guardianPhone: guardianPhone || undefined,
              babyAgeMonths: babyAgeMonths ?? null,
            },
          },
        },
      });

      // Decrement available spaces atomically
      await tx.slot.update({
        where: { id: slotId },
        data: {
          availableSpaces: { decrement: pairsCount },
        },
      });

      return { slot, reservation, totalPence, holdsUntil };
    });

    const { slot, reservation, totalPence, holdsUntil } = result;

    // Create Stripe Checkout Session (server-side only, secret key never exposed)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Twinkle Toe Love — ${slot.service.name}`,
              description: `${slot.pairsCount} parent-and-baby pair(s) • ${slot.startDateTime.toLocaleString("en-GB", { timeZone: "Europe/London" })}`,
            },
            unit_amount: slot.service.pricePence,
          },
          quantity: reservation.pairsCount,
        },
      ],
      customer_email: reservation.guardianEmail,
      metadata: {
        bookingReference: reservation.reference,
        bookingId: reservation.id,
        serviceId: reservation.serviceId,
        slotId: reservation.slotId,
      },
      success_url: `${process.env.APP_URL}/bookings/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/bookings/cancel?reference=${reservation.reference}`,
      expires_at: Math.floor(holdsUntil.getTime() / 1000),
      allow_promotion_codes: false,
      tax_id_collection: { enabled: false },
      billing_address_collection: "required",
    });

    // Store stripe session id on the reservation
    await prisma.booking.update({
      where: { id: reservation.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      bookingReference: reservation.reference,
      holdsUntil,
      totalPence,
      currency: "gbp",
    });
  } catch (error: any) {
    console.error("[BOOKING API ERROR]", error);

    if (error.message === "SLOT_NOT_FOUND") {
      return NextResponse.json({ error: "Time slot not found" }, { status: 404 });
    }
    if (error.message === "SERVICE_NOT_BOOKABLE") {
      return NextResponse.json({ error: "Service is not currently bookable" }, { status: 400 });
    }
    if (error.message === "SLOT_BLOCKED") {
      return NextResponse.json({ error: "This time slot is not available" }, { status: 400 });
    }
    if (error.message === "NOT_ENOUGH_SPACES") {
      return NextResponse.json({ error: "Not enough spaces available for this slot" }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
