import React, { createContext, useContext, useState } from 'react';
import { Character } from '../types/game';

interface CharacterContextType {
  character: Character | null;
  setCharacter: (character: Character) => void;
  dailyStats: {
    xp: number;
    steps: number;
    activeMinutes: number;
    streak: number;
  };
  updateDailyStats: (stats: Partial<CharacterContextType['dailyStats']>) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [dailyStats, setDailyStats] = useState({
    xp: 0,
    steps: 0,
    activeMinutes: 0,
    streak: 5 // Initial streak value
  });

  const updateDailyStats = (newStats: Partial<CharacterContextType['dailyStats']>) => {
    setDailyStats(prev => ({
      ...prev,
      xp: prev.xp + (newStats.xp || 0),
      steps: prev.steps + (newStats.steps || 0),
      activeMinutes: prev.activeMinutes + (newStats.activeMinutes || 0)
    }));
  };

  return (
    <CharacterContext.Provider value={{ character, setCharacter, dailyStats, updateDailyStats }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
}