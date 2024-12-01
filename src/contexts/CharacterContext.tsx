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

  const updateDailyStats = (stats: Partial<CharacterContextType['dailyStats']>) => {
    setDailyStats(prev => ({ ...prev, ...stats }));
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