import type { Manager } from "./types";

interface ManagerWithHistory extends Manager {
  last_picked: string | null;
}

export function parseUtc(dateStr: string): Date {
  // Normalize both SQLite ("YYYY-MM-DD HH:MM:SS") and Postgres ("YYYY-MM-DD HH:MM:SS.ssssss+00")
  let s = dateStr.trim();
  // Replace space separator with T if needed
  if (!s.includes("T")) {
    s = s.replace(" ", "T");
  }
  // Strip trailing UTC offset (+00, +00:00) — we know the value is UTC
  s = s.replace(/[+-]00(:00)?$/, "");
  // Append Z to mark as UTC if no timezone marker is present
  if (!s.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(s)) {
    s += "Z";
  }
  return new Date(s);
}

export function managerWeight(lastPicked: string | null): number {
  if (!lastPicked) {
    // Never picked — treat as picked 30 days ago
    return Math.pow(30 * 24 * 60 * 60, 1.5);
  }
  const seconds = Math.max(0.01, (Date.now() - parseUtc(lastPicked).getTime()) / 1000);
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
