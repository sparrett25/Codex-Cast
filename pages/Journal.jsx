import React, { useState } from 'react';
import '../styles/pages/journal.css';

export default function Journal() {
  const [entry, setEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [tairoResponse, setTairoResponse] = useState('');

  const handleSubmit = () => {
    if (!entry.trim()) return;

    const savedEntry = {
      date: new Date().toISOString(),
      entry,
    };

    localStorage.setItem('cast_journal_entry_' + savedEntry.date, JSON.stringify(savedEntry));
    setTairoResponse(generateWhisper(entry));
    setSubmitted(true);
    setEntry('');
  };

  const generateWhisper = (text) => {
    const tone = text.toLowerCase().includes('patience') ? 'water' : text.length > 100 ? 'earth' : 'air';
    const whispers = {
      air: "In lightness, truth drifts gently.",
      water: "Still waters reflect even the restless mind.",
      earth: "Growth takes root in what you choose to notice.",
      fire: "What you burn away makes room for precision."
    };
    return whispers[tone];
  };

  return (
    <div className="journal-page">
      <h1 className="journal-title">Reflective Journal</h1>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="What did the water teach you today?"
      />
      <button onClick={handleSubmit}>Submit Reflection</button>

      {submitted && (
        <div className="journal-response">
          <h3>Tairo Responds:</h3>
          <blockquote>{tairoResponse}</blockquote>
        </div>
      )}
    </div>
  );
}
