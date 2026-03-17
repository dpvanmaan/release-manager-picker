"use client";
import { motion } from "framer-motion";
import { parseUtc } from "@/lib/selection";

interface Manager {
  id: number;
  name: string;
  last_picked: string | null;
  pick_count: number;
}

interface Props {
  manager: Manager;
  onDelete: (id: number) => void;
  onEdit: (manager: Manager) => void;
  probability?: number;
}

function daysSince(dateStr: string | null): number {
  if (!dateStr) return 999;
  return (Date.now() - parseUtc(dateStr).getTime()) / (1000 * 60 * 60 * 24);
}

export default function ManagerCard({ manager, onDelete, onEdit, probability }: Props) {
  const days = daysSince(manager.last_picked);
  const barWidth =
    probability !== undefined
      ? Math.max(0, Math.min(100, probability))
      : Math.max(0, Math.min(100, (days / 14) * 100));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">{manager.name}</div>
          <div className="text-xs text-zinc-500">
            {manager.pick_count === 0
              ? "Never picked"
              : `Picked ${manager.pick_count}× · last ${Math.round(days)}d ago`}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(manager)}
            className="rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(manager.id)}
            className="rounded px-2 py-1 text-xs text-red-400 hover:bg-red-950 hover:text-red-300 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
      {/* Weight bar */}
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs text-zinc-600">
          <span>Pick probability</span>
          <span>{Math.round(barWidth)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-red-500"
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
