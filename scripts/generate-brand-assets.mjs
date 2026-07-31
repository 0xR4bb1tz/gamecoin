import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "public", "gamecoin.png");
const faviconPng = path.join(root, "public", ".favicon-source.png");
const faviconIco = path.join(root, "public", "favicon.ico");
const openGraph = path.join(root, "public", "gamecoin-og.png");

await sharp(source)
  .resize(256, 256, { fit: "cover" })
  .png()
  .toFile(faviconPng);

await writeFile(faviconIco, await pngToIco(faviconPng));
await unlink(faviconPng);

const logo = await sharp(source)
  .resize(460, 460, { fit: "cover" })
  .png()
  .toBuffer();

const title = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
        <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#ccff00" stroke-opacity=".055" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="#050805"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <circle cx="930" cy="315" r="260" fill="#ccff00" fill-opacity=".045"/>
    <text x="76" y="95" fill="#ccff00" font-family="monospace" font-size="18" letter-spacing="4">ROBINHOOD CHAIN / GAMECOIN-GME</text>
    <text x="76" y="235" fill="#f3f5e9" font-family="Arial, sans-serif" font-weight="700" font-size="92" letter-spacing="-5">PLAY THE</text>
    <text x="76" y="327" fill="#f3f5e9" font-family="Arial, sans-serif" font-weight="700" font-size="92" letter-spacing="-5">MARKET.</text>
    <text x="76" y="419" fill="#ccff00" font-family="Arial, sans-serif" font-weight="700" font-size="92" letter-spacing="-5">EARN GME.</text>
    <text x="80" y="505" fill="#9aa692" font-family="monospace" font-size="21">THE 2021 SIGNAL, REBUILT ONCHAIN.</text>
    <text x="80" y="556" fill="#657060" font-family="monospace" font-size="16">INDEPENDENT COMMUNITY PROJECT</text>
  </svg>
`);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: "#050805",
  },
})
  .composite([
    { input: title, top: 0, left: 0 },
    { input: logo, top: 85, left: 720 },
  ])
  .png()
  .toFile(openGraph);

const faviconBytes = await readFile(faviconIco);
const ogMetadata = await sharp(openGraph).metadata();

console.log(`Generated favicon.ico (${faviconBytes.length} bytes)`);
console.log(`Generated gamecoin-og.png (${ogMetadata.width}x${ogMetadata.height})`);
