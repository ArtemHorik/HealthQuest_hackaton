import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';

interface MissionTimerProps {
  target: number; // in minutes
  onComplete: (minutes: number) => void;
}

export function MissionTimer({ target, onComplete }: MissionTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => {
          const newSeconds = s + 1;
          if (newSeconds >= target * 60) {
            setIsRunning(false);
            onComplete(target);
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, target, onComplete]);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const buttonClass = "bg-purple-500 hover:bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="inline-flex items-center gap-2 text-white bg-white/10 rounded-lg px-3 py-1">
      <span className="font-mono">{String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}</span>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className={buttonClass}
        type="button"
        disabled={seconds >= target * 60}
      >
        {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
      </button>
      {seconds > 0 && (
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          disabled={isRunning}
        >
          <Square className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}