import { NextResponse } from "next/server";
import { getAdapter } from "@/db";
import { weightedPick } from "@/lib/selection";
import { getRandomMessage } from "@/lib/messages";

export async function POST() {
  const adapter = getAdapter();

  const managers = await adapter.getManagersForSelection();

  if (managers.length === 0) {
    return NextResponse.json(
      { error: "No active managers to pick from" },
      { status: 400 }
    );
  }

  const winner = weightedPick(managers);
  const funnyMessage = getRandomMessage(winner.name);

  await adapter.recordSelection(winner.id, funnyMessage);

  return NextResponse.json({
    winner,
    funnyMessage,
    allManagers: managers,
  });
}
