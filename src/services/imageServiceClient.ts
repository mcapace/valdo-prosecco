import { getImageConfig, IMAGE_MAPPING } from '@/lib/imageMapping';

// Client-safe image service that uses the IMAGE_MAPPING instead of fs
class ImageServiceClient {
  private cache = new Map<string, any>();

  // Get image from mapping by section and index/key
  getImage(section: string, indexOrKey: number | string): string {
    const cacheKey = `${section}-${indexOrKey}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const sectionConfig = IMAGE_MAPPING[section];
    if (!sectionConfig) {
      console.warn(`Section "${section}" not found in IMAGE_MAPPING`);
      return '/images/placeholder.jpg';
    }

    let imagePath: string;

    if (typeof indexOrKey === 'number') {
      // Get by index
      const sectionKeys = Object.keys(sectionConfig);
      if (indexOrKey >= 0 && indexOrKey < sectionKeys.length) {
        const key = sectionKeys[indexOrKey];
        imagePath = sectionConfig[key].path;
      } else {
        console.warn(`Index ${indexOrKey} out of range for section "${section}"`);
        imagePath = '/images/placeholder.jpg';
      }
    } else {
      // Get by key (filename contains the key)
      const foundKey = Object.keys(sectionConfig).find(key => 
        sectionConfig[key].path.toLowerCase().includes(indexOrKey.toLowerCase())
      );
      imagePath = foundKey ? sectionConfig[foundKey].path : '/images/placeholder.jpg';
    }

    this.cache.set(cacheKey, imagePath);
    return imagePath;
  }

  // Get all images from a section
  getImagesFromFolder(section: string): string[] {
    const sectionConfig = IMAGE_MAPPING[section];
    if (!sectionConfig) {
      console.warn(`Section "${section}" not found in IMAGE_MAPPING`);
      return ['/images/placeholder.jpg'];
    }

    return Object.values(sectionConfig).map(img => img.path);
  }

  // Get random image from section
  getRandomImage(section: string): string {
    const images = this.getImagesFromFolder(section);
    if (images.length === 0) return '/images/placeholder.jpg';
    
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  // Get section info
  getSectionInfo(section: string) {
    const sectionConfig = IMAGE_MAPPING[section];
    if (!sectionConfig) {
      return null;
    }

    return {
      name: section,
      imageCount: Object.keys(sectionConfig).length,
      description: `Images from ${section} section`,
      images: Object.values(sectionConfig)
    };
  }

  // Get all available sections
  getAllSections(): string[] {
    return Object.keys(IMAGE_MAPPING);
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const imageService = new ImageServiceClient(); 