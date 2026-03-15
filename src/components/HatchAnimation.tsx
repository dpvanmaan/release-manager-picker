"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { AnimationPhase } from "@/lib/types";

interface Manager {
  id: number;
  name: string;
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

function StickFigure({
  name,
  x,
  isWinner,
  isPanicking,
  isEliminated,
  isFalling,
  isSeated,
}: {
  name: string;
  x: number;
  isWinner: boolean;
  isPanicking: boolean;
  isEliminated: boolean;
  isFalling: boolean;
  isSeated: boolean;
}) {
  const baseY = FLOOR_Y - 50;

  if (isSeated || isEliminated) return null;

  const hatchCenterX = HATCH_X + HATCH_W / 2;

  return (
    <motion.g
      initial={{ x, y: baseY, opacity: 1 }}
      animate={
        isFalling
          ? { x: hatchCenterX, y: STAGE_H + 60, rotate: 90, opacity: 0 }
          : isPanicking && isWinner
          ? {
              x: [x - 4, x + 4, x - 3, x + 3, x],
              y: baseY,
              transition: { repeat: Infinity, duration: 0.25 },
            }
          : isPanicking
          ? {
              x,
              y: [baseY, baseY - 3, baseY],
              transition: {
                repeat: Infinity,
                duration: 0.4,
                delay: Math.random() * 0.3,
              },
            }
          : { x, y: baseY }
      }
      transition={isFalling ? { duration: 0.7, ease: "easeIn" } : undefined}
    >
      {/* Head */}
      <circle cx={0} cy={-30} r={10} stroke="#e2e8f0" strokeWidth={2} fill="none" />
      {/* Body */}
      <line x1={0} y1={-20} x2={0} y2={10} stroke="#e2e8f0" strokeWidth={2} />
      {/* Arms */}
      <line x1={-15} y1={-5} x2={15} y2={-5} stroke="#e2e8f0" strokeWidth={2} />
      {/* Left leg */}
      <line x1={0} y1={10} x2={-12} y2={35} stroke="#e2e8f0" strokeWidth={2} />
      {/* Right leg */}
      <line x1={0} y1={10} x2={12} y2={35} stroke="#e2e8f0" strokeWidth={2} />
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

  const hatchOpen =
    phase === "dropping" || phase === "seated" || phase === "celebrating";

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

        {/* Hatch outline */}
        <rect
          x={HATCH_X}
          y={FLOOR_Y - 2}
          width={HATCH_W}
          height={6}
          fill="#18181b"
          stroke="#71717a"
          strokeWidth={1}
        />

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
              isWinner={isWinner}
              isPanicking={phase === "picking"}
              isEliminated={isEliminated}
              isFalling={isFalling}
              isSeated={isWinner && (phase === "seated" || phase === "celebrating")}
            />
          );
        })}

        {/* Hatch doors (3D split) */}
        <g style={{ perspective: 400 }}>
          <motion.rect
            x={HATCH_X}
            y={FLOOR_Y - 2}
            width={HATCH_W / 2}
            height={6}
            fill="#27272a"
            stroke="#52525b"
            strokeWidth={1}
            animate={hatchOpen ? { scaleX: 0 } : { scaleX: 1 }}
            style={{ transformOrigin: `${HATCH_X}px ${FLOOR_Y + 1}px` }}
            transition={{ duration: 0.4 }}
          />
          <motion.rect
            x={HATCH_X + HATCH_W / 2}
            y={FLOOR_Y - 2}
            width={HATCH_W / 2}
            height={6}
            fill="#27272a"
            stroke="#52525b"
            strokeWidth={1}
            animate={hatchOpen ? { scaleX: 0 } : { scaleX: 1 }}
            style={{
              transformOrigin: `${HATCH_X + HATCH_W}px ${FLOOR_Y + 1}px`,
            }}
            transition={{ duration: 0.4 }}
          />
        </g>
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
