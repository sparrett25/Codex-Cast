// /components/Environment/TimeOverlay.jsx
import React from 'react';
import overlayData from './overlayData.json';
import { useScrollModal } from '../../context/ScrollModalContext';

export default function TimeOverlay() {
  const { openScroll } = useScrollModal();
  return (
    <div className="moon-overlay">
      <div className="moon-tooltip">
        🕐 {overlayData.time_of_day} <button onClick={() => openScroll('time')}>View Scroll</button>
      </div>
    </div>
  );
}
