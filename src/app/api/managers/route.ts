import { NextResponse } from "next/server";
import { getAdapter } from "@/db";

export async function GET() {
  const adapter = getAdapter();
  const managers = await adapter.getManagers();
  return NextResponse.json(managers);
}

export async function POST(request: Request) {
  const adapter = getAdapter();
  const body = await request.json();
  const name = (body.name ?? "").trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const manager = await adapter.createManager(
      name,
      body.avatar_url ?? null,
      body.face,
      body.hat,
      body.color,
    );
    return NextResponse.json(manager, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && (err as NodeJS.ErrnoException & { code?: string }).code === "DUPLICATE") {
      return NextResponse.json({ error: "Name already exists" }, { status: 409 });
    }
    throw err;
  }
}
