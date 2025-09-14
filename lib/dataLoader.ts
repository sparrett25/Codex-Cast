import { BestiaryIndex, CatchLedger, parseBestiary, parseCatchLedger } from "./schemas";

async function fetchJson<T = unknown>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${path} (${res.status})`);
  return (await res.json()) as T;
}

export async function loadBestiary(): Promise<BestiaryIndex> {
  const raw = await fetchJson("/data/bestiary.json");
  return parseBestiary(raw);
}

export async function loadCatchLedger(): Promise<CatchLedger> {
  const raw = await fetchJson("/data/catch_ledger.json");
  return parseCatchLedger(raw);
}
