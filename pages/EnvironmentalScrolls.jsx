// /pages/EnvironmentGuide.jsx
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import ChamberTile from "../components/ChamberTile";
import { say } from "../data/say";
import CastBackground from "../components/CastBackground"; // adjust path if needed


const todaySeed = Number(new Date().toISOString().slice(0,10).replaceAll("-",""));

export default function EnvironmentGuide(){
  return (
  <CastBackground chamberKey="environment">
    <ChamberLayout
      title="Environment"
      sub="Read wind, moon, tide, and temperature."
      papa={<PapaMini line={say("chamber.environment", todaySeed)} />}
    >
      <div className="tile-grid">

        <ChamberTile
          to="/environment/wind"
          icon="🌬️"
          title="Wind"
          sub="Stacks bait, breaks surface; fish the push and the lee."
          tags={[
            { label:"Fast", variant:"fast", icon:"💨" },
            { label:"Wind", variant:"wind", icon:"🍃" }
          ]}
        />

        <ChamberTile
          to="/environment/tide"
          icon="🌊"
          title="Tide"
          sub="Current writes the script; time your cast to the turn."
          tags={[
            { label:"Tide", variant:"tide", icon:"🌊" },
            { label:"Saltwater", variant:"saltwater", icon:"🧭" }
          ]}
        />

        <ChamberTile
          to="/environment/moon"
          icon="🌙"
          title="Moon"
          sub="Pulls on water & rhythm; dawn + majors often sing."
          tags={[
            { label:"Night", variant:"night", icon:"🌑" },
            { label:"Calm water", variant:"calm", icon:"🌊" }
          ]}
        />

        <ChamberTile
          to="/environment/temp"
          icon="🌡️"
          title="Temperature"
          sub="Metabolism & depth choice; shade and springs matter."
          tags={[
            { label:"Freshwater", variant:"freshwater", icon:"🏞️" }
          ]}
        />

        <ChamberTile
          to="/environment/clarity"
          icon="💧"
          title="Water Clarity"
          sub="Color & vibration: clear = subtle; stain = thump/flash."
          tags={[
            { label:"Calm water", variant:"calm", icon:"🌊" },
            { label:"Freshwater", variant:"freshwater", icon:"🏞️" }
          ]}
        />

        <ChamberTile
          to="/environment/barometer"
          icon="📈"
          title="Barometer"
          sub="Falling wakes up edges; high returns to patience."
          tags={[
            { label:"Calm water", variant:"calm", icon:"🌊" }
          ]}
        />

      </div>
    </ChamberLayout>
	</CastBackground>
  );
}
