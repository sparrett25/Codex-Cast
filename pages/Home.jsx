// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/pages/Home.css";
import UiTileCard from "../components/UiTileCard";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import CastBackground from "../components/CastBackground"; // adjust path if needed

const WHISPERS = [
  "Every cast is a story. What will yours be today?",
  "Still water remembers. Cast with presence.",
  "Read the wind, listen to the tide, trust your line.",
  "Begin in patience; the bite will find you.",
  "Let the lake teach you how to see."
];

function PortalCard({ to, emoji, title, desc }) {
  return (
    <Link to={to} className="portal-card">
      <div className="portal-header">
        <span className="portal-emoji">{emoji}</span>
        <h3>{title}</h3>
      </div>
      <p className="portal-desc">{desc}</p>
      <div className="portal-enter">Enter →</div>
    </Link>
  );
}

export default function Home() {
  // Header whisper (random per visit)
  const headerWhisper = useMemo(
    () => WHISPERS[Math.floor(Math.random() * WHISPERS.length)],
    []
  );

  // Footer whisper (rotates every 12s)
  const footerIndexRef = useRef(0);
  const [footerWhisper, setFooterWhisper] = useState(
    WHISPERS[(footerIndexRef.current + 1) % WHISPERS.length]
  );
  useEffect(() => {
    const id = setInterval(() => {
      footerIndexRef.current = (footerIndexRef.current + 1) % WHISPERS.length;
      setFooterWhisper(WHISPERS[footerIndexRef.current]);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  // Apply the “home-bg” only on this page
  useEffect(() => {
    document.body.classList.add("home-bg");
    return () => document.body.classList.remove("home-bg");
  }, []);


  return (
  <CastBackground chamberKey="home">
  <ChamberLayout
      title="Home"
      sub="Explore the chambers of Cast."
      papa={<PapaMini line="Welcome to Cast. I am here to guide you on your journey." />}
    >
	
    <div className="home-container">
      <div className="home-header">
        <h1>Cast</h1>
        <p>Your fishing companion, reflective journal, and guide to the waters.</p>
        <p className="home-whisper">“{headerWhisper}”</p>
      </div>

      <div className="portal-grid ui-grid">
        
		<PortalCard
          to="/mirror-lake"
          emoji="🌊"
          title="Mirror Lake"
          desc="Begin with intention. Choose your fish and center your focus."
        />
		
        <PortalCard
          to="/journal"
          emoji="📜"
          title="Journal"
          desc="Reflect and remember. Write the story of today’s waters."
        />
        <PortalCard
          to="/map"
          emoji="🗺️"
          title="Map"
          desc="Pin sacred spots, gear drops, and catch locations."
        />
        <PortalCard
          to="/species"
          emoji="🐟"
          title="Species"
          desc="Learn the habits and habitats of your quarry."
        />
        <PortalCard
          to="/gear"
          emoji="🎣"
          title="Gear"
          desc="Select the tools that sing with today’s conditions."
        />
        <PortalCard
          to="/techniques"
          emoji="🌀"
          title="Techniques"
          desc="Practice flows and refine your craft."
        />
        <PortalCard
          to="/environment"
          emoji="🌙"
          title="Environment"
          desc="Read wind, moon, tide, and temperature."
        />
        <PortalCard
          to="/locations-guide"
          emoji="📍"
          title="Locations"
          desc="Walk the banks: Alafia, Cockroach Bay, and beyond."
        />
        <PortalCard
          to="/journal-archive"
          emoji="🗂️"
          title="Archive"
          desc="Browse your memories by moment, tone, and tag."
        />
      </div>

      {/* Footer whisper banner */}
      <div className="home-footer-banner">
        <span className="home-footer-icon">~</span>
        <span className="home-footer-text">{footerWhisper}</span>
      </div>

      <p className="home-tip">Tip: you can always return here via the top navigation.</p>
    </div>
	</ChamberLayout>
	 </CastBackground>
  );
}
