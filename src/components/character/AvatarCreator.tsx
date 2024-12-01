import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { createAvatar } from '@dicebear/core';
import * as pixelArt from '@dicebear/pixel-art';

interface AvatarCreatorProps {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
}

export function AvatarCreator({ selectedAvatar, onSelect }: AvatarCreatorProps) {
  const avatars = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const avatar = createAvatar(pixelArt.style, {
        seed: `avatar-${i}`,
        size: 128,
        backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
        backgroundType: ['solid'],
        accessories: ['variant0' + ((i % 5) + 1)],
        hair: ['variant0' + ((i % 7) + 1)],
      });
      
      return {
        id: `avatar-${i}`,
        svg: avatar.toDataUriSync()
      };
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {avatars.map((avatar) => (
        <motion.button
          key={avatar.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(avatar.id)}
          className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
            selectedAvatar === avatar.id
              ? 'ring-4 ring-purple-400 bg-white/10'
              : 'hover:ring-2 hover:ring-purple-300 bg-white/5'
          }`}
        >
          <img
            src={avatar.svg}
            alt={`Avatar option ${avatar.id}`}
            className="w-full h-full object-contain p-4"
          />
        </motion.button>
      ))}
    </div>
  );
}