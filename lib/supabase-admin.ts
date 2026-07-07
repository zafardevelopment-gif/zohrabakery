import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key. Used exclusively for
// uploading cake images to Supabase Storage from the admin panel. Cake
// catalog data itself still lives in data/cakes.json — this file has
// nothing to do with that.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export const CAKE_IMAGES_BUCKET = "zohra-cake-images";
