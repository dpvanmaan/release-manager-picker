"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FACES, HATS, COLORS, SHIRTS,
  DEFAULT_FACE, DEFAULT_HAT, DEFAULT_COLOR, DEFAULT_SHIRT,
  BODY_COLOR, getContrastColor,
} from "@/lib/customization";

interface Manager {
  id: number;
  name: string;
  face?: string;
  hat?: string;
  color?: string;
  shirt?: string;
}

interface Props {
  editing: Manager | null;
  onClose: () => void;
  onSave: () => void;
}

function MiniStickFigure({ face, hat, faceColor, shirt }: { face: string; hat: string; faceColor: string; shirt: string }) {
  const fc = getContrastColor(faceColor);
  return (
    <svg viewBox="-20 -80 40 100" width={40} height={80} aria-hidden>
      {/* Hat */}
      {hat === "tophat" && (
        <>
          <rect x={-8} y={-44} width={16} height={3} rx={1} fill={faceColor} />
          <rect x={-5} y={-58} width={10} height={14} rx={1} fill={faceColor} />
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
      <circle cx={0} cy={-30} r={10} stroke={BODY_COLOR} strokeWidth={2} fill={faceColor} />
      {/* Face features */}
      {face === "happy" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={fc} />
          <circle cx={3.5} cy={-32} r={1.2} fill={fc} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "bigsmile" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={fc} />
          <circle cx={3.5} cy={-32} r={1.2} fill={fc} />
          <path d="M -5 -26.5 Q 0 -21 5 -26.5" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "smirk" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={fc} />
          <path d="M 2 -32 Q 3.5 -31 5 -32" stroke={fc} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -1 -27 Q 2 -24.5 4 -26" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "beard" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={fc} />
          <circle cx={3.5} cy={-32} r={1.2} fill={fc} />
          <path d="M -3 -26 Q 0 -24 3 -26" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <path d="M -4 -23 Q 0 -21 4 -23" stroke={fc} strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M -7,-22 Q -8,-14 0,-12 Q 8,-14 7,-22 Z" fill={fc} opacity={0.75} />
        </>
      )}
      {face === "lashes" && (
        <>
          <circle cx={-3.5} cy={-31.5} r={1.3} fill={fc} />
          <line x1={-5.5} y1={-33} x2={-6.5} y2={-36} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-3.5} y1={-33.5} x2={-3.5} y2={-37} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-1.5} y1={-33} x2={-0.5} y2={-36} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <circle cx={3.5} cy={-31.5} r={1.3} fill={fc} />
          <line x1={1.5} y1={-33} x2={0.5} y2={-36} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={3.5} y1={-33.5} x2={3.5} y2={-37} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={5.5} y1={-33} x2={6.5} y2={-36} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "glam" && (
        <>
          <circle cx={-7} cy={-26} r={3} fill="#f472b6" opacity={0.45} />
          <circle cx={7} cy={-26} r={3} fill="#f472b6" opacity={0.45} />
          <circle cx={-3.5} cy={-31.5} r={1.5} fill={fc} />
          <line x1={-6} y1={-32.5} x2={-7.5} y2={-36} stroke={fc} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-4.5} y1={-33.5} x2={-5} y2={-37.5} stroke={fc} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-3} y1={-33.5} x2={-3} y2={-37.5} stroke={fc} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-1.5} y1={-33} x2={-0.5} y2={-36.5} stroke={fc} strokeWidth={1.3} strokeLinecap="round" />
          <circle cx={3.5} cy={-31.5} r={1.5} fill={fc} />
          <line x1={1.5} y1={-33} x2={0.5} y2={-36.5} stroke={fc} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={3} y1={-33.5} x2={3} y2={-37.5} stroke={fc} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={4.5} y1={-33.5} x2={5} y2={-37.5} stroke={fc} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={6} y1={-32.5} x2={7.5} y2={-36} stroke={fc} strokeWidth={1.3} strokeLinecap="round" />
          <path d="M -4 -26.5 Q -2 -24.5 0 -25.5 Q 2 -24.5 4 -26.5" stroke={fc} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -4 -26.5 Q 0 -23 4 -26.5" stroke={fc} strokeWidth={1.5} fill={fc} fillOpacity={0.5} strokeLinecap="round" />
        </>
      )}
      {face === "shocked" && (
        <>
          <line x1={-5} y1={-35} x2={-2} y2={-32} stroke={fc} strokeWidth={1.5} strokeLinecap="round" />
          <line x1={2} y1={-32} x2={5} y2={-35} stroke={fc} strokeWidth={1.5} strokeLinecap="round" />
          <circle cx={0} cy={-26} r={2.5} stroke={fc} strokeWidth={1.5} fill="none" />
        </>
      )}
      {face === "cool" && (
        <>
          <rect x={-5.5} y={-32} width={4} height={3} rx={0.5} fill="#1e293b" stroke={fc} strokeWidth={1} />
          <rect x={1.5} y={-32} width={4} height={3} rx={0.5} fill="#1e293b" stroke={fc} strokeWidth={1} />
          <line x1={-1.5} y1={-30.5} x2={1.5} y2={-30.5} stroke={fc} strokeWidth={1} />
          <line x1={-5.5} y1={-30.5} x2={-7} y2={-30.5} stroke={fc} strokeWidth={1} />
          <line x1={5.5} y1={-30.5} x2={7} y2={-30.5} stroke={fc} strokeWidth={1} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "goofy" && (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={fc} />
          <path d="M 2 -32 Q 3.5 -33.5 5 -32" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <path d="M -4 -27 Q -2 -25 0 -27 Q 2 -29 4 -27" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {/* Shirt */}
      {shirt === "sweater" && (
        <>
          <rect x={-8} y={-18} width={16} height={26} rx={2} fill="#7c3aed" />
          <path d="M -3,-18 L 0,-13 L 3,-18" stroke="#6d28d9" strokeWidth={1.5} fill="none" />
          <line x1={-3} y1={-14} x2={-3} y2={6} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
          <line x1={3} y1={-14} x2={3} y2={6} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
          <line x1={-8} y1={4} x2={8} y2={4} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
          <line x1={-8} y1={7} x2={8} y2={7} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
        </>
      )}
      {shirt === "stripes" && (
        <>
          <rect x={-8} y={-18} width={16} height={26} fill="#f8fafc" />
          <rect x={-8} y={-18} width={16} height={5} fill="#ef4444" />
          <rect x={-8} y={-8} width={16} height={5} fill="#ef4444" />
          <rect x={-8} y={2} width={16} height={6} fill="#ef4444" />
        </>
      )}
      {shirt === "hoodie" && (
        <>
          <rect x={-8} y={-18} width={16} height={26} rx={1} fill="#0d9488" />
          <path d="M -5,-18 Q 0,-13 5,-18" stroke="#0f766e" strokeWidth={2} fill="#0f766e" fillOpacity={0.4} />
          <rect x={-5} y={-3} width={10} height={7} rx={1} fill="#0f766e" />
        </>
      )}
      {shirt === "tuxedo" && (
        <>
          <rect x={-8} y={-18} width={16} height={26} fill="#1e293b" />
          <polygon points="0,-18 -7,-10 -7,-18" fill="#f8fafc" />
          <polygon points="0,-18 7,-10 7,-18" fill="#f8fafc" />
          <polygon points="-3,-16 0,-14 -3,-12" fill="#ef4444" />
          <polygon points="3,-16 0,-14 3,-12" fill="#ef4444" />
        </>
      )}
      {/* Body */}
      <line x1={0} y1={-20} x2={0} y2={10} stroke={BODY_COLOR} strokeWidth={2} />
      <line x1={-15} y1={-5} x2={15} y2={-5} stroke={BODY_COLOR} strokeWidth={2} />
      <line x1={0} y1={10} x2={-12} y2={35} stroke={BODY_COLOR} strokeWidth={2} />
      <line x1={0} y1={10} x2={12} y2={35} stroke={BODY_COLOR} strokeWidth={2} />
    </svg>
  );
}

export default function ManagerForm({ editing, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [face, setFace] = useState<string>(DEFAULT_FACE);
  const [hat, setHat] = useState<string>(DEFAULT_HAT);
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [shirt, setShirt] = useState<string>(DEFAULT_SHIRT);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(editing?.name ?? "");
    setFace(editing?.face ?? DEFAULT_FACE);
    setHat(editing?.hat ?? DEFAULT_HAT);
    setColor(editing?.color ?? DEFAULT_COLOR);
    setShirt(editing?.shirt ?? DEFAULT_SHIRT);
    setError("");
  }, [editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setError("Name cannot be empty"); return; }
    setSaving(true);
    setError("");

    const url = editing ? `/api/managers/${editing.id}` : "/api/managers";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed, face, hat, color, shirt }),
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

          {/* Face color picker */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Face Color</label>
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
                    outline: color === c.id ? "2px solid white" : "2px solid transparent",
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
                    face === f.id ? "bg-zinc-600 ring-1 ring-white" : "bg-zinc-800 hover:bg-zinc-700"
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
                    hat === h.id ? "bg-zinc-600 ring-1 ring-white" : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  {h.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Shirt picker */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Shirt</label>
            <div className="flex flex-wrap gap-1">
              {SHIRTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  title={s.label}
                  onClick={() => setShirt(s.id)}
                  className={`rounded-lg px-2 py-1 text-lg transition-colors ${
                    shirt === s.id ? "bg-zinc-600 ring-1 ring-white" : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  {s.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3">
          <MiniStickFigure face={face} hat={hat} faceColor={color} shirt={shirt} />
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
