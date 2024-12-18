import React from 'react';
import { Timer, Trophy, Zap } from 'lucide-react';

interface StatsProps {
  timeLeft: number;
  score: number;
  streak: number;
}

export default function Stats({ timeLeft, score, streak }: StatsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-gray-600" />
        <span className="text-xl font-semibold">{timeLeft}s</span>
      </div>
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="text-xl font-semibold">{score}</span>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-orange-500" />
        <span className="text-xl font-semibold">x{streak}</span>
      </div>
    </div>
  );
}