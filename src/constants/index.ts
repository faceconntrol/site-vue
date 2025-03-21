export const COMPANY_INFO = {
  name: 'Третий Глаз',
  phone: '+7 (921) 948-66-75',
  email: 'info@third-eye.ru',
  address: 'Садоводческий массив "Мшинская"'
}

export const SOCIAL_LINKS = {
  vk: 'https://vk.com/thirdeye',
  telegram: 'https://t.me/thirdeye',
  whatsapp: 'https://wa.me/79219486675'
}

export const MENU_ITEMS = [
  { title: 'Услуги', to: '/#services' },
  { title: 'Оборудование', to: '/products' },
  { title: 'Калькулятор', to: '/calculator' },
  { title: 'Контакты', to: '/contact' }
]

export const PRODUCT_CATEGORIES = [
  { title: 'Все категории', value: '' },
  { title: 'Камеры', value: 'camera' },
  { title: 'Умный дом', value: 'smart-home' },
  { title: 'Видеорегистраторы', value: 'recorder' },
  { title: 'Комплекты', value: 'kit' },
  { title: 'Сетевое оборудование', value: 'network' }
]

export const PRODUCT_BRANDS = [
  { title: 'Все производители', value: '' },
  { title: 'Hikvision', value: 'hikvision' },
  { title: 'HiWatch', value: 'hiwatch' }
]

export const CAMERA_TYPES = [
  { title: 'Базовый (2MP)', value: 'basic', price: 9000 },
  { title: 'Стандартный (4MP)', value: 'standard', price: 15000 },
  { title: 'Профессиональный (8MP)', value: 'premium', price: 25000 }
]

export const INSTALLATION_TYPES = [
  { title: 'Стандартная установка', value: 'basic' },
  { title: 'Сложная установка', value: 'complex' }
]

export const SERVICES = [
  {
    icon: 'mdi-cctv',
    title: 'Установка видеонаблюдения',
    description: 'Профессиональное проектирование и монтаж систем видеонаблюдения любой сложности. Подбор оптимального оборудования, расчет стоимости, составление технической документации и качественная установка с гарантией.',
    image: '/images/services/installation.jpg'
  },
  {
    icon: 'mdi-home-automation',
    title: 'Умный дом',
    description: 'Комплексная интеграция систем безопасности с системами умного дома. Автоматизация сценариев безопасности, удаленное управление через мобильное приложение, интеграция с голосовыми помощниками и другими устройствами.',
    image: '/images/services/smart-home.jpg'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Обслуживание',
    description: 'Комплексное техническое обслуживание и поддержка установленных систем. Регулярные проверки работоспособности, чистка оборудования, обновление программного обеспечения, оперативное устранение неисправностей.',
    image: '/images/services/maintenance.jpg'
  }
]

export const FEATURES = [
  {
    icon: 'mdi-certificate',
    title: 'Опыт работы',
    description: 'Более 10 лет успешной работы в сфере безопасности'
  },
  {
    icon: 'mdi-account-group',
    title: 'Команда профессионалов',
    description: 'Сертифицированные специалисты с большим опытом работы'
  },
  {
    icon: 'mdi-star',
    title: 'Качество',
    description: 'Используем только профессиональное оборудование от ведущих производителей'
  },
  {
    icon: 'mdi-clock-check',
    title: 'Гарантия',
    description: 'Предоставляем гарантию на оборудование и выполненные работы'
  }
]

export const LOCAL_STORAGE_KEYS = {
  THEME: 'theme',
  CART: 'cart',
  USER_PREFERENCES: 'userPreferences'
}

export const API_ENDPOINTS = {
  SEND_FORM: '/api/send-form',
  GET_PRODUCTS: '/api/products',
  CALCULATE: '/api/calculate'
}

export const STORAGE_TYPES = [
  { title: 'Видеорегистратор', value: 'nvr' },
  { title: 'Облачное хранилище', value: 'cloud' }
]

export const NETWORK_EQUIPMENT = {
  powerSupply: {
    name: 'Блок питания',
    price: 1000
  },
  poeSwitch4: {
    name: 'POE коммутатор 4 порта',
    price: 4000,
    ports: 4
  },
  poeSwitch8: {
    name: 'POE коммутатор 8 портов',
    price: 6000,
    ports: 8
  }
}

export const CLOUD_STORAGE_PRICES = {
  basic: 350,    // руб/мес за камеру
  standard: 500, // руб/мес за камеру
  premium: 900   // руб/мес за камеру
}

export const DELIVERY_METHODS = {
  PICKUP: 'pickup',
  COURIER: 'courier',
  POST: 'post'
} as const

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  ONLINE: 'online'
} as const

export const WARRANTY_PERIODS = {
  STANDARD: '12',
  EXTENDED: '24',
  PREMIUM: '36'
} as const

export const INSTALLATION_COSTS = {
  // Стоимость установки камеры
  mountingBox: 700,     // Монтажная коробка
  cameraInstall: 1500,  // Установка камеры
  cameraSetup: 400,     // Настройка камеры
  commissioning: 500,   // Пуско-наладка

  // Стоимость установки регистратора
  nvrInstall: 2000,     // Установка регистратора
  nvrSetup: 1000,      // Настройка регистратора
} 