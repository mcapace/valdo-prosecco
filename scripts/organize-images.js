#!/usr/bin/env node

/**
 * Image Organization Helper Script for Valdo Prosecco
 * 
 * This script helps organize images from Google Drive into the correct folder structure
 * for the dynamic image discovery system.
 * 
 * Usage:
 * 1. Download images from Google Drive
 * 2. Run this script to create the folder structure
 * 3. Move images into the appropriate folders
 * 4. The website will automatically discover and use the images
 */

const fs = require('fs');
const path = require('path');

// Define the folder structure
const imageFolders = [
  'public/images/Vineyards',
  'public/images/Logos', 
  'public/images/Timeline',
  'public/images/Historical Photos',
  'public/images/Bottle Shots',
  'public/images/Casa Valdo',
  'public/images/Lifestyle',
  'public/images/Sparkling Wine Cocktails',
  'public/images/Winemaker',
  'public/images/Sustainable',
  'public/images/Grapes'
];

// Create folders if they don't exist
function createImageFolders() {
  console.log('🏗️  Creating image folder structure...\n');
  
  imageFolders.forEach(folder => {
    const fullPath = path.join(process.cwd(), folder);
    
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ Created: ${folder}`);
    } else {
      console.log(`📁 Exists: ${folder}`);
    }
  });
  
  console.log('\n📋 Folder structure created successfully!');
}

// Create README files in each folder
function createFolderReadmes() {
  console.log('\n📝 Creating README files for each folder...\n');
  
  const folderDescriptions = {
    'Vineyards': 'Hero background images of Valdobbiadene vineyards',
    'Logos': 'Valdo logo and branding images',
    'Timeline': 'Historical photos for the Bolla Legacy timeline',
    'Historical Photos': 'Additional vintage photos from Valdo\'s history',
    'Bottle Shots': 'Professional photos of Valdo wine bottles (Marca Oro DOC, Numero 10 DOCG, Superiore DOCG, Marco Oro Rose DOC)',
    'Casa Valdo': 'Interior and exterior photos of Casa Valdo Country House',
    'Lifestyle': 'People enjoying Valdo Prosecco in various settings',
    'Sparkling Wine Cocktails': 'Prosecco cocktail and serving images',
    'Winemaker': 'Photos of Gianfranco Zanon and winemaking process',
    'Sustainable': 'Images showcasing Valdo\'s sustainable practices',
    'Grapes': 'Glera grape photos and vineyard close-ups'
  };
  
  imageFolders.forEach(folder => {
    const folderName = path.basename(folder);
    const readmePath = path.join(process.cwd(), folder, 'README.md');
    const description = folderDescriptions[folderName] || 'Images for this category';
    
    const readmeContent = `# ${folderName}

${description}

## Image Requirements
- **Formats**: JPG, JPEG, PNG, WebP, GIF
- **Optimization**: Recommended max 2MB per image
- **Naming**: Use descriptive names (e.g., \`valdo-vineyard-sunset.jpg\`)

## Usage
Images in this folder will be automatically discovered and used by the website.
`;

    fs.writeFileSync(readmePath, readmeContent);
    console.log(`📄 Created README: ${folder}/README.md`);
  });
}

// Display organization instructions
function displayInstructions() {
  console.log('\n🎯 Next Steps:');
  console.log('1. Download your images from Google Drive');
  console.log('2. Organize them into the appropriate folders above');
  console.log('3. Ensure images are optimized for web (max 2MB each)');
  console.log('4. Use descriptive filenames');
  console.log('5. Run the development server to see your images in action');
  console.log('\n📚 For detailed instructions, see: public/images/README.md');
}

// Main execution
function main() {
  console.log('🍷 Valdo Prosecco Image Organization Helper\n');
  
  try {
    createImageFolders();
    createFolderReadmes();
    displayInstructions();
    
    console.log('\n✨ Setup complete! Your images are ready to be organized.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { createImageFolders, createFolderReadmes }; 