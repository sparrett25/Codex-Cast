import React from 'react';
import SpeciesScroll from './SpeciesScroll';
import GearScroll from './GearScroll';
import EnvironmentalScroll from './EnvironmentalScroll';

import '../../styles/components/map-scroll-panel.css';

const MapScrollPanel = ({ pin, onClose }) => {
  if (!pin) return null;

  const renderScroll = () => {
    switch (pin.pinType) {
      case 'species':
        return <SpeciesScroll speciesId={pin.targetId} />;
      case 'gear':
        return <GearScroll gearId={pin.targetId} />;
      case 'environment':
        return <EnvironmentalScroll envId={pin.targetId} />;
      default:
        return <p className="unknown-scroll">Unknown scroll type.</p>;
    }
  };

  return (
    <div className="map-scroll-panel">
      <div className="scroll-header">
        <h2 className="scroll-title glow">{pin.title}</h2>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>

      <p className="scroll-description">{pin.description}</p>

      <div className="scroll-body">
        {renderScroll()}
      </div>

      <div className="tairo-whisper">
        <p><em>“Even here, the pattern remembers.”</em> — Tairo</p>
      </div>

      <button className="return-button" onClick={onClose}>
        Return to Map
      </button>
    </div>
  );
};

export default MapScrollPanel;
