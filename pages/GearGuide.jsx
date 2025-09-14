import { useMemo, useState } from "react";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import ChamberTile from "../components/ChamberTile";
import { listGear } from "../data/gear/loader";
import TileFilter from "../components/TileFilter";
import { byFavFirst, useFavorites } from "../hooks/useFavorites";
import { say } from "../data/say";
import CastBackground from "../components/CastBackground"; // adjust path if needed

const todaySeed = Number(new Date().toISOString().slice(0,10).replaceAll("-",""));

const GEAR_TAGS = {
  "baitcasting-reel": [
    { label:"Intermediate", variant:"intermediate", icon:"🧭" },
    { label:"Freshwater",   variant:"freshwater",   icon:"🏞️" }
  ],
  "spinning-reel": [
    { label:"Beginner",   variant:"beginner",   icon:"🌱" },
    { label:"Freshwater", variant:"freshwater", icon:"🏞️" }
  ],
  "medium-heavy-baitcasting-rod": [
    { label:"Intermediate", variant:"intermediate", icon:"🧭" },
    { label:"Fast",         variant:"fast",         icon:"💨" }
  ],
  "ultralight-spinning-rod": [
    { label:"Beginner",   variant:"beginner", icon:"🌱" },
    { label:"Calm water", variant:"calm",     icon:"🌊" }
  ],
  "braided-line": [
    { label:"Advanced",   variant:"advanced",   icon:"🔥" },
    { label:"Fast",       variant:"fast",       icon:"💨" }
  ],
  "fluorocarbon-line": [
    { label:"Intermediate", variant:"intermediate", icon:"🧭" },
    { label:"Calm water",   variant:"calm",         icon:"🌊" }
  ],
  "monofilament-line": [
    { label:"Beginner",   variant:"beginner",   icon:"🌱" },
    { label:"Freshwater", variant:"freshwater", icon:"🏞️" }
  ],
  "spinnerbait": [
    { label:"Intermediate", variant:"intermediate", icon:"🧭" },
    { label:"Wind",         variant:"wind",         icon:"🍃" },
    { label:"Fast",         variant:"fast",         icon:"💨" }
  ],
  "topwater-frog": [
    { label:"Advanced",   variant:"advanced",   icon:"🔥" },
    { label:"Freshwater", variant:"freshwater", icon:"🏞️" }
  ],
  "soft-plastic-worm": [
    { label:"Beginner",   variant:"beginner",   icon:"🌱" },
    { label:"Calm water", variant:"calm",       icon:"🌊" },
    { label:"Freshwater", variant:"freshwater", icon:"🏞️" }
  ]
};

export default function GearGuide() {
  const [q, setQ] = useState("");
  const items = listGear();
  const { favSet } = useFavorites("gear");
  const [favFirst, setFavFirst] = useState(true);

const shown = useMemo(
    () => favFirst ? byFavFirst(items, (x)=>x.slug, favSet) : items,
    [items, favFirst, favSet]
  );


  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(it =>
      it.title.toLowerCase().includes(s) ||
      (it.summary || "").toLowerCase().includes(s) ||
      it.slug.includes(s)
    );
  }, [items, q]);

  return (
  <CastBackground chamberKey="gear">
    <ChamberLayout
      title="Gear"
      sub="Choose tools that match the day’s water and your intent."
      papa={<PapaMini line={say("chamber.gear", todaySeed)} />}
    >
	
	<div className="mb-3 flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-white/75">
          <input type="checkbox" checked={favFirst} onChange={e=>setFavFirst(e.target.checked)} />
          Favorites first
        </label>
      </div>
	  
      <TileFilter value={q} onChange={setQ} placeholder="Find a rod, reel, line, or lure…" />
      
	  <div className="tile-grid">
        {shown.map(item => (
          <ChamberTile
            key={item.slug}
            to={`/gear/${item.slug}`}
            icon={item.icon}
            title={item.title}
            sub={item.summary}
            tags={GEAR_TAGS[item.slug] || []}
            type="gear"
            id={item.slug}
          />
        ))}
      </div>
    </ChamberLayout>
	</CastBackground>
  );
}