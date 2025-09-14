import React, { useMemo } from "react";
import ChamberBackground from "../components/ChamberBackground";
import ChapterCard from "../components/ChapterCard";
import chapters from "../data/stories/mirror-lake/chapters-mirror-lake.json";
import useChapterProgress from "../hooks/useChapterProgress";
import { useStory } from "../context/StoryContext";

export default function MirrorLake() {
  const { state, setState } = useStory(); // using your existing StoryContext (or swap in local state)
  const { unlocked, isUnlocked, unlock } = useChapterProgress();

  const onEnter = (ch) => {
    setState((s) => ({
      ...s,
      chapter: ch.id,
      tone: ch.tone || s.tone,
      time: ch.time || s.time,
    }));
  };

  const ordered = useMemo(() => chapters, []);

  return (
    <ChamberBackground
      chamber="mirror-lake"
      storyState={state}  // backgrounds.json matches against {chapter, tone, time}
    >
      <div className="mx-auto max-w-5xl px-4 py-8 text-white">
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold drop-shadow">Mirror Lake</h1>

          {/* Dev toggles (optional): remove later */}
          <div className="flex gap-2">
            <Badge label={`Chapter: ${state.chapter}`} />
            <Badge label={`Tone: ${state.tone}`} />
            <Badge label={`Time: ${state.time}`} />
          </div>
        </header>

        <p className="mt-2 text-white/90">These waters remember. What will you cast?</p>

        {/* Chapters */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ordered.map((ch) => (
            <div className="rounded-2xl bg-black/30 backdrop-blur-sm ring-1 ring-white/10">
			<ChapterCard
              key={ch.id}
              chapter={ch}
              onEnter={onEnter}
              onUnlock={unlock}
              disabled={!isUnlocked(ch.id)}
            /></div>
          ))}
        </section>
      </div>
    </ChamberBackground>
  );
  
  
}

function Badge({ label }) {
  return <span className="rounded bg-white/15 px-2 py-1 text-xs">{label}</span>;
}
