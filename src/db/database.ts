import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH =
  process.env.DATABASE_PATH ??
  path.join(process.cwd(), "release-manager.db");

let db: Database.Database;

function getDb(): Database.Database {
  if (db) return db;

  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  db = new Database(DB_PATH);
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS managers (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      avatar_url TEXT,
      is_active  INTEGER NOT NULL DEFAULT 1,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS selection_history (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      manager_id  INTEGER NOT NULL REFERENCES managers(id),
      selected_at TEXT    NOT NULL DEFAULT (datetime('now')),
      notes       TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_history_manager_selected
      ON selection_history(manager_id, selected_at DESC);
  `);

  // Idempotent migrations for customization columns
  try { db.exec("ALTER TABLE managers ADD COLUMN face TEXT NOT NULL DEFAULT 'neutral'"); } catch {}
  try { db.exec("ALTER TABLE managers ADD COLUMN hat TEXT NOT NULL DEFAULT 'none'"); } catch {}
  try { db.exec("ALTER TABLE managers ADD COLUMN color TEXT NOT NULL DEFAULT '#e2e8f0'"); } catch {}

  return db;
}

export default getDb;
