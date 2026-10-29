-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'EXPIRED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateTable
CREATE TABLE "public"."Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "pricePence" INTEGER NOT NULL,
    "durationMin" INTEGER NOT NULL DEFAULT 45,
    "ageBand" TEXT NOT NULL,
    "capacityDefault" INTEGER NOT NULL DEFAULT 4,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Slot" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "availableSpaces" INTEGER NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "blockReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "pairsCount" INTEGER NOT NULL,
    "totalPence" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'gbp',
    "guardianName" TEXT NOT NULL,
    "guardianEmail" TEXT NOT NULL,
    "guardianPhone" TEXT,
    "babyAgeMonths" INTEGER,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "holdsUntil" TIMESTAMP(3),
    "stripeSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "paidAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT NOT NULL,
    "amountPence" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'gbp',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "receiptUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Attendee" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "guardianName" TEXT NOT NULL,
    "guardianEmail" TEXT NOT NULL,
    "guardianPhone" TEXT,
    "babyAgeMonths" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StripeEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlockDate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Config" (
    "id" TEXT NOT NULL DEFAULT 'config',
    "bookingsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "paymentsMode" TEXT NOT NULL DEFAULT 'test',
    "defaultCapacity" INTEGER NOT NULL DEFAULT 4,
    "holdMinutes" INTEGER NOT NULL DEFAULT 25,
    "currency" TEXT NOT NULL DEFAULT 'gbp',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/London',
    "siteTitle" TEXT NOT NULL DEFAULT 'Twinkle Toe Love – Baby Wellness Spa',
    "siteTagline" TEXT NOT NULL DEFAULT 'Little wonders. Big discoveries.',
    "venueStatus" TEXT NOT NULL DEFAULT 'coming-soon',
    "venueNotice" TEXT DEFAULT 'Coming to Nottingham / West Bridgford — venue to be confirmed.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "public"."Service"("slug");

-- CreateIndex
CREATE INDEX "Service_isActive_idx" ON "public"."Service"("isActive");

-- CreateIndex
CREATE INDEX "Slot_serviceId_startDateTime_idx" ON "public"."Slot"("serviceId", "startDateTime");

-- CreateIndex
CREATE INDEX "Slot_startDateTime_idx" ON "public"."Slot"("startDateTime");

-- CreateIndex
CREATE UNIQUE INDEX "Slot_serviceId_startDateTime_key" ON "public"."Slot"("serviceId", "startDateTime");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_reference_key" ON "public"."Booking"("reference");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "public"."Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_stripeSessionId_idx" ON "public"."Booking"("stripeSessionId");

-- CreateIndex
CREATE INDEX "Booking_guardianEmail_idx" ON "public"."Booking"("guardianEmail");

-- CreateIndex
CREATE INDEX "Booking_createdAt_idx" ON "public"."Booking"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripeSessionId_key" ON "public"."Payment"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripePaymentIntentId_key" ON "public"."Payment"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "public"."Payment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_bookingId_key" ON "public"."Attendee"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeEvent_eventId_key" ON "public"."StripeEvent"("eventId");

-- CreateIndex
CREATE INDEX "StripeEvent_processed_idx" ON "public"."StripeEvent"("processed");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "public"."AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_isActive_idx" ON "public"."AdminUser"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BlockDate_date_key" ON "public"."BlockDate"("date");

-- AddForeignKey
ALTER TABLE "public"."Slot" ADD CONSTRAINT "Slot_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "public"."Slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendee" ADD CONSTRAINT "Attendee_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
