
import React from 'react';
import '../../styles/components/gear-scroll.css';

export default function SpinnerbaitScroll({ onClose }) {
  return (
    <div className="gear-scroll">
      <div className="scroll-header">
        <h2>🎣 Scroll of the Spinnerbait</h2>
        <button onClick={onClose}>✖ Close</button>
      </div>

      <section>
        <h3>🎣 Gear Identity</h3>
        <p>
          The Spinnerbait is a wire-formed bait with spinning blades, a skirt, and sometimes a trailer.
          It mimics fleeing baitfish through vibration and flash.
        </p>
        <ul>
          <li>Blade Types: Willow (flash), Colorado (vibration), Indiana (balance)</li>
          <li>Skirt Colors: White/chartreuse, black/blue, natural silver</li>
          <li>Sizes: ⅜ oz to ¾ oz common for bass</li>
        </ul>
      </section>

      <section>
        <h3>🧠 Use Strategy</h3>
        <p>Retrieve slow and steady near cover. Mix in pulses to simulate erratic baitfish. Avoid fast retrieves in cold water or clear conditions.</p>
        <ul>
          <li>Common Mistakes:</li>
          <li>• Retrieving too fast in pressured waters</li>
          <li>• Oversized blades in clear water</li>
          <li>• Poor color match to water clarity</li>
        </ul>
      </section>

      <section>
        <h3>🔁 Gear Synergy</h3>
        <table>
          <thead><tr><th>Component</th><th>Recommended</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>Rod</td><td>6’6"–7’ Medium-Heavy</td><td>Strength & control near cover</td></tr>
            <tr><td>Line</td><td>12–17 lb fluoro or 30–40 lb braid</td><td>Durability & sensitivity</td></tr>
            <tr><td>Trailer</td><td>Paddle-tail or split-tail grub</td><td>Adds action and bulk</td></tr>
            <tr><td>Reel</td><td>6.4:1 to 7.1:1</td><td>Control over speed and depth</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>🌍 Environmental Matching</h3>
        <ul>
          <li><strong>Murky Water</strong>: Bright skirt + Colorado blade</li>
          <li><strong>Clear Water</strong>: Natural skirt + Willow blade</li>
          <li><strong>Windy Shoreline</strong>: ½–¾ oz bait for stability</li>
          <li><strong>Low Light</strong>: Gold blades + contrast skirts</li>
          <li><strong>Cold Front</strong>: Downsize and slow down</li>
        </ul>
      </section>

      <section>
        <h3>🌀 Tactical Use Scenarios</h3>
        <ul>
          <li><strong>Foggy Morning</strong>: Subtle gold blades near cover</li>
          <li><strong>Windy Afternoon</strong>: Fast retrieve on wind-blown points</li>
          <li><strong>Post-Spawn</strong>: Slow roll near docks and weedlines</li>
        </ul>
      </section>

      <section>
        <h3>🔗 Related Scrolls</h3>
        <ul>
          <li>Species: Largemouth Bass, Pike</li>
          <li>Gear: Fluorocarbon Line, Medium-Heavy Rod</li>
          <li>Environment: Wind, Vegetation</li>
        </ul>
      </section>

      <section>
        <h3>🌬 Whisper from Tairo</h3>
        <blockquote>
          “The spinnerbait is not loud by volume — but by intention. 
          It is motion, rhythm, shimmer. It speaks to those below the surface who are waiting for a signal.”
        </blockquote>
      </section>

      <section>
        <h3>🌀 Tone Alignment</h3>
        <p>
          <strong>Reflective</strong>: Testing favorite spots with intent<br />
          <strong>Focused</strong>: Locating active fish across zones<br />
          <strong>Excited</strong>: When the surface explodes and rhythm rules
        </p>
      </section>
    </div>
  );
}
