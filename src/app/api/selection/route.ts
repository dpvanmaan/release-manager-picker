import { NextResponse } from "next/server";
import { getAdapter } from "@/db";
import { weightedPick } from "@/lib/selection";
import { getRandomMessage } from "@/lib/messages";

export async function POST(request: Request) {
  const adapter = getAdapter();

  const body = await request.json().catch(() => ({}));
  const excludeIds: number[] = Array.isArray(body.excludeIds) ? body.excludeIds : [];

  const allManagers = await adapter.getManagersForSelection();

  const eligible = excludeIds.length > 0
    ? allManagers.filter((m) => !excludeIds.includes(m.id))
    : allManagers;

  if (eligible.length === 0) {
    return NextResponse.json(
      { error: "No eligible managers to pick from" },
      { status: 400 }
    );
  }

  const winner = weightedPick(eligible);
  const funnyMessage = getRandomMessage(winner.name);

  await adapter.recordSelection(winner.id, funnyMessage);

  return NextResponse.json({
    winner,
    funnyMessage,
    allManagers: eligible,
  });
}
