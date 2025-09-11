import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpiralSymbolLink from '../Shared/SpiralSymbolLink';
import '../../styles/components/gear-modal.css'; 

export default function GearDetailModal({ gear, onClose }) {
  const navigate = useNavigate();

  return (
    <div className="gear-modal-overlay" onClick={onClose}>
      <div className="gear-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{gear.name}</h3>
        <p><strong>Type:</strong> {gear.type}</p>
        <p>{gear.description}</p>
        <p><strong>Best for:</strong> {gear.species?.join(', ')}</p>

        {gear.tairo && (
          <p className="tairo-whisper">𓂀 <em>{gear.tairo}</em></p>
        )}

        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>Close</button>
          {gear.scrollPath && (
            <SpiralSymbolLink to={gear.scrollPath} />
          )}
        </div>
      </div>
    </div>
  );
}