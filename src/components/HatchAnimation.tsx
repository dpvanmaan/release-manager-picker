"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { AnimationPhase } from "@/lib/types";
import { BODY_COLOR, getContrastColor } from "@/lib/customization";

interface Manager {
  id: number;
  name: string;
  face?: string;
  hat?: string;
  color?: string;
  shirt?: string;
}

interface Props {
  phase: AnimationPhase;
  managers: Manager[];
  winner: Manager | null;
  eliminatedIds: number[];
}

const STAGE_W = 560;
const STAGE_H = 220;
const FLOOR_Y = 170;
const HATCH_X = STAGE_W / 2 - 40;
const HATCH_W = 80;
const FIGURE_SPACING = 70;

function FaceExpression({ face, featureColor }: { face: string; featureColor: string }) {
  // All coords relative to head center at (0, -30), r=10
  switch (face) {
    case "happy":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={featureColor} />
          <circle cx={3.5} cy={-32} r={1.2} fill={featureColor} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "bigsmile":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={featureColor} />
          <circle cx={3.5} cy={-32} r={1.2} fill={featureColor} />
          <path d="M -5 -26.5 Q 0 -21 5 -26.5" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "smirk":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={featureColor} />
          <path d="M 2 -32 Q 3.5 -31 5 -32" stroke={featureColor} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -1 -27 Q 2 -24.5 4 -26" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "beard":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={featureColor} />
          <circle cx={3.5} cy={-32} r={1.2} fill={featureColor} />
          <path d="M -3 -26 Q 0 -24 3 -26" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <path d="M -4 -23 Q 0 -21 4 -23" stroke={featureColor} strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M -7,-22 Q -8,-14 0,-12 Q 8,-14 7,-22 Z" fill={featureColor} opacity={0.75} />
        </>
      );
    case "lashes":
      return (
        <>
          <circle cx={-3.5} cy={-31.5} r={1.3} fill={featureColor} />
          <line x1={-5.5} y1={-33} x2={-6.5} y2={-36} stroke={featureColor} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-3.5} y1={-33.5} x2={-3.5} y2={-37} stroke={featureColor} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-1.5} y1={-33} x2={-0.5} y2={-36} stroke={featureColor} strokeWidth={1.2} strokeLinecap="round" />
          <circle cx={3.5} cy={-31.5} r={1.3} fill={featureColor} />
          <line x1={1.5} y1={-33} x2={0.5} y2={-36} stroke={featureColor} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={3.5} y1={-33.5} x2={3.5} y2={-37} stroke={featureColor} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={5.5} y1={-33} x2={6.5} y2={-36} stroke={featureColor} strokeWidth={1.2} strokeLinecap="round" />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "glam":
      return (
        <>
          <circle cx={-7} cy={-26} r={3} fill="#f472b6" opacity={0.45} />
          <circle cx={7} cy={-26} r={3} fill="#f472b6" opacity={0.45} />
          <circle cx={-3.5} cy={-31.5} r={1.5} fill={featureColor} />
          <line x1={-6} y1={-32.5} x2={-7.5} y2={-36} stroke={featureColor} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-4.5} y1={-33.5} x2={-5} y2={-37.5} stroke={featureColor} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-3} y1={-33.5} x2={-3} y2={-37.5} stroke={featureColor} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-1.5} y1={-33} x2={-0.5} y2={-36.5} stroke={featureColor} strokeWidth={1.3} strokeLinecap="round" />
          <circle cx={3.5} cy={-31.5} r={1.5} fill={featureColor} />
          <line x1={1.5} y1={-33} x2={0.5} y2={-36.5} stroke={featureColor} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={3} y1={-33.5} x2={3} y2={-37.5} stroke={featureColor} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={4.5} y1={-33.5} x2={5} y2={-37.5} stroke={featureColor} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={6} y1={-32.5} x2={7.5} y2={-36} stroke={featureColor} strokeWidth={1.3} strokeLinecap="round" />
          <path d="M -4 -26.5 Q -2 -24.5 0 -25.5 Q 2 -24.5 4 -26.5" stroke={featureColor} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -4 -26.5 Q 0 -23 4 -26.5" stroke={featureColor} strokeWidth={1.5} fill={featureColor} fillOpacity={0.5} strokeLinecap="round" />
        </>
      );
    case "shocked":
      return (
        <>
          <line x1={-5} y1={-35} x2={-2} y2={-32} stroke={featureColor} strokeWidth={1.5} strokeLinecap="round" />
          <line x1={2} y1={-32} x2={5} y2={-35} stroke={featureColor} strokeWidth={1.5} strokeLinecap="round" />
          <circle cx={0} cy={-26} r={2.5} stroke={featureColor} strokeWidth={1.5} fill="none" />
        </>
      );
    case "cool":
      return (
        <>
          <rect x={-5.5} y={-32} width={4} height={3} rx={0.5} fill="#1e293b" stroke={featureColor} strokeWidth={1} />
          <rect x={1.5} y={-32} width={4} height={3} rx={0.5} fill="#1e293b" stroke={featureColor} strokeWidth={1} />
          <line x1={-1.5} y1={-30.5} x2={1.5} y2={-30.5} stroke={featureColor} strokeWidth={1} />
          <line x1={-5.5} y1={-30.5} x2={-7} y2={-30.5} stroke={featureColor} strokeWidth={1} />
          <line x1={5.5} y1={-30.5} x2={7} y2={-30.5} stroke={featureColor} strokeWidth={1} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "goofy":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={featureColor} />
          <path d="M 2 -32 Q 3.5 -33.5 5 -32" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <path d="M -4 -27 Q -2 -25 0 -27 Q 2 -29 4 -27" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "frown":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={featureColor} />
          <circle cx={3.5} cy={-32} r={1.2} fill={featureColor} />
          <path d="M -4 -23 Q 0 -27 4 -23" stroke={featureColor} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    default:
      return null;
  }
}

function HatDecoration({ hat, color }: { hat: string; color: string }) {
  switch (hat) {
    case "tophat":
      return (
        <>
          <rect x={-8} y={-44} width={16} height={3} rx={1} fill={color} />
          <rect x={-5} y={-58} width={10} height={14} rx={1} fill={color} />
          <rect x={-5} y={-46} width={10} height={2.5} fill="#27272a" />
        </>
      );
    case "party":
      return (
        <>
          <polygon points="0,-68 -8,-40 8,-40" fill="#ec4899" opacity={0.9} />
          <line x1={-4} y1={-54} x2={4} y2={-54} stroke="#fbbf24" strokeWidth={1.5} opacity={0.8} />
          <line x1={-6} y1={-47} x2={6} y2={-47} stroke="#60a5fa" strokeWidth={1.5} opacity={0.8} />
          <circle cx={0} cy={-68} r={2} fill="#fbbf24" />
          <circle cx={-3} cy={-50} r={1.5} fill="#fbbf24" />
          <circle cx={3} cy={-57} r={1.5} fill="#60a5fa" />
          <circle cx={0} cy={-44} r={1.5} fill="#a855f7" />
        </>
      );
    case "cowboy":
      return (
        <>
          <ellipse cx={0} cy={-49} rx={7} ry={6} fill="#d97706" />
          <ellipse cx={0} cy={-43} rx={12} ry={3} fill="#b45309" />
          <rect x={-7} y={-46} width={14} height={2} fill="#92400e" />
        </>
      );
    case "wizard":
      return (
        <>
          <polygon points="0,-72 -7,-40 7,-40" fill="#7c3aed" />
          <circle cx={-2} cy={-55} r={1.5} fill="#fbbf24" />
          <circle cx={3} cy={-63} r={1.2} fill="#fbbf24" />
          <circle cx={-4} cy={-46} r={1} fill="#a78bfa" />
          <ellipse cx={0} cy={-40} rx={8} ry={2} fill="#6d28d9" />
          <circle cx={0} cy={-72} r={1.5} fill="#fbbf24" />
        </>
      );
    case "crown":
      return (
        <>
          <path d="M -7,-40 L -7,-50 L -3.5,-45 L 0,-53 L 3.5,-45 L 7,-50 L 7,-40 Z" fill="#fbbf24" stroke="#d97706" strokeWidth={1} />
          <circle cx={0} cy={-47} r={1.5} fill="#ef4444" />
          <circle cx={-4.5} cy={-43} r={1} fill="#60a5fa" />
          <circle cx={4.5} cy={-43} r={1} fill="#4ade80" />
        </>
      );
    default:
      return null;
  }
}

function ShirtDecoration({ shirt }: { shirt: string }) {
  // Torso area: x=-8 to x=8, y=-18 to y=8. Renders before body line so lines appear on top.
  switch (shirt) {
    case "sweater":
      return (
        <>
          <rect x={-8} y={-18} width={16} height={26} rx={2} fill="#7c3aed" />
          {/* V-neck */}
          <path d="M -3,-18 L 0,-13 L 3,-18" stroke="#6d28d9" strokeWidth={1.5} fill="none" />
          {/* Cable lines */}
          <line x1={-3} y1={-14} x2={-3} y2={6} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
          <line x1={3} y1={-14} x2={3} y2={6} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
          {/* Rib bottom */}
          <line x1={-8} y1={4} x2={8} y2={4} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
          <line x1={-8} y1={7} x2={8} y2={7} stroke="#6d28d9" strokeWidth={1} opacity={0.7} />
        </>
      );
    case "stripes":
      return (
        <>
          <rect x={-8} y={-18} width={16} height={26} fill="#f8fafc" />
          <rect x={-8} y={-18} width={16} height={5} fill="#ef4444" />
          <rect x={-8} y={-8} width={16} height={5} fill="#ef4444" />
          <rect x={-8} y={2} width={16} height={6} fill="#ef4444" />
        </>
      );
    case "hoodie":
      return (
        <>
          <rect x={-8} y={-18} width={16} height={26} rx={1} fill="#0d9488" />
          {/* Hood fold */}
          <path d="M -5,-18 Q 0,-13 5,-18" stroke="#0f766e" strokeWidth={2} fill="#0f766e" fillOpacity={0.4} />
          {/* Kangaroo pocket */}
          <rect x={-5} y={-3} width={10} height={7} rx={1} fill="#0f766e" />
        </>
      );
    case "tuxedo":
      return (
        <>
          <rect x={-8} y={-18} width={16} height={26} fill="#1e293b" />
          {/* White lapels */}
          <polygon points="0,-18 -7,-10 -7,-18" fill="#f8fafc" />
          <polygon points="0,-18 7,-10 7,-18" fill="#f8fafc" />
          {/* Bow tie */}
          <polygon points="-3,-16 0,-14 -3,-12" fill="#ef4444" />
          <polygon points="3,-16 0,-14 3,-12" fill="#ef4444" />
        </>
      );
    default:
      return null;
  }
}

function StickFigure({
  name,
  x,
  index,
  isWinner,
  isPanicking,
  isEliminated,
  isFalling,
  isSeated,
  isWalkingToHatch,
  face = "neutral",
  hat = "none",
  faceColor = "#f8fafc",
  shirt = "none",
}: {
  name: string;
  x: number;
  index: number;
  isWinner: boolean;
  isPanicking: boolean;
  isEliminated: boolean;
  isFalling: boolean;
  isSeated: boolean;
  isWalkingToHatch: boolean;
  face?: string;
  hat?: string;
  faceColor?: string;
  shirt?: string;
}) {
  const baseY = FLOOR_Y - 50;
  const featureColor = getContrastColor(faceColor);

  if (isSeated || isEliminated) return null;

  const hatchCenterX = HATCH_X + HATCH_W / 2;

  return (
    <motion.g
      initial={{ x, y: baseY, opacity: 1 }}
      animate={
        isFalling
          ? { x: hatchCenterX, y: [baseY, baseY - 8, STAGE_H + 60], rotate: 90, opacity: 0 }
          : isWalkingToHatch
          ? { x: hatchCenterX, y: baseY }
          : isPanicking
          ? {
              x: [x - 20, x + 20],
              y: baseY,
              transition: {
                repeat: Infinity,
                repeatType: "mirror" as const,
                duration: isWinner ? 1.2 : 1.6 + index * 0.15,
                ease: "linear",
              },
            }
          : { x, y: baseY }
      }
      transition={
        isFalling
          ? { duration: 0.7, ease: "easeIn" }
          : isWalkingToHatch
          ? { duration: 0.6, ease: "easeInOut" }
          : undefined
      }
    >
      {/* Hat */}
      <HatDecoration hat={hat} color={faceColor} />
      {/* Head — filled with chosen face color, outlined in black */}
      <circle cx={0} cy={-30} r={10} stroke={BODY_COLOR} strokeWidth={2} fill={faceColor} />
      {/* Face expression — features contrast against face fill */}
      <FaceExpression face={face} featureColor={featureColor} />
      {/* Body */}
      <line x1={0} y1={-20} x2={0} y2={10} stroke={BODY_COLOR} strokeWidth={2} />
      {/* Arms */}
      <line x1={-15} y1={-5} x2={15} y2={-5} stroke={BODY_COLOR} strokeWidth={2} />
      {/* Left leg */}
      <line x1={0} y1={10} x2={-12} y2={35} stroke={BODY_COLOR} strokeWidth={2} />
      {/* Right leg */}
      <line x1={0} y1={10} x2={12} y2={35} stroke={BODY_COLOR} strokeWidth={2} />
      {/* Shirt — drawn over body lines */}
      <ShirtDecoration shirt={shirt} />
      {/* Name tag */}
      <text
        x={0}
        y={50}
        textAnchor="middle"
        fontSize={10}
        fill={isWinner ? "#fbbf24" : "#94a3b8"}
        fontFamily="monospace"
      >
        {name.split(" ")[0]}
      </text>
    </motion.g>
  );
}

export default function HatchAnimation({
  phase,
  managers,
  winner,
  eliminatedIds,
}: Props) {
  const count = managers.length;
  const totalWidth = Math.max(count * FIGURE_SPACING, STAGE_W);
  const startX = (totalWidth - (count - 1) * FIGURE_SPACING) / 2;

  const hatchOpen = phase === "walking" || phase === "dropping" || phase === "seated" || phase === "celebrating";

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
      {/* Stage spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(251,191,36,0.08),transparent)]" />

      <svg
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        className="w-full"
        style={{ minHeight: 180 }}
      >
        {/* Stage floor */}
        <rect x={0} y={FLOOR_Y} width={STAGE_W} height={4} fill="#3f3f46" />

        {/* Hatch opening */}
        <rect x={HATCH_X} y={FLOOR_Y} width={HATCH_W} height={4} fill="#09090b" />

        {/* Figures */}
        {managers.map((m, i) => {
          const x = startX + i * FIGURE_SPACING;
          const isWinner = winner?.id === m.id;
          const isEliminated = eliminatedIds.includes(m.id);
          const isFalling = isWinner && phase === "dropping";

          return (
            <StickFigure
              key={m.id}
              name={m.name}
              x={x}
              index={i}
              isWinner={isWinner}
              isPanicking={phase === "picking" || phase === "walking"}
              isEliminated={isEliminated}
              isFalling={isFalling}
              isSeated={isWinner && (phase === "seated" || phase === "celebrating")}
              isWalkingToHatch={isWinner && phase === "walking"}
              face={m.face}
              hat={m.hat}
              faceColor={m.color}
              shirt={m.shirt}
            />
          );
        })}

        {/* Hatch doors */}
        <motion.rect
          x={HATCH_X}
          y={FLOOR_Y - 2}
          width={HATCH_W / 2}
          height={20}
          fill="#27272a"
          stroke="#52525b"
          strokeWidth={1}
          animate={hatchOpen ? { scaleY: 0 } : { scaleY: 1 }}
          style={{ transformOrigin: `${HATCH_X}px ${FLOOR_Y - 2}px` }}
          transition={{ duration: 0.4 }}
        />
        <motion.rect
          x={HATCH_X + HATCH_W / 2}
          y={FLOOR_Y - 2}
          width={HATCH_W / 2}
          height={20}
          fill="#27272a"
          stroke="#52525b"
          strokeWidth={1}
          animate={hatchOpen ? { scaleY: 0 } : { scaleY: 1 }}
          style={{ transformOrigin: `${HATCH_X + HATCH_W / 2}px ${FLOOR_Y - 2}px` }}
          transition={{ duration: 0.4 }}
        />
      </svg>

      {/* Below-stage: fate area */}
      <div className="flex min-h-[80px] items-center justify-center bg-zinc-950/60 py-2">
        <AnimatePresence>
          {(phase === "seated" || phase === "celebrating") && winner && (
            <motion.div
              key="winner-figure"
              initial={{ opacity: 0, scale: 0.5, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-1"
            >
              <svg viewBox="-20 -80 40 100" width={60} height={90} aria-hidden>
                <HatDecoration hat={winner.hat ?? "none"} color={winner.color ?? "#f8fafc"} />
                <circle cx={0} cy={-30} r={10} stroke={BODY_COLOR} strokeWidth={2} fill={winner.color ?? "#f8fafc"} />
                <FaceExpression face="frown" featureColor={getContrastColor(winner.color ?? "#f8fafc")} />
                <line x1={0} y1={-20} x2={0} y2={10} stroke={BODY_COLOR} strokeWidth={2} />
                <line x1={-15} y1={-5} x2={15} y2={-5} stroke={BODY_COLOR} strokeWidth={2} />
                <line x1={0} y1={10} x2={-12} y2={35} stroke={BODY_COLOR} strokeWidth={2} />
                <line x1={0} y1={10} x2={12} y2={35} stroke={BODY_COLOR} strokeWidth={2} />
                <ShirtDecoration shirt={winner.shirt ?? "none"} />
              </svg>
              <div className="font-bangers text-xl tracking-wide text-yellow-400">
                {winner.name}
              </div>
            </motion.div>
          )}
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-zinc-600 text-sm"
            >
              Your Fate Awaits
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
