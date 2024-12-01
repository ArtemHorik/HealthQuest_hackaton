import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: {
    title: string;
    description: string;
    progress: number;
    target: number;
    unit: string;
    type: 'personal' | 'guild';
  };
  onComplete: (value: number) => void;
}

function getInputType(unit: string) {
  switch (unit) {
    case 'steps':
      return {
        type: 'number',
        min: 0,
        max: 100000,
        step: 100,
        placeholder: 'Enter number of steps...'
      };
    case 'minutes':
      return {
        type: 'number',
        min: 0,
        max: 240,
        step: 1,
        placeholder: 'Enter minutes...'
      };
    case 'glasses':
      return {
        type: 'range',
        min: 0,
        max: 12,
        step: 1,
        placeholder: 'Select number of glasses'
      };
    default:
      return {
        type: 'number',
        min: 0,
        step: 1,
        placeholder: `Enter ${unit}...`
      };
  }
}

export function MissionModal({ isOpen, onClose, mission, onComplete }: MissionModalProps) {
  const [value, setValue] = React.useState<number>(0);
  const inputConfig = getInputType(mission.unit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(value);
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
            className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-2">{mission.title}</h2>
            <p className="text-gray-300 mb-6">{mission.description}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {inputConfig.type === 'range' 
                    ? `Select number of ${mission.unit} (${value})`
                    : `Enter ${mission.unit}`
                  }
                </label>
                
                <input
                  type={inputConfig.type}
                  min={inputConfig.min}
                  max={inputConfig.max}
                  step={inputConfig.step}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className={`w-full ${
                    inputConfig.type === 'range'
                      ? 'accent-purple-500'
                      : 'bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none'
                  }`}
                  placeholder={inputConfig.placeholder}
                />

                {inputConfig.type === 'range' && (
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>{inputConfig.min}</span>
                    <span>{inputConfig.max}</span>
                  </div>
                )}
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
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Complete
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}