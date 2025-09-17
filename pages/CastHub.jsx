// src/pages/CastHub.jsx
import assets from "../assets/assetMap";
import Sprite from "../engine/Sprite";
import { Hotspot } from "../engine/Hotspot";
import { useState } from "react";

export default function CastHub({ goTo, playerAvatarUrl }) {
  const bg = assets.backgrounds["bg_mirror_lake.jpg"];
  const [pos, setPos] = useState({ x: "20%", y: "62%" });

  async function go(x, y, next) {
    setPos({ x, y });
    // tiny door pulse cue
    const o = document.getElementById("doorcue");
    if (o) { o.classList.remove("animate-door"); void o.offsetWidth; o.classList.add("animate-door"); }
    setTimeout(() => goTo(next), 550);
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[60vh] overflow-hidden rounded-xl border border-slate-800">
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <Sprite src={playerAvatarUrl || assets.sprites.player} x={pos.x} y={pos.y} className="w-24 h-24 animate-idle" />
      <Hotspot
  label="Bait Shop"
  x="35%"
  y="48%"
  onSelect={() => go("32%", "55%", "bait-shop")} // ✅ must match "bait-shop"
/>
	  <Hotspot 
	  label="Cabin" 
	  x="72%" 
	  y="50%" 
	  onSelect={() => go("68%","54%","cabin")} 
/>

      <div id="doorcue" className="absolute inset-0 pointer-events-none"></div>
    </div>
  );
}
