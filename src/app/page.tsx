"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { AnimationPhase } from "@/lib/types";
import BigRedButton from "@/components/BigRedButton";
import HatchAnimation from "@/components/HatchAnimation";
import ConfettiBlast from "@/components/ConfettiBlast";
import SelectionHistory from "@/components/SelectionHistory";

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

interface SelectionResult {
  winner: Manager;
  funnyMessage: string;
  allManagers: Manager[];
}

const ELIMINATION_DELAY = 500;
const TRAP_DOOR_DELAY = 400;
const WALK_TO_HATCH = 900;
const FALL_DELAY = 900;
const SEATED_DELAY = 500;

export default function HomePage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [winner, setWinner] = useState<Manager | null>(null);
  const [funnyMessage, setFunnyMessage] = useState("");
  const [eliminatedIds, setEliminatedIds] = useState<number[]>([]);
  const [historyKey, setHistoryKey] = useState(0);
  const [pausedIds, setPausedIds] = useState<Set<number>>(new Set());
  const [pauseMenuOpen, setPauseMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/managers")
      .then((r) => r.json())
      .then(setManagers);
  }, []);

  function togglePause(id: number) {
    setPausedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const eligibleManagers = managers.filter((m) => !pausedIds.has(m.id));

  const handlePick = useCallback(async () => {
    if (phase !== "idle" || eligibleManagers.length === 0) return;

    setPhase("picking");
    setWinner(null);
    setEliminatedIds([]);
    setFunnyMessage("");

    let result: SelectionResult;
    try {
      const res = await fetch("/api/selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ excludeIds: Array.from(pausedIds) }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error ?? "Pick failed");
        setPhase("idle");
        return;
      }
      result = await res.json();
    } catch {
      alert("Network error");
      setPhase("idle");
      return;
    }

    const { winner: w, funnyMessage: msg, allManagers } = result;
    setWinner(w);
    setFunnyMessage(msg);

    // Eliminate non-winners one by one in random order
    const nonWinners = allManagers
      .filter((m) => m.id !== w.id)
      .sort(() => Math.random() - 0.5);

    for (let i = 0; i < nonWinners.length; i++) {
      await new Promise((res) => setTimeout(res, ELIMINATION_DELAY));
      setEliminatedIds((prev) => [...prev, nonWinners[i].id]);
    }

    await new Promise((res) => setTimeout(res, TRAP_DOOR_DELAY));
    setPhase("walking");

    await new Promise((res) => setTimeout(res, WALK_TO_HATCH));
    setPhase("dropping");

    await new Promise((res) => setTimeout(res, FALL_DELAY));
    setPhase("seated");

    await new Promise((res) => setTimeout(res, SEATED_DELAY));
    setPhase("celebrating");

    const updated = await fetch("/api/managers").then((r) => r.json());
    setManagers(updated);
    setPausedIds(new Set());
    setPauseMenuOpen(false);
    setHistoryKey((k) => k + 1);
  }, [phase, eligibleManagers, pausedIds]);

  function handleReset() {
    setPhase("idle");
    setWinner(null);
    setEliminatedIds([]);
    setPausedIds(new Set());
  }

  // Spacebar shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        if (phase === "idle") handlePick();
        if (phase === "celebrating") handleReset();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, handlePick]);

  const isDisabled = phase !== "idle" && phase !== "celebrating";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-bangers text-5xl tracking-wider text-red-500">
          🎭 Release Roulette 🎭
        </h1>
        <p className="mt-2 text-zinc-400">
          Your Fate Awaits
        </p>
      </div>

      {managers.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-400">
            No team members yet.{" "}
            <a href="/managers" className="text-red-400 underline hover:text-red-300">
              Add some on the Team page
            </a>{" "}
            to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Skip-this-pick toggles — only shown when idle */}
          {phase === "idle" && managers.length > 1 && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
              <button
                onClick={() => setPauseMenuOpen((o) => !o)}
                className="flex w-full items-center justify-between px-3 py-2 text-left"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Skip from this pick</span>
                  {pausedIds.size > 0 && (
                    <span className="rounded-full bg-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
                      {pausedIds.size} skipped
                    </span>
                  )}
                </span>
                <span className="text-xs text-zinc-500 transition-transform duration-200" style={{ display: "inline-block", transform: pauseMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  ▾
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: pauseMenuOpen ? "auto" : 0, opacity: pauseMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-3 pb-3">
                  <div className="flex flex-wrap gap-2">
                    {managers.map((m) => {
                      const paused = pausedIds.has(m.id);
                      return (
                        <button
                          key={m.id}
                          onClick={() => togglePause(m.id)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            paused
                              ? "bg-zinc-700 text-zinc-400 line-through"
                              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                          }`}
                        >
                          {m.name}
                        </button>
                      );
                    })}
                  </div>
                  {pausedIds.size > 0 && eligibleManagers.length === 0 && (
                    <p className="mt-2 text-xs text-red-400">
                      At least one member must be eligible.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          <HatchAnimation
            phase={phase}
            managers={eligibleManagers}
            winner={winner}
            eliminatedIds={eliminatedIds}
            funnyMessage={funnyMessage}
          />

          <div className="flex flex-col items-center gap-2">
            <BigRedButton
              onClick={phase === "celebrating" ? handleReset : handlePick}
              disabled={isDisabled || (phase === "idle" && eligibleManagers.length === 0)}
            />
            {phase === "celebrating" && (
              <p className="text-xs text-zinc-600">Press Space or click to reset</p>
            )}
          </div>
        </>
      )}

      {phase === "celebrating" && <ConfettiBlast key={historyKey} />}

      <div className="mt-10">
        <h2 className="mb-3 font-bangers text-2xl tracking-wide text-zinc-300">
          📜 Pick History
        </h2>
        <SelectionHistory key={historyKey} />
      </div>
    </div>
  );
}
