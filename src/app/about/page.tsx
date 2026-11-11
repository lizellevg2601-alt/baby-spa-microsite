import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  SectionWrapper,
  Container,
  Eyebrow,
  SerifHeading,
  SerifText,
  HeartIcon,
} from "@/components/boutique/layout";
import {
  BoutiqueImage,
  ImageFrame,
} from "@/components/boutique/image";
import { WaitlistForm } from "@/components/boutique/waitlist-form";

export const metadata = {
  title: "Our Story – Twinkle Toe Love Baby Wellness Spa",
  description:
    "Meet Tanya and learn about the philosophy behind Twinkle Toe Love Baby Wellness Spa. Gentle, facilitated sessions for babies and parents in Nottingham / West Bridgford.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col" id="main-content">
      {/* Section 1 — Studio experience */}
      <SectionWrapper
        bg="ivory"
        className="section-padding-compact"
      >
        <Container className="max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image side */}
            <div className="relative animate-reveal-delay-2">
              <ImageFrame aspect="3-4" variant="none" className="shadow-xl">
                <BoutiqueImage
                  src="/images/baby-spa/baby-feet-wellness.png"
                  webpSrc="/images/baby-spa/baby-feet-wellness.webp"
                  alt="Baby feet in a soft blanket — calm studio environment"
                  width={700}
                  height={933}
                  priority
                  className="w-full h-full object-cover"
                />
              </ImageFrame>
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-lg border border-white bg-warm-ivory/90 backdrop-blur px-3 py-1 shadow-sm">
                <HeartIcon size={11} color="rose" />
                <span className="text-[9px] text-sage-700 font-body font-medium">
                  Illustrative concept image
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center animate-reveal">
              <Eyebrow>The studio experience</Eyebrow>
              <SerifHeading
                size="4xl"
                weight="700"
                align="left"
                color="forest"
                className="mb-6"
              >
                A calm, nurturing space
              </SerifHeading>
              <SerifText
                size="lg"
                align="left"
                color="sage"
                className="mb-8 leading-7 max-w-lg"
              >
                Our studio is designed around comfort, safety and parent-child connection. Thoughtfully selected materials, soft flooring and gentle lighting create an environment where babies can explore at their own pace — and parents can relax and be present.
              </SerifText>

              <div className="space-y-6">
                <BenefitRow
                  icon="✧"
                  title="Safety first"
                  description="Soft flooring, baby-safe materials and a calm, screen-free environment."
                />
                <BenefitRow
                  icon="✧"
                  title="Parent-child connection"
                  description="Every session is designed for you to participate alongside your baby."
                />
                <BenefitRow
                  icon="✧"
                  title="Intimate groups"
                  description="Maximum four parent-and-baby pairs per session."
                />
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section 2 — Meet Tanya */}
      <SectionWrapper
        bg="white"
        className="section-padding border-t border-pale-sage"
      >
        <Container className="max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left column: Portrait */}
            <div className="relative animate-reveal-delay-2">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-blush-200 shadow-xl bg-white">
                <BoutiqueImage
                  src="/images/baby-spa/tanya-baby-wellness-portrait.png"
                  webpSrc="/images/baby-spa/tanya-baby-wellness-portrait.webp"
                  alt="Tanya, founder and mum of two — warm, welcoming portrait"
                  width={800}
                  height={800}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right column: Content */}
            <div className="flex flex-col justify-center animate-reveal">
              <Eyebrow>The heart behind the gentle touch</Eyebrow>
              <SerifHeading
                size="4xl"
                weight="700"
                align="left"
                color="forest"
                className="mb-6"
              >
                Meet Tanya
              </SerifHeading>
              <SerifText
                size="lg"
                align="left"
                color="sage"
                className="mb-8 leading-7"
              >
                Mum of Two &amp; Founder
              </SerifText>

              <div className="space-y-6 max-w-lg">
                <p className="text-sm text-sage-600 leading-7">
                  Tanya brings warmth, patience and lived experience to every session. As a mum of two, she knows the early months are equal parts wonder and uncertainty — and she creates a space where parents feel seen, supported and never judged.
                </p>
                <p className="text-sm text-sage-600 leading-7">
                  Her approach to baby wellness is shaped by her own spa and wellbeing background, with a focus on gentle, nurturing touch and calm, unhurried moments shared between parent and baby.
                </p>
                <p className="text-sm text-sage-600 leading-7">
                  Everything at Twinkle Toe Love is designed with the same care: soft, fragrance-free materials, calm environments and treatments that put the baby’s needs first.
                </p>
              </div>

              <div className="mt-10 grid md:grid-cols-3 gap-6">
                <WellnessIcon
                  icon="heart"
                  label="Mum of two"
                  caption="Parenting experience you can trust"
                />
                <WellnessIcon
                  icon="hand"
                  label="Gentle touch"
                  caption="Baby-led, nurturing approach"
                />
                <WellnessIcon
                  icon="calm"
                  label="Calm space"
                  caption="Soothing, screen-free studio"
                />
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section 3 — Our philosophy */}
      <SectionWrapper
        bg="ivory"
        className="section-padding-compact"
      >
        <Container className="max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image side */}
            <div className="relative animate-reveal">
              <ImageFrame aspect="4-3" variant="none" className="shadow-lg">
                <BoutiqueImage
                  src="/images/baby-spa/baby-bonding-hands.png"
                  webpSrc="/images/baby-spa/baby-bonding-hands.webp"
                  alt="Baby holding an adult’s hand — connection and trust"
                  width={700}
                  height={525}
                  priority
                  className="w-full h-full object-cover"
                />
              </ImageFrame>
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center animate-reveal-delay-1">
              <Eyebrow>Our philosophy</Eyebrow>
              <SerifHeading
                size="4xl"
                weight="700"
                align="left"
                color="forest"
                className="mb-6"
              >
                More than a class. A community.
              </SerifHeading>
              <SerifText
                size="lg"
                align="left"
                color="sage"
                className="mb-8 leading-7 max-w-lg"
              >
                Twinkle Toe Love is a welcoming space for parents to meet, connect and enjoy their baby’s discoveries together. Because the early months are easier — and more joyful — when shared.
              </SerifText>

              <div className="space-y-8">
                <Pillar icon="Play" description="Sensory discovery at every age" />
                <Pillar icon="Connect" description="Parent-to-parent friendship" />
                <Pillar icon="Grow" description="Watching little wonders unfold" />
              </div>

              <p className="text-[10px] text-sage-400 leading-5 max-w-lg">
                We are a baby development and sensory studio, not a medical or therapeutic provider. We do not make developmental outcome guarantees.
              </p>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section 4 — Join us */}
      <SectionWrapper
        bg="forest"
        className="section-padding-compact"
      >
        <Container className="max-w-3xl mx-auto text-center">
          <div className="relative animate-reveal">
            <Eyebrow className="text-forest-green bg-sage-100 text-forest-green mx-auto mb-6">
              Be part of our beginning
            </Eyebrow>
            <SerifHeading
              size="4xl"
              weight="700"
              align="center"
              color="warm-ivory"
              className="mb-8"
            >
              Join the opening list
            </SerifHeading>
            <SerifText
              size="lg"
              align="center"
              color="sage-light"
              className="mb-10 max-w-xl mx-auto leading-7"
            >
              We’re creating something lovely for little ones and the people who love them. Join our opening list for updates, class announcements and first access when bookings become available.
            </SerifText>

            <WaitlistForm className="max-w-md mx-auto" />

            <div className="mt-10">
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 text-forest-green font-semibold hover:text-forest-green-dark transition-colors"
              >
                Explore our experiences <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}

function BenefitRow({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center text-forest-green text-[11px] font-body font-bold mt-0.5">
        {icon}
      </div>
      <div>
        <h4 className="font-serif font-semibold text-forest-green text-sm leading-none mb-1">
          {title}
        </h4>
        <p className="text-xs text-sage-600 leading-5">{description}</p>
      </div>
    </div>
  );
}

function WellnessIcon({
  icon,
  label,
  caption,
}: {
  icon: "sparkles" | "heart" | "hand" | "calm";
  label: string;
  caption: string;
}) {
  const iconColors: Record<string, string> = {
    sparkles: "text-forest-green",
    heart: "text-rose-pink",
    hand: "text-sage-700",
    calm: "text-blush-400",
  };

  const minimalIcons: Record<string, React.ReactNode> = {
    sparkles: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7l7 -3l-3 7l-7 3l-3 -7z" />
      </svg>
    ),
    heart: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    hand: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18a6 6 0 0 0 6-6v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a6 6 0 0 0 6 6z" />
      </svg>
    ),
    calm: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  };

  return (
    <div className="text-center">
      <div className={cn("flex items-center justify-center w-10 h-10 rounded-full mx-auto mb-3", iconColors[icon])}>
        {minimalIcons[icon]}
      </div>
      <h4 className="font-serif font-semibold text-forest-green text-xs leading-none mb-1">
        {label}
      </h4>
      <p className="text-[10px] text-sage-600 leading-4">{caption}</p>
    </div>
  );
}

function Pillar({ icon, description }: { icon: string; description: string }) {
  return (
    <div className="p-4 rounded-xl border border-pale-sage bg-white text-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sage-100 text-sage-700 font-body font-bold text-sm mx-auto mb-4">
        {icon}
      </div>
      <p className="text-xs text-sage-600 leading-5">{description}</p>
    </div>
  );
}
