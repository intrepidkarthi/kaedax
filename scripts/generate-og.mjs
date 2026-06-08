import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");
mkdirSync(PUBLIC, { recursive: true });

// 1200×630 — standard OG / Twitter card size
const W = 1200;
const H = 630;

// SVG composed by hand to match the kaedax aesthetic:
// — near-black ink base
// — subtle hairline grid
// — chartreuse volt-glow behind the counter
// — kaedax mark (the bordered square with chartreuse fill)
// — "720:00:00" massive monospaced counter
// — headline + tagline
// — Bengaluru HQ tag in mono
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="55%" fx="50%" fy="42%">
      <stop offset="0%"   stop-color="#c1ff3a" stop-opacity="0.22" />
      <stop offset="35%"  stop-color="#c1ff3a" stop-opacity="0.08" />
      <stop offset="70%"  stop-color="#c1ff3a" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#fafaf7" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Base -->
  <rect width="${W}" height="${H}" fill="#07090a"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <ellipse cx="600" cy="280" rx="700" ry="380" fill="url(#glow)"/>

  <!-- Hairline frame -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="#fafaf7" stroke-opacity="0.08" stroke-width="1"/>

  <!-- Top utility row -->
  <g transform="translate(72, 92)">
    <!-- Brand mark -->
    <rect x="0" y="0" width="32" height="32" fill="none" stroke="#fafaf7" stroke-opacity="0.4" stroke-width="1.5"/>
    <rect x="6" y="6" width="20" height="20" fill="#c1ff3a"/>
    <text x="52" y="22" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="20" font-weight="500" fill="#fafaf7" letter-spacing="4">KAEDAX</text>
    <text x="170" y="22" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="14" fill="#8b8e88" letter-spacing="2.6">/ BENGALURU</text>
  </g>

  <!-- Live cycle pip + label, top-right -->
  <g transform="translate(${W - 72}, 108)">
    <text text-anchor="end" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="14" fill="#c1ff3a" letter-spacing="3">● CYCLE 03 · ACCEPTING BRIEFS</text>
  </g>

  <!-- The counter (centerpiece) -->
  <g transform="translate(72, 290)">
    <text font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="16" fill="#c1ff3a" letter-spacing="4">— SHIPPED IN</text>
    <text y="148"
          font-family="'Bricolage Grotesque', 'Bricolage Grotesque Variable', ui-sans-serif, system-ui, sans-serif"
          font-size="180"
          font-weight="600"
          fill="#fafaf7"
          letter-spacing="-7">720<tspan fill="#8b8e88" dx="6">:</tspan>00<tspan fill="#8b8e88" dx="6">:</tspan>00</text>
    <text y="190" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="14" fill="#c1ff3a" letter-spacing="3">HH:MM:SS</text>
  </g>

  <!-- Headline & body -->
  <g transform="translate(72, 538)">
    <text font-family="'Bricolage Grotesque', 'Bricolage Grotesque Variable', ui-sans-serif, system-ui, sans-serif" font-size="40" font-weight="500" fill="#fafaf7" letter-spacing="-1.5">
      Agent-first software, shipped in 720 hours.
    </text>
  </g>

  <!-- Bottom utility row -->
  <g transform="translate(72, ${H - 60})">
    <text font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="13" fill="#8b8e88" letter-spacing="2.6">KAEDAX.COM</text>
    <text x="190" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="13" fill="#6b6e69" letter-spacing="2.6">·  AI-NATIVE SOFTWARE STUDIO</text>
  </g>
  <g transform="translate(${W - 72}, ${H - 60})">
    <text text-anchor="end" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="13" fill="#6b6e69" letter-spacing="2.6">TWO ENGAGEMENTS / CYCLE · CURATED INTAKE</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(join(PUBLIC, "og-default.png"));

console.log("✓ wrote public/og-default.png (1200×630)");
