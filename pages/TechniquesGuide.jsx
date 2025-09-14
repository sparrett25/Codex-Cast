// /pages/TechniquesGuide.jsx
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import ChamberTile from "../components/ChamberTile";
import { say } from "../data/say";
import { useMemo, useState } from "react";
import { byFavFirst, useFavorites } from "../hooks/useFavorites";
import { TECHNIQUES } from "../data/techniques";
import CastBackground from "../components/CastBackground"; // adjust path if needed


const todaySeed = Number(new Date().toISOString().slice(0,10).replaceAll("-",""));

export default function TechniquesGuide(){
	const { favSet } = useFavorites("techniques");
  const [favFirst, setFavFirst] = useState(true);
  const shown = useMemo(
    () => favFirst ? byFavFirst(TECHNIQUES, x=>x.id, favSet) : TECHNIQUES,
    [favFirst, favSet]
  );
  
  return (
  <CastBackground chamberKey="techniques">
    <ChamberLayout
      title="Techniques"
      sub="Practice flows and refine your craft."
      papa={<PapaMini line={say("chamber.techniques", todaySeed)} />}
    >
	
	<label className="inline-flex items-center gap-2 text-white/75 mb-3">
        <input type="checkbox" checked={favFirst} onChange={e=>setFavFirst(e.target.checked)} />
        Favorites first
      </label>

      <div className="tile-grid">
        {shown.map(t => (
          <ChamberTile
            key={t.id}
            to={`/techniques/${t.id}`}
            icon={t.icon}
            title={t.title}
            sub={t.sub}
            tags={t.tags}
            type="techniques"  // ⭐
            id={t.id}          // ⭐
        />

		))}
		</div>
    </ChamberLayout>
	</CastBackground>
  );
}
