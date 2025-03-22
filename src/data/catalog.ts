// Добавить экспорт типа Product
export interface Product {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  brand: string
  section?: string // Добавляем новое поле для секции
  specs?: string[]
  additional_info?: string
  maxResolution?: number
  channels?: number
  resolution?: number
}

interface ProductsDatabase {
  [key: string]: Product;
}

export const productsDB: ProductsDatabase = {
  'DS-2CD2327G2-LU': {
    id: 'DS-2CD2327G2-LU',
    title: 'DS-2CD2327G2-LU ColorVu',
    description: '2 Мп уличная IP-камера с технологией ColorVu для цветного изображения 24/7',
    additional_info: 'Благодаря технологии ColorVu и высокочувствительной матрице камера формирует цветное изображение даже в условиях минимальной освещенности. Встроенная LED-подсветка мягкого белого света обеспечивает качественное цветное изображение на расстоянии до 30м даже в полной темноте.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS с технологией ColorVu',
      'Разрешение 2 Мп (1920×1080) @ 25 к/с',
      'Чувствительность: 0.0005 лк @ (F1.0, AGC вкл)',
      'Фиксированный объектив 2.8/4/6 мм',
      'Встроенная LED-подсветка до 30м',
      'Аппаратный WDR 130дБ, 3D DNR, BLC, HLC',
      'Встроенный микрофон',
      'Поддержка карт памяти до 256 ГБ',
      'Защита IP67'
    ],
    price: 12490,
    image: '/images/products/DS-2CD2327G2-LU.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 2
  },
  'ds-2cd2023g2': {
    id: 'ds-2cd2023g2',
    title: 'DS-2CD2023G2-I EXIR',
    description: '2 Мп уличная цилиндрическая IP-камера с EXIR-подсветкой',
    additional_info: 'Профессиональная IP-камера с технологией EXIR 2.0 для качественного видеонаблюдения в любых условиях. Благодаря встроенному алгоритму глубокого обучения камера точно классифицирует объекты (человек/транспорт) и снижает количество ложных тревог.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 30 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8/4/6 мм',
      'EXIR-подсветка до 40м',
      'Аппаратный WDR 120дБ, 3D DNR',
      'Классификация целей: человек/транспортное средство',
      'Защита IP67, IK10',
      'Поддержка H.265+/H.265'
    ],
    price: 7990,
    image: '/images/products/ds-2cd2023g2.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 2
  },
  'dome-2mp': {
    id: 'dome-2mp',
    title: 'DS-2CD2123G2-I EXIR',
    description: '2 Мп купольная IP-камера с EXIR-подсветкой',
    additional_info: 'Профессиональная купольная IP-камера с технологией EXIR 2.0 для равномерного ИК-освещения. Поддерживает технологию AcuSense для точного обнаружения людей и транспортных средств.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 30 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8/4 мм',
      'EXIR-подсветка до 30м',
      'Аппаратный WDR 120дБ, 3D DNR',
      'Антивандальная защита IK10',
      'Защита IP67',
      'Поддержка H.265+/H.265'
    ],
    price: 12990,
    image: '/images/products/dome-2mp.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 2
  },
  'hw-ds-i200': {
    id: 'hw-ds-i200',
    title: 'DS-I200 EXIR',
    description: '2 Мп цилиндрическая IP-камера для организации базового видеонаблюдения',
    additional_info: 'Компактная IP-камера HiWatch DS-I200 с EXIR-подсветкой обеспечивает качественное видеонаблюдение в любое время суток. Идеально подходит для создания базовых систем видеонаблюдения.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8 мм',
      'EXIR-подсветка до 30м',
      'Встроенный микрофон',
      'Цифровой WDR, 3D DNR',
      'Поддержка PoE (802.3af)',
      'Защита IP67'
    ],
    price: 5990,
    image: '/images/products/hw-ds-i200.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 2
  },
  'hw-ds-i203': {
    id: 'hw-ds-i203',
    title: 'DS-I203 EXIR',
    description: '2 Мп уличная купольная IP-камера с EXIR подсветкой до 30м',
    additional_info: 'Всепогодная IP-камера HiWatch DS-I203 с EXIR-подсветкой предназначена для круглосуточного видеонаблюдения. Поддерживает кодек H.265+ для эффективного сжатия видеопотока.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 4 мм',
      'EXIR-подсветка до 30м',
      'Цифровой WDR, 3D DNR',
      'Поддержка H.265+/H.265',
      'Питание PoE/12В DC',
      'Защита IP67'
    ],
    price: 5700,
    image: '/images/products/hw-ds-i203.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 2
  },
  'hw-ds-i400': {
    id: 'hw-ds-i400',
    title: 'DS-I400 EXIR',
    description: '4 Мп уличная цилиндрическая IP-камера',
    additional_info: 'Профессиональная IP-камера HiWatch с технологией EXIR 2.0 обеспечивает четкое изображение в высоком разрешении и равномерную ИК-подсветку без засветов.',
    specs: [
      'Матрица 1/3" Progressive Scan CMOS',
      'Разрешение 4 Мп (2688×1520) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8 мм (103° по горизонтали)',
      'EXIR-подсветка до 30м',
      'Цифровой WDR, 3D DNR',
      'Поддержка H.265+/H.265',
      'Защита IP67',
      'Питание PoE/12В DC'
    ],
    price: 7990,
    image: '/images/products/hw-ds-i400.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 4
  },
  'hw-ds-i450': {
    id: 'hw-ds-i450',
    title: 'DS-I450 EXIR',
    description: '4 Мп уличная IP-камера с комбинированной EXIR/LED подсветкой',
    additional_info: 'Профессиональная 4мп камера. Отличный бюджетный выбор для защиты вашего дома',
    specs: [
      'Матрица 1/3" Progressive Scan CMOS',
      'Разрешение 4 Мп (2688×1520) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'EXIR/LED-подсветка до 30м',
      'Цифровой WDR, 3D DNR',
      'Детекция движения, вторжения в область',
      'Слот для microSD до 128 ГБ',
      'Защита IP67'
    ],
    price: 9990,
    image: '/images/products/hw-ds-i450.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 4
  },
  'ptz': {
    id: 'ptz',
    title: 'DS-2DE3A404IW-DE DarkFighter',
    description: '4 Мп поворотная IP-камера с 4x зумом двусторонней связью и функцией LED подсветки объекта',
    additional_info: 'Скоростная поворотная IP-камера с технологией DarkFighter для работы при слабом освещении. Обеспечивает точное позиционирование и плавное слежение за объектами, а также аудиовизуальную сигнализацию',
    specs: [
      'Матрица 1/3" Progressive Scan CMOS',
      'Разрешение 4 Мп (2560×1440) @ 30 к/с',
      'Чувствительность: 0.005 лк @ (F1.6, AGC вкл)',
      'Оптический зум 4×, цифровой 16×',
      'ИК-подсветка до 50м',
      'Дальность подсветки белым светом: до 30 м',
      'Встроенный динамик и встроенный микрофон (есть) для звукового предупреждения и двусторонней аудиосвязи',
      'Аппаратный WDR 120дБ, 3D DNR',
      'Скорость поворота до 160°/с',
      'Защита IP66',
      'Питание PoE+/24В AC'
    ],
    price: 36990,
    image: '/images/products/ptz.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 4
  },
  'DS-2CD2347G2-LU': {
    id: 'DS-2CD2347G2-LU',
    title: 'DS-2CD2347G2-LU ColorVu',
    description: '4 Мп IP-камера с технологией ColorVu для цветного изображения 24/7',
    additional_info: 'Профессиональная IP-камера с технологией ColorVu второго поколения обеспечивает яркое цветное изображение даже в полной темноте благодаря высокочувствительной матрице и встроенной LED-подсветке.',
    specs: [
      'Матрица 1/1.8" Progressive Scan CMOS с технологией ColorVu',
      'Разрешение 4 Мп (2688×1520) @ 30 к/с',
      'Чувствительность: 0.0005 лк @ (F1.0, AGC вкл)',
      'Фиксированный объектив 2.8/4/6 мм',
      'Встроенная LED-подсветка до 40м',
      'Аппаратный WDR 130дБ, 3D DNR, BLC',
      'Встроенный микрофон',
      'Поддержка карт памяти до 256 ГБ',
      'Защита IP67'
    ],
    price: 15700,
    image: 'images/products/DS-2CD2347G2-LU.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 4
  },
  'ds-2cd2t47g2': {
    id: 'ds-2cd2t47g2',
    title: 'DS-2CD2T47G2-L ColorVu',
    description: '4 Мп уличная цилиндрическая IP-камера с технологией ColorVu',
    additional_info: 'Профессиональная IP-камера с технологией ColorVu второго поколения обеспечивает яркое цветное изображение 24/7. Светосильный объектив и высокочувствительная матрица позволяют получать качественное цветное видео даже в условиях минимальной освещенности.',
    specs: [
      'Матрица 1/1.8" Progressive Scan CMOS с технологией ColorVu',
      'Разрешение 4 Мп (2688×1520) @ 30 к/с',
      'Чувствительность: 0.0005 лк @ (F1.0, AGC вкл)',
      'Светосильный объектив F1.0',
      'Встроенная LED-подсветка до 40м',
      'Аппаратный WDR 130дБ, 3D DNR',
      'Поддержка H.265+/H.265',
      'Защита IP67'
    ],
    price: 17300,
    image: '/images/products/ds-2cd2t47g2.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 4
  },
  'bullet-4mp': {
    id: 'bullet-4mp',
    title: 'DS-2CD2T43G2-4I EXIR',
    description: '4 Мп уличная цилиндрическая IP-камера с EXIR-подсветкой до 80м',
    additional_info: 'Профессиональная всепогодная IP-камера с мощной EXIR-подсветкой до 80м. Оснащена встроенным обогревателем для работы при экстремально низких температурах.',
    specs: [
      'Матрица 1/2.7" Progressive Scan CMOS',
      'Разрешение 4 Мп (2688×1520) @ 30 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8/4/6 мм',
      'EXIR-подсветка до 80м',
      'Аппаратный WDR 120дБ, 3D DNR',
      'Встроенный обогреватель',
      'Защита IP67, IK10',
      'Рабочая температура -40°C до +60°C'
    ],
    price: 15990,
    image: '/images/products/bullet-4mp.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 4
  },
  'ds-2cd2783g2': {
    id: 'ds-2cd2783g2',
    title: 'DS-2CD2783G2-IZS PTZ EXIR',
    description: '8 Мп купольная IP-камера с вариофокальным объективом и EXIR подсветкой до 40м',
    additional_info: 'Профессиональная антивандальная купольная IP-камера с разрешением 4K и моторизированным вариофокальным объективом. Поддерживает интеллектуальные функции видеоаналитики на базе алгоритмов глубокого обучения.',
    specs: [
      'Матрица 1/2.7" Progressive Scan CMOS',
      'Разрешение 8 Мп (3840×2160) @ 20 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Моторизированный объектив 2.8-12 мм',
      'EXIR-подсветка до 40м',
      'Аппаратный WDR 140дБ, 3D DNR',
      'AcuSense определение Человек/Транспорт',
      'Защита IP67, IK10',
      'Поддержка H.265+/H.265'
    ],
    price: 40490,
    image: '/images/products/ds-2cd2783g2.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 8
  },
  'ds-2cd2686g2': {
    id: 'ds-2cd2683g2',
    title: 'DS-2CD2683G2-IZS AcuSense',
    description: '8 Мп уличная купольная IP-камера с AcuSense',
    additional_info: 'Профессиональная IP-камера с технологией AcuSense второго поколения использует алгоритмы глубокого обучения для точной классификации целей (человек/транспорт) и снижения количества ложных тревог.',
    specs: [
      'Матрица 1/2" Progressive Scan CMOS',
      'Разрешение 8 Мп (3840×2160) @ 25 к/с',
      'Чувствительность: 0.009 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Моторизированный объектив 2.8-12 мм',
      'EXIR-подсветка до 40м',
      'Аппаратный WDR 140дБ, 3D DNR',
      'Классификация целей: человек/транспортное средство',
      'Защита IP67, IK10',
      'Слот для microSD до 256 ГБ'
    ],
    price: 29990,
    image: '/images/products/ds-2cd2686g2.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 8
  },
  'DS-2CD3386G2-ISU': {
    id: 'DS-2CD3386G2-ISU',
    title: 'DS-2CD3386G2-ISU AcuSense EXIR',
    description: '8 Мп IP-камера с технологией AcuSense для точного обнаружения людей и транспорта',
    additional_info: 'Технология AcuSense использует алгоритмы глубокого обучения для точной классификации целей, что значительно снижает количество ложных тревог.',
    specs: [
      'Разрешение 8 Мп',
      'Матрица 1/2.7" Progressive Scan CMOS',
      'ИК-подсветка до 30м',
      'Защита IP67',
      'Поддержка H.265+',
      'Питание PoE/12В',
      'WDR 120дБ',
      'Точное обнаружение людей и транспорта'
    ],
    price: 13990,
    image: '/images/products/DS-2CD2386G2-I.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 8
  },
  'ds-7604ni-k1': {
    id: 'ds-7604ni-k1',
    title: 'Hikvision DS-7604NI-K1',
    description: '4-канальный сетевой видеорегистратор с поддержкой камер до 8 Мп',
    additional_info: 'Компактный видеорегистратор начального уровня в пластиковом корпусе. Поддерживает запись и отображение с камер разрешением до 8 Мп, оснащен одним портом SATA для жесткого диска до 10 ТБ.',
    specs: [
      'Запись и отображение 4 камер разрешением до 8 Мп',
      'Пропускная способность 40 Мбит/с',
      'Поддержка 1 SATA HDD до 10 ТБ',
      'Выходы HDMI (4K) и VGA (1080p)',
      'Поддержка H.265+/H.265/H.264+/H.264',
      'Удаленный доступ через Hik-Connect P2P',
      'Компактный пластиковый корпус'
    ],
    price: 7490,
    image: '/images/products/ds-7604ni-k1.jpg',
    category: 'recorder',
    brand: 'hikvision',
    section: 'video',
    channels: 4
  },
  'DS-7608NI-K2': {
    id: 'DS-7608NI-K2',
    title: 'Hikvision DS-7608NI-K2',
    description: '8-канальный сетевой видеорегистратор',
    channels: 8,  // Добавляем количество каналов
    additional_info: 'Профессиональный видеорегистратор с поддержкой камер высокого разрешения и продвинутыми сетевыми функциями.',
    specs: [
      '8 IP каналов',
      'Запись до 8 Мп',
      'Выход HDMI 4K',
      '2 SATA до 10ТБ каждый',
      'Поддержка H.265+',
      'Входящий поток 80 Мбит/с',
      'Поддержка P2P',
      'ONVIF'
    ],
    price: 19990,
    image: '/images/products/DS-7608NI-K2.jpg',
    category: 'recorder',
    brand: 'hikvision',
    section: 'video',
    maxResolution: 8
  },
  'ds-7608ni-k2-8p': {
    id: 'ds-7608ni-k2-8p',
    title: 'Hikvision DS-7608NI-K2/8P',
    description: '8-канальный сетевой видеорегистратор с PoE',
    channels: 8,  // Добавляем количество каналов
    specs: [
      '8 IP каналов',
      '8 портов PoE',
      'Запись до 8 Мп',
      '2 HDD до 10ТБ',
      'HDMI 4K'
    ],
    price: 27990,
    image: '/images/products/ds-7608ni-k2-8p.jpg',
    category: 'recorder',
    brand: 'hikvision',
    section: 'video',
    maxResolution: 8
  },
  'ds-7616ni-k2-16p': {
    id: 'ds-7616ni-k2-16p',
    title: 'Hikvision DS-7616NI-K2/16P',
    description: '16-канальный IP-видеорегистратор с PoE',
    channels: 16,  // Добавляем количество каналов
    specs: [
      '16 IP каналов',
      '16 портов PoE',
      'Запись до 8 Мп',
      '2 HDD до 10ТБ',
      'HDMI 4K'
    ],
    price: 39990,
    image: '/images/products/ds-7616ni-k2-16p.jpg',
    category: 'recorder',
    brand: 'hikvision',
    section: 'video',
    maxResolution: 8
  },
  'ds-7732ni-k4': {
    id: 'ds-7732ni-k4',
    title: 'Hikvision DS-7732NI-K4',
    description: '32-канальный IP-видеорегистратор',
    channels: 32,  // Добавляем количество каналов
    specs: [
      '32 IP канала',
      'Запись до 12 Мп',
      'H.265+/H.264+',
      '4 HDD до 10ТБ',
      'HDMI 4K'
    ],
    price: 49990,
    image: '/images/products/ds-7732ni-k4.jpg',
    category: 'recorder',
    brand: 'hikvision',
    section: 'video',
    maxResolution: 12
  },
  'hw-n204': {
    id: 'hw-n204',
    title: 'HiWatch DS-N204',
    description: '4-канальный IP-видеорегистратор',
    channels: 4,  // Добавляем количество каналов
    additional_info: 'Видеорегистратор HiWatch DS-N204 представляет собой оптимальное решение для небольших систем видеонаблюдения.',
    specs: [
      '4 IP канала до 4 Мп',
      'Входящий поток до 40 Мбит/с',
      'Поддержка H.265+/H.264',
      'HDMI и VGA выходы до 1080p',
      '1 SATA до 6ТБ',
      'Поддержка P2P',
      'Мобильный мониторинг'
    ],
    price: 8690,
    image: '/images/products/hw-n204.jpg',
    category: 'recorder',
    brand: 'hiwatch',
    section: 'video',
    maxResolution: 4
  },
  'hw-n208': {
    id: 'hw-n208',
    title: 'HiWatch DS-N208',
    description: '8-канальный IP-видеорегистратор с PoE',
    channels: 8,  // Добавляем количество каналов
    additional_info: 'Сетевой видеорегистратор HiWatch DS-N208 до 4 мп.',
    specs: [
      '8 IP каналов с PoE IEEE 802.3af',
      'Запись до 4 Мп на канал',
      'Общий входящий поток до 80 Мбит/с',
      'H.265+/H.264 кодирование',
      '1 SATA до 6ТБ',
      'HDMI и VGA выходы'
    ],
    price: 16990,
    image: '/images/products/hw-n208.jpg',
    category: 'recorder',
    brand: 'hiwatch',
    section: 'video',
    maxResolution: 4
  },
  'hw-n216': {
    id: 'hw-n216',
    title: 'HiWatch DS-N216',
    description: '16-канальный IP-видеорегистратор',
    channels: 16,  // Добавляем количество каналов
    additional_info: 'Профессиональный сетевой видеорегистратор HiWatch DS-N216 предназначен для создания масштабных систем видеонаблюдения.',
    specs: [
      '16 IP каналов',
      'Запись до 4 Мп на всех каналах',
      'Входящий поток до 160 Мбит/с',
      'H.265+/H.264 кодирование',
      '2 SATA до 6ТБ каждый',
      'HDMI и VGA выходы 1080p',
      'Двухпотоковое вещание'
    ],
    price: 21990,
    image: '/images/products/hw-n216.jpg',
    category: 'recorder',
    brand: 'hiwatch',
    section: 'video',
    maxResolution: 4
  },
  'kit-hikvision-2mp': {
    id: 'kit-hikvision-2mp',
    title: 'Комплект IP видеонаблюдения Hikvision 2 Мп',
    description: 'Готовый комплект IP видеонаблюдения на 4 камеры с разрешением 2 Мп',
    additional_info: 'Комплект включает в себя 4 IP-камеры 2 Мп, видеорегистратор с поддержкой PoE, жесткий диск и все необходимые аксессуары для быстрого развертывания системы.',
    specs: [
      '4 IP-камеры 2 Мп (1920×1080)',
      'IP-видеорегистратор с 4 PoE портами',
      'Жесткий диск 1 ТБ',
      'Блок питания',
      'Комплект кабелей',
      'Мобильный мониторинг',
      'Простая настройка P2P'
    ],
    price: 29990,
    image: '/images/products/kit-hikvision-2mp.jpg',
    category: 'kit',
    brand: 'hikvision'
  },
  'kit-hikvision-4mp': {
    id: 'kit-hikvision-4mp',
    title: 'Комплект IP видеонаблюдения Hikvision 4 Мп',
    description: 'Готовый комплект IP видеонаблюдения на 4 камеры с разрешением 4 Мп',
    additional_info: 'Профессиональный комплект видеонаблюдения с камерами высокого разрешения, включающий все необходимое для организации системы безопасности.',
    specs: [
      '4 IP-камеры 4 Мп (2688×1520)',
      'IP-видеорегистратор с 4 PoE портами',
      'Жесткий диск 2 ТБ',
      'Блок питания',
      'Комплект кабелей',
      'Мобильный мониторинг',
      'Простая настройка P2P'
    ],
    price: 39990,
    image: '/images/products/kit-hikvision-4mp.jpg',
    category: 'kit',
    brand: 'hikvision'
  },
  'kit-hiwatch-2mp': {
    id: 'kit-hiwatch-2mp',
    title: 'Комплект IP видеонаблюдения HiWatch 2 Мп',
    description: 'Экономичный комплект IP видеонаблюдения на 4 камеры с разрешением 2 Мп',
    additional_info: 'Бюджетное решение для организации системы видеонаблюдения, включающее все необходимые компоненты для быстрого запуска.',
    specs: [
      '4 IP-камеры 2 Мп (1920×1080)',
      'IP-видеорегистратор с 4 PoE портами',
      'Жесткий диск 1 ТБ',
      'Блок питания',
      'Комплект кабелей',
      'Мобильный мониторинг',
      'Простая настройка P2P'
    ],
    price: 24990,
    image: '/images/products/kit-hiwatch-2mp.jpg',
    category: 'kit',
    brand: 'hiwatch'
  },
  'kit-hiwatch-4mp': {
    id: 'kit-hiwatch-4mp',
    title: 'Комплект IP видеонаблюдения HiWatch 4 Мп',
    description: 'Экономичный комплект IP видеонаблюдения на 4 камеры с разрешением 4 Мп',
    additional_info: 'Оптимальное решение для организации системы видеонаблюдения с высоким качеством изображения по доступной цене.',
    specs: [
      '4 IP-камеры 4 Мп (2688×1520)',
      'IP-видеорегистратор с 4 PoE портами',
      'Жесткий диск 2 ТБ',
      'Блок питания',
      'Комплект кабелей',
      'Мобильный мониторинг',
      'Простая настройка P2P'
    ],
    price: 34990,
    image: '/images/products/kit-hiwatch-4mp.jpg',
    category: 'kit',
    brand: 'hiwatch'
  },
  'smart-doorbell': {
    id: 'smart-doorbell',
    title: 'Hikvision DS-HD1',
    description: 'Умный дверной звонок с камерой и двусторонней аудиосвязью',
    additional_info: 'Умный дверной звонок позволяет видеть, слышать и разговаривать с посетителями, даже когда вас нет дома.',
    specs: [
      'Full HD видео 1080p',
      'Двусторонняя аудиосвязь',
      'Ночное видение',
      'Детектор движения',
      'Мобильные уведомления',
      'Подключение по Wi-Fi',
      'Защита от непогоды IP65'
    ],
    price: 12990,
    image: '/images/products/smart-doorbell.jpg',
    category: 'smart-home',
    brand: 'hikvision'
  },
  'smart-lock': {
    id: 'smart-lock',
    title: 'Hikvision DS-K4T108',
    description: 'Умный дверной замок с биометрической аутентификацией',
    additional_info: 'Многофункциональный замок с поддержкой отпечатков пальцев, PIN-кодов, карт доступа и управлением через приложение.',
    specs: [
      'Сканер отпечатков пальцев',
      'Цифровая клавиатура',
      'Считыватель карт Mifare',
      'Управление через приложение',
      'Временные коды доступа',
      'Журнал событий',
      'Аварийное питание'
    ],
    price: 24990,
    image: '/images/products/smart-lock.jpg',
    category: 'smart-home',
    brand: 'hikvision'
  },
  'smart-switch': {
    id: 'smart-switch',
    title: 'Hikvision DS-PM1-O1H',
    description: 'Умная розетка с мониторингом энергопотребления',
    additional_info: 'Позволяет удаленно управлять электроприборами и отслеживать их энергопотребление.',
    specs: [
      'Управление через Wi-Fi',
      'Мониторинг энергопотребления',
      'Расписания включения',
      'Защита от перегрузки',
      'Голосовое управление',
      'Максимальная нагрузка 3500Вт'
    ],
    price: 3990,
    image: '/images/products/smart-switch.jpg',
    category: 'smart-home',
    brand: 'hikvision'
  },
  'smart-hub': {
    id: 'smart-hub',
    title: 'Hikvision DS-PWA96-M-WE',
    description: 'Центр управления умным домом',
    additional_info: 'Центральный хаб для управления всеми устройствами умного дома Hikvision.',
    specs: [
      'Поддержка до 96 устройств',
      'Wi-Fi + Zigbee + RF',
      'Встроенная сирена',
      'Резервное питание',
      'Мобильное приложение',
      'Сценарии автоматизации',
      'Голосовое управление'
    ],
    price: 15990,
    image: '/images/products/smart-hub.jpg',
    category: 'smart-home',
    brand: 'hikvision'
  },
  'smart-sensor': {
    id: 'smart-sensor',
    title: 'Hikvision DS-PD1-MC-WWS',
    description: 'Датчик движения и открытия двери/окна',
    additional_info: 'Беспроводной датчик для охраны помещений и автоматизации умного дома.',
    specs: [
      'Датчик движения PIR',
      'Магнитный контакт',
      'Радиус действия до 12м',
      'Срок службы батареи 2 года',
      'Компактный дизайн',
      'Простая установка'
    ],
    price: 2990,
    image: '/images/products/smart-sensor.jpg',
    category: 'smart-home',
    brand: 'hikvision'
  },
  'DS-3E0310P-E/M': {
    id: 'DS-3E0310P-E/M',
    title: 'DS-3E0310P-E/M',
    description: 'Управляемый POE коммутатор на 10 портов (8 POE 802.3af/at)',
    additional_info: 'Управляемый коммутатор с 8 портами PoE для подключения IP-камер и других PoE-устройств. Общий бюджет мощности PoE составляет 110 Вт, что позволяет подключать до 8 устройств с питанием по сети.',
    specs: [
      '8 портов RJ45 10/100 Мбит/с с PoE (802.3af/at)',
      '2 порта RJ45 10/100/1000 Мбит/с (Uplink)',
      'Бюджет мощности PoE: 110 Вт',
      'Управление через Web-интерфейс',
      'Поддержка VLAN, QoS, SNMP',
      'Защита от грозовых разрядов до 6 кВ',
      'Монтаж в стойку 19"'
    ],
    price: 16990,
    image: '/images/products/DS-3E0310P-E-M.jpg',
    category: 'network',
    brand: 'hikvision',
    section: 'video'
  },
  'DS-3E0106P-E/M': {
    id: 'DS-3E0106P-E/M',
    title: 'DS-3E0106P-E/M',
    description: '4-портовый PoE коммутатор с 2 uplink портами',
    additional_info: 'Компактный PoE коммутатор для небольших систем видеонаблюдения.',
    specs: [
      '4 порта 10/100 Мбит/с с PoE',
      '2 порта 10/100 Мбит/с Uplink',
      'Бюджет PoE 35Вт',
      'Стандарты PoE IEEE 802.3af/at',
      'Extend режим до 250м',
      'Plug and Play',
      'Металлический корпус'
    ],
    price: 5990,
    image: '/images/products/DS-3E0106P-E-M.jpg',
    category: 'network',
    section: 'video',
    brand: 'hikvision'
  },
  'DS-3E1310HP-EI': {
    id: 'DS-3E1310HP-EI',
    title: 'DS-3E1310HP-EI',
    description: '8-портовый управляемый гигабитный PoE+ коммутатор',
    additional_info: 'Поддержка удаленного мониторинга, функция автоматической перезагрузки зависших устройств watch dog',
    specs: [
      '8 портов 10/100/1000 Мбит/с с PoE+',
      '2 SFP порта',
      'Бюджет PoE 150Вт',
      'Управление через Hik-connect',
      'VLAN, QoS, SNMP',
      'Грозозащита 6кВ',
    ],
    price: 14290,
    image: '/images/products/DS-3E1310HP-EI.jpg',
    category: 'network',
    brand: 'hikvision'
  },
  'DS-3T0506HP-E/HS': {
    id: 'DS-3T0506HP-E/HS',
    title: 'DS-3T0506HP-E/HS',
    description: '4-портовый PoE коммутатор повышенной мощности',
    additional_info: 'Неуправляемый, 3 RJ45 1000M PoE с грозозащитой 6кВ; 1 1000M порт поддерживает HiPoE 60Вт,2 1000М SFP порта; бюджет PoE 60Вт; поддержка режима передачи до 300м, таблица MAC адресов на 4000 записей; пропускная способность 22Гб/с; 48-57 VDC, 1.35 A; -30°C...+65°C.',
    specs: [
      '4 порта 10/100 Мбит/с Hi-PoE',
      '2 порта 10/100/1000 Мбит/с Uplink',
      'Бюджет PoE 240Вт',
      'До 60Вт на порт',
      'Extend режим до 300м',
      'Защита IP30',
      'Рабочая температура -40°C до +75°C'
    ],
    price: 15100,
    image: '/images/products/DS-3T0506HP-E-HS.jpg',
    category: 'network',
    brand: 'hikvision'
  },
  'DS-I205M(B)': {
    id: 'DS-I205M(B)',
    title: 'DS-I205M(B) PTZ EXIR',
    description: '2 Мп поворотная уличная IP-камера с микрофоном и EXIR подсветкой до 20м',
    additional_info: 'Всепогодная IP-камера со встроенным микрофоном и оптическим зумом 4х.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Вариофокальный объектив 2.8-12 мм',
      'EXIR-подсветка до 20м',
      'Встроенный микрофон',
      'Цифровой WDR, 3D DNR',
      'Поддержка H.265+/H.265',
      'Защита IP67'
    ],
    price: 15990,
    image: '/images/products/DS-I205M.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 2
  },
  'DS-I215': {
    id: 'DS-I215',
    title: 'DS-I215 PTZ EXIR',
    description: '2 Мп купольная IP-камера с EXIR подсветкой до 100м',
    additional_info: 'Поворотная купольная IP-камера для внутренней и наружной установки. Оптический и цифровой зум, слежение за объектом.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8 мм',
      'Опьтческий зум 15х, цифровой зум 16х',
      'EXIR-подсветка до 100м',
      'Цифровой WDR, 3D DNR',
      'Защита IP67',
      'AcuSense обнаружение Человек/Транспорт'
    ],
    price: 31990,
    image: '/images/products/DS-I215.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 2
  },
  'DS-I256Z': {
    id: 'DS-I256Z',
    title: 'DS-I256Z EXIR',
    description: '2 Мп купольная IP-камера с моторизированным объективом 2.8-12мм и EXIR подсветкой до 50м',
    additional_info: 'Профессиональная купольная IP-камера с моторизированным вариофокальным объективом для удаленной настройки угла обзора. Поддерживает расширенный динамический диапазон WDR 120дБ.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Моторизированный объектив 2.8-12 мм',
      'EXIR-подсветка до 50м',
      'Аппаратный WDR 120дБ, 3D DNR',
      'Поддержка H.265+/H.265',
      'Защита IP67',
      'слот для карты памяти microSC'
    ],
    price: 12990,
    image: '/images/products/DS-I256Z.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 2
  },
  'DS-I650M': {
    id: 'DS-I650M',
    title: 'DS-I650M EXIR',
    description: '6 Мп уличная IP-камера с микрофоном и EXIR подсветкой до 30м',
    additional_info: 'Профессиональная IP-камера высокого разрешения со встроенным микрофоном. Обеспечивает детальное изображение с разрешением 6 Мп.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 6 Мп (3072×2048) @ 20 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8/4 мм',
      'EXIR-подсветка до 30м',
      'Встроенный микрофон',
      'Цифровой WDR, 3D DNR',
      'Поддержка H.265+/H.265',
      'слот для карты памяти micriSD',
      'Защита IP67'
    ],
    price: 14990,
    image: '/images/products/DS-I650M.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video'
  },
  'DS-I652M': {
    id: 'DS-I652M',
    title: 'DS-I652M EXIR',
    description: '6 Мп купольная IP-камера с микрофоном с EXIR подсветкой до 30м',
    additional_info: 'Профессиональная купольная IP-камера с высоким разрешением и встроенным микрофоном. Антивандальное исполнение и поддержка современных кодеков сжатия.',
    specs: [
      'Матрица 1/2.5" Progressive Scan CMOS',
      'Разрешение 6 Мп (3072×2048) @ 20 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8 мм',
      'EXIR-подсветка до 30м',
      'Встроенный микрофон',
      'Цифровой WDR, 3D DNR',
      'Антивандальная защита IK10',
      'Защита IP67'
    ],
    price: 14990,
    image: '/images/products/DS-I652M.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video'
  },
  'DS-I653M': {
    id: 'DS-I653M',
    title: 'DS-I653M EXIR',
    description: '6 Мп уличная IP-камера с микрофоном с EXIR подсветкой до 30м',
    additional_info: 'Профессиональная купольная IP-камера. Обеспечивает высокое качество изображения в любых условиях освещения.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 6 Мп (3072×2048) @ 20 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8/4 мм',
      'EXIR-подсветка до 30м',
      'Встроенный микрофон',
      'Цифровой WDR, 3D DNR',
      'Поддержка H.265+/H.265',
      'Защита IP67'
    ],
    price: 13990,
    image: '/images/products/DS-I653M.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video'
  },
  'DS-N304(B)': {
    id: 'DS-N304(B)',
    title: 'DS-N304(B) 8mp',
    description: '4-канальный IP-видеорегистратор до 8мп',
    channels: 4,  // Добавляем количество каналов
    additional_info: 'Компактный сетевой видеорегистратор с поддержкой камер до 8 Мп. Идеально подходит для небольших систем видеонаблюдения.',
    specs: [
      'Поддержка 4 IP-камер до 8 Мп',
      'Входящая пропускная способность 40 Мбит/с',
      'Кодеки H.265+/H.265/H.264+/H.264',
      '1 SATA интерфейс, до 8 ТБ',
      'Видеовыходы HDMI (до 4K) и VGA',
      'Мобильный мониторинг',
      'Поддержка протокола ONVIF',
      'Компактный корпус'
    ],
    price: 10990,
    image: '/images/products/DS-N304B.jpg',
    category: 'recorder',
    brand: 'hiwatch',
    section: 'video',
    maxResolution: 8
  },
  'DS-N308(B)': {
    id: 'DS-N308(B)',
    title: 'DS-N308(B) 8mp',
    description: '8-канальный IP-видеорегистратор до 8мп',
    channels: 8,  // Добавляем количество каналов
    additional_info: 'Профессиональный сетевой видеорегистратор с поддержкой камер до 8 Мп. Оптимальное решение для средних систем видеонаблюдения.',
    specs: [
      'Поддержка 8 IP-камер до 8 Мп',
      'Входящая пропускная способность 80 Мбит/с',
      'Кодеки H.265+/H.265/H.264+/H.264',
      '2 SATA интерфейс, до 8 ТБ',
      'Видеовыходы HDMI (до 4K) и VGA',
      'Видеоаналитика Человек/Транспорт',
      'Поддержка протокола ONVIF',
      'Управление PTZ-камерами'
    ],
    price: 15990,
    image: '/images/products/DS-N308B.jpg',
    category: 'recorder',
    brand: 'hiwatch',
    section: 'video',
    maxResolution: 8
  },
  'DS-N316/2(B)': {
    id: 'DS-N316/2(B)',
    title: 'DS-N316/2(B) 8mp',
    description: '16-канальный IP-видеорегистратор до 8 Мп',
    channels: 16,  // Добавляем количество каналов
    additional_info: 'Мощный сетевой видеорегистратор с поддержкой до 16 IP-камер высокого разрешения. Два отсека для жестких дисков обеспечивают большой объем архива.',
    specs: [
      'Поддержка 16 IP-камер до 8 Мп',
      'Входящая пропускная способность 160 Мбит/с',
      'Кодеки H.265+/H.265/H.264+/H.264',
      '2 SATA интерфейса, до 8 ТБ',
      'Видеовыходы HDMI (до 4K) и VGA',
      'Видеоналитика Человек/Транспорт',
      'Поддержка протокола ONVIF'
    ],
    price: 16990,
    image: '/images/products/DS-N316-2B.jpg',
    category: 'recorder',
    brand: 'hiwatch',
    section: 'video',
    maxResolution: 8
  },
  'DS-N332/2(B)': {
    id: 'DS-N332/2(B)',
    title: 'DS-N332/2(B) 8mp',
    description: '32-канальный IP-видеорегистратор до 8мп',
    channels: 32,  // Добавляем количество каналов
    additional_info: 'Профессиональный сетевой видеорегистратор корпоративного класса с поддержкой до 32 IP-камер. Идеальное решение для крупных систем видеонаблюдения.',
    specs: [
      'Поддержка 32 IP-камер до 8 Мп',
      'Входящая пропускная способность 256 Мбит/с',
      'Кодеки H.265+/H.265/H.264+/H.264',
      '2 SATA интерфейса, до 10 ТБ',
      'Видеовыходы HDMI (до 4K) и VGA',
      'Поддержка протокола ONVIF',
      'Расширенные функции видеоаналитики'
    ],
    price: 24990,
    image: '/images/products/DS-N332-2B.jpg',
    category: 'recorder',
    brand: 'hiwatch',
    section: 'video',
    maxResolution: 8
  },
  'DS-7104NI-Q1/M': {
    id: 'DS-7104NI-Q1/M',
    title: 'DS-7104NI-Q1/M 4mp',
    description: '4-канальный IP-видеорегистратор до 4мп',
    channels: 4,  // Добавляем количество каналов
    additional_info: 'Компактный сетевой видеорегистратор начального уровня с поддержкой камер до 4 Мп. Оптимальное решение для небольших систем видеонаблюдения.',
    specs: [
      'Поддержка 4 IP-камер до 4 Мп',
      'Входящая пропускная способность 40 Мбит/с',
      'Кодеки H.265+/H.265/H.264+/H.264',
      '1 SATA интерфейс, до 10 ТБ',
      'Видеовыходы HDMI (1080p) и VGA',
      'Мобильный мониторинг',
      'Поддержка протокола ONVIF'
    ],
    price: 6990,
    image: '/images/products/DS-7104NI-Q1-M.jpg',
    category: 'recorder',
    brand: 'hikvision',
    section: 'video',
    maxResolution: 4
  },
  'DS-2CD2123G0E-I': {
    id: 'DS-2CD2123G0E-I',
    title: 'DS-2CD2123G0E-I EXIR',
    description: '2 Мп купольная IP-камера с EXIR-подсветкой до 30м',
    additional_info: 'Профессиональная антиандальная купольная камера с технологией EXIR 2.0 для качественного видеонаблюдения в любых условиях освещения.',
    specs: [
      'Матрица 1/2.7" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 30 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8/4 мм',
      'EXIR-подсветка до 30м',
      'Аппаратный WDR 120дБ',
      'Поддержка H.265+/H.265',
      'Защита IP67',
      'Рабочая температура -30°C...+60°C'
    ],
    price: 9990,
    image: '/images/products/DS-2CD2123G0E-I.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video'
  },
  'DS-2DE1A400IW-DE3': {
    id: 'DS-2DE1A400IW-DE3',
    title: 'DS-2DE1A400IW-DE3 PTZ EXIR',
    description: '4 Мп поворотная IP-камера c EXIR подсветкой до 15м',
    additional_info: 'Компактная поворотная IP-камера с 16-кратным цифровым зумом. Идеальное решение для динамического видеонаблюдения в помещении.',
    specs: [
      'Матрица 1/3" Progressive Scan CMOS',
      'Разрешение 4 Мп (2560×1440) @ 30 к/с',
      'Чувствительность: 0.01 лк @ (F1.6, AGC вкл)',
      'ИК-подсветка до 15м',
      'Поворот 0°-355°, наклон -5°-90°',
      'Цифровой WDR, 3D DNR',
      'Поддержка H.265+/H.265'
    ],
    price: 14490,
    image: '/images/products/DS-2DE1A400IW-DE3.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video'
  },
  'DS-2CD6365G0E-IS': {
    id: 'DS-2CD6365G0E-IS',
    title: 'DS-2CD6365G0E-IS(B) EXIR',
    description: '6 Мп панорамная fish eye IP-камера с обзором 360°',
    additional_info: 'Профессиональная панорамная камера с разрешением 6 Мп обеспечивает полный обзор 360° без слепых зон. Идеально подходит для наблюдения за большими открытыми пространствами.',
    specs: [
      'Матрица 1/1.8" Progressive Scan CMOS',
      'Разрешение 6 Мп (3072×2048) @ 30 к/с',
      'Панорамный обзор 360°',
      'Чувствительность: 0.01 лк @ (F2.0, AGC вкл)',
      'Встроенный микрофон',
      'Аппаратный WDR 120дБ',
      'Поддержка H.265+/H.265',
      'Защита IP66, IK10',
      'Встроенная видеоаналитика'
    ],
    price: 59990,
    image: '/images/products/DS-2CD6365G0E-IS.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video'
  },
  'DS-2CD3065FWD-I': {
    id: 'DS-2CD3065FWD-I',
    title: 'DS-2CD3065FWD-I',
    description: '6 Мп цилиндрическая IP-камера с EXIR подсветкой до 30м',
    additional_info: 'Профессиональная сетевая камера с высоким разрешением 6 Мп для детального видеонаблюдения на больших территориях.',
    specs: [
      'Матрица 1/2.4" Progressive Scan CMOS',
      'Разрешение 6 Мп (3072×2048) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'ИК-подсветка до 30м',
      'Аппаратный WDR 120дБ',
      'Поддержка H.265+/H.265',
      'Защита IP67',
      'Расширенная SMART видеоаналитика'
    ],
    price: 17990,
    image: '/images/products/DS-2CD3065FWD-I.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video'
  },
  'DS-2CD2T63G0-I8': {
    id: 'DS-2CD2T63G0-I8',
    title: 'DS-2CD2T63G0-I8',
    description: '6 Мп цилиндрическая IP-камера с EXIR-подсветкой до 80м',
    additional_info: 'Всепогодная IP-камера с мощной EXIR-подсветкой до 80м. Идеально подходит для периметрального видеонаблюдения.',
    specs: [
      'Матрица 1/2.9" Progressive Scan CMOS',
      'Разрешение 6 Мп (3072×2048) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.4, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 4/6 мм',
      'EXIR-подсветка до 80м',
      'Аппаратный WDR 120дБ',
      'Поддержка H.265+/H.265',
      'Защита IP67',
      'Рабочая температура -40°C...+60°C'
    ],
    price: 16990,
    image: '/images/products/DS-2CD2T63G0-I8.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video'
  },
  'DS-2CD2T22WD-I8': {
    id: 'DS-2CD2T22WD-I8',
    title: 'DS-2CD2T22WD-I8',
    description: '2 Мп цилиндрическая IP-камера с EXIR-подсветкой до 80м',
    additional_info: 'Профессиональная всепогодная камера с технологией WDR 120дБ и мощной EXIR-подсветкой для круглосуточного видеонаблюдения.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 2 Мп (1920×1080) @ 25 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 4/6/12/16 мм',
      'EXIR-подсветка до 80м',
      'Аппаратный WDR 120дБ',
      'Поддержка H.265+/H.265',
      'Защита IP67',
      'Рабочая температура -40°C...+60°C'
    ],
    price: 13490,
    image: '/images/products/DS-2CD2T22WD-I8.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video'
  },
  'IPC-B582-G2': {
    id: 'IPC-B582-G2',
    title: 'HiWatch IPC-B582-G2/4I',
    description: '8 Мп цилиндрическая IP-камера с EXIR-подсветкой до 80м',
    additional_info: 'Профессиональная IP-камера с высоким разрешением 4K и мощной ИК-подсветкой для детального видеонаблюдения.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 8 Мп (3840×2160) @ 20 к/с',
      'Чувствительность: 0.01 лк @ (F1.6, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 4 мм',
      'ИК-подсветка до 80м',
      'Цифровой WDR, 3D DNR',
      'Поддержка H.265+/H.265',
      'Защита IP67',
      'Поддержка PoE (802.3af)'
    ],
    price: 17290,
    image: '/images/products/IPC-B582-G2.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 8
  },
  'IPC-D082-G2': {
    id: 'IPC-D082-G2',
    title: 'HiWatch IPC-D082-G2/U',
    description: '8 Мп купольная IP-камера с микрофоном и EXIR подсветкой',
    additional_info: 'Антивандальная купольная IP-камера с разрешением 4K для систем видеонаблюдения с повышенными требованиями к детализации изображения.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 8 Мп (3840×2160) @ 20 к/с',
      'Чувствительность: 0.01 лк @ (F1.6, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8 мм',
      'ИК-подсветка до 30м',
      'Цифровой WDR, 3D DNR',
      'Поддержка H.265+/H.265',
      'Защита IP67, IK10',
      'Встроенный микрофон'
    ],
    price: 16420,
    image: '/images/products/IPC-D082-G2.jpg',
    category: 'camera',
    brand: 'hiwatch',
    section: 'video',
    resolution: 8
  },
  'DS-PD2-T10P-WE': {
    id: 'DS-PD2-T10P-WE',
    title: 'DS-PD2-T10P-WE',
    description: 'ИК+СВЧ датчик беспроводной уличный, защита от животных',
    additional_info: 'Датчик использует пассивную инфракрасную технологию для обнаружения движения, имеет встроенную защиту от домашних животных до 10 кг.',
    specs: [
      'Дальность обнаружения до 800м',
      'Угол обзора 85°',
      'Защита от животных до 10 кг',
      'Беспроводное подключение',
      'Батарея CR123A, до 2 лет работы',
      'Дальность связи до 800м',
      'Рабочая температура -10°C до +55°C',
      'Размеры: 180 × 80 × 105 мм'
    ],
    price: 13690,
    image: '/images/products/DS-PD2-T10P-WE.jpg',
    category: 'sensors',
    section: 'smart-home', // Добавляем поле section
    brand: 'hikvision'
  },
  'DS-PDPC12P-EG2-WE': {
    id: 'DS-PDPC12P-EG2-WE',
    title: 'DS-PDPC12P-EG2-WE',
    description: 'ИК-Датчик беспроводной с камерой',
    additional_info: 'Извещатель охранный оптико-электронный радиоканальный с камерой; CMOS, "День/Ночь"',
    specs: [
      'Дальность обнаружения: 12 м / 85.9',
      'Фильтрация срабатываний на домашних животных до 30 кг',
      'Беспроводное подключение',
      'До 2 лет работы от батареи',
      'JPEG, 160х120, 320х240, 640х48',
      'Большая емкость встроенной памяти для хранения изображений',
      'Дальность связи до 800м',
      'Индикатор низкого заряда батареи',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 7300,
    image: '/images/products/DS-PDPC12P-EG2-WE.jpg',
    category: 'sensors',
    section: 'smart-home', // Добавляем поле section
    brand: 'hikvision'
  },
  'DS-PK1-E-WE': {
    id: 'DS-PK1-E-WE',
    title: 'DS-PK1-E-WE',
    description: 'Беспроводная клавиатура управления',
    additional_info: 'DS-PK1-E-WE является клавиатурой охранной панели, которая может быть подключена к AX PRO для контроля и управления тревожными событиями. Поддерживается извещение о тревоге при помощи индикатора и бипера.',
    specs: [
      'Тампер защита',
      'Дальность радиочастотной передачи	1200 м (открытая область)',
      'Четыре батареи АА Срок службы батареи	В режиме ожидания более 2 лет',
      'До 17 часов работы от батареи',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 6000,
    image: '/images/products/DS-PK1-E-WE.jpg',
    category: 'control-panels',
    section: 'smart-home', // Добавляем поле section
    brand: 'hikvision'
  },
  'DS-PWA32-HSR': {
    id: 'DS-PWA32-HSR',
    title: 'DS-PWA32-HSR',
    description: 'Беспроводная панель управления AX PRO',
    additional_info: 'Центральная панель управления и хаб системы умного дома и безопасности Hikvision AX PRO. Поддерживает до 32 устройств, беспроводные датчики, сирены, клавиатуры и брелоки. Подключение через Wi-Fi, LAN или 3G/4G.',
    specs: [
      'До 32 беспроводных датчиков',
      'До 8 брелоков',
      'До 4 беспроводных реле',
      '2 беспроводных сирены',
      'Подключение Wi-Fi/LAN/3G/4G-LTE',
      'Автономная работа до 12 часов',
      'Дальность радиоканала до 800 м',
      'Поддержка Hik-Connect',
      'Считыватель карт Mifare',
      'Поддержка до 2х каналов видео'
    ],
    price: 22900,
    image: '/images/products/DS-PWA32-HSR.jpg',
    category: 'control-panels',
    section: 'smart-home', // Добавляем поле section
    brand: 'hikvision'
  },
  'DS-PSP1-WE': {
    id: 'DS-PSP1-WE',
    title: 'DS-PSP1-WE',
    description: 'Беспроводная умная розетка',
    additional_info: 'Интеллектуальная розетка позволяет удаленно управлять электроприборами, отслеживать энергопотребление и автоматизировать работу устройств по расписанию или сценариям.',
    specs: [
      'Максимальная мощность 3000Вт',
      'Защита от перегрузки',
      'Измерение энергопотребления',
      'Интеграция с Hik-Connect',
      'Беспроводное подключение',
      'Поддержка автоматизации и сценариев',
      'Защита по стандарту IP44',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 3190,
    image: '/images/products/DS-PSP1-WE.jpg',
    category: 'smart-sockets',
    section: 'smart-home', // Добавляем поле section
    brand: 'hikvision'
  },
  'DS-PS1-E-WE': {
    id: 'DS-PS1-E-WE',
    title: 'DS-PS1-E-WE',
    description: 'Оповещатель светозвуковой радиоканальный для внешней и внутренней установки',
    additional_info: 'Беспроводная сирена для использования снаружи и внутри помещений с громкостью до 110 дБ. Оповещает о срабатывании датчиков, попытке взлома и других событиях безопасности.',
    specs: [
      'Громкость до 110 дБ',
      'Беспроводное подключение',
      'Питание DC 12В/1A',
      'Резервная батарея до 12 часов',
      'Различные звуковые сигналы',
      'Стробоскоп Красный/Синий',
      'Дальность связи до 800м',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 7290,
    image: '/images/products/DS-PS1-E-WE.jpg',
    category: 'control-panels',
    section: 'smart-home', // Добавляем поле section
    brand: 'hikvision'
  },
  'DS-PKF1-WE': {
    id: 'DS-PKF1-WE',
    title: 'DS-PKF1-WE',
    description: 'Беспроводной брелок управления',
    additional_info: 'Компактный брелок для быстрого управления системой безопасности. Позволяет ставить и снимать систему с охраны, активировать тревогу и управлять сценариями.',
    specs: [
      '4 программируемые кнопки',
      'Индикация статуса операций',
      'Компактный размер',
      'Дальность связи до 900м',
      'Защита от случайного нажатия',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 2000,
    image: '/images/products/DS-PKF1-WE.jpg',
    category: 'control-panels',
    section: 'smart-home', // Добавляем поле section
    brand: 'hikvision'
  },
  'DS-PM1-O1L-WE': {
    id: 'DS-PM1-O1L-WE',
    title: 'DS-PM1-O1L-WE',
    description: 'Блок релейный',
    additional_info: 'Реле дистанционного управления радиоканальное (AX PRO).',
    specs: [
      '1 вход, 1 выход (НЗ/НР)',
      'U-коммут.36 В, I-коммут.5 А',
      'Компактный размер',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 2790,
    image: '/images/products/DS-PM1-O1L-WE.jpg',
    category: 'sensors',
    section: 'smart-home', // Добавляем поле section
    brand: 'hikvision'
  },
  'DS-PWA96-KIT-WE': {
    id: 'DS-PWA96-KIT-WE',
    title: 'AX PRO DS-PWA96-KIT-WE',
    description: 'Комплект беспроводной охранной системы (панель управления, датчик движения, датчик открытия двери, брелок)',
    additional_info: 'Полноценная комплексная система безопасности для дома или небольшого офиса. Простая установка, надежная беспроводная связь, управление через мобильное приложение Hik-Connect.',
    specs: [
      'Контрольная панель DS-PWA96-M-WE',
      'Датчик движения DS-PD2-P10P-W',
      'Датчик открытия DS-PD1-MC-WWS',
      'Брелок управления DS-PKF1-WE',
      'До 96 беспроводных зон',
      'Поддержка Wi-Fi/LAN/4G'
    ],
    price: 22100,
    image: '/images/products/DS-PWA96-KIT-WE.jpg',
    category: 'kits',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PWA64-KIT': {
    id: 'DS-PWA64-KIT',
    title: 'AX PRO DS-PWA64-KIT',
    description: 'Комплект беспроводной охранной системы AX PRO (контрольная панель, датчик движения, датчик открытия, брелок)',
    additional_info: 'Базовый комплект беспроводной системы охраны AX PRO для защиты небольших помещений. Простая установка без прокладки проводов, управление через приложение Hik-Connect с мобильного телефона.',
    specs: [
      'Контрольная панель DS-PWA64-L-WE',
      'ИК-датчик движения DS-PD2-P10P-W',
      'Магнитоконтактный извещатель DS-PD1-MC-WWS',
      'Брелок DS-PKFM-W',
      'До 64 беспроводных зон',
      'Поддержка Wi-Fi/LAN',
      'Работа от встроенного аккумулятора до 12 часов',
      'Радиус действия до 1600м на открытом пространстве'
    ],
    price: 19200,
    image: '/images/products/DS-PWA64-KIT.jpg',
    category: 'kits',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PD1-MC-WWS': {
    id: 'DS-PD1-MC-WWS',
    title: 'DS-PD1-MC-WWS',
    description: 'Беспроводной датчик открытия двери/окна',
    additional_info: 'Компактный магнитоконтактный датчик для контроля открытия дверей и окон. Отличается сверхнизким энергопотреблением и минималистичным дизайном.',
    specs: [
      'Беспроводное подключение',
      'Расстояние срабатывания до 10 мм',
      'Батарея CR2032, до 5 лет работы',
      'Дальность связи до 800м',
      'Индикация низкого заряда',
      'Защита от вскрытия',
      'Компактный размер',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 390,
    image: '/images/products/DS-PD1-MC-WWS.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDC10AM-EG2-WE': {
    id: 'DS-PDC10AM-EG2-WE',
    title: 'DS-PDC10AM-EG2-WE',
    description: 'ИК-датчик беспроводной уличный типа "Штора", защита от животных (AX PRO)',
    additional_info: 'Тонкая конструкция извещателя обеспечивает скрытую установку в оконных рамах.',
    specs: [
      'Тонкая конструкция типа "Штора"',
      'Дальность обнаружения до 10м',
      'Защита от животных',
      'Беспроводное подключение',
      'Дальность связи до 1600м',
      'Соответствует стандарту IP65 для установки снаружи помещений',
      'Размеры: 134×40×29мм',
      'Рабочая температура -30°C до +55°C'
    ],
    price: 6790, 
    image: '/images/products/DS-PDC10AM-EG2-WE.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDSMK-S-WE': {
    id: 'DS-PDSMK-S-WE',
    title: 'DS-PDSMK-S-WE',
    description: 'Беспроводной фотоэлектрический датчик дыма (AX PRO)',
    additional_info: 'Датчик является беспроводным фотоэлектрическим детектором дыма, который обнаруживает дым с помощью технологии фотоэлектрического рассеяния.',
    specs: [
      'Фотоэлектрический принцип обнаружения дыма',
      'Встроенная сирена 85 дБ',
      'Кнопка тестирования',
      'Индикатор тревоги',
      'Беспроводное подключение до 800м',
      'Срок службы батареи до 3 лет',
      'Размеры: Ø102 × 35 мм',
      'Совместимость с AX PRO'
    ],
    price: 4290, 
    image: '/images/products/DS-PDSMK-S-WE.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDWL-E-WE': {
    id: 'DS-PDWL-E-WE',
    title: 'DS-PDWL-E-WE',
    description: 'Беспроводной датчик протечки воды (AX PRO)',
    additional_info: 'Датчик является беспроводным детектором протечки воды, который обнаруживает утечку воды и немедленно отправляет сигнал тревоги на контрольную панель.',
    specs: [
      'Быстрое обнаружение утечки воды',
      'Оповещение в реальном времени',
      'Дальность связи до 800м',
      'Срок службы батареи до 3 лет',
      'Простая установка и настройка',
      'Защита от пыли и влаги',
      'Размеры: 62.4×62.4×14.6 мм',
      'Совместимость с AX PRO'
    ],
    price: 3290, 
    image: '/images/products/DS-PDWL-E-WE.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDD12P-EG2-WE': {
    id: 'DS-PDD12P-EG2-WE',
    title: 'DS-PDD12P-EG2-WE',
    description: 'ИК+СВЧ датчик беспроводной, защита от животных (AX PRO)',
    additional_info: '3D-оптика, включая поддержку защиты нижних уровней, SEC, двойная технология ИК + микроволны для снижения ложных тревог.',
    specs: [
      'Дальность обнаружения до 12м',
      'Угол обнаружения 85.9°',
      'Защита от животных до 30 кг',
      'Комбинированная технология ИК+СВЧ',
      'Срок службы батареи до 5 лет',
      'Дальность связи до 1600м',
      'Адаптивная защита от ложных тревог',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 5690, 
    image: '/images/products/DS-PDD12P-EG2-WE.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDEBP1-EG2-WE': {
    id: 'DS-PDEBP1-EG2-WE',
    title: 'DS-PDEBP1-EG2-WE',
    description: 'Беспроводная портативная тревожная кнопка (AX PRO)',
    additional_info: 'Кнопка экстренного вызова является беспроводной тревожной кнопкой, которая может использоваться для отправки экстренного сигнала в неотложных ситуациях.',
    specs: [
      'Портативный дизайн с возможностью ношения',
      'Дальность связи до 800м',
      'Защита от случайного нажатия',
      'Срок службы батареи до 3 лет',
      'Многоцветный светодиодный индикатор',
      'Степень защиты IP64',
      'Вес всего 12.3г',
      'Размеры: 41.5 × 30.5 × 11.5 мм'
    ],
    price: 2240, 
    image: '/images/products/DS-PDEBP1-EG2-WE.jpg',
    category: 'control-panels',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PR1-WE': {
    id: 'DS-PR1-WE',
    title: 'DS-PR1-WE',
    description: 'Ретранслятор беспроводной (AX PRO)',
    additional_info: 'Ретранслятор является беспроводным усилителем сигнала с поддержкой беспроводной защищенной связи Tri-X и Cam-x для расширения системы.',
    specs: [
      'Увеличение радиуса действия беспроводных устройств',
      'Поддержка до 32 беспроводных устройств',
      'Поддержка каскадирования до 4 уровней',
      'Двусторонняя шифрованная связь по технологии Tri-X и Cam-x',
      'Рабочая частота 868 МГц',
      'Дальность связи до 1600м',
      'Интеграция в экосистему AX PRO',
      'Индикация состояния питания и работы'
    ],
    price: 6990, 
    image: '/images/products/DS-PR1-WE.jpg',
    category: 'control-panels',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDPG12P-EG2-WE': {
    id: 'DS-PDPG12P-EG2-WE',
    title: 'DS-PDPG12P-EG2-WE',
    description: 'Беспроводной ИК-датчик движения с детекцией разбития стекла (AX PRO)',
    additional_info: 'PIR-датчик с детекцией разбития стекла является беспроводным сдвоенным датчиком, который объединяет функции обнаружения движения и разбития стекла.',
    specs: [
      'Два детектора в одном устройстве',
      'Дальность обнаружения PIR до 12м',
      'Угол обнаружения 85.9°',
      'Дальность обнаружения разбития стекла до 8м',
      'Защита от животных до 30 кг',
      'Срок службы батареи до 4 лет',
      'Дальность связи до 1200м',
      'Рабочая температура -10°C до +55°C'
    ],
    price: 6230, 
    image: '/images/products/DS-PDPG12P-EG2-WE.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDTPH-E-WE': {
    id: 'DS-PDTPH-E-WE',
    title: 'DS-PDTPH-E-WE',
    description: 'Датчик температуры и влажности беспроводной (AX PRO)',
    additional_info: 'Датчик оснащен большим дисплеем и модульной конструкцией для многофункционального расширения. Он может отображать и передавать информацию о температуре и влажности.',
    specs: [
      'Диапазон измерения температуры: -10°C до +55°C, -35°C до +99°C с зондом',
      'Точность измерения температуры: ±0.5°C',
      'Диапазон измерения влажности: 0-99% RH',
      'Точность измерения влажности: ±3%',
      'Большой ЖК-дисплей с подсветкой', 
      'Беспроводное подключение до 800м',
      'Размер 62×62×18мм',
      'Срок службы батареи до 2 лет'
    ],
    price: 3790, 
    image: '/images/products/DS-PDTPH-E-WE.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PT-M1': {
    id: 'DS-PT-M1',
    title: 'DS-PT-M1',
    description: 'Mifare карта (брелок) для постановки/снятия на охрану',
    additional_info: 'Бесконтактная карта стандарта Mifare для использования со считывателями системы безопасности AX PRO. Позволяет быстро ставить и снимать систему с охраны без ввода кода.',
    specs: [
      'Стандарт Mifare 13.56 МГц',
      'Радиус считывания до 50 мм',
      'Не требует батареи',
      'Простая регистрация в системе',
      'Устойчивость к повреждениям',
      'Компактный размер для ношения на связке ключей',
      'Возможность назначить разные права пользователям',
      'Совместимость со считывателями AX PRO'
    ],
    price: 290,
    image: '/images/products/DS-PT-M1.jpg',
    category: 'control-panels',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDBG8-EG2': {
    id: 'DS-PDBG8-EG2',
    title: 'DS-PDBG8-EG2',
    description: 'Беспроводной детектор разбития стекла (AX PRO)',
    additional_info: 'Анализирует звуковые волны, создаваемые при разбитии стекла, для определения двух последовательных низко- и высокочастотных звуковых паттернов, возникающих при разбитии стекла.',
    specs: [
      'Дальность обнаружения до 8 м',
      'Технология идентификации звуковых паттернов',
      'Двухэтапное обнаружение для минимизации ложных тревог',
      'Беспроводное соединение на расстоянии до 1600 м',
      'Срок службы батареи до 5 лет',
      'Размеры: 87.3 × 61.15 × 21.5 мм',
      'Простой монтаж и настройка',
      'Защита от несанкционированного вскрытия'
    ],
    price: 1590, 
    image: '/images/products/DS-PDBG8-EG2.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PDCL12-EG2': {
    id: 'DS-PDCL12-EG2',
    title: 'DS-PDCL12-EG2',
    description: 'Беспроводной ИК-датчик потолочный, защита от животных (AX PRO)',
    additional_info: 'Датчик движения с широким углом обзора, устанавливаемый на потолок. Обеспечивает надежное обнаружение движения в помещении и имеет функцию защиты от домашних животных.',
    specs: [
      'Угол обнаружения: 360°',
      'Дальность обнаружения: до 12 м (диаметр)',
      'Защита от животных до 20 кг',
      'Беспроводное соединение до 1600 м',
      'Срок службы батареи до 5 лет',
      'Простой монтаж на потолок',
      'Высота установки: 2.4-4 м',
      'Рабочая температура: -10°C до +55°C'
    ],
    price: 2390, 
    image: '/images/products/DS-PDCL12-EG2.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PS1-R': {
    id: 'DS-PS1-R',
    title: 'DS-PS1-R',
    description: 'Оповещатель свето-звуковой проводной уличный',
    additional_info: 'Проводная сирена для оповещения о тревоге с комбинированной световой и звуковой индикацией. Используется для установки снаружи помещения благодаря высокой степени защиты от пыли и влаги.',
    specs: [
      'Громкость сирены: до 110 дБ',
      'Стробоскоп с красным или синим свечением',
      'Питание: 9-16В постоянного тока',
      'Потребление тока: до 300 мА',
      'Корпус из поликарбоната',
      'Срок службы до 5 лет',
      'Защита от несанкционированного вскрытия',
      'Степень защиты IP65 для уличного использования',
      'Рабочая температура: -20°C до +60°C'
    ],
    price: 2390,
    image: '/images/products/DS-PS1-R.jpg',
    category: 'sensors',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PT1-WE': {
    id: 'DS-PT1-WE',
    title: 'DS-PT1-WE',
    description: 'Считыватель радиоканальный RFID (AX PRO)',
    additional_info: 'Беспроводной считыватель карт и брелоков для системы AX PRO. Используется для постановки и снятия с охраны посредством бесконтактных карт Mifare.',
    specs: [
      'Рабочая частота: 13.56 МГц (Mifare)',
      'Радиус действия считывания: до 50 мм',
      'Беспроводное соединение до 800 м',
      'Светодиодная и звуковая индикация статуса',
      'Тамперная защита от вскрытия',
      'Срок службы батареи до 3 лет',
      'Размеры: 75×124×21 мм',
      'Рабочая температура: -10°C до +55°C'
    ],
    price: 4190, 
    image: '/images/products/DS-PT1-WE.jpg',
    category: 'control-panels',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PWA64-L-WE': {
    id: 'DS-PWA64-L-WE',
    title: 'DS-PWA64-L-WE',
    description: 'Беспроводная контрольная панель на 64 зоны (AX PRO)',
    additional_info: 'Беспроводная контрольная панель AX PRO с поддержкой до 64 беспроводных зон. Обеспечивает надежную работу системы безопасности и подключение различных датчиков и устройств.',
    specs: [
      'Поддержка до 64 беспроводных устройств',
      'До 32 беспроводных датчиков',
      'До 8 беспроводных клавиатур и считывателей',
      'До 8 беспроводных сирен',
      'До 16 брелоков',
      'Поддержка TCP/IP и Wi-Fi',
      'Опциональная поддержка 3G/4G',
      'Двусторонняя аудиосвязь',
      'Встроенная сирена 85 дБ',
      'Дальность радиоканало до 2000 м'
    ],
    price: 14040, 
    image: '/images/products/DS-PWA64-L-WE.jpg',
    category: 'control-panels',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-PTS-MF': {
    id: 'DS-PTS-MF',
    title: 'DS-PTS-MF',
    description: 'Беспроводная карта AX PRO DS-PTS-MF',
    additional_info: 'Карта Mifare для постановки/снятия на охрану.',
    specs: [
      'дальность до 50мм',
      'защита от повреждения',
      'размер 40×20×5мм'
    ],
    price: 300, 
    image: '/images/products/DS-PTS-MF.jpg',
    category: 'control-panels',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'DS-KIS603-P': {
    id: 'DS-KIS603-P',
    title: 'DS-KIS603-P(C)',
    description: 'Комплект IP-видеодомофона (монитор + вызывная панель)',
    additional_info: 'Комплект IP-видеодомофона Hikvision включает в себя 7-дюймовый монитор с сенсорным экраном и металлическую вызывную панель. Поддерживает удаленное управление через мобильное приложение Hik-Connect.',
    specs: [
      'Монитор: 7" сенсорный дисплей 1024×600',
      'Металлическая вызывная панель с камерой 2 Мп',
      'Широкий угол обзора: 180° по горизонтали',
      'ИК-подсветка до 3м для ночного видения',
      'Поддержка карт Mifare для разблокировки',
      'Поддержка открытия двери со смартфона',
      'Подключение к сети по Wi-Fi/LAN',
      'Запись фото/видео при вызове',
      'Интеграция с системами умного дома'
    ],
    price: 23190,
    image: '/images/products/DS-KIS603-P.jpg',
    category: 'kits',
    section: 'smart-home',
    brand: 'hikvision'
  },
  'ds-2cd2143g2': {
    id: 'ds-2cd2143g2',
    title: 'DS-2CD2143G2-I EXIR',
    description: '4 Мп уличная цилиндрическая IP-камера с EXIR-подсветкой',
    additional_info: 'Профессиональная IP-камера с технологией EXIR 2.0 для качественного видеонаблюдения в любых условиях. Благодаря встроенному алгоритму глубокого обучения камера точно классифицирует объекты (человек/транспорт) и снижает количество ложных тревог.',
    specs: [
      'Матрица 1/2.8" Progressive Scan CMOS',
      'Разрешение 4 Мп (2688×1520) @ 30 к/с',
      'Чувствительность: 0.01 лк @ (F1.2, AGC вкл), 0 лк с ИК',
      'Фиксированный объектив 2.8/4/6 мм',
      'EXIR-подсветка до 80м',
      'Аппаратный WDR 120дБ, 3D DNR',
      'Встроенный обогреватель',
      'Защита IP67, IK10',
      'Рабочая температура -40°C до +60°C'
    ],
    price: 15990,
    image: '/images/products/ds-2cd2143g2.jpg',
    category: 'camera',
    brand: 'hikvision',
    section: 'video',
    resolution: 4
  }
} 

// Добавить функцию для определения разрешения из описания и спецификаций
function determineResolution(product: Product): number {
  // Если resolution уже задан, возвращаем его
  if (product.resolution) {
    return product.resolution;
  }
  
  // Массив для проверки - описание и спецификации
  const textsToCheck = [
    product.description,
    product.additional_info,
    ...(product.specs || [])
  ].filter(Boolean);
  
  // Объединяем все тексты для поиска
  const allText = textsToCheck.join(' ');
  
  // Ищем упоминания разрешения
  if (allText.match(/\b8\s*[мМ][пП]\b/) || allText.match(/\b4[kK]\b/) || allText.match(/3840\s*[×x]\s*2160/)) {
    return 8;
  } else if (allText.match(/\b6\s*[мМ][пП]\b/) || allText.match(/3072\s*[×x]\s*2048/)) {
    return 6;
  } else if (allText.match(/\b5\s*[мМ][пП]\b/) || allText.match(/2560\s*[×x]\s*1920/)) {
    return 5;
  } else if (allText.match(/\b4\s*[мМ][пП]\b/) || allText.match(/2688\s*[×x]\s*1520/) || allText.match(/2560\s*[×x]\s*1440/)) {
    return 4;
  } else if (allText.match(/\b2\s*[мМ][пП]\b/) || allText.match(/1920\s*[×x]\s*1080/) || allText.match(/\bHD\b/i)) {
    return 2;
  }
  
  // Если не удалось определить, по умолчанию ставим 2MP как наиболее распространенное
  return 2;
}

// Применяем функцию ко всем камерам и устанавливаем параметр resolution
Object.values(productsDB).forEach(product => {
  if (product.category === 'camera' && !product.resolution) {
    product.resolution = determineResolution(product);
    console.log(`[INFO] Установлено разрешение ${product.resolution} для камеры ${product.title}`);
  }
});

// Функция для глубокой проверки данных каталога
export function checkCatalogData() {
  // Проверяем общую структуру каталога
  console.log('[DEBUG] Каталог: общее количество товаров:', Object.keys(productsDB).length);
  
  // Подсчитываем количество товаров по секциям
  const sections: Record<string, number> = {};
  const categories: Record<string, number> = {};
  const sectionsAndCategories: Record<string, number> = {};
  
  Object.values(productsDB).forEach(product => {
    // Проверка секций
    const section = product.section || 'undefined';
    sections[section] = (sections[section] || 0) + 1;
    
    // Проверка категорий
    const category = product.category || 'undefined';
    categories[category] = (categories[category] || 0) + 1;
    
    // Проверка соотношения секций и категорий
    const key = `${section}:${category}`;
    sectionsAndCategories[key] = (sectionsAndCategories[key] || 0) + 1;
  });
  
  console.log('[DEBUG] Каталог: распределение товаров по секциям:', sections);
  console.log('[DEBUG] Каталог: распределение товаров по категориям:', categories);
  console.log('[DEBUG] Каталог: распределение по секциям и категориям:', sectionsAndCategories);
  
  // Проверяем товары из секции smart-home
  const smartHomeProducts = Object.entries(productsDB)
    .filter(([_, product]) => product.section === 'smart-home')
    .slice(0, 5);
    
  console.log('[DEBUG] Каталог: примеры товаров из секции smart-home:');
  smartHomeProducts.forEach(([id, product]) => {
    console.log(`- ${id}: ${product.title}, секция: ${product.section}, категория: ${product.category}`);
  });
}

// Вызываем функцию при импорте модуля
checkCatalogData();

// Должна быть экспортирована функция getCatalogProducts
export function getCatalogProducts() {
  return Object.values(productsDB); // Возвращает массив продуктов
}

// Экспортируем переменную для доступа по ключам, если это необходимо
export const catalogData = productsDB;

// Проверяем, что resolution задан для всех камер
console.log('[DEBUG] Проверка наличия параметра resolution для камер:');
Object.values(productsDB).forEach(product => {
  if (product.category === 'camera' && !product.resolution) {
    console.warn(`[WARN] У камеры ${product.title} не задан параметр resolution`);
  }
});