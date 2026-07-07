"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Cake } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function CakeAdminList({ cakes }: { cakes: Cake[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setDeletingId(id);
    const res = await fetch(`/api/admin/cakes/${id}`, { method: "DELETE" });
    setDeletingId(null);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete cake.");
    }
  }

  return (
    <div className="mt-6 space-y-3">
      {cakes.map((cake) => (
        <div
          key={cake.id}
          className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-blush-light sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-blush-light">
              <Image src={cake.image} alt={cake.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-chocolate">
                {cake.name}{" "}
                {cake.featured && (
                  <span className="ml-1 rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-white">
                    Featured
                  </span>
                )}
              </p>
              <p className="text-sm text-chocolate/60">{cake.category}</p>
              <p className="text-sm text-chocolate/60">
                {cake.sizes.map((s) => `${s.label} (${formatPrice(s.price)})`).join(", ")}
              </p>
            </div>
          </div>

          <div className="flex gap-2 self-end sm:self-auto">
            <Link
              href={`/admin/cakes/${cake.id}`}
              className="rounded-full border-2 border-chocolate px-4 py-2 text-sm font-semibold text-chocolate hover:bg-chocolate hover:text-cream"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(cake.id, cake.name)}
              disabled={deletingId === cake.id}
              className="rounded-full border-2 border-red-400 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50"
            >
              {deletingId === cake.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}

      {cakes.length === 0 && (
        <p className="rounded-2xl bg-white p-8 text-center text-chocolate/60 ring-1 ring-blush-light">
          No cakes yet. Add your first cake to get started.
        </p>
      )}
    </div>
  );
}
