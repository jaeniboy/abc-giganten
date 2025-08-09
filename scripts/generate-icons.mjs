import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconSizes = [64, 192, 512];
const svgPath = path.join(process.cwd(), 'public', 'icon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function generateIcons() {
  console.log('🎨 Generating PWA icons...');
  
  for (const size of iconSizes) {
    const outputPath = path.join(process.cwd(), 'public', `pwa-${size}x${size}.png`);
    
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated ${size}x${size} icon`);
  }
  
  // Generate favicon
  const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(faviconPath.replace('.ico', '.png'));
  
  console.log('✅ Generated favicon');
  console.log('🚀 All PWA icons generated successfully!');
}

generateIcons().catch(console.error);
