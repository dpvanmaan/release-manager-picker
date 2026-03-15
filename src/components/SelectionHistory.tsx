"use client";
import { useState, useEffect } from "react";

interface HistoryRow {
  id: number;
  manager_id: number;
  selected_at: string;
  notes: string | null;
  manager_name: string;
}

export default function SelectionHistory() {
  const [rows, setRows] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => {
        setRows(data.rows ?? []);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center text-zinc-500 text-sm">Loading history...</p>;

  if (rows.length === 0)
    return (
      <p className="text-center text-zinc-500 text-sm">
        No picks yet. Sacrifice a colleague!
      </p>
    );

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">{row.manager_name ?? "(deleted)"}</span>
            <span className="text-xs text-zinc-500">
              {new Date(row.selected_at).toLocaleString()}
            </span>
          </div>
          {row.notes && (
            <p className="mt-1 text-xs text-zinc-400 italic">{row.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}
