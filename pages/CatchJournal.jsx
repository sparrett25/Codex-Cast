import React, { useState } from 'react';

import CatchForm from '../components/CatchLog/CatchForm';
import CatchEntryList from '../components/CatchLog/CatchEntryList';
import TairoWhisper from '../components/TairoWhisper/TairoWhisper';
import '../styles/pages/catch-journal.css';

const CatchJournal = () => {
  const [entries, setEntries] = useState([]);

  const selectedSpecies = JSON.parse(localStorage.getItem('cast_selected_species'));

  const handleAddCatch = (newCatch) => {
    setEntries([newCatch, ...entries]);

    const whisper = document.createElement('div');
    whisper.className = 'catch-whisper';
    whisper.innerText = 'A ripple joins the current.';
    document.body.appendChild(whisper);
    setTimeout(() => whisper.remove(), 3000);
  };

  return (
  
    <>
	
    <div className="catch-journal-container">
      {selectedSpecies && (
        <div className="species-reminder">
          <p className="reminder-text">
            🌊 You cast your line for: <strong>{selectedSpecies.name}</strong>
          </p>
        </div>
      )}

      <div className="catch-form-wrapper">
        <CatchForm onAddCatch={handleAddCatch} />
      </div>

      <div className="catch-list-wrapper">
        <CatchEntryList entries={entries} />
      </div>

      <TairoWhisper context="journal" voice={true} />
    </div>
	</>
  );
};

export default CatchJournal;
