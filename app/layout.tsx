import type { Metadata } from "next";
import { Dancing_Script, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsapp } from "@/components/FloatingWhatsapp";

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zohra Bakery | Homemade Cakes in Kishanganj, Bihar",
    template: "%s | Zohra Bakery",
  },
  description:
    "Zohra Bakery in Kishanganj, Bihar makes 100% pure veg, homemade cakes with love — Tiramisu, Velvet, Rasmalai, Chocolate, Cheese Cake and more. Order custom birthday & anniversary cakes on WhatsApp, or join our Cake & Bakery Classes.",
  keywords: [
    "Zohra Bakery",
    "cake shop Kishanganj",
    "homemade cakes Bihar",
    "pure veg cakes Kishanganj",
    "custom birthday cake Kishanganj",
    "cake classes Kishanganj",
    "Ghazala Fatma bakery",
  ],
  openGraph: {
    title: "Zohra Bakery | Homemade Goodness, Made With Love",
    description:
      "100% pure veg, homemade cakes in Kishanganj, Bihar. Order on WhatsApp — Tiramisu, Velvet, Rasmalai, Chocolate, Cheese Cake and more.",
    url: SITE_URL,
    siteName: "Zohra Bakery",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/cakes/og-cake.jpg",
        width: 1200,
        height: 630,
        alt: "A beautifully decorated cake from Zohra Bakery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zohra Bakery | Homemade Goodness, Made With Love",
    description:
      "100% pure veg, homemade cakes in Kishanganj, Bihar. Order on WhatsApp.",
    images: ["/images/cakes/og-cake.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dancingScript.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-chocolate">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
