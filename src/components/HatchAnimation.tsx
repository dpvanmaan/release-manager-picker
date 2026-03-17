"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { AnimationPhase } from "@/lib/types";

interface Manager {
  id: number;
  name: string;
  face?: string;
  hat?: string;
  color?: string;
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

function FaceExpression({ face, color }: { face: string; color: string }) {
  // All coords relative to head center at (0, -30), r=10
  switch (face) {
    case "happy":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <circle cx={3.5} cy={-32} r={1.2} fill={color} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "bigsmile":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <circle cx={3.5} cy={-32} r={1.2} fill={color} />
          <path d="M -5 -26.5 Q 0 -21 5 -26.5" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "smirk":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          {/* Half-closed right eye */}
          <path d="M 2 -32 Q 3.5 -31 5 -32" stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          {/* One-sided smirk */}
          <path d="M -1 -27 Q 2 -24.5 4 -26" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "beard":
      return (
        <>
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          <circle cx={3.5} cy={-32} r={1.2} fill={color} />
          <path d="M -3 -26 Q 0 -24 3 -26" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          {/* Mustache */}
          <path d="M -4 -23 Q 0 -21 4 -23" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
          {/* Beard fill */}
          <path d="M -7,-22 Q -8,-14 0,-12 Q 8,-14 7,-22 Z" fill={color} opacity={0.75} />
        </>
      );
    case "lashes":
      return (
        <>
          {/* Left eye with lashes */}
          <circle cx={-3.5} cy={-31.5} r={1.3} fill={color} />
          <line x1={-5.5} y1={-33} x2={-6.5} y2={-36} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-3.5} y1={-33.5} x2={-3.5} y2={-37} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={-1.5} y1={-33} x2={-0.5} y2={-36} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          {/* Right eye with lashes */}
          <circle cx={3.5} cy={-31.5} r={1.3} fill={color} />
          <line x1={1.5} y1={-33} x2={0.5} y2={-36} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={3.5} y1={-33.5} x2={3.5} y2={-37} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          <line x1={5.5} y1={-33} x2={6.5} y2={-36} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
          {/* Smile */}
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "glam":
      return (
        <>
          {/* Rosy cheeks */}
          <circle cx={-7} cy={-26} r={3} fill="#f472b6" opacity={0.35} />
          <circle cx={7} cy={-26} r={3} fill="#f472b6" opacity={0.35} />
          {/* Left eye with dramatic lashes */}
          <circle cx={-3.5} cy={-31.5} r={1.5} fill={color} />
          <line x1={-6} y1={-32.5} x2={-7.5} y2={-36} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-4.5} y1={-33.5} x2={-5} y2={-37.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-3} y1={-33.5} x2={-3} y2={-37.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={-1.5} y1={-33} x2={-0.5} y2={-36.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          {/* Right eye with dramatic lashes */}
          <circle cx={3.5} cy={-31.5} r={1.5} fill={color} />
          <line x1={1.5} y1={-33} x2={0.5} y2={-36.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={3} y1={-33.5} x2={3} y2={-37.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={4.5} y1={-33.5} x2={5} y2={-37.5} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          <line x1={6} y1={-32.5} x2={7.5} y2={-36} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
          {/* Bold lips */}
          <path d="M -4 -26.5 Q -2 -24.5 0 -25.5 Q 2 -24.5 4 -26.5" stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <path d="M -4 -26.5 Q 0 -23 4 -26.5" stroke={color} strokeWidth={1.5} fill={color} fillOpacity={0.5} strokeLinecap="round" />
        </>
      );
    case "shocked":
      return (
        <>
          <line x1={-5} y1={-35} x2={-2} y2={-32} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <line x1={2} y1={-32} x2={5} y2={-35} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <circle cx={0} cy={-26} r={2.5} stroke={color} strokeWidth={1.5} fill="none" />
        </>
      );
    case "cool":
      return (
        <>
          {/* Left lens */}
          <rect x={-5.5} y={-32} width={4} height={3} rx={0.5} fill="#1e293b" stroke={color} strokeWidth={1} />
          {/* Right lens */}
          <rect x={1.5} y={-32} width={4} height={3} rx={0.5} fill="#1e293b" stroke={color} strokeWidth={1} />
          {/* Bridge */}
          <line x1={-1.5} y1={-30.5} x2={1.5} y2={-30.5} stroke={color} strokeWidth={1} />
          {/* Side arms */}
          <line x1={-5.5} y1={-30.5} x2={-7} y2={-30.5} stroke={color} strokeWidth={1} />
          <line x1={5.5} y1={-30.5} x2={7} y2={-30.5} stroke={color} strokeWidth={1} />
          <path d="M -4 -27 Q 0 -23 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    case "goofy":
      return (
        <>
          {/* Normal left eye */}
          <circle cx={-3.5} cy={-32} r={1.2} fill={color} />
          {/* Winking right eye */}
          <path d="M 2 -32 Q 3.5 -33.5 5 -32" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          {/* Wavy mouth */}
          <path d="M -4 -27 Q -2 -25 0 -27 Q 2 -29 4 -27" stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        </>
      );
    default:
      return null;
  }
}

function HatDecoration({ hat, color }: { hat: string; color: string }) {
  // All coords relative to figure origin; head top is at y = -30 - 10 = -40
  switch (hat) {
    case "tophat":
      return (
        <>
          {/* Brim */}
          <rect x={-8} y={-44} width={16} height={3} rx={1} fill={color} />
          {/* Body */}
          <rect x={-5} y={-58} width={10} height={14} rx={1} fill={color} />
          {/* Band */}
          <rect x={-5} y={-46} width={10} height={2.5} fill="#27272a" />
        </>
      );
    case "party":
      return (
        <>
          {/* Cone */}
          <polygon points="0,-68 -8,-40 8,-40" fill="#ec4899" opacity={0.9} />
          {/* Stripes */}
          <line x1={-4} y1={-54} x2={4} y2={-54} stroke="#fbbf24" strokeWidth={1.5} opacity={0.8} />
          <line x1={-6} y1={-47} x2={6} y2={-47} stroke="#60a5fa" strokeWidth={1.5} opacity={0.8} />
          {/* Tip star */}
          <circle cx={0} cy={-68} r={2} fill="#fbbf24" />
          {/* Dots */}
          <circle cx={-3} cy={-50} r={1.5} fill="#fbbf24" />
          <circle cx={3} cy={-57} r={1.5} fill="#60a5fa" />
          <circle cx={0} cy={-44} r={1.5} fill="#a855f7" />
        </>
      );
    case "cowboy":
      return (
        <>
          {/* Dome */}
          <ellipse cx={0} cy={-49} rx={7} ry={6} fill="#d97706" />
          {/* Brim */}
          <ellipse cx={0} cy={-43} rx={12} ry={3} fill="#b45309" />
          {/* Band */}
          <rect x={-7} y={-46} width={14} height={2} fill="#92400e" />
        </>
      );
    case "wizard":
      return (
        <>
          {/* Cone */}
          <polygon points="0,-72 -7,-40 7,-40" fill="#7c3aed" />
          {/* Stars */}
          <circle cx={-2} cy={-55} r={1.5} fill="#fbbf24" />
          <circle cx={3} cy={-63} r={1.2} fill="#fbbf24" />
          <circle cx={-4} cy={-46} r={1} fill="#a78bfa" />
          {/* Brim */}
          <ellipse cx={0} cy={-40} rx={8} ry={2} fill="#6d28d9" />
          {/* Tip sparkle */}
          <circle cx={0} cy={-72} r={1.5} fill="#fbbf24" />
        </>
      );
    case "crown":
      return (
        <>
          <path
            d="M -7,-40 L -7,-50 L -3.5,-45 L 0,-53 L 3.5,-45 L 7,-50 L 7,-40 Z"
            fill="#fbbf24"
            stroke="#d97706"
            strokeWidth={1}
          />
          {/* Gems */}
          <circle cx={0} cy={-47} r={1.5} fill="#ef4444" />
          <circle cx={-4.5} cy={-43} r={1} fill="#60a5fa" />
          <circle cx={4.5} cy={-43} r={1} fill="#4ade80" />
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
  color = "#e2e8f0",
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
  color?: string;
}) {
  const baseY = FLOOR_Y - 50;

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
      <HatDecoration hat={hat} color={color} />
      {/* Head */}
      <circle cx={0} cy={-30} r={10} stroke={color} strokeWidth={2} fill="none" />
      {/* Face expression */}
      <FaceExpression face={face} color={color} />
      {/* Body */}
      <line x1={0} y1={-20} x2={0} y2={10} stroke={color} strokeWidth={2} />
      {/* Arms */}
      <line x1={-15} y1={-5} x2={15} y2={-5} stroke={color} strokeWidth={2} />
      {/* Left leg */}
      <line x1={0} y1={10} x2={-12} y2={35} stroke={color} strokeWidth={2} />
      {/* Right leg */}
      <line x1={0} y1={10} x2={12} y2={35} stroke={color} strokeWidth={2} />
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

        {/* Hatch opening (hole in the floor) */}
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
              color={m.color}
            />
          );
        })}

        {/* Hatch doors — pivot on top edge, swing open downward */}
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

      {/* Below-stage: manager chair area */}
      <div className="flex min-h-[80px] items-center justify-center bg-zinc-950/60 py-2">
        <AnimatePresence>
          {(phase === "seated" || phase === "celebrating") && winner && (
            <motion.div
              key="chair"
              initial={{ opacity: 0, scale: 0.5, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="text-4xl">🪑</div>
              <div className="font-bangers text-xl tracking-wide text-yellow-400">
                {winner.name}
              </div>
              <div className="text-xs text-zinc-500">Release Manager</div>
            </motion.div>
          )}
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-zinc-600 text-sm"
            >
              🪑 The chair awaits...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
