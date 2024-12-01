import React, { useState } from 'react';
import { Trophy, Users, User, Plus, Play, Pause, Square, CheckCircle, RefreshCw, Loader2, Coins } from 'lucide-react';
import { MissionTimer } from './MissionTimer';
import { motion, AnimatePresence } from 'framer-motion';
import { RegenerateMissionModal } from './RegenerateMissionModal';

interface MissionCardProps {
  title: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  type: 'personal' | 'guild';
  category?: string;
  xp: number;
  coins?: number;
  trackingType: 'input' | 'timer' | 'quick-add' | 'checkbox' | 'automatic';
  onRegenerate?: (reason: string) => void;
  onQuickAction?: () => void;
  isRegenerating?: boolean;
  showQuickAction?: boolean;
  showTimer?: boolean;
}

export function MissionCard({ 
  title, 
  description, 
  progress, 
  target, 
  unit, 
  type, 
  xp,
  coins,
  trackingType,
  onRegenerate,
  onQuickAction,
  isRegenerating
}: MissionCardProps) {
  const progressPercentage = (progress / target) * 100;
  const showProgress = trackingType !== 'checkbox';
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);

  const handleRegenerate = (reason: string) => {
    onRegenerate?.(reason);
    setIsRegenerateModalOpen(false);
  };
  
  const handleQuickAction = async (e: React.MouseEvent) => {
    e?.stopPropagation();
    if (!onQuickAction) return;

    const isCheckbox = trackingType === 'checkbox';
    const newProgress = isCheckbox ? target : progress + 1;
    const isCompleting = newProgress >= target;

    if (isCompleting) {
      setIsCompleted(true);
      setTimeout(() => {
        onQuickAction();
      }, 1000);
    } else {
      onQuickAction();
    }
  };
  
  return (
    <motion.div
      layout
      className="w-full text-left rounded-lg overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="mission"
            initial={false}
            exit={{ 
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.3 }
            }}
            className={`transition-all p-4 ${
              coins ? 'bg-gradient-to-r from-yellow-900/20 to-yellow-500/10 hover:from-yellow-900/30 hover:to-yellow-500/20 ring-2 ring-yellow-500/30' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-white/90 text-sm flex items-center gap-2 font-medium">
                  {isRegenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Regenerating mission...</span>
                    </>
                  ) : (
                    description
                  )}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-purple-300 text-sm font-medium">+{xp} XP</p>
                  {coins && (
                    <div className="flex items-center gap-1 text-yellow-300 text-sm font-medium">
                      <img src="https://i.ibb.co/02FV8sY/coin.png" alt="Coin" className="w-4 h-4" />
                      <span>+{coins}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onRegenerate && !isRegenerating && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsRegenerateModalOpen(true)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    disabled={isRegenerating}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.button>
                )}
                {isRegenerating && (
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                )}
                {type === 'guild' ? (
                  <Users className="w-5 h-5 text-indigo-400" />
                ) : (
                  <User className="w-5 h-5 text-purple-400" />
                )}
              </div>
            </div>
            {showProgress && (
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <motion.div 
                  className={`rounded-full h-2 ${
                    type === 'guild' ? 'bg-indigo-500' : 'bg-purple-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
            <div className="flex items-center justify-between mt-2">
              {showProgress && (
                <p className="text-white text-xs font-semibold">
                  {progress.toLocaleString()}/{target.toLocaleString()} {unit}
                </p>
              )}
              
              <div className="flex items-center gap-2">
                {trackingType === 'quick-add' && (
                  <motion.button
                    onClick={handleQuickAction}
                    disabled={progress >= target}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 
                             text-white rounded-full w-6 h-6 flex items-center justify-center 
                             transition-colors"
                    title={`Add 1 ${unit}`}
                  >
                    <Plus className="w-3 h-3" />
                  </motion.button>
                )}
                
                {trackingType === 'timer' && (
                  <div className="flex items-center gap-1">
                    <MissionTimer
                      target={target}
                      onComplete={(minutes) => { onQuickAction?.(minutes); }}
                    />
                  </div>
                )}

                {trackingType === 'checkbox' && (
                  <motion.button
                    onClick={handleQuickAction}
                    disabled={isCompleted || progress >= target}
                    className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 
                             text-white rounded-full w-6 h-6 flex items-center justify-center 
                             transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Complete mission"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {progress === target ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <CheckCircle className="w-3 h-3 opacity-50" />
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              backgroundColor: 'rgb(147, 51, 234)'
            }}
            exit={{ 
              opacity: 0,
              scale: 0.8,
              transition: { 
                duration: 1.2,
                ease: "easeInOut"
              }
            }}
            className="p-6 rounded-lg"
          >
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 1, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
              >
                <Trophy className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl font-bold text-white">+{xp} XP</div>
                  {coins && (
                    <div className="flex items-center gap-1 text-yellow-400 text-xl font-bold animate-bounce">
                      <img src="https://i.ibb.co/02FV8sY/coin.png" alt="Coin" className="w-5 h-5" />
                      <span>+{coins}</span>
                    </div>
                  )}
                </div>
                <div className="text-purple-100 text-sm mt-1">Mission Complete!</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <RegenerateMissionModal
        isOpen={isRegenerateModalOpen}
        onClose={() => setIsRegenerateModalOpen(false)}
        onConfirm={handleRegenerate}
        missionTitle={title}
      />
    </motion.div>
  );
}