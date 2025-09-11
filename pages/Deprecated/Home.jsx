import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Cast</h1>
      <nav>
        <ul>
          <li><Link to="/species">Species Guide</Link></li>
          <li><Link to="/gear">Gear Tracker</Link></li>
          <li><Link to="/journal">Catch Journal</Link></li>
          <li><Link to="/map">Map View</Link></li>
          <li><Link to="/environment">Environmental Assistant</Link></li>
        </ul>
      </nav>
    </div>
  );
}
