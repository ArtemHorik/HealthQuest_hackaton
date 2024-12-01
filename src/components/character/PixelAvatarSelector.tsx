import React from 'react';
import { motion } from 'framer-motion';

interface PixelAvatarSelectorProps {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
}

// Predefined pixel art patterns for avatars
const AVATARS = [
  {
    id: 'warrior',
    color: '#EF4444',
    bgColor: '#7F1D1D',
    pattern: [
      '  ██  ',
      ' ████ ',
      '██████',
      ' ████ ',
      ' █  █ ',
    ]
  },
  {
    id: 'mage',
    color: '#6366F1',
    bgColor: '#3730A3',
    pattern: [
      ' ████ ',
      '██████',
      ' ████ ',
      '  ██  ',
      ' █  █ ',
    ]
  },
  {
    id: 'ranger',
    color: '#10B981',
    bgColor: '#065F46',
    pattern: [
      '  ██  ',
      '██████',
      ' ████ ',
      '  ██  ',
      ' █  █ ',
    ]
  },
  {
    id: 'healer',
    color: '#8B5CF6',
    bgColor: '#5B21B6',
    pattern: [
      ' ████ ',
      '██  ██',
      '██████',
      ' ████ ',
      ' █  █ ',
    ]
  },
  {
    id: 'monk',
    color: '#F59E0B',
    bgColor: '#92400E',
    pattern: [
      '  ██  ',
      '██████',
      '██████',
      ' ████ ',
      ' █  █ ',
    ]
  },
  {
    id: 'rogue',
    color: '#EC4899',
    bgColor: '#9D174D',
    pattern: [
      ' ████ ',
      '██████',
      '██████',
      ' ████ ',
      '█    █',
    ]
  }
];

function renderPixelArt(pattern: string[], color: string, bgColor: string) {
  const size = 8; // Size of each pixel
  const width = pattern[0].length * size;
  const height = pattern.length * size;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill={bgColor} />
      {pattern.map((row, y) => 
        Array.from(row).map((pixel, x) => 
          pixel === '█' && (
            <rect
              key={`${x}-${y}`}
              x={x * size}
              y={y * size}
              width={size}
              height={size}
              fill={color}
            />
          )
        )
      )}
    </svg>
  );
}

export function PixelAvatarSelector({ selectedAvatar, onSelect }: PixelAvatarSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {AVATARS.map((avatar) => (
        <motion.button
          key={avatar.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(avatar.id)}
          className={`relative aspect-square p-4 rounded-lg overflow-hidden transition-all duration-300 ${
            selectedAvatar === avatar.id
              ? 'ring-4 ring-purple-400 bg-white/10'
              : 'hover:ring-2 hover:ring-purple-300 bg-white/5'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            {renderPixelArt(avatar.pattern, avatar.color, avatar.bgColor)}
          </div>
        </motion.button>
      ))}
    </div>
  );
}