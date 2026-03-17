export const FACES = [
  { id: "neutral", label: "Neutral", emoji: "😐" },
  { id: "happy",   label: "Happy",   emoji: "😊" },
  { id: "angry",   label: "Angry",   emoji: "😤" },
  { id: "shocked", label: "Shocked", emoji: "😮" },
  { id: "cool",    label: "Cool",    emoji: "😎" },
  { id: "goofy",   label: "Goofy",   emoji: "😜" },
] as const;

export const HATS = [
  { id: "none",   label: "No Hat",  emoji: "🚫" },
  { id: "tophat", label: "Top Hat", emoji: "🎩" },
  { id: "party",  label: "Party",   emoji: "🎉" },
  { id: "cowboy", label: "Cowboy",  emoji: "🤠" },
  { id: "wizard", label: "Wizard",  emoji: "🧙" },
  { id: "crown",  label: "Crown",   emoji: "👑" },
] as const;

export const COLORS = [
  { id: "#e2e8f0", label: "Ghost"  },
  { id: "#ef4444", label: "Red"    },
  { id: "#60a5fa", label: "Blue"   },
  { id: "#4ade80", label: "Green"  },
  { id: "#fb923c", label: "Orange" },
  { id: "#c084fc", label: "Purple" },
  { id: "#f472b6", label: "Pink"   },
  { id: "#facc15", label: "Yellow" },
] as const;

export type FaceId = typeof FACES[number]["id"];
export type HatId = typeof HATS[number]["id"];
export type ColorId = typeof COLORS[number]["id"];

export const DEFAULT_FACE: FaceId = "neutral";
export const DEFAULT_HAT: HatId = "none";
export const DEFAULT_COLOR: ColorId = "#e2e8f0";
