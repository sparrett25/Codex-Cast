import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import ChamberTile from "../components/ChamberTile";
import { say } from "../data/say";
import { SPECIES } from "../data/species"; // or your local array
import { byFavFirst, useFavorites } from "../hooks/useFavorites";
const todaySeed = Number(new Date().toISOString().slice(0,10).replaceAll("-",""));
import { useMemo, useState } from "react";

export default function SpeciesGuide(){
  const { favSet } = useFavorites("species");
  const [favFirst, setFavFirst] = useState(true);
  const shown = useMemo(
    () => favFirst ? byFavFirst(SPECIES, x=>x.id, favSet) : SPECIES,
    [favFirst, favSet]
  );

  return (
    <ChamberLayout
      title="Species"
      sub="Habits, habitats, and seasons—learn what each fish teaches."
      papa={<PapaMini line={say("chamber.species", todaySeed)} />}
    >
	<label className="inline-flex items-center gap-2 text-white/75 mb-3">
        <input type="checkbox" checked={favFirst} onChange={e=>setFavFirst(e.target.checked)} />
        Favorites first
      </label>
	  
      <div className="tile-grid">
        {shown.map(s => (
          <ChamberTile
            key={s.id}
            to={`/deep-dive/${s.id}`}
            icon={s.icon}
            title={s.title}
            sub={s.sub}
            tags={s.tags}
            type="species"     // ⭐ tells the hook which bucket
            id={s.id}          // ⭐ unique id for starring
          />
        ))}
      </div>
    </ChamberLayout>
  );
}