import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChamberLayout from "../../components/ChamberLayout";
import PapaMini from "../../components/PapaMini";
import { getGear } from "../../data/gear/loader";

/* Pretty label from a key like "gear_setup" -> "Gear Setup" */
const labelize = (k) =>
  k.replace(/[_\-]+/g, " ")
   .replace(/\b\w/g, (m) => m.toUpperCase())
   .trim();

/* Keys that are metadata, not content sections */
const RESERVED = new Set([
  "title","icon","image","images","id","slug","tags",
  "summary","description","overview","intro",
  "sections","content","blocks","guide"
]);

/* Helpful order if these keys exist */
const ORDER = [
  "when_to_use","conditions","best_times",
  "gear","gear_setup","rigs","rigging","rod","reel","line",
  "technique","presentation","retrieve","cadence",
  "colors","locations","safety",
  "tips","notes","wisdom"
];

/* Normalize many JSON shapes into { summary, sections[] } */
function normalize(data) {
  if (!data) return { summary: "", sections: [] };

  // 1) If already in new shape
  if (Array.isArray(data.sections)) {
    return {
      summary: data.summary || data.description || data.overview || data.intro || "",
      sections: data.sections
    };
  }

  const sections = [];

  // 2) Common arrays: content/blocks/guide -> [{h,p,list}]
  for (const key of ["content","blocks","guide"]) {
    const arr = data[key];
    if (Array.isArray(arr)) {
      arr.forEach((x) => {
        if (!x) return;
        const h = x.h || x.title || "";
        const p = typeof x.p === "string" ? x.p : (typeof x.text === "string" ? x.text : undefined);
        const list = Array.isArray(x.list) ? x.list
                  : Array.isArray(x.items) ? x.items
                  : undefined;
        if (h || p || list) sections.push({ h, p, list });
      });
    }
  }

  // 3) Preferred keys in a friendly order
  for (const key of ORDER) {
    const v = data[key];
    if (v == null) continue;
    if (typeof v === "string" && v.trim()) sections.push({ h: labelize(key), p: v.trim() });
    else if (Array.isArray(v) && v.length) {
      if (v.every((x) => typeof x === "string")) sections.push({ h: labelize(key), list: v });
      else {
        // array of objects: try to pull {h/p/list}
        v.forEach((o, i) => {
          if (!o) return;
          const h = o.h || o.title || `${labelize(key)} ${i+1}`;
          const p = typeof o.p === "string" ? o.p : (typeof o.text === "string" ? o.text : undefined);
          const list = Array.isArray(o.list) ? o.list
                    : Array.isArray(o.items) ? o.items
                    : undefined;
          if (h || p || list) sections.push({ h, p, list });
        });
      }
    } else if (typeof v === "object") {
      const p = typeof v.p === "string" ? v.p
            : typeof v.text === "string" ? v.text
            : typeof v.description === "string" ? v.description
            : undefined;
      const list = Array.isArray(v.list) ? v.list
                : Array.isArray(v.items) ? v.items
                : undefined;
      if (p || list) sections.push({ h: labelize(key), p, list });
    }
  }

  // 4) Any other non-reserved keys (catch-all)
  Object.keys(data)
    .filter((k) => !RESERVED.has(k) && !ORDER.includes(k))
    .forEach((k) => {
      const v = data[k];
      if (v == null) return;
      if (typeof v === "string" && v.trim()) sections.push({ h: labelize(k), p: v.trim() });
      else if (Array.isArray(v) && v.length) {
        if (v.every((x) => typeof x === "string")) sections.push({ h: labelize(k), list: v });
        else {
          v.forEach((o, i) => {
            if (!o) return;
            const h = o.h || o.title || `${labelize(k)} ${i+1}`;
            const p = typeof o.p === "string" ? o.p : (typeof o.text === "string" ? o.text : undefined);
            const list = Array.isArray(o.list) ? o.list
                      : Array.isArray(o.items) ? o.items
                      : undefined;
            if (h || p || list) sections.push({ h, p, list });
          });
        }
      } else if (typeof v === "object") {
        const p = typeof v.p === "string" ? v.p
              : typeof v.text === "string" ? v.text
              : typeof v.description === "string" ? v.description
              : undefined;
        const list = Array.isArray(v.list) ? v.list
                  : Array.isArray(v.items) ? v.items
                  : undefined;
        if (p || list) sections.push({ h: labelize(k), p, list });
      }
    });

  const summary =
    data.summary || data.description || data.overview || data.intro ||
    (sections.find((s) => s.p)?.p || "");

  return { summary, sections };
}

export default function GearScroll() {
  const { slug } = useParams();
  const nav = useNavigate();
  const raw = getGear(slug);

  // Normalize once
  const vm = useMemo(() => normalize(raw), [raw]);

  // Redirect back if not found (after paint)
  useEffect(() => {
    if (!raw) {
      const t = setTimeout(() => nav("/gear", { replace: true }), 0);
      return () => clearTimeout(t);
    }
  }, [raw, nav]);

  return (
    <ChamberLayout
      title={raw ? raw.title : "Loading…"}
      sub={vm.summary || ""}
      papa={<PapaMini line="Tools are a language—choose the one the water understands today." />}
    >
      {!raw ? (
        <div className="text-white/75">This scroll wasn’t found. Returning to Gear…</div>
      ) : vm.sections.length === 0 ? (
        <div className="text-white/70">
          No structured sections found. Add <code>summary</code> and <code>sections</code>,
          or keys like <code>when_to_use</code>, <code>gear_setup</code>, <code>technique</code>, <code>notes</code>, etc.—
          this page will pick them up automatically.
        </div>
      ) : (
        vm.sections.map((s, i) => (
          <section key={i} className="mb-6">
            {s.h && <h2 className="text-xl font-semibold">{s.h}</h2>}
            {s.p && <p className="text-white/80 mt-1">{s.p}</p>}
            {Array.isArray(s.list) && s.list.length > 0 && (
              <ul className="list-disc list-inside text-white/80 mt-1">
                {s.list.map((li, j) => <li key={j}>{li}</li>)}
              </ul>
            )}
          </section>
        ))
      )}

      <div className="mt-6">
        <button
          onClick={() => nav("/gear")}
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          ← Back to Gear
        </button>
      </div>
    </ChamberLayout>
  );
}
