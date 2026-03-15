import type { Manager } from "./types";

interface ManagerWithHistory extends Manager {
  last_picked: string | null;
}

export function weightedPick(managers: ManagerWithHistory[]): ManagerWithHistory {
  if (managers.length === 0) throw new Error("No managers to pick from");
  if (managers.length === 1) return managers[0];

  const now = Date.now();

  const weights = managers.map((m) => {
    if (!m.last_picked) {
      // Never picked — treat as picked 30 days ago for a high base weight
      const daysSince = 30;
      return Math.pow(daysSince, 1.5);
    }
    const lastMs = new Date(m.last_picked).getTime();
    const daysSince = Math.max(0.01, (now - lastMs) / (1000 * 60 * 60 * 24));
    return Math.pow(daysSince, 1.5);
  });

  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;

  for (let i = 0; i < managers.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return managers[i];
  }

  return managers[managers.length - 1];
}
