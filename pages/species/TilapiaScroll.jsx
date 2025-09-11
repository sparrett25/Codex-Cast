import React from 'react';
import '../../styles/components/gear-scroll.css';

export default function TilapiaScroll() {
  return (
    <div className="gear-scroll-container">
      <h1 className="scroll-title">Tilapia Scroll</h1>
      <div className="scroll-content">
        <p>
          Tilapia are calm feeders and prefer warmer, shallower waters. They feed on algae,
          small insects, and vegetation, and are best approached with patience and silence.
        </p>
        <ul>
          <li><strong>Best Baits:</strong> Corn, dough, worms</li>
          <li><strong>Habitat:</strong> Shallow edges, warm coves</li>
          <li><strong>Seasons:</strong> Peak in summer and late spring</li>
          <li><strong>Behavior:</strong> Passive, grazing patterns</li>
        </ul>
      </div>
    </div>
  );
}
