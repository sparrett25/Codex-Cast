import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

import { scrolls } from '../data/scrolls';
import '../styles/pages/environmental-scrolls.css';

export default function EnvironmentalScrolls() {
  const navigate = useNavigate();
  const environmentList = scrolls.filter(entry => entry.type === 'environment');

  return (
  
    <>
	<NavBar />
    <div className="species-guide-container">
      <h2 className="gear-title">🌙 Environmental Conditions</h2>
      <div className="species-list">
        {environmentList.map((item) => (
          <button
            key={item.id}
            className="species-button"
            onClick={() => navigate(`/deep/environment/${item.id}`)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
	</>
  );
}
