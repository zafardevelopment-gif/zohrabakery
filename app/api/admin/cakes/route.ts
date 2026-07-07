import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllCakes, saveAllCakes, slugify } from "@/lib/cakes";
import type { Cake } from "@/lib/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cakes = await getAllCakes();
  return NextResponse.json(cakes);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<Cake>;

  if (!body.name || !body.sizes || body.sizes.length === 0) {
    return NextResponse.json(
      { error: "Name and at least one size/price are required." },
      { status: 400 }
    );
  }

  const cakes = await getAllCakes();
  const id = slugify(body.name);

  if (cakes.some((c) => c.id === id)) {
    return NextResponse.json(
      { error: "A cake with a similar name already exists." },
      { status: 409 }
    );
  }

  const newCake: Cake = {
    id,
    name: body.name,
    category: body.category || "Uncategorized",
    description: body.description || "",
    image: body.image || "/images/cakes/tiramisu.svg",
    featured: Boolean(body.featured),
    sizes: body.sizes,
  };

  cakes.push(newCake);
  await saveAllCakes(cakes);

  return NextResponse.json(newCake, { status: 201 });
}
