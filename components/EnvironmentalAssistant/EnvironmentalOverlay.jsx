import React from 'react';

export default function EnvironmentalOverlay({ moon, wind, clarity }) {
  const getMoonSymbol = (phase) => {
    const glyphs = {
      'New Moon': '🌑',
      'Waxing Crescent': '🌒',
      'Full Moon': '🌕',
      'Waning Gibbous': '🌖'
    };
    return glyphs[phase] || '🌗';
  };

  const getWindSymbol = (wind) => {
    const swirls = {
      'Calm': '💨',
      'Light Breeze': '🌬️',
      'Strong Wind': '🌪️'
    };
    return swirls[wind] || '🌫️';
  };

  const getClarityStyle = (clarity) => {
    switch (clarity) {
      case 'Clear':
        return { opacity: 1 };
      case 'Murky':
        return { opacity: 0.6, filter: 'blur(1px)' };
      case 'Stained':
        return { opacity: 0.4, filter: 'blur(2px)' };
      default:
        return {};
    }
  };

  return (
    <div style={{
      marginTop: '20px',
      padding: '15px',
      borderRadius: '12px',
      background: '#111',
      ...getClarityStyle(clarity)
    }}>
      <h3>Environmental Overlay</h3>
      <div style={{ fontSize: '2rem' }}>
        Moon: {getMoonSymbol(moon)}<br />
        Wind: {getWindSymbol(wind)}
      </div>
      <p style={{ fontStyle: 'italic', opacity: 0.8 }}>
        Clarity: {clarity || 'Unknown'}
      </p>
    </div>
  );
}
