import Link from "next/link";
import {
  ArrowRight,
  Gift,
  Heart,
  Sparkles,
  Package,
  CreditCard,
  CalendarHeart,
  BookOpen,
  Star,
} from "lucide-react";

export const metadata = {
  title: "Gifts, Memberships & Little Extras | Twinkle Toe Love",
  description:
    "Discover the gifts, take-home sensory treasures, class memberships and special experiences we're planning for Twinkle Toe Love Baby Wellness Spa in Nottingham.",
};

const giftCollections = [
  {
    name: "The Little Wonder Box",
    price: "£35",
    description:
      "A thoughtfully curated welcome-baby collection, envisioned with sensory discovery cards, a soft muslin and a heartfelt note.",
    detail: "A little wonder to unwrap.",
  },
  {
    name: "The Togetherness Collection",
    price: "£49",
    description:
      "A special class experience paired with a beautiful everyday keepsake and a personal message.",
    detail: "Give a moment to share.",
  },
  {
    name: "The Discovery Collection",
    price: "£59",
    description:
      "A sensory-inspired gift collection, a little at-home activity inspiration and a class experience.",
    detail: "For curious little explorers.",
  },
];

const membershipIdeas = [
  { name: "Little Moments", price: "£39", credits: "2 class credits a month", description: "For families who love an occasional little escape." },
  { name: "Wonder Club", price: "£72", credits: "4 class credits a month", description: "A lovely weekly rhythm of connection and discovery." },
  { name: "Discovery Plus", price: "£99", credits: "6 class credits a month", description: "For families who want more moments together." },
];

const takeHome = [
  { name: "Sensory scarves", description: "Supervised texture and movement play to continue together at home." },
  { name: "Discovery cards", description: "Age-appropriate high-contrast images for quiet moments of exploration." },
  { name: "Gentle grasping toys", description: "Carefully selected, age-suitable playthings for curious hands." },
  { name: "Soft muslins & keepsakes", description: "Useful, beautiful everyday essentials and thoughtful gifts." },
];

const beyondClasses = [
  { icon: CalendarHeart, title: "Private little gatherings", description: "Small celebrations and exclusive parent-and-baby experiences, designed around your group." },
  { icon: Sparkles, title: "Specialist guest workshops", description: "Occasional sessions with appropriately qualified guest professionals, subject to availability." },
  { icon: BookOpen, title: "Twinkle Toe Love at Home", description: "Original sensory activity guides and gentle ideas for meaningful moments between visits." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700">{children}</p>;
}

function InterestLink({ label = "Join the opening list" }: { label?: string }) {
  return (
    <Link
      href="/contact"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
    >
      {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export default function GiftsAndMorePage() {
  return (
    <div id="main-content" className="bg-warm-ivory">
      <section className="px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-9 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="min-w-0">
            <SectionLabel>Little extras, lasting memories</SectionLabel>
            <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[1.03] text-forest-green">
              More little moments to <em className="font-normal text-rose-pink-dark">treasure.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-sage-700 md:text-lg">
              From thoughtful baby gifts to class memberships and special gatherings, we&apos;re dreaming up lovely ways to keep the connection going beyond the studio.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-sage-600">
              These offerings are currently being planned. Join our opening list for updates as the details are confirmed.
            </p>
            <div className="mt-8"><InterestLink /></div>
          </div>
          <div className="relative flex min-h-64 flex-col justify-center rounded-[2rem] bg-pale-sage p-8 text-center md:min-h-96 md:p-12">
            <Heart className="mx-auto h-10 w-10 text-rose-pink" aria-hidden="true" strokeWidth={1.4} />
            <p className="mt-6 font-serif text-3xl leading-tight text-forest-green md:text-4xl">
              Loved it in class?
            </p>
            <p className="mt-2 font-serif text-2xl italic leading-tight text-sage-700 md:text-3xl">
              Continue the little moments at home.
            </p>
            <span className="mt-8 text-xs font-semibold uppercase tracking-widest text-sage-700">Thoughtfully curated for you and baby</span>
          </div>
        </div>
      </section>

      <section id="gift-collections" className="bg-white px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Gifting, beautifully considered</SectionLabel>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-tight text-forest-green md:text-5xl">A little wonder to give.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-sage-600">
            Thoughtful gift collections for new arrivals, baby showers and the people who deserve a beautiful moment together.
          </p>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {giftCollections.map((gift, index) => (
              <article key={gift.name} className="flex flex-col overflow-hidden rounded-2xl border border-pale-sage bg-warm-ivory">
                <div className={`flex h-40 items-center justify-center ${index === 1 ? "bg-blush-100" : "bg-pale-sage"}`}>
                  <Gift className="h-12 w-12 text-forest-green/70" strokeWidth={1.25} aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-widest text-sage-700">{gift.detail}</p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold text-forest-green">{gift.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-sage-600">{gift.description}</p>
                  <p className="mt-5 text-sm font-medium text-forest-green">Concept price: {gift.price}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-sage-600">Gift contents, prices and availability are illustrative and subject to confirmation. No gift boxes are currently available to purchase.</p>
        </div>
      </section>

      <section id="memberships" className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>A little routine to look forward to</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-forest-green md:text-5xl">Belong to the Wonder Club.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-sage-600">
            We&apos;re exploring flexible monthly class credits to make regular visits simpler. No unlimited sessions, no complicated commitments.
          </p>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {membershipIdeas.map((plan) => (
              <article key={plan.name} className="flex flex-col rounded-2xl border border-sage-200 bg-white p-6">
                <p className="text-xs uppercase tracking-widest text-sage-700">Proposed membership</p>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-forest-green">{plan.name}</h3>
                <p className="mt-4 text-3xl font-semibold text-forest-green">{plan.price}<span className="ml-1 text-sm font-normal text-sage-600">/ month</span></p>
                <p className="mt-3 font-semibold text-sm text-forest-green">{plan.credits}</p>
                <p className="mt-3 flex-1 text-sm leading-7 text-sage-600">{plan.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-sage-600">Membership tiers and prices are ideas under review—not active subscriptions. Credit validity, cancellations and priority booking terms will be published before launch.</p>
        </div>
      </section>

      <section id="take-home" className="bg-white px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>From our sessions to your home</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-forest-green md:text-5xl">Little discoveries to take home.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-sage-600">A small, carefully chosen range inspired by the things families enjoy during our classes.</p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {takeHome.map((item) => (
              <article key={item.name} className="rounded-2xl bg-warm-ivory p-6">
                <Package className="h-6 w-6 text-sage-700" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-forest-green">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-sage-600">{item.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-sage-600">All products will be selected for the intended age and supervised use. Product selection and availability have not yet been confirmed.</p>
        </div>
      </section>

      <section id="gift-cards" className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-9 md:grid-cols-2 md:gap-16">
          <div className="rounded-[2rem] bg-blush-100 p-8 text-center md:p-12">
            <CreditCard className="mx-auto h-10 w-10 text-forest-green" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-5 font-serif text-3xl text-forest-green">The gift of togetherness</p>
            <p className="mt-4 text-sm text-sage-700">Planned voucher denominations</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["£25", "£50", "£75", "£100"].map((amount) => <span key={amount} className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-forest-green">{amount}</span>)}
            </div>
          </div>
          <div>
            <SectionLabel>Give moments, not just things</SectionLabel>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-forest-green md:text-5xl">An experience to remember.</h2>
            <p className="mt-4 text-base leading-8 text-sage-600">
              We&apos;re planning digital and beautifully presented gift vouchers for classes and eligible products. Perfect for grandparents, baby showers and thoughtful surprises.
            </p>
            <p className="mt-4 text-sm leading-7 text-sage-600">Gift card purchases and redemption are not available yet. Terms will be published before they go on sale.</p>
          </div>
        </div>
      </section>

      <section id="rewards" className="bg-white px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <SectionLabel>A little thank-you for coming back</SectionLabel>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-forest-green md:text-5xl">Little Wonders Club.</h2>
            <p className="mt-4 text-base leading-8 text-sage-600">
              A simple digital stamp-card idea to celebrate the little moments you share with us. Our proposed reward: something lovely after ten paid visits.
            </p>
            <p className="mt-3 text-sm leading-7 text-sage-600">
              We&apos;re also considering a thoughtful refer-a-friend thank-you. Full rewards, eligibility and terms will be confirmed before launch.
            </p>
          </div>
          <div className="rounded-[2rem] bg-pale-sage p-8 md:p-10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-forest-green">A little joy, every visit</span>
              <Star className="h-6 w-6 text-rose-pink" aria-hidden="true" />
            </div>
            <div aria-label="Illustrative six of ten stamp card" className="mt-7 grid grid-cols-5 gap-3">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={`flex aspect-square items-center justify-center rounded-full border ${i < 6 ? "border-forest-green bg-forest-green text-white" : "border-sage-300 bg-white text-sage-600"}`}>
                  {i < 6 ? <Heart className="h-4 w-4" aria-hidden="true" /> : <span className="text-xs">{i + 1}</span>}
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-xs text-sage-700">Illustrative loyalty card · Not yet active</p>
          </div>
        </div>
      </section>

      <section id="private-experiences" className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Beyond our regular classes</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-forest-green md:text-5xl">More ways to make memories.</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {beyondClasses.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-pale-sage bg-white p-6">
                <Icon className="h-7 w-7 text-sage-700" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 font-serif text-2xl font-semibold text-forest-green">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-sage-600">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-sage-600">Private events, workshops, photography collaborations and digital resources are prospective offerings; dates and partners have not been confirmed.</p>
        </div>
      </section>

      <section className="bg-forest-green px-5 py-16 text-center sm:px-8 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-light">Be part of our beginning</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">The loveliest moments are still to come.</h2>
          <p className="mt-5 text-base leading-8 text-white/85">Join our opening list to hear when experiences, gifts and memberships become available.</p>
          <div className="mt-8">
            <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest-green hover:bg-warm-ivory">
              Join the opening list <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
