import React, { useState } from 'react';
import '../styles/pages/mirror-lake.css';

const speciesOptions = [
   { name: 'Largemouth Bass', icon: '/images/species-icons/largemouth-bass.png' },
  { name: 'Tilapia', icon: '🐠' },
  { name: 'Catfish', icon: '🐡' },
   { name: 'Redfish', icon: '/images/species-icons/redfish.png' },
  { name: 'Snook', icon: '/images/species-icons/snook.png' },
  { name: 'Black Drum', icon: '🎵' },
  { name: 'Bluegill', icon: '🔷' },
  { name: 'Bowfin', icon: '🌀' },
  { name: 'Channel Catfish', icon: '🌊' },
  { name: 'Crappie', icon: '🎯' },
  { name: 'Crevalle Jack', icon: '🟡' },
  { name: 'Sheepshead', icon: '🐏' },
  { name: 'Spotted Seatrout', icon: '🔵' },
  { name: 'Sunshine Bass', icon: '☀️' }
];


export default function MirrorLake() {
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const handleSelect = (species) => {
    setSelectedSpecies(species);
    localStorage.setItem('cast_selected_species', JSON.stringify(species));
    const lake = document.querySelector('.mirror-lake-container');
    lake.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = '/journal';
    }, 1000);
  };

  return (
    <div className="mirror-lake-container">
      <div className="lake-overlay" />
      <div className="lake-whisper">
        {!selectedSpecies && <p>These waters remember. What will you cast?</p>}
        {selectedSpecies && <p>You chose: {selectedSpecies.name}</p>}
      </div>
      <div className="species-ripples">
        {speciesOptions.map((s, index) => (
          <button key={s.name} className="ripple-button" style={{ animationDelay: `${index * 0.3}s` }} onClick={() => handleSelect(s)}>
            <span className="ripple-icon">
  {s.icon.endsWith('.png') ? (
    <img src={s.icon} alt={s.name} className="species-icon" />
  ) : (
    s.icon
  )}
</span>

            <span className="ripple-name">{s.name}</span>
          </button>
        ))}
      </div>
      <audio autoPlay loop className="lake-audio">
        <source src="/ambient-water.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
