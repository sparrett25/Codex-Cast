import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";

// Data
import chaptersData from "../data/stories/mirror-lake/chapters-mirror-lake.json";
import backgroundsData from "../data/stories/mirror-lake/backgrounds-mirror-lake.json";
import questsData from "../data/stories/mirror-lake/quests.json";

// Match your Compass “PortalCard” look
function PortalCard({ emoji, title, desc, onClick }) {
  return (
    <button onClick={onClick} className="portal-card">
      <div className="portal-header">
        <span className="portal-emoji">{emoji}</span>
        <h3>{title}</h3>
      </div>
      <p className="portal-desc">{desc}</p>
      <div className="portal-enter">Enter →</div>
    </button>
  );
}

export default function MirrorLakePage() {
  const navigate = useNavigate();
  const [chapterIndex, setChapterIndex] = useState(0);

  const chapters = chaptersData?.chapters ?? [];
  const chapter = chapters[chapterIndex];

  // Background for current chapter (falls back to chamberKey handling in CastBackground)
  const bg = useMemo(() => {
    if (!chapter) return null;
    return backgroundsData?.backgrounds?.find(b => b.chapter_id === chapter.id) ?? null;
  }, [chapter]);

  // Quest hook per chapter
  const acceptQuestId = chapter?.links?.accept_quest_id;
  const questForChapter = useMemo(() => {
    if (!acceptQuestId) return null;
    return questsData?.quests?.find(q => q.quest_id === acceptQuestId) ?? null;
  }, [acceptQuestId]);
  const questIsAvailable = questForChapter?.status === "available";

  useEffect(() => window.scrollTo(0, 0), [chapterIndex]);

  if (!chapter) {
    return (
      <CastBackground chamberKey="mirror-lake-night">
        <ChamberLayout title="Mirror Lake" sub="Story Chamber" papa={<PapaMini line="The waters are quiet today." />}>
          <div className="home-container">
            <p className="portal-desc">No chapters found for Mirror Lake.</p>
            <div className="portal-grid ui-grid">
              <PortalCard
                emoji="🗺️"
                title="Back to Compass"
                desc="Choose another chamber."
                onClick={() => navigate("/compass")}
              />
            </div>
          </div>
        </ChamberLayout>
      </CastBackground>
    );
  }

  // Navigation helpers honoring explicit prev/next links if present
  const goPrev = () => {
    const prevId = chapter.links?.prev_chapter_id;
    if (prevId) {
      const idx = chapters.findIndex(c => c.id === prevId);
      if (idx >= 0) return setChapterIndex(idx);
    }
    setChapterIndex(i => Math.max(0, i - 1));
  };

  const goNext = () => {
    const nextId = chapter.links?.next_chapter_id;
    if (nextId) {
      const idx = chapters.findIndex(c => c.id === nextId);
      if (idx >= 0) return setChapterIndex(idx);
    }
    setChapterIndex(i => Math.min(chapters.length - 1, i + 1));
  };

  return (
    <CastBackground
      chamberKey="mirror-lake-night"
      // If your CastBackground supports direct image/overlay, pass them; otherwise it will resolve via chamberKey.
      image={bg?.image}
      overlay={bg?.overlay ?? "rgba(0,0,0,0.45)"}
    >
      <ChamberLayout
        title={chapter.title}
        sub={chapter.subtitle || "Mirror Lake"}
        papa={chapter.papa ? <PapaMini line={chapter.papa} /> : null}
      >
        <div className="home-container">
          {/* Narration */}
          {chapter.narration && (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-slate-200 leading-relaxed">
              {chapter.narration}
            </div>
          )}

          {/* Action tiles */}
          <div className="portal-grid ui-grid" style={{ marginTop: "0.75rem" }}>
            {/* Accept Quest (if available) */}
            {questForChapter && questIsAvailable && (
              <PortalCard
                emoji="🧭"
                title={questForChapter.title}
                desc={questForChapter.subtitle || "A story thread awaits at the water’s edge."}
                onClick={() => navigate(`/quests?accept=${encodeURIComponent(questForChapter.quest_id)}`)}
              />
            )}

            {/* Journal from here */}
            <PortalCard
              emoji="📜"
              title="Journal"
              desc="Write what the lake reflects back to you."
              onClick={() => navigate("/journal")}
            />

            {/* Begin Ritual (send to Mirror Lake ritual page or open ritual modal) */}
            <PortalCard
              emoji="🕯️"
              title="Begin Ritual"
              desc="Breathe, center, and set your intention."
              onClick={() => navigate("/mirror-lake/ritual")}
            />
          </div>

          {/* Chapter navigation */}
          <div className="chapter-nav" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <button
              className="portal-chip"
              onClick={goPrev}
              disabled={chapterIndex === 0 && !chapter.links?.prev_chapter_id}
            >
              ← Previous
            </button>
            <button
              className="portal-chip"
              onClick={goNext}
              disabled={chapterIndex >= chapters.length - 1 && !chapter.links?.next_chapter_id}
              style={{ marginLeft: "auto" }}
            >
              Next →
            </button>
          </div>

          {/* Footer note / credit */}
          {bg?.credit && (
            <p className="home-tip" style={{ marginTop: "0.5rem" }}>
              {bg.credit}
            </p>
          )}
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}
