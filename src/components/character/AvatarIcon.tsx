import React from 'react';

interface AvatarIconProps {
  type: 'warrior' | 'ranger' | 'mage' | 'healer';
  selected?: boolean;
}

export function AvatarIcon({ type, selected }: AvatarIconProps) {
  const baseClasses = "w-full h-full";
  
  const icons = {
    warrior: (
      <svg viewBox="0 0 100 100" className={baseClasses}>
        <polygon 
          points="50,10 90,90 10,90" 
          className="fill-current"
          strokeWidth="2"
          stroke="currentColor"
        />
      </svg>
    ),
    ranger: (
      <svg viewBox="0 0 100 100" className={baseClasses}>
        <circle 
          cx="50" 
          cy="50" 
          r="40" 
          className="fill-current"
          strokeWidth="2"
          stroke="currentColor"
        />
      </svg>
    ),
    mage: (
      <svg viewBox="0 0 100 100" className={baseClasses}>
        <path 
          d="M50,10 L90,90 L10,90 Z M50,30 L70,80 L30,80 Z" 
          className="fill-current"
          strokeWidth="2"
          stroke="currentColor"
        />
      </svg>
    ),
    healer: (
      <svg viewBox="0 0 100 100" className={baseClasses}>
        <rect 
          x="20" 
          y="20" 
          width="60" 
          height="60" 
          className="fill-current"
          strokeWidth="2"
          stroke="currentColor"
          transform="rotate(45 50 50)"
        />
      </svg>
    ),
  };

  return (
    <div className={`w-20 h-20 transition-all duration-300 ${
      selected 
        ? 'text-purple-400' 
        : 'text-gray-400 group-hover:text-purple-300'
    }`}>
      {icons[type]}
    </div>
  );
}