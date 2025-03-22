// Тестовые данные для мобильного каталога
export const products = [
  {
    id: 'cam1',
    title: 'IP Камера ColorVu DS-2CD2087G2-LU',
    brand: 'HikVision',
    description: 'Цветное изображение 24/7, встроенный микрофон, 8Мп',
    specs: [
      'Матрица: 1/1.8" Progressive Scan CMOS',
      'Разрешение: 8MP (3840×2160)',
      'Чувствительность: 0.0005 лк@F1.0 (цвет)',
      'Объектив: 2.8мм/4мм/6мм, F1.0',
      'ИК-подсветка: нет (ColorVu)',
      'WDR 130dB, BLC, 3D DNR'
    ],
    images: [
      'https://via.placeholder.com/400x300/FF5722/FFFFFF?text=ColorVu+DS-2CD2087G2',
      'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=ColorVu+Вид+Сзади'
    ],
    additional_info: 'Технология ColorVu обеспечивает цветное изображение даже в полной темноте без ИК-подсветки. Идеально подходит для мест с низкой освещенностью.'
  },
  {
    id: 'cam2',
    title: 'IP Камера AcuSense DS-2CD2386G2-ISU/SL',
    brand: 'HikVision',
    description: 'Интеллектуальное распознавание людей и транспорта, 8Мп',
    specs: [
      'Матрица: 1/2.7" Progressive Scan CMOS',
      'Разрешение: 8MP (3840×2160)',
      'Чувствительность: 0.005 лк@F1.6 (цвет)',
      'Объектив: 2.8мм/4мм, F1.6',
      'ИК-подсветка: до 30м',
      'AcuSense, Smart Event'
    ],
    images: [
      'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=AcuSense+DS-2CD2386G2',
      'https://via.placeholder.com/400x300/03A9F4/FFFFFF?text=AcuSense+Детекция'
    ],
    additional_info: 'Технология AcuSense снижает количество ложных тревог, используя алгоритмы глубокого обучения для распознавания людей и транспортных средств.'
  },
  {
    id: 'nvr1',
    title: 'Сетевой видеорегистратор DS-7608NXI-I2/8P/S',
    brand: 'HikVision',
    description: '8-канальный NVR с поддержкой AcuSense, до 12Мп на канал',
    specs: [
      'Запись: 8 каналов, до 12MP',
      'Выходы: HDMI (4K), VGA',
      'HDD: 2 SATA до 10TB каждый',
      'Сеть: 8 PoE портов (ePoE)',
      'Поддержка: H.265+/H.264+',
      'Аналитика: AcuSense, распознавание лиц'
    ],
    images: [
      'https://via.placeholder.com/400x300/673AB7/FFFFFF?text=NVR+DS-7608NXI',
      'https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=NVR+Порты'
    ],
    additional_info: 'Сетевой видеорегистратор с технологией AcuSense для умного поиска и детекции. Поддерживает камеры ColorVu и другие IP-камеры Hikvision.'
  }
];

export const brands = ['HikVision', 'HiWatch Pro', 'HiWatch Value', 'AxPro'];

export default products; 