import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getHeroImage, setHeroImage } from "@/lib/settings";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const heroImage = await getHeroImage();
  return NextResponse.json({ heroImage });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { heroImage?: string };

  if (!body.heroImage || !body.heroImage.trim()) {
    return NextResponse.json({ error: "Hero image is required." }, { status: 400 });
  }

  await setHeroImage(body.heroImage.trim());
  return NextResponse.json({ success: true });
}
