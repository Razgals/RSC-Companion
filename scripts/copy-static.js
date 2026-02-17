
const fs = require('fs');
const path = require('path');
const srcDir = path.resolve(__dirname, '..', 'app', 'renderer');
const destDir = path.resolve(__dirname, '..', 'dist', 'renderer');
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}
copyRecursive(srcDir, destDir);
console.log('Copied renderer to dist/renderer');
