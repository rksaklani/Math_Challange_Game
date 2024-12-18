import React from 'react';
import { CheckCircle2, XCircle, BarChart2 } from 'lucide-react';
import { ProgressStats } from '../types/game';
import { formatAccuracy } from '../utils/gameUtils';

interface ProgressModalProps {
  stats: ProgressStats;
  onClose: () => void;
}

export default function ProgressModal({ stats, onClose }: ProgressModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Progress Report</h2>
          <BarChart2 className="w-6 h-6 text-indigo-600" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium">Correct Answers</span>
            </div>
            <span className="text-lg font-bold text-green-600">{stats.correct}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium">Incorrect Answers</span>
            </div>
            <span className="text-lg font-bold text-red-600">{stats.incorrect}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
            <span className="font-medium">Accuracy</span>
            <span className="text-lg font-bold text-indigo-600">
              {formatAccuracy(stats.accuracy)}
            </span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
        >
          Continue Playing
        </button>
      </div>
    </div>
  );
}