
import React from 'react';
import { useDeepDive } from './DeepDiveContext';
import LocationDeepDivePortal from './LocationDeepDivePortal';
import '../styles/components/DeepDiveModalWrapper.css';

export default function DeepDiveModalWrapper() {
  const { isOpen, scrollKey, contextData, tone, closeDeepDive } = useDeepDive();

  if (!isOpen) return null;

  return (
    <div className="deep-dive-backdrop">
      <div className="deep-dive-modal">
        <LocationDeepDivePortal
          scrollKey={scrollKey}
          context={contextData}
          tone={tone}
          onClose={closeDeepDive}
        />
      </div>
    </div>
  );
}
