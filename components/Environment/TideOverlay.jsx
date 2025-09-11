// /components/Environment/TideOverlay.jsx
import React from 'react';
import overlayData from './overlayData.json';
import { useScrollModal } from '../../context/ScrollModalContext';

export default function TideOverlay() {
  const { openScroll } = useScrollModal();
  return (
    <div className="moon-overlay">
      <div className="moon-tooltip">
        🌊 {overlayData.tide} <button onClick={() => openScroll('tide')}>View Scroll</button>
      </div>
    </div>
  );
}
