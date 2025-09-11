import React, { useEffect, useState } from 'react';
import '../../styles/components/environmental-overlay.css';
import { getMockConditions } from '../../data/environmentalConditions';

const EnvironmentalOverlay = ({ map }) => {
  const [conditions, setConditions] = useState(null);

  useEffect(() => {
    if (!map) return;

    const loadConditions = async () => {
      const data = await getMockConditions();
      setConditions(data);

      map.on('load', () => {
        if (data.moon) {
          // Example: Add moon overlay
          map.addSource('moon-phase', {
            type: 'geojson',
            data: data.moon.geojson,
          });
          map.addLayer({
            id: 'moon-phase-layer',
            type: 'symbol',
            source: 'moon-phase',
            layout: {
              'icon-image': 'moon-icon',
              'icon-size': 0.5,
            },
          });
        }

        // Placeholder: Tide, temperature, wind can follow similar structure
      });
    };

    loadConditions();
  }, [map]);

  return (
    <div className="environmental-overlay">
      <h3>Environmental Layers</h3>
      <div className="overlay-controls">
        <button className="glyph-button">🌘</button>
        <button className="glyph-button">🌊</button>
        <button className="glyph-button">🌡️</button>
        <button className="glyph-button">💨</button>
      </div>
    </div>
  );
};

export default EnvironmentalOverlay;