// src/cast/engine/SceneRouter.jsx
import { useEffect, useState } from "react";
import assets from "../assets/assetMap";
import CastHub from "../pages/CastHub";
import BaitShop from "../pages/BaitShop";
import Cabin from "../pages/Cabin";

const KEY = "cast:lastScene";

export default function SceneRouter({ playerAvatarUrl }) {
  const [scene, setScene] = useState(localStorage.getItem(KEY) || "hub");
  useEffect(() => localStorage.setItem(KEY, scene), [scene]);

  const goTo = (next) => setScene(next);
  const goBack = () => setScene("hub");

  if (scene === "hub") {
    return <CastHub goTo={goTo} playerAvatarUrl={playerAvatarUrl || assets.sprites.player} />;
  }

  if (scene === "bait-shop") {
  return <BaitShop goBack={goBack} />;
}

  if (scene === "cabin") 
  return <Cabin goBack={goBack} />;


  // fallback so it never goes "black"
  return (
    <div className="p-6 text-red-400">
      Scene not found: <strong>{scene}</strong>
      <button className="ml-2 underline" onClick={goBack}>Back to Hub</button>
    </div>
  );
}
