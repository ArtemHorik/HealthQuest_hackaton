import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '../../types/game';
import { ArrowRight, ArrowLeft, Swords, Target, Wand2, Heart } from 'lucide-react';
import { PixelAvatarGenerator } from './PixelAvatarGenerator';
import { Header } from '../layout/Header';

interface CharacterSelectionProps {
  onComplete: (character: Character) => void;
}

const ACTIVITY_LEVELS = [
  { id: 'beginner', label: 'Beginner', description: 'New to fitness and healthy lifestyle' },
  { id: 'intermediate', label: 'Intermediate', description: 'Regular exercise routine' },
  { id: 'advanced', label: 'Advanced', description: 'Dedicated fitness enthusiast' }
] as const;

const GOALS = [
  { id: 'weight-loss', label: 'Weight Loss', icon: '🎯' },
  { id: 'muscle-gain', label: 'Muscle Gain', icon: '💪' },
  { id: 'endurance', label: 'Endurance', icon: '🏃' },
  { id: 'flexibility', label: 'Flexibility', icon: '🧘' },
  { id: 'balance', label: 'Balance', icon: '⚖️' },
  { id: 'mental-health', label: 'Mental Health', icon: '🧠' }
];

const CHARACTER_CLASSES = [
  {
    id: 'warrior',
    name: 'Warrior',
    icon: Swords,
    color: 'from-red-500 to-orange-500',
    description: 'Strength and power focused training'
  },
  {
    id: 'ranger',
    name: 'Ranger',
    icon: Target,
    color: 'from-green-500 to-emerald-500',
    description: 'Agility and endurance specialist'
  },
  {
    id: 'mage',
    name: 'Mage',
    icon: Wand2,
    color: 'from-blue-500 to-indigo-500',
    description: 'Flexibility and mind-body balance'
  },
  {
    id: 'healer',
    name: 'Healer',
    icon: Heart,
    color: 'from-purple-500 to-pink-500',
    description: 'Recovery and wellness focused'
  }
];

export function CharacterSelection({ onComplete }: CharacterSelectionProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [activityLevel, setActivityLevel] = useState<typeof ACTIVITY_LEVELS[number]['id']>('beginner');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleComplete = () => {
    const character: Character = {
      id: Date.now().toString(),
      name,
      avatar,
      level: 1,
      xp: 0,
      goals: selectedGoals,
      activityLevel,
      coins: 500,
      inventory: []
    };

    onComplete(character);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return name.length >= 2 && avatar !== '';
      case 2: return selectedGoals.length >= 1;
      case 3: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-custom via-green-900 to-green-950">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-4 max-w-4xl flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Create Your Hero</h1>
            <p className="text-gray-300">Step {step} of 3</p>
          </div>

          <div className="space-y-8">
            {step === 1 && (
              <div className="space-y-8">
                <div className="max-w-md mx-auto">
                  <label className="block text-white mb-2">Character Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/70"
                    placeholder="Enter name..."
                  />
                </div>

                <PixelAvatarGenerator
                  onChange={setAvatar}
                  value={avatar}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Select Your Goals</h3>
                  <button
                    onClick={() => setSelectedGoals(
                      selectedGoals.length === GOALS.length ? [] : GOALS.map(g => g.id)
                    )}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {selectedGoals.length === GOALS.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {GOALS.map((goal) => (
                    <motion.button
                      key={goal.id}
                      onClick={() => {
                        setSelectedGoals(prev => 
                          prev.includes(goal.id) ? prev.filter(g => g !== goal.id) : [...prev, goal.id]
                        );
                      }}
                      className={`p-4 rounded-lg text-center transition-all ${
                        selectedGoals.includes(goal.id)
                          ? 'bg-purple-500 ring-2 ring-purple-300'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl mb-2">{goal.icon}</div>
                      <div className="text-white font-semibold">{goal.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">Select Your Activity Level</h3>
                <div className="space-y-4">
                  {ACTIVITY_LEVELS.map((level) => (
                    <motion.button
                      key={level.id}
                      onClick={() => setActivityLevel(level.id)}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        activityLevel === level.id
                          ? 'bg-purple-500 ring-2 ring-purple-300'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-white font-semibold">{level.label}</div>
                      <div className="text-sm text-white/90">{level.description}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button
              onClick={() => step < 3 ? setStep(s => s + 1) : handleComplete()}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step < 3 ? (
                <>
                  Next
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                'Start Journey'
              )}
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}