import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-[0.2rem] md:gap-4">
      <img
        src="https://i.ibb.co/cvtvDTv/logo-red.png"
        alt="Heart Logo"
        className="h-12"
      />
      <img
        src="https://i.ibb.co/Y0M75tr/text-red.png"
        alt="HealthQuest"
        className="h-12"
      />
    </div>
  );
}