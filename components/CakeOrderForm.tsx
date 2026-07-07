"use client";

import { useState } from "react";
import type { Cake } from "@/lib/types";
import { SizeSelector } from "@/components/SizeSelector";
import { WhatsappButton } from "@/components/WhatsappButton";
import { buildWhatsappOrderLink } from "@/lib/whatsapp";

export function CakeOrderForm({ cake }: { cake: Cake }) {
  const [size, setSize] = useState(cake.sizes[0]);
  const [date, setDate] = useState("");
  const [cakeMessage, setCakeMessage] = useState("");
  const [instructions, setInstructions] = useState("");

  const link = buildWhatsappOrderLink(cake, size, {
    date,
    cakeMessage,
    instructions,
  });

  return (
    <div className="space-y-6">
      <SizeSelector sizes={cake.sizes} selected={size} onSelect={setSize} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-chocolate">
          Preferred delivery/pickup date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
          />
        </label>

        <label className="block text-sm font-medium text-chocolate">
          Message on the cake
          <input
            type="text"
            value={cakeMessage}
            onChange={(e) => setCakeMessage(e.target.value)}
            placeholder="e.g. Happy Birthday Aisha!"
            className="mt-1 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-chocolate">
        Special instructions
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={3}
          placeholder="e.g. Eggless, less sweet, specific theme..."
          className="mt-1 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
        />
      </label>

      <div className="rounded-2xl bg-blush-light px-5 py-4 text-center text-sm text-chocolate/70">
        Message us on WhatsApp and we&apos;ll confirm the price for you.
      </div>

      <WhatsappButton href={link} className="w-full">
        Order on WhatsApp
      </WhatsappButton>
    </div>
  );
}
