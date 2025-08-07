export interface ImageConfig {
  path: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  placeholder?: 'blur' | 'empty';
}

export interface ImageSection {
  [key: string]: ImageConfig;
}

export const IMAGE_MAPPING: Record<string, ImageSection> = {
  Vineyards: {
    0: {
      path: '/images/Vineyards/Copia di Copia di dettaglio vigneti.jpg',
      alt: 'Valdobbiadene Vineyard Detail',
      width: 1920,
      height: 1080,
      quality: 95,
      placeholder: 'blur',
    },
    1: {
      path: '/images/Vineyards/unnamed.jpg',
      alt: 'Valdobbiadene Panoramic View',
      width: 1200,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
    2: {
      path: '/images/Vineyards/Copia di colline.jpg',
      alt: 'Terraced Vineyards',
      width: 1200,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
    3: {
      path: '/images/Vineyards/Copia di Copia di vigneti.jpg',
      alt: 'Vineyard Detail',
      width: 1200,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
  },
  Grapes: {
    0: {
      path: '/images/Grapes/Copia di GLERA.jpg',
      alt: 'Glera grapes on the vine',
      width: 800,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
    1: {
      path: '/images/Grapes/Copia di vendemmia.jpg',
      alt: 'Grape harvest in Valdobbiadene',
      width: 800,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
    2: {
      path: '/images/Grapes/_R5A4459.jpg',
      alt: 'Grape detail shot',
      width: 800,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
  },
  Sustainable: {
    0: {
      path: '/images/Sustainable/Copia di valdo-2.jpg',
      alt: 'Sustainable viticulture practices',
      width: 800,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
    1: {
      path: '/images/Sustainable/Copia di valdo-3.jpg',
      alt: 'Land stewardship and sustainability',
      width: 800,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
  },
  'Historical Photos': {
    0: {
      path: '/images/Historical Photos/Picture1.png',
      alt: 'Historical Valdo winemaking',
      width: 800,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
    1: {
      path: '/images/Historical Photos/Copia di imbottigliamento-1408x.jpg',
      alt: 'Historical bottling process',
      width: 800,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
  },
  Winemaker: {
    0: {
      path: '/images/Winemaker/Copia di Gianfranco Zanon(1).jpg',
      alt: 'Gianfranco Zanon, Master Winemaker',
      width: 800,
      height: 600,
      quality: 90,
      placeholder: 'blur',
    },
  },
  Logos: {
    valdo: {
      path: '/images/Logos/Brand completa - 4 colori positivo (1).jpg',
      alt: 'Valdo Prosecco logo in white and gold',
      width: 300,
      height: 100,
      quality: 95,
    },
    ws: {
      path: '/images/Logos/Brand completa - 4 colori negativo - Copy.jpg',
      alt: 'Wine Spectator logo',
      width: 60,
      height: 30,
      quality: 95,
    },
  },
  'Casa Valdo': {
    0: {
      path: '/images/Casa Valdo/IMG_2470.jpeg',
      alt: 'Casa Valdo exterior facade',
      width: 800,
      height: 500,
      quality: 90,
      placeholder: 'blur',
    },
    1: {
      path: '/images/Casa Valdo/Picture1.jpg',
      alt: 'Luxury suite at Casa Valdo',
      width: 800,
      height: 500,
      quality: 90,
      placeholder: 'blur',
    },
    2: {
      path: '/images/Casa Valdo/602322.jpg',
      alt: 'Historic wine cellar at Casa Valdo',
      width: 800,
      height: 500,
      quality: 90,
      placeholder: 'blur',
    },
    3: {
      path: '/images/Casa Valdo/602376.jpg',
      alt: 'Garden terrace at Casa Valdo',
      width: 800,
      height: 500,
      quality: 90,
      placeholder: 'blur',
    },
    4: {
      path: '/images/Casa Valdo/602401.jpg',
      alt: 'Dining room at Casa Valdo',
      width: 800,
      height: 500,
      quality: 90,
      placeholder: 'blur',
    },
    5: {
      path: '/images/Casa Valdo/602338.jpg',
      alt: 'Vineyard view from Casa Valdo',
      width: 800,
      height: 500,
      quality: 90,
      placeholder: 'blur',
    },
  },
  'Wine Bottles': {
    0: {
      path: '/images/Bottle Shots/Marca Oro Prosecco DOC Brut USA.png',
      alt: 'Valdo Marca Oro DOC Prosecco bottle',
      width: 400,
      height: 600,
      quality: 95,
      placeholder: 'blur',
    },
    1: {
      path: '/images/Bottle Shots/Copia di Valdo Numero 10 DOCG 75cl.jpg',
      alt: 'Valdo Numero 10 DOCG Prosecco bottle',
      width: 400,
      height: 600,
      quality: 95,
      placeholder: 'blur',
    },
    2: {
      path: '/images/Bottle Shots/Valdobbiadene DOCG USA.png',
      alt: 'Valdo Superiore DOCG Prosecco bottle',
      width: 400,
      height: 600,
      quality: 95,
      placeholder: 'blur',
    },
    3: {
      path: '/images/Bottle Shots/Prosecco Rosè MarcaOro_USA.png',
      alt: 'Valdo Marca Oro Rosé DOC Prosecco bottle',
      width: 400,
      height: 600,
      quality: 95,
      placeholder: 'blur',
    },
  },
  Lifestyle: {
    0: {
      path: '/images/Lifestyle/VALDO_1_2323138_prova 2.jpg',
      alt: 'L\'Aperitivo - The golden hour ritual',
      width: 320,
      height: 320,
      quality: 90,
      placeholder: 'blur',
    },
    1: {
      path: '/images/Lifestyle/5.jpg',
      alt: 'Al Fresco - Dining under the stars',
      width: 320,
      height: 320,
      quality: 90,
      placeholder: 'blur',
    },
    2: {
      path: '/images/Lifestyle/Picture4.png',
      alt: 'La Festa - Every moment is a celebration',
      width: 320,
      height: 320,
      quality: 90,
      placeholder: 'blur',
    },
  },
  Timeline: {
    0: {
      path: '/images/Timeline/3.png',
      alt: '1938 - The Beginning of Valdo',
      width: 400,
      height: 300,
      quality: 90,
      placeholder: 'blur',
    },
    1: {
      path: '/images/Timeline/history.png',
      alt: '1960s - Italian Expansion',
      width: 400,
      height: 300,
      quality: 90,
      placeholder: 'blur',
    },
    2: {
      path: '/images/Historical Photos/Copia di botti2-1408x.jpg',
      alt: '1980s - Global Conquest',
      width: 400,
      height: 300,
      quality: 90,
      placeholder: 'blur',
    },
    3: {
      path: '/images/Timeline/2017_.png',
      alt: 'Today - Worldwide Recognition',
      width: 400,
      height: 300,
      quality: 90,
      placeholder: 'blur',
    },
  },
  Instagram: {
    0: { path: '/images/lifestyle/_R5B1238.jpg', alt: 'Instagram post - Celebration with Prosecco', width: 500, height: 500, quality: 90, placeholder: 'blur', },
    1: { path: '/images/lifestyle/_R5B0204-2.jpg', alt: 'Instagram post - Alfresco dining', width: 500, height: 500, quality: 90, placeholder: 'blur', },
    2: { path: '/images/Vineyards/Copia di Copia di vigneti.jpg', alt: 'Instagram post - Vineyard panorama', width: 500, height: 500, quality: 90, placeholder: 'blur', },
    3: { path: '/images/lifestyle/_R5A4520.jpg', alt: 'Instagram post - Friends gathering', width: 500, height: 500, quality: 90, placeholder: 'blur', },
    4: { path: '/images/Bottle Shots/Marca Oro Prosecco DOC Brut USA.png', alt: 'Instagram post - Wine bottle', width: 500, height: 500, quality: 90, placeholder: 'blur', },
    5: { path: '/images/lifestyle/9.jpg', alt: 'Instagram post - Celebration', width: 500, height: 500, quality: 90, placeholder: 'blur', },
  },
};

export function getImageConfig(section: string, key: string | number): ImageConfig | null {
  const sectionData = IMAGE_MAPPING[section];
  if (!sectionData) {
    console.warn(`Section "${section}" not found in IMAGE_MAPPING`);
    return null;
  }

  const imageConfig = sectionData[key];
  if (!imageConfig) {
    console.warn(`Key "${key}" not found in section "${section}"`);
    return null;
  }

  return imageConfig;
}

// Helper function to get all images from a section
export function getSectionImages(section: string): ImageSection | null {
  return IMAGE_MAPPING[section] || null;
}

// Helper function to get image path
export function getImagePath(section: string, key: string): string | null {
  const config = getImageConfig(section, key);
  return config?.path || null;
}

// Helper function to get image alt text
export function getImageAlt(section: string, key: string): string | null {
  const config = getImageConfig(section, key);
  return config?.alt || null;
}

// Helper function to check if image exists
export function hasImage(section: string, key: string): boolean {
  return getImageConfig(section, key) !== null;
}

// Helper function to get all available sections
export function getAvailableSections(): string[] {
  return Object.keys(IMAGE_MAPPING);
}

// Helper function to get all keys in a section
export function getSectionKeys(section: string): string[] {
  const sectionConfig = IMAGE_MAPPING[section];
  return sectionConfig ? Object.keys(sectionConfig) : [];
} 