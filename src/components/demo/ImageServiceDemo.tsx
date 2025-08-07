import { useState } from 'react';
import { motion } from 'framer-motion';
import { useImageService } from '@/hooks/useImageService';
import { OptimizedImage } from '../common/OptimizedImage';
import { ImageInfo } from '@/services/imageService';

export function ImageServiceDemo() {
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [folderImages, setFolderImages] = useState<ImageInfo[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const {
    folders,
    statistics,
    loading,
    error,
    getImagesFromFolder,
    getRandomImage,
    getImagesByType,
    getRecentImages,
    clearCache,
    refreshFolder,
    getTotalImageCount,
    getTotalSize,
    getFolderCount,
  } = useImageService({ autoRefresh: true });

  const handleFolderSelect = async (folderName: string) => {
    setSelectedFolder(folderName);
    setLoadingImages(true);
    
    try {
      const images = await getImagesFromFolder(folderName);
      setFolderImages(images);
    } catch (error) {
      console.error('Error loading folder images:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleRandomImage = async () => {
    if (!selectedFolder) return;
    
    try {
      const randomPath = await getRandomImage(selectedFolder);
      const randomImage = folderImages.find(img => img.path === randomPath);
      setSelectedImage(randomImage || null);
    } catch (error) {
      console.error('Error getting random image:', error);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Image Service Demo
        </h2>
        <p className="text-gray-600">
          This demo showcases the comprehensive image service with file system integration and caching.
        </p>
      </motion.div>

      {/* Statistics Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">Image Statistics</h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{getFolderCount()}</div>
              <div className="text-sm text-blue-800">Folders</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{getTotalImageCount()}</div>
              <div className="text-sm text-green-800">Total Images</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{formatFileSize(getTotalSize())}</div>
              <div className="text-sm text-purple-800">Total Size</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                {getTotalImageCount() > 0 ? Math.round(getTotalSize() / getTotalImageCount()) : 0}
              </div>
              <div className="text-sm text-orange-800">Avg Size (bytes)</div>
            </div>
          </div>
        )}
      </motion.section>

      {/* Folder Selection */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">Folder Management</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {folders.map((folder) => {
            const folderStats = statistics[folder];
            return (
              <button
                key={folder}
                onClick={() => handleFolderSelect(folder)}
                className={`p-3 rounded-lg border transition-colors text-left ${
                  selectedFolder === folder
                    ? 'bg-gold text-white border-gold'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium capitalize">
                  {folder.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                {folderStats && (
                  <div className="text-xs opacity-75">
                    {folderStats.imageCount} images • {formatFileSize(folderStats.totalSize)}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Cache Management */}
        <div className="flex gap-3">
          <button
            onClick={clearCache}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Cache
          </button>
          {selectedFolder && (
            <button
              onClick={() => refreshFolder(selectedFolder)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh {selectedFolder}
            </button>
          )}
        </div>
      </motion.section>

      {/* Selected Folder Images */}
      {selectedFolder && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              Images in {selectedFolder.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <button
              onClick={handleRandomImage}
              className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
            >
              Random Image
            </button>
          </div>

          {loadingImages ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {folderImages.map((image, index) => (
                <motion.div
                  key={image.path}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-video relative">
                    <OptimizedImage
                      section=""
                      key=""
                      className="w-full h-full"
                      fill={true}
                      showLoading={true}
                      showError={true}
                      fallbackSrc={image.path}
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm truncate">{image.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {formatFileSize(image.size)} • {image.type.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(image.lastModified)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      )}

      {/* Selected Image Details */}
      {selectedImage && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <h3 className="text-xl font-semibold mb-4">Image Details</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <OptimizedImage
                section=""
                key=""
                className="w-full h-full"
                fill={true}
                showLoading={true}
                showError={true}
                fallbackSrc={selectedImage.path}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">{selectedImage.name}</h4>
                <p className="text-gray-600">{selectedImage.path}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Size:</span>
                  <div>{formatFileSize(selectedImage.size)}</div>
                </div>
                <div>
                  <span className="font-medium">Type:</span>
                  <div className="uppercase">{selectedImage.type}</div>
                </div>
                <div>
                  <span className="font-medium">Modified:</span>
                  <div>{formatDate(selectedImage.lastModified)}</div>
                </div>
                {selectedImage.dimensions && (
                  <div>
                    <span className="font-medium">Dimensions:</span>
                    <div>{selectedImage.dimensions.width} × {selectedImage.dimensions.height}</div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setSelectedImage(null)}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Folder Statistics Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Detailed Statistics</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Folder</th>
                <th className="text-right py-2">Images</th>
                <th className="text-right py-2">Size</th>
                <th className="text-right py-2">Avg Size</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(statistics).map(([folder, stats]) => (
                <tr key={folder} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 capitalize">
                    {folder.replace(/([A-Z])/g, ' $1').trim()}
                  </td>
                  <td className="text-right py-2">{stats.imageCount}</td>
                  <td className="text-right py-2">{formatFileSize(stats.totalSize)}</td>
                  <td className="text-right py-2">
                    {stats.imageCount > 0 ? formatFileSize(Math.round(stats.totalSize / stats.imageCount)) : '0 Bytes'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
} 