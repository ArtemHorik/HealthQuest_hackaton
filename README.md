# HealthQuest - Gamified Fitness Journey

HealthQuest is a gamified fitness tracking application that transforms your health journey into an engaging RPG-style adventure. Built with React, TypeScript, and Tailwind CSS, it offers an immersive experience where users can create characters, complete missions, join guilds, and track their fitness progress.

## Features

### Character Creation
- Customizable pixel art avatars
- Character name selection
- Activity level settings (Beginner, Intermediate, Advanced)
- Multiple fitness goals selection
- Personalized fitness journey setup

### Missions System
- **Physical Activity**
  - Step tracking
  - Workout timers
  - Quick-add exercise tracking
  
- **Mind Training**
  - Meditation sessions
  - Focus exercises
  - Mental wellness activities
  
- **Sleep & Rest**
  - Sleep schedule tracking
  - Evening routine missions
  - Recovery activities

### Guild System
- Join existing guilds or create new ones
- Collaborative guild missions
- Weekly guild goals
- Guild chat for member communication
- Guild achievements and rankings
- Member management system
- Guild ownership transfer

### Progress Tracking
- XP and leveling system
- Daily activity stats
- Achievement system
- Personal goals tracking
- Activity streaks

## Technical Architecture

### Core Technologies
- React 18.3
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

### Key Components

#### Character System
- `CharacterSelection.tsx`: Multi-step character creation
- `PixelAvatarGenerator.tsx`: Custom avatar creation
- `CharacterContext.tsx`: Global character state management

#### Mission System
- `MissionCard.tsx`: Mission display and interaction
- `MissionTimer.tsx`: Timer-based mission tracking
- `GenerateMissionButton.tsx`: AI-powered mission generation

#### Guild System
- `GuildChat.tsx`: Real-time guild communication
- `GuildWeeklyGoal.tsx`: Collaborative goals tracking
- `ManageMembersModal.tsx`: Guild member management

#### Layout
- `GameLayout.tsx`: Main application layout
- `Navigation.tsx`: Game navigation system
- `Header.tsx`: Application header

### State Management
- React Context for global state
- Local state for component-specific data
- Persistent storage for user progress

## User Experience

### Character Progression
1. Create personalized character
2. Select fitness goals and activity level
3. Complete missions to gain XP
4. Level up and unlock achievements

### Social Features
1. Join a guild
2. Participate in guild missions
3. Communicate with guild members
4. Contribute to guild goals

### Mission System
1. View available missions by category
2. Track progress in real-time
3. Complete missions for XP rewards
4. Generate new missions based on profile

## Development

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
src/
├── components/
│   ├── character/    # Character-related components
│   ├── guild/        # Guild system components
│   ├── missions/     # Mission system components
│   ├── layout/       # Layout components
│   ├── progress/     # Progress tracking components
│   └── xp/          # XP system components
├── contexts/         # React contexts
├── data/            # Static data and types
├── pages/           # Main application pages
└── types/           # TypeScript type definitions
```

## Future Enhancements

- Integration with fitness tracking devices
- Advanced mission generation system
- Enhanced guild features
- Social challenges and events
- Achievements marketplace
- Custom mission creation tools
- Mobile app version