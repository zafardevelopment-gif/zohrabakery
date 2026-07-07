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

Copy `.env.example` to `.env.local` and fill in:

```bash
ADMIN_PASSWORD=choose-a-strong-password

# Supabase — used only for cake image storage (see below)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`ADMIN_PASSWORD` is the only password used to log in to `/admin`. There is no
separate user/account system.

The Supabase variables are used **only** for storing uploaded cake photos in
Supabase Storage (bucket name: `zohra-cake-images`). Cake catalog data (name,
price, description, etc.) still lives in `data/cakes.json` — Supabase is not
involved in that part.

## Managing the Cake Catalog (Admin Panel)

1. Go to `/admin` and log in with `ADMIN_PASSWORD`.
2. **Add a cake**: click "Add New Cake", fill in name, category, description,
   upload a photo (or paste an image URL), add one or more size/price pairs,
   and optionally mark it "Featured" to show it on the homepage.
3. **Edit a cake**: click "Edit" on any cake in the list.
4. **Delete a cake**: click "Delete" (asks for confirmation first).

Cake name/category/description/sizes/prices are written directly to
[`data/cakes.json`](data/cakes.json). Uploaded photos are sent to **Supabase
Storage** (bucket `zohra-cake-images`) instead of the local filesystem, so
image uploads work correctly even on serverless hosts like Vercel.

### Important note for Vercel deployments

Vercel's serverless functions have a **read-only filesystem** except for
`/tmp`, which does not persist between requests or deployments. That means:

- **Image uploads are unaffected** — they go to Supabase Storage, which
  persists normally in production.
- The admin panel's "add/edit/delete cake" actions (which still write to
  `data/cakes.json`) **will not persist on Vercel** — writes will appear to
  succeed but disappear on the next cold start/deploy. This only affects
  cake text/price data, not photos.
- If you need catalog edits to persist on Vercel too, migrate
  `data/cakes.json` to a real database — for example a `cakes` table in the
  same Supabase project. Only `lib/cakes.ts` would need to change; every
  page/component calls the functions exported from it
  (`getAllCakes`, `getCakeById`, `getFeaturedCakes`, `getCategories`,
  `saveAllCakes`) rather than touching the JSON file directly.
- If you deploy to a traditional Node.js server (a VPS, Docker container, etc.
  with a persistent disk) instead of Vercel's serverless functions, the
  file-based catalog works as-is with no changes needed.

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
  supabase-admin.ts       Server-only Supabase client (used for image uploads only)
  constants.ts           Business details (name, phone, address, WhatsApp number)
data/cakes.json          Cake catalog (source of truth for v1)
public/images/cakes/     Placeholder cake photos (bundled with the app, not uploaded)
```

## Updating Cake Photos

Each cake's `image` field in `data/cakes.json` (or the admin panel) can be:

- A Supabase Storage URL — automatically set when you upload a photo through
  the admin panel's "Choose Photo" / drag-and-drop box.
- A path like `/images/cakes/tiramisu.svg` — one of the bundled placeholder
  images in `public/images/cakes/`.
- Any external image URL — paste it into "Paste image URL instead" in the
  admin panel.

No code changes are needed to swap a photo either way.

## Deploying to Vercel

```bash
npm run build
```

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add these environment variables in the Vercel project settings:
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy.

See the note above about `data/cakes.json` not persisting catalog edits on
Vercel (image uploads are unaffected since they use Supabase Storage).
