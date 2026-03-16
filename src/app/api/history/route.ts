import { NextResponse } from "next/server";
import { getAdapter } from "@/db";

export async function GET(request: Request) {
  const adapter = getAdapter();
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const result = await adapter.getHistory(page);
  return NextResponse.json(result);
}
