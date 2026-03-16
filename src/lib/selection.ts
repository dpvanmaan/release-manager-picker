import type { Manager } from "./types";

interface ManagerWithHistory extends Manager {
  last_picked: string | null;
}

function parseUtc(dateStr: string): Date {
  // SQLite stores UTC as "YYYY-MM-DD HH:MM:SS" (space, no T, no Z)
  // Replace the space with T and append Z so it's parsed as UTC
  const normalized = dateStr.includes("T")
    ? dateStr
    : dateStr.replace(" ", "T") + "Z";
  return new Date(normalized);
}

export function managerWeight(lastPicked: string | null): number {
  if (!lastPicked) {
    // Never picked — treat as picked 30 days ago
    return Math.pow(30 * 24 * 60 * 60, 1.5);
  }
  const seconds = Math.max(0.01, (Date.now() - parseUtc(lastPicked).getTime()) / 1000);
  console.log(lastPicked)
  console.log(parseUtc(lastPicked).getTime())
  console.log(Date.now())
  return Math.pow(seconds, 1.5);
}

export function computeProbabilities(managers: { last_picked: string | null }[]): number[] {
  const weights = managers.map((m) => managerWeight(m.last_picked));
  const total = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => (total > 0 ? (w / total) * 100 : 0));
}

export function weightedPick(managers: ManagerWithHistory[]): ManagerWithHistory {
  if (managers.length === 0) throw new Error("No managers to pick from");
  if (managers.length === 1) return managers[0];

  const weights = managers.map((m) => managerWeight(m.last_picked));
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;

  for (let i = 0; i < managers.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return managers[i];
  }

  return managers[managers.length - 1];
}
