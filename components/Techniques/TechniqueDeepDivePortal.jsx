import React from 'react';
import '../../styles/components/Techniques/technique-deep-dive.css';

export default function TechniqueDeepDivePortal({ techniqueData, onClose }) {
  if (!techniqueData) return null;

  const {
    name,
    tone,
    description,
    species,
    gear,
    environment,
    difficulty,
    steps,
    commonMistakes,
    journalPrompt,
    tairoGuidance,
    whisper,
  } = techniqueData;

  return (
    <div className="technique-dive-overlay">
      <div className="technique-dive-container">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="technique-dive-header">
          <h2 className={`technique-title tone-${tone}`}>{name}</h2>
          <p className="technique-description">{description}</p>
        </div>

        <div className="technique-dive-section">
          <h3>Target Species</h3>
          <ul>{species.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>

        <div className="technique-dive-section">
          <h3>Recommended Gear</h3>
          <ul>{gear.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </div>

        <div className="technique-dive-section">
          <h3>Environment</h3>
          <ul>{environment.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>

        <div className="technique-dive-section">
          <h3>Difficulty</h3>
          <p>{difficulty}</p>
        </div>

        <div className="technique-dive-section">
          <h3>Technique Steps</h3>
          <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>

        <div className="technique-dive-section">
          <h3>Common Mistakes</h3>
          <ul>{commonMistakes.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </div>

        <div className="technique-dive-section">
          <h3>Reflection Prompt</h3>
          <p><em>{journalPrompt}</em></p>
        </div>

        <div className="technique-dive-section">
          <h3>Tairo's Guidance</h3>
          <blockquote>{tairoGuidance}</blockquote>
        </div>

        <div className="technique-dive-section whisper">
          <h3>Whisper</h3>
          <blockquote>{whisper}</blockquote>
        </div>
      </div>
    </div>
  );
}
