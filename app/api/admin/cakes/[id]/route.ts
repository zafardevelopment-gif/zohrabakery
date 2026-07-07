import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllCakes, saveAllCakes } from "@/lib/cakes";
import type { Cake } from "@/lib/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<Cake>;

  const cakes = await getAllCakes();
  const index = cakes.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Cake not found." }, { status: 404 });
  }

  cakes[index] = {
    ...cakes[index],
    name: body.name ?? cakes[index].name,
    category: body.category ?? cakes[index].category,
    description: body.description ?? cakes[index].description,
    image: body.image ?? cakes[index].image,
    featured: body.featured ?? cakes[index].featured,
    sizes: body.sizes ?? cakes[index].sizes,
  };

  await saveAllCakes(cakes);
  return NextResponse.json(cakes[index]);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const cakes = await getAllCakes();
  const filtered = cakes.filter((c) => c.id !== id);

  if (filtered.length === cakes.length) {
    return NextResponse.json({ error: "Cake not found." }, { status: 404 });
  }

  await saveAllCakes(filtered);
  return NextResponse.json({ success: true });
}
