"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { parseUtc } from "@/lib/selection";

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
  const [confirming, setConfirming] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => {
        setRows(data.rows ?? []);
        setLoading(false);
      });
  }, []);

  async function handleClearAll() {
    setClearing(true);
    await fetch("/api/history", { method: "DELETE" });
    setRows([]);
    setClearing(false);
    setConfirming(false);
  }

  async function handleDeleteOne() {
    if (deletingId === null) return;
    setDeleting(true);
    await fetch(`/api/history?id=${deletingId}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r) => r.id !== deletingId));
    setDeleting(false);
    setDeletingId(null);
  }

  if (loading)
    return <p className="text-center text-zinc-500 text-sm">Loading history...</p>;

  if (rows.length === 0)
    return (
      <p className="text-center text-zinc-500 text-sm">
        No picks yet. Sacrifice a colleague!
      </p>
    );

  return (
    <>
      <div className="mb-3 flex items-center justify-end">
        <button
          onClick={() => setConfirming(true)}
          className="rounded-md border border-red-800/50 bg-red-950/30 px-3 py-1 text-xs text-red-400 transition-colors hover:border-red-700 hover:bg-red-900/40 hover:text-red-300"
        >
          Clear History
        </button>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">{row.manager_name ?? "(deleted)"}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">
                  {parseUtc(row.selected_at).toLocaleString()}
                </span>
                <button
                  onClick={() => setDeletingId(row.id)}
                  title="Remove this pick"
                  className="rounded px-1 text-zinc-600 transition-colors hover:text-red-400"
                >
                  ×
                </button>
              </div>
            </div>
            {row.notes && (
              <p className="mt-1 text-xs text-zinc-400 italic">{row.notes}</p>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {confirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirming(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="mx-4 w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-2 text-lg font-semibold text-white">Clear all history?</h3>
              <p className="mb-6 text-sm text-zinc-400">
                This will permanently delete all pick records. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  disabled={clearing}
                  className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={clearing}
                  className="flex-1 rounded-lg bg-red-700 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                >
                  {clearing ? "Clearing…" : "Clear All"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setDeletingId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="mx-4 w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-2 text-lg font-semibold text-white">Remove this pick?</h3>
              <p className="mb-6 text-sm text-zinc-400">
                This will permanently delete this pick record. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  disabled={deleting}
                  className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteOne}
                  disabled={deleting}
                  className="flex-1 rounded-lg bg-red-700 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                >
                  {deleting ? "Removing…" : "Remove"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
