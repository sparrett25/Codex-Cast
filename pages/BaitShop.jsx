// src/pages/BaitShop.jsx
import assets from "../assets/assetMap";
import GuideCard from "../ui/GuideCard";

export default function BaitShop({ goBack, onOpen }) {
  const bg = assets.backgrounds["bg_baitshop.jpg"];
  const avatarUrl = assets.sprites.shopkeeper;

  function handleAction(next) {
    if (next === "openBait") onOpen?.("bait");
    if (next === "tips") onOpen?.("tips:bait");
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[60vh] overflow-hidden rounded-xl border border-slate-800">
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />

      <button
        type="button"
        onClick={goBack}
        className="z-20 absolute left-4 top-4 px-3 py-1.5 text-xs rounded bg-slate-900/70 text-white border border-slate-700 hover:bg-slate-800"
      >
        ← Back
      </button>

      <GuideCard
  avatarUrl={avatarUrl}
  text="Welcome to the Bait Shop! Pick lures and line here. Each lure has a mood — hover or tap to see where it shines."
  actions={[
    { label: "Browse Bait", next: "openBait" },
    { label: "Tips", next: "tips" },
    { label: "Close", next: "close" },
  ]}
  typing={true}
  typingDelayMs={900}
  onAction={handleAction}
      />
    </div>
  );
}
