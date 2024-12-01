import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '../../types/game';
import { ArrowRight } from 'lucide-react';
import { PixelAvatarGenerator } from './PixelAvatarGenerator';

interface CharacterCreationProps {
  onComplete: (character: Character) => void;
}

export function CharacterCreation({ onComplete }: CharacterCreationProps) {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [name, setName] = useState('');

  const handleComplete = () => {
    if (!selectedAvatar || !name) return;

    const character: Character = {
      id: Date.now().toString(),
      name,
      avatar: selectedAvatar,
      level: 1,
      xp: 0,
      goals: [],
      activityLevel: 'beginner',
    };

    onComplete(character);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#450000] via-purple-900 to-indigo-950 py-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Create Your Character</h1>
            <p className="text-gray-300">Choose how your hero will look in HealthQuest</p>
          </div>

          <div className="space-y-8">
            <PixelAvatarGenerator
              onChange={setSelectedAvatar}
              value={selectedAvatar}
            />

            <div className="max-w-md mx-auto">
              <label className="block text-white mb-2">Character Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter name..."
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleComplete}
              disabled={!selectedAvatar || !name}
              className="flex items-center gap-2 px-8 py-4 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}