import React from 'react';
import { useNavigate } from 'react-router-dom';
import { scrolls } from '../data/scrolls';
import NavBar from '../components/NavBar';
import GearCard from '../components/Gear/GearCard';
import '../styles/pages/gear-encyclopedia.css';

export default function GearEncyclopedia() {
  const navigate = useNavigate();
  const gearList = scrolls.filter(entry => entry.type === 'gear');

  return (
  
	<>
	<NavBar />
    <div className="gear-encyclopedia-container">
      <h2 className="gear-title">🎣 Gear & Technique Encyclopedia</h2>
      <div className="gear-grid">
        {gearList.map((item) => (
          <GearCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/deep/gear/${item.id}`)}
          />
        ))}
      </div>
    </div>
	</>
  );
}
