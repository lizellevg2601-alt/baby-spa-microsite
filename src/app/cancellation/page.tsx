import Link from "next/link";

export const metadata = {
  title: "Cancellation policy – Twinkle Toe Love Baby Wellness Spa",
  description: "Cancellation, rescheduling and refund policy for Twinkle Toe Love baby spa sessions.",
};

export default function CancellationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory" id="main-content">
      <section className="py-12 md:py-16 border-b border-sage-100 bg-white">
        <div className="px-4 md:px-8 max-w-4xl mx-auto">
          <div className="p-4 rounded-lg bg-blush-50 border border-blush-100 mb-8">
            <p className="text-sm text-blush-700 font-medium">
              ⚠️ Draft document — pending legal review
            </p>
            <p className="text-sm text-blush-600 mt-1">
              This cancellation policy is a draft placeholder. It has not been
              reviewed by legal counsel and should not be relied upon until
              finalised.
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
            Cancellation policy
          </h1>

          <div className="prose prose-sage max-w-none text-sage-600 space-y-6">
            <p>
              We understand that plans change, especially with young children.
              Here&apos;s how cancellations, rescheduling and refunds work at
              Twinkle Toe Love.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              1. Cancelling your booking
            </h2>
            <p>
              You may cancel your booking up to 48 hours before the session
              start time. Cancellations made with 48 hours or more notice are
              eligible for a refund, minus any Stripe processing fees.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              2. Late cancellations
            </h2>
            <p>
              Cancellations made less than 48 hours before the session are not
              eligible for a refund, as we hold a space specifically for you
              and may be unable to fill it at short notice.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              3. Rescheduling
            </h2>
            <p>
              You may request to move your booking to a different session,
              subject to availability. Please contact us with your booking
              reference at least 24 hours before your original session.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              4. Refunds
            </h2>
            <p>
              Approved refunds are returned to the original payment method via
              Stripe. Refunds typically appear within 5–10 business days,
              depending on your card issuer.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              5. Cancellations by us
            </h2>
            <p>
              If we need to cancel a session (for example, due to instructor
              illness or venue issues), we&apos;ll offer you an alternative date or
              a full refund.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              6. How to cancel
            </h2>
            <p>
              Contact us at bookings@baby.twinkletoelove.com with your booking
              reference. We&apos;ll confirm your cancellation and any refund by
              email.
            </p>

            <p className="mt-8 text-sm text-sage-500">
              © 2026 Twinkle Toe Love. Draft cancellation policy pending legal
              review.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
