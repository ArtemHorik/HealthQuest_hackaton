import React, { useState } from 'react';
import { Award, Target, Activity, Trophy, Calendar, TrendingUp, Heart, Dumbbell, Medal } from 'lucide-react';
import { PixelAvatarDisplay } from '../components/character/PixelAvatarDisplay';
import { useCharacter } from '../contexts/CharacterContext';
import { motion } from 'framer-motion';

const ACHIEVEMENTS = [
  { 
    id: '1',
    title: '5-Day Streak',
    description: 'Completed daily missions for 5 consecutive days',
    icon: Calendar,
    color: 'text-yellow-400',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Early Bird',
    description: 'Completed morning workout 3 days in a row',
    icon: Trophy,
    color: 'text-purple-400',
    date: '2024-03-14'
  },
  {
    id: '3',
    title: 'Goal Crusher',
    description: 'Completed all daily missions',
    icon: Target,
    color: 'text-green-400',
    date: '2024-03-13'
  }
];

function calculateTotalXP(level: number, currentXP: number): number {
  let total = currentXP;
  for (let i = 1; i < level; i++) {
    total += i * 1000;
  }
  return total;
}

export function Profile() {
  const { character } = useCharacter();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements'>('overview');
  const [completedMissions] = useState(24); // This would come from a missions context/state
  
  const totalXP = character ? calculateTotalXP(character.level, character.xp) : 0;
  
  const STATS = [
    { 
      label: 'Total XP', 
      value: totalXP.toLocaleString(), 
      icon: Trophy, 
      color: 'text-yellow-400' 
    },
    { 
      label: 'Current Streak', 
      value: '5 days', 
      icon: TrendingUp, 
      color: 'text-green-400' 
    },
    { 
      label: 'Missions Complete', 
      value: completedMissions.toString(), 
      icon: Target, 
      color: 'text-blue-400' 
    },
    { 
      label: 'Active Minutes', 
      value: '320', 
      icon: Activity, 
      color: 'text-purple-400' 
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <motion.div 
            className="w-32 h-32 rounded-full bg-[#314f1f]
                     flex items-center justify-center p-2"
            whileHover={{ scale: 1.05 }}
          >
            <PixelAvatarDisplay avatarData={character?.avatar} size={112} />
          </motion.div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{character?.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Level {character?.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium capitalize">{character?.activityLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-white font-medium">{character?.goals.length} Goals</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-white text-sm font-medium">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              selectedTab === 'overview'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('achievements')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              selectedTab === 'achievements'
                ? 'text-white border-b-2 border-purple-500'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Achievements
          </button>
        </div>

        <div className="p-6">
          {selectedTab === 'overview' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Active Goals</h3>
                <div className="space-y-4">
                  {character?.goals.map((goal, index) => (
                    <motion.div
                      key={goal}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium capitalize">{goal.replace('-', ' ')}</span>
                      </div>
                      <div className="text-sm text-white/70">In Progress</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/10 rounded-lg"
                >
                  <div className={`p-3 rounded-lg bg-white/10 ${achievement.color}`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{achievement.title}</h4>
                    <p className="text-white text-sm font-medium">{achievement.description}</p>
                    <p className="text-white/80 text-xs mt-1 font-medium">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}