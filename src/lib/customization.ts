export const FACES = [
  { id: "neutral",  label: "Neutral",   emoji: "😐" },
  { id: "happy",    label: "Happy",     emoji: "😊" },
  { id: "bigsmile", label: "Big Smile", emoji: "😁" },
  { id: "smirk",    label: "Smirk",     emoji: "😏" },
  { id: "shocked",  label: "Shocked",   emoji: "😮" },
  { id: "cool",     label: "Cool",      emoji: "😎" },
  { id: "goofy",    label: "Goofy",     emoji: "😜" },
  { id: "beard",    label: "Beard",     emoji: "🧔" },
  { id: "lashes",   label: "Lashes",    emoji: "💁" },
  { id: "glam",     label: "Glam",      emoji: "💄" },
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
  { id: "#f8fafc", label: "White"  },
  { id: "#fca5a5", label: "Blush"  },
  { id: "#6ee7b7", label: "Mint"   },
  { id: "#93c5fd", label: "Sky"    },
  { id: "#fde68a", label: "Lemon"  },
  { id: "#c4b5fd", label: "Lavender" },
  { id: "#f9a8d4", label: "Peach"  },
  { id: "#86efac", label: "Sage"   },
] as const;

export const SHIRTS = [
  { id: "none",    label: "None",    emoji: "—"  },
  { id: "sweater", label: "Sweater", emoji: "🧶" },
  { id: "stripes", label: "Stripes", emoji: "🎽" },
  { id: "hoodie",  label: "Hoodie",  emoji: "🏃" },
  { id: "tuxedo",  label: "Tuxedo",  emoji: "🤵" },
] as const;

export type FaceId  = typeof FACES[number]["id"];
export type HatId   = typeof HATS[number]["id"];
export type ColorId = typeof COLORS[number]["id"];
export type ShirtId = typeof SHIRTS[number]["id"];

export const DEFAULT_FACE:  FaceId  = "neutral";
export const DEFAULT_HAT:   HatId   = "none";
export const DEFAULT_COLOR: ColorId = "#f8fafc";
export const DEFAULT_SHIRT: ShirtId = "none";

/** Fixed stroke color for all body parts (head outline, torso, arms, legs). */
export const BODY_COLOR = "#94a3b8";

/** Returns a dark or light color that is legible on top of `hex`. */
export function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? "#0f172a" : "#f8fafc";
}
