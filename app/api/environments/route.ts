import { NextResponse } from "next/server";
import { ENVIRONMENTS } from "@/lib/data/environments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  let result = [...ENVIRONMENTS];

  if (category) {
    result = result.filter(
      (e) => e.category.slug === category || e.category.name === category
    );
  }

  if (q) {
    const term = q.toLowerCase();
    result = result.filter(
      (e) =>
        e.name.toLowerCase().includes(term) ||
        e.shortDescription.toLowerCase().includes(term) ||
        e.tags.some((t) => t.toLowerCase().includes(term))
    );
  }

  return NextResponse.json({
    total: result.length,
    environments: result,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        message: "Environment submission received and queued for review",
        data: body,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid submission payload" },
      { status: 400 }
    );
  }
}

