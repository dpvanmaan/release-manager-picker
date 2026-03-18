import type { Manager, SelectionHistoryRow } from "@/lib/types";

export interface DbUser {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface ManagerWithStats extends Manager {
  last_picked: string | null;
  pick_count: number;
}

export interface ManagerForSelection extends Manager {
  last_picked: string | null;
}

export interface HistoryResult {
  rows: SelectionHistoryRow[];
  total: number;
  page: number;
  limit: number;
}

export interface DbAdapter {
  getManagers(): Promise<ManagerWithStats[]>;
  getManagerById(id: string | number): Promise<Manager | null>;
  createManager(name: string, avatarUrl: string | null, face?: string, hat?: string, color?: string, shirt?: string): Promise<Manager>;
  updateManager(id: string | number, name: string, face?: string, hat?: string, color?: string, shirt?: string): Promise<{ changed: boolean }>;
  deactivateManager(id: string | number): Promise<{ changed: boolean }>;
  getManagersForSelection(): Promise<ManagerForSelection[]>;
  recordSelection(managerId: number, notes: string): Promise<void>;
  getHistory(page: number): Promise<HistoryResult>;
  clearHistory(): Promise<void>;
  deleteHistoryEntry(id: number): Promise<void>;
  getUserByEmail(email: string): Promise<DbUser | null>;
  createUser(email: string, passwordHash: string): Promise<DbUser>;
  listUsers(): Promise<{ id: number; email: string; created_at: string }[]>;
}
