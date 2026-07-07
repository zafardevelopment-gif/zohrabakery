"use client";

import type { CakeSize } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: CakeSize[];
  selected: CakeSize;
  onSelect: (size: CakeSize) => void;
}

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-chocolate">Choose Size</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.label}
            type="button"
            onClick={() => onSelect(size)}
            className={cn(
              "rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors",
              selected.label === size.label
                ? "border-blush-dark bg-blush text-chocolate"
                : "border-blush-light bg-white text-chocolate/70 hover:border-blush"
            )}
          >
            {size.label} · {formatPrice(size.price)}
          </button>
        ))}
      </div>
    </div>
  );
}
