import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CastShell from "./layouts/CastShell";
import Intro from "./pages/IntroPage";
import Home from "./pages/HomePage";
import Compass from "./pages/CompassPage";
import MirrorLake from './pages/MirrorLakePage.jsx';
import SpeciesGuide from './pages/SpeciesGuide.jsx';
import GearGuide from './pages/GearGuide.jsx';
import GearScroll from "./pages/gear/GearScroll.jsx";
import TechniquesGuide from './pages/TechniquesGuide.jsx';
import Journal from './pages/Journal.jsx';
import JournalArchive from './pages/JournalArchive.jsx';
import CatchLedger from './pages/CatchJournal.jsx';
import LocationsGuide from './pages/LocationsGuide.jsx';
import MapView from './pages/MapView.jsx';
import EnvironmentalScrolls from './pages/EnvironmentalScrolls.jsx';
import TripPlanner from "./pages/TripPlanner.jsx";
import TripSummary from "./pages/TripSummary.jsx";
import Favorites from "./pages/Favorites.jsx";
import MirrorLakeRitual from "./pages/MirrorLakeRitual.jsx";
import { StoryProvider } from "./context/StoryContext";
import Dock from "./pages/Dock";
import QuestsPage from "./pages/QuestsPage";
import QuestDetailPage from "./pages/QuestDetailPage";


export default function App() {
  return (
    <StoryProvider>
	<Routes>
      <Route element={<CastShell />}>
        <Route path="/" element={<Home />} />
		<Route path="/home" element={<Home />} />
		<Route path="/compass" element={<Compass />} />
		<Route path="intro" element={<Intro />} />
		<Route path="/story" element={<Dock />} />
		<Route path="/plan-trip" element={<TripPlanner />} />
		<Route path="/trip-summary" element={<TripSummary />} />
		<Route path="/favorites" element={<Favorites />} />
		<Route path="/map" element={<MapView />} />
		<Route path="/species" element={<SpeciesGuide />} />
		{/* Gear list */}
		 <Route path="/gear" element={<GearGuide />} />
		{/* Gear scroll FULL PAGE */}
		 <Route path="/gear/:slug" element={<GearScroll />} />
		<Route path="/techniques" element={<TechniquesGuide />} />		
        
        <Route path="/environment" element={<EnvironmentalScrolls />} />
        <Route path="/locations-guide" element={<LocationsGuide />} />
	    <Route path="/journal" element={<Journal />} />
        <Route path="/archive" element={<JournalArchive />} />
        <Route path="/catch-ledger" element={<CatchLedger />} />   
      <Route path="/quests" element={<QuestsPage />} />
      <Route path="/quests/:questId" element={<QuestDetailPage />} />
        
        <Route path="/mirror-lake" element={<MirrorLake />} />
        <Route path="/mirror-lake-ritual"  element={<MirrorLakeRitual />} />
      
      </Route>
    </Routes>
	</StoryProvider>
  );
}
