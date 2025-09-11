import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/gear-scroll.css';

export default function GearSpiralLink({ label, to }) {
  const navigate = useNavigate();
  return (
    <button
      className="spiral-button"
      onClick={() => navigate(to)}
    >
      {label}
    </button>
  );
}
