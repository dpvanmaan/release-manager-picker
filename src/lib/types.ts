export interface Manager {
  id: number;
  name: string;
  avatar_url: string | null;
  is_active: 0 | 1;
  created_at: string;
}

export interface SelectionHistoryRow {
  id: number;
  manager_id: number;
  selected_at: string;
  notes: string | null;
  manager_name: string;
}

export interface ManagerWithWeight extends Manager {
  last_picked: string | null;
  pick_count: number;
  weight: number;
}

export type AnimationPhase =
  | "idle"
  | "picking"
  | "walking"
  | "dropping"
  | "seated"
  | "celebrating";
