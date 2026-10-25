import React from 'react';

interface HolographicSealProps {
  serial?: string;
  className?: string;
}

export const HolographicSeal: React.FC<HolographicSealProps> = ({
  serial = 'VT-SEC-77',
  className = ''
}) => {
  return (
    <div
      className={`relative w-14 h-14 rounded-full border border-slate-300/60 overflow-hidden shadow-sm flex items-center justify-center p-1 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #e0f2fe 0%, #fef08a 25%, #fbcfe8 50%, #c7d2fe 75%, #bbf7d0 100%)',
      }}
      title="Tamper-Evident Holographic Authentication Seal"
    >
      {/* Iridescent shimmer overlay */}
      <div 
        className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),transparent_60%)] pointer-events-none" 
      />
      {/* Geometric guilloche pattern */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full opacity-65 text-slate-800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3,2" />
        
        {/* Micro Vault-Tec Wing lines */}
        <path d="M 20 50 Q 50 35 80 50 Q 50 65 20 50 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        
        {/* Curved microtext path */}
        <path id="holoCircle" d="M 50,50 m -24,0 a 24,24 0 1,1 48,0 a 24,24 0 1,1 -48,0" fill="none" />
        <text fontSize="5.5" fontWeight="bold" letterSpacing="1px" fill="currentColor">
          <textPath href="#holoCircle" startOffset="0%">
            SECURE • VAULT-TEC • VALID •
          </textPath>
        </text>
      </svg>
      {/* Serial overlay badge */}
      <div className="absolute bottom-1 px-1 py-0.2 rounded bg-slate-900/80 text-[6px] font-mono text-amber-300 font-bold tracking-widest uppercase">
        {serial.slice(-6)}
      </div>
    </div>
  );
};
