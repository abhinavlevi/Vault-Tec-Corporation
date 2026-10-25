import React from 'react';

interface SmartChipProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const SmartChip: React.FC<SmartChipProps> = ({
  className = '',
  size = 'md'
}) => {
  const isSm = size === 'sm';
  const width = isSm ? 42 : 52;
  const height = isSm ? 32 : 40;

  return (
    <div
      className={`relative rounded-md overflow-hidden border border-amber-500/60 shadow-inner bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      title="EMV Contact Security Smart Chip"
    >
      {/* Etched contact traces */}
      <svg
        viewBox="0 0 52 40"
        className="w-full h-full opacity-70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="52" height="40" fill="none" stroke="#78350F" strokeWidth="0.8" />
        {/* Horizontal dividing tracks */}
        <line x1="0" y1="13" x2="52" y2="13" stroke="#78350F" strokeWidth="0.75" />
        <line x1="0" y1="27" x2="52" y2="27" stroke="#78350F" strokeWidth="0.75" />
        {/* Vertical dividing tracks */}
        <line x1="18" y1="0" x2="18" y2="40" stroke="#78350F" strokeWidth="0.75" />
        <line x1="34" y1="0" x2="34" y2="40" stroke="#78350F" strokeWidth="0.75" />
        {/* Center contact pad */}
        <rect x="18" y="13" width="16" height="14" fill="#FDE68A" fillOpacity="0.4" stroke="#92400E" strokeWidth="0.7" rx="2" />
      </svg>
      {/* Subtle metallic reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />
    </div>
  );
};
