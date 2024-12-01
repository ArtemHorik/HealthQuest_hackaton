import { CharacterClass, ClassDetails } from '../types/game';

export const CHARACTER_CLASSES: Record<CharacterClass, ClassDetails> = {
  warrior: {
    name: 'Health Warrior',
    description: 'Specializes in intensive training and strength exercises',
    color: '#EF4444',
    specialization: 'Strength Training',
    abilities: [
      'Power Endurance',
      'Explosive Strength',
      'Muscle Hypertrophy'
    ]
  },
  ranger: {
    name: 'Balance Pathfinder',
    description: 'Focuses on cardio activities and endurance',
    color: '#10B981',
    specialization: 'Cardio & Endurance',
    abilities: [
      'Speed',
      'Endurance',
      'Flexibility'
    ]
  },
  mage: {
    name: 'Flexibility Mage',
    description: 'Master of yoga and flexibility exercises',
    color: '#6366F1',
    specialization: 'Yoga & Flexibility',
    abilities: [
      'Balance',
      'Focus',
      'Meditation'
    ]
  },
  healer: {
    name: 'Spirit Healer',
    description: 'Expert in meditation and recovery',
    color: '#8B5CF6',
    specialization: 'Meditation & Recovery',
    abilities: [
      'Recovery',
      'Relaxation',
      'Mental Strength'
    ]
  }
};