import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Users, Trophy, Target } from 'lucide-react';
import { Guild } from '../../types/game';

interface SearchGuildsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (guildId: string) => void;
  guilds: Guild[];
}

export function SearchGuildsModal({ 
  isOpen, 
  onClose, 
  onJoin,
  guilds 
}: SearchGuildsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGuilds = guilds.filter(guild => 
    guild.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guild.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-green-900/90 backdrop-blur-xl rounded-lg shadow-xl w-full max-w-2xl p-6 border border-green-700"
          >
            <div className="flex items-center justify-between mb-6 border-b border-green-700 pb-4">
              <h2 className="text-xl font-bold text-white">Find a Guild</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search guilds..."
                className="w-full bg-green-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
              {filteredGuilds.map((guild) => (
                <div
                  key={guild.id}
                  className="bg-green-800/50 hover:bg-green-800/70 transition-colors rounded-lg p-6"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 mr-4">
                      <h3 className="text-lg font-semibold text-white text-left">{guild.name}</h3>
                      {guild.description && (
                        <p className="text-white/90 text-sm mt-1 text-left font-medium">{guild.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400 text-left">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="text-white font-medium">{guild.memberCount}/{guild.maxMembers}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          <span className="text-white font-medium">Level {guild.level}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onJoin(guild.id)}
                      disabled={guild.memberCount >= guild.maxMembers}
                      className="shrink-0 px-6 py-2.5 min-w-[100px] bg-purple-600 text-white rounded-lg 
                               hover:bg-purple-700 transition-colors disabled:opacity-50 
                               disabled:cursor-not-allowed font-medium"
                    >
                      {guild.memberCount >= guild.maxMembers ? 'Full' : 'Join'}
                    </button>
                  </div>
                </div>
              ))}
              {filteredGuilds.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No guilds found matching your search.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}