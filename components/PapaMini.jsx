export default function PapaMini({ line="Walk lightly with the water today." }) {
  return (
    <div className="papa-badge">
      <img className="papa-img" src="/assets/papa/papa-avatar-sq-sm.png" alt="Papa" />
      <span>{line}</span>
    </div>
  );
}
