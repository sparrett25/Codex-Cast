import React from 'react';
import '../../styles/components/Species/species-card.css';

export default function SpeciesCard({ name, image, onExplore }) {
  return (
    <div className="species-card">
      <img src={image} alt={name} className="species-card-image" />
      <h3 className="species-card-title">{name}</h3>
      <button className="species-card-button" onClick={onExplore}>
        Explore Scroll
      </button>
    </div>
  );
}
