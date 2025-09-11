import React from 'react';
import '../../styles/components/gear-scroll.css';

export default function SpinningRodScroll() {
  return (
    <div className="gear-scroll-container">
      <h1 className="scroll-title">Spinning Rod Scroll</h1>
      <div className="scroll-content">
        <p>
          The Spinning Rod is the versatile ally of both novice and seasoned anglers.
          Its design allows for light lures and precision casting, making it an ideal
          tool for finesse techniques and reactive strikes in open water.
        </p>
        <ul>
          <li><strong>Ideal Species:</strong> Bass, Tilapia, Panfish</li>
          <li><strong>Recommended Line:</strong> Monofilament or Light Fluorocarbon</li>
          <li><strong>Best Conditions:</strong> Clear waters, open banks, docks</li>
          <li><strong>Companion Techniques:</strong> Drop shotting, light jigging, soft plastics</li>
        </ul>
      </div>
    </div>
  );
}
