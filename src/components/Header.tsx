import React from 'react';
import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center gap-2">
      <Brain className="w-8 h-8 text-indigo-600" />
      <h1 className="text-3xl font-bold text-gray-800">Math AI Challenge</h1>
    </div>
  );
}