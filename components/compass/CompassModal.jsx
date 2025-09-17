import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompassModal({ open, onClose }) {
  const [shown, setShown] = useState(false);
  const location = useLocation();

  // Close when route changes
  useEffect(() => {
    if (!open) return;
    onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Esc to close + enter animation
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    const t = setTimeout(() => setShown(true), 10);
    return () => {
      window.removeEventListener("keydown", onEsc);
      clearTimeout(t);
      setShown(false);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* Opaque backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Centered card */}
      <div className="relative h-full flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="compass-title"
          className={[
  "compass-card-scope",
  "w-[min(92vw,1100px)] max-h-[85vh] overflow-y-auto rounded-2xl",
            "bg-[#0b1117] text-white shadow-2xl border border-white/10",
            "transition duration-150",
            shown ? "opacity-100 scale-100" : "opacity-0 scale-95",
          ].join(" ")}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div>
              <h2 id="compass-title" className="text-xl font-semibold">Compass</h2>
              <p className="text-sm text-white/70">
                Quick paths into your trip, guides, and memories.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Sections */}
          <div className="px-6 py-5 grid gap-6">
            <SectionLabel>Plan & Trip</SectionLabel>
            <TileGrid>
			<NavTile to="/intro" icon="🏠" title="Intro" sub="Welcome to Cast." onClose={onClose}/>
			<NavTile to="/" icon="🏠" title="Home" sub="Return to the dock." onClose={onClose}/>
			
              <NavTile to="/plan-trip" icon="🧭" title="Plan Trip" sub="Pick date, time & water." onClose={onClose}/>
			  <NavTile to="/favorites" icon="⭐" title="Favorites" sub="Starred gear, species & techniques." onClose={onClose} />
              <NavTile to="/species-select" icon="🎯" title="Choose Species" sub="Set intention for the day." onClose={onClose}/>
              <NavTile to="/trip-summary" icon="📋" title="Trip Summary" sub="Gear, bait, techniques, notes." onClose={onClose}/>
              <NavTile to="/mirror-lake" icon="🌊" title="Mirror Lake" sub="Begin with intention." onClose={onClose}/>
			  <NavTile to="/mirror-lake-ritual" icon="🌊" title="Mirror Lake Ritual" sub="Shifting Presence." onClose={onClose}/>
              <NavTile to="/map" icon="🗺️" title="Map" sub="Pins, drops & favorite spots." onClose={onClose}/>
            </TileGrid>

            <SectionLabel>Guides</SectionLabel>
            <TileGrid>
              <NavTile to="/species" icon="🐟" title="Species Guide" sub="Habits & habitats." onClose={onClose}/>
              <NavTile to="/gear" icon="🎣" title="Gear Guide" sub="Rods, reels, line & tackle." onClose={onClose}/>
              <NavTile to="/techniques" icon="🌀" title="Techniques Guide" sub="Practice flows & refine craft." onClose={onClose}/>
              <NavTile to="/environment" icon="🌤️" title="Environment Guide" sub="Wind, clarity, season, moon." onClose={onClose}/>
              <NavTile to="/locations-guide" icon="📍" title="Locations Guide" sub="Banks, bends & cover." onClose={onClose}/>
            </TileGrid>

            <SectionLabel>Memory</SectionLabel>
            <TileGrid>
              <NavTile to="/quest-journal" icon="📓" title="Quest Journal" sub="Reflections & lessons." onClose={onClose}/>
              <NavTile to="/catch-ledger" icon="🏷️" title="Catch Ledger" sub="Species, weight, place." onClose={onClose}/>
              <NavTile to="/archive" icon="🗂️" title="Journal Archives" sub="Browse by moment & tag." onClose={onClose}/>
            </TileGrid>
			
			<SectionLabel>Story</SectionLabel>
			<TileGrid>
			<NavTile to="/dock" icon="🎣" title="Dock" sub="Explore the waterways of Cast" onClose={onClose}/>
			</TileGrid>

          </div>
        </div>
      </div>

      {/* 🔒 Scoped CSS: forces tile look regardless of global styles */}
      <style>{`
        .compass-card-scope * { box-sizing: border-box; }
        .compass-card-scope ul, .compass-card-scope ol { list-style: none !important; margin: 0 !important; padding: 0 !important; }
        .compass-card-scope li { list-style: none !important; margin: 0 !important; padding: 0 !important; }

        /* In CompassModal.jsx <style> …replace the .tile rules with: */
.compass-card-scope .tile {
  border-radius: 0.75rem !important;
  border: 1px solid var(--card-border) !important;
  background: var(--card-bg) !important;
  padding: 0.75rem 1rem !important;
  transition: background .15s ease, transform .06s ease !important;
  position: relative !important;
}
.compass-card-scope .tile:hover {
  background: var(--card-bg-hover) !important;
  transform: translateY(-1px) !important;
}


        /* Make the whole button reset-proof, but clickable */
        .compass-card-scope .navtile-btn { all: unset; display: block !important; width: 100% !important; cursor: pointer !important; }
        .compass-card-scope .navtile-btn * { text-decoration: none !important; border: 0 !important; }

        /* Arrow hint */
        .compass-card-scope .tile .arrow {
          position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
          opacity: 0; transition: opacity .15s ease;
        }
        .compass-card-scope .tile:hover .arrow { opacity: 1; }
		
		/* Responsive grid that wins over globals */
.compass-card-scope .tile-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 0.75rem !important;
}
@media (min-width: 640px) { /* sm */
  .compass-card-scope .tile-grid { grid-template-columns: 1fr 1fr !important; }
}
@media (min-width: 1024px) { /* lg */
  .compass-card-scope .tile-grid { grid-template-columns: 1fr 1fr 1fr !important; }
}

/* Section label polish */
.compass-card-scope .section-label {
  font-size: 0.75rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  color: rgba(255,255,255,0.6) !important;
  padding-top: 0.25rem !important;
  border: 0 !important; /* kill any stray borders */
}

/* Tile hover/focus details */
.compass-card-scope .tile { position: relative !important; }
.compass-card-scope .tile .arrow {
  position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%);
  opacity: 0.35; transition: opacity .15s ease;
}
.compass-card-scope .tile:hover .arrow { opacity: 0.8; }
.compass-card-scope .navtile-btn:focus .tile {
  box-shadow: 0 0 0 2px rgba(56,189,248,0.5) !important;
}

      `}</style>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div className="text-xs uppercase tracking-wider text-white/60">{children}</div>;
}
function TileGrid({ children }) {
  return <div className="tile-grid">{children}</div>;
}


function NavTile({ to, icon, title, sub, onClose }) {
  const navigate = useNavigate();
  const go = () => { onClose?.(); navigate(to); };

  return (
    <button type="button" onClick={go} className="navtile-btn">
      <div className="tile">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ fontSize: "1.1rem" }}>{icon}</div>
          <div>
            <div style={{ fontWeight: 600, color: "#fff" }}>{title}</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>{sub}</div>
          </div>
        </div>
        <span className="arrow">→</span>
      </div>
    </button>
  );
}
