import Link from "next/link";
import {
  SectionWrapper,
  Container,
  Eyebrow,
  SerifHeading,
  SerifText,
} from "@/components/boutique/layout";

export const metadata = {
  title: "FAQ – Twinkle Toe Love Baby Wellness Spa",
  description:
    "Frequently asked questions about our baby wellness studio, sessions, bookings and cancellations.",
};

const FAQS = [
  {
    q: "What age range are the sessions for?",
    a: "Our sessions are designed for babies from 6 weeks up to 18 months, depending on the experience. Each listing shows the recommended age band. Parents attend and participate throughout.",
  },
  {
    q: "How long is each session?",
    a: "Each experience runs for 45 minutes, including time to settle in, the guided activity, and calm wind-down.",
  },
  {
    q: "How many families attend each session?",
    a: "We keep groups intentionally small — a maximum of four parent-and-baby pairs per session — so the environment stays calm and every family gets individual attention.",
  },
  {
    q: "Do I need to bring anything?",
    a: "No. All sensory materials and equipment are provided. Just bring yourself, your baby, and anything you'd normally need for an outing (nappies, feeds, a change of clothes).",
  },
  {
    q: "Is parking available?",
    a: "On-street parking is capped at one hour nearby, and contract parking is reportedly available opposite the venue. We recommend allowing a few extra minutes to find a spot.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes. See our cancellation policy for details. If you need to make changes, contact us with your booking reference and we'll help where we can.",
  },
  {
    q: "Are the prices final?",
    a: "Prices shown on the website are illustrative samples (draft). Final pricing will be confirmed before bookings open and once the venue is secured.",
  },
  {
    q: "Is this a medical or therapy service?",
    a: "No. Twinkle Toe Love is a baby development and sensory studio. Our sessions are professionally facilitated but we do not make medical or developmental outcome claims, and we are not a hydrotherapy provider.",
  },
  {
    q: "When will bookings open?",
    a: "Bookings are not yet open. We're finalising the venue and all local approvals. Join the waitlist to be the first to know when bookings open.",
  },
];

export default function FAQPage() {
  return (
    <div className="flex flex-col" id="main-content">
      <SectionWrapper bg="white" className="py-12 md:py-20 border-b border-pale-sage">
        <Container>
          <div className="text-center mb-14">
            <Eyebrow>Frequently asked questions</Eyebrow>
            <SerifHeading size="4xl" weight="700" color="forest" className="mb-6">
              Everything you need to know
            </SerifHeading>
            <SerifText size="lg" color="sage" className="mx-auto max-w-2xl leading-7">
              Everything you need to know about visiting Twinkle Toe Love.
            </SerifText>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper bg="ivory" className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <SerifHeading size="3xl" weight="600" color="forest" className="mb-6">
              Still have a question?
            </SerifHeading>
            <SerifText size="base" color="sage" className="mb-8 leading-7">
              We&rsquo;d be happy to help. Get in touch and we&rsquo;ll get back to you
              as soon as we can.
            </SerifText>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-forest-green/30 bg-forest-green/5 px-6 py-3 text-forest-green font-body font-semibold hover:bg-forest-green hover:text-white transition-colors"
            >
              <HeartIcon size={16} /> Contact us
            </Link>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-pale-sage rounded-xl bg-white overflow-hidden">
      <summary
        className="flex items-center justify-between px-6 py-4 cursor-pointer list-none focus:outline-none focus:ring-2 focus:ring-forest-green/20 rounded-xl"
      >
        <span className="font-serif font-semibold text-forest-green text-sm leading-6">
          {q}
        </span>
        <span className="text-sage-400 group-open:rotate-180 transition-transform">
          {">"}
        </span>
      </summary>
      <div className="px-6 pb-4 text-sm text-sage-600 leading-6">
        {a}
      </div>
    </details>
  );
}

function HeartIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  );
}
