import React, { useState } from 'react';
import '../../styles/components/reflection-modal.css';

export default function ReflectionModal({ onClose, onSave }) {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    onSave(note);
    onClose();
  };

  return (
    <div className="reflection-overlay" onClick={onClose}>
      <div className="reflection-modal" onClick={(e) => e.stopPropagation()}>
        <h3>🪞 Reflection</h3>
        <p>Is there anything you’d like to remember about this moment?</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="I felt peace watching the ripples..."
        />
        <button onClick={handleSubmit}>Save Reflection</button>
      </div>
    </div>
  );
}
