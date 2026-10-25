import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { EmployeeBadgeData } from '../types/badge';
import { VaultGear } from './VaultGear';
import { BrandMark } from './BrandMark';
import { BarcodeRenderer } from './BarcodeRenderer';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { Radio, ShieldAlert } from 'lucide-react';

interface CardHorizontalProps {
  badge: EmployeeBadgeData;
  side: 'front' | 'back';
}

export const CardHorizontal: React.FC<CardHorizontalProps> = ({ badge, side }) => {
  // CR-80 Horizontal dimensions: exactly 500px x 315px
  if (side === 'back') {
    return (
      <div
        id="badge-capture-element"
        data-side="back"
        className="w-[500px] h-[315px] relative rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between bg-[#F8FAFC] text-slate-800 border border-slate-300 select-none"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Subtle Schematic Grid Watermark (<= 5% opacity) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#0B2545 1px, transparent 1px), linear-gradient(to right, #0B2545 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Magnetic Stripe across top */}
        <div className="w-full h-11 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-b border-neutral-800 relative z-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_50%,transparent_100%)]" />
        </div>

        {/* Content Body */}
        <div className="p-3.5 flex-1 flex flex-col justify-between relative z-10">
          {/* Row with Signature Strip & Chip */}
          <div className="flex items-center justify-between gap-3">
            {/* Signature Line */}
            <div className="flex-1 bg-white border border-slate-300 rounded px-3 py-1 flex flex-col justify-between h-9 shadow-inner relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #cbd5e1 0, #cbd5e1 2px, transparent 0, transparent 6px)'
                }}
              />
              <span className="text-[6.5px] font-mono tracking-widest text-slate-400 uppercase relative z-10">
                AUTHORIZED OFFICER SIGNATURE (NOT VALID UNLESS SIGNED)
              </span>
              <span 
                className="text-xs text-blue-900 font-serif italic relative z-10 -mt-1"
                style={{ fontFamily: "'Brush Script MT', cursive, serif" }}
              >
                {badge.name}
              </span>
            </div>

            {/* Smart Chip Contact Pad */}
            <SmartChip size="sm" />

            {/* Proximity Symbol */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-300 px-2 py-1 rounded text-[7.5px] font-mono text-slate-700 font-bold shrink-0">
              <Radio className="w-3 h-3 text-blue-700" />
              13.56 MHz
            </div>
          </div>

          {/* Legal Instruction & Property Text */}
          <div className="grid grid-cols-12 gap-3 my-1">
            <div className="col-span-8 text-[7.5px] leading-[1.3] text-slate-600 font-sans">
              <div className="font-bold text-slate-900 uppercase flex items-center gap-1 mb-0.5">
                <ShieldAlert className="w-2.5 h-2.5 text-amber-600" />
                Vault-Tec Security Directive VT-2077
              </div>
              This credential is property of Vault-Tec Corporation.
              Possession grants facility access strictly to designated zones matching assigned clearance.
              Finder must deposit card into nearest Vault dispatch mail box.
              Counterfeiting or unauthorized retention is subject to executive penal sanctions.
            </div>

            <div className="col-span-4 flex flex-col items-end justify-center">
              <HolographicSeal serial={badge.securityCode} className="w-12 h-12" />
            </div>
          </div>

          {/* Footer Bar with Barcode */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-200">
            <div className="w-[280px]">
              <BarcodeRenderer
                value={badge.badgeNumber}
                height={22}
                barColor="#0F172A"
                textColor="#334155"
              />
            </div>
            <div className="flex flex-col items-end text-[7.5px] font-mono text-slate-600 font-bold">
              <span>ISSUED: {badge.issueDate}</span>
              <span>EXP: {badge.expirationDate}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Front Horizontal Layout (500px x 315px)
  return (
    <div
      id="badge-capture-element"
      data-side="front"
      className="w-[500px] h-[315px] relative rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between bg-[#F8FAFC] text-slate-900 border border-slate-300 select-none"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Subtle Technical Grid & Watermark (<= 5% opacity) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#0B2545 1px, transparent 1px), linear-gradient(to right, #0B2545 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="absolute right-4 top-12 pointer-events-none opacity-[0.035]">
        <VaultGear number={badge.vaultNumber} size={220} gearColor="#0B2545" textColor="#0B2545" />
      </div>

      {/* Top Corporate Banner */}
      <div className="relative z-10 bg-[#0B2545] text-white px-4 py-2 border-b-2 border-[#F5BA13] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <BrandMark variant="yellow" type="full" className="h-6 w-auto" />
          <div className="h-4 w-px bg-slate-500/50" />
          <span className="text-[10px] font-mono tracking-widest text-amber-300 font-bold uppercase">
            Facility Access Pass
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-mono bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black tracking-wider uppercase">
            {badge.clearanceLevel}
          </span>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="p-3.5 flex-1 grid grid-cols-12 gap-3.5 items-center relative z-10">
        {/* Left Column: Portrait */}
        <div className="col-span-4 flex flex-col items-center">
          <div className="w-[120px] h-[135px] rounded border-2 border-[#0B2545] overflow-hidden bg-slate-900 shadow-md relative">
            <img
              src={badge.photoUrl}
              alt={badge.name}
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${badge.photoScale}) translate(${badge.photoPanX}%, ${badge.photoPanY}%)`,
                transformOrigin: 'center center',
              }}
              crossOrigin="anonymous"
            />
            {/* Subtle vintage scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
          </div>
          {/* Badge ID under photo */}
          <div className="mt-1 text-[8px] font-mono font-bold text-slate-700 tracking-wider">
            ID: {badge.badgeNumber}
          </div>
        </div>

        {/* Right Column: Nameplate, Vault Gear, Credentials */}
        <div className="col-span-8 flex flex-col justify-between h-full py-0.5">
          {/* Name & Title */}
          <div>
            <div 
              className="text-[23px] font-black text-[#0B2545] uppercase tracking-tight leading-none"
              style={{ fontFamily: "'Oswald', 'Chakra Petch', sans-serif" }}
            >
              {badge.name}
            </div>
            <div className="text-[10.5px] font-mono font-bold text-amber-600 uppercase tracking-wide mt-0.5">
              {badge.role}
            </div>
            <div className="text-[8.5px] font-mono text-slate-500 uppercase tracking-wider">
              {badge.department}
            </div>
          </div>

          {/* Middle Row: Vault Gear + Smart Chip + Details */}
          <div className="flex items-center justify-between gap-2 my-1 bg-slate-100/90 p-2 rounded border border-slate-200">
            <div className="flex items-center gap-2">
              <VaultGear
                number={badge.vaultNumber}
                size={58}
                gearColor="#F5BA13"
                textColor="#0B2545"
              />
              <div className="flex flex-col">
                <span className="text-[7px] font-mono text-slate-500 uppercase font-bold">Facility Code</span>
                <span className="text-[9px] font-mono font-black text-[#0B2545]">VAULT {badge.vaultNumber}</span>
                <span className="text-[7px] font-mono text-slate-500 mt-0.5">BLOOD: {badge.bloodType}</span>
              </div>
            </div>

            {/* Smart Chip Contact Pad */}
            <SmartChip size="sm" />

            {/* Micro QR Code */}
            <div className="p-0.5 bg-white rounded border border-slate-300">
              <QRCodeSVG
                value={`VAULT-TEC::${badge.badgeNumber}::${badge.name}::L${badge.vaultNumber}`}
                size={44}
                fgColor="#0B2545"
                bgColor="#FFFFFF"
                level="L"
              />
            </div>
          </div>

          {/* Bottom Barcode & Hex Hash */}
          <div className="bg-white p-1 rounded border border-slate-200">
            <BarcodeRenderer
              value={badge.badgeNumber}
              height={20}
              showText={false}
              barColor="#0B2545"
            />
            <div className="flex justify-between items-center text-[6.5px] font-mono text-slate-500 font-semibold mt-0.5 px-0.5">
              <span>VAULT-TEC SEC-HASH: {badge.securityCode}</span>
              <span>EXP: {badge.expirationDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
