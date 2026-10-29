import { cn } from "@/lib/utils";
import {
  SectionWrapper,
  Container,
  Eyebrow,
  SerifHeading,
  SerifText,
} from "@/components/boutique/layout";
import { WaitlistForm } from "@/components/boutique/waitlist-form";
import { Mail, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Contact – Twinkle Toe Love Baby Wellness Spa",
  description:
    "Get in touch with Twinkle Toe Love Baby Wellness Spa. Join the waitlist for launch updates in Nottingham / West Bridgford.",
};

const CONTACT_DETAILS = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "bookings@baby.twinkletoelove.com",
    href: "mailto:bookings@baby.twinkletoelove.com",
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    label: "Location",
    value: "Nottingham / West Bridgford",
    note: "Venue coming soon — not yet secured",
  },
  {
    icon: <ArrowRight className="h-5 w-5" />,
    label: "Instagram",
    value: "@twinkletoelove",
    href: "https://www.instagram.com/twinkletoelove/",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col" id="main-content">
      <SectionWrapper bg="white" className="py-12 md:py-20 border-b border-pale-sage">
        <Container>
          <div className="text-center mb-14">
            <Eyebrow>Get in touch</Eyebrow>
            <SerifHeading size="4xl" weight="700" color="forest" className="mb-6">
              We&rsquo;d love to hear from you
            </SerifHeading>
            <SerifText size="lg" color="sage" className="mx-auto max-w-2xl leading-7">
              Have a question about our baby wellness studio or want to be
              among the first to know when bookings open?
            </SerifText>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact details */}
            <div className="space-y-6">
              {CONTACT_DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-start gap-4"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-pale-sage text-forest-green shrink-0">
                    {detail.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-forest-green text-sm mb-1">
                      {detail.label}
                    </h4>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className={cn(
                          "text-sm text-sage-600 hover:text-forest-green transition-colors",
                          detail.label === "Email"
                            ? "underline underline-offset-2 decoration-pale-sage decoration-dashed"
                            : "",
                        )}
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-sm text-sage-600 leading-6">
                        {detail.value}
                        {detail.note && (
                          <span className="text-xs text-sage-400 block mt-1">
                            {detail.note}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Waitlist form card */}
            <div className="rounded-2xl border border-blush-200 bg-blush-50 p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <HeartIcon size={18} color="rose" />
                <SerifHeading size="2xl" weight="600" align="left" color="charcoal" className="mb-0">
                  Join the waitlist
                </SerifHeading>
              </div>
              <SerifText size="base" color="sage" className="mb-6">
                Be first to hear when we open. We&rsquo;ll only use your email to
                send launch updates — you can unsubscribe at any time.
              </SerifText>
              <WaitlistForm className="max-w-md" />
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}

function HeartIcon({ className, color = "rose", size = 16 }: { className?: string; color?: "rose" | "sage" | "forest"; size?: number }) {
  const colors = {
    rose: "text-rose-pink",
    sage: "text-sage-700",
    forest: "text-forest-green",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(colors[color], className)}
      aria-hidden="true"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  );
}
