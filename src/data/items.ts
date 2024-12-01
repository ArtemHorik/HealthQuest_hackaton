import { ShopItem } from '../types/game';

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'wisdom-circlet',
    name: 'Royal Crown',
    description: 'A majestic crown that bestows royal wisdom and enhances XP gain',
    xpBonus: 10,
    price: 150,
    icon: '👑',
    slot: 'head',
    slotLabel: 'Head',
    available: true
  },
  {
    id: 'mystic-robe',
    name: 'Mystic Robe',
    description: 'An enchanted robe that increases all XP gains',
    xpBonus: 15,
    price: 200,
    icon: '👘',
    slot: 'body',
    slotLabel: 'Body',
    available: true
  },
  {
    id: 'power-gloves',
    name: 'Power Gloves',
    description: 'Enchanted gloves that boost physical training XP',
    xpBonus: 20,
    price: 175,
    icon: '🧤',
    slot: 'hands',
    slotLabel: 'Hands',
    available: true
  },
  {
    id: 'power-boots',
    name: 'Power Boots',
    description: 'Swift boots that enhance movement and XP gain',
    xpBonus: 12,
    price: 300,
    icon: '👢',
    slot: 'feet',
    slotLabel: 'Feet',
    available: true
  },
  {
    id: 'fortune-amulet',
    name: 'Fortune Amulet',
    description: 'A magical amulet that brings fortune and bonus XP',
    xpBonus: 25,
    price: 500,
    icon: '📿',
    slot: 'accessory',
    slotLabel: 'Accessory',
    available: true
  }
];