import React from 'react';
import '../../styles/components/Species/species-deep-dive.css';

export default function SpeciesDeepDivePortal({ speciesData, onClose }) {
  if (!speciesData) return null;

  const {
    name,
    image,
    tone,
    description,
    behavior,
    conditions,
    gear,
    techniques,
    whisper,
  } = speciesData;

  return (
    <div className="species-dive-overlay">
      <div className="species-dive-container">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="species-dive-header">
          <img src={image} alt={name} className="species-image" />
          <h2 className={`species-title tone-${tone}`}>{name}</h2>
        </div>

        <div className="species-dive-section">
          <h3>Overview</h3>
          <p>{description}</p>
          <p className="behavior-note"><em>{behavior}</em></p>
        </div>

        <div className="species-dive-section">
          <h3>Optimal Conditions</h3>
          <ul>
            <li><strong>Time:</strong> {conditions.time}</li>
            <li><strong>Water Temp:</strong> {conditions.temperature}</li>
            <li><strong>Moon Phase:</strong> {conditions.moon}</li>
            <li><strong>Tide:</strong> {conditions.tide}</li>
            <li><strong>Weather:</strong> {conditions.weather}</li>
          </ul>
        </div>

        <div className="species-dive-section">
          <h3>Recommended Gear</h3>
          <ul>
            {gear.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="species-dive-section">
          <h3>Techniques</h3>
          <ul>
            {techniques.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="species-dive-section whisper">
          <h3>Tairo's Whisper</h3>
          <blockquote>{whisper}</blockquote>
        </div>
      </div>
    </div>
  );
}
