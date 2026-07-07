import Image from "next/image";
import Link from "next/link";
import { getFeaturedCakes } from "@/lib/cakes";
import { CakeCard } from "@/components/CakeCard";
import { WhatsappButton } from "@/components/WhatsappButton";
import { buildWhatsappClassEnquiryLink, buildWhatsappGeneralLink } from "@/lib/whatsapp";
import { TAGLINE } from "@/lib/constants";

// Re-fetch from Supabase periodically so admin panel changes (add/edit/
// delete/feature toggle) show up without needing a redeploy.
export const revalidate = 60;

const TRUST_POINTS = [
  {
    title: "Homemade With Love",
    description: "Every cake is baked fresh in small batches, just like family celebrations deserve.",
    icon: "🏠",
  },
  {
    title: "100% Pure Veg",
    description: "No eggs, no compromises — every recipe is completely vegetarian.",
    icon: "🌱",
  },
  {
    title: "Custom Orders",
    description: "Birthdays, anniversaries, or just because — tell us your vision and we'll bake it.",
    icon: "🎂",
  },
  {
    title: "Fresh Ingredients",
    description: "Only the freshest cream, fruit, and flavours go into every Zohra Bakery creation.",
    icon: "🍓",
  },
];

const OCCASIONS = [
  { title: "Birthdays", icon: "🎉" },
  { title: "Anniversaries", icon: "💍" },
  { title: "Festivals", icon: "🪔" },
  { title: "Get-Togethers", icon: "☕" },
];

export default async function Home() {
  const featuredCakes = await getFeaturedCakes();

  return (
    <div>
      {/* Hero */}
      <section className="scallop-bottom relative overflow-hidden bg-gradient-to-b from-blush-light to-cream px-4 pb-20 pt-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold text-chocolate shadow-sm ring-1 ring-blush-dark/20">
              🌱 100% Pure Veg
            </span>
            <h1 className="mt-5 font-script text-6xl font-bold text-chocolate sm:text-7xl lg:text-8xl">
              Zohra Bakery
            </h1>
            <p className="mt-4 text-lg font-medium text-chocolate/80 sm:text-xl">
              {TAGLINE}
            </p>
            <p className="mx-auto mt-3 max-w-md text-chocolate/70 lg:mx-0">
              Handcrafted cakes baked fresh in Kishanganj, Bihar — Tiramisu, Velvet,
              Rasmalai, Chocolate and more, made the way Ghazala makes them for her
              own family.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <WhatsappButton href={buildWhatsappGeneralLink()}>
                Order on WhatsApp
              </WhatsappButton>
              <Link
                href="/cakes"
                className="rounded-full border-2 border-chocolate px-6 py-3 font-semibold text-chocolate transition-colors hover:bg-chocolate hover:text-cream"
              >
                Browse Cake Menu
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex justify-center">
            <div className="animate-float-slow relative h-64 w-64 sm:h-80 sm:w-80">
              <Image
                src="/images/cakes/velvet.svg"
                alt="A signature Zohra Bakery cake"
                fill
                priority
                className="rounded-full object-cover shadow-2xl ring-8 ring-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-blush-light"
            >
              <div className="text-4xl">{point.icon}</div>
              <h3 className="mt-3 font-semibold text-chocolate">{point.title}</h3>
              <p className="mt-2 text-sm text-chocolate/70">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured cakes */}
      <section className="bg-blush-light/40 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-script text-4xl font-bold text-chocolate sm:text-5xl">
                Our Favourites
              </h2>
              <p className="mt-2 text-chocolate/70">Loved again and again by our customers.</p>
            </div>
            <Link
              href="/cakes"
              className="hidden shrink-0 rounded-full border-2 border-chocolate px-5 py-2 text-sm font-semibold text-chocolate transition-colors hover:bg-chocolate hover:text-cream sm:inline-block"
            >
              View Full Menu
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCakes.map((cake, i) => (
              <CakeCard key={cake.id} cake={cake} priority={i < 3} />
            ))}
          </div>

          <Link
            href="/cakes"
            className="mt-8 block rounded-full border-2 border-chocolate px-5 py-2 text-center text-sm font-semibold text-chocolate transition-colors hover:bg-chocolate hover:text-cream sm:hidden"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* Occasions */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-script text-4xl font-bold text-chocolate sm:text-5xl">
          Occasions We Cater To
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-chocolate/70">
          Custom orders for every celebration — just share your idea, and we&apos;ll bring it to life.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {OCCASIONS.map((occasion) => (
            <div
              key={occasion.title}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white py-8 shadow-sm ring-1 ring-blush-light"
            >
              <span className="text-4xl">{occasion.icon}</span>
              <span className="font-semibold text-chocolate">{occasion.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Classes teaser */}
      <section className="scallop-top scallop-bottom mx-4 my-16 rounded-3xl bg-chocolate px-6 py-14 text-center text-cream sm:mx-6">
        <h2 className="font-script text-4xl font-bold text-blush sm:text-5xl">
          Learn With Us
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cream/80">
          Admission open for our Cake &amp; Bakery Classes — learn Ghazala&apos;s
          homemade recipes and techniques, from beginner basics to specialty cakes.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsappButton href={buildWhatsappClassEnquiryLink()} variant="solid">
            Enquire on WhatsApp
          </WhatsappButton>
          <Link
            href="/classes"
            className="rounded-full border-2 border-blush px-6 py-3 font-semibold text-blush transition-colors hover:bg-blush hover:text-chocolate"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
