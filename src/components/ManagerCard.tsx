"use client";
import { motion } from "framer-motion";

interface Manager {
  id: number;
  name: string;
  last_picked: string | null;
  pick_count: number;
  face?: string;
  hat?: string;
  color?: string;
}

interface Props {
  manager: Manager;
  onDelete: (id: number) => void;
  onEdit: (manager: Manager) => void;
  probability?: number;
}

function daysSince(dateStr: string | null): number {
  if (!dateStr) return 999;
  const normalized = dateStr.includes("T")
    ? dateStr
    : dateStr.replace(" ", "T") + "Z";
  return (Date.now() - new Date(normalized).getTime()) / (1000 * 60 * 60 * 24);
}

function TinyFigure({ face = "neutral", hat = "none", color = "#e2e8f0" }: { face?: string; hat?: string; color?: string }) {
  return (
    <svg viewBox="-18 -80 36 95" width={28} height={52} aria-hidden>
      {hat === "tophat" && (
        <>
          <rect x={-7} y={-44} width={14} height={2.5} rx={1} fill={color} />
          <rect x={-4.5} y={-56} width={9} height={12} rx={1} fill={color} />
        </>
      )}
      {hat === "party" && (
        <polygon points="0,-65 -7,-40 7,-40" fill="#ec4899" opacity={0.9} />
      )}
      {hat === "cowboy" && (
        <>
          <ellipse cx={0} cy={-49} rx={6} ry={5} fill="#d97706" />
          <ellipse cx={0} cy={-43} rx={10} ry={2.5} fill="#b45309" />
        </>
      )}
      {hat === "wizard" && (
        <polygon points="0,-68 -6,-40 6,-40" fill="#7c3aed" />
      )}
      {hat === "crown" && (
        <path d="M -6,-40 L -6,-48 L -3,-44 L 0,-51 L 3,-44 L 6,-48 L 6,-40 Z" fill="#fbbf24" />
      )}
      {/* Head */}
      <circle cx={0} cy={-30} r={9} stroke={color} strokeWidth={2} fill="none" />
      {face === "happy" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={color} />
          <circle cx={3} cy={-32} r={1} fill={color} />
          <path d="M -3.5 -27 Q 0 -23.5 3.5 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "bigsmile" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={color} />
          <circle cx={3} cy={-32} r={1} fill={color} />
          <path d="M -4.5 -26.5 Q 0 -21.5 4.5 -26.5" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "smirk" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={color} />
          <path d="M 1.5 -32 Q 3 -31 4.5 -32" stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -1 -27 Q 1.5 -24.5 3.5 -26" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "beard" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={color} />
          <circle cx={3} cy={-32} r={1} fill={color} />
          <path d="M -2.5 -26 Q 0 -24 2.5 -26" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <path d="M -3.5 -23 Q 0 -21 3.5 -23" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M -6,-22 Q -7,-14 0,-12 Q 7,-14 6,-22 Z" fill={color} opacity={0.75} />
        </>
      )}
      {face === "lashes" && (
        <>
          <circle cx={-3} cy={-31.5} r={1.1} fill={color} />
          <line x1={-5} y1={-32.5} x2={-6} y2={-35.5} stroke={color} strokeWidth={1.1} strokeLinecap="round" />
          <line x1={-3} y1={-33} x2={-3} y2={-36} stroke={color} strokeWidth={1.1} strokeLinecap="round" />
          <line x1={-1} y1={-32.5} x2={-0.2} y2={-35.5} stroke={color} strokeWidth={1.1} strokeLinecap="round" />
          <circle cx={3} cy={-31.5} r={1.1} fill={color} />
          <line x1={1} y1={-32.5} x2={0.2} y2={-35.5} stroke={color} strokeWidth={1.1} strokeLinecap="round" />
          <line x1={3} y1={-33} x2={3} y2={-36} stroke={color} strokeWidth={1.1} strokeLinecap="round" />
          <line x1={5} y1={-32.5} x2={6} y2={-35.5} stroke={color} strokeWidth={1.1} strokeLinecap="round" />
          <path d="M -3.5 -27 Q 0 -23.5 3.5 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "glam" && (
        <>
          <circle cx={-6.5} cy={-26} r={2.5} fill="#f472b6" opacity={0.35} />
          <circle cx={6.5} cy={-26} r={2.5} fill="#f472b6" opacity={0.35} />
          <circle cx={-3} cy={-31.5} r={1.3} fill={color} />
          <line x1={-5.5} y1={-32.5} x2={-7} y2={-35.5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-4} y1={-33} x2={-4.5} y2={-36.5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-2.5} y1={-33} x2={-2.5} y2={-36.5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-1} y1={-32.5} x2={-0.3} y2={-35.5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <circle cx={3} cy={-31.5} r={1.3} fill={color} />
          <line x1={1} y1={-32.5} x2={0.3} y2={-35.5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={2.5} y1={-33} x2={2.5} y2={-36.5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={4} y1={-33} x2={4.5} y2={-36.5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={5.5} y1={-32.5} x2={7} y2={-35.5} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <path d="M -3.5 -26.5 Q -1.5 -24.5 0 -25.5 Q 1.5 -24.5 3.5 -26.5" stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -3.5 -26.5 Q 0 -23 3.5 -26.5" stroke={color} strokeWidth={1.5} fill={color} fillOpacity={0.5} strokeLinecap="round" />
        </>
      )}
      {face === "longhair" && (
        <>
          <path d="M -9,-30 Q -7,-42 0,-43 Q 7,-42 9,-30 Z" fill={color} />
          <path d="M -8,-36 Q -12,-21 -11,-5 Q -11,7 -8,17" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M 8,-36 Q 12,-21 11,-5 Q 11,7 8,17" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
          <circle cx={-3} cy={-32} r={1} fill={color} />
          <circle cx={3} cy={-32} r={1} fill={color} />
          <path d="M -3.5 -27 Q 0 -23.5 3.5 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "shocked" && (
        <circle cx={0} cy={-26} r={2.2} stroke={color} strokeWidth={1.5} fill="none" />
      )}
      {face === "cool" && (
        <>
          <rect x={-5} y={-32} width={3.5} height={2.5} rx={0.5} fill="#1e293b" stroke={color} strokeWidth={1} />
          <rect x={1.5} y={-32} width={3.5} height={2.5} rx={0.5} fill="#1e293b" stroke={color} strokeWidth={1} />
          <line x1={-1.5} y1={-30.8} x2={1.5} y2={-30.8} stroke={color} strokeWidth={1} />
        </>
      )}
      {face === "goofy" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={color} />
          <path d="M -3.5 -27 Q -1.5 -25 0 -27 Q 1.5 -29 3.5 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {/* Body */}
      <line x1={0} y1={-21} x2={0} y2={10} stroke={color} strokeWidth={2} />
      <line x1={-13} y1={-5} x2={13} y2={-5} stroke={color} strokeWidth={2} />
      <line x1={0} y1={10} x2={-10} y2={32} stroke={color} strokeWidth={2} />
      <line x1={0} y1={10} x2={10} y2={32} stroke={color} strokeWidth={2} />
    </svg>
  );
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
        <div className="flex items-center gap-3">
          <TinyFigure face={manager.face} hat={manager.hat} color={manager.color} />
          <div>
            <div className="font-semibold text-white">{manager.name}</div>
            <div className="text-xs text-zinc-500">
              {manager.pick_count === 0
                ? "Never picked"
                : `Picked ${manager.pick_count}× · last ${Math.round(days)}d ago`}
            </div>
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
