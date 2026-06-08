import { NextResponse } from "next/server";
import { categories, products } from "@/lib/catalog";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    categories,
    products,
  });
}
