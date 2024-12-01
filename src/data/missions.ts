export const GUILD_MISSIONS = [
  {
    title: 'Guild Training',
    description: 'Complete a 15-minute workout for the guild',
    progress: 0,
    target: 15,
    unit: 'minutes',
    type: 'guild',
    xp: 200,
    coins: 100,
    trackingType: 'timer'
  },
  {
    title: 'Weekly Challenge',
    description: 'Complete 30 minutes of exercise for the guild',
    progress: 0,
    target: 30,
    unit: 'minutes',
    type: 'guild',
    xp: 300,
    coins: 150,
    trackingType: 'timer'
  }
];

export const MISSION_TEMPLATES = {
  physical: [
    {
      title: 'Morning Jog',
      description: 'Start your day with a refreshing jog',
      target: 20,
      unit: 'minutes',
      xp: 150,
      trackingType: 'timer'
    },
    {
      title: 'Push-up Challenge',
      description: 'Complete a set of push-ups',
      target: 20,
      unit: 'repetitions',
      xp: 100,
      trackingType: 'quick-add'
    },
    {
      title: 'Stair Climbing',
      description: 'Take the stairs instead of elevator',
      target: 10,
      unit: 'floors',
      xp: 120,
      trackingType: 'quick-add'
    },
    {
      title: 'Cycling Session',
      description: 'Go for a bike ride',
      target: 30,
      unit: 'minutes',
      xp: 200,
      trackingType: 'timer'
    }
  ],
  mind: [
    {
      title: 'Deep Breathing',
      description: 'Practice deep breathing exercises',
      target: 10,
      unit: 'minutes',
      xp: 100,
      trackingType: 'timer'
    },
    {
      title: 'Mindful Reading',
      description: 'Read a book mindfully',
      target: 20,
      unit: 'minutes',
      xp: 150,
      trackingType: 'timer'
    },
    {
      title: 'Gratitude Journal',
      description: "Write down three things you're grateful for",
      target: 1,
      unit: 'completion',
      xp: 100,
      trackingType: 'checkbox'
    },
    {
      title: 'Focus Training',
      description: 'Complete a focused work session',
      target: 25,
      unit: 'minutes',
      xp: 180,
      trackingType: 'timer'
    }
  ],
  sleep: [
    {
      title: 'Digital Sunset',
      description: 'No screen time before bed',
      target: 1,
      unit: 'completion',
      xp: 150,
      trackingType: 'checkbox'
    },
    {
      title: 'Bedtime Routine',
      description: 'Follow your evening routine',
      target: 15,
      unit: 'minutes',
      xp: 120,
      trackingType: 'timer'
    },
    {
      title: 'Sleep Schedule',
      description: 'Go to bed at your target time',
      target: 1,
      unit: 'completion',
      xp: 200,
      trackingType: 'checkbox'
    },
    {
      title: 'Evening Relaxation',
      description: 'Practice relaxation techniques before bed',
      target: 10,
      unit: 'minutes',
      xp: 130,
      trackingType: 'timer'
    }
  ]
};

export const PERSONAL_MISSIONS = [
  {
    title: 'Daily Steps Goal',
    description: 'Walk 5000 steps today',
    progress: 3000,
    target: 5000,
    unit: 'steps',
    type: 'personal',
    category: 'physical',
    xp: 100,
    trackingType: 'input'
  },
  {
    title: 'Evening Stretching',
    description: 'Do 10 minutes of stretching after work',
    progress: 0,
    target: 10,
    unit: 'minutes',
    type: 'personal',
    category: 'physical',
    xp: 120,
    coins: 50,
    trackingType: 'timer'
  },
  {
    title: 'Hydration Challenge',
    description: 'Drink 8 glasses of water today',
    progress: 3,
    target: 8,
    unit: 'glasses',
    type: 'personal',
    category: 'physical',
    xp: 100,
    trackingType: 'quick-add'
  },
  {
    title: 'Mindful Meditation',
    description: 'Practice mindfulness meditation',
    progress: 0,
    target: 10,
    unit: 'minutes',
    type: 'personal',
    category: 'mind',
    xp: 200,
    coins: 100,
    trackingType: 'timer'
  },
  {
    title: 'Early Sleep',
    description: 'Go to bed before 11 PM tonight',
    progress: 0,
    target: 1,
    unit: 'completion',
    type: 'personal',
    category: 'sleep',
    xp: 200,
    coins: 150,
    trackingType: 'checkbox'
  },
];