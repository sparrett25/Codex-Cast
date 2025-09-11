import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/gear-scroll.css';

export default function BaitcastingReelScroll() {
  const navigate = useNavigate();

  return (
    <div className="scroll-container">
      <h1 className="scroll-title">🎣 Baitcasting Reel</h1>

      <section className="scroll-section">
        <h2>Overview</h2>
        <p>
          The baitcasting reel offers superior accuracy and control for experienced anglers. Designed for heavier
          lures and lines, it requires more practice but rewards you with precision.
        </p>
      </section>

      <section className="scroll-section">
        <h2>Ideal Use</h2>
        <ul>
          <li>Best for targeting: <strong>Bass, Catfish</strong></li>
          <li>Pairs well with: <em>Topwater lures, crankbaits, and spinnerbaits</em></li>
          <li>Optimal conditions: <em>Open water or structured cover</em></li>
        </ul>
      </section>

      <section className="scroll-section">
        <h2>Symbolic Reflection</h2>
        <blockquote>
          “Heavier lines cast further — but only with trust in your timing.”
        </blockquote>
        <p>
          The baitcaster teaches control, patience, and faith. The spool spins freely, just like your mind. Without
          alignment, both will tangle. But with awareness, they deliver force and grace.
        </p>
      </section>

      <section className="scroll-section">
        <h2>Tairo's Whisper</h2>
        <p className="tairo-whisper">
          “Do not overpower your cast. Let it unfurl in rhythm. The fish hears fear. The water listens for trust.”
        </p>
      </section>

      <div className="scroll-footer">
        <button onClick={() => navigate('/gear')}>Return to Gear Encyclopedia</button>
      </div>
    </div>
  );
}
