import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SectionWrapper,
  Container,
  Eyebrow,
  SerifHeading,
  SerifText,
} from "@/components/boutique/layout";
import { BoutiqueImage } from "@/components/boutique/image";

export const metadata = {
  title: "Experiences – Twinkle Toe Love Baby Wellness Spa",
  description:
    "Choose from three gentle baby development experiences: Little Explorers Sensory, Touch & Togetherness and Wonder & Wiggle. Sample pricing, 45 minutes each.",
};

const DRAFT_NOTICE = {
  eyebrow: "Indicative pricing — draft until confirmed",
  heading: "Prices are subject to confirmation",
  body:
    "All experiences, pricing and the timetable shown are illustrative samples. Final pricing and availability will be confirmed once the venue is secured and all local approvals are in place.",
};

export default function ExperiencesPage() {
  const services = [
    {
      id: "little-explorers-sensory",
      name: "Little Explorers Sensory",
      duration: "45 min",
      price: "£18",
      priceNote: "sample, per pair",
      ageBand: "3–12 months",
      description:
        "Guided sensory discovery through age-appropriate textures, sounds and colours in a calm, facilitated environment.",
      features: [
        "Age-appropriate textures, sounds and colours",
        "Calm, facilitated exploration",
        "Small group of up to 4 pairs",
      ],
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
        "Parent-led baby massage, bonding and calming routines, facilitated by a properly qualified instructor.",
      features: [
        "Parent-led baby massage techniques",
        "Facilitated by a qualified instructor",
        "Bonding and calming routines",
      ],
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
        "Gentle movement, tummy-time style activity where appropriate and sensory exploration designed for physical discovery.",
      features: [
        "Gentle movement and tummy time",
        "Sensory exploration",
        "Age-appropriate physical play",
      ],
      image: "/images/baby-spa/hero-studio.png",
      imageAlt: "Gentle movement activity for babies",
    },
  ];

  return (
    <div className="flex flex-col" id="main-content">
      <SectionWrapper bg="white" className="py-12 md:py-20 border-b border-pale-sage">
        <Container>
          <div className="text-center mb-14">
            <Eyebrow>Meaningful classes for every stage</Eyebrow>
            <SerifHeading size="4xl" weight="700" color="forest" className="mb-6">
              Gentle, guided experiences for you and your baby
            </SerifHeading>
            <SerifText size="lg" color="sage" className="mx-auto max-w-2xl leading-7">
              Each 45-minute experience is designed to encourage exploration
              and create special moments together.
            </SerifText>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((svc) => (
              <ExperienceCard key={svc.id} {...svc} />
            ))}
          </div>

          <div className="mt-14 p-8 rounded-2xl border border-blush-200 bg-blush-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-rose-pink-dark font-medium uppercase tracking-wider mb-1">
                  {DRAFT_NOTICE.eyebrow}
                </p>
                <SerifHeading size="2xl" weight="600" align="left" color="charcoal" className="mb-3">
                  {DRAFT_NOTICE.heading}
                </SerifHeading>
                <p className="text-sm text-sage-600 leading-6">
                  {DRAFT_NOTICE.body}
                </p>
              </div>
              <Button asChild variant="forest" className="w-full sm:w-auto">
                <Link href="/contact">Join the waitlist</Link>
              </Button>
            </div>
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
  description,
  features,
  image,
  imageAlt,
}: {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
}) {
  return (
    <Link
      href="/contact"
      className="group relative flex flex-col h-full rounded-2xl border border-pale-sage bg-white hover:border-forest-green/30 transition-all"
    >
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <BoutiqueImage
          src={image}
          alt={imageAlt}
          width={500}
          height={375}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-forest-green text-xs font-body font-bold shadow-sm">
            {duration}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-3">
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blush-100 text-rose-pink text-[10px] font-body font-semibold uppercase tracking-wider">
            Sample pricing
          </span>
        </div>
        <h3 className="font-serif font-semibold text-forest-green text-lg mb-2 leading-tight">
          {name}
        </h3>
        <p className="text-sm text-sage-600 mb-6 flex-1 leading-6">
          {description}
        </p>
        <ul className="space-y-2 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-sage-600 leading-5">
              <div className="flex items-center justify-center w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0 mt-0.5"></div>
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 border-t border-pale-sage flex items-baseline gap-1">
          <span className="font-serif font-bold text-forest-green text-xl">{price}</span>
          <span className="text-xs text-sage uppercase tracking-wider">{priceNote}</span>
        </div>
      </div>
    </Link>
  );
}
