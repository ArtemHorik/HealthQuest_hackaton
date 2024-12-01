import React from 'react';
import { Plus } from 'lucide-react';

interface QuickActionButtonProps {
  onClick: () => void;
  unit: string;
  currentValue: number;
  maxValue: number;
}

export function QuickActionButton({ onClick, unit, currentValue, maxValue }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={currentValue >= maxValue}
      className="absolute top-4 right-14 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 
                 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
      title={`Add 1 ${unit}`}
    >
      <Plus className="w-4 h-4" />
    </button>
  );
}