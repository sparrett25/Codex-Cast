import React, { useState } from 'react';

export default function GearTracker() {
  const [gear, setGear] = useState([]);
  const [newItem, setNewItem] = useState({ type: '', name: '' });

  const addGear = () => {
    if (newItem.type && newItem.name) {
      setGear([...gear, { ...newItem, id: Date.now() }]);
      setNewItem({ type: '', name: '' });
    }
  };

  const removeGear = id => {
    setGear(gear.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Gear Tracker</h1>
      <input
        placeholder="Type (Rod, Reel, etc)"
        value={newItem.type}
        onChange={e => setNewItem({ ...newItem, type: e.target.value })}
      />
      <input
        placeholder="Name"
        value={newItem.name}
        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
      />
      <button onClick={addGear}>Add Gear</button>

      <ul>
        {gear.map(item => (
          <li key={item.id}>
            {item.type}: {item.name}
            <button onClick={() => removeGear(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
