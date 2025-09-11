import React from 'react';
import '../../styles/components/Gear/gear-card.css';

export default function GearCard({ item, onExplore }) {
  return (
    <div className="gear-card">
      <img src={item.image} alt={item.name} className="gear-card-image" />
      <h3 className="gear-card-title">{item.name}</h3>
      <button className="gear-card-button" onClick={onExplore}>
        Explore Scroll
      </button>
    </div>
  );
}