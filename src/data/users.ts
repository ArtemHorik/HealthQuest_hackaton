import { Character } from '../types/game';
import { Guild } from '../types/game';

export interface User extends Character {
  city: string;
  lastActive?: string;
  status: 'online' | 'offline';
  guildId?: string;
  achievements: string[];
  totalPoints: number;
}

export const BULGARIAN_USERS: User[] = [
  {
    id: '1',
    name: 'George Ivanov',
    city: 'Sofia',
    avatar: '{"face":{"patternIndex":0,"colorId":"blue"},"eyes":{"patternIndex":0,"colorId":"white"},"mouth":{"patternIndex":0,"colorId":"red"}}',
    level: 15,
    xp: 2500,
    status: 'online',
    goals: ['Increase Activity', 'Healthy Eating'],
    activityLevel: 'advanced',
    guildId: 'health-warriors',
    achievements: ['30-Day Streak', 'Early Bird'],
    totalPoints: 2500
  },
  {
    id: '2',
    name: 'Maria Petrova',
    city: 'Plovdiv',
    avatar: '{"face":{"patternIndex":0,"colorId":"purple"},"eyes":{"patternIndex":1,"colorId":"yellow"},"mouth":{"patternIndex":0,"colorId":"pink"}}',
    level: 12,
    xp: 2350,
    status: 'online',
    goals: ['Yoga Practice', 'Meditation'],
    activityLevel: 'intermediate',
    guildId: 'health-warriors',
    achievements: ['Yoga Master', 'Meditation Guru'],
    totalPoints: 2350
  },
  {
    id: '3',
    name: 'Dimitar Todorov',
    city: 'Varna',
    avatar: '{"face":{"patternIndex":1,"colorId":"green"},"eyes":{"patternIndex":0,"colorId":"cyan"},"mouth":{"patternIndex":1,"colorId":"orange"}}',
    level: 10,
    xp: 2200,
    status: 'offline',
    lastActive: '2 hours ago',
    goals: ['Running', 'Swimming'],
    activityLevel: 'advanced',
    guildId: 'sea-runners',
    achievements: ['Marathon Runner', 'Swimmer'],
    totalPoints: 2200
  },
  {
    id: '4',
    name: 'Elena Stoyanova',
    city: 'Burgas',
    avatar: '{"face":{"patternIndex":0,"colorId":"red"},"eyes":{"patternIndex":1,"colorId":"white"},"mouth":{"patternIndex":0,"colorId":"red"}}',
    level: 8,
    xp: 2100,
    status: 'online',
    goals: ['Cardio', 'Stretching'],
    activityLevel: 'intermediate',
    guildId: 'health-warriors',
    achievements: ['Cardio Queen', '10k Steps'],
    totalPoints: 2100
  },
  {
    id: '5',
    name: 'Nikolay Kolev',
    city: 'Ruse',
    avatar: '{"face":{"patternIndex":1,"colorId":"blue"},"eyes":{"patternIndex":0,"colorId":"yellow"},"mouth":{"patternIndex":1,"colorId":"orange"}}',
    level: 7,
    xp: 2000,
    status: 'offline',
    lastActive: '5 hours ago',
    goals: ['Strength Training', 'Functional Fitness'],
    activityLevel: 'beginner',
    guildId: 'power-lifters',
    achievements: ['Power Endurance', 'Beginner Athlete'],
    totalPoints: 2000
  },
  {
    id: '6',
    name: 'Victoria Andreeva',
    city: 'Stara Zagora',
    avatar: '{"face":{"patternIndex":0,"colorId":"purple"},"eyes":{"patternIndex":1,"colorId":"cyan"},"mouth":{"patternIndex":0,"colorId":"pink"}}',
    level: 6,
    xp: 1900,
    status: 'online',
    goals: ['Pilates', 'Balanced Diet'],
    activityLevel: 'intermediate',
    guildId: 'health-warriors',
    achievements: ['Pilates Pro', 'Healthy Lifestyle'],
    totalPoints: 1900
  }
];

export const GUILDS: Record<string, Guild> = {
  'health-warriors': {
    id: 'health-warriors',
    name: 'Health Warriors',
    description: 'A community focused on building strength and healthy habits together',
    members: [],
    activeMissions: [],
    level: 5,
    xp: 12000,
    memberCount: 15,
    maxMembers: 20
  },
  'sea-runners': {
    id: 'sea-runners',
    name: 'Sea Runners',
    description: 'Coastal running enthusiasts pushing their limits',
    members: [],
    activeMissions: [],
    level: 4,
    xp: 10000,
    memberCount: 8,
    maxMembers: 15
  },
  'power-lifters': {
    id: 'power-lifters',
    name: 'Power Lifters Guild',
    description: 'Dedicated to strength training and personal records',
    members: [],
    activeMissions: [],
    level: 3,
    xp: 8000,
    memberCount: 12,
    maxMembers: 20
  },
  'yoga-masters': {
    id: 'yoga-masters',
    name: 'Yoga Masters',
    description: 'Finding balance through mindful movement',
    members: [],
    activeMissions: [],
    level: 4,
    xp: 9500,
    memberCount: 10,
    maxMembers: 15
  }
};