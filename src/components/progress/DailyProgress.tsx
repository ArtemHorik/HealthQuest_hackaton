import React from 'react';
import { Activity, Zap, Timer } from 'lucide-react';
import { useCharacter } from '../../contexts/CharacterContext';

interface ProgressItemProps { 
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

function ProgressItem({ label, value, icon }: ProgressItemProps) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-white font-medium">{label}</span>
      </div>
      <span className="text-white font-bold">{value}</span>
    </div>
  );
}

export function DailyProgress() {
  const { dailyStats } = useCharacter();

  return (
    <div className="space-y-4">
      <ProgressItem
        label="XP Today"
        value={`${dailyStats.xp} XP`}
        icon={<Zap className="w-4 h-4 text-yellow-400" />}
      />
      <ProgressItem
        label="Steps"
        value={dailyStats.steps.toLocaleString()}
        icon={<Activity className="w-4 h-4 text-green-400" />}
      />
      <ProgressItem
        label="Active Minutes"
        value={dailyStats.activeMinutes}
        icon={<Timer className="w-4 h-4 text-blue-400" />}
      />
    </div>
  );
}