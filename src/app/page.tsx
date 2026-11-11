import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SectionWrapper,
  Container,
  Eyebrow,
  SerifHeading,
  SerifText,
  FeaturePill,
  HeartIcon,
} from "@/components/boutique/layout";
import {
  BoutiqueImage,
  ImageFrame,
} from "@/components/boutique/image";

const SERVICES = [
  {
    id: "little-explorers-sensory",
    name: "Little Explorers Sensory",
    duration: "45 min",
    price: "£18",
    priceNote: "sample, per pair",
    ageBand: "3–12 months",
    description:
      "Gentle sensory discovery through age-appropriate textures, sounds and colours, guided by our facilitators in a calm setting.",
    image: "/images/baby-spa/little-explorers-sensory.png",
    imageAlt: "Sensory play materials for babies",
  },
  {
    id: "touch-and-togetherness",
    name: "Touch & Togetherness",
    duration: "45 min",
    price: "£25",
    priceNote: "sample, per pair",
    ageBand: "6 weeks–12 months",
    description:
      "Parent-led baby massage, connection and calming routines facilitated by a properly qualified instructor.",
    image: "/images/baby-spa/touch-and-togetherness.png",
    imageAlt: "Parent and baby during massage session",
  },
  {
    id: "wonder-and-wiggle",
    name: "Wonder & Wiggle",
    duration: "45 min",
    price: "£22",
    priceNote: "sample, per pair",
    ageBand: "3–18 months",
    description:
      "Gentle movement, age-appropriate tummy-time activities and sensory exploration designed for physical discovery.",
    image: "/images/baby-spa/placeholder-experiences.png",
    imageAlt: "Gentle movement activity for babies",
  },
];

const BENEFITS = [
  {
    title: "Age-appropriate sensory play",
    description:
      "Textures, sounds and colours chosen for each developmental stage.",
  },
  {
    title: "Parent-child bonding",
    description:
      "Facilitated sessions that create calm, meaningful connection between parent and baby.",
  },
  {
    title: "Intimate small groups",
    description:
      "Maximum four parent-and-baby pairs per session for gentle, focused attention.",
  },
  {
    title: "Calm, nurturing environment",
    description:
      "Screen-free, soothing spaces where parents can follow their baby’s lead.",
  },
];

export const metadata = {
  title: "Twinkle Toe Love – Baby Wellness Spa",
  description:
    "Premium baby development and sensory studio coming to Nottingham / West Bridgford. Gentle sensory play, parent-child bonding and calm experiences for little wonders. Join the waitlist.",
};

export default function Home() {
  return (
    <div className="flex flex-col" id="main-content">
      {/* Editorial Hero */}
      <SectionWrapper bg="ivory" className="pt-12 md:pt-24 pb-20 md:pb-32 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-5xl mx-auto">
            {/* Hero backdrop — subtle gradient fading right for text legibility */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-warm-ivory/90 via-warm-ivory/60 to-transparent pointer-events-none"></div>

            <div
              className="absolute inset-0 -z-20 bg-blush-50/20 rounded-[35%] blur-4xl"
              style={{ top: "-15%", right: "-15%", width: "700px", height: "700px" }}
            ></div>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image side */}
              <div className="relative h-[520px] md:h-[720px] flex items-center justify-center animate-reveal-delay-2">
                <ImageFrame aspect="4-3" variant="sage" className="h-full w-full shadow-2xl">
                  <BoutiqueImage
                    src="/images/baby-spa/hero-studio.png"
                    webpSrc="/images/baby-spa/hero-studio.webp"
                    alt="Baby feet in a soft blanket — calm studio environment"
                    width={1000}
                    height={750}
                    priority
                    className="h-full w-full object-cover"
                  />
                </ImageFrame>
                <div className="absolute -inset-px rounded-2xl border border-blush-200/40 pointer-events-none"></div>
              </div>

              {/* Text side */}
              <div className="relative z-10 flex flex-col justify-center animate-reveal">
                <Eyebrow>Premium baby development & sensory studio</Eyebrow>
                <SerifHeading size="5xl" weight="700" align="left" color="forest" className="mb-6">
                  Little wonders.<br />
                  <span className="text-rose-pink">Big discoveries.</span>
                </SerifHeading>
                <SerifText size="lg" align="left" color="sage" className="mb-8 max-w-lg">
                  Thoughtfully designed sensory play, gentle movement and
                  meaningful bonding, in small groups for babies and their
                  parents.
                </SerifText>
                <Button asChild variant="forest" size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">
                    <HeartIcon size={18} /> Join the waitlist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Meet Tanya */}
      <SectionWrapper bg="white" className="py-16 md:py-24 border-y border-pale-sage">
        <Container className="max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column: Portrait */}
            <div className="relative animate-reveal">
              <div className="absolute inset-0 -z-10 bg-blush-100 rounded-[4rem_2rem_2rem_4rem] blur-[60px]"></div>
              <div className="relative rounded-[3rem_1rem_2rem_2rem] overflow-hidden border border-blush-200 shadow-xl bg-white">
                <BoutiqueImage
                  src="/images/baby-spa/tanya-baby-wellness-portrait.png"
                  webpSrc="/images/baby-spa/tanya-baby-wellness-portrait.webp"
                  alt="Tanya Kercher, baby massage therapist and mum of two — warm, welcoming portrait"
                  width={700}
                  height={700}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right column: Content */}
            <div className="animate-reveal-delay-1 flex flex-col justify-center">
              <Eyebrow>The heart behind the gentle touch</Eyebrow>
              <SerifHeading size="4xl" weight="700" color="forest" align="left" className="mb-4">
                Meet Tanya
              </SerifHeading>
              <SerifText size="lg" align="left" color="sage" className="mb-8 leading-7">
                Mum of Two & Founder
              </SerifText>

              <div className="space-y-6">
                <p className="text-sm text-sage-600 leading-7">
                  Tanya brings warmth, patience and lived experience to every
                  session. As a mum of two, she knows the early months are equal
                  parts wonder and uncertainty, and she creates a space where
                  parents feel seen, supported and never judged.
                </p>
                <p className="text-sm text-sage-600 leading-7">
                  As a mum of two, Tanya knows that the early months are equal
                  parts wonder and uncertainty. She brings that lived
                  experience to every session, creating a space where parents
                  feel seen, supported and never judged.
                </p>
                <p className="text-sm text-sage-600 leading-7">
                  Her philosophy is simple: massage isn&rsquo;t something done
                  <em>to</em> a baby — it&rsquo;s something shared <em>with</em>
                  them. Tanya guides parents through gentle strokes and holds,
                  helping you grow in confidence as you discover what your
                  baby loves.
                </p>
              </div>

              <div className="mt-10 grid md:grid-cols-4 gap-6">
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
                <WellnessIcon
                  icon="sparkles"
                  label="Warm welcome"
                  caption="Parents feel seen and supported"
                />
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Studio Experience */}
      <SectionWrapper bg="ivory" className="py-16 md:py-24">
        <Container className="max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <div className="relative order-2 md:order-1 animate-reveal-delay-2">
              <ImageFrame aspect="3-2" variant="sage" className="shadow-xl">
                <BoutiqueImage
                  src="/images/baby-spa/hero-studio.png"
                  webpSrc="/images/baby-spa/hero-studio.webp"
                  alt="Calm studio interior — illustrative concept image"
                  width={700}
                  height={467}
                  className="w-full h-full object-cover"
                />
              </ImageFrame>
              <div className="absolute -bottom-6 -left-6 flex items-center gap-2 rounded-xl border border-white bg-warm-ivory/90 backdrop-blur px-4 py-2 shadow-sm">
                <HeartIcon size={14} color="rose" />
                <span className="text-xs text-sage-700 font-body font-medium">
                  Illustrative concept image
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="order-1 md:order-2 animate-reveal">
              <Eyebrow>The studio experience</Eyebrow>
              <SerifHeading size="4xl" weight="700" color="forest" align="left" className="mb-6">
                A calm, nurturing space for growing little humans
              </SerifHeading>
              <SerifText size="lg" align="left" color="sage" className="mb-8 leading-7">
                Our studio is designed around comfort, safety and
                parent-child connection. Thoughtfully selected materials, soft
                flooring and gentle lighting create an environment where
                babies can explore at their own pace — and parents can relax
                and be present.
              </SerifText>

              <div className="space-y-4">
                <StudioFeature
                  icon={<span className="text-xs">✧</span>}
                  title="Safety first"
                  description="Soft flooring, baby-safe materials and a calm, screen-free environment."
                />
                <StudioFeature
                  icon={<span className="text-xs">✧</span>}
                  title="Parent-child connection"
                  description="Every session is designed for you to participate alongside your baby."
                />
                <StudioFeature
                  icon={<span className="text-xs">✧</span>}
                  title="Intimate groups"
                  description="Maximum four parent-and-baby pairs per session."
                />
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Coffee Corner & Products */}
      <SectionWrapper bg="white" className="py-16 md:py-24 border-y border-pale-sage">
        <Container>
          <div className="text-center mb-14">
            <SerifHeading size="3xl" weight="600" color="forest" className="mb-4">
              Thoughtful extras for your visit
            </SerifHeading>
            <SerifText size="base" color="sage" className="mx-auto max-w-2xl leading-7">
              We&rsquo;re planning a quiet coffee corner and a small selection of
              carefully chosen baby products to complement your visit.
            </SerifText>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-pale-sage bg-warm-ivory p-8 text-center">
              <div className="relative h-40 overflow-hidden rounded-xl border border-sage-200 bg-white mb-4 mx-auto max-w-md">
                <BoutiqueImage
                  src="/images/baby-spa/product-coffee-corner.png"
                  alt="Coffee corner illustration"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-serif font-semibold text-forest-green text-base mb-2">Coffee corner</h4>
              <p className="text-sm text-sage-600 leading-6">
                A warm drink while your little one settles in — coming with
                the studio launch.
              </p>
            </div>
            <div className="rounded-xl border border-pale-sage bg-warm-ivory p-8 text-center">
              <div className="relative h-40 overflow-hidden rounded-xl border border-blush-200 bg-white mb-4 mx-auto max-w-md">
                <BoutiqueImage
                  src="/images/baby-spa/product-baby-items.png"
                  alt="Baby products illustration"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-serif font-semibold text-forest-green text-base mb-2">Baby products</h4>
              <p className="text-sm text-sage-600 leading-6">
                Carefully selected items to support sensory play at home.
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs text-sage-400 text-center">
            These are planned features for the studio launch — not yet
            operational.
          </p>
        </Container>
      </SectionWrapper>

      {/* Community & Philosophy */}
      <SectionWrapper bg="ivory" className="py-16 md:py-24">
        <Container className="max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image side - baby hand photo */}
            <div className="relative animate-reveal">
              <ImageFrame aspect="4-3" variant="blush" className="shadow-lg">
                <BoutiqueImage
                  src="/images/baby-spa/baby-bonding-hands.png"
                  webpSrc="/images/baby-spa/baby-bonding-hands.webp"
                  alt="Baby holding an adult&rsquo;s hand — connection and trust"
                  width={700}
                  height={525}
                  className="w-full h-full object-cover"
                />
              </ImageFrame>
            </div>

            {/* Content side */}
            <div className="animate-reveal-delay-1">
              <Eyebrow>Community & philosophy</Eyebrow>
              <SerifHeading size="4xl" weight="700" color="forest" align="left" className="mb-6">
                More than a class. A community.
              </SerifHeading>
              <SerifText size="lg" align="left" color="sage" className="mb-8 leading-7">
                Twinkle Toe Love is a welcoming space for parents to meet,
                connect and enjoy their baby&rsquo;s discoveries together.
                Because the early months are easier — and more joyful — when
                shared.
              </SerifText>

              <div className="grid md:grid-cols-3 gap-6">
                <Pillar icon="Play" description="Sensory discovery at every age" />
                <Pillar icon="Connect" description="Parent-to-parent friendship" />
                <Pillar icon="Grow" description="Watching little wonders unfold" />
              </div>

              <p className="mt-8 text-xs text-sage-400 leading-5">
                We are a baby development and sensory studio, not a medical
                or therapeutic provider. We do not make developmental outcome
                guarantees.
              </p>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Experience Cards */}
      <SectionWrapper bg="ivory" className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-16">
            <Eyebrow>Meaningful classes for every stage</Eyebrow>
            <SerifHeading size="3xl" weight="700" color="forest" className="mb-4">
              Gentle, guided experiences for you and your baby
            </SerifHeading>
            <SerifText size="lg" color="sage" className="mx-auto max-w-2xl">
              Each 45-minute experience is designed to encourage exploration
              and create special moments together.
            </SerifText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((svc) => (
              <Link
                key={svc.id}
                href="/contact"
                className="group relative flex flex-col h-full rounded-2xl border border-pale-sage bg-white hover:border-forest-green/30 transition-all"
              >
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <BoutiqueImage
                    src={svc.image}
                    alt={svc.imageAlt}
                    width={500}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-forest-green text-xs font-body font-semibold border border-white/60">
                      {svc.duration}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blush-100 text-rose-pink text-[10px] font-body font-semibold uppercase tracking-wider">
                      Sample pricing
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-forest-green text-lg mb-2 leading-tight">
                    {svc.name}
                  </h3>
                  <p className="text-sm text-sage-600 mb-6 flex-1 leading-6">
                    {svc.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-pale-sage flex items-baseline gap-1">
                    <span className="font-serif font-bold text-forest-green text-xl">{svc.price}</span>
                    <span className="text-xs text-sage uppercase tracking-wider">{svc.priceNote}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl border border-blush-200 bg-blush-50 text-center">
            <p className="text-sm text-rose-pink-dark font-medium mb-2">
              Prices are indicative samples — draft until commercially confirmed.
            </p>
            <p className="text-xs text-sage-600 leading-5 max-w-2xl mx-auto">
              All experiences, pricing and the timetable are subject to
              confirmation once the venue is secured.
            </p>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}

function StudioFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sage-100 text-sage-700 text-xs shrink-0 mt-0.5">
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

function WellnessIcon({
  icon,
  label,
  caption,
}: {
  icon: "sparkles" | "heart" | "hand" | "calm";
  label: string;
  caption: string;
}) {
  const icons: Record<string, React.ReactNode> = {
    sparkles: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1l3 7v4l7 3-4 8-8-5-8 5-4-8 7-3v-4l-3-7z" />
      </svg>
    ),
    heart: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.05.13-4.5 1.27-1.45-1.14-2.74-1.27-4.5-1.27A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    hand: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2h6v22" />
        <path d="M15 14h2.4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1h-2.4a2 2 0 0 1-2-1.97L15 14z" />
        <path d="M10 12a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1" />
        <path d="M12 10a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1" />
        <path d="M14 16a1 1 0 0 1-1-1h-1a1 1 0 0 1-1 1v1" />
        <path d="M16 16a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1" />
      </svg>
    ),
    calm: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z" />
      </svg>
    ),
  };

  const iconColors: Record<string, string> = {
    sparkles: "text-forest-green",
    heart: "text-rose-pink",
    hand: "text-sage-700",
    calm: "text-blush-400",
  };

  // Modern, minimalistic icons — simple geometric shapes instead of detailed line art
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
