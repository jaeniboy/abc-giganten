import fs from 'fs';
import path from 'path';

// Read the letterData.ts file
const letterDataPath = path.join(process.cwd(), 'src', 'utils', 'letterData.ts');
let content = fs.readFileSync(letterDataPath, 'utf8');

// Replace all hardcoded image paths with getPublicImageUrl calls
content = content.replace(
  /url: '\/images\/([^']+)'/g,
  "url: getPublicImageUrl('$1')"
);

// Write the updated content back
fs.writeFileSync(letterDataPath, content, 'utf8');

console.log('✅ Updated all image URLs in letterData.ts to use getPublicImageUrl');
console.log('📁 Images will now load correctly with the base path in production');
