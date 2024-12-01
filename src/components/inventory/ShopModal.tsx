import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coins } from 'lucide-react';
import { Character, ShopItem } from '../../types/game';
import { SHOP_ITEMS } from '../../data/items';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onBuyItem: (item: ShopItem) => void;
}

export function ShopModal({
  isOpen,
  onClose,
  character,
  onBuyItem
}: ShopModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-xl font-bold text-white">Shop</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400">{character.coins} coins</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SHOP_ITEMS.map((item) => {
                  const isOwned = character.inventory.some(i => i.id === item.id);
                  const canAfford = character.coins >= item.price;
                  
                  return (
                    <div
                      key={item.id}
                      className="bg-white/5 rounded-lg p-4 flex items-start gap-4 group hover:bg-white/10 transition-colors"
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-yellow-400">
                            <img src="https://i.ibb.co/02FV8sY/coin.png" alt="Coin" className="w-4 h-4" />
                            <span>{item.price}</span>
                          </div>
                          <button
                            onClick={() => onBuyItem(item)}
                            disabled={isOwned || !canAfford}
                            className={`px-3 py-1 rounded text-sm transition-colors ${
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
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}