import Link from "next/link";

export const metadata = {
  title: "Terms & conditions – Twinkle Toe Love Baby Wellness Spa",
  description: "Terms and conditions for booking baby wellness spa sessions.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory" id="main-content">
      <section className="py-12 md:py-16 border-b border-sage-100 bg-white">
        <div className="px-4 md:px-8 max-w-4xl mx-auto">
          <div className="p-4 rounded-lg bg-blush-50 border border-blush-100 mb-8">
            <p className="text-sm text-blush-700 font-medium">
              ⚠️ Draft document — pending legal review
            </p>
            <p className="text-sm text-blush-600 mt-1">
              These terms and conditions are a draft placeholder. They have not
              been reviewed by legal counsel and should not be relied upon
              until finalised.
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
            Terms & conditions
          </h1>

          <div className="prose prose-sage max-w-none text-sage-600 space-y-6">
            <p>
              Welcome to Twinkle Toe Love – Baby Wellness Spa. These terms
              apply to all bookings made through this website
              (<code>baby.twinkletoelove.com</code>).
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              1. Booking and payment
            </h2>
            <p>
              All sessions must be booked and prepaid in advance through our
              website. Payment is processed securely by Stripe. A booking is
              only confirmed once payment has been successfully processed and
              you receive a confirmation email.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              2. Pricing
            </h2>
            <p>
              Prices are shown in GBP (£) per parent-and-baby pair. Prices
              displayed on the website are illustrative samples and may change
              before bookings open. The price you pay is the price shown at
              the time of booking.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              3. Attendance
            </h2>
            <p>
              A parent or guardian must attend and remain with their baby for
              the full duration of each session. Sessions are for babies
              within the advertised age band for each experience.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              4. Venue
            </h2>
            <p>
              Our studio is launching in Nottingham / West Bridgford. The
              exact venue will be confirmed once the space is secured and all
              local approvals are in place. We are not currently operating at
              Pavilion Road, West Bridgford.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              5. Health and safety
            </h2>
            <p>
              Please do not attend if you or your baby are unwell. Our
              sessions are not medical or therapeutic services and we do not
              make developmental outcome claims.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              6. Changes and cancellations
            </h2>
            <p>
              Please see our <Link href="/cancellation">cancellation policy</Link>
              for details on cancelling, rescheduling and refunds.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              7. Data and privacy
            </h2>
            <p>
              We collect only the personal information needed to process your
              booking. See our <Link href="/privacy">privacy policy</Link> for
              details.
            </p>

            <h2 className="text-xl font-bold text-sage-800 mt-8 mb-3">
              8. Liability
            </h2>
            <p>
              Participation is at your own risk. To the fullest extent
              permitted by law, we are not liable for any loss, injury or
              damage arising from attendance at a session.
            </p>

            <p className="mt-8 text-sm text-sage-500">
              © 2026 Twinkle Toe Love. Draft terms pending legal review.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
