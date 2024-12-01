import React from 'react';
import { useCharacter } from '../contexts/CharacterContext';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { SHOP_ITEMS } from '../data/items';
import { ShopItem } from '../types/game';

export function Shop() {
  const { character, setCharacter } = useCharacter();

  const handleBuyItem = (item: ShopItem) => {
    if (character.coins >= item.price) {
      setCharacter(prev => ({
        ...prev,
        coins: prev.coins - item.price,
        inventory: [...prev.inventory, { ...item, isEquipped: false }]
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold text-white">Shop</h1>
        </div>
        <div className="flex items-center gap-2 text-yellow-400">
          <img src="https://i.ibb.co/02FV8sY/coin.png" alt="Coin" className="w-5 h-5" />
          <span className="font-medium">{character.coins}</span>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SHOP_ITEMS.map((item) => {
            const isOwned = character.inventory.some(i => i.id === item.id);
            const canAfford = character.coins >= item.price;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-lg p-6 flex flex-col group hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <span className="text-xs text-white font-medium">{item.slotLabel}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-white text-sm mt-1">{item.description}</p>
                    <div className="text-purple-400 text-sm mt-2">+{item.xpBonus}% XP Bonus</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <img src="https://i.ibb.co/02FV8sY/coin.png" alt="Coin" className="w-4 h-4" />
                    <span>{item.price}</span>
                  </div>
                  <button
                    onClick={() => handleBuyItem(item)}
                    disabled={isOwned || !canAfford}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isOwned
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : canAfford
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isOwned ? 'Owned' : canAfford ? 'Buy' : 'Not enough coins'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}