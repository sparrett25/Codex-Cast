import React from 'react';
import '../styles/pages/environmental-page.css';

export default function EnvironmentalPage() {
  const data = {
    moonPhase: 'Waxing Crescent',
    tide: 'Incoming',
    wind: '6 mph NE',
    temperature: '72°F',
  };

  return (
    <div className="environmental-container">
      <h2 className="environmental-title">🌒 Environmental Assistant</h2>
      <div className="env-grid">
        <div className="env-card">
          <div className="env-label">Moon Phase</div>
          <div className="env-value">{data.moonPhase}</div>
        </div>
        <div className="env-card">
          <div className="env-label">Tide</div>
          <div className="env-value">{data.tide}</div>
        </div>
        <div className="env-card">
          <div className="env-label">Wind</div>
          <div className="env-value">{data.wind}</div>
        </div>
        <div className="env-card">
          <div className="env-label">Temperature</div>
          <div className="env-value">{data.temperature}</div>
        </div>
      </div>
    </div>
  );
}
