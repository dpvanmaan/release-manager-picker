"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ManagerCard from "@/components/ManagerCard";
import ManagerForm from "@/components/ManagerForm";
import { computeProbabilities } from "@/lib/selection";

interface Manager {
  id: number;
  name: string;
  last_picked: string | null;
  pick_count: number;
  face?: string;
  hat?: string;
  color?: string;
}

export default function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Manager | null>(null);

  async function loadManagers() {
    const data = await fetch("/api/managers").then((r) => r.json());
    setManagers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadManagers();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Remove this team member?")) return;
    await fetch(`/api/managers/${id}`, { method: "DELETE" });
    loadManagers();
  }

  function handleEdit(manager: Manager) {
    setEditing(manager);
    setShowForm(true);
  }

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bangers text-4xl tracking-wide text-zinc-100">
            👥 Team Members
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage who can be sacrificed to the release pipeline.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors"
        >
          + Add Member
        </button>
      </div>

      {/* Slide-in form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-5"
          >
            <h2 className="mb-4 text-sm font-semibold text-zinc-300">
              {editing ? "Edit Member" : "Add New Member"}
            </h2>
            <ManagerForm
              editing={editing}
              onClose={() => setShowForm(false)}
              onSave={loadManagers}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <p className="text-center text-zinc-500 text-sm">Loading...</p>
      ) : managers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 p-10 text-center">
          <p className="text-zinc-500">
            No team members yet. Add your first victim above.
          </p>
        </div>
      ) : (
        <motion.div className="grid gap-3 sm:grid-cols-2" layout>
          <AnimatePresence>
            {managers.map((m, i) => (
              <ManagerCard
                key={m.id}
                manager={m}
                onDelete={handleDelete}
                onEdit={handleEdit}
                probability={computeProbabilities(managers)[i]}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
