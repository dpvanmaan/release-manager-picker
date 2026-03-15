import { NextResponse } from "next/server";
import getDb from "@/db/database";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = getDb();
  const { id } = await params;
  const body = await request.json();
  const name = (body.name ?? "").trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const result = db
    .prepare("UPDATE managers SET name = ? WHERE id = ? AND is_active = 1")
    .run(name, id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Manager not found" }, { status: 404 });
  }

  const manager = db.prepare("SELECT * FROM managers WHERE id = ?").get(id);
  return NextResponse.json(manager);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = getDb();
  const { id } = await params;

  const result = db
    .prepare("UPDATE managers SET is_active = 0 WHERE id = ? AND is_active = 1")
    .run(id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Manager not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
