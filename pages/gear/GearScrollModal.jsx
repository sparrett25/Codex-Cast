import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getGear } from "../../data/gear/loader";

export default function GearScrollModal() {
  const { slug } = useParams();
  const nav = useNavigate();
  const data = getGear(slug);

  // Lock background scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Debug (optional): confirm it mounts
  // console.log("GearScrollModal mount:", slug, !!data);

  return createPortal(
    <div className="fixed inset-0 z-[2000]" role="dialog" aria-modal="true">
      {/* Backdrop closes the modal */}
      <button
        aria-label="Close"
        onClick={() => nav("..")}
        className="absolute inset-0 bg-black/70"
      />
      <div className="relative h-full grid place-items-center p-4">
        <div className="w-[min(92vw,900px)] max-h-[85vh] overflow-y-auto rounded-2xl
                        bg-[#0b1117] border border-white/10 shadow-2xl text-white">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h2 className="text-xl font-semibold">
              {data ? data.title : "Not found"}
            </h2>
            <button
              onClick={() => nav("..")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4">
            {!data ? (
              <p className="text-white/75">This scroll wasn’t found.</p>
            ) : (
              <>
                {data.summary && <p className="text-white/75 mb-4">{data.summary}</p>}
                {Array.isArray(data.sections) &&
                  data.sections.map((s, i) => (
                    <section key={i} className="mb-5">
                      {s.h && <h3 className="text-lg font-semibold">{s.h}</h3>}
                      {s.p && <p className="text-white/80">{s.p}</p>}
                      {Array.isArray(s.list) && (
                        <ul className="list-disc list-inside text-white/80 pl-1">
                          {s.list.map((li, j) => <li key={j}>{li}</li>)}
                        </ul>
                      )}
                    </section>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
