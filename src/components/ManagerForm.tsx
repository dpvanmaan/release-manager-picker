"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FACES, HATS, COLORS, DEFAULT_FACE, DEFAULT_HAT, DEFAULT_COLOR } from "@/lib/customization";

interface Manager {
  id: number;
  name: string;
  face?: string;
  hat?: string;
  color?: string;
}

interface Props {
  editing: Manager | null;
  onClose: () => void;
  onSave: () => void;
}

function MiniStickFigure({ face, hat, color }: { face: string; hat: string; color: string }) {
  return (
    <svg viewBox="-20 -80 40 100" width={40} height={80} aria-hidden>
      {/* Hat */}
      {hat === "tophat" && (
        <>
          <rect x={-8} y={-44} width={16} height={3} rx={1} fill={color} />
          <rect x={-5} y={-58} width={10} height={14} rx={1} fill={color} />
          <rect x={-5} y={-46} width={10} height={2.5} fill="#27272a" />
        </>
      )}
      {hat === "party" && (
        <>
          <polygon points="0,-68 -8,-40 8,-40" fill="#ec4899" opacity={0.9} />
          <line x1={-4} y1={-54} x2={4} y2={-54} stroke="#fbbf24" strokeWidth={1.5} />
          <line x1={-6} y1={-47} x2={6} y2={-47} stroke="#60a5fa" strokeWidth={1.5} />
          <circle cx={0} cy={-68} r={2} fill="#fbbf24" />
          <circle cx={-3} cy={-50} r={1.5} fill="#fbbf24" />
          <circle cx={3} cy={-57} r={1.5} fill="#60a5fa" />
        </>
      )}
      {hat === "cowboy" && (
        <>
          <ellipse cx={0} cy={-49} rx={7} ry={6} fill="#d97706" />
          <ellipse cx={0} cy={-43} rx={12} ry={3} fill="#b45309" />
          <rect x={-7} y={-46} width={14} height={2} fill="#92400e" />
        </>
      )}
      {hat === "wizard" && (
        <>
          <polygon points="0,-72 -7,-40 7,-40" fill="#7c3aed" />
          <circle cx={-2} cy={-55} r={1.5} fill="#fbbf24" />
          <circle cx={3} cy={-63} r={1.2} fill="#fbbf24" />
          <ellipse cx={0} cy={-40} rx={8} ry={2} fill="#6d28d9" />
          <circle cx={0} cy={-72} r={1.5} fill="#fbbf24" />
        </>
      )}
      {hat === "crown" && (
        <>
          <path d="M -7,-40 L -7,-50 L -3.5,-45 L 0,-53 L 3.5,-45 L 7,-50 L 7,-40 Z" fill="#fbbf24" stroke="#d97706" strokeWidth={1} />
          <circle cx={0} cy={-47} r={1.5} fill="#ef4444" />
          <circle cx={-4.5} cy={-43} r={1} fill="#60a5fa" />
          <circle cx={4.5} cy={-43} r={1} fill="#4ade80" />
        </>
      )}
      {/* Head */}
      <circle cx={0} cy={-30} r={10} stroke={color} strokeWidth={2} fill="none" />
      {/* Face */}
      {face === "happy" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <circle cx={3.5} cy={-32} r={1.2} fill={color} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "bigsmile" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <circle cx={3.5} cy={-32} r={1.2} fill={color} />
          <path d="M -5 -26.5 Q 0 -21 5 -26.5" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "smirk" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <path d="M 2 -32 Q 3.5 -31 5 -32" stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -1 -27 Q 2 -24.5 4 -26" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "beard" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <circle cx={3.5} cy={-32} r={1.2} fill={color} />
          <path d="M -3 -26 Q 0 -24 3 -26" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <path d="M -4 -23 Q 0 -21 4 -23" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M -7,-22 Q -8,-14 0,-12 Q 8,-14 7,-22 Z" fill={color} opacity={0.75} />
        </>
      )}
      {face === "lashes" && (
        <>
          <circle cx={-3.5} cy={-31.5} r={1.3} fill={color} />
          <line x1={-5.5} y1={-33} x2={-6.5} y2={-36} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-3.5} y1={-33.5} x2={-3.5} y2={-37} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-1.5} y1={-33} x2={-0.5} y2={-36} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <circle cx={3.5} cy={-31.5} r={1.3} fill={color} />
          <line x1={1.5} y1={-33} x2={0.5} y2={-36} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={3.5} y1={-33.5} x2={3.5} y2={-37} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={5.5} y1={-33} x2={6.5} y2={-36} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "glam" && (
        <>
          <circle cx={-7} cy={-26} r={3} fill="#f472b6" opacity={0.35} />
          <circle cx={7} cy={-26} r={3} fill="#f472b6" opacity={0.35} />
          <circle cx={-3.5} cy={-31.5} r={1.5} fill={color} />
          <line x1={-6} y1={-32.5} x2={-7.5} y2={-36} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-4.5} y1={-33.5} x2={-5} y2={-37.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-3} y1={-33.5} x2={-3} y2={-37.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-1.5} y1={-33} x2={-0.5} y2={-36.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <circle cx={3.5} cy={-31.5} r={1.5} fill={color} />
          <line x1={1.5} y1={-33} x2={0.5} y2={-36.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={3} y1={-33.5} x2={3} y2={-37.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={4.5} y1={-33.5} x2={5} y2={-37.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={6} y1={-32.5} x2={7.5} y2={-36} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <path d="M -4 -26.5 Q -2 -24.5 0 -25.5 Q 2 -24.5 4 -26.5" stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -4 -26.5 Q 0 -23 4 -26.5" stroke={color} strokeWidth={1.5} fill={color} fillOpacity={0.5} strokeLinecap="round" />
        </>
      )}
      {face === "longhair" && (
        <>
          <path d="M -10,-30 Q -8,-43 0,-44 Q 8,-43 10,-30 Z" fill={color} />
          <path d="M -9,-37 Q -13,-22 -12,-5 Q -12,8 -9,18" stroke={color} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <path d="M 9,-37 Q 13,-22 12,-5 Q 12,8 9,18" stroke={color} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <circle cx={3.5} cy={-32} r={1.2} fill={color} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "shocked" && (
        <>
          <line x1={-5} y1={-35} x2={-2} y2={-32} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <line x1={2} y1={-32} x2={5} y2={-35} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <circle cx={0} cy={-26} r={2.5} stroke={color} strokeWidth={1.5} fill="none" />
        </>
      )}
      {face === "cool" && (
        <>
          <rect x={-5.5} y={-32} width={4} height={3} rx={0.5} fill="#1e293b" stroke={color} strokeWidth={1} />
          <rect x={1.5} y={-32} width={4} height={3} rx={0.5} fill="#1e293b" stroke={color} strokeWidth={1} />
          <line x1={-1.5} y1={-30.5} x2={1.5} y2={-30.5} stroke={color} strokeWidth={1} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "goofy" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <path d="M 2 -32 Q 3.5 -33.5 5 -32" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <path d="M -4 -27 Q -2 -25 0 -27 Q 2 -29 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {/* Body */}
      <line x1={0} y1={-20} x2={0} y2={10} stroke={color} strokeWidth={2} />
      <line x1={-15} y1={-5} x2={15} y2={-5} stroke={color} strokeWidth={2} />
      <line x1={0} y1={10} x2={-12} y2={35} stroke={color} strokeWidth={2} />
      <line x1={0} y1={10} x2={12} y2={35} stroke={color} strokeWidth={2} />
    </svg>
  );
}

export default function ManagerForm({ editing, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [face, setFace] = useState<string>(DEFAULT_FACE);
  const [hat, setHat] = useState<string>(DEFAULT_HAT);
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(editing?.name ?? "");
    setFace(editing?.face ?? DEFAULT_FACE);
    setHat(editing?.hat ?? DEFAULT_HAT);
    setColor(editing?.color ?? DEFAULT_COLOR);
    setError("");
  }, [editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Name cannot be empty");
      return;
    }
    setSaving(true);
    setError("");

    const url = editing ? `/api/managers/${editing.id}` : "/api/managers";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed, face, hat, color }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save");
      return;
    }

    onSave();
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        {/* Left: form fields */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter team member name"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-1 text-xs text-red-400"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Body Color</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={c.label}
                  onClick={() => setColor(c.id)}
                  className="rounded-full transition-transform hover:scale-110"
                  style={{
                    width: 22,
                    height: 22,
                    backgroundColor: c.id,
                    outline: color === c.id ? `2px solid white` : "2px solid transparent",
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Face picker */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Face</label>
            <div className="flex flex-wrap gap-1">
              {FACES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  title={f.label}
                  onClick={() => setFace(f.id)}
                  className={`rounded-lg px-2 py-1 text-lg transition-colors ${
                    face === f.id
                      ? "bg-zinc-600 ring-1 ring-white"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  {f.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Hat picker */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Hat</label>
            <div className="flex flex-wrap gap-1">
              {HATS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  title={h.label}
                  onClick={() => setHat(h.id)}
                  className={`rounded-lg px-2 py-1 text-lg transition-colors ${
                    hat === h.id
                      ? "bg-zinc-600 ring-1 ring-white"
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  {h.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3">
          <MiniStickFigure face={face} hat={hat} color={color} />
          <span className="text-xs text-zinc-500">Preview</span>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving..." : editing ? "Save Changes" : "Add Member"}
        </button>
      </div>
    </form>
  );
}
