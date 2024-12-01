import React, { useState } from 'react';
import { Trophy, Users, Home, Target, User, Package, ShoppingBag, Coins } from 'lucide-react';
import { Character } from '../../types/game';
import { useNavigation } from '../../contexts/NavigationContext';
import { useCharacter } from '../../contexts/CharacterContext';
import { XPBar } from '../xp/XPBar';
import { PixelAvatarDisplay } from '../character/PixelAvatarDisplay';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {children}
    </div>
  );
}

export function Menu({ character }: { character?: Character }) {
  const { currentPage, setCurrentPage } = useNavigation();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Target, label: 'Missions', id: 'missions' },
    { icon: Users, label: 'Guild', id: 'guild' },
    { icon: Trophy, label: 'Leaderboard', id: 'leaderboard' },
    { icon: Package, label: 'Inventory', id: 'inventory' },
    { icon: ShoppingBag, label: 'Shop', id: 'shop' },
    { icon: User, label: 'Profile', id: 'profile' },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:w-64 md:h-full flex flex-col gap-2">
      {character && (
        <div className="hidden md:block mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#314f1f] flex items-center justify-center">
            <PixelAvatarDisplay avatarData={character.avatar} size={64} />
          </div>
          <h2 className="text-lg font-semibold text-white">{character.name}</h2>
          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
            <img src="https://i.ibb.co/02FV8sY/coin.png" alt="Coin" className="w-4 h-4" />
            <span>{character.coins}</span>
          </div>
          <div className="mt-2 px-2">
            <XPBar 
              currentXP={character.xp} 
              maxXP={character.level * 1000} 
              level={character.level}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap md:flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as any)}
            className={`flex items-center justify-center md:justify-start gap-3 flex-1 md:w-full min-w-[64px] md:min-w-0 px-4 py-2 rounded-lg transition-colors ${
              currentPage === item.id
                ? 'bg-white/20 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden md:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}