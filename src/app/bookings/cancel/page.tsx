import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Booking cancelled – Twinkle Toe Love",
  description: "Your booking was cancelled or not completed.",
};

export default function CancelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <div className="flex-1 px-4 md:px-8 max-w-2xl mx-auto py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center text-blush-700 mx-auto mb-6">
          <ArrowRight className="h-6 w-6" />
        </div>

        <h1 className="text-3xl font-bold text-sage-900 mb-4">
          Booking not completed
        </h1>
        <p className="text-lg text-sage-600 mb-8">
          No payment was taken. Your reservation has been released and the
          spaces are available again.
        </p>

        <div className="rounded-xl border border-sage-100 bg-white p-8 mb-8 text-left">
          <h2 className="text-sm font-semibold text-sage-800 mb-4 uppercase tracking-wider">
            What you can do
          </h2>
          <div className="space-y-4 text-sm text-sage-600">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 text-xs mt-0.5">
                💡
              </span>
              <div>
                <p className="font-semibold text-sage-800">Try again</p>
                <p className="text-xs text-sage-500">
                  Select a different experience or time if your preferred slot is no longer available.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 text-xs mt-0.5">
                📧
              </span>
              <div>
                <p className="font-semibold text-sage-800">Contact us</p>
                <p className="text-xs text-sage-500">
                  If you believe this was an error, get in touch and we&apos;ll help.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/experiences"
            className="flex h-11 w-full sm:w-auto items-center justify-center rounded-lg bg-sage-700 px-6 py-3 text-sm font-semibold text-white hover:bg-sage-600 transition-colors"
          >
            <ArrowRight className="h-4 w-4 mr-2" /> Browse experiences
          </Link>
          <Link
            href="/"
            className="flex h-11 w-full sm:w-auto items-center justify-center rounded-lg border border-sage-200 bg-white px-6 py-3 text-sm font-semibold text-sage-700 hover:bg-sage-50 transition-colors"
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
