import { NextResponse } from "next/server";
import { ENVIRONMENTS } from "@/lib/data/environments";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const env = ENVIRONMENTS.find((e) => e.slug === slug);

  if (!env) {
    return NextResponse.json(
      { error: "Environment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(env);
}

