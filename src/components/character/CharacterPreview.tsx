import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AvatarIcon } from './AvatarIcon';
import { CharacterClass } from '../../types/game';
import { CHARACTER_CLASSES } from '../../data/characterClasses';

interface CharacterPreviewProps {
  classType: CharacterClass;
}

export function CharacterPreview({ classType }: CharacterPreviewProps) {
  const color = useMemo(() => CHARACTER_CLASSES[classType].color, [classType]);

  return (
    <motion.div 
      className="w-full aspect-square max-w-[400px] mx-auto rounded-lg overflow-hidden relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="w-full h-full flex items-center justify-center p-12"
        style={{ backgroundColor: color }}
      >
        <AvatarIcon type={classType} selected />
      </div>
    </motion.div>
  );
}