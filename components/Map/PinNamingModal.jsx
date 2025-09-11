import React, { useState } from 'react';
import '../../styles/components/pin-naming-modal.css';

const PIN_TYPES = ['species', 'gear', 'environment', 'catch', 'location'];

const PinNamingModal = ({ onSave, onCancel, coordinates }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pinType, setPinType] = useState('location');

  const handleSubmit = () => {
    if (!title) return;
    onSave({
      title,
      description,
      pinType,
      icon: pinType,
      targetId: title.toLowerCase().replace(/\s+/g, '_'),
      coordinates,
    });
  };

  return (
    <div className="pin-naming-modal-overlay">
      <div className="pin-naming-modal">
        <h2>Name This Location</h2>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g. Sunrise Cove"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional notes..."
        />

        <label>Pin Type</label>
        <select value={pinType} onChange={(e) => setPinType(e.target.value)}>
          {PIN_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="modal-buttons">
          <button onClick={handleSubmit} className="save-button">Save Pin</button>
          <button onClick={onCancel} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PinNamingModal;
