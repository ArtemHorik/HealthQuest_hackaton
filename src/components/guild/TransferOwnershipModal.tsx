import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown } from 'lucide-react';
import { PixelAvatarDisplay } from '../character/PixelAvatarDisplay';

interface Member {
  id: string;
  name: string;
  avatar: string;
}

interface TransferOwnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (memberId: string) => void;
  members: Member[];
}

export function TransferOwnershipModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  members
}: TransferOwnershipModalProps) {
  const [selectedMember, setSelectedMember] = useState<string>('');

  const handleConfirm = () => {
    if (selectedMember) {
      onConfirm(selectedMember);
      onClose();
    }
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
            className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Transfer Ownership</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Select a member to transfer guild ownership to. This action cannot be undone.
            </p>

            <div className="space-y-2 max-h-[300px] overflow-y-auto mb-6">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedMember === member.id
                      ? 'bg-purple-500'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="w-10 h-10">
                    <PixelAvatarDisplay avatarData={member.avatar} size={40} />
                  </div>
                  <span className="text-white">{member.name}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!selectedMember}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Transfer Ownership
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}