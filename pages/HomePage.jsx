import { useMemo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";



const WHISPERS = [
  "Every cast is a story. What will yours be today?",
  "Still water remembers. Cast with presence.",
  "Read the wind, listen to the tide, trust your line.",
  "Begin in patience; the bite will find you.",
  "Let the lake teach you how to see."
];

// PortalCard.jsx (or inline component in HomePage)
function PortalCard({ emoji, title, desc, onClick, ...rest }) {
  return (
    <button className="portal-card" onClick={onClick} {...rest}>
      <div className="portal-header">
        <span className="portal-emoji">{emoji}</span>
        <h3>{title}</h3>
      </div>
      <p className="portal-desc">{desc}</p>
      <div className="portal-enter">Enter →</div>
    </button>
  );
}



export default function HomePage() {
  const nav = useNavigate();
const [compassHover, setCompassHover] = useState(false);
  // header whisper (one per visit)
  const headerWhisper = useMemo(
    () => WHISPERS[Math.floor(Math.random() * WHISPERS.length)],
    []
  );

  // footer whisper (rotate)
  const idxRef = useRef(0);
  const [footerWhisper, setFooterWhisper] = useState(
    WHISPERS[(idxRef.current + 1) % WHISPERS.length]
  );
  useEffect(() => {
    const id = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % WHISPERS.length;
      setFooterWhisper(WHISPERS[idxRef.current]);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  // TODO: swap stubs for real state
  const tripPlanned = false;
  const tripTitle = "Mirror Lake — Dawn Session";
  const hasOpenQuest = false;

  return (
    <CastBackground chamberKey="home">
      <ChamberLayout
        title="Home"
        sub="Your fishing companion, reflective journal, and guide to the waters."
        papa={<PapaMini line={headerWhisper} />}
      >
	  
	  // Add once near the area where the mug sits (inside ChamberLayout container)
<div className="coffee-steam" aria-hidden>
  <span className="wisp" />
  <span className="wisp delay" />
  <span className="wisp delay2" />
</div>
        <div className="home-container">
          {/* Primary grid */}
          <div className="ui-grid" style={{ maxWidth: 1200, width: "100%" }}>
            <PortalCard
              emoji="🗓️"
              title="Plan Trip"
              desc="Choose time, water, and intention."
              onClick={() => nav("/plan-trip")}
            />

            {tripPlanned && (
              <PortalCard
                emoji="📝"
                title="Trip Summary"
                desc={tripTitle || "Review today’s gear, bait & notes."}
                onClick={() => nav("/trip-summary")}
              />
            )}

            <PortalCard
              emoji="📜"
              title="Open Journal"
              desc="Reflect on past waters or begin today’s entry."
              onClick={() => nav("/journal")}
            />

            {hasOpenQuest && (
              <PortalCard
                emoji="🧭"
                title="Accept Quest"
                desc="A story thread is open by the water."
                onClick={() => nav("/quests")}
              />
            )}
          </div>

          {/* Secondary */}
          <h2 className="ui-section-title" style={{ marginTop: "1rem" }}>More</h2>
          <div className="ui-grid" style={{ maxWidth: 1200, width: "100%" }}>
            <PortalCard
  emoji="🗺️"
  title="Compass"
  desc="Explore all chambers."
  onMouseEnter={() => setCompassHover(true)}
  onMouseLeave={() => setCompassHover(false)}
  onClick={() => nav("/compass")}
/>

			<PortalCard
              emoji="🎣"
              title="Catch Ledger"
              desc="Species, weight & place."
              onClick={() => nav("/catch-ledger")}
            />
            <PortalCard
              emoji="🗂️"
              title="Archive"
              desc="Browse memories by tag or tone."
              onClick={() => nav("/archive")}
            />
          </div>

          {/* Footer banner */}
          <div className="home-footer-banner">
            <span className="home-footer-icon">~</span>
            <span className="home-footer-text">{footerWhisper}</span>
          </div>

          <p className="home-tip">Begin in patience; the bite will find you.</p>
        </div>
		<div className={`compass-deco ${compassHover ? "active" : ""}`} aria-hidden />
      </ChamberLayout>
    </CastBackground>
  );
}
