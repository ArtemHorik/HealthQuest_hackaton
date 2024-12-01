import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface LeaveGuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isOwner: boolean;
  guildName: string;
}

export function LeaveGuildModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isOwner,
  guildName 
}: LeaveGuildModalProps) {
  const [confirmText, setConfirmText] = useState('');
  
  const canLeave = !isOwner || confirmText.toLowerCase() === guildName.toLowerCase();

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

            <div className="flex items-center gap-3 text-red-400 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-xl font-bold">Leave Guild</h2>
            </div>

            <p className="text-gray-300 mb-6">
              {isOwner 
                ? `As the owner of ${guildName}, you must transfer ownership before leaving. Type the guild name to confirm.`
                : `Are you sure you want to leave ${guildName}? This action cannot be undone.`
              }
            </p>

            {isOwner && (
              <div className="mb-6">
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type guild name to confirm..."
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

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
                onClick={onConfirm}
                disabled={!canLeave}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Leave Guild
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}