// src/pages/CastApp.jsx (or wherever you mount)
import SceneRouter from "../engine/SceneRouter";
import "../styles/cast-anim.css";

export default function CastApp() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
      <h1 className="text-lg mb-3">CAST</h1>
      <SceneRouter />
    </div>
  );
}
