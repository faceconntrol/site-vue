import type { Product } from '../types';

// Интерфейс для конфигурации расчета
interface CalculatorConfig {
  cameras: { id: string; count: number }[];
  useNvr: boolean;
  useCloud: boolean;
  nvrId?: string;
  hddId?: string;
}

// Результат расчета
interface CalculationResult {
  total: number;
  breakdown: {
    equipment: number;
    services: number;
    cloud?: number;
  };
  equipment: Record<string, any>;
  services: Record<string, any>;
  cloudStorage?: {
    monthlyPrice: number;
    cameras: { id: string; title: string; price: number; count: number }[];
  };
}

// Класс для расчета стоимости системы видеонаблюдения
export class SecurityCalculator {
  private catalog: Record<string, Product>;

  constructor(catalog: Record<string, Product>) {
    this.catalog = catalog;
    console.log('SecurityCalculator initialized with catalog containing', Object.keys(catalog).length, 'items');
  }

  // Расчет общей стоимости
  calculateTotal(config: CalculatorConfig): CalculationResult {
    console.log('calculateTotal called with config:', config);
    
    // Начальная структура результата
    const result: CalculationResult = {
      total: 0,
      breakdown: {
        equipment: 0,
        services: 0
      },
      equipment: {},
      services: {}
    };

    // Оборудование (камеры)
    let cameraTotal = 0;
    for (const item of config.cameras) {
      const camera = this.catalog[item.id];
      if (!camera) {
        console.warn(`Камера с ID ${item.id} не найдена в каталоге`);
        continue;
      }
      
      const itemTotal = camera.price * item.count;
      cameraTotal += itemTotal;
      
      // Добавляем в результат
      result.equipment[`camera_${item.id}`] = {
        name: camera.title,
        price: camera.price,
        count: item.count,
        total: itemTotal
      };
    }
    
    // Добавляем монтажные коробки по количеству камер
    const totalCameras = config.cameras.reduce((sum, item) => sum + item.count, 0);
    result.equipment['mounting_boxes'] = {
      name: 'Монтажные коробки',
      price: 700,  // 700 руб. за монтажную коробку
      count: totalCameras,
      total: 700 * totalCameras
    };
    
    // Облачное хранилище
    if (config.useCloud) {
      let cloudTotal = 0;
      const cloudCameras = [];
      
      for (const item of config.cameras) {
        const camera = this.catalog[item.id];
        if (!camera) continue;
        
        // Определяем цену облачного хранилища в зависимости от разрешения
        let cloudPrice = 390; // Базовая цена для 2MP
        const resolution = camera.resolution || 2;
        
        if (resolution >= 4 && resolution < 8) {
          cloudPrice = 450; // Для 4MP
        } else if (resolution >= 8) {
          cloudPrice = 790; // Для 8MP и выше
        }
        
        const itemCloudTotal = cloudPrice * item.count;
        cloudTotal += itemCloudTotal;
        
        console.log(`Облачное хранилище для камеры ${camera.title}: разрешение ${resolution}MP, цена ${cloudPrice} × ${item.count} = ${itemCloudTotal} руб/мес`);
        
        cloudCameras.push({
          id: item.id,
          title: camera.title,
          price: cloudPrice,
          count: item.count
        });
      }
      
      console.log(`Общая стоимость облачного хранилища: ${cloudTotal} руб/мес`);
      
      result.breakdown.cloud = cloudTotal;
      result.cloudStorage = {
        monthlyPrice: cloudTotal,
        cameras: cloudCameras
      };
    }
    
    // Видеорегистратор
    if (config.useNvr && config.nvrId) {
      const nvr = this.catalog[config.nvrId];
      if (nvr) {
        result.equipment['nvr'] = {
          name: nvr.title,
          price: nvr.price,
          count: 1,
          total: nvr.price
        };
      }
    }
    
    // Жесткий диск
    if (config.hddId) {
      const hdd = this.catalog[config.hddId];
      if (hdd) {
        result.equipment['hdd'] = {
          name: hdd.title,
          price: hdd.price,
          count: 1,
          total: hdd.price
        };
      }
    }
    
    // Коммутационное оборудование
    const totalCamerasCount = config.cameras.reduce((sum, item) => sum + item.count, 0);
    
    if (totalCamerasCount === 1) {
      // Для одной камеры используем блок питания
      const powerSupplyPrice = 1000;
      result.equipment['power_supply'] = {
        name: 'Блок питания для камеры',
        price: powerSupplyPrice,
        count: 1,
        total: powerSupplyPrice
      };
      console.log('Добавлен блок питания для одной камеры:', result.equipment['power_supply']);
    } else if (totalCamerasCount > 1) {
      // Ищем коммутаторы в каталоге
      const switch4Port = Object.values(this.catalog).find(
        p => p.category === 'network' && p.id.includes('3E0106P')
      ) || { id: 'DS-3E0106P-E/M', title: 'POE коммутатор DS-3E0106P-E/M (4 порта)', price: 3500 };
      
      const switch8Port = Object.values(this.catalog).find(
        p => p.category === 'network' && p.id.includes('3E0310P')
      ) || { id: 'DS-3E0310P-E/M', title: 'POE коммутатор DS-3E0310P-E/M (8 портов)', price: 6500 };
      
      // 2-4 камеры - DS-3E0106P-E/M (POE коммутатор 4 порта)
      if (totalCamerasCount <= 4) {
        result.equipment['switch'] = {
          name: switch4Port.title || 'POE коммутатор DS-3E0106P-E/M (4 порта)',
          price: switch4Port.price || 3500,
          count: 1,
          total: switch4Port.price || 3500
        };
      }
      // 5-8 камер - DS-3E0310P-E/M (POE коммутатор 8 портов)
      else if (totalCamerasCount <= 8) {
        result.equipment['switch'] = {
          name: switch8Port.title || 'POE коммутатор DS-3E0310P-E/M (8 портов)',
          price: switch8Port.price || 6500,
          count: 1,
          total: switch8Port.price || 6500
        };
      }
      // 9-32 камеры - считаем количество коммутаторов на 4 порта
      else {
        const switchCount = Math.ceil(totalCamerasCount / 4);
        result.equipment['switch'] = {
          name: switch4Port.title || 'POE коммутатор DS-3E0106P-E/M (4 порта)',
          price: switch4Port.price || 3500,
          count: switchCount,
          total: (switch4Port.price || 3500) * switchCount
        };
      }
    }
    
    // Монтажные работы
    // 1. Установка камер - 1500 руб. за каждую
    result.services['installation'] = {
      name: 'Установка камер',
      price: 1500,
      count: totalCameras,
      total: 1500 * totalCameras
    };
    
    // 2. Настройка камер - 400 руб. за каждую
    result.services['camera_setup'] = {
      name: 'Настройка камер',
      price: 400,
      count: totalCameras,
      total: 400 * totalCameras
    };
    
    // 3. Пуско-наладочные работы - 500 руб. за каждую камеру
    result.services['camera_commission'] = {
      name: 'Пуско-наладочные работы (камеры)',
      price: 500,
      count: totalCameras,
      total: 500 * totalCameras
    };
    
    // Работы с видеорегистратором, если он выбран
    if (config.useNvr && config.nvrId) {
      // 1. Сборка видеорегистратора - 1000 руб.
      result.services['nvr_assembly'] = {
        name: 'Сборка видеорегистратора',
        price: 1000,
        count: 1,
        total: 1000
      };
      
      // 2. Настройка видеорегистратора - 2000 руб.
      result.services['nvr_setup'] = {
        name: 'Настройка видеорегистратора',
        price: 2000,
        count: 1,
        total: 2000
      };
      
      // 3. Пуско-наладочные работы для видеорегистратора - 500 руб. за каждую камеру
      result.services['nvr_commission'] = {
        name: 'Пуско-наладочные работы (регистратор)',
        price: 500,
        count: totalCameras,
        total: 500 * totalCameras
      };
    }
    
    // Считаем общую стоимость по категориям
    result.breakdown.equipment = Object.values(result.equipment).reduce(
      (sum, item) => sum + (Number(item.total) || 0), 0
    );
    
    result.breakdown.services = Object.values(result.services).reduce(
      (sum, item) => sum + (Number(item.total) || 0), 0
    );
    
    // Общая стоимость системы
    result.total = result.breakdown.equipment + result.breakdown.services;
    
    return result;
  }
} 