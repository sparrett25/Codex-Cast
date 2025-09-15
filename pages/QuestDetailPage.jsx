import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questsJson from "../data/stories/mirror-lake/quests.json";
import { useQuestRun } from "../state/useQuestRun";
import { createRun } from "../state/questMachine";
import { isPresence, isTechnique, isCatch, isJournal } from "../utils/questGuards";

// NEW: local repos for offline-first saving
import { addJournal } from "../data/local/journalRepo";
import { addCatch } from "../data/local/catchRepo";

export default function QuestDetailPage() {
  const { questId } = useParams();
  const navigate = useNavigate();
  const quest = useMemo(
    () => questsJson.quests.find((q) => q.quest_id === questId) ?? null,
    [questId]
  );

  const initialRun = useMemo(() => (quest ? createRun(quest) : null), [quest]);
  const { run, start, completeStep, reset } = useQuestRun(initialRun);

  useEffect(() => {
    if (!quest) return;
    // Start (or restart) when page mounts (idempotent enough for this prototype)
    start(quest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questId]);

  if (!quest) return <main className="p-6 text-slate-100">Quest not found.</main>;
  const step = quest.steps[run?.currentStepIndex ?? 0];

  const onComplete = (evidence) => {
    completeStep(quest, evidence);
    const idx = (run?.currentStepIndex ?? 0) + 1;
    const done = idx >= quest.steps.length;
    if (done) {
      // navigate back to list for now; store completion elsewhere if desired
      navigate("/quests", { replace: true });
    }
  };

  return (
    <main className="min-h-screen p-6 text-slate-100">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">{quest.title}</h1>
          {quest.subtitle && <p className="text-slate-300">{quest.subtitle}</p>}
        </header>

        {step ? (
          <StepRunner step={step} onComplete={onComplete} />
        ) : (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <div className="text-slate-300">All steps complete.</div>
            <button
              onClick={() => navigate("/quests")}
              className="mt-3 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500"
            >
              Back to Quests
            </button>
          </div>
        )}

        <footer className="flex gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            Reset Quest
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            Back
          </button>
        </footer>
      </div>
    </main>
  );
}

function StepRunner({ step, onComplete }) {
  if (isPresence(step)) return <PresenceStep step={step} onComplete={onComplete} />;
  if (isTechnique(step)) return <TechniqueStep step={step} onComplete={onComplete} />;
  if (isCatch(step)) return <CatchStep step={step} onComplete={onComplete} />;
  if (isJournal(step)) return <JournalStep step={step} onComplete={onComplete} />;
  return null;
}

// Utility: get tags from the step rule (fallback to empty array)
function stepTags(step) {
  return Array.isArray(step?.completion_rule?.tags_to_apply)
    ? step.completion_rule.tags_to_apply
    : [];
}

/* ===== Presence ===== */
function PresenceStep({ step, onComplete }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const minWords = step.completion_rule.min_words ?? 0;
  const words = note.trim().split(/\s+/).filter(Boolean).length;

  const saveAndComplete = () => {
    const rec = addJournal({
      text: note,
      tags: stepTags(step),
      lake_id: "lake.mirror_lake",
      chapter_id: "intro"
    });
    onComplete({ journalEntryId: rec.id, journalWordCount: rec.word_count });
  };

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4">
      <h2 className="text-lg font-medium text-slate-100">{step.title}</h2>
      <p className="text-slate-300">{step.prompt}</p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
        >
          {running ? "Pause" : "Begin Ritual"}
        </button>
        <div className="text-slate-400 text-sm">Timer: {seconds}s</div>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full rounded-xl bg-black/30 border border-white/10 p-3"
        rows={5}
        placeholder="What shifted?"
      />
      <div className="text-xs text-slate-400">
        {words}/{minWords} words
      </div>

      <button
        onClick={saveAndComplete}
        disabled={words < minWords}
        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40"
      >
        Mark Step Complete
      </button>
    </section>
  );
}

/* ===== Technique ===== */
function TechniqueStep({ step, onComplete }) {
  const [technique, setTechnique] = useState("Slower Retrieve");
  const [note, setNote] = useState("");

  const minWords = step.completion_rule.min_words ?? 0;
  const words = note.trim().split(/\s+/).filter(Boolean).length;

  const saveAndComplete = () => {
    const rec = addJournal({
      text: `[${technique}] ${note}`,
      tags: stepTags(step),
      lake_id: "lake.mirror_lake"
    });
    onComplete({ journalEntryId: rec.id, journalWordCount: rec.word_count });
  };

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4">
      <h2 className="text-lg font-medium text-slate-100">{step.title}</h2>
      <p className="text-slate-300">{step.prompt}</p>

      <label className="block text-sm text-slate-300">
        Technique
        <select
          className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 p-2"
          value={technique}
          onChange={(e) => setTechnique(e.target.value)}
        >
          <option>Slower Retrieve</option>
          <option>Pause-and-Go</option>
          <option>Topwater Glide</option>
          <option>Deep Jig</option>
        </select>
      </label>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full rounded-xl bg-black/30 border border-white/10 p-3"
        rows={5}
        placeholder="What changed in feel, line, or water response?"
      />
      <div className="text-xs text-slate-400">
        {words}/{minWords} words
      </div>

      <button
        onClick={saveAndComplete}
        disabled={words < minWords}
        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40"
      >
        Mark Step Complete
      </button>
    </section>
  );
}

/* ===== Catch ===== */
function CatchStep({ step, onComplete }) {
  const [species, setSpecies] = useState("Largemouth Bass");
  const [released, setReleased] = useState(true);
  const [note, setNote] = useState("");

  const minWords = step.completion_rule.min_words ?? 0;
  const words = note.trim().split(/\s+/).filter(Boolean).length;

  const saveAndComplete = () => {
    // Save catch first (with tags)
    const c = addCatch({
      lake_id: "lake.mirror_lake",
      species,
      released,
      note,
      tags: stepTags(step)
    });
    // Optional: also save a journal note that mirrors the catch note
    const j = addJournal({
      text: note,
      tags: stepTags(step),
      lake_id: "lake.mirror_lake"
    });

    onComplete({
      catchEntryId: c.id,
      species,
      released,
      journalEntryId: j.id,
      journalWordCount: j.word_count
    });
  };

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4">
      <h2 className="text-lg font-medium text-slate-100">{step.title}</h2>
      <p className="text-slate-300">{step.prompt}</p>

      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block text-sm text-slate-300">
          Species
          <select
            className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 p-2"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option>Largemouth Bass</option>
            <option>Smallmouth Bass</option>
            <option>Bluegill</option>
            <option>Crappie</option>
            <option>Catfish</option>
            <option>Trout</option>
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          Released
          <select
            className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 p-2"
            value={released ? "yes" : "no"}
            onChange={(e) => setReleased(e.target.value === "yes")}
          >
            <option value="yes">Yes (Catch & Release)</option>
            <option value="no">No</option>
          </select>
        </label>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full rounded-xl bg-black/30 border border-white/10 p-3"
        rows={5}
        placeholder="Note size, place, and the feeling of letting go."
      />
      <div className="text-xs text-slate-400">
        {words}/{minWords} words
      </div>

      <button
        onClick={saveAndComplete}
        disabled={words < minWords}
        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40"
      >
        Mark Step Complete
      </button>
    </section>
  );
}

/* ===== Journal ===== */
function JournalStep({ step, onComplete }) {
  const [text, setText] = useState("");
  const minWords = step.completion_rule.min_words ?? 0;
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  const saveAndComplete = () => {
    const j = addJournal({
      text,
      tags: stepTags(step),
      lake_id: "lake.mirror_lake"
    });
    onComplete({ journalEntryId: j.id, journalWordCount: j.word_count });
  };

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4">
      <h2 className="text-lg font-medium text-slate-100">{step.title}</h2>
      <p className="text-slate-300">{step.prompt}</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-xl bg-black/30 border border-white/10 p-3"
        rows={8}
        placeholder="Let the waters speak through you…"
      />
      <div className="text-xs text-slate-400">
        {words}/{minWords} words
      </div>

      <button
        onClick={saveAndComplete}
        disabled={words < minWords}
        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40"
      >
        Mark Step Complete
      </button>
    </section>
  );
}
