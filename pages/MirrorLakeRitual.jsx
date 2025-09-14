import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { say } from "../data/say";
import { getTrip, upsertTripFields } from "../utils/trips";
import "../styles/pages/mirrorlake-ritual.css";

const INTENT_CHIPS = [
  "Practice patience",
  "Quiet casts along edges",
  "Read wind & line",
  "Observe before moving",
  "Slow down retrieve"
];

const RESO_LABEL = {
  1: "Scattered",
  2: "Warming",
  3: "Centered-ish",
  4: "Aligned",
  5: "Humming"
};

export default function MirrorLakeRitual(){
  const [params] = useSearchParams();
  const id = params.get("id");
  const nav = useNavigate();

  const trip = useMemo(()=> getTrip(id), [id]);
  const [intent, setIntent] = useState(trip?.intent || "");
  const [resonance, setResonance] = useState(3);

  const [running, setRunning] = useState(false);
  const [left, setLeft] = useState(60);

  useEffect(() => {
    if (!running) return;
    if (left <= 0) { setRunning(false); return; }
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [running, left]);

  if (!trip) {
    return (
      <ChamberLayout
        title="Mirror Lake"
        sub="Center, name your intention, and align."
        papa={<PapaMini line={say("chamber.mirror")} />}
      >
        <div className="text-white/70">No active trip found.</div>
      </ChamberLayout>
    );
  }

  const save = (next) => {
    const updated = upsertTripFields(trip.id, {
      intentFinal: intent || trip.intent || "",
      resonancePre: Number(resonance),
      centeredAt: new Date().toISOString(),
      status: "planned"
    });
    if (next === "summary") nav(`/trip-summary?id=${encodeURIComponent(updated.id)}`);
    if (next === "journal")  nav(`/journal?id=${encodeURIComponent(updated.id)}`);
  };

  return (
    <ChamberLayout
      title="Mirror Lake"
      sub="A brief ritual to arrive fully—then go fish."
      papa={<PapaMini line={say("chamber.mirror")} />}
    >
      <div className="ritual-grid page-offset-top">
        {/* Timer */}
        <div className="plan-card">
          <div className="card-head">Presence</div>

          <div className="ring-wrap">
            <div
              className={`ring ${running ? "is-running" : ""}`}
              style={{ background: `conic-gradient(var(--ring) ${(60-left)/60*360}deg, var(--ring-bg) 0deg)` }}
              aria-live="polite"
            >
              <div className="ring-core">
                <div className="ring-time">{left}s</div>
                <div className="ring-sub">breathe</div>
              </div>
            </div>
            <div className="ring-controls">
              {!running && left === 60 && (
                <button className="btn-primary" onClick={()=>{ setLeft(60); setRunning(true); }}>Begin 60s</button>
              )}
              {running && <button className="btn-ghost" onClick={()=>setRunning(false)}>Pause</button>}
              {!running && left < 60 && left > 0 && (
                <button className="btn-primary" onClick={()=>setRunning(true)}>Resume</button>
              )}
              {!running && left === 0 && (
                <div className="done">Centered. Nice.</div>
              )}
            </div>
          </div>
        </div>

        {/* Intention */}
        <div className="plan-card">
          <div className="card-head">Intention</div>
          <input
            className="input"
            value={intent}
            onChange={(e)=>setIntent(e.target.value)}
            placeholder={trip.intent || "Name your intent for this session…"}
          />
          <div className="chips-wrap mt-2">
            {INTENT_CHIPS.map(txt => (
              <button key={txt} className="chip" type="button" onClick={()=>setIntent(txt)}>
                {txt}
              </button>
            ))}
          </div>
          {intent && (
            <div className="mantra">“{intent}”</div>
          )}
        </div>

        {/* Resonance */}
        <div className="plan-card">
          <div className="card-head">Resonance</div>
          <input
            type="range"
            min="1" max="5"
            value={resonance}
            onChange={(e)=>setResonance(e.target.value)}
          />
          <div className="reso-label">
            Level <span>{resonance}</span> · <em>{RESO_LABEL[resonance]}</em>
          </div>
        </div>
      </div>

      <div className="actions flex gap-3">
        <button className="btn-primary" onClick={()=>save("summary")}>Save & Back to Summary</button>
        <button className="btn-primary" onClick={()=>save("journal")}>Save & Start Journal</button>
      </div>
    </ChamberLayout>
  );
}
