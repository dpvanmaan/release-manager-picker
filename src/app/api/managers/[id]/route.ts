import { NextResponse } from "next/server";
import { getAdapter } from "@/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adapter = getAdapter();
  const { id } = await params;
  const body = await request.json();
  const name = (body.name ?? "").trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const { changed } = await adapter.updateManager(id, name, body.face, body.hat, body.color, body.shirt);
  if (!changed) {
    return NextResponse.json({ error: "Manager not found" }, { status: 404 });
  }

  const manager = await adapter.getManagerById(id);
  return NextResponse.json(manager);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const adapter = getAdapter();
  const { id } = await params;

  const { changed } = await adapter.deactivateManager(id);
  if (!changed) {
    return NextResponse.json({ error: "Manager not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
