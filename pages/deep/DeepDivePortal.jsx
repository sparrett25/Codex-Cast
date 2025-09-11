import React from 'react';
import { useParams } from 'react-router-dom';
import { scrolls } from '../../data/scrolls';
import '../../styles/components/deep-dive.css';

export default function DeepDivePortal() {
  const { type, id } = useParams();

  const match = scrolls.find((scroll) =>
    scroll.type === type &&
    (scroll.id === id || scroll.name.toLowerCase().replace(/\s+/g, '-') === id)
  );

  if (!match) {
    return <div className="deep-dive-container">Scroll not found.</div>;
  }

  return (
    <div className="deep-dive-container">
      <h1 className="deep-dive-title">{match.name}</h1>
      {match.insight && <div className="deep-dive-insight">{match.insight}</div>}
      {match.description && <div className="deep-dive-body">{match.description}</div>}
      {match.tips && (
        <ul className="deep-dive-tips">
          {match.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      )}
      <div className="deep-dive-whisper">𓂀 <em>{match.whisper}</em></div>
      <div className="deep-dive-footer">
        <button onClick={() => window.history.back()}>Return to Journal</button>
      </div>
    </div>
  );
}
