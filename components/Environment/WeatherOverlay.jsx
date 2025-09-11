// /components/Environment/WeatherOverlay.jsx
import React from 'react';
import overlayData from './overlayData.json';
import { useScrollModal } from '../../context/ScrollModalContext';

export default function WeatherOverlay() {
  const { openScroll } = useScrollModal();
  return (
    <div className="moon-overlay">
      <div className="moon-tooltip">
        ☁️ {overlayData.weather} <button onClick={() => openScroll('weather')}>View Scroll</button>
      </div>
    </div>
  );
}
