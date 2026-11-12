// Copies this app's build output into prod.amipi.com/prodweb's public/ folder, where it's
// embedded via an iframe at Testing → Eternity Ring Builder (src/Pages/Testing/EternityRingBuilder.js
// there). Run this after any change here that should reach that embed — `npm run build`
// doesn't do it automatically since the two apps are separate repos.
import { existsSync, rmSync, cpSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(here, '..', 'dist');
const prodwebPublicDir = path.resolve(here, '..', '..', 'prod.amipi.com', 'prodweb', 'public');
const destDir = path.join(prodwebPublicDir, 'eternity-ring-builder');

if (!existsSync(distDir)) {
  console.error('dist/ not found — run "npm run build" first.');
  process.exit(1);
}
if (!existsSync(prodwebPublicDir)) {
  console.error(`prodweb public/ folder not found at ${prodwebPublicDir}`);
  console.error('Expected prod.amipi.com/prodweb to be a sibling of this repo under the same parent folder.');
  process.exit(1);
}

rmSync(destDir, { recursive: true, force: true });
mkdirSync(destDir, { recursive: true });
cpSync(distDir, destDir, { recursive: true });

console.log(`Copied dist/ → ${destDir}`);
console.log('Rebuild prodweb (or just refresh in dev) to pick up the change.');
