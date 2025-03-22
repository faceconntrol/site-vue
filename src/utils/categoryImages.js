// Импорт реальных изображений категорий
export const categoryImages = {
  // Предполагается, что эти пути верны
  hikvision: '/src/assets/products/hikvision-camera.jpg',
  hiwatch_pro: '/src/assets/products/hiwatch-pro-camera.jpg',
  hiwatch_value: '/src/assets/products/hiwatch-value-camera.jpg',
  axpro: '/src/assets/products/axpro-security.jpg',
  accessories: '/src/assets/products/accessories.jpg',
  kits: '/src/assets/products/security-kits.jpg',
  
  // Технологии
  colorvu: '/src/assets/products/colorvu-feature.jpg',
  acusense: '/src/assets/products/acusense-feature.jpg',
  cameras: '/assets/images/categories/cameras.jpg',
  recorders: '/assets/images/categories/recorders.jpg',
  network: '/assets/images/categories/network.jpg',
  sensors: '/assets/images/categories/sensors.jpg',
  panels: '/assets/images/categories/panels.jpg',
  sockets: '/assets/images/categories/sockets.jpg'
};

// Резервные заглушки (используются, если реальные изображения не загрузятся)
export const fallbackImages = {
  hikvision: 'https://via.placeholder.com/400x300/E91E63/FFFFFF?text=HikVision',
  hiwatch_pro: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=HiWatch+Pro',
  hiwatch_value: 'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=HiWatch+Value',
  axpro: 'https://via.placeholder.com/400x300/1976D2/FFFFFF?text=AxPro',
  accessories: 'https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Аксессуары',
  kits: 'https://via.placeholder.com/400x300/607D8B/FFFFFF?text=Комплекты',
  colorvu: 'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=ColorVu',
  acusense: 'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=AcuSense',
  cameras: 'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=IP-камеры',
  recorders: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Видеорегистраторы',
  network: 'https://via.placeholder.com/400x300/607D8B/FFFFFF?text=Сетевое+оборудование',
  sensors: 'https://via.placeholder.com/400x300/E91E63/FFFFFF?text=Датчики',
  panels: 'https://via.placeholder.com/400x300/3F51B5/FFFFFF?text=Контрольные+панели',
  sockets: 'https://via.placeholder.com/400x300/009688/FFFFFF?text=Умные+розетки'
};

export default categoryImages; 