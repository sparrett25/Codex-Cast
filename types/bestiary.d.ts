// --- Bestiary (Wanted Posters) ---

/** Canonical IDs you’ll reference across the app */
export type SpeciesId =
  | "largemouth_bass"
  | "tilapia"
  | "catfish"
  | "redfish"
  | "snook";
// add more as you expand (e.g., "tarpon", "trout", ...)

/** Minimal descriptor for a fish outlaw in Mirror Lake */
export type BestiaryEntry = {
  id: SpeciesId;
  name: string;           // "Largemouth Bass"
  alias: string;          // "The Gaping Tyrant"
  poster: string;         // asset path, e.g. "wanted_bass.png"
  reward: string;         // quick gear/bait hint for the poster footer
  last_seen: string;      // short habitat/location string
  capture_notes: string;  // brief timing/tactic cue
  mythic_lore: string;    // 1–2 sentence lore/narration summary
};

/** Root container if you load a single JSON blob */
export type BestiaryIndex = {
  mirrorLakeBestiary: BestiaryEntry[];
};
