/**
 * Image optimization script using sharp
 * Run: node scripts/convert-to-webp.js
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const images = [
  "proj_goviconnect_mobile.png",
  "proj_goviconnect_promo.png",
  "proj_smilecare_final.png",
  "proj_loan_prediction.png",
  "cert_ditec.png",
  "cert_english.png",
  "cert_photoshop.png",
  "cert_uiux.png",
];

async function main() {
  console.log("🖼  Converting images to WebP...\n");

  let totalBefore = 0;
  let totalAfter = 0;

  for (const img of images) {
    const inPath = path.join(PUBLIC_DIR, img);
    const outPath = path.join(PUBLIC_DIR, img.replace(".png", ".webp"));

    if (!fs.existsSync(inPath)) {
      console.log(`⚠  Skipping ${img} (not found)`);
      continue;
    }

    const before = fs.statSync(inPath).size;
    totalBefore += before;

    try {
      await sharp(inPath)
        .webp({ quality: 82, effort: 6 })
        .toFile(outPath);

      const after = fs.statSync(outPath).size;
      totalAfter += after;
      const saved = (((before - after) / before) * 100).toFixed(0);
      console.log(`✅ ${img}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB (-${saved}%)`);
    } catch (e) {
      console.log(`❌ Failed ${img}: ${e.message}`);
    }
  }

  const totalSaved = totalBefore > 0 ? (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0) : 0;
  console.log(`\n📊 Total: ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> ${(totalAfter / 1024 / 1024).toFixed(2)} MB (-${totalSaved}%)`);
}

main().catch(console.error);
