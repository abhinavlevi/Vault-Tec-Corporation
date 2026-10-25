import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EmployeeBadgeData } from '../types/badge';
import { VaultGear } from './VaultGear';
import { BrandMark } from './BrandMark';
import { BarcodeRenderer } from './BarcodeRenderer';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { Radio } from 'lucide-react';

interface CardVerticalProps {
  badge: EmployeeBadgeData;
  side: 'front' | 'back';
}

export const CardVertical: React.FC<CardVerticalProps> = ({ badge, side }) => {
  // CR-80 Vertical dimensions: exactly 320px x 490px
  if (side === 'back') {
    return (
      <div
        id="badge-capture-element"
        data-side="back"
        className="w-[320px] h-[490px] relative rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 select-none bg-[#092c57] text-slate-100 border border-slate-700/50"
        style={{
          boxSizing: 'border-box',
          backgroundImage: 'radial-gradient(circle at 50% 30%, #0d386c 0%, #071e3d 100%)',
        }}
      >
        {/* Subtle Watermark (strictly <= 5% opacity, never obscuring text) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] overflow-hidden">
          <VaultGear number={badge.vaultNumber} size={360} gearColor="#FFFFFF" textColor="#FFFFFF" />
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-amber-400/30 pb-2.5">
          <div className="flex items-center gap-2">
            <BrandMark variant="yellow" type="emblem" className="h-6 w-auto" />
            <div>
              <div className="text-[11px] font-black tracking-[0.15em] text-amber-400 font-sans uppercase">
                Vault-Tec Industries
              </div>
              <div className="text-[7.5px] font-mono tracking-widest text-slate-300 uppercase">
                Personnel Verification System
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30 text-[8px] font-mono text-amber-300 font-bold">
            <Radio className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
            RFID
          </div>
        </div>

        {/* Middle Hardware & Security Area */}
        <div className="relative z-10 flex items-center justify-between py-2 px-1">
          <div className="flex flex-col gap-1">
            <div className="text-[7.5px] font-mono text-slate-400 tracking-wider uppercase">EMV Smart Contact</div>
            <SmartChip size="sm" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-[7.5px] font-mono text-slate-400 tracking-wider uppercase">Tamper Hologram</div>
            <HolographicSeal serial={badge.securityCode} className="w-12 h-12" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-[7.5px] font-mono text-slate-400 tracking-wider uppercase">Biometrics</div>
            <div className="bg-slate-900/60 border border-slate-700/60 px-2 py-1 rounded text-right">
              <div className="text-[7px] font-mono text-slate-400 uppercase">Blood Type</div>
              <div className="text-[10px] font-mono font-bold text-amber-400">{badge.bloodType}</div>
            </div>
          </div>
        </div>

        {/* Legal Authorization Statement */}
        <div className="relative z-10 bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/80 backdrop-blur-xs flex flex-col gap-1.5">
          <div className="text-[8px] font-bold text-amber-400 tracking-wider uppercase flex items-center justify-between">
            <span>Property Notice • Directive 44-B</span>
            <span className="font-mono text-[7px] text-slate-400">CLASS 4 RESTRICTED</span>
          </div>
          <p className="text-[7px] leading-[1.3] text-slate-300 font-sans">
            This credential is the exclusive property of Vault-Tec Corporation.
            Possession certifies authorization to access designated Vault facilities, habitation rings, and executive sectors.
          </p>
          <p className="text-[6.5px] leading-[1.25] text-slate-400 font-sans">
            If discovered, return immediately to any Vault-Tec Overseer Station or drop in an authorized U.S. Postal Service receptacle.
            Unauthorized possession, duplication, or alteration is punishable by immediate facility expulsion and civil defense detention.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[7px] font-mono text-slate-300">
            <span>ISSUED: {badge.issueDate}</span>
            <span>EXPIRY: {badge.expirationDate}</span>
          </div>
        </div>

        {/* Scannable Barcode & Security Strip at Bottom */}
        <div className="relative z-10 bg-white rounded-md p-1.5 shadow-sm">
          <BarcodeRenderer
            value={badge.badgeNumber}
            height={28}
            barColor="#000000"
            textColor="#091E3A"
          />
          <div className="flex justify-between items-center px-1 mt-0.5 text-[6.5px] font-mono text-slate-600 font-bold uppercase tracking-wider">
            <span>CODE-128B AUTHENTICATED</span>
            <span>HEX: {badge.securityCode}</span>
          </div>
        </div>
      </div>
    );
  }

  // Vertical Front Layout (Reference Image 1: Vault-Tec Lucy MacLean Vault 33 Style)
  return (
    <div
      id="badge-capture-element"
      data-side="front"
      className="w-[320px] h-[490px] relative rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 select-none bg-[#073A75] border border-blue-900/50"
      style={{
        boxSizing: 'border-box',
        backgroundImage: 'radial-gradient(circle at 50% 20%, #0d468b 0%, #063063 100%)',
      }}
    >
      {/* Subtle Technical Grid (<= 5% opacity) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Brand Header */}
      <div className="relative z-10 flex flex-col items-center pt-1">
        <h1 
          className="text-[28px] font-black tracking-[0.08em] text-[#F5BA13] leading-none uppercase"
          style={{ fontFamily: "'Oswald', 'Chakra Petch', sans-serif" }}
        >
          VAULT-TEC
        </h1>
        {/* Triple-Wing Vault-Tec Emblem */}
        <div className="mt-1 flex justify-center">
          <BrandMark variant="yellow" type="emblem" className="h-7 w-auto drop-shadow-sm" />
        </div>
      </div>

      {/* Middle Content: Vault Gear + Employee Portrait */}
      <div className="relative z-10 flex items-center justify-between px-1.5 mt-2">
        {/* Left: Vault Gear with custom number */}
        <div className="flex flex-col items-center justify-center">
          <VaultGear
            number={badge.vaultNumber}
            size={112}
            gearColor="#F5BA13"
            textColor="#073A75"
          />
        </div>

        {/* Right: Employee Portrait with yellow frame */}
        <div className="relative">
          <div className="w-[126px] h-[132px] rounded-xs border-[3px] border-[#F5BA13] overflow-hidden bg-slate-900 shadow-md relative">
            <img
              src={badge.photoUrl}
              alt={badge.name}
              className="w-full h-full object-cover transition-transform duration-75"
              style={{
                transform: `scale(${badge.photoScale}) translate(${badge.photoPanX}%, ${badge.photoPanY}%)`,
                transformOrigin: 'center center',
              }}
              crossOrigin="anonymous"
            />
            {/* Fine scanline overlay texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
          </div>
        </div>
      </div>

      {/* Yellow Nameplate Banner (Spanning full width) */}
      <div className="relative z-10 -mx-4 my-2.5 bg-[#F5BA13] py-2 px-4 shadow-sm flex items-center justify-between">
        <div className="flex-1 truncate">
          <div 
            className="text-[22px] font-black leading-none text-black tracking-tight uppercase truncate"
            style={{ fontFamily: "'Oswald', 'Chakra Petch', 'Arial Black', sans-serif" }}
          >
            {badge.name}
          </div>
          <div className="text-[8.5px] font-mono tracking-widest text-slate-900 uppercase font-bold mt-0.5 truncate">
            {badge.role}
          </div>
        </div>
        <div className="text-right pl-2">
          <span className="text-[7.5px] font-mono font-bold bg-black text-[#F5BA13] px-1.5 py-0.5 rounded uppercase">
            {badge.clearanceLevel.split('/')[0].trim()}
          </span>
        </div>
      </div>

      {/* Bottom Section: QR Code + Property String + Clearance Info */}
      <div className="relative z-10 flex items-center justify-between gap-3 px-1 mb-1">
        {/* Yellow QR Code on Blue */}
        <div className="bg-[#073A75] p-1 rounded-sm border border-[#F5BA13]/40 shadow-inner flex items-center justify-center shrink-0">
          <QRCodeSVG
            value={`VAULT-TEC::ID=${badge.badgeNumber}::NAME=${encodeURIComponent(badge.name)}::CLEARANCE=${encodeURIComponent(badge.clearanceLevel)}::V=${badge.vaultNumber}`}
            size={76}
            bgColor="transparent"
            fgColor="#F5BA13"
            level="M"
          />
        </div>

        {/* Right Details in crisp yellow monospace */}
        <div className="flex-1 flex flex-col justify-between h-[76px] py-0.5 font-mono text-[#F5BA13] text-[8.5px] leading-[1.35]">
          <div className="font-semibold tracking-wide">
            {badge.propertyNotice}
          </div>
          <div className="pt-1 border-t border-[#F5BA13]/30 flex flex-col gap-0.5 text-[7.5px] text-amber-200">
            <div className="flex justify-between">
              <span className="text-amber-400 font-bold">BADGE NO:</span>
              <span className="font-mono">{badge.badgeNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-400 font-bold">SEC HASH:</span>
              <span className="font-mono">{badge.securityCode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom mini Code-128 barcode strip */}
      <div className="relative z-10 bg-white rounded-xs px-1.5 py-0.5 -mx-1 mt-0.5 shadow-xs">
        <BarcodeRenderer
          value={badge.badgeNumber}
          height={16}
          showText={false}
          barColor="#000000"
        />
      </div>
    </div>
  );
};
