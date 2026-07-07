import { createClient } from "@supabase/supabase-js";
import type { Cake } from "@/lib/types";

const TABLE = "zb_cakes";

// This module is the single source of truth for reading/writing the cake
// catalog. It reads/writes the `zb_cakes` table in Supabase. Every
// page/component calls these functions instead of talking to Supabase
// directly, so the storage backend can change again later without touching
// any UI code.

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

interface CakeRow {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  sizes: Cake["sizes"];
}

function rowToCake(row: CakeRow): Cake {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    image: row.image,
    featured: row.featured,
    sizes: row.sizes,
  };
}

export async function getAllCakes(): Promise<Cake[]> {
  const { data, error } = await getClient()
    .from(TABLE)
    .select("id, name, category, description, image, featured, sizes")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as CakeRow[]).map(rowToCake);
}

export async function getCakeById(id: string): Promise<Cake | undefined> {
  const { data, error } = await getClient()
    .from(TABLE)
    .select("id, name, category, description, image, featured, sizes")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToCake(data as CakeRow) : undefined;
}

export async function getFeaturedCakes(): Promise<Cake[]> {
  const { data, error } = await getClient()
    .from(TABLE)
    .select("id, name, category, description, image, featured, sizes")
    .eq("featured", true)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as CakeRow[]).map(rowToCake);
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await getClient().from(TABLE).select("category");
  if (error) throw new Error(error.message);
  return Array.from(new Set((data as { category: string }[]).map((r) => r.category))).sort();
}

export async function cakeIdExists(id: string): Promise<boolean> {
  const { data, error } = await getClient()
    .from(TABLE)
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return Boolean(data);
}

export async function createCake(cake: Cake): Promise<Cake> {
  const { data, error } = await getClient()
    .from(TABLE)
    .insert({
      id: cake.id,
      name: cake.name,
      category: cake.category,
      description: cake.description,
      image: cake.image,
      featured: cake.featured,
      sizes: cake.sizes,
    })
    .select("id, name, category, description, image, featured, sizes")
    .single();

  if (error) throw new Error(error.message);
  return rowToCake(data as CakeRow);
}

export async function updateCake(id: string, patch: Partial<Cake>): Promise<Cake | undefined> {
  const { data, error } = await getClient()
    .from(TABLE)
    .update({
      ...(patch.name !== undefined && { name: patch.name }),
      ...(patch.category !== undefined && { category: patch.category }),
      ...(patch.description !== undefined && { description: patch.description }),
      ...(patch.image !== undefined && { image: patch.image }),
      ...(patch.featured !== undefined && { featured: patch.featured }),
      ...(patch.sizes !== undefined && { sizes: patch.sizes }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id, name, category, description, image, featured, sizes")
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToCake(data as CakeRow) : undefined;
}

export async function deleteCake(id: string): Promise<boolean> {
  const { data, error } = await getClient()
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) throw new Error(error.message);
  return Boolean(data);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
