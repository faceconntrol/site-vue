export interface Technology {
  title: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
  category: 'video' | 'smart-home';
}

export const technologies: Technology[] = [
  {
    title: 'ColorVu',
    description: 'Революционная технология ночной съемки, которая позволяет получать цветное изображение даже в полной темноте. В отличие от обычных камер, которые ночью дают черно-белое изображение, ColorVu использует специальные светочувствительные сенсоры и умную подсветку для передачи естественных цветов.',
    image: '/images/technologies/colorvu.jpg',
    icon: 'mdi-eye',
    category: 'video',
    features: [
      'Цветное изображение 24/7 в любых условиях освещения',
      'Высокая детализация даже в полной темноте',
      'Встроенная теплая LED-подсветка',
      'Минимальные искажения при движении'
    ]
  },
  {
    title: 'AcuSense',
    description: 'Умная система видеоаналитики на базе искусственного интеллекта, которая точно различает людей и транспортные средства от других движущихся объектов. Это значительно снижает количество ложных срабатываний и делает охрану более эффективной.',
    image: '/images/technologies/acusense.jpg',
    icon: 'mdi-brain',
    category: 'video',
    features: [
      'Точное распознавание людей и транспорта',
      'Фильтрация ложных тревог до 90%',
      'Быстрый поиск в архиве по типу объекта',
      'Цветовая маркировка целей для удобного отслеживания'
    ]
  },
  {
    title: 'DarkFighter',
    description: 'Передовая технология съемки при экстремально низкой освещенности. DarkFighter использует усовершенствованные сенсоры и алгоритмы обработки изображения, чтобы обеспечить четкую картинку даже там, где человеческий глаз практически ничего не видит.',
    image: '/images/technologies/darkfighter.jpg',
    icon: 'mdi-lightbulb',
    category: 'video',
    features: [
      'Работа при освещенности до 0.002 люкс',
      'Улучшенная цветопередача в сумерках',
      'Интеллектуальное шумоподавление',
      'Сохранение деталей в темных и светлых участках'
    ]
  },
  {
    title: 'Deep Learning',
    description: 'Технология глубокого обучения для интеллектуального видеонаблюдения. Используя нейронные сети, система может распознавать сложные ситуации, классифицировать объекты и анализировать поведение людей с высокой точностью.',
    image: '/images/technologies/deep-learning.jpg',
    icon: 'mdi-chip',
    category: 'video',
    features: [
      'Распознавание лиц и поиск по базе данных',
      'Определение нарушений периметра',
      'Анализ скопления людей',
      'Обнаружение подозрительного поведения'
    ]
  },
  {
    title: 'TandemVu',
    description: 'Инновационное решение, объединяющее панорамную камеру с широким углом обзора и PTZ-камеру с функцией увеличения в одном корпусе. Это позволяет одновременно следить за общей обстановкой и детально рассматривать интересующие объекты.',
    image: '/images/technologies/tandemvu.jpg',
    icon: 'mdi-camera-control',
    category: 'video',
    features: [
      'Одновременный панорамный и детальный обзор',
      'Автоматическое сопровождение объектов',
      'Зум до 42x без потери качества',
      'Экономия на установке и обслуживании'
    ]
  },
  {
    title: 'Smart IR',
    description: 'Умная инфракрасная подсветка с автоматической регулировкой мощности. Технология анализирует расстояние до объектов и условия освещения, чтобы обеспечить оптимальную видимость без засветов и темных участков.',
    image: '/images/technologies/smart-ir.jpg',
    icon: 'mdi-flashlight',
    category: 'video',
    features: [
      'Адаптивная регулировка мощности подсветки',
      'Равномерное освещение всей сцены',
      'Дальность действия до 100 метров',
      'Энергоэффективность и долгий срок службы'
    ]
  },
  {
    title: 'Hik-Connect',
    description: 'Платформа для удаленного управления устройствами умного дома Hikvision. Позволяет контролировать все подключенные устройства через единое приложение с любого устройства и из любой точки мира.',
    image: '/images/technologies/hik-connect.jpg',
    icon: 'mdi-cellphone-link',
    category: 'smart-home',
    features: [
      'Удаленное управление всеми устройствами',
      'Мгновенные уведомления о событиях',
      'Создание сценариев автоматизации',
      'Защищенное облачное подключение'
    ]
  },
  {
    title: 'Smart Home Security',
    description: 'Комплексное решение для защиты дома, объединяющее камеры видеонаблюдения, датчики движения, умные замки и систему контроля доступа в единую экосистему безопасности.',
    image: '/images/technologies/smart-home-security.jpg',
    icon: 'mdi-shield-home',
    category: 'smart-home',
    features: [
      'Интеграция всех устройств безопасности',
      'Умная система контроля доступа',
      'Мониторинг открытия дверей и окон',
      'Автоматическое оповещение о вторжении'
    ]
  },
  {
    title: 'Smart Environmental Control',
    description: 'Система умного управления климатом и освещением, которая автоматически поддерживает комфортные условия в доме, экономя энергию и создавая идеальную атмосферу для жизни.',
    image: '/images/technologies/smart-environmental.jpg',
    icon: 'mdi-thermostat',
    category: 'smart-home',
    features: [
      'Умное управление температурой',
      'Автоматизация освещения',
      'Контроль качества воздуха',
      'Энергоэффективные сценарии работы'
    ]
  }
] 