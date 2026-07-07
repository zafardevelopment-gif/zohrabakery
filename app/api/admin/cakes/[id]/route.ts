import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteCake, updateCake } from "@/lib/cakes";
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

  const updated = await updateCake(id, body);

  if (!updated) {
    return NextResponse.json({ error: "Cake not found." }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteCake(id);

  if (!deleted) {
    return NextResponse.json({ error: "Cake not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
