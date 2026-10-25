import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { EmployeeBadgeData, CardLayout, CHARACTER_PRESETS } from './types/badge';
import { Header } from './components/Header';
import { BadgePreview } from './components/BadgePreview';
import { EmployeeEditor } from './components/EmployeeEditor';
import { sound } from './utils/audio';

export function App() {
  const [activePresetId, setActivePresetId] = useState<string>('lucy');
  const [layout, setLayout] = useState<CardLayout>('vertical');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Initialize badge from URL parameters or default preset (Lucy MacLean)
  const [badge, setBadge] = useState<EmployeeBadgeData>(() => {
    const defaultPreset = CHARACTER_PRESETS[0];
    
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      if (search.get('n')) {
        return {
          id: 'custom-url',
          name: search.get('n') || defaultPreset.name,
          role: search.get('r') || defaultPreset.role,
          department: search.get('d') || defaultPreset.department,
          clearanceLevel: search.get('c') || defaultPreset.clearanceLevel,
          badgeNumber: search.get('b') || defaultPreset.badgeNumber,
          vaultNumber: search.get('v') || defaultPreset.vaultNumber,
          issueDate: defaultPreset.issueDate,
          expirationDate: 'INDEFINITE',
          securityCode: `V${search.get('v') || '33'}-SEC-4412`,
          bloodType: 'O-POS',
          propertyNotice: 'This Identification is Property of the Vault-Tec Corporation',
          photoUrl: defaultPreset.photoUrl,
          photoScale: 1.0,
          photoPanX: 0,
          photoPanY: 0,
          showClip: true,
        };
      }
    }

    return {
      id: defaultPreset.id,
      name: defaultPreset.name,
      role: defaultPreset.role,
      department: defaultPreset.department,
      clearanceLevel: defaultPreset.clearanceLevel,
      badgeNumber: defaultPreset.badgeNumber,
      vaultNumber: defaultPreset.vaultNumber,
      issueDate: defaultPreset.issueDate,
      expirationDate: 'INDEFINITE',
      securityCode: defaultPreset.securityCode,
      bloodType: defaultPreset.bloodType,
      propertyNotice: 'This Identification is Property of the Vault-Tec Corporation',
      photoUrl: defaultPreset.photoUrl,
      photoScale: 1.0,
      photoPanX: 0,
      photoPanY: 0,
      showClip: true,
    };
  });

  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = CHARACTER_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(presetId);
    setBadge((prev) => ({
      ...prev,
      id: preset.id,
      name: preset.name,
      role: preset.role,
      department: preset.department,
      clearanceLevel: preset.clearanceLevel,
      badgeNumber: preset.badgeNumber,
      vaultNumber: preset.vaultNumber,
      issueDate: preset.issueDate,
      securityCode: preset.securityCode,
      bloodType: preset.bloodType,
      photoUrl: preset.photoUrl,
      photoScale: 1.0,
      photoPanX: 0,
      photoPanY: 0,
    }));
  };

  const handleUpdateBadge = (updates: Partial<EmployeeBadgeData>) => {
    setBadge((prev) => ({ ...prev, ...updates }));
  };

  const handleResetBadge = () => {
    handleSelectPreset('lucy');
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 flex flex-col font-sans">
      {/* Studio Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onResetBadge={handleResetBadge}
      />

      {/* Main Single Page Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls on Left */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <EmployeeEditor
              badge={badge}
              onChange={handleUpdateBadge}
              onSelectPreset={handleSelectPreset}
              activePresetId={activePresetId}
            />
          </div>

          {/* Live Preview on Right */}
          <div className="lg:col-span-6 sticky top-6 flex flex-col gap-4">
            <BadgePreview
              badge={badge}
              layout={layout}
              onLayoutChange={setLayout}
              onToggleClip={() => handleUpdateBadge({ showClip: !badge.showClip })}
            />
          </div>
        </div>
      </main>

      {/* Clean, Simple Footer */}
      <footer className="w-full bg-[#07254A] text-slate-400 py-4 px-4 text-xs font-mono text-center">
        Vault-Tec Corporation ID Generator • Inspired by Fallout
      </footer>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
