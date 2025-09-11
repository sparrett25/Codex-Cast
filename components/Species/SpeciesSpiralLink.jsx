import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/species-modal.css';

export default function SpeciesSpiralLink({ label, to }) {
  const navigate = useNavigate();

  return (
    <button
      className="spiral-button"
      onClick={() => navigate(to)}
      aria-label={`Enter scroll for ${label}`}
    >
      {label}
    </button>
  );
}
