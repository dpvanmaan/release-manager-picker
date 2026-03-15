"use client";
import { motion } from "framer-motion";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export default function BigRedButton({ onClick, disabled }: Props) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      animate={
        disabled
          ? {}
          : {
              boxShadow: [
                "0 0 20px rgba(239,68,68,0.4)",
                "0 0 40px rgba(239,68,68,0.7)",
                "0 0 20px rgba(239,68,68,0.4)",
              ],
            }
      }
      transition={{ duration: 2, repeat: Infinity }}
      className="mt-8 rounded-full bg-red-600 px-10 py-5 font-bangers text-2xl tracking-widest text-white shadow-lg shadow-red-900/50 transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {disabled ? "CHOOSING..." : "🎲 SACRIFICE A COLLEAGUE"}
    </motion.button>
  );
}
