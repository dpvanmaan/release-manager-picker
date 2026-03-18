import bcrypt from "bcryptjs";
import getDb from "./database";
import type { DbAdapter, DbUser, ManagerWithStats, ManagerForSelection, HistoryResult } from "./adapter";
import type { Manager } from "@/lib/types";

export class SqliteAdapter implements DbAdapter {
  private usersInitialized = false;

  private async ensureUsers(): Promise<void> {
    if (this.usersInitialized) return;
    const db = getDb();
    const seedEmail = process.env.SEED_USER_EMAIL;
    const seedPassword = process.env.SEED_USER_PASSWORD;
    if (seedEmail && seedPassword) {
      const existing = db.prepare("SELECT id FROM users LIMIT 1").get();
      if (!existing) {
        const hash = await bcrypt.hash(seedPassword, 12);
        db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run(seedEmail.toLowerCase().trim(), hash);
      }
    }
    this.usersInitialized = true;
  }
  async getManagers(): Promise<ManagerWithStats[]> {
    const db = getDb();
    return db
      .prepare(
        `SELECT m.*,
          (SELECT selected_at FROM selection_history WHERE manager_id = m.id ORDER BY selected_at DESC LIMIT 1) AS last_picked,
          (SELECT COUNT(*) FROM selection_history WHERE manager_id = m.id) AS pick_count
         FROM managers m
         WHERE m.is_active = 1
         ORDER BY m.name ASC`
      )
      .all() as ManagerWithStats[];
  }

  async getManagerById(id: string | number): Promise<Manager | null> {
    const db = getDb();
    return (db.prepare("SELECT * FROM managers WHERE id = ?").get(id) as Manager) ?? null;
  }

  async createManager(name: string, avatarUrl: string | null, face = "neutral", hat = "none", color = "#f8fafc", shirt = "none"): Promise<Manager> {
    const db = getDb();

    const existing = db
      .prepare("SELECT id FROM managers WHERE name = ? AND is_active = 1")
      .get(name);
    if (existing) {
      throw Object.assign(new Error("Name already exists"), { code: "DUPLICATE" });
    }

    const result = db
      .prepare("INSERT INTO managers (name, avatar_url, face, hat, color, shirt) VALUES (?, ?, ?, ?, ?, ?)")
      .run(name, avatarUrl, face, hat, color, shirt);

    return db.prepare("SELECT * FROM managers WHERE id = ?").get(result.lastInsertRowid) as Manager;
  }

  async updateManager(id: string | number, name: string, face?: string, hat?: string, color?: string, shirt?: string): Promise<{ changed: boolean }> {
    const db = getDb();
    const result = db
      .prepare("UPDATE managers SET name = ?, face = COALESCE(?, face), hat = COALESCE(?, hat), color = COALESCE(?, color), shirt = COALESCE(?, shirt) WHERE id = ? AND is_active = 1")
      .run(name, face ?? null, hat ?? null, color ?? null, shirt ?? null, id);
    return { changed: result.changes > 0 };
  }

  async deactivateManager(id: string | number): Promise<{ changed: boolean }> {
    const db = getDb();
    const result = db
      .prepare("UPDATE managers SET is_active = 0 WHERE id = ? AND is_active = 1")
      .run(id);
    return { changed: result.changes > 0 };
  }

  async getManagersForSelection(): Promise<ManagerForSelection[]> {
    const db = getDb();
    return db
      .prepare(
        `SELECT m.*,
          (SELECT selected_at FROM selection_history WHERE manager_id = m.id ORDER BY selected_at DESC LIMIT 1) AS last_picked
         FROM managers m
         WHERE m.is_active = 1`
      )
      .all() as ManagerForSelection[];
  }

  async recordSelection(managerId: number, notes: string): Promise<void> {
    const db = getDb();
    db.prepare("INSERT INTO selection_history (manager_id, notes) VALUES (?, ?)").run(
      managerId,
      notes
    );
  }

  async clearHistory(): Promise<void> {
    const db = getDb();
    db.prepare("DELETE FROM selection_history").run();
  }

  async deleteHistoryEntry(id: number): Promise<void> {
    const db = getDb();
    db.prepare("DELETE FROM selection_history WHERE id = ?").run(id);
  }

  async getUserByEmail(email: string): Promise<DbUser | null> {
    await this.ensureUsers();
    const db = getDb();
    return (db.prepare("SELECT * FROM users WHERE email = ?").get(email) as DbUser) ?? null;
  }

  async createUser(email: string, passwordHash: string): Promise<DbUser> {
    await this.ensureUsers();
    const db = getDb();
    const result = db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run(email, passwordHash);
    return db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid) as DbUser;
  }

  async listUsers(): Promise<{ id: number; email: string; created_at: string }[]> {
    await this.ensureUsers();
    const db = getDb();
    return db.prepare("SELECT id, email, created_at FROM users ORDER BY created_at ASC").all() as { id: number; email: string; created_at: string }[];
  }

  async getHistory(page: number): Promise<HistoryResult> {
    const db = getDb();
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
      .all(limit, offset) as import("@/lib/types").SelectionHistoryRow[];

    const total = (
      db.prepare("SELECT COUNT(*) AS count FROM selection_history").get() as { count: number }
    ).count;

    return { rows, total, page, limit };
  }
}
