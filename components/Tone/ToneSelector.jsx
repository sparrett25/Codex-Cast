import React from 'react';

const tones = [
  { value: 'Calm', emoji: '🌊' },
  { value: 'Focused', emoji: '🎯' },
  { value: 'Frustrated', emoji: '😣' },
  { value: 'Joyful', emoji: '😊' },
  { value: 'Reflective', emoji: '🪞' },
  { value: 'Grateful', emoji: '🙏' }
];

export default function ToneSelector({ tone, setTone }) {
  return (
    <div className="tone-selector">
      <label htmlFor="tone">Mood / Tone:</label>
      <select
        id="tone"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option value="">Select a tone...</option>
        {tones.map((tone) => (
          <option key={tone.value} value={tone.value}>
            {tone.emoji} {tone.value}
          </option>
        ))}
      </select>
    </div>
  );
}
