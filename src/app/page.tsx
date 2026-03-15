"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import type { AnimationPhase } from "@/lib/types";
import BigRedButton from "@/components/BigRedButton";
import HatchAnimation from "@/components/HatchAnimation";
import FunnyMessage from "@/components/FunnyMessage";
import ConfettiBlast from "@/components/ConfettiBlast";
import SelectionHistory from "@/components/SelectionHistory";

interface Manager {
  id: number;
  name: string;
  last_picked: string | null;
  pick_count: number;
}

interface SelectionResult {
  winner: Manager;
  funnyMessage: string;
  allManagers: Manager[];
}

const ELIMINATION_DELAY = 500;
const TRAP_DOOR_DELAY = 600;
const FALL_DELAY = 900;
const SEATED_DELAY = 500;

export default function HomePage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [winner, setWinner] = useState<Manager | null>(null);
  const [funnyMessage, setFunnyMessage] = useState("");
  const [eliminatedIds, setEliminatedIds] = useState<number[]>([]);
  const [historyKey, setHistoryKey] = useState(0);

  useEffect(() => {
    fetch("/api/managers")
      .then((r) => r.json())
      .then(setManagers);
  }, []);

  const handlePick = useCallback(async () => {
    if (phase !== "idle" || managers.length === 0) return;

    setPhase("picking");
    setWinner(null);
    setEliminatedIds([]);
    setFunnyMessage("");

    let result: SelectionResult;
    try {
      const res = await fetch("/api/selection", { method: "POST" });
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
    setPhase("dropping");

    await new Promise((res) => setTimeout(res, FALL_DELAY));
    setPhase("seated");

    await new Promise((res) => setTimeout(res, SEATED_DELAY));
    setPhase("celebrating");

    const updated = await fetch("/api/managers").then((r) => r.json());
    setManagers(updated);
    setHistoryKey((k) => k + 1);
  }, [phase, managers]);

  // Spacebar shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        if (phase === "idle") handlePick();
        if (phase === "celebrating") {
          setPhase("idle");
          setWinner(null);
          setEliminatedIds([]);
        }
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
          Who will manage this week&apos;s release? The algorithm decides.
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
          <HatchAnimation
            phase={phase}
            managers={managers}
            winner={winner}
            eliminatedIds={eliminatedIds}
          />

          <div className="flex flex-col items-center gap-2">
            <BigRedButton
              onClick={
                phase === "celebrating"
                  ? () => {
                      setPhase("idle");
                      setWinner(null);
                      setEliminatedIds([]);
                    }
                  : handlePick
              }
              disabled={isDisabled}
            />
            {phase === "celebrating" && (
              <p className="text-xs text-zinc-600">Press Space or click to reset</p>
            )}
          </div>
        </>
      )}

      <AnimatePresence>
        {(phase === "celebrating" || phase === "seated") && winner && (
          <FunnyMessage
            key={winner.id + funnyMessage}
            message={funnyMessage}
            winnerName={winner.name}
          />
        )}
      </AnimatePresence>

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
