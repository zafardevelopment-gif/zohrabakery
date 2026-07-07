import { promises as fs } from "fs";
import path from "path";
import type { Cake } from "@/lib/types";

const DATA_FILE = path.join(process.cwd(), "data", "cakes.json");

// This module is the single source of truth for reading/writing the cake
// catalog. It currently reads/writes a JSON file on disk. If this project
// moves to a real database (e.g. SQLite/Turso/Postgres), only the functions
// in this file need to change — every page/component calls these functions
// instead of touching the file system directly.

export async function getAllCakes(): Promise<Cake[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Cake[];
}

export async function getCakeById(id: string): Promise<Cake | undefined> {
  const cakes = await getAllCakes();
  return cakes.find((cake) => cake.id === id);
}

export async function getFeaturedCakes(): Promise<Cake[]> {
  const cakes = await getAllCakes();
  return cakes.filter((cake) => cake.featured);
}

export async function getCategories(): Promise<string[]> {
  const cakes = await getAllCakes();
  return Array.from(new Set(cakes.map((cake) => cake.category))).sort();
}

export async function saveAllCakes(cakes: Cake[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(cakes, null, 2), "utf-8");
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
