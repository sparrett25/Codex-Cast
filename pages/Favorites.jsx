import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import ChamberTile from "../components/ChamberTile";
import { useFavorites } from "../hooks/useFavorites";
import { listGear } from "../data/gear/loader";
import { SPECIES } from "../data/species";
import { TECHNIQUES } from "../data/techniques";
import { LOCATIONS } from "../data/locations";
import { say } from "../data/say";
import CastBackground from "../components/CastBackground"; // adjust path if needed

export default function Favorites(){
  const { favSet: gearFavs }      = useFavorites("gear");
  const { favSet: speciesFavs }   = useFavorites("species");
  const { favSet: techFavs }      = useFavorites("techniques");
  const { favSet: locationFavs }  = useFavorites("locations");

  const gear       = listGear().filter(g => gearFavs.has(g.slug));
  const species    = SPECIES.filter(s => speciesFavs.has(s.id));
  const techniques = TECHNIQUES.filter(t => techFavs.has(t.id));
  const locations  = LOCATIONS.filter(l => locationFavs.has(l.id));

  const isEmpty = !gear.length && !species.length && !techniques.length && !locations.length;

  return (
  <CastBackground chamberKey="favorites">
    <ChamberLayout
      title="Favorites"
      sub="Your starred gear, species, techniques, and locations."
      papa={<PapaMini line={say("defaults")} />}
    >
      {isEmpty && (
        <div className="text-white/70">
          No favorites yet. Tap ★ on any card to star it—your picks will show up here.
        </div>
      )}

      {species.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">Species</h2>
          <div className="tile-grid">
            {species.map(s => (
              <ChamberTile
                key={s.id}
                to={`/deep-dive/${s.id}`}
                icon={s.icon}
                title={s.title}
                sub={s.sub}
                type="species"
                id={s.id}
              />
            ))}
          </div>
        </>
      )}

      {gear.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">Gear</h2>
          <div className="tile-grid">
            {gear.map(g => (
              <ChamberTile
                key={g.slug}
                to={`/gear/${g.slug}`}
                icon={g.icon}
                title={g.title}
                sub={g.summary}
                type="gear"
                id={g.slug}
              />
            ))}
          </div>
        </>
      )}

      {techniques.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">Techniques</h2>
          <div className="tile-grid">
            {techniques.map(t => (
              <ChamberTile
                key={t.id}
                to={`/techniques/${t.id}`} // wire detail pages later
                icon={t.icon}
                title={t.title}
                sub={t.sub}
                type="techniques"
                id={t.id}
              />
            ))}
          </div>
        </>
      )}

      {locations.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">Locations</h2>
          <div className="tile-grid">
            {locations.map(l => (
              <ChamberTile
                key={l.id}
                to={`/map?focus=${encodeURIComponent(l.id)}`}
                icon={l.icon}
                title={l.title}
                sub={l.sub}
                type="locations"
                id={l.id}
              />
            ))}
          </div>
        </>
      )}
    </ChamberLayout>
	</CastBackground>
  );
}
