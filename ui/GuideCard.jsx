// src/cast/ui/GuideCard.jsx
import { useEffect, useState } from "react";

export default function GuideCard({
  avatarUrl,
  text,
  actions = [],
  onAction,
  typing = true,
  typingDelayMs = 900,
}) {
  const [showText, setShowText] = useState(!typing);

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setShowText(true), typingDelayMs);
    return () => clearTimeout(t);
  }, [typing, typingDelayMs]);

  return (
    <div className="guide-fade absolute left-4 bottom-4
                    bg-slate-900/80 text-slate-100 border border-slate-700
                    rounded-lg p-3 backdrop-blur shadow-lg max-w-md">
      <div className="flex items-start gap-3">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="guide avatar"
            className="shopkeeper-anim w-14 h-14 rounded-full border border-slate-600 flex-shrink-0"
          />
        )}

        {/* Message area */}
        <div className="min-h-[3rem] flex items-center">
          {showText ? (
            <p className="text-sm leading-snug">{text}</p>
          ) : (
            <span className="typing-dots text-sm tracking-wider">
              <span>•</span><span>•</span><span>•</span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={() => onAction?.(a.next)}
            className="px-3 py-1.5 text-xs rounded-md bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 transition"
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
