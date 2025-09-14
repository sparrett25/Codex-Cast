import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PapaBar from "../components/PapaBar";

const SPECIES = [
  { id: "bluegill", label: "Bluegill" },
  { id: "largemouth_bass", label: "Largemouth Bass" },
  { id: "channel_catfish", label: "Channel Catfish" }
];

export default function SpeciesSelect() {
  const [selected, setSelected] = useState("bluegill");
  const navigate = useNavigate();

  useEffect(() => {
    const plan = JSON.parse(localStorage.getItem("cast.tripPlan") || "{}");
    if (!plan?.dateISO) navigate("/plan");
  }, [navigate]);

  function next() {
    const plan = JSON.parse(localStorage.getItem("cast.tripPlan") || "{}");
    plan.targetSpeciesId = selected;
    localStorage.setItem("cast.tripPlan", JSON.stringify(plan));
    navigate("/trip-summary");
  }

  const papaKey = `species.${selected}`;

  return (
    <div className="max-w-3xl mx-auto p-6 pb-20">
      <h1 className="text-2xl font-bold mb-4">Choose Your Target Species</h1>
      <div className="grid gap-3">
        {SPECIES.map(s => (
          <button key={s.id}
            onClick={()=>setSelected(s.id)}
            className={`border rounded px-4 py-3 text-left ${selected===s.id ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <button onClick={next} className="mt-4 bg-blue-600 text-white rounded px-4 py-2">
        Continue → Trip Summary
      </button>

      <PapaBar keyOrKeys={papaKey} />
    </div>
  );
}
