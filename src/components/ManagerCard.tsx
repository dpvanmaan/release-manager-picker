"use client";
import { motion } from "framer-motion";
import { BODY_COLOR, getContrastColor } from "@/lib/customization";
import { parseUtc } from "@/lib/selection";

interface Manager {
  id: number;
  name: string;
  last_picked: string | null;
  pick_count: number;
  face?: string;
  hat?: string;
  color?: string;
  shirt?: string;
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

function TinyFigure({
  face = "neutral",
  hat = "none",
  faceColor = "#f8fafc",
  shirt = "none",
}: {
  face?: string;
  hat?: string;
  faceColor?: string;
  shirt?: string;
}) {
  const fc = getContrastColor(faceColor);
  return (
    <svg viewBox="-18 -80 36 95" width={28} height={52} aria-hidden>
      {hat === "tophat" && (
        <>
          <rect x={-7} y={-44} width={14} height={2.5} rx={1} fill={faceColor} />
          <rect x={-4.5} y={-56} width={9} height={12} rx={1} fill={faceColor} />
        </>
      )}
      {hat === "party" && <polygon points="0,-65 -7,-40 7,-40" fill="#ec4899" opacity={0.9} />}
      {hat === "cowboy" && (
        <>
          <ellipse cx={0} cy={-49} rx={6} ry={5} fill="#d97706" />
          <ellipse cx={0} cy={-43} rx={10} ry={2.5} fill="#b45309" />
        </>
      )}
      {hat === "wizard" && <polygon points="0,-68 -6,-40 6,-40" fill="#7c3aed" />}
      {hat === "crown" && (
        <path d="M -6,-40 L -6,-48 L -3,-44 L 0,-51 L 3,-44 L 6,-48 L 6,-40 Z" fill="#fbbf24" />
      )}
      {/* Head */}
      <circle cx={0} cy={-30} r={9} stroke={BODY_COLOR} strokeWidth={2} fill={faceColor} />
      {/* Face features */}
      {face === "happy" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={fc} />
          <circle cx={3} cy={-32} r={1} fill={fc} />
          <path d="M -3.5 -27 Q 0 -23.5 3.5 -27" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "bigsmile" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={fc} />
          <circle cx={3} cy={-32} r={1} fill={fc} />
          <path d="M -4.5 -26.5 Q 0 -21.5 4.5 -26.5" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "smirk" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={fc} />
          <path d="M 1.5 -32 Q 3 -31 4.5 -32" stroke={fc} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -1 -27 Q 1.5 -24.5 3.5 -26" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "beard" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={fc} />
          <circle cx={3} cy={-32} r={1} fill={fc} />
          <path d="M -2.5 -26 Q 0 -24 2.5 -26" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <path d="M -3.5 -23 Q 0 -21 3.5 -23" stroke={fc} strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M -6,-22 Q -7,-14 0,-12 Q 7,-14 6,-22 Z" fill={fc} opacity={0.75} />
        </>
      )}
      {face === "lashes" && (
        <>
          <circle cx={-3} cy={-31.5} r={1.1} fill={fc} />
          <line x1={-5} y1={-32.5} x2={-6} y2={-35.5} stroke={fc} strokeWidth={1.1} strokeLinecap="round" />
          <line x1={-3} y1={-33} x2={-3} y2={-36} stroke={fc} strokeWidth={1.1} strokeLinecap="round" />
          <line x1={-1} y1={-32.5} x2={-0.2} y2={-35.5} stroke={fc} strokeWidth={1.1} strokeLinecap="round" />
          <circle cx={3} cy={-31.5} r={1.1} fill={fc} />
          <line x1={1} y1={-32.5} x2={0.2} y2={-35.5} stroke={fc} strokeWidth={1.1} strokeLinecap="round" />
          <line x1={3} y1={-33} x2={3} y2={-36} stroke={fc} strokeWidth={1.1} strokeLinecap="round" />
          <line x1={5} y1={-32.5} x2={6} y2={-35.5} stroke={fc} strokeWidth={1.1} strokeLinecap="round" />
          <path d="M -3.5 -27 Q 0 -23.5 3.5 -27" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {face === "glam" && (
        <>
          <circle cx={-6.5} cy={-26} r={2.5} fill="#f472b6" opacity={0.45} />
          <circle cx={6.5} cy={-26} r={2.5} fill="#f472b6" opacity={0.45} />
          <circle cx={-3} cy={-31.5} r={1.3} fill={fc} />
          <line x1={-5.5} y1={-32.5} x2={-7} y2={-35.5} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-4} y1={-33} x2={-4.5} y2={-36.5} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-2.5} y1={-33} x2={-2.5} y2={-36.5} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-1} y1={-32.5} x2={-0.3} y2={-35.5} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <circle cx={3} cy={-31.5} r={1.3} fill={fc} />
          <line x1={1} y1={-32.5} x2={0.3} y2={-35.5} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={2.5} y1={-33} x2={2.5} y2={-36.5} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={4} y1={-33} x2={4.5} y2={-36.5} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={5.5} y1={-32.5} x2={7} y2={-35.5} stroke={fc} strokeWidth={1.2} strokeLinecap="round" />
          <path d="M -3.5 -26.5 Q -1.5 -24.5 0 -25.5 Q 1.5 -24.5 3.5 -26.5" stroke={fc} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -3.5 -26.5 Q 0 -23 3.5 -26.5" stroke={fc} strokeWidth={1.5} fill={fc} fillOpacity={0.5} strokeLinecap="round" />
        </>
      )}
      {face === "shocked" && <circle cx={0} cy={-26} r={2.2} stroke={fc} strokeWidth={1.5} fill="none" />}
      {face === "cool" && (
        <>
          <rect x={-5} y={-32} width={3.5} height={2.5} rx={0.5} fill="#1e293b" stroke={fc} strokeWidth={1} />
          <rect x={1.5} y={-32} width={3.5} height={2.5} rx={0.5} fill="#1e293b" stroke={fc} strokeWidth={1} />
          <line x1={-1.5} y1={-30.8} x2={1.5} y2={-30.8} stroke={fc} strokeWidth={1} />
        </>
      )}
      {face === "goofy" && (
        <>
          <circle cx={-3} cy={-32} r={1} fill={fc} />
          <path d="M -3.5 -27 Q -1.5 -25 0 -27 Q 1.5 -29 3.5 -27" stroke={fc} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      )}
      {/* Body */}
      <line x1={0} y1={-21} x2={0} y2={10} stroke={BODY_COLOR} strokeWidth={2} />
      <line x1={-13} y1={-5} x2={13} y2={-5} stroke={BODY_COLOR} strokeWidth={2} />
      <line x1={0} y1={10} x2={-10} y2={32} stroke={BODY_COLOR} strokeWidth={2} />
      <line x1={0} y1={10} x2={10} y2={32} stroke={BODY_COLOR} strokeWidth={2} />
      {/* Shirt — over body lines */}
      {shirt === "sweater" && (
        <>
          <rect x={-7} y={-18} width={14} height={24} rx={2} fill="#7c3aed" />
          <line x1={-2.5} y1={-13} x2={-2.5} y2={4} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
          <line x1={2.5} y1={-13} x2={2.5} y2={4} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
        </>
      )}
      {shirt === "stripes" && (
        <>
          <rect x={-7} y={-18} width={14} height={24} fill="#f8fafc" />
          <rect x={-7} y={-18} width={14} height={4} fill="#ef4444" />
          <rect x={-7} y={-9} width={14} height={4} fill="#ef4444" />
          <rect x={-7} y={0} width={14} height={6} fill="#ef4444" />
        </>
      )}
      {shirt === "hoodie" && (
        <>
          <rect x={-7} y={-18} width={14} height={24} rx={1} fill="#0d9488" />
          <rect x={-4} y={-4} width={8} height={6} rx={1} fill="#0f766e" />
        </>
      )}
      {shirt === "tuxedo" && (
        <>
          <rect x={-7} y={-18} width={14} height={24} fill="#1e293b" />
          <polygon points="0,-18 -6,-11 -6,-18" fill="#f8fafc" />
          <polygon points="0,-18 6,-11 6,-18" fill="#f8fafc" />
          <polygon points="-2.5,-16 0,-14 -2.5,-12" fill="#ef4444" />
          <polygon points="2.5,-16 0,-14 2.5,-12" fill="#ef4444" />
        </>
      )}
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
          <TinyFigure face={manager.face} hat={manager.hat} faceColor={manager.color} shirt={manager.shirt} />
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
