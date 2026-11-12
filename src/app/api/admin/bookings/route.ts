import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession, requireAdmin } from "@/lib/auth";
import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    _stripe = new Stripe(secretKey, {
      apiVersion: "2024-12-18.acacia",
    });
  }
  return _stripe;
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const serviceId = searchParams.get("serviceId");

    const bookings = await prisma.booking.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(serviceId ? { serviceId } : {}),
      },
      include: { service: true, slot: true, payment: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("[ADMIN BOOKINGS GET ERROR]", error);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  const auth = requireAdmin(session);
  if (auth.unauthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { bookingId, action } = body;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true, slot: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (action === "cancel") {
      if (booking.status === "CANCELLED" || booking.status === "REFUNDED") {
        return NextResponse.json(
          { error: "Booking already cancelled or refunded" },
          { status: 400 },
        );
      }

      // If paid, create a refund via Stripe
      if (booking.status === "CONFIRMED" && booking.payment?.stripePaymentIntentId) {
        try {
          await getStripe().refunds.create({
            payment_intent: booking.payment.stripePaymentIntentId,
          });
        } catch (stripeErr) {
          console.error("[STRIPE REFUND ERROR]", stripeErr);
          return NextResponse.json(
            { error: "Failed to process refund via Stripe" },
            { status: 500 },
          );
        }
      }

      // Release held spaces
      await prisma.slot.update({
        where: { id: booking.slotId },
        data: { availableSpaces: { increment: booking.pairsCount } },
      });

      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
        },
      });

      await prisma.payment.updateMany({
        where: { bookingId },
        data: { status: "REFUNDED" },
      });

      return NextResponse.json({ success: true, status: "CANCELLED" });
    }

    if (action === "refund") {
      if (booking.status !== "CONFIRMED") {
        return NextResponse.json(
          { error: "Only confirmed bookings can be refunded" },
          { status: 400 },
        );
      }

      if (!booking.payment?.stripePaymentIntentId) {
        return NextResponse.json(
          { error: "No payment record found" },
          { status: 400 },
        );
      }

      try {
        await stripe.refunds.create({
          payment_intent: booking.payment.stripePaymentIntentId,
        });
      } catch (stripeErr) {
        console.error("[STRIPE REFUND ERROR]", stripeErr);
        return NextResponse.json(
          { error: "Failed to process refund via Stripe" },
          { status: 500 },
        );
      }

      await prisma.slot.update({
        where: { id: booking.slotId },
        data: { availableSpaces: { increment: booking.pairsCount } },
      });

      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: "REFUNDED",
          refundedAt: new Date(),
        },
      });

      await prisma.payment.updateMany({
        where: { bookingId },
        data: { status: "REFUNDED" },
      });

      return NextResponse.json({ success: true, status: "REFUNDED" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[ADMIN BOOKINGS POST ERROR]", error);
    return NextResponse.json(
      { error: "Action failed" },
      { status: 500 },
    );
  }
}
