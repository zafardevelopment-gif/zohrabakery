import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCakes, getCakeById } from "@/lib/cakes";
import { CakeOrderForm } from "@/components/CakeOrderForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Re-fetch from Supabase periodically so admin panel changes (edits, price
// updates, new cakes) show up without needing a redeploy.
export const revalidate = 60;

export async function generateStaticParams() {
  const cakes = await getAllCakes();
  return cakes.map((cake) => ({ slug: cake.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cake = await getCakeById(slug);
  if (!cake) return {};

  return {
    title: cake.name,
    description: `${cake.description} Order on WhatsApp from Zohra Bakery, Kishanganj.`,
    openGraph: {
      images: [{ url: cake.image }],
    },
  };
}

export default async function CakeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cake = await getCakeById(slug);

  if (!cake) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Link href="/cakes" className="text-sm font-medium text-blush-dark hover:underline">
        ← Back to Cake Menu
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-blush-light shadow-md">
          <Image
            src={cake.image}
            alt={cake.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blush-dark">
            {cake.category}
          </p>
          <h1 className="mt-1 font-script text-5xl font-bold text-chocolate">{cake.name}</h1>
          <p className="mt-3 text-chocolate/70">{cake.description}</p>

          <div className="mt-8">
            <CakeOrderForm cake={cake} />
          </div>
        </div>
      </div>
    </div>
  );
}
