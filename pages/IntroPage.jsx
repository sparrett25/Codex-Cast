import { useNavigate } from "react-router-dom";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";

function ActionTile({ icon = "✨", title, desc, onClick }) {
  return (
    <button className="portal-card" onClick={onClick}>
      <div className="portal-header">
        <span className="portal-emoji">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p className="portal-desc">{desc}</p>
      <div className="portal-enter">Enter →</div>
    </button>
  );
}

export default function IntroPage() {
  const nav = useNavigate();
  const begin = () => nav("/home");
  const skip  = () => nav("/home");

  return (
    <CastBackground chamberKey="intro">
      <ChamberLayout
        title="Cast"
        sub="The Invitation"
        papa={
          <PapaMini
            line="Welcome, traveler. Cast is more than lines and water — it is story, memory, and presence. Each cast tells a tale. What will yours be today?"
          />
        }
      >
        <div className="intro-container">
          <h1>Cast</h1>
          <h2>
            Your fishing companion, reflective journal, and guide into waters both real and
            imagined. Every lake holds a story. The first is <strong>Mirror Lake</strong> — a place
            where surface and soul reflect one another.
          </h2>

          <div className="ui-grid" style={{ maxWidth: 920, width: "100%" }}>
            <ActionTile
              icon="🌟"
              title="Begin Your Journey"
              desc="Step onto your dock and start from Home."
              onClick={begin}
            />
            <ActionTile
              icon="➡️"
              title="Skip Intro"
              desc="You can revisit this anytime from the Dock."
              onClick={skip}
            />
          </div>

          <p className="home-tip">Tip: You can revisit this introduction from the Dock.</p>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}
