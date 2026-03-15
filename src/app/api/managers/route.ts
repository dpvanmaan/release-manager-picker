import { NextResponse } from "next/server";
import getDb from "@/db/database";

export async function GET() {
  const db = getDb();
  const managers = db
    .prepare(
      `SELECT m.*,
        (SELECT selected_at FROM selection_history WHERE manager_id = m.id ORDER BY selected_at DESC LIMIT 1) AS last_picked,
        (SELECT COUNT(*) FROM selection_history WHERE manager_id = m.id) AS pick_count
       FROM managers m
       WHERE m.is_active = 1
       ORDER BY m.name ASC`
    )
    .all();
  return NextResponse.json(managers);
}

export async function POST(request: Request) {
  const db = getDb();
  const body = await request.json();
  const name = (body.name ?? "").trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const existing = db
    .prepare("SELECT id FROM managers WHERE name = ? AND is_active = 1")
    .get(name);
  if (existing) {
    return NextResponse.json({ error: "Name already exists" }, { status: 409 });
  }

  const result = db
    .prepare("INSERT INTO managers (name, avatar_url) VALUES (?, ?)")
    .run(name, body.avatar_url ?? null);

  const manager = db
    .prepare("SELECT * FROM managers WHERE id = ?")
    .get(result.lastInsertRowid);

  return NextResponse.json(manager, { status: 201 });
}
