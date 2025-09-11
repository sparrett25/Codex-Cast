import React from 'react';
import '../../styles/components/Techniques/technique-card.css';

export default function TechniqueCard({ item, onExplore }) {
  return (
    <div className="technique-card">
      <h3 className="technique-card-title">{item.name}</h3>
      <p className="technique-card-summary">{item.description}</p>
      <button className="technique-card-button" onClick={onExplore}>
        Explore Technique
      </button>
    </div>
  );
}
