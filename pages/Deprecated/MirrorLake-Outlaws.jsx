import React from "react";
// If you wired the loader/hooks I shared earlier:
import { useBestiary } from "../hooks/useBestiary"; // or adjust path

// page wrapper
<div className="pt-12"> {/* ~156px */}
  {/* page content */}
</div>


export default function MirrorLake() {
  const { data, loading, error } = useBestiary(); // comment this line & provide your own entries if needed

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="animate-pulse text-sm text-white/70">Loading Bestiary…</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mx-auto max-w-5xl p-6 text-rose-300">
        Error loading Bestiary: {error}
      </div>
    );
  }
  if (!data) return null;

  const entries = data.mirrorLakeBestiary; // or replace with your own array

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
          Mirror Lake — Outlaw Wall
        </h1>
        <p className="text-sm text-white/70 mt-1">
          Choose your quarry. Posters update as your ledger grows.
        </p>
      </header>

       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <article
  key={entry.id}
  className="mx-auto w-full max-w-[360px] rounded-2xl border border-ink/10 bg-parchment/5 p-3 shadow-paper"
>
  <img
    src={`/assets/wanted/wanted_${entry.id}.png`}
    alt={`${entry.name} Wanted Poster`}
    className="w-full h-auto object-contain rounded"
    loading="lazy"
  />

  <h3 className="mt-2 text-base font-semibold text-ink">
    {entry.name} <span className="text-ink/70">— {entry.alias}</span>
  </h3>

  <ul className="mt-1 space-y-0.5 text-sm text-ink/80">
    <li><span className="text-ink/60">Reward:</span> {entry.reward}</li>
    <li><span className="text-ink/60">Last Seen:</span> {entry.last_seen}</li>
    <li><span className="text-ink/60">Notes:</span> {entry.capture_notes}</li>
  </ul>
</article>

        ))}
      </div>
    </div>
  );
}
