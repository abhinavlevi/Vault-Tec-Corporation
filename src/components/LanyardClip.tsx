import React from 'react';

interface LanyardClipProps {
  className?: string;
}

export const LanyardClip: React.FC<LanyardClipProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center -mb-3 z-20 ${className}`}>
      {/* Metal clip */}
      <div className="w-9 h-6 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500 rounded-t-sm shadow-md border border-slate-400/80 flex items-center justify-center relative">
        <div className="w-5 h-2 bg-slate-700/60 rounded-xs border border-slate-300/40" />
        {/* Metal spring hinge rivets */}
        <div className="absolute -left-1 top-2 w-1.5 h-2 bg-slate-500 rounded-xs" />
        <div className="absolute -right-1 top-2 w-1.5 h-2 bg-slate-500 rounded-xs" />
      </div>
      {/* Transparent vinyl strap with snap button */}
      <div className="w-5 h-9 bg-white/70 backdrop-blur-xs border-x border-slate-300 shadow-sm flex items-center justify-center relative">
        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 border border-slate-500 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        </div>
      </div>
    </div>
  );
};
