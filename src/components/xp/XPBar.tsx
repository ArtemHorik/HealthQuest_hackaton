import React from 'react';
import { motion } from 'framer-motion';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
}

export function XPBar({ currentXP, maxXP, level }: XPBarProps) {
  const progress = (currentXP / maxXP) * 100;

  return (
    <motion.div 
      className="xp-bar relative w-full"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.5, times: [0, 0.5, 1] }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-300">Level {level}</span>
        <span className="text-sm text-gray-300">{currentXP}/{maxXP} XP</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-yellow-400 to-purple-500"
        />
      </div>
    </motion.div>
  );
}