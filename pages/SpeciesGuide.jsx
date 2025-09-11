import React, { useState } from 'react';
import SpeciesCard from '../components/Species/SpeciesCard';
import '../styles/pages/species-guide.css';

import SpeciesDeepDivePortal from '../components/Species/SpeciesDeepDivePortal';

import largemouthBass from '../data/species/largemouth-bass.json';
import tilapia from '../data/species/tilapia.json';
import snook from '../data/species/snook.json';
import redfish from '../data/species/redfish.json';
import catfish from '../data/species/catfish.json';

const speciesList = [
  largemouthBass,
  tilapia,
  snook,
  redfish,
  catfish,
];

export default function SpeciesGuide() {
  const [activeSpecies, setActiveSpecies] = useState(null);

  const handleOpen = (speciesData) => setActiveSpecies(speciesData);
  const handleClose = () => setActiveSpecies(null);

  return (
    <div className="species-guide">
      <h1 className="page-title">Species Guide</h1>
      <div className="species-list">
        {speciesList.map((species) => (
          <SpeciesCard
            key={species.name}
            name={species.name}
            image={species.image}
            onExplore={() => handleOpen(species)}
          />
        ))}
      </div>

      {activeSpecies && (
        <SpeciesDeepDivePortal
          speciesData={activeSpecies}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
