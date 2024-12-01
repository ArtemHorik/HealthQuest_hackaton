# HealthQuest - Gamified Fitness Journey

HealthQuest transforms your health journey into an engaging RPG-style adventure. Built with React, TypeScript, and Tailwind CSS, it offers an immersive experience where users can create characters, complete missions, join guilds, and track their fitness progress.

## Live Demo
[View Live Demo](https://famous-blini-a64dd3.netlify.app)

## Features

### Character System
- Customizable pixel art avatars
- Character name selection
- Activity level settings (Beginner, Intermediate, Advanced)
- Multiple fitness goals selection
- XP and leveling system
- Virtual currency (coins)

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
- Real-time guild chat
- Guild achievements and rankings
- Member management system
- Guild ownership transfer

### Progress Tracking
- XP and leveling system
- Daily activity stats
- Achievement system
- Personal goals tracking
- Activity streaks
- Inventory system with equippable items

## Technical Stack

### Frontend (Current)
- React 18.3
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- DiceBear for avatars

### Backend (Planned)
See [Tech Stack Documentation](docs/tech-stack.md) for detailed backend architecture plans.

## Key Components

### Character System
- `CharacterSelection.tsx`: Multi-step character creation
- `PixelAvatarGenerator.tsx`: Custom avatar creation
- `CharacterContext.tsx`: Global character state management

### Mission System
- `MissionCard.tsx`: Mission display and interaction
- `MissionTimer.tsx`: Timer-based mission tracking
- `GenerateMissionButton.tsx`: Mission generation

### Guild System
- `GuildChat.tsx`: Real-time guild communication
- `GuildWeeklyGoal.tsx`: Collaborative goals tracking
- `ManageMembersModal.tsx`: Guild member management

### Layout
- `GameLayout.tsx`: Main application layout
- `Navigation.tsx`: Game navigation system
- `Header.tsx`: Application header

## State Management
- React Context for global state
- Local state for component-specific data
- Persistent storage for user progress

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/healthquest.git

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

### Short Term
- Integration with fitness tracking devices
- Advanced mission generation system
- Enhanced guild features
- Social challenges and events

### Long Term
- Mobile app version
- AI-powered workout recommendations
- Virtual trainer integration
- Cross-platform sync
- Achievements marketplace

## Contributing
Contributions are welcome! Please read our contributing guidelines for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.