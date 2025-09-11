// /components/Environment/WindOverlay.jsx
import React from 'react';
import overlayData from './overlayData.json';
import { useScrollModal } from '../../context/ScrollModalContext';

export default function WindOverlay() {
  const { openScroll } = useScrollModal();
  return (
    <div className="moon-overlay">
      <div className="moon-tooltip">
        💨 {overlayData.wind} <button onClick={() => openScroll('wind')}>View Scroll</button>
      </div>
    </div>
  );
}
