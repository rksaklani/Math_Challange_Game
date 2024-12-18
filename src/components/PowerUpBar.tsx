import React from 'react';
import { Clock, Star, SkipForward } from 'lucide-react';
import { PowerUp } from '../types/game';

interface PowerUpBarProps {
  powerUps: {
    timeBonus: PowerUp;
    pointMultiplier: PowerUp;
    skipQuestion: PowerUp;
  };
  onUsePowerUp: (type: PowerUp['type']) => void;
}

export default function PowerUpBar({ powerUps, onUsePowerUp }: PowerUpBarProps) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => onUsePowerUp('timeBonus')}
        disabled={!powerUps.timeBonus.active}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
          powerUps.timeBonus.active
            ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Clock className="w-5 h-5" />
        +10s
      </button>

      <button
        onClick={() => onUsePowerUp('pointMultiplier')}
        disabled={!powerUps.pointMultiplier.active}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
          powerUps.pointMultiplier.active
            ? 'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Star className="w-5 h-5" />
        x2 Points
      </button>

      <button
        onClick={() => onUsePowerUp('skipQuestion')}
        disabled={!powerUps.skipQuestion.active}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
          powerUps.skipQuestion.active
            ? 'bg-purple-500 text-white shadow-lg hover:bg-purple-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <SkipForward className="w-5 h-5" />
        Skip
      </button>
    </div>
  );
}