import React from 'react';
import { HistoryItem } from '../types';

interface HistoryProps {
  items: HistoryItem[];
  onClearHistory: () => void;
}

export const History: React.FC<HistoryProps> = ({ items, onClearHistory }) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-slate-950/50 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">History</span>
        <button 
          onClick={onClearHistory}
          className="text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="max-h-32 overflow-y-auto space-y-1 text-sm font-mono pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-slate-300 border-b border-slate-800/50 pb-1">
            <span className="text-slate-500">{item.expression} =</span>
            <span className="font-bold text-emerald-400">{item.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
};