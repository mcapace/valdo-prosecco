declare global {
  interface Window {
    elfsight?: {
      init: () => void;
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export {}; 