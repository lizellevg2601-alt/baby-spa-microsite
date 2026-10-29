import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import type { PrismaClient } from "@prisma/client";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { sendEmail, bookingConfirmationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature") || "";

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    console.error("[WEBHOOK SIGNATURE ERROR]", error.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency: skip already-processed events
  const existing = await prisma.stripeEvent.findUnique({
    where: { eventId: event.id },
  });

  if (existing) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Mark event as processed (idempotency)
      await tx.stripeEvent.create({
        data: {
          eventId: event.id,
          type: event.type,
          processed: true,
          processedAt: new Date(),
        },
      });

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          await handleCheckoutCompleted(tx, session);
          break;
        }

        case "checkout.session.expired": {
          const session = event.data.object as Stripe.Checkout.Session;
          await handleCheckoutExpired(tx, session);
          break;
        }

        case "payment_intent.payment_failed": {
          const intent = event.data.object as Stripe.PaymentIntent;
          await handlePaymentFailed(tx, intent);
          break;
        }

        case "charge.refunded":
        case "payment_intent.refunded": {
          const intent = event.data.object as Stripe.PaymentIntent;
          await handleRefunded(tx, intent);
          break;
        }

        default:
          // Unhandled event type — still record it
          break;
      }
    });

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("[WEBHOOK HANDLER ERROR]", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}

async function handleCheckoutCompleted(
  tx: PrismaClient,
  session: Stripe.Checkout.Session,
) {
  const bookingRef = session.metadata?.bookingReference;
  const bookingId = session.metadata?.bookingId;

  if (!bookingRef || !bookingId) {
    console.error("[WEBHOOK] Missing booking metadata", session.id);
    return;
  }

  const booking = await tx.booking.findUnique({
    where: { id: bookingId },
    include: { service: true, slot: true },
  });

  if (!booking) {
    console.error("[WEBHOOK] Booking not found", bookingId);
    return;
  }

  if (booking.status === "CONFIRMED") {
    return; // already processed
  }

  // Verify amount and currency match
  const amountTotal = session.amount_total ?? 0;
  const currency = (session.currency ?? "gbp").toUpperCase();
  const expectedAmount = booking.totalPence;

  if (amountTotal !== expectedAmount || currency !== "GBP") {
    console.error(
      `[WEBHOOK] Amount mismatch for booking ${bookingRef}: expected ${expectedAmount} GBP, got ${amountTotal} ${currency}`,
    );
    // Mark as failed rather than confirmed
    await tx.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });
    await tx.payment.create({
      data: {
        bookingId,
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        amountPence: amountTotal,
        currency: currency.toLowerCase(),
        status: "FAILED",
      },
    });
    // Release the held spaces
    await tx.slot.update({
      where: { id: booking.slotId },
      data: { availableSpaces: { increment: booking.pairsCount } },
    });
    return;
  }

  const paymentIntentId = session.payment_intent as string;

  // Mark booking confirmed
  await tx.booking.update({
    where: { id: bookingId },
    data: {
      status: "CONFIRMED",
      paidAt: new Date(),
      stripePaymentIntentId,
    },
  });

  // Create payment record
  await tx.payment.create({
    data: {
      bookingId,
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
      amountPence: amountTotal,
      currency: currency.toLowerCase(),
      status: "PAID",
      receiptUrl: session.receipt_url ?? null,
    },
  });

  // Send confirmation email (non-blocking, retryable)
  const slotStart = booking.slot.startDateTime.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const slotEnd = booking.slot.endDateTime.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  });

  const email = bookingConfirmationEmail(
    booking.guardianEmail,
    booking.reference,
    booking.service.name,
    slotStart,
    slotEnd,
    booking.pairsCount,
    booking.totalPence,
    "CONFIRMED",
  );

  await sendEmail(email).catch((err) => {
    console.error("[EMAIL FAILED]", err);
  });
}

async function handleCheckoutExpired(
  tx: PrismaClient,
  session: Stripe.Checkout.Session,
) {
  const bookingRef = session.metadata?.bookingReference;
  const bookingId = session.metadata?.bookingId;

  if (!bookingId) return;

  const booking = await tx.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking || booking.status !== "PENDING") return;

  // Only expire if payment wasn't completed
  const existingPayment = await tx.payment.findUnique({
    where: { bookingId },
  });

  if (existingPayment && existingPayment.status === "PAID") return;

  await tx.booking.update({
    where: { id: bookingId },
    data: { status: "EXPIRED" },
  });

  // Release held spaces
  await tx.slot.update({
    where: { id: booking.slotId },
    data: { availableSpaces: { increment: booking.pairsCount } },
  });
}

async function handlePaymentFailed(
  tx: PrismaClient,
  intent: Stripe.PaymentIntent,
) {
  const booking = await tx.booking.findFirst({
    where: { stripePaymentIntentId: intent.id },
  });

  if (!booking) return;

  await tx.booking.update({
    where: { id: booking.id },
    data: { status: "CANCELLED" },
  });

  await tx.payment.create({
    data: {
      bookingId: booking.id,
      stripeSessionId: "",
      stripePaymentIntentId: intent.id,
      amountPence: intent.amount,
      currency: intent.currency,
      status: "FAILED",
    },
  });

  // Release held spaces
  const bookingWithSlot = await tx.booking.findUnique({
    where: { id: booking.id },
  });
  if (bookingWithSlot) {
    await tx.slot.update({
      where: { id: bookingWithSlot.slotId },
      data: { availableSpaces: { increment: bookingWithSlot.pairsCount } },
    });
  }
}

async function handleRefunded(
  tx: PrismaClient,
  intent: Stripe.PaymentIntent,
) {
  const booking = await tx.booking.findFirst({
    where: { stripePaymentIntentId: intent.id },
  });

  if (!booking) return;

  await tx.booking.update({
    where: { id: booking.id },
    data: { status: "REFUNDED", refundedAt: new Date() },
  });

  await tx.payment.updateMany({
    where: { bookingId: booking.id },
    data: { status: "REFUNDED" },
  });
}
