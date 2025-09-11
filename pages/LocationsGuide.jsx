import React, { useState } from 'react';
import LocationCard from '../components/Locations/LocationCard';
import LocationDeepDivePortal from '../components/Locations/LocationDeepDivePortal';

import alafiaRiver from '../data/locations/alafia-river-scroll.json';
import cockroachBay from '../data/locations/cockroach-bay-scroll.json';


const locationList = [
  alafiaRiver,
  cockroachBay
];

export default function LocationGuide() {
  const [activeLocation, setActiveLocation] = useState(null);

  const handleOpen = (locationData) => setActiveLocation(locationData);
  const handleClose = () => setActiveLocation(null);

  return (
    <div className="location-guide">
      <h1 className="page-title">Fishing Spots</h1>
      <div className="location-list">
        {locationList.map((location) => (
          <LocationCard
            key={location.name}
            item={location}
            onExplore={() => handleOpen(location)}
          />
        ))}
      </div>

      {activeLocation && (
        <LocationDeepDivePortal
          locationData={activeLocation}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
