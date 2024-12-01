import React from 'react';
import { GameLayout } from './components/layout/GameLayout';
import { Dashboard } from './pages/Dashboard';
import { Missions } from './pages/Missions';
import { Guild } from './pages/Guild';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Inventory } from './pages/Inventory';
import { Shop } from './pages/Shop';
import { NavigationProvider } from './contexts/NavigationContext';
import { useNavigation } from './contexts/NavigationContext';
import { CharacterProvider } from './contexts/CharacterContext';
import { CharacterSelection } from './components/character/CharacterSelection';
import { useCharacter } from './contexts/CharacterContext';
import { PERSONAL_MISSIONS, GUILD_MISSIONS } from './data/missions';
import { useState } from 'react';

function AppContent() {
  const { currentPage } = useNavigation();
  const { character, setCharacter } = useCharacter();
  const [missions, setMissions] = useState({
    personal: PERSONAL_MISSIONS,
    guild: character?.guildId ? GUILD_MISSIONS : []
  });

  if (!character) {
    return <CharacterSelection onComplete={setCharacter} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard missions={missions} />;
      case 'missions':
        return <Missions missions={missions} setMissions={setMissions} />;
      case 'guild':
        return <Guild />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'inventory':
        return <Inventory />;
      case 'shop':
        return <Shop />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <GameLayout character={character}>
      {renderPage()}
    </GameLayout>
  );
}

function App() {
  return (
    <CharacterProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </CharacterProvider>
  );
}

export default App;