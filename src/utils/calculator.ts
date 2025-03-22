import { NETWORK_EQUIPMENT } from '@/constants'
import type { CalculatorConfig, CalculatorResult, Product } from '@/types/store'

export interface Camera {
  id: string;
  count: number;
}

export interface CalculatorConfig {
  cameras: Camera[];
  nvr?: string;
  hdd?: string;
  useCloud?: boolean;
  cloudStorage?: {
    plan: string;
    days: number;
  };
}

// Константы для цен жестких дисков
const HDD_PRICES = {
  'hdd-1tb': { name: 'Жесткий диск 1 ТБ', price: 6500 },
  'hdd-2tb': { name: 'Жесткий диск 2 ТБ', price: 9600 },
  'hdd-4tb': { name: 'Жесткий диск 4 ТБ', price: 12500 },
  'hdd-6tb': { name: 'Жесткий диск 6 ТБ', price: 19200 },
  'hdd-8tb': { name: 'Жесткий диск 8 ТБ', price: 28000 },
};

export class SecurityCalculator {
  constructor(private products: Record<string, any>) {
    console.log('SecurityCalculator initialized with catalog containing', 
      Object.keys(products).length, 'items');
  }

  public calculateTotal(config: CalculatorConfig) {
    console.log('calculateTotal called with config:', config);
    
    // Проверяем, есть ли выбранные камеры
    if (!config.cameras || config.cameras.length === 0) {
      throw new Error('Камера не выбрана');
    }
    
    // Расчет стоимости камер и их количества
    let camerasTotal = 0;
    let totalCameraCount = 0;
    
    const selectedCameras = config.cameras.map(item => {
      const camera = this.products[item.id];
      if (!camera) {
        console.warn(`Камера с ID ${item.id} не найдена в каталоге`);
        return { 
          id: item.id,
          name: 'Неизвестная камера', 
          price: 0, 
          count: item.count,
          resolution: 2
        };
      }
      
      const cameraPrice = (camera.price || 0) * item.count;
      camerasTotal += cameraPrice;
      totalCameraCount += item.count;
      
      return {
        id: item.id,
        name: camera.title || 'Без названия',
        price: camera.price || 0,
        count: item.count,
        resolution: camera.resolution || 2
      };
    });
    
    // Расчет стоимости видеорегистратора и HDD
    let nvrPrice = 0;
    let nvrName = '';
    let hddPrice = 0;
    let hddName = '';
    
    if (config.nvr) {
      const nvr = this.products[config.nvr];
      if (nvr) {
        nvrPrice = nvr.price || 0;
        nvrName = nvr.title || 'Видеорегистратор';
        console.log(`Выбран видеорегистратор: ${nvrName}, цена: ${nvrPrice} руб`);
      }
    }
    
    if (config.hdd) {
      // Используем константы для цен жестких дисков
      const hddInfo = HDD_PRICES[config.hdd];
      if (hddInfo) {
        hddPrice = hddInfo.price;
        hddName = hddInfo.name;
        console.log(`Выбран жесткий диск: ${hddName}, цена: ${hddPrice} руб`);
      } else {
        console.warn(`Жесткий диск с ID ${config.hdd} не найден в константах`);
      }
    }
    
    // Расчет стоимости облачного хранилища с учетом разрешения камеры
    let cloudTotal = 0;
    if (config.useCloud) {
      // Тарифы в зависимости от разрешения (руб/мес)
      const cloudStoragePrices = {
        2: 390,  // 2MP - 390 руб/мес
        4: 450,  // 4MP - 450 руб/мес
        6: 590,  // 6MP - 590 руб/мес
        8: 790   // 8MP - 790 руб/мес
      };
      
      cloudTotal = selectedCameras.reduce((sum, camera) => {
        // Выбираем тариф в зависимости от разрешения (или 390 по умолчанию)
        const pricePerCamera = cloudStoragePrices[camera.resolution] || 390;
        console.log(`Облачное хранилище для камеры ${camera.name}: разрешение ${camera.resolution}MP, цена ${pricePerCamera} × ${camera.count} = ${pricePerCamera * camera.count} руб/мес`);
        return sum + (pricePerCamera * camera.count);
      }, 0);
      
      console.log(`Общая стоимость облачного хранилища: ${cloudTotal} руб/мес`);
    }
    
    // Расчет стоимости сетевого оборудования
    let networkTotal = 0;
    const networkItems = [];
    
    if (totalCameraCount === 1) {
      // Для 1 камеры - блок питания
      networkTotal = 1000;
      networkItems.push({
        name: "Блок питания для камеры",
        price: 1000,
        count: 1
      });
      console.log(`Добавлен блок питания для одной камеры:`, networkItems[0]);
    } else if (totalCameraCount > 1 && totalCameraCount <= 4) {
      // Для 2-4 камер - POE коммутатор на 4 порта
      networkTotal = 3500;
      networkItems.push({
        name: "POE коммутатор 4 порта",
        price: 3500,
        count: 1
      });
      console.log(`Добавлен POE коммутатор на 4 порта:`, networkItems[0]);
    } else if (totalCameraCount > 4 && totalCameraCount <= 8) {
      // Для 5-8 камер - POE коммутатор на 8 портов
      networkTotal = 6500;
      networkItems.push({
        name: "POE коммутатор 8 портов",
        price: 6500,
        count: 1
      });
      console.log(`Добавлен POE коммутатор на 8 портов:`, networkItems[0]);
    } else if (totalCameraCount > 8) {
      // Для 9+ камер - несколько POE коммутаторов на 4 порта
      const switchCount = Math.ceil(totalCameraCount / 4);
      networkTotal = 3500 * switchCount;
      networkItems.push({
        name: "POE коммутатор 4 порта",
        price: 3500,
        count: switchCount
      });
      console.log(`Добавлено ${switchCount} POE коммутаторов на 4 порта:`, networkItems[0]);
    }
    
    // Расчет стоимости услуг
    
    // Стоимость пусконаладочных работ (500 руб за камеру)
    const commissioningPrice = 500 * totalCameraCount;
    
    // Расчет стоимости установки и настройки видеорегистратора
    const nvrInstallPrice = config.nvr ? 1500 : 0;
    const nvrSetupPrice = config.nvr ? 2000 : 0;
    
    // Стоимость монтажных коробок (700 руб за штуку)
    const mountingBoxesTotal = 700 * totalCameraCount;
    
    // Стоимость установки камер (1500 руб за камеру)
    const cameraInstallPrice = 1500 * totalCameraCount;
    
    // Стоимость настройки камер (400 руб за камеру)
    const cameraSetupPrice = 400 * totalCameraCount;
    
    // Объединяем все услуги по установке в один объект
    const installationPrice = {
      cameraInstall: cameraInstallPrice,
      cameraSetup: cameraSetupPrice,
      commissioning: commissioningPrice,
      nvrInstall: nvrInstallPrice,
      nvrSetup: nvrSetupPrice
    };
    
    // Общая стоимость оборудования и установки
    const equipmentTotal = camerasTotal + nvrPrice + hddPrice + networkTotal + mountingBoxesTotal;
    const installationTotal = Object.values(installationPrice).reduce((sum, price) => sum + price, 0);
    const total = equipmentTotal + installationTotal;
    
    // Формируем результат
    return {
      total,
      breakdown: {
        cameras: camerasTotal,
        storage: nvrPrice + hddPrice,
        network: networkTotal,
        mountingBoxes: mountingBoxesTotal,
        cloudStorage: config.useCloud ? cloudTotal : 0,
        cloudStoragePeriod: '3 дня',
        installation: installationPrice,
        equipmentTotal,
        installationTotal
      },
      equipment: {
        cameras: selectedCameras.map(camera => ({
          id: camera.id,
          name: camera.name,
          price: camera.price,
          count: camera.count
        })),
        mountingBoxes: {
          name: 'Монтажные коробки для камер',
          price: 700,
          count: totalCameraCount,
          total: mountingBoxesTotal
        },
        storage: config.nvr ? {
          type: 'nvr',
          name: nvrName,
          price: nvrPrice,
          hdd: config.hdd ? {
            name: hddName,
            price: hddPrice
          } : undefined
        } : undefined,
        network: {
          price: networkTotal,
          items: networkItems
        },
        cloudStorage: config.useCloud ? {
          monthlyPrice: cloudTotal,
          storagePeriod: '3 дня'
        } : undefined
      },
      services: {
        cameraInstallation: {
          price: cameraInstallPrice,
          perItem: 1500,
          count: totalCameraCount
        },
        cameraSetup: {
          price: cameraSetupPrice,
          perItem: 400,
          count: totalCameraCount
        },
        commissioning: {
          price: commissioningPrice,
          perItem: 500,
          count: totalCameraCount
        },
        nvrInstallation: config.nvr ? {
          price: nvrInstallPrice,
          perItem: 1500,
          count: 1
        } : undefined,
        nvrSetup: config.nvr ? {
          price: nvrSetupPrice,
          perItem: 2000,
          count: 1
        } : undefined
      }
    };
  }
} 