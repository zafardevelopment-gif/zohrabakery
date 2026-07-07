import type { Metadata } from "next";
import { getAllCakes, getCategories } from "@/lib/cakes";
import { CakeCatalog } from "@/components/CakeCatalog";

export const metadata: Metadata = {
  title: "Cake Menu",
  description:
    "Browse our full range of homemade cakes — Tiramisu, Velvet, Rasmalai, Chocolate, Cheese Cake, Mousse Jars, Cookies and more. Order on WhatsApp for pickup or delivery in Kishanganj, Bihar.",
};

export default async function CakesPage() {
  const [cakes, categories] = await Promise.all([getAllCakes(), getCategories()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="font-script text-5xl font-bold text-chocolate sm:text-6xl">
          Our Cake Menu
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-chocolate/70">
          Every cake is baked fresh to order. Pick a size, tell us the occasion, and
          order in one tap on WhatsApp.
        </p>
      </div>

      <div className="mt-10">
        <CakeCatalog cakes={cakes} categories={categories} />
      </div>
    </div>
  );
}
