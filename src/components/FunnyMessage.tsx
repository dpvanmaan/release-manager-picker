"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
  message: string;
  winnerName: string;
}

export default function FunnyMessage({ message, winnerName }: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(message.slice(0, i));
      if (i >= message.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-6 rounded-xl border border-yellow-500/30 bg-yellow-950/40 px-6 py-4 text-center"
    >
      <div className="mb-2 font-bangers text-3xl text-yellow-400">
        🏆 {winnerName}
      </div>
      <p className="text-sm text-yellow-200/80">{displayed}</p>
    </motion.div>
  );
}
