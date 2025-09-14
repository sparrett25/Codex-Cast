// components/CastCompass.jsx
import { useEffect, useState } from "react";

const items = [
  { id:"mirror",  label:"Mirror Lake", href:"/mirror-lake" },
  { id:"plan",    label:"Plan",        href:"/plan" },
  { id:"journal", label:"Journal",     href:"/journal" },
  { id:"map",     label:"Map",         href:"/map" },
  { id:"train",   label:"Training",    href:"/training" },
  { id:"species", label:"Species",     href:"/species" },
];

export default function CastCompass() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 32);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // radius of the fan (in px)
  const R = 100;

  return (
    <div className={`fixed right-4 bottom-4 z-40 transition-opacity ${hidden ? "opacity-0" : "opacity-100"}`}>
      {/* fan items */}
      <div className="relative">
        {items.map((it, i) => {
          // spread across 180° arc
          const angle = (-90 + (i * 180) / (items.length - 1)) * (Math.PI/180);
          const x = Math.cos(angle) * R;
          const y = Math.sin(angle) * R;

          return (
            <a
              key={it.id}
              href={it.href}
              className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2
                pointer-events-${open ? "auto" : "none"} transition-all duration-300
                px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap
                bg-parchment text-ink shadow-paper border border-ink/10`}
              style={{
                transform: `translate(${open ? x : 0}px, ${open ? y : 0}px)`
              }}
              aria-hidden={!open}
              tabIndex={open ? 0 : -1}
            >
              {it.label}
            </a>
          );
        })}

        {/* main button */}
        <button
          onClick={() => setOpen(v => !v)}
          className="size-12 rounded-full grid place-items-center
            bg-gold text-ink shadow-paper border border-ink/10
            hover:scale-105 active:scale-95 transition"
          aria-label="Cast Compass"
        >
          {/* simple compass glyph */}
          <span className="text-lg">🧭</span>
        </button>
      </div>
    </div>
  );
}
