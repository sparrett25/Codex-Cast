import React, { useState } from 'react';
import TechniqueCard from '../components/Techniques/TechniqueCard';
import TechniqueDeepDivePortal from '../components/Techniques/TechniqueDeepDivePortal';
import '../styles/pages/techniques-guide.css';

import checkyourDrag from '../data/technique/checking-your-drag.json';
import catfishChum from '../data/technique/chumming-for-catfish.json';
import tilapiaFloat from '../data/technique/float-fishing-for-tilapia.json';
import fishHandling from '../data/technique/handling-and-releasing-fish.json';
import waterRead from '../data/technique/reading-the-water.json';
import redfishSight from '../data/technique/sight-casting-for-redfish.json';
import skippingDock from '../data/technique/skipping-soft-plastics-under-docks.json';
import artofCast from '../data/technique/the-art-of-the-cast.json';
import topwaterAmbush from '../data/technique/topwater-ambush-timing.json';
import usingSinkers from '../data/technique/using-sinkers-with-strategy.json';


const techniqueList = [
  checkyourDrag,
  catfishChum,
  tilapiaFloat,
  fishHandling,
  waterRead,
  redfishSight,
  skippingDock,
  artofCast,
  topwaterAmbush,
  usingSinkers
];

export default function TechniquesGuide() {
  const [activeTechnique, setActiveTechnique] = useState(null);

  const handleOpen = (techniqueData) => setActiveTechnique(techniqueData);
  const handleClose = () => setActiveTechnique(null);

  return (
    <div className="techniques-guide">
      <h1 className="page-title">Fishing Techniques</h1>
      <div className="technique-list">
        {techniqueList.map((technique) => (
          <TechniqueCard
            key={technique.name}
            item={technique}
            onExplore={() => handleOpen(technique)}
          />
        ))}
      </div>

      {activeTechnique && (
        <TechniqueDeepDivePortal
          techniqueData={activeTechnique}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
