import React, { useState } from 'react';
import GearCard from '../components/Gear/GearCard';
import '../styles/pages/gear-guide.css';
import GearDeepDivePortal from '../components/Gear/GearDeepDivePortal';

import baitcastingReel from '../data/gear/baitcasting-reel.json';

import spinnerbait from '../data/gear/spinnerbait.json';
import softPlasticWorm from '../data/gear/soft-plastic-worm.json';
import topwaterFrog from '../data/gear/topwater-frog.json';
import fluorocarbonLine from '../data/gear/fluorocarbon-line.json';
import ultralightRod from '../data/gear/ultralight-spinning-rod.json';
import mediumHeavyRod from '../data/gear/medium-heavy-baitcasting-rod.json';
import spinningReel from '../data/gear/spinning-reel.json';
import braidedLine from '../data/gear/braided-line.json';
import monofilamentLine from '../data/gear/monofilament-line.json';

const gearList = [
  baitcastingReel,
  spinnerbait,
  softPlasticWorm,
  topwaterFrog,
  fluorocarbonLine,
  ultralightRod,
  mediumHeavyRod,
  spinningReel,
  braidedLine,
  monofilamentLine
];


export default function GearGuide() {
  const [activeGear, setActiveGear] = useState(null);

  const handleOpen = (gearData) => setActiveGear(gearData);
  const handleClose = () => setActiveGear(null);

  return (
    <div className="gear-guide">
      <h1 className="page-title">Gear & Techniques</h1>
      <div className="gear-list">
        {gearList.map((gear) => (
          <GearCard
            key={gear.name}
            item={gear}
            onExplore={() => handleOpen(gear)}
          />
        ))}
      </div>

      {activeGear && (
        <GearDeepDivePortal
          gearData={activeGear}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
