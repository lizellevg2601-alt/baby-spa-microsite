import Link from "next/link";
import { Button } from "@/components/ui/button";
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

const SERVICES = [
  {
    id: "little-explorers-sensory",
    name: "Little Explorers Sensory",
    duration: "45 min",
    price: "£18",
    priceNote: "indicative, per pair",
    ageBand: "3–12 months",
    description:
      "A world of gentle discovery through textures, sounds and playful sensory moments, shared together.",
    image: "/images/baby-spa/little-explorers-sensory.png",
    imageAlt: "Sensory play materials for babies",
  },
  {
    id: "touch-and-togetherness",
    name: "Touch & Togetherness",
    duration: "45 min",
    price: "£25",
    priceNote: "indicative, per pair",
    ageBand: "6 weeks–12 months",
    description:
      "A calming, parent-led experience centred on nurturing touch, connection and precious moments together.",
    image: "/images/baby-spa/baby-feet-wellness.png",
    imageAlt: "Parent gently massaging baby's feet in a calm setting",
  },
  {
    id: "wonder-and-wiggle",
    name: "Wonder & Wiggle",
    duration: "45 min",
    price: "£22",
    priceNote: "indicative, per pair",
    ageBand: "3–18 months",
    description:
      "Playful movement and age-appropriate activities that encourage little bodies to explore, stretch and discover.",
    image: "/images/baby-spa/wonder-and-wiggle.png",
    imageAlt: "Baby enjoying gentle movement on a soft play mat",
  },
];

export const metadata = {
  title: "Twinkle Toe Love – Baby Wellness Spa",
  description:
    "Premium baby development and sensory studio coming to Nottingham / West Bridgford. Gentle sensory play, parent-child bonding and calm experiences for little wonders. Join the opening list.",
};

export default function Home() {
  return (
    <div className="flex flex-col" id="main-content">
      {/* Section 1 — Luxury editorial hero */}
      <SectionWrapper
        bg="ivory"
        className="relative pt-6 pb-12 overflow-hidden"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-24 items-center">
              {/* Text side — Left on desktop */}
              <div className="text-center md:text-left animate-reveal">
                <Eyebrow className="md:mx-0">Premium baby development & sensory studio</Eyebrow>
                <SerifHeading
                  size="6xl"
                  weight="700"
                  align="center"
                  color="forest"
                  className="mb-4 md:mb-6"
                >
                  Little wonders.<br />
                  <span className="text-rose-pink">Big discoveries.</span>
                </SerifHeading>
                <SerifText
                  size="lg"
                  align="center"
                  color="sage"
                  className="mb-6 max-w-lg md:mx-0 leading-7"
                >
                  A little space for them to discover. A beautiful moment for you to share.
                </SerifText>
                <p className="text-sm text-sage-600 mb-8 max-w-lg md:mx-0 leading-7">
                  Twinkle Toe Love is a gentle baby development and sensory studio coming to Nottingham / West Bridgford. We offer calm, nurturing experiences — sensory play, movement and parent-and-baby bonding — in small, welcoming groups.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button
                    asChild
                    variant="forest"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link href="#experiences">
                      <HeartIcon size={18} /> Explore our experiences
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link href="/contact">
                      Join the opening list <span className="ml-2">→</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Image side — Right on desktop */}
              <div className="relative flex items-center justify-center animate-reveal-delay-2">
                <ImageFrame aspect="4-3" variant="none" className="h-full w-full max-w-md shadow-xl">
                  <BoutiqueImage
                    src="/images/baby-spa/baby-bonding-hands.png"
                    webpSrc="/images/baby-spa/baby-bonding-hands.webp"
                    alt="Parent holding baby’s hand — gentle connection and trust"
                    width={800}
                    height={600}
                    priority
                    className="h-full w-full object-cover"
                  />
                </ImageFrame>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-lg border border-white bg-warm-ivory/90 backdrop-blur px-3 py-1 shadow-sm">
                  <HeartIcon size={12} color="rose" />
                  <span className="text-[10px] text-sage-700 font-body font-medium">
                    Meaningful connection
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Section 2 — Discover our experiences */}
      <SectionWrapper
        bg="white"
        id="experiences"
        className="section-padding border-t border-pale-sage"
      >
        <Container className="max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <Eyebrow>Discover our experiences</Eyebrow>
            <SerifHeading
              size="4xl"
              weight="700"
              align="center"
              color="forest"
              className="mb-6"
            >
              Gentle classes for you and your baby
            </SerifHeading>
            <SerifText
              size="lg"
              align="center"
              color="sage"
              className="mb-2 max-w-2xl mx-auto leading-7"
            >
              Each 45-minute experience is designed to encourage exploration and create special moments together.
            </SerifText>
          </div>

          <div className="grid gap-6 md:grid-cols-3 gap-8">
            {SERVICES.map((svc) => (
              <ExperienceCard
                key={svc.id}
                {...svc}
              />
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl border border-blush-200 bg-blush-50 text-center">
            <p className="text-xs text-rose-pink-dark font-medium mb-4 uppercase tracking-wider">
              Indicative pricing — draft until confirmed
            </p>
            <p className="text-xs text-sage-600 leading-6 max-w-2xl mx-auto">
              All experiences, pricing and the timetable are subject to confirmation once the venue is secured.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section 3 — Your little escape together */}
      <SectionWrapper
        bg="ivory"
        className="section-padding-compact"
      >
        <Container className="max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image side */}
            <div className="relative animate-reveal-delay-2">
              <ImageFrame aspect="4-3" variant="none" className="shadow-xl">
                <BoutiqueImage
                  src="/images/baby-spa/hero-studio.png"
                  webpSrc="/images/baby-spa/hero-studio.webp"
                  alt="Calm studio interior — illustrative concept image"
                  width={700}
                  height={525}
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
              <Eyebrow>Your little escape together</Eyebrow>
              <SerifHeading
                size="4xl"
                weight="700"
                align="left"
                color="forest"
                className="mb-6"
              >
                Slow down. Connect. Discover.
              </SerifHeading>
              <SerifText
                size="lg"
                align="left"
                color="sage"
                className="mb-8 leading-7"
              >
                Some of the most beautiful moments happen when we slow down. A chance to connect, discover and simply enjoy being together.
              </SerifText>

              <div className="space-y-6">
                <BenefitRow
                  icon="✧"
                  title="Small, welcoming groups"
                  description="Maximum four parent-and-baby pairs per session for gentle, focused attention."
                />
                <BenefitRow
                  icon="✧"
                  title="Gentle, baby-led experiences"
                  description="We follow your baby’s cues — never rushing a moment that needs to linger."
                />
                <BenefitRow
                  icon="✧"
                  title="Meaningful moments together"
                  description="Screen-free, soothing spaces where parents can follow their baby’s lead."
                />
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section 4 — Meet Tanya */}
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
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-forest-green/30 bg-forest-green/5 px-5 py-2.5 text-forest-green text-sm font-semibold hover:bg-forest-green hover:text-white transition-colors"
              >
                <HeartIcon size={14} color="rose" />
                Get to know Tanya
              </Link>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section 5 — Thoughtful little extras */}
      <SectionWrapper
        bg="ivory"
        className="section-padding-compact"
      >
        <Container className="max-w-6xl">
          <div className="text-center mb-12">
            <Eyebrow>A little something for you, too.</Eyebrow>
            <SerifHeading
              size="3xl"
              weight="700"
              align="center"
              color="forest"
              className="mb-6"
            >
              Beautiful little touches we're planning for your visits.
            </SerifHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <ExtraFeature
              image="/images/baby-spa/product-coffee-corner.png"
              alt="Coffee served in a cream ceramic cup"
              title="A moment to unwind"
              description="A quiet coffee corner for a well-deserved pause."
              textColor="white"
            />
            <ExtraFeature
              image="/images/baby-spa/product-baby-items.png"
              alt="Carefully chosen baby gifts and sensory essentials"
              title="Thoughtful little finds"
              description="Carefully chosen gifts and sensory essentials for little ones."
              textColor="white"
            />
          </div>

          <p className="mt-10 text-xs text-sage-400 text-center leading-6">
            Planned for the studio opening.
          </p>
        </Container>
      </SectionWrapper>

      {/* Section 6 — Be part of our beginning */}
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
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}

function ExperienceCard({
  id,
  name,
  duration,
  price,
  priceNote,
  ageBand,
  description,
  image,
  imageAlt,
}: {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceNote: string;
  ageBand: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <Link
      href="/contact"
      className="group flex flex-col h-full rounded-2xl border border-pale-sage/30 bg-white transition-all hover:border-forest-green/50 hover:shadow-sm"
    >
      <div className="relative h-32 md:h-44 overflow-hidden rounded-t-2xl">
        <BoutiqueImage
          src={image}
          alt={imageAlt}
          width={700}
          height={525}
          priority
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-forest-green text-lg mb-2 leading-tight">
          {name}
        </h3>
        <p className="text-sm text-sage-600 mb-3 flex-1 leading-6">
          {description}
        </p>
        <div className="flex items-start gap-2 text-xs text-sage-500 leading-5 mb-4">
          <span className="flex-shrink-0">Age:</span>
          <span>{ageBand}</span>
          <span className="flex-shrink-0">·</span>
          <span>{duration}</span>
        </div>
        <div className="mt-auto flex items-baseline gap-1">
          <span className="font-serif font-bold text-forest-green text-lg">
            {price}
          </span>
          <span className="text-[10px] text-sage-400 uppercase tracking-wider">
            Indicative price
          </span>
        </div>
        <Button asChild variant="outline" size="sm" className="mt-4 w-full text-center">
          <Link href="/contact">Discover this experience</Link>
        </Button>
      </div>
    </Link>
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

function ExtraFeature({
  image,
  alt,
  title,
  description,
  textColor = "forest",
}: {
  image: string;
  alt: string;
  title: string;
  description: string;
  textColor?: "forest" | "white";
}) {
  const titleColor = textColor === "white" ? "text-warm-ivory" : "text-forest-green";
  const descColor = textColor === "white" ? "text-warm-ivory/90" : "text-sage-600";

  return (
    <div className="relative h-40 md:h-52 overflow-hidden rounded-2xl border border-pale-sage/50 bg-white">
      <BoutiqueImage
        src={image}
        alt={alt}
        width={700}
        height={400}
        priority
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
        <h4 className={`font-serif font-semibold ${titleColor} text-lg mb-1 leading-none`}>
          {title}
        </h4>
        <p className={`text-sm ${descColor} leading-6`}>{description}</p>
      </div>
    </div>
  );
}
