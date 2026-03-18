"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadUsers() {
    const res = await fetch("/api/users");
    if (res.ok) {
      setUsers(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => { loadUsers(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setSuccess(`User ${email} added.`);
      setEmail("");
      setPassword("");
      loadUsers();
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to add user");
    }
    setSubmitting(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 font-bangers text-3xl tracking-wide text-red-500">Users</h1>

      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Team Members</h2>
        {loading ? (
          <p className="text-sm text-zinc-500">Loading…</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-zinc-500">No users yet.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li key={u.id} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2">
                <span className="text-sm text-zinc-100">{u.email}</span>
                <span className="text-xs text-zinc-500">{new Date(u.created_at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">Invite User</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none"
              placeholder="colleague@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:opacity-50"
          >
            {submitting ? "Adding…" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}
