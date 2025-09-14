// /pages/PlanTrip.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { say } from "../data/say";
import { v4 as uuid } from "uuid";
import { saveTrips, getTrips, formatWindow } from "../utils/trips";
import { SPECIES } from "../data/species";     // ids/titles/icons
import { LOCATIONS } from "../data/locations"; // ids/titles/icons
import "../styles/pages/tripplanner.css"; // << add this import
import CastBackground from "../components/CastBackground"; // adjust path if needed

function todayLocalISO(datetime = true) {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return datetime ? `${y}-${m}-${dd}T${hh}:${mm}` : `${y}-${m}-${dd}`;
}

export default function PlanTrip() {
  const nav = useNavigate();

  // --- form state
  const [dateTime, setDateTime] = useState(todayLocalISO()); // local yyyy-mm-ddThh:mm
  const [hours, setHours] = useState(4);
  const [water, setWater] = useState("");
  const [pinId, setPinId] = useState("");
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [intent, setIntent] = useState("");

  // time-of-day chips helper
  const presets = [
    { key: "dawn",      label: "Dawn",      hour: 6 },
    { key: "morning",   label: "Morning",   hour: 8 },
    { key: "afternoon", label: "Afternoon", hour: 13 },
    { key: "dusk",      label: "Dusk",      hour: 18 },
    { key: "night",     label: "Night",     hour: 21 },
  ];
  const applyPreset = (p) => {
    const base = todayLocalISO(false);
    const pad = (n) => String(n).padStart(2, "0");
    setDateTime(`${base}T${pad(p.hour)}:00`);
  };

  // quick chips from your data files
  const speciesChips = SPECIES.slice(0, 6);
  const locationOptions = useMemo(
    () => [{ id: "", title: "— (optional)" }, ...LOCATIONS],
    []
  );

  const createTrip = () => {
    const id = `trip_${uuid()}`;
    const newTrip = {
      id,
      when: new Date(dateTime).toISOString(),
      durationHours: Number(hours),
      water,
      pinId: pinId || null,
      target: { primary: primary || null, secondary: secondary || null },
      intent,
      notes: "",
      status: "planned",
    };
    const all = [newTrip, ...getTrips()];
    saveTrips(all);
    return newTrip;
  };

  const continueChooseSpecies = () => {
    const t = createTrip();
    nav(`/species?plan=${encodeURIComponent(t.id)}`); // or your Choose Species route
  };

  const saveToSummary = () => {
    const t = createTrip();
    nav(`/trip-summary?id=${encodeURIComponent(t.id)}`);
  };

  // live preview object (without saving)
  const previewTrip = useMemo(
    () => ({
      id: "preview",
      when: new Date(dateTime).toISOString(),
      durationHours: Number(hours),
      water, pinId,
      target: { primary, secondary },
      intent,
    }),
    [dateTime, hours, water, pinId, primary, secondary, intent]
  );

  const windowText = useMemo(() => {
    try { return formatWindow(previewTrip); } catch { return ""; }
  }, [previewTrip]);

  return (
  <CastBackground chamberKey="plan-trip">
    <ChamberLayout
      title="Plan Trip"
      sub="Pick a time, place, and the voice you’ll listen for."
      papa={<PapaMini line={say("chamber.plan")} />}
    >
      <div className="plan-grid page-offset-top">
        {/* LEFT: form */}
        <div className="plan-main">
          {/* Date & time */}
          <div className="plan-card">
            <div className="card-head">Date & Time</div>
            <div className="field two">
              <label>
                <span>Start</span>
                <input
                  className="input"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </label>
              <label>
                <span>Window (hrs)</span>
                <select
                  className="input"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                >
                  {[2,3,4,5,6,8,10,12].map(h=>(
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="seg">
              {presets.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className="chip"
                  onClick={() => applyPreset(p)}
                  aria-label={`Set ${p.label} start`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Water / place */}
          <div className="plan-card">
            <div className="card-head">Water</div>
            <label className="field">
              <span>Place</span>
              <input
                className="input"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                placeholder="Alafia River"
              />
            </label>
            <label className="field">
              <span>Map pin (optional)</span>
              <select
                className="input"
                value={pinId}
                onChange={(e) => setPinId(e.target.value)}
              >
                {locationOptions.map((l) => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Target species */}
          <div className="plan-card">
            <div className="card-head">Target Species</div>
            <label className="field">
              <span>Primary</span>
              <input
                className="input"
                value={primary}
                onChange={(e) => setPrimary(e.target.value)}
                placeholder="largemouth_bass"
              />
            </label>
            <label className="field">
              <span>Secondary (optional)</span>
              <input
                className="input"
                value={secondary}
                onChange={(e) => setSecondary(e.target.value)}
                placeholder="bluegill"
              />
            </label>

            <div className="chips-wrap">
              {speciesChips.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`chip ${primary === s.id ? "chip--active" : ""}`}
                  onClick={() => setPrimary(s.id)}
                >
                  <span className="mr-1" aria-hidden>{s.icon || "🐟"}</span>
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Intention */}
          <div className="plan-card">
            <div className="card-head">Intention</div>
            <input
              className="input"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Practice quiet casts along shaded edges."
            />
            <div className="hint">Keep it simple; this becomes your Mirror Lake mantra.</div>
          </div>

          <div className="actions">
            <button className="btn-primary" onClick={continueChooseSpecies}>
              Continue → Choose Species
            </button>
            <button className="btn-ghost" onClick={saveToSummary}>
              Save & View Summary
            </button>
          </div>
        </div>

        {/* RIGHT: preview */}
        <aside className="plan-aside">
          <div className="plan-card">
            <div className="card-head">Preview</div>
            <ul className="preview">
              <li><strong>When:</strong> {windowText || "—"}</li>
              <li><strong>Place:</strong> {water || "—"}{pinId ? `  ·  pin: ${pinId}` : ""}</li>
              <li><strong>Target:</strong> {primary || "—"}{secondary ? `, ${secondary}` : ""}</li>
              <li><strong>Intent:</strong> {intent || "—"}</li>
            </ul>
          </div>

          
        </aside>
      </div>
    </ChamberLayout>
	 </CastBackground>
  );
}
