// /components/Environment/EnvironmentalControlPanel.jsx
import React, { useState } from 'react';
import MoonOverlay from './MoonOverlay';
import TideOverlay from './TideOverlay';
import WindOverlay from './WindOverlay';
import WeatherOverlay from './WeatherOverlay';
import TimeOverlay from './TimeOverlay';
import TemperatureOverlay from './TemperatureOverlay';
import '../../styles/components/environment-overlay.css';

export default function EnvironmentalControlPanel() {
  const [showMoon, setShowMoon] = useState(true);
  const [showTide, setShowTide] = useState(true);
  const [showWind, setShowWind] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showTemp, setShowTemp] = useState(false);

  return (
    <div className="environment-panel">
      <label>
        <input
          type="checkbox"
          checked={showMoon}
          onChange={() => setShowMoon(!showMoon)}
        />
        Moon Phase
      </label>
      <label>
        <input
          type="checkbox"
          checked={showTide}
          onChange={() => setShowTide(!showTide)}
        />
        Tide
      </label>
      <label>
        <input
          type="checkbox"
          checked={showWind}
          onChange={() => setShowWind(!showWind)}
        />
        Wind
      </label>
      <label>
        <input
          type="checkbox"
          checked={showWeather}
          onChange={() => setShowWeather(!showWeather)}
        />
        Weather
      </label>
      <label>
        <input
          type="checkbox"
          checked={showTime}
          onChange={() => setShowTime(!showTime)}
        />
        Time of Day
      </label>
      <label>
        <input
          type="checkbox"
          checked={showTemp}
          onChange={() => setShowTemp(!showTemp)}
        />
        Temperature
      </label>

      {showMoon && <MoonOverlay />}
      {showTide && <TideOverlay />}
      {showWind && <WindOverlay />}
      {showWeather && <WeatherOverlay />}
      {showTime && <TimeOverlay />}
      {showTemp && <TemperatureOverlay />}
    </div>
  );
}
