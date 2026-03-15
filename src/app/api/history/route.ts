import { NextResponse } from "next/server";
import getDb from "@/db/database";

export async function GET(request: Request) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = 20;
  const offset = (page - 1) * limit;

  const rows = db
    .prepare(
      `SELECT sh.id, sh.manager_id, sh.selected_at, sh.notes,
              m.name AS manager_name
       FROM selection_history sh
       LEFT JOIN managers m ON m.id = sh.manager_id
       ORDER BY sh.selected_at DESC
       LIMIT ? OFFSET ?`
    )
    .all(limit, offset);

  const total = (
    db
      .prepare("SELECT COUNT(*) AS count FROM selection_history")
      .get() as { count: number }
  ).count;

  return NextResponse.json({ rows, total, page, limit });
}
