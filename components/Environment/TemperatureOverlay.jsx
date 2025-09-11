// /components/Environment/TemperatureOverlay.jsx
import React from 'react';
import overlayData from './overlayData.json';
import { useScrollModal } from '../../context/ScrollModalContext';

export default function TemperatureOverlay() {
  const { openScroll } = useScrollModal();
  return (
    <div className="moon-overlay">
      <div className="moon-tooltip">
        🌡️ {overlayData.temperature} <button onClick={() => openScroll('temperature')}>View Scroll</button>
      </div>
    </div>
  );
}
