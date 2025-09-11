import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import speciesData from '../components/Species/speciesData';
import gearData from '../components/Gear/gearData';
// Placeholder for future environment data import
// import environmentData from '../components/EnvironmentalAssistant/environmentData';

import '../styles/components/deep-dive-portal.css';

export default function DeepDivePortal() {
  const { type, id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    let dataSource;
    if (type === 'species') dataSource = speciesData;
    else if (type === 'gear') dataSource = gearData;
    // else if (type === 'environment') dataSource = environmentData;

    if (dataSource) {
      const match = dataSource.find(item =>
        item.id === id || item.name.toLowerCase().replace(/\\s+/g, '-') === id.toLowerCase()
      );
      setEntry(match);
    }
  }, [type, id]);

  if (!entry) {
    return <div className="deep-dive-loading">Loading deep scroll...</div>;
  }

  return (
    <div className="deep-dive-portal">
      <div className="deep-dive-sidebar">
        <div className="glyph-display">𓂀</div>
        <div className="tone-indicator">{entry.tone || 'resonant'}</div>
      </div>

      <div className="deep-dive-content">
        <h1 className="scroll-title">{entry.name}</h1>
        <p className="scroll-description">{entry.description}</p>

        {entry.tips && Array.isArray(entry.tips) && (
          <ul className="scroll-tips">
            {entry.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="deep-dive-whisper">
        <p className="whisper-box">
          Tairo whispers:
          <em> "{entry.whisper || 'Observe the rhythm. The pattern always returns to the water.'}"</em>
        </p>
      </div>
    </div>
  );
}
