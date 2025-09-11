import React from 'react';
import '../../styles/components/species-scroll.css';

const SpeciesScroll = ({ speciesId }) => {
  // Placeholder content — replace with real data later
  const speciesData = {
    name: speciesId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    habitat: "Shallow freshwater lakes",
    bestBait: "Live worms or topwater lures",
    seasonality: "Spring and early summer",
    rating: "★★★★★",
  };

  return (
    <div className="species-scroll">
      <h3 className="scroll-heading">{speciesData.name}</h3>

      <div className="species-details">
        <p><strong>Habitat:</strong> {speciesData.habitat}</p>
        <p><strong>Best Bait:</strong> {speciesData.bestBait}</p>
        <p><strong>Seasonality:</strong> {speciesData.seasonality}</p>
        <p><strong>Culinary Rating:</strong> {speciesData.rating}</p>
      </div>

      <div className="scroll-whisper">
        <p><em>“Still waters conceal old truths.”</em> — Tairo</p>
      </div>
    </div>
  );
};

export default SpeciesScroll;
