import { NextResponse } from "next/server";
import getDb from "@/db/database";
import { weightedPick } from "@/lib/selection";
import { getRandomMessage } from "@/lib/messages";

export async function POST() {
  const db = getDb();

  const managers = db
    .prepare(
      `SELECT m.*,
        (SELECT selected_at FROM selection_history WHERE manager_id = m.id ORDER BY selected_at DESC LIMIT 1) AS last_picked
       FROM managers m
       WHERE m.is_active = 1`
    )
    .all() as Array<{
    id: number;
    name: string;
    avatar_url: string | null;
    is_active: 0 | 1;
    created_at: string;
    last_picked: string | null;
  }>;

  if (managers.length === 0) {
    return NextResponse.json(
      { error: "No active managers to pick from" },
      { status: 400 }
    );
  }

  const winner = weightedPick(managers);
  const funnyMessage = getRandomMessage(winner.name);

  db.prepare(
    "INSERT INTO selection_history (manager_id, notes) VALUES (?, ?)"
  ).run(winner.id, funnyMessage);

  return NextResponse.json({
    winner,
    funnyMessage,
    allManagers: managers,
  });
}
