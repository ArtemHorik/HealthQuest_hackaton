import React, { useState } from 'react';
import { MissionCard } from '../components/missions/MissionCard';
import { GenerateMissionButton } from '../components/missions/GenerateMissionButton';
import { Users, User, Activity, Moon, Target, Brain } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';
import { motion } from 'framer-motion';
import { MISSION_TEMPLATES, GUILD_MISSION_TEMPLATES } from '../data/missions';

const MAX_MISSIONS_PER_CATEGORY = 4;

const GUILD_MISSIONS = [
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

const personalMissions = [
  {
    title: 'Daily Steps Goal',
    description: 'Walk 5000 steps today',
    progress: 3000,
    target: 5000,
    unit: 'steps',
    type: 'personal',
    category: 'physical',
    xp: 150,
    coins: 50,
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
    xp: 100,
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
    xp: 80,
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
    xp: 150,
    coins: 75,
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
    coins: 100,
    trackingType: 'checkbox'
  },
];

export function Missions() {
  const { character, setCharacter, updateDailyStats } = useCharacter();
  const [missions, setMissions] = useState({
    personal: personalMissions,
    guild: character?.guildId ? GUILD_MISSIONS : []
  });
  const [showGuildNotification, setShowGuildNotification] = useState(false);
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({
    physical: false,
    mind: false,
    sleep: false,
    guild: false,
    regenerating: false
  });
  const [regeneratingMissions, setRegeneratingMissions] = useState<Record<string, boolean>>({});
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  const handleGenerateMission = async (category: string) => {
    if (!character) return;
    
    // Get available mission templates for the category
    const templates = MISSION_TEMPLATES[category];
    
    // Get current missions in this category
    const currentMissions = missions.personal.filter(m => m.category === category);
    const currentTitles = new Set(currentMissions.map(m => m.title));
    
    // Filter out templates that are already active
    const availableTemplates = templates.filter(t => !currentTitles.has(t.title));
    
    if (availableTemplates.length === 0) {
      // No unique missions available
      return;
    }
    
    setIsGenerating(prev => ({ ...prev, [category]: true }));
    
    // Simulate API call delay
    setTimeout(() => {
      // Randomly select a template from available ones
      const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
      
      const newMission = {
        ...template,
        progress: 0,
        type: 'personal',
        category,
      };
      
      setMissions(prev => ({
        ...prev,
        personal: [...prev.personal, newMission]
      }));
      
      setIsGenerating(prev => ({ ...prev, [category]: false }));
    }, 2000);
  };

  const handleQuickAction = (mission: any) => {
    const prevProgress = mission.progress;
    const isCheckbox = mission.trackingType === 'checkbox';
    const newProgress = isCheckbox ? mission.target : Math.min(prevProgress + 1, mission.target);
    const isCompleting = prevProgress < mission.target && newProgress === mission.target;
    
    // Calculate bonus XP from equipped items
    const xpBonus = character?.inventory
      .filter(item => item.isEquipped)
      .reduce((total, item) => total + item.xpBonus, 0) || 0;
    
    const baseXP = mission.xp;
    const bonusXP = Math.floor(baseXP * (xpBonus / 100));
    const totalXP = baseXP + bonusXP;
    const coinsReward = mission.coins || 0;
    
    // Update mission progress first
    setMissions(prev => ({
      ...prev,
      [mission.type]: prev[mission.type].map(m =>
        m.title === mission.title
          ? { ...m, progress: newProgress }
          : m
      )
    }));
    
    // Update character XP when mission is completed
    if (isCompleting) {
      // Update daily stats
      updateDailyStats(prev => ({
        ...prev,
        steps: prev.steps + (mission.unit === 'steps' ? mission.target : 0),
        activeMinutes: prev.activeMinutes + (mission.unit === 'minutes' ? mission.target : 0)
      }));
      
      setCharacter(prev => ({
        ...prev,
        xp: prev.xp + totalXP,
        coins: prev.coins + (coinsReward || 0)
      }));

      // Update daily XP separately to avoid double counting
      updateDailyStats(prev => ({
        ...prev,
        xp: prev.xp + totalXP
      }));
      
      setCompletedMissions(prev => [...prev, mission.title]);
      
      // Remove mission after animation
      setTimeout(() => {
        setMissions(prev => ({
          ...prev,
          [mission.type]: prev[mission.type].filter(m => m.title !== mission.title)
        })); 
      }, 800); // Reduced animation time for smoother transitions
    }
  };

  const handleRegenerateMission = (mission: any, reason: string) => {
    if (isGenerating.regenerating) return;
    
    setIsGenerating(prev => ({ ...prev, regenerating: true }));
    setRegeneratingMissions(prev => ({ ...prev, [mission.title]: true }));
    
    // Simulate API call delay
    setTimeout(() => {
      let newMission;
      
      if (mission.type === 'guild') {
        // For guild missions, select a random template
        const template = GUILD_MISSION_TEMPLATES[
          Math.floor(Math.random() * GUILD_MISSION_TEMPLATES.length)
        ];
        newMission = { ...template, progress: 0, id: Date.now().toString() };
      } else {
        // For personal missions, use the existing template logic
        const templates = MISSION_TEMPLATES[mission.category];
        const currentMissions = missions.personal.filter(m => m.category === mission.category);
        const currentTitles = new Set(currentMissions.map(m => m.title));
        const availableTemplates = templates.filter(t => !currentTitles.has(t.title));
        
        if (availableTemplates.length === 0) {
          setRegeneratingMissions(prev => ({ ...prev, [mission.title]: false }));
          setIsGenerating(prev => ({ ...prev, regenerating: false }));
          return;
        }
        
        const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
        newMission = {
          ...template,
          progress: 0,
          type: 'personal',
          category: mission.category,
        };
      }
      
      setMissions(prev => ({
        ...prev,
        [mission.type]: prev[mission.type].map(m => 
          m.title === mission.title ? newMission : m
        )
      }));
      
      setRegeneratingMissions(prev => ({ ...prev, [mission.title]: false }));
      setIsGenerating(prev => ({ ...prev, regenerating: false }));
    }, 2000);
  };

  const getMissionsByCategory = (category: string) => 
    missions.personal.filter(m => m.category === category);

  // Show notification when joining a guild
  React.useEffect(() => {
    if (character?.guildId) {
      setShowGuildNotification(true);
      setMissions(prev => ({
        ...prev,
        guild: GUILD_MISSIONS
      }));
      // Hide notification after 5 seconds
      setTimeout(() => setShowGuildNotification(false), 5000);
    }
  }, [character?.guildId]);

  return (
    <div className="space-y-8">
      {character?.guildId && missions.guild.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Guild Missions</h2>
            </div>
            {showGuildNotification && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-lg"
              >
                New guild missions available!
              </motion.div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {missions.guild.map((mission, index) => (
              <MissionCard
                key={index}
                {...mission}
                onQuickAction={() => handleQuickAction(mission)}
                onRegenerate={isGenerating.regenerating ? undefined : (reason) => handleRegenerateMission(mission, reason)}
                isRegenerating={regeneratingMissions[mission.title]}
              />
            ))}
            {missions.guild.length < MAX_MISSIONS_PER_CATEGORY && (
              <GenerateMissionButton
                category="guild"
                character={character}
                onGenerate={async () => {
                  setIsGenerating(prev => ({ ...prev, guild: true }));
                  
                  // Simulate API delay
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  
                  // Get current guild mission titles
                  const currentTitles = new Set(missions.guild.map(m => m.title));
                  
                  // Filter out templates that are already active
                  const availableTemplates = GUILD_MISSION_TEMPLATES.filter(
                    t => !currentTitles.has(t.title)
                  );
                  
                  if (availableTemplates.length === 0) {
                    setIsGenerating(prev => ({ ...prev, guild: false }));
                    return;
                  }
                  
                  const template = GUILD_MISSION_TEMPLATES[
                    Math.floor(Math.random() * availableTemplates.length)
                  ];
                  const newMission = { ...template, progress: 0, id: Date.now().toString() };
                  setMissions(prev => ({
                    ...prev,
                    guild: [...prev.guild, newMission]
                  }));
                  
                  setIsGenerating(prev => ({ ...prev, guild: false }));
                }}
                isLoading={isGenerating['guild']}
              />
            )}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Personal Missions</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-gray-300 mb-3">
              <Activity className="w-4 h-4" />
              <h3 className="text-lg font-medium">Physical Activity</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getMissionsByCategory('physical').map((mission, index) => (
                <MissionCard
                  key={index}
                  {...mission}
                  onQuickAction={() => handleQuickAction(mission)}
                  onRegenerate={isGenerating.regenerating ? undefined : (reason) => handleRegenerateMission(mission, reason)}
                  isRegenerating={regeneratingMissions[mission.title]}
                />
              ))}
              {getMissionsByCategory('physical').length < MAX_MISSIONS_PER_CATEGORY && (
                <GenerateMissionButton
                  category="physical"
                  character={character}
                  onGenerate={() => handleGenerateMission('physical')}
                  isLoading={isGenerating['physical']}
                />
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-300 mb-3">
              <Brain className="w-4 h-4" />
              <h3 className="text-lg font-medium">Mind Training</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getMissionsByCategory('mind').map((mission, index) => (
                <MissionCard
                  key={index}
                  {...mission}
                  onQuickAction={() => handleQuickAction(mission)}
                  onRegenerate={isGenerating.regenerating ? undefined : (reason) => handleRegenerateMission(mission, reason)}
                  isRegenerating={regeneratingMissions[mission.title]}
                />
              ))}
              {getMissionsByCategory('mind').length < MAX_MISSIONS_PER_CATEGORY && (
                <GenerateMissionButton
                  category="mind"
                  character={character}
                  onGenerate={() => handleGenerateMission('mind')}
                  isLoading={isGenerating['mind']}
                />
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-300 mb-3">
              <Moon className="w-4 h-4" />
              <h3 className="text-lg font-medium">Sleep & Rest</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getMissionsByCategory('sleep').map((mission, index) => (
                <MissionCard
                  key={index}
                  {...mission}
                  onQuickAction={() => handleQuickAction(mission)}
                  onRegenerate={isGenerating.regenerating ? undefined : (reason) => handleRegenerateMission(mission, reason)}
                  isRegenerating={regeneratingMissions[mission.title]}
                />
              ))}
              {getMissionsByCategory('sleep').length < MAX_MISSIONS_PER_CATEGORY && (
                <GenerateMissionButton
                  category="sleep"
                  character={character}
                  onGenerate={() => handleGenerateMission('sleep')}
                  isLoading={isGenerating['sleep']}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}