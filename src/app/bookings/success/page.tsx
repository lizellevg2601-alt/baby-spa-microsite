import { prisma } from "@/lib/db";
import { CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Booking confirmed – Twinkle Toe Love",
  description: "Your baby wellness spa booking has been confirmed.",
};

export default function SuccessPage({
  searchParams,
}: { searchParams: { session_id?: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <div className="flex-1 px-4 md:px-8 max-w-2xl mx-auto py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-mint-100 flex items-center justify-center text-mint-700 mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-bold text-sage-900 mb-4">
          Booking confirmed
        </h1>
        <p className="text-lg text-sage-600 mb-8">
          Thank you for booking with Twinkle Toe Love. Your place is reserved.
        </p>

        <div className="rounded-xl border border-sage-100 bg-white p-8 mb-8 text-left">
          <h2 className="text-sm font-semibold text-sage-800 mb-4 uppercase tracking-wider">
            What happens next
          </h2>
          <div className="space-y-4 text-sm text-sage-600">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 text-xs mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-sage-800">Awaiting payment confirmation</p>
                <p className="text-xs text-sage-500">
                  We&apos;re verifying your Stripe payment. You&apos;ll receive a confirmation email shortly.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 text-xs mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-sage-800">Check your inbox</p>
                <p className="text-xs text-sage-500">
                  Your booking confirmation and reference number will be sent by email.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 text-xs mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-sage-800">Join us at the studio</p>
                <p className="text-xs text-sage-500">
                  Arrive 5 minutes before your session. We&apos;ll be ready to welcome you and your baby.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/experiences"
            className="flex h-11 w-full sm:w-auto items-center justify-center rounded-lg border border-sage-200 bg-white px-6 py-3 text-sm font-semibold text-sage-700 hover:bg-sage-50 transition-colors"
          >
            <ArrowRight className="h-4 w-4 mr-2" /> Book another experience
          </Link>
          <Link
            href="/"
            className="flex h-11 w-full sm:w-auto items-center justify-center rounded-lg bg-sage-700 px-6 py-3 text-sm font-semibold text-white hover:bg-sage-600 transition-colors"
          >
            Return to homepage
          </Link>
        </div>

        <p className="mt-8 text-xs text-sage-500">
          Test mode — no real money is taken. This is a demonstration booking system.
        </p>
      </div>
    </div>
  );
}
