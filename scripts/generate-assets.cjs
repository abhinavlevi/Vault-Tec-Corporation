const sharp = require('sharp');
const fs = require('fs');

async function generateAssets() {
  console.log('Generating Favicons, PWA icons, and OG Image...');

  // 1. Vector Favicon SVG
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0B3A6E"/>
        <stop offset="100%" stop-color="#061C38"/>
      </radialGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFD54F"/>
        <stop offset="100%" stop-color="#F5BA13"/>
      </linearGradient>
    </defs>
    <!-- Background Circle -->
    <rect width="128" height="128" rx="28" fill="url(#bgGlow)" stroke="#F5BA13" stroke-width="4"/>
    <!-- Center Vault Gear Icon -->
    <g transform="translate(64, 64) scale(0.48)">
      <!-- 10 Gear teeth -->
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(0)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(36)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(72)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(108)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(144)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(180)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(216)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(252)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(288)"/>
      <path d="M 0,-60 L 10,-60 L 8,-48 L -8,-48 L -10,-60 Z" fill="url(#goldGrad)" transform="rotate(324)"/>
      <!-- Outer ring -->
      <circle cx="0" cy="0" r="48" fill="url(#goldGrad)"/>
      <!-- Inner cutout -->
      <circle cx="0" cy="0" r="30" fill="#061C38"/>
      <!-- Text 33 -->
      <text x="0" y="10" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="28" fill="#F5BA13">33</text>
    </g>
  </svg>`;

  fs.writeFileSync('public/favicon.svg', faviconSvg);
  console.log('Saved favicon.svg');

  // 2. Generate PNG favicons & apple touch icon
  const svgBuffer = Buffer.from(faviconSvg);
  
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile('public/favicon-16x16.png');

  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');

  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile('public/favicon.ico');

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');

  console.log('Saved favicons and apple touch icon');

  // 3. OpenGraph 1200 x 630 px Image
  // Compose with sharp: deep Vault-Tec blue background, schematic grid, logo, Lucy badge preview
  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#072242"/>
        <stop offset="50%" stop-color="#0B3A6E"/>
        <stop offset="100%" stop-color="#05162A"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill="#F5BA13" opacity="0.15"/>
        <line x1="0" y1="20" x2="40" y2="20" stroke="#F5BA13" stroke-width="0.5" opacity="0.08"/>
        <line x1="20" y1="0" x2="20" y2="40" stroke="#F5BA13" stroke-width="0.5" opacity="0.08"/>
      </pattern>
    </defs>
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#ogBg)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>

    <!-- Left Content -->
    <g transform="translate(80, 140)">
      <rect x="0" y="0" width="180" height="28" rx="6" fill="#F5BA13" opacity="0.2"/>
      <text x="14" y="19" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#F5BA13" letter-spacing="2">VAULT-TEC CORP</text>

      <text x="0" y="75" font-family="'Impact', 'Arial Black', sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" letter-spacing="1">SECURITY ID GENERATOR</text>
      <text x="0" y="125" font-family="'Arial', sans-serif" font-size="22" fill="#E2E8F0" max-width="600">
        Authentic Vault-Tec Personnel Credentials &amp; Keycards
      </text>

      <g transform="translate(0, 170)">
        <rect x="0" y="0" width="560" height="90" rx="12" fill="#061A33" stroke="#F5BA13" stroke-width="1.5" opacity="0.9"/>
        <text x="24" y="34" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#F5BA13">
          CR-80 DUAL-SIDED CREDENTIAL SPECIFICATION
        </text>
        <text x="24" y="62" font-family="'Arial', sans-serif" font-size="13" fill="#94A3B8">
          Interactive Photo Framing • Code-128 Barcodes • 300 DPI 3× Print PNGs
        </text>
      </g>

      <text x="0" y="320" font-family="'Courier New', monospace" font-size="12" fill="#F5BA13" opacity="0.8">
        RESTRICTED CLASSIFICATION • DIRECTIVE 44-B
      </text>
    </g>
  </svg>`;

  // Composite the Lucy MacLean portrait and Vault logo into the OG image
  const ogBgBuffer = await sharp(Buffer.from(ogSvg))
    .toBuffer();

  const logoYellow = await sharp('public/presets/logo_yellow.png')
    .resize(320)
    .toBuffer();

  const lucyPortrait = await sharp('public/presets/lucy_maclean.png')
    .resize(260, 260)
    .toBuffer();

  await sharp(ogBgBuffer)
    .composite([
      { input: logoYellow, top: 70, left: 80 },
      { input: lucyPortrait, top: 185, left: 820 }
    ])
    .png()
    .toFile('public/og-image.png');

  console.log('Saved og-image.png (1200x630)');
}

generateAssets().catch(console.error);
