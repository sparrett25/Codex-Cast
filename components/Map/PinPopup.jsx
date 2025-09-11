import React from 'react';
import SpeciesModal from '../Species/SpeciesModal';
import GearModal from '../Gear/GearModal';
//import EnvironmentModal from '../EnvironmentalAssistant/EnvironmentModal';

const PinPopup = ({ pin, onClose }) => {
  const scrollType = pin?.properties?.scrollType || 'unknown';
  const title = pin?.properties?.title || 'Unknown Location';
  const description = pin?.properties?.description || '';
  const species = pin?.properties?.species || [];
  const gear = pin?.properties?.gear || null;
  const environment = pin?.properties?.environment || null;

  const renderScroll = () => {
    switch (scrollType.toLowerCase()) {
      case 'species':
        return <SpeciesModal species={species} />;
      case 'gear':
        return <GearModal gear={gear} />;
      case 'environment':
        return <EnvironmentModal data={environment} />;
      default:
        return (
          <div className="unknown-scroll">
            <p>Unknown scroll type.</p>
            <p className="scroll-whisper">“This location awaits deeper remembrance. Add a scroll type to awaken it.”</p>
          </div>
        );
    }
  };

  return (
    <div className="pin-popup">
      <div className="popup-header">
        <h2>{title}</h2>
        <button onClick={onClose} className="close-button">✕</button>
      </div>
      <p><em>{description}</em></p>
      <div className="popup-scroll-content">
        {renderScroll()}
      </div>
      <footer className="popup-footer">
        <p><em>“Even here, the pattern remembers.” — Tairo</em></p>
        <button className="return-button" onClick={onClose}>Return to Map</button>
      </footer>
    </div>
  );
};

export default PinPopup;