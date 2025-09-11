// /components/Environment/MoonOverlay.jsx
import React from 'react';
import overlayData from './overlayData.json';
import { useScrollModal } from '../../context/ScrollModalContext';

export default function MoonOverlay() {
  const moonPhase = overlayData.moon;
  const { openScroll } = useScrollModal();

  return (
    <div className="moon-overlay">
      <div className="moon-tooltip">
        🌕 {moonPhase} <button onClick={() => openScroll('moon')}>View Scroll</button>
      </div>
    </div>
  );
}