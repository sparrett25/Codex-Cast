import React from 'react';
import '../../styles/components/gear-scroll.css';

export default function TopwaterLureScroll() {
  return (
    <div className="gear-scroll-container">
      <h1 className="scroll-title">Topwater Lure Scroll</h1>
      <div className="scroll-content">
        <p>
          Topwater lures are surface dancers — they disturb the calm, calling predators from below.
          Best used during low light, they embody excitement and anticipation.
        </p>
        <ul>
          <li><strong>Target Species:</strong> Largemouth Bass</li>
          <li><strong>Best Times:</strong> Early morning, late evening</li>
          <li><strong>Visual Cues:</strong> Splashes, wakes, surface swirls</li>
          <li><strong>Common Types:</strong> Poppers, frogs, buzzbaits</li>
        </ul>
      </div>
    </div>
  );
}
