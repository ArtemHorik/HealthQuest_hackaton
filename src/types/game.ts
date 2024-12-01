export interface Character {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  goals: string[];
  activityLevel: 'beginner' | 'intermediate' | 'advanced';
  guildId?: string;
  isGuildOwner?: boolean;
  coins: number;
  inventory: InventoryItem[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'guild';
  target: number;
  progress: number;
  reward: {
    xp: number;
    accessories?: string[];
  };
  deadline: Date;
}

export interface Guild {
  id: string;
  name: string;
  members: {
    id: string;
    name: string;
    avatar: string;
    isOwner: boolean;
    joinedAt: Date;
  }[];
  activeMissions: Mission[];
  level: number;
  xp: number;
  description?: string;
  memberCount: number;
  maxMembers: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  xpBonus: number;
  price: number;
  icon: string;
  slot: 'head' | 'body' | 'hands' | 'feet' | 'accessory';
  slotLabel: string;
  isEquipped?: boolean;
  quantity?: number;
}

export interface ShopItem extends InventoryItem {
  available: boolean;
}