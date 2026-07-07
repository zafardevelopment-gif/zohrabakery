import { createClient } from "@supabase/supabase-js";

const TABLE = "zb_settings";
const DEFAULT_HERO_IMAGE = "/images/cakes/velvet.svg";

// Site-wide settings (currently just the homepage hero image) backed by the
// zb_settings Supabase table. Add more keys here as more settings are needed.

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export async function getHeroImage(): Promise<string> {
  const { data, error } = await getClient()
    .from(TABLE)
    .select("value")
    .eq("key", "hero_image")
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data?.value || DEFAULT_HERO_IMAGE;
}

export async function setHeroImage(imageUrl: string): Promise<void> {
  const { error } = await getClient()
    .from(TABLE)
    .upsert({ key: "hero_image", value: imageUrl, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
}
