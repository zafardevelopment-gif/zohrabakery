import type { Metadata } from "next";
import Image from "next/image";
import { PROPRIETOR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet Ghazala Fatma, the heart behind Zohra Bakery — a 100% pure veg, homemade cake business in Kishanganj, Bihar built on love, care, and fresh ingredients.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="font-script text-5xl font-bold text-chocolate sm:text-6xl">
          Our Story
        </h1>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-blush-light shadow-md">
          <Image
            src="/images/cakes/rasmalai.svg"
            alt="A Zohra Bakery homemade cake"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4 text-chocolate/80">
          <p>
            Zohra Bakery began the way most good things do at home — in {PROPRIETOR}&apos;s
            own kitchen, baking cakes for family and friends who couldn&apos;t stop
            asking for more. What started as a small labour of love in Kishanganj,
            Bihar has grown into a name that neighbours and families trust for
            every celebration.
          </p>
          <p>
            Every cake that leaves our kitchen is made the same way we&apos;d make
            it for our own family: with fresh ingredients, real care, and zero
            shortcuts. We are proudly <strong className="text-chocolate">100% pure
            vegetarian</strong>, and every recipe is tested and perfected by
            {" "}{PROPRIETOR} herself before it ever reaches your table.
          </p>
          <p>
            Whether it&apos;s a first birthday, a golden anniversary, or just a
            Tuesday that deserves something sweet, Zohra Bakery bakes it with the
            same warmth — homemade goodness, made with love.
          </p>
        </div>
      </div>
    </div>
  );
}
