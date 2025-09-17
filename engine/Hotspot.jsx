// src/cast/engine/Hotspot.jsx
export function Hotspot({ x, y, label, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/35 text-white text-xs px-2 py-1 hover:bg-black/55"
      style={{ left: x, top: y }}
    >
      {label}
    </button>
  );
}
