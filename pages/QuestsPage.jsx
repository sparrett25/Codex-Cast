import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { questsStore } from "../state/questsStore";

export default function QuestsPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [tick, setTick] = useState(0); // minimal rerender trigger

  // init
  useEffect(() => { questsStore.load(); setTick(x=>x+1); }, []);

  // handle ?accept=...
  useEffect(() => {
    const params = new URLSearchParams(search);
    const acceptId = params.get("accept");
    if (!acceptId) return;
    const match = questsStore.quests.find(q => q.quest_id === acceptId);
    if (match) {
      questsStore.setActive(match.quest_id);
      setTick(x=>x+1);
      // optional: go straight to detail
      navigate(`/quests/${encodeURIComponent(match.quest_id)}`, { replace: true });
    }
  }, [search, navigate]);

  const active = useMemo(
    () => questsStore.quests.find(q => q.quest_id === questsStore.activeQuestId) || null,
    [tick]
  );
  const available = useMemo(
    () => questsStore.quests.filter(q => q.status === "available"),
    [tick]
  );

  return (
    <main className="min-h-screen p-6 text-slate-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-semibold">Quests</h1>
          <p className="text-slate-300">Follow story threads woven into the waters.</p>
        </header>

        {active && (
          <section className="space-y-3">
            <h2 className="text-lg font-medium">Active Quest</h2>
            <QuestCard
              title={active.title}
              subtitle={active.subtitle}
              cta="Continue"
              onClick={() => navigate(`/quests/${encodeURIComponent(active.quest_id)}`)}
            />
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-lg font-medium">Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {available.map(q => (
              <QuestCard
                key={q.quest_id}
                title={q.title}
                subtitle={q.subtitle}
                cta="Accept"
                onClick={() => {
                  questsStore.setActive(q.quest_id);
                  setTick(x=>x+1);
                  navigate(`/quests/${encodeURIComponent(q.quest_id)}`);
                }}
              />
            ))}
            {available.length === 0 && (
              <div className="text-slate-400 text-sm">No available quests right now.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function QuestCard({ title, subtitle, cta, onClick }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="font-medium text-slate-100">{title}</div>
      {subtitle && <div className="text-slate-400 text-sm mt-1">{subtitle}</div>}
      <button onClick={onClick} className="mt-3 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500">
        {cta}
      </button>
    </div>
  );
}
