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

The Supabase variables are used for **both**:

- The cake catalog itself — stored in the `zb_cakes` table (see
  `supabase/migrations/`).
- Uploaded cake photos — stored in Supabase Storage, bucket `zohra-cake-images`.

There is no local JSON file or local disk storage involved anymore, which is
why the admin panel works correctly on serverless hosts like Vercel.

## Managing the Cake Catalog (Admin Panel)

1. Go to `/admin` and log in with `ADMIN_PASSWORD`.
2. **Add a cake**: click "Add New Cake", fill in name, category, description,
   upload a photo (or paste an image URL), add one or more size/price pairs,
   and optionally mark it "Featured" to show it on the homepage.
3. **Edit a cake**: click "Edit" on any cake in the list.
4. **Delete a cake**: click "Delete" (asks for confirmation first).

All of the above read/write the `zb_cakes` table in Supabase through
[`lib/cakes.ts`](lib/cakes.ts), and photo uploads go to the `zohra-cake-images`
Storage bucket through [`app/api/admin/upload/route.ts`](app/api/admin/upload/route.ts).
Changes appear on the live site immediately — no rebuild or redeploy needed,
and this works the same way on Vercel as it does locally.

### One-time Supabase setup

Run these once in the Supabase SQL Editor for your project (see
`supabase/migrations/`):

1. `001_zb_cakes.sql` — creates the `zb_cakes` table with public read access
   (RLS) and no public write access (writes go through the service role key
   from the server only).
2. `002_seed_zb_cakes.sql` — seeds the original 10 sample cakes. Safe to
   re-run; it upserts by `id`.
3. `003_zb_settings.sql` — creates the `zb_settings` table (currently used
   for the homepage hero photo) and seeds a default value.

Also create a **public** Storage bucket named `zohra-cake-images` (Storage →
New bucket → Public bucket) if it doesn't already exist.

## Site Settings (Homepage Hero Photo)

Go to `/admin` → **Site Settings** to change the round hero photo shown next
to the "Zohra Bakery" title on the homepage. It's stored in the `zb_settings`
table via [`lib/settings.ts`](lib/settings.ts) and uses the same
upload/drag-and-drop widget as cake photos
([`components/admin/ImagePicker.tsx`](components/admin/ImagePicker.tsx)).

Every photo upload field in the admin panel shows a recommended size/format
hint so it's clear what to upload:

- Cake photos: 800 × 600px (4:3 landscape)
- Hero photo: 800 × 800px (square — it's displayed inside a circle)

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
  cakes.ts               Data access layer — reads/writes the zb_cakes Supabase table
  whatsapp.ts            buildWhatsappOrderLink / buildWhatsappClassEnquiryLink
  auth.ts                Simple password + signed-cookie admin session
  supabase-admin.ts       Server-only Supabase client (used for image uploads)
  constants.ts           Business details (name, phone, address, WhatsApp number)
supabase/migrations/     One-time SQL to create + seed the zb_cakes table
public/images/cakes/     Placeholder cake photos (bundled with the app, not uploaded)
```

## Updating Cake Photos

Each cake's `image` field (set via the admin panel) can be:

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

Make sure the Supabase one-time setup (table + storage bucket) described
above has been done in your Supabase project before relying on the admin
panel in production.
