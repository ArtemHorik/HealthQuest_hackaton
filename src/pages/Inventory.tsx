import React from 'react';
import { useCharacter } from '../contexts/CharacterContext';
import { Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { InventoryItem } from '../types/game';

const EQUIPMENT_SLOTS = [
  { id: 'head', name: 'Head', icon: '🧢' },
  { id: 'body', name: 'Body', icon: '👕' },
  { id: 'hands', name: 'Hands', icon: '✋' },
  { id: 'feet', name: 'Feet', icon: '👟' },
  { id: 'accessory', name: 'Accessory', icon: '💍' },
] as const;

export function Inventory() {
  const { character, setCharacter } = useCharacter();

  const handleEquipItem = (item: InventoryItem) => {
    // Unequip any item currently in the same slot
    const updatedInventory = character.inventory.map(invItem => ({
      ...invItem,
      isEquipped: invItem.slot === item.slot ? false : invItem.isEquipped
    }));

    // Equip the new item
    setCharacter(prev => ({
      ...prev,
      inventory: updatedInventory.map(invItem => ({
        ...invItem,
        isEquipped: invItem.id === item.id ? true : invItem.isEquipped
      }))
    }));
  };

  const handleUnequipItem = (itemId: string) => {
    setCharacter(prev => ({
      ...prev,
      inventory: prev.inventory.map(item => ({
        ...item,
        isEquipped: item.id === itemId ? false : item.isEquipped
      }))
    }));
  };

  const calculateTotalBonus = () => {
    return character.inventory
      .filter(item => item.isEquipped)
      .reduce((total, item) => total + item.xpBonus, 0);
  };

  const getEquippedItemForSlot = (slot: string) => {
    return character.inventory.find(item => item.slot === slot && item.isEquipped);
  };

  const getUnequippedItems = () => {
    return character.inventory.filter(item => !item.isEquipped);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
        </div>
        <div className="flex items-center gap-2 text-yellow-400">
          <img src="https://i.ibb.co/02FV8sY/coin.png" alt="Coin" className="w-5 h-5" />
          <span className="font-medium">{character.coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment Slots */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white mb-1">Equipment</h2>
            <div className="text-sm text-purple-400">
              Total XP Bonus: +{calculateTotalBonus()}%
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {EQUIPMENT_SLOTS.map((slot) => {
              const equippedItem = getEquippedItemForSlot(slot.id);
              
              return (
                <div
                  key={slot.id}
                  className="bg-white/5 rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
                    {equippedItem ? equippedItem.icon : slot.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-medium">{slot.name}</h3>
                      {equippedItem && (
                        <span className="text-purple-400 text-sm">
                          +{equippedItem.xpBonus}% XP
                        </span>
                      )}
                    </div>
                    {equippedItem ? (
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-gray-400 text-sm">{equippedItem.name}</p>
                        <button
                          onClick={() => handleUnequipItem(equippedItem.id)}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Unequip
                        </button>
                      </div>
                    ) : (
                      <p className="text-white text-sm">Empty slot</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inventory Items */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Available Items</h2>
          <div className="space-y-4">
            {getUnequippedItems().map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-lg p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <span className="text-purple-400 text-sm">+{item.xpBonus}% XP</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-white text-sm">{item.description}</p>
                    <button
                      onClick={() => handleEquipItem(item)}
                      className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
                    >
                      Equip
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {getUnequippedItems().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No items available to equip
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}