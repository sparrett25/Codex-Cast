import { useEffect, useState } from "react";

const KEY = "cast.mirrorLake.progress";

export default function useChapterProgress(initial = ["intro"]) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(unlocked));
  }, [unlocked]);

  const isUnlocked = (id) => unlocked.includes(id);
  const unlock = (ids) =>
    setUnlocked((u) => Array.from(new Set([...u, ...(Array.isArray(ids) ? ids : [ids])])));

  return { unlocked, isUnlocked, unlock };
}
