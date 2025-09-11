import React from 'react';
import '../../styles/components/Gear/gear-deep-dive.css';

export default function GearDeepDivePortal({ gearData, onClose }) {
  if (!gearData) return null;

  const {
    name,
    image,
    tone,
    description,
    purpose,
    pros,
    cons,
    techniques,
    whisper,
  } = gearData;

  return (
    <div className="gear-dive-overlay">
      <div className="gear-dive-container">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="gear-dive-header">
          <img src={image} alt={name} className="gear-image" />
          <h2 className={`gear-title tone-${tone}`}>{name}</h2>
        </div>

        <div className="gear-dive-section">
          <h3>Overview</h3>
          <p>{description}</p>
          <p className="gear-purpose"><em>{purpose}</em></p>
        </div>

        <div className="gear-dive-section">
          <h3>Pros</h3>
          <ul>{pros.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className="gear-dive-section">
          <h3>Cons</h3>
          <ul>{cons.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className="gear-dive-section">
          <h3>Techniques & Uses</h3>
          <ul>{techniques.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className="gear-dive-section whisper">
          <h3>Tairo's Whisper</h3>
          <blockquote>{whisper}</blockquote>
        </div>
      </div>
    </div>
  );
}
