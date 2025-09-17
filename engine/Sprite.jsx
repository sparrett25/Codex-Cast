// src/cast/engine/Sprite.jsx
export default function Sprite({ src, x, y, className="" }) {
  return (
    <img
      src={src}
      alt=""
      className={`absolute ${className}`}
      style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}
    />
  );
}
