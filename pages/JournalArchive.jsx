import React, { useState, useEffect } from 'react';
import '../styles/pages/journal-archive.css';

export default function JournalArchive() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = Object.keys(localStorage)
      .filter((key) => key.startsWith('cast_journal_entry_'))
      .map((key) => JSON.parse(localStorage.getItem(key)));

    const sortedEntries = storedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(sortedEntries);
  }, []);

  return (
    <div className="journal-archive">
      <h1 className="archive-title">Journal Archive</h1>
      {entries.length === 0 ? (
        <p className="no-entries">No journal entries found yet.</p>
      ) : (
        <div className="archive-list">
          {entries.map((entry, idx) => (
            <div className="archive-entry" key={idx}>
              <div className="entry-meta">
                <span className="entry-date">{new Date(entry.date).toLocaleString()}</span>
              </div>
              <div className="entry-body">
                <p>{entry.entry}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
