"use client";

import { useMemo, useState } from "react";
import type { Cake } from "@/lib/types";
import { CakeCard } from "@/components/CakeCard";
import { cn } from "@/lib/utils";

export function CakeCatalog({ cakes, categories }: { cakes: Cake[]; categories: string[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return cakes;
    return cakes.filter((cake) => cake.category === active);
  }, [cakes, active]);

  const tabs = ["All", ...categories];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors",
              active === tab
                ? "border-blush-dark bg-blush text-chocolate"
                : "border-blush-light bg-white text-chocolate/70 hover:border-blush"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cake) => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-chocolate/60">No cakes in this category yet.</p>
      )}
    </div>
  );
}
