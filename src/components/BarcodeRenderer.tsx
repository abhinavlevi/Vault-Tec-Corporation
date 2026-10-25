import React, { useMemo } from 'react';
import { encodeCode128B } from '../utils/barcode';

interface BarcodeRendererProps {
  value: string;
  height?: number;
  showText?: boolean;
  barColor?: string;
  textColor?: string;
  className?: string;
}

export const BarcodeRenderer: React.FC<BarcodeRendererProps> = ({
  value,
  height = 36,
  showText = true,
  barColor = '#000000',
  textColor = '#1E293B',
  className = ''
}) => {
  const { modules } = useMemo(() => {
    // Sanitize string to standard alphanumeric / dash characters
    const safeStr = (value || 'VT-000000').toUpperCase().replace(/[^ -~]/g, '');
    return encodeCode128B(safeStr);
  }, [value]);

  const barWidth = 1.25;
  const totalWidth = modules.length * barWidth;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${totalWidth} ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
      >
        {modules.map((isBar, idx) => {
          if (!isBar) return null;
          return (
            <rect
              key={idx}
              x={idx * barWidth}
              y={0}
              width={barWidth}
              height={height}
              fill={barColor}
            />
          );
        })}
      </svg>
      {showText && (
        <span 
          className="text-[9px] font-mono tracking-[0.25em] font-semibold mt-0.5"
          style={{ color: textColor }}
        >
          *{value.toUpperCase()}*
        </span>
      )}
    </div>
  );
};
