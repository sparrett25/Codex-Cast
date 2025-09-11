import React from 'react';
import '../../styles/components/gear-scroll.css';

export default function LargemouthBassScroll() {
  return (
    <div className="gear-scroll-container">
      <h1 className="scroll-title">Largemouth Bass Scroll</h1>
      <div className="scroll-content">
        <p>
          The Largemouth Bass is a bold and reactive predator. Found in lakes, ponds, and rivers,
          it often hides in submerged structures and ambushes its prey.
        </p>
        <ul>
          <li><strong>Best Baits:</strong> Jigs, soft plastics, crankbaits</li>
          <li><strong>Habitat:</strong> Shaded areas, weeds, fallen timber</li>
          <li><strong>Seasons:</strong> Spring and Fall are most active</li>
          <li><strong>Behavior:</strong> Aggressive, territorial</li>
        </ul>
      </div>
    </div>
  );
}
