import { useState, useEffect, useCallback } from 'react';
import { ImageInfo, FolderInfo } from '@/services/imageService';

interface UseImageServiceOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useImageService(options: UseImageServiceOptions = {}) {
  const { autoRefresh = false, refreshInterval = 300000 } = options; // 5 minutes default

  const [folders, setFolders] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<{ [folder: string]: FolderInfo }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all available folders
  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/images?action=folders');
      const data = await response.json();
      
      if (response.ok) {
        setFolders(data.folders);
      } else {
        setError(data.error || 'Failed to fetch folders');
      }
    } catch (err) {
      setError('Network error while fetching folders');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch folder statistics
  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/images?action=statistics');
      const data = await response.json();
      
      if (response.ok) {
        setStatistics(data.statistics);
      } else {
        setError(data.error || 'Failed to fetch statistics');
      }
    } catch (err) {
      setError('Network error while fetching statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get images from a specific folder
  const getImagesFromFolder = useCallback(async (folderName: string): Promise<ImageInfo[]> => {
    try {
      const response = await fetch(`/api/images?action=images&folder=${encodeURIComponent(folderName)}`);
      const data = await response.json();
      
      if (response.ok) {
        return data.images;
      } else {
        throw new Error(data.error || 'Failed to fetch images');
      }
    } catch (err) {
      console.error(`Error fetching images from ${folderName}:`, err);
      return [];
    }
  }, []);

  // Get folder information
  const getFolderInfo = useCallback(async (folderName: string): Promise<FolderInfo | null> => {
    try {
      const response = await fetch(`/api/images?action=folder-info&folder=${encodeURIComponent(folderName)}`);
      const data = await response.json();
      
      if (response.ok) {
        return data.folderInfo;
      } else {
        throw new Error(data.error || 'Failed to fetch folder info');
      }
    } catch (err) {
      console.error(`Error fetching folder info for ${folderName}:`, err);
      return null;
    }
  }, []);

  // Get specific image
  const getImage = useCallback(async (folderName: string, identifier?: string | number): Promise<string> => {
    try {
      const params = new URLSearchParams({
        action: 'image',
        folder: folderName,
      });
      
      if (identifier !== undefined) {
        params.append('identifier', identifier.toString());
      }
      
      const response = await fetch(`/api/images?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        return data.imagePath;
      } else {
        throw new Error(data.error || 'Failed to fetch image');
      }
    } catch (err) {
      console.error(`Error fetching image from ${folderName}:`, err);
      return '/images/placeholder.jpg';
    }
  }, []);

  // Get random image
  const getRandomImage = useCallback(async (folderName: string): Promise<string> => {
    try {
      const response = await fetch(`/api/images?action=random&folder=${encodeURIComponent(folderName)}`);
      const data = await response.json();
      
      if (response.ok) {
        return data.imagePath;
      } else {
        throw new Error(data.error || 'Failed to fetch random image');
      }
    } catch (err) {
      console.error(`Error fetching random image from ${folderName}:`, err);
      return '/images/placeholder.jpg';
    }
  }, []);

  // Get images by type
  const getImagesByType = useCallback(async (folderName: string, type: string): Promise<ImageInfo[]> => {
    try {
      const response = await fetch(`/api/images?action=by-type&folder=${encodeURIComponent(folderName)}&type=${encodeURIComponent(type)}`);
      const data = await response.json();
      
      if (response.ok) {
        return data.images;
      } else {
        throw new Error(data.error || 'Failed to fetch images by type');
      }
    } catch (err) {
      console.error(`Error fetching images by type from ${folderName}:`, err);
      return [];
    }
  }, []);

  // Get recent images
  const getRecentImages = useCallback(async (folderName: string, days: number = 7): Promise<ImageInfo[]> => {
    try {
      const response = await fetch(`/api/images?action=recent&folder=${encodeURIComponent(folderName)}&days=${days}`);
      const data = await response.json();
      
      if (response.ok) {
        return data.images;
      } else {
        throw new Error(data.error || 'Failed to fetch recent images');
      }
    } catch (err) {
      console.error(`Error fetching recent images from ${folderName}:`, err);
      return [];
    }
  }, []);

  // Clear cache
  const clearCache = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'clear-cache' }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Refresh data after cache clear
        await fetchFolders();
        await fetchStatistics();
        return true;
      } else {
        throw new Error(data.error || 'Failed to clear cache');
      }
    } catch (err) {
      console.error('Error clearing cache:', err);
      return false;
    }
  }, [fetchFolders, fetchStatistics]);

  // Refresh specific folder
  const refreshFolder = useCallback(async (folderName: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'refresh-folder', folder: folderName }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Refresh statistics after folder refresh
        await fetchStatistics();
        return true;
      } else {
        throw new Error(data.error || 'Failed to refresh folder');
      }
    } catch (err) {
      console.error(`Error refreshing folder ${folderName}:`, err);
      return false;
    }
  }, [fetchStatistics]);

  // Initialize data
  useEffect(() => {
    fetchFolders();
    fetchStatistics();
  }, [fetchFolders, fetchStatistics]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchStatistics();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchStatistics]);

  return {
    // State
    folders,
    statistics,
    loading,
    error,
    
    // Actions
    fetchFolders,
    fetchStatistics,
    getImagesFromFolder,
    getFolderInfo,
    getImage,
    getRandomImage,
    getImagesByType,
    getRecentImages,
    clearCache,
    refreshFolder,
    
    // Utility functions
    getTotalImageCount: () => Object.values(statistics).reduce((sum, folder) => sum + folder.imageCount, 0),
    getTotalSize: () => Object.values(statistics).reduce((sum, folder) => sum + folder.totalSize, 0),
    getFolderCount: () => folders.length,
  };
} 