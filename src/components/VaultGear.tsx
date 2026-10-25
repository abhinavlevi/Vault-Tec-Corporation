import React from 'react';

interface VaultGearProps {
  number: string;
  size?: number;
  gearColor?: string;
  textColor?: string;
  className?: string;
}

export const VaultGear: React.FC<VaultGearProps> = ({
  number,
  size = 120,
  gearColor = '#F5BA13', // Classic Vault-Tec Gold
  textColor = '#0B3A6E', // Deep Vault-Tec Blue
  className = '',
}) => {
  // Vault-Tec gear typically has 10 or 12 teeth with slight trapezoidal angle
  const teethCount = 10;
  const outerR = 90;
  const innerR = 72;
  const centerHoleR = 52;
  const center = 100;

  // Build gear path
  const pathParts: string[] = [];
  const anglePerTooth = (2 * Math.PI) / teethCount;
  const toothWidth = anglePerTooth * 0.45;
  const toothSlope = anglePerTooth * 0.08;

  for (let i = 0; i < teethCount; i++) {
    const baseAngle = i * anglePerTooth;
    
    // Bottom left of tooth
    const a1 = baseAngle - toothWidth / 2 - toothSlope;
    const x1 = center + innerR * Math.cos(a1);
    const y1 = center + innerR * Math.sin(a1);

    // Top left of tooth
    const a2 = baseAngle - toothWidth / 2;
    const x2 = center + outerR * Math.cos(a2);
    const y2 = center + outerR * Math.sin(a2);

    // Top right of tooth
    const a3 = baseAngle + toothWidth / 2;
    const x3 = center + outerR * Math.cos(a3);
    const y3 = center + outerR * Math.sin(a3);

    // Bottom right of tooth
    const a4 = baseAngle + toothWidth / 2 + toothSlope;
    const x4 = center + innerR * Math.cos(a4);
    const y4 = center + innerR * Math.sin(a4);

    if (i === 0) {
      pathParts.push(`M ${x1} ${y1}`);
    } else {
      pathParts.push(`L ${x1} ${y1}`);
    }
    pathParts.push(`L ${x2} ${y2}`);
    pathParts.push(`L ${x3} ${y3}`);
    pathParts.push(`L ${x4} ${y4}`);
  }
  pathParts.push('Z');

  // Center circular cutout
  // SVG path with evenodd fill rule creates hole
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`${pathParts.join(' ')} M ${center + centerHoleR} ${center} A ${centerHoleR} ${centerHoleR} 0 1 0 ${center - centerHoleR} ${center} A ${centerHoleR} ${centerHoleR} 0 1 0 ${center + centerHoleR} ${center} Z`}
        fill={gearColor}
        fillRule="evenodd"
      />
      <text
        x={center}
        y={center + 14}
        textAnchor="middle"
        fill={textColor}
        fontFamily="'Oswald', 'Chakra Petch', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize={number.length > 2 ? '36' : '44'}
        letterSpacing="-1px"
      >
        {number}
      </text>
    </svg>
  );
};
