import React, { useState } from 'react';
import EnvironmentalForm from './EnvironmentalForm';
import EnvironmentalOverlay from './EnvironmentalOverlay';
import RecentConditionsLog from './RecentConditionsLog';

export default function EnvironmentalAssistant() {
  const [currentConditions, setCurrentConditions] = useState(null);
  const [refreshLog, setRefreshLog] = useState(false);

  const handleSubmission = (form) => {
    setCurrentConditions(form);
    setRefreshLog(prev => !prev); // 🌀 Triggers log refresh on each cast
  };

  return (
    <div style={{ background: '#0f0f0f', padding: '20px', borderRadius: '16px' }}>
      <h1>Environmental Assistant</h1>
      <p style={{ fontStyle: 'italic', color: '#aaa' }}>
        Cast your moment into stillness. Let the environment remember with you.
      </p>

      <EnvironmentalForm onSubmitted={handleSubmission} />

      {currentConditions && (
        <EnvironmentalOverlay
          moon={currentConditions?.moon}
          wind={currentConditions?.wind}
          clarity={currentConditions?.clarity}
        />
      )}

      <RecentConditionsLog refreshTrigger={refreshLog} />
    </div>
  );
}
