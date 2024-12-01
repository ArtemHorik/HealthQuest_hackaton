import React from 'react';
import { Target, Users, Trophy } from 'lucide-react';
import { PixelAvatarDisplay } from '../character/PixelAvatarDisplay';

interface GuildWeeklyGoalProps {
  target: number;
  current: number;
  daysLeft: number;
  contributors: Array<{
    name: string;
    avatar: string;
    contribution: number;
  }>;
}

export function GuildWeeklyGoal({ target, current, daysLeft, contributors }: GuildWeeklyGoalProps) {
  const progress = (current / target) * 100;
  const sortedContributors = [...contributors].sort((a, b) => b.contribution - a.contribution);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Weekly Guild Goal</h3>
        </div>
        <span className="text-sm text-gray-400">{daysLeft} days left</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Progress</span>
          <span className="text-white font-medium">{current.toLocaleString()} / {target.toLocaleString()} XP</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Users className="w-4 h-4" />
          <span>Top Contributors</span>
        </div>
        {sortedContributors.slice(0, 3).map((contributor, index) => (
          <div key={contributor.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
                <PixelAvatarDisplay avatarData={contributor.avatar} size={32} />
              </div>
              {index === 0 && <Trophy className="w-4 h-4 text-yellow-400" />}
              <span className="text-gray-300">{contributor.name}</span>
            </div>
            <span className="text-purple-400">{contributor.contribution.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}