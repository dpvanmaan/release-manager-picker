import type { Manager, SelectionHistoryRow } from "@/lib/types";

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
  createManager(name: string, avatarUrl: string | null, face?: string, hat?: string, color?: string): Promise<Manager>;
  updateManager(id: string | number, name: string, face?: string, hat?: string, color?: string): Promise<{ changed: boolean }>;
  deactivateManager(id: string | number): Promise<{ changed: boolean }>;
  getManagersForSelection(): Promise<ManagerForSelection[]>;
  recordSelection(managerId: number, notes: string): Promise<void>;
  getHistory(page: number): Promise<HistoryResult>;
}
