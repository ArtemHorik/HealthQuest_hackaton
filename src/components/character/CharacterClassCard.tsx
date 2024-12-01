import React from 'react';
import { CharacterClass, ClassDetails } from '../../types/game';

interface CharacterClassCardProps {
  classType: CharacterClass;
  details: ClassDetails;
  isSelected: boolean;
  onSelect: () => void;
}

export function CharacterClassCard({ classType, details, isSelected, onSelect }: CharacterClassCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full rounded-lg overflow-hidden transition-all duration-300 transform ${
        isSelected ? 'scale-105 ring-4 ring-yellow-400' : 'hover:scale-102'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <img
        src={details.image}
        alt={details.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-xl font-bold text-white mb-1">{details.name}</h3>
        <p className="text-gray-300 text-sm mb-2">{details.specialization}</p>
        <p className="text-gray-400 text-xs">{details.description}</p>
      </div>
    </button>
  );
}