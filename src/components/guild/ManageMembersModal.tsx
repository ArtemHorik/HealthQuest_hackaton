import React, { useState } from 'react';
import { X, UserPlus, UserMinus, Mail, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelAvatarDisplay } from '../character/PixelAvatarDisplay';
import { BULGARIAN_USERS } from '../../data/users';

interface ManageMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOwner: boolean;
  currentMembers: Array<{
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastActive?: string;
  }>;
}

export function ManageMembersModal({ isOpen, onClose, currentMembers, isOwner }: ManageMembersModalProps) {
  const [activeTab, setActiveTab] = useState<'members' | 'invite'>('members');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users who are not current members
  const invitableUsers = BULGARIAN_USERS.filter(
    user => !currentMembers.find(member => member.id === user.id)
  );

  const filteredMembers = currentMembers.filter(
    member => member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvitableUsers = invitableUsers.filter(
    user => user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveMember = (memberId: string) => {
    // Implementation for removing member
    console.log('Removing member:', memberId);
  };

  const handleInviteMember = (userId: string) => {
    // Implementation for sending invite
    console.log('Inviting user:', userId);
  };

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
            className="relative bg-green-900/90 backdrop-blur-xl rounded-lg shadow-xl w-full max-w-2xl overflow-hidden border border-green-700"
          >
            <div className="flex items-center justify-between p-6 border-b border-green-700">
              <h2 className="text-xl font-bold text-white">Manage Guild Members</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab('members')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    activeTab === 'members'
                      ? 'bg-green-600 text-white'
                      : 'bg-green-800 text-white hover:bg-green-700'
                  }`}
                >
                  Current Members
                </button>
                <button
                  onClick={() => setActiveTab('invite')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    activeTab === 'invite'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Invite Members
                </button>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search members..."
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
                {activeTab === 'members' ? (
                  filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10">
                          <PixelAvatarDisplay avatarData={member.avatar} size={40} />
                        </div>
                        <div>
                          <div className="text-white font-medium">{member.name}</div>
                          <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${
                              member.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                            }`} />
                            <span className="text-sm text-gray-400">
                              {member.status === 'online' ? 'Online' : member.lastActive}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isOwner && (
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Remove member"
                        >
                          <UserMinus className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  filteredInvitableUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10">
                          <PixelAvatarDisplay avatarData={user.avatar} size={40} />
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.city}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleInviteMember(user.id)}
                        className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 rounded-lg transition-colors"
                        title="Send invite"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}