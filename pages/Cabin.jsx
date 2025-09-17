import { useState } from "react";
import assets from "../assets/assetMap";
import GuideCard from "../ui/GuideCard";

export default function Cabin({ goBack }) {
  const bg = assets.backgrounds["bg_cabin_interior.jpg"]; // or .jpg if you swapped
  const papa = assets.sprites.shopkeeper;                 // or distinct papa sprite
  const [mode, setMode] = useState("main");               // main | gear | fire

  // shared actions
  const actionsMain = [
    { label: "Gear Guide", next: "gear" },
    { label: "Sit by Fire", next: "fire" },
    { label: "Close", next: "close" },
  ];
  const actionsGear = [
    { label: "Browse Rods", next: "gear:rods" },
    { label: "Browse Lures", next: "gear:lures" },
    { label: "Back", next: "main" },
  ];
  const actionsFire = [
    { label: "Return to Cabin", next: "main" },
  ];

  function handleAction(next) {
    if (next === "close") return goBack();
    if (next === "main") return setMode("main");
    if (next === "gear") return setMode("gear");
    if (next === "fire") return setMode("fire");

    // simple stubs for sub-actions (extend later)
    if (next === "gear:rods") alert("Rods list coming soon 🌿");
    if (next === "gear:lures") alert("Lures list coming soon 🎣");
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[60vh] overflow-hidden rounded-xl border border-slate-800">
      {/* Background */}
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />

      {/* Back to lake */}
      <button
        type="button"
        onClick={goBack}
        className="z-20 absolute left-4 top-4 px-3 py-1.5 text-xs rounded
                   bg-slate-900/70 text-white border border-slate-700 hover:bg-slate-800"
      >
        ← Back
      </button>

      {/* Main dialogue */}
      {mode === "main" && (
        <GuideCard
          avatarUrl={papa}
          text="Welcome to the cabin, Flamekeeper. Warm your hands by the hearth. When you’re ready, we can tune your gear or simply sit with the fire."
          actions={actionsMain}
          onAction={handleAction}
          typing
          typingDelayMs={900}
        />
      )}

      {/* Gear Guide */}
      {mode === "gear" && (
        <GuideCard
          avatarUrl={papa}
          text="Every rod and lure has its own story. Let me show you how to match them to the waters."
          actions={actionsGear}
          onAction={handleAction}
          typing
          typingDelayMs={700}
        />
      )}

      {/* Sit by Fire */}
      {mode === "fire" && (
        <>
          {/* subtle dim & glow over the hearth area */}
          <div className="absolute inset-0 bg-black/40 fade-in pointer-events-none" />
          <div className="absolute right-[18%] bottom-[18%] w-48 h-48 rounded-full glow-pulse pointer-events-none" />
          <GuideCard
            avatarUrl={papa}
            text="The fire carries stories of the old waters. Sometimes it’s best to just sit and listen."
            actions={actionsFire}
            onAction={handleAction}
            typing
            typingDelayMs={600}
          />
        </>
      )}
    </div>
  );
}
