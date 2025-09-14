// components/compass/CompassButton.jsx
import React, { useState } from "react";
import CompassModal from "./CompassModal";

export default function CompassButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        data-open={open ? "true" : "false"}
        onClick={() => { console.log("CompassButton: open"); setOpen(true); }}
        aria-label="Open Compass"
        className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-sky-500 hover:bg-sky-600 shadow-lg ring-1 ring-white/20 transition"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9.5 14.5l2.2-5.2 5.2-2.2-2.2 5.2-5.2 2.2z" fill="currentColor"/>
        </svg>
      </button>

      <CompassModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
