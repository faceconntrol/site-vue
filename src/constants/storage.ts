// Константы для расчета объема хранилища в зависимости от разрешения камеры
export const STORAGE_BITRATE = {
  '2mp': {
    resolution: '1920×1080',
    mainstream: {
      bitrate: 4096, // Кбит/с
      fps: 25
    },
    substream: {
      bitrate: 512, // Кбит/с
      fps: 15
    }
  },
  '4mp': {
    resolution: '2560×1440',
    mainstream: {
      bitrate: 6144, // Кбит/с
      fps: 25
    },
    substream: {
      bitrate: 1024, // Кбит/с
      fps: 15
    }
  },
  '6mp': {
    resolution: '3072×2048',
    mainstream: {
      bitrate: 8192, // Кбит/с
      fps: 25
    },
    substream: {
      bitrate: 1536, // Кбит/с
      fps: 15
    }
  },
  '8mp': {
    resolution: '3840×2160',
    mainstream: {
      bitrate: 10240, // Кбит/с
      fps: 25
    },
    substream: {
      bitrate: 2048, // Кбит/с
      fps: 15
    }
  }
} 