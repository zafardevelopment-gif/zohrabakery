# Claude Code Build Prompt — Zohra Bakery Website

Copy everything below into Claude Code as your project brief.

---

## PROJECT BRIEF

Build a complete, professional, production-ready marketing + ordering website for
**Zohra Bakery** — a homemade cake and bakery business run by Ghazala Fatma in
Kishanganj, Bihar. This is NOT an e-commerce site with payments. All cake orders
are captured on the site and then handed off to WhatsApp as a pre-filled message
to the bakery's number. There is no cart, no checkout, no payment gateway.

The site must feel warm, premium, and "homemade with love" — not like a generic
template. Think boutique home-bakery aesthetic: soft pink/blush tones, dark
chocolate/maroon accents, elegant script accents for the brand name, and
photography-forward cake cards.

### Business Details (use exactly as-is)
- **Business name:** Zohra Bakery
- **Tagline:** Homemade Goodness, Made With Love
- **Proprietor:** Ghazala Fatma
- **Phone / WhatsApp numbers:** +91 94702 72874, +91 88096 52513 (use the first as
  the primary WhatsApp order number, show both as call options)
- **Diet:** 100% Pure Veg
- **Address:** Zohra Manzil, Safa Nagar Colony, Phulwari Road, Kishanganj, Bihar – 855107
- **Cake varieties on offer:** Tiramisu Cake, Velvet Cake, Strawberry Cake, Rasmalai
  Cake, Chocolate Cake, Cheese Cake, Honey Bell Cake, Mousse Jar Cake, Fresh Fruit
  Cake, Cookies, and more (leave room to add more items easily)
- **Also offers:** Custom orders for Birthdays and Anniversaries
- **Also offers:** Admission open for Cake & Bakery Classes (this should have its own
  section/page — treat it as a secondary offering, e.g. "Learn With Us")

---

## 1. TECH STACK

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Data storage:** Simple JSON file (`/data/cakes.json`) as the source of truth for
  the cake catalog — no external database needed for v1. Structure it so it can be
  swapped for a real DB later without breaking the UI.
- **Image storage:** Local `/public/images/cakes/` folder for v1. Build the admin
  image upload to save into this folder (or accept an image URL as a fallback).
- **Hosting target:** Vercel-friendly (no server-only dependencies that break on
  serverless).
- **No payment gateway. No cart. No user accounts for customers.**

---

## 2. BRAND & DESIGN GUIDELINES

- **Color palette:**
  - Primary pink/blush: `#F2A6C4` (approx, sample from the card)
  - Deep chocolate/maroon (text + accents): `#3B1620`
  - Off-white/cream background: `#FFF8F5`
  - Use the pink and chocolate combination the way the physical visiting card does
    — pink as the hero/section background, dark chocolate for headings and borders.
- **Typography:**
  - Brand name "Zohra Bakery" in an elegant script/cursive font (e.g. "Great Vibes"
    or "Dancing Script" from Google Fonts).
  - Body copy in a clean, warm sans-serif (e.g. "Poppins" or "Nunito").
- **Visual motifs:** Scalloped/lace borders (like the card), a hand-drawn tiered
  cake illustration or photo in the hero, soft rounded cards with subtle shadows.
- **Tone of copy:** Warm, personal, trustworthy — written as if Ghazala herself is
  welcoming you. Avoid corporate-sounding copy.
- **Must NOT look like:** a generic Bootstrap template, a stock SaaS landing page,
  or anything cold/corporate. This is a home-run bakery — the design should feel
  handcrafted and inviting.

---

## 3. SITE STRUCTURE (PAGES)

### A. Home Page
- Hero section: brand name (script font), tagline, a hero cake photo/illustration,
  a "Order on WhatsApp" primary CTA button, and "Pure Veg" badge.
- "Why Zohra Bakery" — 3–4 short trust points (Homemade, Pure Veg, Custom Orders,
  Fresh Ingredients).
- Featured cakes carousel/grid (pulls from the same catalog data, e.g. 4–6 items).
- "Occasions we cater to" — Birthdays, Anniversaries, and more.
- Cake & Bakery Classes teaser section with a link to its own section/page.
- Footer with address, phone numbers (click-to-call), and a WhatsApp icon link.

### B. Cake Menu / Catalog Page
- Grid of all cakes as cards. Each card shows: image, name, short description,
  starting price, and available sizes.
- Filter/tabs by category if useful (e.g. All, Cheese Cakes, Fruit Cakes, Jars,
  Cookies) — derive categories from the data file.
- Clicking a card opens the Cake Detail view (can be a modal or a dedicated page
  `/cakes/[slug]`).

### C. Cake Detail (modal or page)
- Large image, name, description.
- **Size selector** (e.g. 0.5kg / 1kg / 1.5kg / 2kg) — each size maps to its own
  price from the data file.
- Price updates live when a size is selected.
- Optional fields the customer can fill before ordering:
  - Preferred delivery/pickup date
  - Any message on the cake (text to write)
  - Any special instructions
- **"Order on WhatsApp" button** (see Section 4 for exact behavior).

### D. About / Our Story Page
- Short story about Ghazala Fatma and Zohra Bakery, the "homemade with love"
  philosophy, and the Pure Veg commitment.

### E. Cake & Bakery Classes Page (or prominent section)
- What the classes cover, who they're for, and a "Enquire on WhatsApp" button
  (same WhatsApp pattern as orders, but with a class-enquiry message template).

### F. Contact Page
- Address (with an embedded Google Map if easy to add), both phone numbers as
  click-to-call links, WhatsApp button, and business hours (placeholder — ask
  Ghazala for real hours, or mark "Add hours here" as an editable field).

---

## 4. WHATSAPP ORDERING FLOW (core feature — build this carefully)

There is no backend order processing. The entire "order" flow works like this:

1. Customer selects a cake, a size, and fills optional notes (date, cake message,
   instructions).
2. Clicking **"Order on WhatsApp"** builds a `wa.me` link with a pre-filled,
   nicely formatted message and opens it in a new tab, e.g.:

   ```
   https://wa.me/919470272874?text=<url-encoded-message>
   ```

3. The pre-filled message template should look like:

   ```
   Hi Zohra Bakery! I'd like to order:

   🎂 Cake: {cake name}
   ⚖️ Size: {selected size}
   💰 Price: ₹{price}
   📅 Needed on: {date, if provided}
   📝 Message on cake: {text, if provided}
   ℹ️ Notes: {special instructions, if provided}

   Please confirm availability and total cost. Thank you!
   ```

4. Build this as a reusable utility function (e.g. `buildWhatsappOrderLink(cake,
   size, notes)`) so it can also be reused for the "Enquire about classes" button
   with a different message template.
5. Make the WhatsApp CTA sticky/prominent — e.g. a floating WhatsApp button that
   follows scroll on mobile, plus inline buttons on every cake card and detail
   view.

---

## 5. ADMIN PANEL (for Ghazala / Zafar to manage the catalog)

Build a simple, password-protected `/admin` area (basic auth via a single admin
password stored in an environment variable — no need for full user management)
that allows:

- **Add a new cake** — name, description, category, image upload (or image URL),
  and one or more size+price pairs.
- **Edit an existing cake** — update name, description, image, sizes, and prices.
- **Delete a cake.**
- **Reorder / feature toggle** — mark a cake as "Featured" so it shows on the
  homepage.
- All changes should write directly to `/data/cakes.json` (and save uploaded
  images into `/public/images/cakes/`) so changes reflect on the live site
  immediately without a redeploy (use a Next.js API route with file system write
  access — note this works on a traditional Node server or Vercel with some
  caveats; if deploying to Vercel, flag to the user that file writes need a
  persistent volume or should move to a lightweight database like SQLite/Turso
  later, and build the code so this migration is easy).
- Simple, clean admin UI — table/list of cakes with edit/delete actions, and a
  form for add/edit. Doesn't need to be fancy, just usable by a non-technical
  person on a phone browser.

### Data model (`/data/cakes.json`)
```json
[
  {
    "id": "tiramisu-cake",
    "name": "Tiramisu Cake",
    "category": "Specialty",
    "description": "Classic Italian-inspired layers with a coffee-kissed finish.",
    "image": "/images/cakes/tiramisu.jpg",
    "featured": true,
    "sizes": [
      { "label": "0.5 kg", "price": 450 },
      { "label": "1 kg", "price": 850 }
    ]
  }
]
```

---

## 6. NON-NEGOTIABLE REQUIREMENTS

- Fully **mobile-responsive** (most customers will visit via WhatsApp-shared links
  on their phones).
- Fast image loading (use Next.js `<Image>` component, lazy loading).
- Basic **SEO**: proper `<title>`, meta description, Open Graph tags with a cake
  photo, and the business's Kishanganj/Bihar location mentioned for local search.
- Accessible color contrast (the pink/chocolate palette must still pass basic
  contrast checks for text).
- Clean, componentized code (`components/CakeCard.tsx`, `components/SizeSelector.tsx`,
  `components/WhatsappButton.tsx`, `lib/whatsapp.ts`, etc.) so it's easy to extend
  later (e.g. adding a real backend, payments, or a proper CMS).
- No placeholder "lorem ipsum" content — use real bakery copy and the cake list
  provided above. Use royalty-free / AI-generated placeholder images for cakes
  until real photos are supplied, but structure the code so swapping in real
  photos is a one-line change per cake.

---

## 7. DELIVERABLES

1. Fully working Next.js project with the pages/sections above.
2. `/data/cakes.json` pre-populated with the cake varieties listed above with
   reasonable placeholder pricing (mark clearly as "sample pricing — update in
   admin panel").
3. Working `/admin` panel for catalog management.
4. Working WhatsApp order flow end-to-end.
5. A short `README.md` explaining: how to run locally, how to add/edit cakes via
   admin, how to change the WhatsApp number, and how to deploy to Vercel.

Build this step by step: (1) project scaffold + design system, (2) home page,
(3) catalog + detail + WhatsApp flow, (4) about/classes/contact pages, (5) admin
panel, (6) polish, responsiveness, and SEO pass.
