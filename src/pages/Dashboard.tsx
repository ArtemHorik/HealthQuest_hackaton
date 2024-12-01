import React from 'react';
import { MissionCard } from '../components/missions/MissionCard';
import { GuildActivity } from '../components/guild/GuildActivity';
import { DailyProgress } from '../components/progress/DailyProgress';
import { Activity, Trophy, Target, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCharacter } from '../contexts/CharacterContext';
import { useNavigation } from '../contexts/NavigationContext';
import { useState } from 'react';

interface DashboardProps {
  missions?: {
    personal: any[];
    guild: any[];
  };
}

const GUILD_MEMBERS = [
  { name: 'Alex', activity: 'online' as const },
  { name: 'Maria', activity: 'online' as const },
  { name: 'John', activity: 'offline' as const, lastActive: '2h ago' },
  { name: 'Sarah', activity: 'offline' as const, lastActive: '5h ago' },
  { name: 'Mike', activity: 'online' as const },
];

export function Dashboard({ missions }: DashboardProps) {
  const { character, dailyStats } = useCharacter();
  const { currentPage, setCurrentPage } = useNavigation();

  // Combine guild and personal missions
  const allMissions = [
    ...(missions?.guild || []),
    ...(missions?.personal || [])
  ];

  // Take only first 2 missions for display
  const displayMissions = allMissions.slice(0, 2);
  const hasMoreMissions = allMissions.length > 2;
  
  const DAILY_STATS = [
    { label: 'Steps', value: dailyStats.steps.toLocaleString(), icon: Activity, color: 'text-green-400' },
    { label: 'XP Today', value: dailyStats.xp.toString(), icon: Trophy, color: 'text-yellow-400' },
    { label: 'Active Minutes', value: dailyStats.activeMinutes.toString(), icon: Target, color: 'text-blue-400' },
    { label: 'Streak', value: `${dailyStats.streak} days`, icon: TrendingUp, color: 'text-purple-400' }
  ];

  const handleMissionComplete = (mission: any) => {
    // Handle mission completion through parent component
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {DAILY_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-gray-300 text-sm">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Active Missions</h2>
                <div className="text-sm text-white/90 font-medium">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
              </div>
              
              <div className="space-y-4 relative">
                {displayMissions.map((mission, index) => (
                  <MissionCard
                    key={index}
                    {...mission}
                    onQuickAction={() => handleMissionComplete(mission)}
                  />
                ))}
                {displayMissions.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>All missions completed! Check back later for more.</p>
                  </div>
                )}
                {hasMoreMissions && (
                  <motion.button
                    onClick={() => setCurrentPage('missions')}
                    className="w-full mt-4 py-3 px-4 bg-purple-500/20 hover:bg-purple-500/30 
                             rounded-lg text-purple-300 hover:text-purple-200 transition-colors
                             flex items-center justify-center gap-2 font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Target className="w-4 h-4" />
                    <span>View All</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Daily Progress</h2>
            <DailyProgress />
          </motion.div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Guild Activity</h2>
            <GuildActivity members={GUILD_MEMBERS} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}