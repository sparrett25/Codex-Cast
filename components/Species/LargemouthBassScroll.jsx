
import React from 'react';
import '../../styles/components/species-scroll.css';

export default function LargemouthBassScroll({ onClose }) {
  return (
    <div className="species-scroll">
      <div className="scroll-header">
        <h2>🐟 Scroll of the Largemouth Bass</h2>
        <button onClick={onClose}>✖ Close</button>
      </div>

      <section>
        <h3>🌍 Region & Habitat</h3>
        <p>Southeastern U.S., especially Florida and Texas. Prefers freshwater lakes, ponds, rivers, and vegetated shallows with submerged cover.</p>
      </section>

      <section>
        <h3>📏 Size Profile</h3>
        <ul>
          <li><strong>Average Size</strong>: 1–5 lbs</li>
          <li><strong>Trophy Size</strong>: 8+ lbs</li>
          <li><strong>Legal Range (FL)</strong>: 12" minimum</li>
        </ul>
      </section>

      <section>
        <h3>🧠 Seasonal Behavior Timeline</h3>
        <table>
          <thead><tr><th>Season</th><th>Behavior</th><th>Strategy</th></tr></thead>
          <tbody>
            <tr><td>Spring</td><td>Shallow, bedding</td><td>Sight fishing, slow plastics</td></tr>
            <tr><td>Summer</td><td>Deep mid-day</td><td>Topwater early, deep cranks later</td></tr>
            <tr><td>Fall</td><td>Feeding aggressively</td><td>Spinnerbaits, baitfish patterns</td></tr>
            <tr><td>Winter</td><td>Lethargic</td><td>Slow jigs, finesse baits</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>🎣 Gear Synergy Matrix</h3>
        <table>
          <thead><tr><th>Condition</th><th>Gear</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>Murky Water</td><td>Spinnerbait + Braid</td><td>Vibration + visibility</td></tr>
            <tr><td>Clear Water</td><td>Senko + Fluoro</td><td>Subtle natural look</td></tr>
            <tr><td>Heavy Cover</td><td>Texas Rig + Braid</td><td>Weedless + power</td></tr>
            <tr><td>Morning</td><td>Topwater + Mono</td><td>Surface control</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>🔄 Tactical Scenarios</h3>
        <ul>
          <li><strong>Overcast Morning</strong>: Topwater near cover</li>
          <li><strong>Windy Afternoon</strong>: Slow-rolled spinnerbait</li>
          <li><strong>Midday Summer</strong>: Deep jig, rock points</li>
        </ul>
      </section>

      <section>
        <h3>🌬 Environmental Influence</h3>
        <p>Ideal temps 60–75°F, overcast skies, low current. Avoid sudden cold fronts or pressure spikes.</p>
      </section>

      <section>
        <h3>🔗 Related Scrolls</h3>
        <ul>
          <li>Gear: Spinnerbait, Senko Worm, Braided Line</li>
          <li>Environment: Wind, Docks, Moon Phase</li>
          <li>Locations: Riverview Park, Lake Sapphire</li>
        </ul>
      </section>

      <section>
        <h3>🌬 Whisper from Tairo</h3>
        <blockquote>
          “Do not rush. The bass teaches not the thrill of motion — but the power of stillness.
          It strikes when the pattern reveals itself. Not before. So must you.”
        </blockquote>
      </section>

      <section>
        <h3>🌀 Tone Alignment</h3>
        <p><strong>Reflective</strong>: Revisiting lessons<br/>
           <strong>Focused</strong>: Testing a spot<br/>
           <strong>Excited</strong>: When the water breaks</p>
      </section>
    </div>
  );
}
