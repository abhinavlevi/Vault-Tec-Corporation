import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { EmployeeBadgeData, CardLayout, CardSide } from '../types/badge';
import { CardVertical } from './CardVertical';
import { CardHorizontal } from './CardHorizontal';
import { LanyardClip } from './LanyardClip';
import { sound } from '../utils/audio';
import { 
  Rotate3d, 
  Download, 
  Share2, 
  Check, 
  Sparkles, 
  Layers, 
  SlidersHorizontal,
  Paperclip
} from 'lucide-react';

interface BadgePreviewProps {
  badge: EmployeeBadgeData;
  layout: CardLayout;
  onLayoutChange: (layout: CardLayout) => void;
  onToggleClip: () => void;
}

export const BadgePreview: React.FC<BadgePreviewProps> = ({
  badge,
  layout,
  onLayoutChange,
  onToggleClip,
}) => {
  const [side, setSide] = useState<CardSide>('front');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [previewZoom, setPreviewZoom] = useState<number>(1.0);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Exact physical pixel specifications
  const width = layout === 'vertical' ? 320 : 500;
  const height = layout === 'vertical' ? 490 : 315;
  const printWidth = width * 3;
  const printHeight = height * 3;

  const handleFlip = () => {
    sound.playFlip();
    setSide((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  const handleExportPNG = async () => {
    const el = document.getElementById('badge-capture-element');
    if (!el) return;

    try {
      setIsExporting(true);
      sound.playTerminal();

      // Export using html-to-image with explicit pixel dimensions and pixelRatio: 3
      const dataUrl = await toPng(el, {
        pixelRatio: 3,
        width,
        height,
        cacheBust: true,
        style: {
          transform: 'none',
          margin: '0',
        },
      });

      // Trigger download
      const filename = `vault-tec-id-${badge.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${layout}-${side}.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      sound.playSuccess();
    } catch (err) {
      console.error('Export error:', err);
      alert('Error exporting badge. Please check that photo images are accessible.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShareURL = () => {
    sound.playClick();
    const params = new URLSearchParams();
    params.set('n', badge.name);
    params.set('r', badge.role);
    params.set('d', badge.department);
    params.set('c', badge.clearanceLevel);
    params.set('b', badge.badgeNumber);
    params.set('v', badge.vaultNumber);
    params.set('l', layout);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedShare(true);
      sound.playSuccess();
      setTimeout(() => setCopiedShare(false), 2500);
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      {/* Studio Preview Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900/90 text-white rounded-xl mb-4 shadow-lg border border-slate-800">
        {/* Layout Switcher (Exactly 2 Layouts) */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onLayoutChange('vertical');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              layout === 'vertical'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Vertical (320×490)
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onLayoutChange('horizontal');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              layout === 'horizontal'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 rotate-90" />
            Horizontal (500×315)
          </button>
        </div>

        {/* Action Buttons: Flip, Lanyard, Zoom */}
        <div className="flex items-center gap-1.5">
          {/* Lanyard Clip Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onToggleClip();
            }}
            title={badge.showClip ? 'Hide Lanyard Clip' : 'Show Lanyard Clip'}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
              badge.showClip
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* 3D Flip Toggle */}
          <button
            type="button"
            onClick={handleFlip}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>Side: <strong className="text-white uppercase">{side}</strong></span>
          </button>
        </div>
      </div>

      {/* Outer Preview Stage with Perspective & Scaling */}
      <div 
        ref={previewContainerRef}
        className="w-full min-h-[540px] flex flex-col items-center justify-center p-6 bg-radial from-slate-800 via-slate-900 to-slate-950 rounded-2xl border border-slate-800/80 shadow-2xl relative overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Subtle studio backdrop grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #94a3b8 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Outer Scaling Wrapper: CRUCIAL - CSS transforms applied HERE, NEVER on the capture element */}
        <div 
          className="flex flex-col items-center transition-transform duration-200"
          style={{ transform: `scale(${previewZoom})` }}
        >
          {/* Optional Top Lanyard Clip */}
          {badge.showClip && <LanyardClip />}

          {/* 3D Card Flip Wrapper */}
          <div
            className="transition-transform duration-500 ease-in-out cursor-pointer"
            onClick={handleFlip}
            title="Click to flip card"
          >
            {layout === 'vertical' ? (
              <CardVertical badge={badge} side={side} />
            ) : (
              <CardHorizontal badge={badge} side={side} />
            )}
          </div>
        </div>

        {/* Floating Print Specification Badge */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-800">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Print-Ready 3×: <strong>{printWidth} × {printHeight} px</strong> (300 DPI)</span>
        </div>

        {/* Preview Zoom Slider */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2 bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-800 text-slate-400 text-xs font-mono">
          <SlidersHorizontal className="w-3 h-3 text-slate-400" />
          <input
            type="range"
            min="0.75"
            max="1.25"
            step="0.05"
            value={previewZoom}
            onChange={(e) => setPreviewZoom(parseFloat(e.target.value))}
            className="w-16 accent-amber-400 cursor-pointer h-1"
            title="Preview scale"
          />
          <span>{Math.round(previewZoom * 100)}%</span>
        </div>
      </div>

      {/* Bottom Download & Share Action Bar */}
      <div className="w-full grid grid-cols-2 gap-3 mt-4">
        {/* Download 3x PNG */}
        <button
          type="button"
          onClick={handleExportPNG}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>Download 3× PNG</span>
        </button>

        {/* Share Badge URL */}
        <button
          type="button"
          onClick={handleShareURL}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-xl border border-slate-700 shadow-md transition-all active:scale-[0.98] cursor-pointer"
        >
          {copiedShare ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Share Config</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
