/**
 * Image optimization script
 * Converts large PNG files in /public to WebP (80% smaller on mobile)
 * Run: node scripts/optimize-images.js
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const images = [
  "proj_goviconnect_mobile.png",  // 1.9 MB -> ~200 KB
  "proj_goviconnect_promo.png",   // 639 KB -> ~100 KB
  "proj_smilecare_final.png",     // 1.5 MB -> ~180 KB
  "proj_loan_prediction.png",     // 392 KB -> ~60 KB
  "cert_ditec.png",               // 579 KB -> ~80 KB
  "cert_english.png",             // 668 KB -> ~90 KB
  "cert_photoshop.png",           // 659 KB -> ~90 KB
  "cert_uiux.png",                // 509 KB -> ~70 KB
];

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
    // Use sharp via npx to convert, quality 82 is a good visual/size balance
    execSync(
      `npx -y sharp-cli@3 --input "${inPath}" --output "${outPath}" --quality 82 --format webp`,
      { stdio: "pipe" }
    );

    if (fs.existsSync(outPath)) {
      const after = fs.statSync(outPath).size;
      totalAfter += after;
      const saved = (((before - after) / before) * 100).toFixed(0);
      console.log(
        `✅ ${img}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB (-${saved}%)`
      );
    }
  } catch (e) {
    console.log(`❌ Failed ${img}: ${e.message}`);
  }
}

const totalSaved = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0);
console.log(
  `\n📊 Total: ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> ${(totalAfter / 1024 / 1024).toFixed(2)} MB (-${totalSaved}%)`
);
console.log("\n⚠  Next step: Update image references in Projects.tsx and Certifications.tsx to use .webp instead of .png");
console.log("   Next.js will auto-convert to WebP if you use <Image> correctly, but using native WebP is even faster.");
