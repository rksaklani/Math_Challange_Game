import React from 'react';

interface DifficultySelectorProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export default function DifficultySelector({ difficulty, onSelect }: DifficultySelectorProps) {
  return (
    <div className="flex justify-center gap-4 mb-4">
      {(['easy', 'medium', 'hard'] as const).map((d) => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            difficulty === d
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </button>
      ))}
    </div>
  );
}