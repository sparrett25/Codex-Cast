import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase.js';

export default function RecentConditionsLog({ refreshTrigger }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase
        .from('environment_conditions')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(5);
      if (!error) setEntries(data);
      else console.error('Failed to fetch entries:', error.message);
    }

    fetchEntries();
  }, [refreshTrigger]); // 🌀 re-runs every time trigger changes

  return (
    <div style={{ marginTop: '20px', background: '#1b1b1b', padding: '15px', borderRadius: '12px' }}>
      <h3>Recent Environmental Whispers</h3>
      {entries.length === 0 ? <p>No prior entries found.</p> : (
        <ul>
          {entries.map((e) => (
            <li key={e.id}>
              <strong>{e.weather}</strong>, {e.temperature_f}°F,
              Moon: {e.moon_phase}, Wind: {e.wind}, Clarity: {e.water_clarity}<br />
              <em>{e.notes}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
