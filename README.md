# Zohra Bakery — Website

A marketing + WhatsApp-ordering website for **Zohra Bakery**, a homemade cake
business run by Ghazala Fatma in Kishanganj, Bihar. There is no cart, no
checkout, and no payment gateway — every order is captured on the site and
handed off to WhatsApp as a pre-filled message.

Built with Next.js 15+ (App Router), TypeScript, and Tailwind CSS.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The admin panel lives at `/admin` and requires the password set in `.env.local`
(see below).

## Environment Variables

Copy `.env.example` to `.env.local` and set a real admin password:

```bash
ADMIN_PASSWORD=choose-a-strong-password
```

This is the only password used to log in to `/admin`. There is no separate
user/account system.

## Managing the Cake Catalog (Admin Panel)

1. Go to `/admin` and log in with `ADMIN_PASSWORD`.
2. **Add a cake**: click "Add New Cake", fill in name, category, description,
   upload a photo (or paste an image URL), add one or more size/price pairs,
   and optionally mark it "Featured" to show it on the homepage.
3. **Edit a cake**: click "Edit" on any cake in the list.
4. **Delete a cake**: click "Delete" (asks for confirmation first).

Changes are written directly to [`data/cakes.json`](data/cakes.json) and
uploaded images are saved to `public/images/cakes/`. Changes appear on the
live site immediately — no rebuild or redeploy needed.

### Important note for Vercel deployments

Vercel's serverless functions have a **read-only filesystem** except for
`/tmp`, which does not persist between requests or deployments. That means:

- The admin panel's "add/edit/delete cake" and "image upload" features
  **will not persist data** on Vercel out of the box — writes will appear to
  succeed but disappear on the next cold start/deploy.
- For a production deployment on Vercel, migrate the data layer to a real
  (lightweight) database or storage service, for example:
  - [Turso](https://turso.tech) or [Vercel Postgres](https://vercel.com/storage/postgres) for the catalog data
  - [Vercel Blob](https://vercel.com/storage/blob) or an S3-compatible bucket for images
- The good news: **only `lib/cakes.ts` (data) and the image upload route in
  `app/api/admin/upload/route.ts` need to change.** Every page and component
  calls the functions exported from `lib/cakes.ts`
  (`getAllCakes`, `getCakeById`, `getFeaturedCakes`, `getCategories`,
  `saveAllCakes`) rather than touching the JSON file directly, so swapping the
  implementation to a database is a self-contained change.
- If you deploy to a traditional Node.js server (a VPS, Docker container, etc.
  with a persistent disk) instead of Vercel's serverless functions, the
  file-based admin panel works as-is.

## Changing the WhatsApp Number

All WhatsApp links are generated in [`lib/whatsapp.ts`](lib/whatsapp.ts) using
the number defined in [`lib/constants.ts`](lib/constants.ts):

```ts
export const WHATSAPP_NUMBER = "919470272874"; // no + or spaces, country code first
```

Update this constant to change the number used for the "Order on WhatsApp" and
"Enquire on WhatsApp" buttons across the whole site. The two phone numbers
shown for click-to-call (in the footer and Contact page) are set separately in
`PHONE_NUMBERS` in the same file.

## Project Structure

```
app/
  page.tsx              Home page
  cakes/page.tsx         Cake menu / catalog (category filter)
  cakes/[slug]/page.tsx  Cake detail — size selector + WhatsApp order form
  about/page.tsx         Our Story
  classes/page.tsx       Cake & Bakery Classes
  contact/page.tsx       Contact + map
  admin/                 Password-protected catalog management UI
  api/admin/             CRUD + auth + image upload API routes
components/
  CakeCard.tsx, SizeSelector.tsx, CakeOrderForm.tsx, WhatsappButton.tsx, ...
  admin/                 Admin-only UI components
lib/
  cakes.ts               Data access layer (reads/writes data/cakes.json)
  whatsapp.ts            buildWhatsappOrderLink / buildWhatsappClassEnquiryLink
  auth.ts                Simple password + signed-cookie admin session
  constants.ts           Business details (name, phone, address, WhatsApp number)
data/cakes.json          Cake catalog (source of truth for v1)
public/images/cakes/     Cake photos (placeholder SVGs — swap for real photos)
```

## Updating Cake Photos

Each cake's `image` field in `data/cakes.json` (or the admin panel) is a path
like `/images/cakes/tiramisu.svg`. To use a real photo, upload it via the admin
panel, or drop a file into `public/images/cakes/` and update the `image` field
to point at it — no other code changes needed.

## Deploying to Vercel

```bash
npm run build
```

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add the `ADMIN_PASSWORD` environment variable in the Vercel project settings.
4. Deploy.

See the note above about the admin panel's file-based storage before relying
on it in production on Vercel.
