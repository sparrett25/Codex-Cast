import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { suggestSpecies } from './assistant-utils';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export default function EnvironmentalForm({ onSubmitted }) {
  const [form, setForm] = useState({
    temperature: '',
    weather: '',
    moon: '',
    wind: '',
    clarity: '',
    notes: ''
  });
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const temperature = parseFloat(form.temperature);
    const species = suggestSpecies({ temperature, weather: form.weather });
    setSuggestions(species);

    const { error } = await supabase.from('environment_conditions').insert({
      temperature_f: temperature,
      weather: form.weather,
      moon_phase: form.moon,
      wind: form.wind,
      water_clarity: form.clarity,
      notes: form.notes,
      suggested_species: species
    });

    if (!error && onSubmitted) onSubmitted(form);
  };

  return (
    <div>
      <h2>Environmental Conditions</h2>
      <input
        type="number"
        placeholder="Water Temperature (°F)"
        value={form.temperature}
        onChange={e => handleChange('temperature', e.target.value)}
      />
      <select value={form.weather} onChange={e => handleChange('weather', e.target.value)}>
        <option value="">Select Weather</option>
        <option>Sunny</option>
        <option>Overcast</option>
        <option>Rainy</option>
      </select>
      <select value={form.moon} onChange={e => handleChange('moon', e.target.value)}>
        <option value="">Moon Phase</option>
        <option>New Moon</option>
        <option>Waxing Crescent</option>
        <option>Full Moon</option>
        <option>Waning Gibbous</option>
      </select>
      <select value={form.wind} onChange={e => handleChange('wind', e.target.value)}>
        <option value="">Wind</option>
        <option>Calm</option>
        <option>Light Breeze</option>
        <option>Strong Wind</option>
      </select>
      <select value={form.clarity} onChange={e => handleChange('clarity', e.target.value)}>
        <option value="">Water Clarity</option>
        <option>Clear</option>
        <option>Murky</option>
        <option>Stained</option>
      </select>
      <textarea
        placeholder="Notes or reflections..."
        value={form.notes}
        onChange={e => handleChange('notes', e.target.value)}
      />
      <button onClick={handleSubmit}>Cast This Moment</button>

      {suggestions.length > 0 && (
        <div>
          <h4>Suggested Species:</h4>
          <ul>
            {suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
