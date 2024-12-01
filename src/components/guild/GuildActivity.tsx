import React from 'react';
import { Users, Trophy, Target } from 'lucide-react';

interface GuildMember {
  name: string;
  activity: 'online' | 'offline';
  lastActive?: string;
}

interface GuildActivityProps {
  members: GuildMember[];
}

export function GuildActivity({ members }: GuildActivityProps) {
  const onlineMembers = members.filter(m => m.activity === 'online');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-300">
        <span className="text-white font-medium">{onlineMembers.length} online • {members.length} total</span>
      </div>
      
      <div className="space-y-1">
        {members.map((member, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
          >
            <span className="text-white text-sm font-medium">{member.name}</span>
            <span className={`text-xs ${
              member.activity === 'online' ? 'text-green-400' : 'text-gray-500'
            }`}>
              {member.activity === 'online' ? 'Online' : member.lastActive}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}