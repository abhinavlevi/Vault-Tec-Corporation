import React from 'react';
import { BrandMark } from './BrandMark';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetBadge: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onResetBadge,
}) => {
  return (
    <header className="w-full bg-[#07254A] border-b-2 border-amber-400 text-white shadow-md relative z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand & Fun Title */}
        <div className="flex items-center gap-3">
          <BrandMark variant="yellow" type="full" className="h-8 w-auto" />
          <div className="hidden sm:block h-6 w-px bg-blue-800" />
          <p className="hidden sm:block text-xs font-mono text-amber-300 tracking-wider uppercase font-bold">
            Security ID Generator
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          <button
            type="button"
            onClick={onResetBadge}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
