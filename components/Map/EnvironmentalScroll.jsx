import React from 'react';
import '../../styles/components/environmental-scroll.css';

const EnvironmentalScroll = ({ envId }) => {
  // Placeholder logic — adapt this as needed
  const environmentData = {
    moon_phase: "Waxing Crescent",
    tide: "Rising",
    time_of_day: "Morning",
    wind: "Light breeze",
    temperature: "72°F",
    weather: "Partly cloudy"
  };

  return (
    <div className="environmental-scroll">
      <h3 className="section-title">Environmental Conditions</h3>

      <div className="env-section">
        <p><strong>Moon Phase:</strong> {environmentData.moon_phase}</p>
        <p><strong>Tide:</strong> {environmentData.tide}</p>
        <p><strong>Time of Day:</strong> {environmentData.time_of_day}</p>
        <p><strong>Wind:</strong> {environmentData.wind}</p>
        <p><strong>Temperature:</strong> {environmentData.temperature}</p>
        <p><strong>Weather:</strong> {environmentData.weather}</p>
      </div>

      <div className="env-reflection">
        <p><em>“Nature’s rhythm whispers beneath every ripple.”</em></p>
      </div>
    </div>
  );
};

export default EnvironmentalScroll;
