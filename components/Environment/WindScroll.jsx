
import React from 'react';
import '../../styles/components/environment-scroll.css';

export default function WindScroll({ onClose }) {
  return (
    <div className="environment-scroll">
      <div className="scroll-header">
        <h2>🌬 Scroll of the Wind</h2>
        <button onClick={onClose}>✖ Close</button>
      </div>

      <section>
        <h3>🌬 Wind Identity</h3>
        <p>
          Wind is not just a disturbance — it is a messenger. It stirs the surface, moves baitfish,
          oxygenates water, and shapes where predators wait.
          It affects cast angles, boat position, and lure control — and when understood, it reveals where life concentrates.
        </p>
      </section>

      <section>
        <h3>🧠 Strategic Impact</h3>
        <table>
          <thead><tr><th>Wind Speed</th><th>Surface</th><th>Fish Behavior</th><th>Strategy</th></tr></thead>
          <tbody>
            <tr><td>Calm</td><td>Glassy</td><td>Fish cautious, scattered</td><td>Finesse, natural baits</td></tr>
            <tr><td>Light Breeze</td><td>Ripples</td><td>Bass roam, follow bait schools</td><td>Search with spinnerbait or crankbait</td></tr>
            <tr><td>Moderate</td><td>Chop</td><td>Ambush zones form, fish active</td><td>Cast into wind-blown banks</td></tr>
            <tr><td>Strong</td><td>Turbulent</td><td>Shelter-seeking, deeper holding</td><td>Heavy jigs, slow presentations</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>⚖️ Gear Adjustment Tips</h3>
        <ul>
          <li>Use heavier line to reduce wind loops</li>
          <li>Longer rods help control windy casts</li>
          <li>Heavier lures (½–¾ oz) maintain contact</li>
          <li>Adjust brake systems on reels to prevent backlash</li>
        </ul>
      </section>

      <section>
        <h3>🌀 Wind Use Scenarios</h3>
        <ul>
          <li><strong>Wind-blown Points</strong>: Fish stage downcurrent — cast across or into wind</li>
          <li><strong>Midday Chop</strong>: Spinnerbaits excel; avoid topwater in open water</li>
          <li><strong>Opposing Wind & Current</strong>: Use bottom contact baits for control</li>
        </ul>
      </section>

      <section>
        <h3>🔗 Related Scrolls</h3>
        <ul>
          <li>Species: Largemouth Bass, Striped Bass</li>
          <li>Gear: Spinnerbait, Medium-Heavy Rod, Braided Line</li>
          <li>Locations: Wind-facing points, Vegetated banks</li>
        </ul>
      </section>

      <section>
        <h3>🌬 Whisper from Tairo</h3>
        <blockquote>
          “You do not fight the wind. You angle with it.
          Let it push you to new alignments. Let it teach you when to cast harder… and when to let go.”
        </blockquote>
      </section>

      <section>
        <h3>🌀 Tone Alignment</h3>
        <p>
          <strong>Reflective</strong>: Reading the water’s voice in the breeze<br />
          <strong>Focused</strong>: Casting across edges with intention<br />
          <strong>Excited</strong>: Feeling life erupt under sudden gusts
        </p>
      </section>
    </div>
  );
}
