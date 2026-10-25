import React from 'react';

interface BrandMarkProps {
  variant?: 'white' | 'dark' | 'yellow';
  type?: 'full' | 'emblem';
  className?: string;
  alt?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  variant = 'yellow',
  type = 'full',
  className = 'h-8 w-auto object-contain',
  alt = 'Vault-Tec Corporation'
}) => {
  const src = type === 'full' 
    ? `/presets/logo_${variant}.png`
    : `/presets/emblem_${variant}.png`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      crossOrigin="anonymous"
    />
  );
};
