import React from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Character } from '../../types/game';

interface GenerateMissionButtonProps {
  category: string;
  character: Character;
  onGenerate: () => void;
  isLoading?: boolean;
}

export function GenerateMissionButton({ 
  category, 
  character,
  onGenerate,
  isLoading 
}: GenerateMissionButtonProps) {
  // Prepare user data for mission generation
  const userProfile = {
    level: character.level,
    activityLevel: character.activityLevel,
    goals: character.goals,
    completedMissions: [], // This would come from mission history
    preferences: {
      category,
      timeOfDay: new Date().getHours(), // Consider time of day for mission type
      availableEquipment: [], // This would come from user settings
      limitations: [] // This would come from user settings
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-32 bg-white/5 rounded-lg flex items-center justify-center gap-3 
                 text-gray-300 hover:bg-white/10 transition-colors relative group"
      onClick={() => onGenerate()}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          <span>Generate New Mission</span>
        </>
      )}
    </motion.button>
  );
}