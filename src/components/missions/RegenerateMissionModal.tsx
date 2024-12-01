import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RegenerateMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  missionTitle: string;
}

const REASONS = [
  'Too difficult',
  'Too easy',
  'Not relevant to my goals',
  'Need a different type of activity',
  'Other'
];

export function RegenerateMissionModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  missionTitle 
}: RegenerateMissionModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reason = selectedReason === 'Other' ? otherReason : selectedReason;
    onConfirm(reason);
    onClose();
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
            className="relative bg-green-900/90 backdrop-blur-xl rounded-lg shadow-xl w-full max-w-md p-6 border border-green-700"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-2">Regenerate Mission</h2>
            <p className="text-gray-300 mb-6">
              Why would you like to regenerate "{missionTitle}"?
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                {REASONS.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedReason === reason
                        ? 'bg-green-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              {selectedReason === 'Other' && (
                <div>
                  <textarea
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please specify your reason..."
                    className="w-full bg-white/10 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
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
                  type="submit"
                  disabled={!selectedReason || (selectedReason === 'Other' && !otherReason)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                           transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Regenerate
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}