export type CardLayout = 'vertical' | 'horizontal';
export type CardSide = 'front' | 'back';

export interface EmployeeBadgeData {
  id: string;
  name: string;
  role: string;
  department: string;
  clearanceLevel: string;
  badgeNumber: string;
  vaultNumber: string;
  issueDate: string;
  expirationDate: string;
  securityCode: string;
  bloodType: string;
  propertyNotice: string;
  photoUrl: string;
  photoScale: number; // 1.0 to 2.5
  photoPanX: number;  // -40% to 40%
  photoPanY: number;  // -40% to 40%
  showClip: boolean;
}

export interface CharacterPreset {
  id: string;
  name: string;
  role: string;
  clearanceLevel: string;
  badgeNumber: string;
  vaultNumber: string;
  department: string;
  photoUrl: string;
  issueDate: string;
  securityCode: string;
  bloodType: string;
  description: string;
}

export const CHARACTER_PRESETS: CharacterPreset[] = [
  {
    id: 'lucy',
    name: 'Lucy MacLean',
    role: 'Vault Operations Specialist',
    clearanceLevel: 'Level 4 / Staff',
    badgeNumber: 'VT-33-0428',
    vaultNumber: '33',
    department: 'Vault 33 Resident Staff',
    photoUrl: '/presets/lucy_maclean.png',
    issueDate: '2296-04-10',
    securityCode: 'V33-OPS-0428-A',
    bloodType: 'O-POS',
    description: 'Vault 33 resident with exemplary bio-metrics, repairs, and community leadership qualification.'
  },
  {
    id: 'hank',
    name: 'Hank MacLean',
    role: 'Overseer / Junior Executive',
    clearanceLevel: 'Level 9 / Executive',
    badgeNumber: 'VT-33-0001',
    vaultNumber: '33',
    department: 'Overseer Directorate',
    photoUrl: '/presets/hank_maclean.png',
    issueDate: '2277-08-15',
    securityCode: 'V33-OVR-0001-EXEC',
    bloodType: 'A-POS',
    description: 'Vault 33 Executive Overseer; primary facility administrator with Class-A override keys.'
  },
  {
    id: 'cooper',
    name: 'Cooper Howard',
    role: 'Vault-Tec Ambassador',
    clearanceLevel: 'Level 7 / VIP Protocol',
    badgeNumber: 'VT-HQ-1951',
    vaultNumber: '111',
    department: 'Corporate Public Relations',
    photoUrl: '/presets/cooper_howard.png',
    issueDate: '2077-05-20',
    securityCode: 'VTHQ-AMB-1951-PR',
    bloodType: 'B-POS',
    description: 'Official Vault-Tec celebrity spokesperson and promotional liaison for the Vault of the Future initiative.'
  }
];
