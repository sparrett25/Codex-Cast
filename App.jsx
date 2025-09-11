import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CastShell from "./layouts/CastShell";
import Home from "./pages/Home";
import MirrorLake from './pages/MirrorLake.jsx';
import SpeciesGuide from './pages/SpeciesGuide.jsx';
import GearGuide from './pages/GearGuide.jsx';
import TechniquesGuide from './pages/TechniquesGuide.jsx';
import Journal from './pages/Journal.jsx';
import JournalArchive from './pages/JournalArchive.jsx';
import CatchJournal from './pages/CatchJournal.jsx'; 
import LocationsGuide from './pages/LocationsGuide.jsx'; 
import MapView from './pages/MapView.jsx';
import EnvironmentalScrolls from './pages/EnvironmentalScrolls.jsx'; 
import DeepDivePortal from './pages/deep/DeepDivePortal.jsx';

// Optional: future ScrollViewerModal entry or ScrollLibrary page

export default function App() {
  return (
    <Routes>
	<Route element={<CastShell />}>
      <Route path="/" element={<Home />} />
	  <Route path="mirror-lake" element={<MirrorLake />} />
      <Route path="/species" element={<SpeciesGuide />} />
      <Route path="/gear" element={<GearGuide />} />
	  <Route path="/techniques" element={<TechniquesGuide />} />
	  <Route path="/journal" element={<Journal />} />
	  <Route path="/journal-archive" element={<JournalArchive />} />
	  <Route path="/catch-journal" element={<CatchJournal />} />
	  <Route path="/locations-guide" element={<LocationsGuide />} />  
      <Route path="/environment" element={<EnvironmentalScrolls />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/deep-dive/:speciesId" element={<DeepDivePortal />} />
	  </Route>
    </Routes>
	
	
  );
}
