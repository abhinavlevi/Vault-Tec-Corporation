import React, { useRef } from 'react';
import { EmployeeBadgeData, CHARACTER_PRESETS } from '../types/badge';
import { sound } from '../utils/audio';
import { 
  Upload, 
  RotateCcw, 
  ZoomIn, 
  MoveHorizontal, 
  MoveVertical, 
  User, 
  Briefcase, 
  Hash, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface EmployeeEditorProps {
  badge: EmployeeBadgeData;
  onChange: (updates: Partial<EmployeeBadgeData>) => void;
  onSelectPreset: (presetId: string) => void;
  activePresetId: string;
}

export const EmployeeEditor: React.FC<EmployeeEditorProps> = ({
  badge,
  onChange,
  onSelectPreset,
  activePresetId,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playTerminal();
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (dataUrl) {
        onChange({
          photoUrl: dataUrl,
          photoScale: 1.0,
          photoPanX: 0,
          photoPanY: 0,
        });
        sound.playSuccess();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhotoPosition = () => {
    sound.playClick();
    onChange({
      photoScale: 1.0,
      photoPanX: 0,
      photoPanY: 0,
    });
  };

  return (
    <div className="flex flex-col gap-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      {/* 1. Character Presets */}
      <div>
        <label className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Choose a Character
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {CHARACTER_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectPreset(preset.id);
                }}
                className={`flex flex-col items-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0B2545] bg-[#0B2545]/5 ring-2 ring-[#0B2545]/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-slate-50'
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-xs mb-1.5 bg-slate-900">
                  <img
                    src={preset.photoUrl}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#0B2545]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-amber-400 border border-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-900 truncate w-full text-center">
                  {preset.name}
                </span>
                <span className="text-[10px] text-amber-600 font-mono font-bold">
                  Vault {preset.vaultNumber}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Photo Upload & Interactive Controls */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            Your Photo
          </label>
          <button
            type="button"
            onClick={handleResetPhotoPosition}
            className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Photo
          </button>
        </div>

        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            Upload Your Photo
          </button>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-slate-600 font-mono text-[10px]">
              <span className="flex items-center gap-1"><ZoomIn className="w-3 h-3" /> Zoom</span>
              <span>{badge.photoScale.toFixed(1)}×</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.05"
              value={badge.photoScale}
              onChange={(e) => onChange({ photoScale: parseFloat(e.target.value) })}
              className="accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-slate-600 font-mono text-[10px]">
              <span className="flex items-center gap-1"><MoveHorizontal className="w-3 h-3" /> Pan X</span>
              <span>{badge.photoPanX}%</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={badge.photoPanX}
              onChange={(e) => onChange({ photoPanX: parseInt(e.target.value, 10) })}
              className="accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-slate-600 font-mono text-[10px]">
              <span className="flex items-center gap-1"><MoveVertical className="w-3 h-3" /> Pan Y</span>
              <span>{badge.photoPanY}%</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={badge.photoPanY}
              onChange={(e) => onChange({ photoPanY: parseInt(e.target.value, 10) })}
              className="accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* 3. Simple Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1">
            <User className="w-3 h-3 text-slate-400" />
            Full Name
          </label>
          <input
            type="text"
            value={badge.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0B2545]"
            placeholder="e.g. Lucy MacLean"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-slate-400" />
            Job Title
          </label>
          <input
            type="text"
            value={badge.role}
            onChange={(e) => onChange({ role: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#0B2545]"
            placeholder="e.g. Vault Operations Specialist"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1">
            <Hash className="w-3 h-3 text-amber-500" />
            Vault Number
          </label>
          <input
            type="text"
            maxLength={4}
            value={badge.vaultNumber}
            onChange={(e) => onChange({ vaultNumber: e.target.value.replace(/[^0-9]/g, '') })}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0B2545]"
            placeholder="33"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-emerald-600" />
            Clearance Level
          </label>
          <input
            type="text"
            value={badge.clearanceLevel}
            onChange={(e) => onChange({ clearanceLevel: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:border-[#0B2545]"
            placeholder="Level 4 / Staff"
          />
        </div>
      </div>
    </div>
  );
};
