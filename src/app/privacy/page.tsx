import Link from "next/link";

export const metadata = {
  title: "Privacy policy – Twinkle Toe Love Baby Wellness Spa",
  description: "Privacy policy for Twinkle Toe Love Baby Wellness Spa bookings.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory" id="main-content">
      <section className="py-12 md:py-16 border-b border-sage-100 bg-white">
        <div className="px-4 md:px-8 max-w-4xl mx-auto">
          <div className="p-4 rounded-lg bg-blush-50 border border-blush-100 mb-8">
            <p className="text-sm text-blush-700 font-medium">
              ⚠️ Draft document — pending legal review
            </p>
            <p className="text-sm text-blush-600 mt-1">
              This privacy policy is a draft placeholder. It has not been
              reviewed by legal counsel and should not be relied upon until
              finalised.
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
            Privacy policy
          </h1>

          <div className="prose prose-sage max-w-none text-sage-600 space-y-6">
            <p>
              Twinkle Toe Love – Baby Wellness Spa respects your privacy. This
              policy explains what personal information we collect, how we use
              it, and your rights under UK GDPR.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              1. Information we collect
            </h2>
            <p>
              When you make a booking, we collect your name, email address and
              optional phone number. We do not ask for your baby's health
              details or other sensitive information as part of the generic
              booking form.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              2. How we use your information
            </h2>
            <p>
              We use your contact details to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sage-600">
              <li>Process and confirm your booking</li>
              <li>Send booking confirmations and reminders</li>
              <li>Contact you about changes to your session</li>
            </ul>
            <p>
              Marketing emails are only sent if you give separate consent.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              3. Payments
            </h2>
            <p>
              Payments are processed by Stripe. We do not store your card
              details. Stripe's own privacy policy applies to payment data.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              4. Data retention
            </h2>
            <p>
              We retain booking records for as long as needed to run the
              service and comply with tax and accounting obligations. You may
              request deletion of your data at any time by contacting us.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              5. Your rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              data, and to withdraw marketing consent at any time. Contact us
              at bookings@baby.twinkletoelove.com.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              6. Cookies
            </h2>
            <p>
              Our website uses essential cookies for session and booking
              functionality. We do not use tracking or advertising cookies.
            </p>

            <p className="mt-8 text-sm text-sage-500">
              © 2026 Twinkle Toe Love. Draft privacy policy pending legal
              review.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
