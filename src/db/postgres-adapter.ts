import postgres from "postgres";
import type { DbAdapter, ManagerWithStats, ManagerForSelection, HistoryResult } from "./adapter";
import type { Manager, SelectionHistoryRow } from "@/lib/types";

function getSql() {
  const url =
    process.env.SUPABASE_DB_URL ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL;
  if (!url) throw new Error("No Postgres connection URL found. Set SUPABASE_DB_URL.");
  return postgres(url);
}

let _sql: ReturnType<typeof postgres> | null = null;
function sql() {
  if (!_sql) _sql = getSql();
  return _sql;
}

export class PostgresAdapter implements DbAdapter {
  private initialized = false;

  private async ensureSchema(): Promise<void> {
    if (this.initialized) return;
    const db = sql();
    await db`
      CREATE TABLE IF NOT EXISTS managers (
        id         SERIAL PRIMARY KEY,
        name       TEXT    NOT NULL,
        avatar_url TEXT,
        is_active  INTEGER NOT NULL DEFAULT 1,
        created_at TEXT    NOT NULL DEFAULT (NOW()::text)
      )
    `;
    await db`ALTER TABLE managers ADD COLUMN IF NOT EXISTS face TEXT NOT NULL DEFAULT 'neutral'`;
    await db`ALTER TABLE managers ADD COLUMN IF NOT EXISTS hat TEXT NOT NULL DEFAULT 'none'`;
    await db`ALTER TABLE managers ADD COLUMN IF NOT EXISTS color TEXT NOT NULL DEFAULT '#f8fafc'`;
    await db`ALTER TABLE managers ADD COLUMN IF NOT EXISTS shirt TEXT NOT NULL DEFAULT 'none'`;
    await db`
      CREATE TABLE IF NOT EXISTS selection_history (
        id          SERIAL PRIMARY KEY,
        manager_id  INTEGER NOT NULL REFERENCES managers(id),
        selected_at TEXT    NOT NULL DEFAULT (NOW()::text),
        notes       TEXT
      )
    `;
    await db`
      CREATE INDEX IF NOT EXISTS idx_history_manager_selected
        ON selection_history(manager_id, selected_at DESC)
    `;
    this.initialized = true;
  }

  async getManagers(): Promise<ManagerWithStats[]> {
    await this.ensureSchema();
    return sql()<ManagerWithStats[]>`
      SELECT m.*,
        (SELECT selected_at FROM selection_history WHERE manager_id = m.id ORDER BY selected_at DESC LIMIT 1) AS last_picked,
        (SELECT COUNT(*) FROM selection_history WHERE manager_id = m.id)::int AS pick_count
      FROM managers m
      WHERE m.is_active = 1
      ORDER BY m.name ASC
    `;
  }

  async getManagerById(id: string | number): Promise<Manager | null> {
    await this.ensureSchema();
    const rows = await sql()<Manager[]>`SELECT * FROM managers WHERE id = ${Number(id)}`;
    return rows[0] ?? null;
  }

  async createManager(name: string, avatarUrl: string | null, face = "neutral", hat = "none", color = "#f8fafc", shirt = "none"): Promise<Manager> {
    await this.ensureSchema();
    const existing = await sql()`
      SELECT id FROM managers WHERE name = ${name} AND is_active = 1
    `;
    if (existing.length > 0) {
      throw Object.assign(new Error("Name already exists"), { code: "DUPLICATE" });
    }
    const rows = await sql()<Manager[]>`
      INSERT INTO managers (name, avatar_url, face, hat, color, shirt) VALUES (${name}, ${avatarUrl}, ${face}, ${hat}, ${color}, ${shirt})
      RETURNING *
    `;
    return rows[0];
  }

  async updateManager(id: string | number, name: string, face?: string, hat?: string, color?: string, shirt?: string): Promise<{ changed: boolean }> {
    await this.ensureSchema();
    const result = await sql()`
      UPDATE managers SET
        name = ${name},
        face = COALESCE(${face ?? null}, face),
        hat = COALESCE(${hat ?? null}, hat),
        color = COALESCE(${color ?? null}, color),
        shirt = COALESCE(${shirt ?? null}, shirt)
      WHERE id = ${Number(id)} AND is_active = 1
    `;
    return { changed: result.count > 0 };
  }

  async deactivateManager(id: string | number): Promise<{ changed: boolean }> {
    await this.ensureSchema();
    const result = await sql()`
      UPDATE managers SET is_active = 0 WHERE id = ${Number(id)} AND is_active = 1
    `;
    return { changed: result.count > 0 };
  }

  async getManagersForSelection(): Promise<ManagerForSelection[]> {
    await this.ensureSchema();
    return sql()<ManagerForSelection[]>`
      SELECT m.*,
        (SELECT selected_at FROM selection_history WHERE manager_id = m.id ORDER BY selected_at DESC LIMIT 1) AS last_picked
      FROM managers m
      WHERE m.is_active = 1
    `;
  }

  async recordSelection(managerId: number, notes: string): Promise<void> {
    await this.ensureSchema();
    await sql()`
      INSERT INTO selection_history (manager_id, notes) VALUES (${managerId}, ${notes})
    `;
  }

  async clearHistory(): Promise<void> {
    await this.ensureSchema();
    await sql()`DELETE FROM selection_history`;
  }

  async deleteHistoryEntry(id: number): Promise<void> {
    await this.ensureSchema();
    await sql()`DELETE FROM selection_history WHERE id = ${id}`;
  }

  async getHistory(page: number): Promise<HistoryResult> {
    await this.ensureSchema();
    const limit = 20;
    const offset = (page - 1) * limit;

    const rows = await sql()<SelectionHistoryRow[]>`
      SELECT sh.id, sh.manager_id, sh.selected_at, sh.notes,
             m.name AS manager_name
      FROM selection_history sh
      LEFT JOIN managers m ON m.id = sh.manager_id
      ORDER BY sh.selected_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const countResult = await sql()<{ count: string }[]>`
      SELECT COUNT(*) AS count FROM selection_history
    `;
    const total = parseInt(countResult[0]?.count ?? "0", 10);

    return { rows, total, page, limit };
  }
}
