import { z } from "zod";

/* ---------- Shared ---------- */
export const SpeciesId = z.enum([
  "largemouth_bass",
  "tilapia",
  "catfish",
  "redfish",
  "snook",
  // add future IDs here (e.g., "tarpon", "speckled_trout")
]);
export type SpeciesId = z.infer<typeof SpeciesId>;

/* ---------- Bestiary (Wanted Posters) ---------- */
export const BestiaryEntry = z.object({
  id: SpeciesId,
  name: z.string().min(1),
  alias: z.string().min(1),
  poster: z.string().min(1),           // e.g., "wanted_bass.png"
  reward: z.string().min(1),
  last_seen: z.string().min(1),
  capture_notes: z.string().min(1),
  mythic_lore: z.string().min(1),
});
export type BestiaryEntry = z.infer<typeof BestiaryEntry>;

export const BestiaryIndex = z.object({
  mirrorLakeBestiary: z.array(BestiaryEntry).min(1),
});
export type BestiaryIndex = z.infer<typeof BestiaryIndex>;

/* ---------- Catch Ledger (Mugshots) ---------- */
export const Wind = z.object({
  dir: z.string().optional(),          // "SW"
  mph: z.number().optional(),          // 8
});

export const Conditions = z.object({
  tempF: z.number().optional().nullable(),
  wind: Wind.optional(),
  cloud: z.number().optional().nullable(),   // %
  pressureTrend: z.enum(["rising", "falling", "steady"]).nullable().optional(),
  moonPhase: z.string().nullable().optional(),
});

export const Location = z.object({
  name: z.string().min(1),
  lat: z.number().nullable().optional(),
  lon: z.number().nullable().optional(),
  water_type: z.enum(["freshwater", "saltwater", "brackish"]),
});

export const Tackle = z.object({
  rod: z.string().nullable().optional(),
  bait_or_lure: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  presentation: z.string().nullable().optional(),
});

export const Metrics = z.object({
  length_in: z.number().nullable().optional(),
  weight_lb: z.number().nullable().optional(),
  released: z.boolean().nullable().optional(),
});

export const Media = z.object({
  mugshot_url: z.string().nullable().optional(),
  photos: z.array(z.string()).default([]),
  video: z.string().nullable().optional(),
});

export const Unlocked = z.object({
  training_grounds: z.boolean().optional(),
  badges: z.array(z.string()).default([]),
});

export const CatchEntry = z.object({
  id: z.string().min(1),
  species_id: SpeciesId,
  species_name: z.string().min(1),
  alias: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),  // YYYY-MM-DD
  time: z.string().regex(/^\d{2}:\d{2}$/),        // HH:MM 24h
  location: Location,
  conditions: Conditions.optional(),
  tackle: Tackle.optional(),
  metrics: Metrics.optional(),
  notes: z.string().optional(),
  media: Media.optional(),
  unlocked: Unlocked.optional(),
  created_at: z.string(),   // ISO
  updated_at: z.string(),   // ISO
});
export type CatchEntry = z.infer<typeof CatchEntry>;

export const CatchLedger = z.object({
  catchLedger: z.array(CatchEntry),
});
export type CatchLedger = z.infer<typeof CatchLedger>;

/* ---------- Helpers ---------- */

// Parse a Bestiary JSON blob (throws on error):
export function parseBestiary(json: unknown): BestiaryIndex {
  return BestiaryIndex.parse(json);
}

// Parse a Catch Ledger JSON blob (throws on error):
export function parseCatchLedger(json: unknown): CatchLedger {
  return CatchLedger.parse(json);
}

// Safe parse (no throw) with detailed error, useful in UI:
export function safeParseBestiary(json: unknown) {
  const res = BestiaryIndex.safeParse(json);
  if (!res.success) {
    console.error("[Bestiary validation error]", res.error.format());
  }
  return res;
}

export function safeParseCatchLedger(json: unknown) {
  const res = CatchLedger.safeParse(json);
  if (!res.success) {
    console.error("[CatchLedger validation error]", res.error.format());
  }
  return res;
}

// Utility: build a default mugshot path from a catch entry
export function mugshotPathFor(c: Pick<CatchEntry, "species_id"|"date"|"time">) {
  const t = c.time.replace(":", "");
  return `mugshots/${c.species_id}_${c.date}_${t}.png`;
}
