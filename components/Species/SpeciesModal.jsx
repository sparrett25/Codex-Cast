import React from 'react';
import speciesData from '../../data/speciesData';
import gearData from '../../data/gearData';
import GearCard from '../Gear/GearCard';
import '../../styles/components/species-modal.css';

export default function SpeciesModal({ speciesId, onClose }) {
  const species = speciesData.find(s => s.id === speciesId);
  const relatedGear = gearData.filter(g => species.recommendedGear.includes(g.id));

  return (
    <div className="species-modal-overlay" onClick={onClose}>
      <div className="species-modal" onClick={e => e.stopPropagation()}>
        <h3>{species.name}</h3>
        <p>{species.description}</p>
        <p><strong>Conditions:</strong> {species.bestConditions}</p>
        <p><strong>Preferred Bait:</strong> {species.preferredBait}</p>
        <div className="gear-section">
          <p><strong>Recommended Gear:</strong></p>
          <div className="gear-card-grid">
            {relatedGear.map(g => (
              <GearCard key={g.id} item={g} onClick={() => window.location.href = '/gear'} />
            ))}
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
