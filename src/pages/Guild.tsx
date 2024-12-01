import React, { useState } from 'react';
import { GuildChat } from '../components/guild/GuildChat';
import { GuildWeeklyGoal } from '../components/guild/GuildWeeklyGoal';
import { Users, Trophy, Target, UserPlus, LogOut, Crown } from 'lucide-react';
import { ManageMembersModal } from '../components/guild/ManageMembersModal';
import { LeaveGuildModal } from '../components/guild/LeaveGuildModal';
import { TransferOwnershipModal } from '../components/guild/TransferOwnershipModal';
import { SearchGuildsModal } from '../components/guild/SearchGuildsModal';
import { BULGARIAN_USERS, GUILDS } from '../data/users';
import { useCharacter } from '../contexts/CharacterContext';

export function Guild() {
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [isLeaveGuildOpen, setIsLeaveGuildOpen] = useState(false);
  const [isTransferOwnershipOpen, setIsTransferOwnershipOpen] = useState(false);
  const [isSearchGuildsOpen, setIsSearchGuildsOpen] = useState(false);
  const { character, setCharacter } = useCharacter();
  
  const currentGuild = character?.guildId ? GUILDS[character.guildId] : null;
  const currentGuildMembers = BULGARIAN_USERS.filter(user => user.guildId === character?.guildId);

  // Calculate weekly goal data based on current guild members
  const weeklyGoalData = {
    target: 5000,
    current: 3200,
    daysLeft: 3,
    contributors: currentGuildMembers.map(member => ({
      name: member.name,
      contribution: Math.floor(Math.random() * 1000) + 500, // Simulated contribution
      avatar: member.avatar
    })).sort((a, b) => b.contribution - a.contribution)
  };

  const handleLeaveGuild = () => {
    setCharacter(prev => ({
      ...prev,
      guildId: undefined,
      isGuildOwner: false
    }));
    setIsLeaveGuildOpen(false);
  };

  const handleTransferOwnership = (newOwnerId: string) => {
    // Update character and guild ownership
    setCharacter(prev => ({
      ...prev,
      isGuildOwner: false
    }));
    // Here you would typically make an API call to update the guild ownership
  };

  const handleJoinGuild = (guildId: string) => {
    setCharacter(prev => ({
      ...prev,
      guildId
    }));
    setIsSearchGuildsOpen(false);
  };

  if (!character?.guildId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Users className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Guild</h2>
        <p className="text-gray-300 mb-6">Join a guild to participate in group activities and earn rewards together.</p>
        <button
          onClick={() => setIsSearchGuildsOpen(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Find a Guild
        </button>
        <SearchGuildsModal
          isOpen={isSearchGuildsOpen}
          onClose={() => setIsSearchGuildsOpen(false)}
          onJoin={handleJoinGuild}
          guilds={Object.values(GUILDS)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{currentGuild?.name}</h1>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Level {currentGuild?.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>{currentGuild?.activeMissions.length || 0} Active Missions</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
          {character.isGuildOwner && (
            <button
              onClick={() => setTransferOwnershipOpen(true)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 
                       rounded-lg text-yellow-400 transition-colors"
            >
              <Crown className="w-5 h-5" />
              <span className="hidden md:inline">Transfer Ownership</span>
            </button>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                     rounded-lg text-white transition-colors"
            onClick={() => setIsManageMembersOpen(true)}
          >
            <UserPlus className="w-5 h-5" />
            <span className="hidden md:inline">Manage Members</span>
          </button>
          <button
            onClick={() => setIsLeaveGuildOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 
                     rounded-lg text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">Leave Guild</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <GuildWeeklyGoal {...weeklyGoalData} />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Guild Achievements</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Most Active Guild (Last Week)</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Trophy className="w-5 h-5 text-indigo-400" />
              <span>Perfect Attendance (5 Days)</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 md:col-span-2 h-[500px]">
          <h2 className="text-xl font-bold text-white mb-4">Guild Chat</h2>
          <GuildChat />
        </div>
      </div>

      <ManageMembersModal
        isOpen={isManageMembersOpen}
        onClose={() => setIsManageMembersOpen(false)}
        currentMembers={currentGuildMembers}
        isOwner={character?.isGuildOwner || false}
      />
      
      <LeaveGuildModal
        isOpen={isLeaveGuildOpen}
        onClose={() => setIsLeaveGuildOpen(false)}
        onConfirm={handleLeaveGuild}
        isOwner={character.isGuildOwner}
        guildName={currentGuild?.name || ''}
      />
      
      <TransferOwnershipModal
        isOpen={isTransferOwnershipOpen}
        onClose={() => setIsTransferOwnershipOpen(false)}
        onConfirm={handleTransferOwnership}
        members={currentGuildMembers.filter(m => m.id !== character.id)}
      />
    </div>
  );
}