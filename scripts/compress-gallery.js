import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./src/photos";
const OUTPUT_DIR = "./src/photos_compressed";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function processFolder(folderPath, relativePath = "") {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processFolder(fullPath, path.join(relativePath, file));
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      const outDir = path.join(OUTPUT_DIR, relativePath);
      ensureDir(outDir);

      const outPath = path.join(
        outDir,
        path.parse(file).name + ".webp"
      );

      sharp(fullPath)
        .resize({ width: 1920 })   // optional: resize max width
        .webp({ quality: 80 })     // compress to 80%
        .toFile(outPath)
        .then(() => console.log(`Processed: ${outPath}`))
        .catch(console.error);
    }
  });
}

processFolder(INPUT_DIR);
