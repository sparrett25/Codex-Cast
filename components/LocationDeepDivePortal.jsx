
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/LocationDeepDivePortal.css';

export default function LocationDeepDivePortal({ scrollKey, context = {}, tone = 'neutral', onClose }) {
  const [noteInput, setNoteInput] = useState('');
  const [memoryInput, setMemoryInput] = useState('');
  const [localNotes, setLocalNotes] = useState(context.notes || []);
  const [localMemories, setLocalMemories] = useState(context.memories || []);

  const getWhisper = (tone) => {
    switch (tone) {
      case 'reflective': return "The water remembers. So do you.";
      case 'excited': return "Something stirred the surface — and you followed.";
      case 'focused': return "Your line held true. Your eyes, even truer.";
      default: return "A cast is a question. The catch is your answer.";
    }
  };

  const addNote = () => {
    if (noteInput.trim()) {
      setLocalNotes([...localNotes, noteInput.trim()]);
      setNoteInput('');
    }
  };

  const addMemory = () => {
    if (memoryInput.trim()) {
      setLocalMemories([...localMemories, memoryInput.trim()]);
      setMemoryInput('');
    }
  };

  return (
    <div className="deep-dive-portal">
      <div className="portal-header">
        <h2>🌀 Deep Dive: {scrollKey.replace(/-/g, ' ')}</h2>
        <button onClick={onClose}>✖ Close</button>
      </div>

      <div className="portal-section">
        <h3>📍 Location Info</h3>
        {context.coordinates && (
          <p>
            Coordinates: {context.coordinates[1]}, {context.coordinates[0]}
          </p>
        )}
        {context.pinId && <p>Pin ID: {context.pinId}</p>}
      </div>

      <div className="portal-section">
        <h3>📓 Notes</h3>
        <ul>
          {localNotes.map((note, idx) => <li key={idx}>{note}</li>)}
        </ul>
        <input
          type="text"
          placeholder="Add new note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button onClick={addNote}>➕ Add Note</button>
      </div>

      <div className="portal-section">
        <h3>🎣 Catch Memories</h3>
        <ul>
          {localMemories.map((mem, idx) => <li key={idx}>{mem}</li>)}
        </ul>
        <input
          type="text"
          placeholder="Add memory..."
          value={memoryInput}
          onChange={(e) => setMemoryInput(e.target.value)}
        />
        <button onClick={addMemory}>➕ Log Memory</button>
      </div>

      <div className="portal-section">
        <h3>🌬 Tairo Whisper</h3>
        <blockquote>{getWhisper(tone)}</blockquote>
      </div>
    </div>
  );
}

LocationDeepDivePortal.propTypes = {
  scrollKey: PropTypes.string.isRequired,
  context: PropTypes.object,
  tone: PropTypes.string,
  onClose: PropTypes.func,
};
