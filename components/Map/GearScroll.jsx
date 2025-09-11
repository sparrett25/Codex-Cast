import React from 'react';
import '../../styles/components/gear-scroll.css';

const GearScroll = ({ gearId }) => {
  // Placeholder logic — can later fetch gear info by ID
  const gearData = {
    name: gearId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    type: "Baitcasting Reel",
    usage: "Ideal for precision casting in cover",
    pros: "High control, powerful retrieve",
    cons: "Requires experience to avoid backlash",
  };

  return (
    <div className="gear-scroll">
      <h3 className="scroll-heading">{gearData.name}</h3>

      <div className="gear-details">
        <p><strong>Type:</strong> {gearData.type}</p>
        <p><strong>Usage:</strong> {gearData.usage}</p>
        <p><strong>Pros:</strong> {gearData.pros}</p>
        <p><strong>Cons:</strong> {gearData.cons}</p>
      </div>

      <div className="scroll-whisper">
        <p><em>“A tool is only as silent as its user.”</em> — Tairo</p>
      </div>
    </div>
  );
};

export default GearScroll;
