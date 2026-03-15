import getDb from "../../src/db/database";

const db = getDb();

const members = [
  "Alice Chen",
  "Bob Martinez",
  "Carol Singh",
  "Dave Okonkwo",
  "Emma Johansson",
  "Frank Dubois",
];

const insert = db.prepare(
  "INSERT OR IGNORE INTO managers (name) VALUES (?)"
);
const insertHistory = db.prepare(
  "INSERT INTO selection_history (manager_id, selected_at, notes) VALUES (?, ?, ?)"
);

for (const name of members) {
  insert.run(name);
}

console.log("Seeded", members.length, "team members.");

// Add some fake history
const allManagers = db
  .prepare("SELECT id, name FROM managers WHERE is_active = 1")
  .all() as { id: number; name: string }[];

const now = Date.now();
const historyEntries = [
  { daysAgo: 14 },
  { daysAgo: 7 },
  { daysAgo: 3 },
];

for (const entry of historyEntries) {
  const m = allManagers[Math.floor(Math.random() * allManagers.length)];
  const ts = new Date(now - entry.daysAgo * 24 * 60 * 60 * 1000).toISOString();
  insertHistory.run(m.id, ts, `${m.name} survived the release.`);
}

console.log("Seeded pick history.");
