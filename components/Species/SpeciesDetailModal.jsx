import React, { useState } from 'react';
import SpiralSymbolLink from '../Shared/SpiralSymbolLink';
import '../../styles/components/species.css';

export default function SpeciesDetailModal({ species, onClose }) {
  const [caught, setCaught] = useState(false);
  const [targeted, setTargeted] = useState(false);

  return (
    <div className="species-modal-overlay" onClick={onClose}>
      <div className="species-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{species.name}</h3>
        <p><strong>Habitat:</strong> {species.habitat}</p>
        <p><strong>Best Bait:</strong> {species.bait}</p>
        <p><strong>Season:</strong> {species.season}</p>
        <p className="species-whisper">𓂀 <em>{species.whisper}</em></p>

        <div className="species-status">
          <label>
            <input type="checkbox" checked={targeted} onChange={() => setTargeted(!targeted)} />
            Targeted
          </label>
          <label>
            <input type="checkbox" checked={caught} onChange={() => setCaught(!caught)} />
            Caught
          </label>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
          <SpiralSymbolLink to={species.scrollPath} />
        </div>
      </div>
    </div>
  );
}
