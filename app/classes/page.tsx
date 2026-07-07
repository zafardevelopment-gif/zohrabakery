import type { Metadata } from "next";
import { PROPRIETOR } from "@/lib/constants";
import { ClassEnquiryForm } from "@/components/ClassEnquiryForm";

export const metadata: Metadata = {
  title: "Cake & Bakery Classes",
  description:
    "Admission open for Zohra Bakery's Cake & Bakery Classes in Kishanganj, Bihar. Learn homemade cake baking and decoration from Ghazala Fatma — beginner to advanced.",
};

const CURRICULUM = [
  { title: "Cake Baking Basics", detail: "Sponges, batters, ovens, and getting the fundamentals right every time." },
  { title: "Frosting & Decoration", detail: "Cream, ganache, fondant basics, and simple piping techniques." },
  { title: "Specialty Cakes", detail: "Tiramisu, Rasmalai fusion, Cheesecakes, Mousse jars and more." },
  { title: "Business Basics", detail: "Costing, packaging, and taking your first home-bakery orders." },
];

const AUDIENCE = [
  "Home bakers wanting to go professional",
  "Beginners with zero baking experience",
  "Anyone who wants to bake for family & friends",
  "Aspiring home-bakery entrepreneurs",
];

export default function ClassesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blush-light px-4 py-1.5 text-xs font-semibold text-chocolate ring-1 ring-blush-dark/20">
          Admission Open
        </span>
        <h1 className="mt-5 font-script text-5xl font-bold text-chocolate sm:text-6xl">
          Learn With Us
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-chocolate/70">
          Join Zohra Bakery&apos;s Cake &amp; Bakery Classes and learn {PROPRIETOR}&apos;s
          homemade recipes and techniques, taught with the same love that goes
          into every cake we bake.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {CURRICULUM.map((item) => (
          <div key={item.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blush-light">
            <h3 className="font-semibold text-chocolate">{item.title}</h3>
            <p className="mt-2 text-sm text-chocolate/70">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-blush-light/50 p-8">
        <h2 className="text-center font-script text-3xl font-bold text-chocolate">
          Who Is This For?
        </h2>
        <ul className="mx-auto mt-4 max-w-md space-y-2 text-chocolate/80">
          {AUDIENCE.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 text-blush-dark">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14 text-center">
        <h2 className="font-script text-3xl font-bold text-chocolate">
          Ready to Join?
        </h2>
        <p className="mt-2 text-chocolate/70">
          Message us on WhatsApp for the schedule, fees, and next batch dates.
        </p>
        <div className="mt-6">
          <ClassEnquiryForm />
        </div>
      </div>
    </div>
  );
}
