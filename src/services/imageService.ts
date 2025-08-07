import fs from 'fs';
import path from 'path';
import { getImageConfig, IMAGE_MAPPING } from '@/lib/imageMapping';

export interface ImageInfo {
  name: string;
  path: string;
  size: number;
  lastModified: Date;
  dimensions?: { width: number; height: number };
  type: 'jpg' | 'jpeg' | 'png' | 'webp' | 'svg' | 'gif';
}

export interface FolderInfo {
  name: string;
  path: string;
  imageCount: number;
  totalSize: number;
  images: ImageInfo[];
}

export class ImageService {
  private static instance: ImageService;
  private imageCache: Map<string, ImageInfo[]> = new Map();
  private folderCache: Map<string, FolderInfo> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  // Get all images from a folder with detailed information
  getImagesFromFolder(folderName: string): ImageInfo[] {
    const cacheKey = `folder_${folderName}`;
    const now = Date.now();
    
    // Check cache validity
    if (this.imageCache.has(cacheKey) && this.cacheExpiry.get(cacheKey)! > now) {
      return this.imageCache.get(cacheKey)!;
    }

    const folderPath = path.join(process.cwd(), 'public/images', folderName);
    
    try {
      if (!fs.existsSync(folderPath)) {
        console.warn(`Folder does not exist: ${folderPath}`);
        return [];
      }

      const files = fs.readdirSync(folderPath);
      const images: ImageInfo[] = [];

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile() && this.isImageFile(file)) {
          const imageInfo: ImageInfo = {
            name: file,
            path: `/images/${folderName}/${file}`,
            size: stats.size,
            lastModified: stats.mtime,
            type: this.getImageType(file),
          };

          // Try to get dimensions for supported formats
          try {
            const dimensions = this.getImageDimensions(filePath, imageInfo.type);
            if (dimensions) {
              imageInfo.dimensions = dimensions;
            }
          } catch (error) {
            console.warn(`Could not get dimensions for ${file}:`, error);
          }

          images.push(imageInfo);
        }
      }

      // Sort by name for consistent ordering
      images.sort((a, b) => a.name.localeCompare(b.name));

      // Cache the results
      this.imageCache.set(cacheKey, images);
      this.cacheExpiry.set(cacheKey, now + this.CACHE_DURATION);

      return images;
    } catch (error) {
      console.error(`Error reading folder ${folderName}:`, error);
      return [];
    }
  }

  // Get folder information with statistics
  getFolderInfo(folderName: string): FolderInfo | null {
    const cacheKey = `folder_info_${folderName}`;
    const now = Date.now();
    
    if (this.folderCache.has(cacheKey) && this.cacheExpiry.get(cacheKey)! > now) {
      return this.folderCache.get(cacheKey)!;
    }

    const images = this.getImagesFromFolder(folderName);
    
    if (images.length === 0) {
      return null;
    }

    const folderInfo: FolderInfo = {
      name: folderName,
      path: `/images/${folderName}`,
      imageCount: images.length,
      totalSize: images.reduce((sum, img) => sum + img.size, 0),
      images,
    };

    // Cache the results
    this.folderCache.set(cacheKey, folderInfo);
    this.cacheExpiry.set(cacheKey, now + this.CACHE_DURATION);

    return folderInfo;
  }

  // Get specific image by index or keyword
  getImage(folderName: string, identifier?: number | string): string {
    const images = this.getImagesFromFolder(folderName);
    
    if (images.length === 0) {
      return this.getFallbackImage(folderName);
    }
    
    if (typeof identifier === 'number') {
      const image = images[identifier];
      return image ? image.path : images[0].path;
    }
    
    if (typeof identifier === 'string') {
      const found = images.find(img => 
        img.name.toLowerCase().includes(identifier.toLowerCase())
      );
      return found ? found.path : images[0].path;
    }
    
    return images[0].path;
  }

  // Get image with fallback to mapping system
  getImageWithFallback(section: string, key: string): string {
    // First try the mapping system
    const mappedImage = getImageConfig(section, key);
    if (mappedImage) {
      return mappedImage.path;
    }

    // Fallback to folder-based approach
    const folderName = this.getFolderFromSection(section);
    return this.getImage(folderName, key);
  }

  // Get random image from folder
  getRandomImage(folderName: string): string {
    const images = this.getImagesFromFolder(folderName);
    
    if (images.length === 0) {
      return this.getFallbackImage(folderName);
    }
    
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex].path;
  }

  // Get images by type
  getImagesByType(folderName: string, type: string): ImageInfo[] {
    const images = this.getImagesFromFolder(folderName);
    return images.filter(img => img.type === type);
  }

  // Get images by size range (in bytes)
  getImagesBySize(folderName: string, minSize: number, maxSize: number): ImageInfo[] {
    const images = this.getImagesFromFolder(folderName);
    return images.filter(img => img.size >= minSize && img.size <= maxSize);
  }

  // Get recently modified images
  getRecentImages(folderName: string, days: number = 7): ImageInfo[] {
    const images = this.getImagesFromFolder(folderName);
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    return images.filter(img => img.lastModified > cutoffDate);
  }

  // Get all available folders
  getAvailableFolders(): string[] {
    const imagesPath = path.join(process.cwd(), 'public/images');
    
    try {
      if (!fs.existsSync(imagesPath)) {
        return [];
      }

      const folders = fs.readdirSync(imagesPath, { withFileTypes: true });
      return folders
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    } catch (error) {
      console.error('Error reading images directory:', error);
      return [];
    }
  }

  // Get folder statistics
  getFolderStatistics(): { [folder: string]: FolderInfo } {
    const folders = this.getAvailableFolders();
    const stats: { [folder: string]: FolderInfo } = {};
    
    for (const folder of folders) {
      const info = this.getFolderInfo(folder);
      if (info) {
        stats[folder] = info;
      }
    }
    
    return stats;
  }

  // Clear cache
  clearCache(): void {
    this.imageCache.clear();
    this.folderCache.clear();
    this.cacheExpiry.clear();
  }

  // Refresh cache for specific folder
  refreshFolder(folderName: string): void {
    const cacheKey = `folder_${folderName}`;
    const infoCacheKey = `folder_info_${folderName}`;
    
    this.imageCache.delete(cacheKey);
    this.folderCache.delete(infoCacheKey);
    this.cacheExpiry.delete(cacheKey);
    this.cacheExpiry.delete(infoCacheKey);
  }

  // Private helper methods
  private isImageFile(filename: string): boolean {
    const imageExtensions = /\.(jpg|jpeg|png|webp|svg|gif)$/i;
    return imageExtensions.test(filename);
  }

  private getImageType(filename: string): ImageInfo['type'] {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'jpeg';
      case '.png':
        return 'png';
      case '.webp':
        return 'webp';
      case '.svg':
        return 'svg';
      case '.gif':
        return 'gif';
      default:
        return 'jpg';
    }
  }

  private getImageDimensions(filePath: string, type: string): { width: number; height: number } | null {
    // This is a simplified implementation
    // In a real application, you might want to use a library like 'sharp' or 'jimp'
    // to get actual image dimensions
    
    if (type === 'svg') {
      // For SVG, we could parse the viewBox or width/height attributes
      return null;
    }
    
    // For now, return null - dimensions would be set in the mapping system
    return null;
  }

  private getFallbackImage(folderName: string): string {
    // Return a placeholder image path
    return `/images/placeholder.jpg`;
  }

  private getFolderFromSection(section: string): string {
    const sectionToFolder: { [key: string]: string } = {
      hero: 'Logos',
      timeline: 'Historical Photos',
      valdobbiadene: 'Vineyards',
      valdoDifference: 'Grapes',
      wines: 'Bottle Shots',
      casaValdo: 'Casa Valdo',
      lifestyle: 'Lifestyle',
      backgrounds: 'Backgrounds',
      icons: 'Icons',
    };
    
    return sectionToFolder[section] || 'Vineyards';
  }

  // Utility methods for image optimization
  getOptimizedImagePath(originalPath: string, width: number, quality: number = 85): string {
    // In a real implementation, this would generate optimized image URLs
    // For now, return the original path
    return originalPath;
  }

  // Get image metadata for SEO
  getImageMetadata(imagePath: string): { alt: string; title: string } {
    const filename = path.basename(imagePath, path.extname(imagePath));
    const alt = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    return {
      alt,
      title: alt,
    };
  }
}

// Export singleton instance
export const imageService = ImageService.getInstance();

// Utility functions for common operations
export function getImageFromFolder(folderName: string, identifier?: number | string): string {
  return imageService.getImage(folderName, identifier);
}

export function getRandomImageFromFolder(folderName: string): string {
  return imageService.getRandomImage(folderName);
}

export function getFolderImages(folderName: string): ImageInfo[] {
  return imageService.getImagesFromFolder(folderName);
}

export function getFolderInfo(folderName: string): FolderInfo | null {
  return imageService.getFolderInfo(folderName);
} 