const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const SIZES = {
  thumbnail: 150,
  small: 300,
  medium: 600,
  large: 1200,
  xlarge: 1920
};

const QUALITY = 85;
const FORMATS = ['webp', 'avif'];

// Get all image files recursively
function getImageFiles(dir, extensions = ['.jpg', '.jpeg', '.png']) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files = files.concat(getImageFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.toLowerCase().endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Generate responsive images
async function generateResponsiveImages(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath);
  
  console.log(`Processing: ${inputPath}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate different sizes
    for (const [sizeName, width] of Object.entries(SIZES)) {
      // Skip if original is smaller than target size
      if (metadata.width && metadata.width < width) {
        console.log(`  Skipping ${sizeName} (${width}px) - original is smaller`);
        continue;
      }
      
      // Generate WebP
      await image
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(outputDir, `${filename}-${sizeName}.webp`));
      
      // Generate AVIF
      await image
        .resize(width, null, { withoutEnlargement: true })
        .avif({ quality: QUALITY })
        .toFile(path.join(outputDir, `${filename}-${sizeName}.avif`));
      
      console.log(`  Generated ${sizeName} (${width}px) - WebP & AVIF`);
    }
    
    // Generate original format optimized version
    await image
      .jpeg({ quality: QUALITY })
      .toFile(path.join(outputDir, `${filename}-optimized${ext}`));
    
    console.log(`  Generated optimized original format`);
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

// Main function
async function main() {
  const inputDir = path.join(process.cwd(), 'public', 'images');
  const outputDir = path.join(process.cwd(), 'public', 'images', 'optimized');
  
  console.log('🚀 Starting image optimization...');
  console.log(`Input directory: ${inputDir}`);
  console.log(`Output directory: ${outputDir}`);
  
  if (!fs.existsSync(inputDir)) {
    console.error('Input directory does not exist!');
    process.exit(1);
  }
  
  // Get all image files
  const imageFiles = getImageFiles(inputDir);
  console.log(`Found ${imageFiles.length} images to process`);
  
  if (imageFiles.length === 0) {
    console.log('No images found to process');
    return;
  }
  
  // Process each image
  for (const imageFile of imageFiles) {
    const relativePath = path.relative(inputDir, imageFile);
    const outputSubDir = path.join(outputDir, path.dirname(relativePath));
    
    await generateResponsiveImages(imageFile, outputSubDir);
  }
  
  console.log('✅ Image optimization complete!');
  
  // Generate image manifest
  const manifest = {
    generated: new Date().toISOString(),
    sizes: SIZES,
    quality: QUALITY,
    formats: FORMATS,
    totalImages: imageFiles.length
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('📄 Generated image manifest');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  generateResponsiveImages,
  getImageFiles,
  SIZES,
  QUALITY,
  FORMATS
}; 