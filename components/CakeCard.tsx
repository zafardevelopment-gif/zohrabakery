import Image from "next/image";
import Link from "next/link";
import type { Cake } from "@/lib/types";

interface CakeCardProps {
  cake: Cake;
  priority?: boolean;
}

export function CakeCard({ cake, priority = false }: CakeCardProps) {
  return (
    <Link
      href={`/cakes/${cake.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md shadow-chocolate/5 ring-1 ring-blush-light transition-transform hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-blush-light">
        <Image
          src={cake.image}
          alt={cake.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {cake.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white shadow">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blush-dark">
          {cake.category}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-chocolate">{cake.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-chocolate/70">{cake.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-blush-dark">
            View sizes &amp; order
          </span>
          <span className="rounded-full border border-chocolate/20 px-3 py-1 text-xs font-medium text-chocolate/80">
            {cake.sizes.length} size{cake.sizes.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
