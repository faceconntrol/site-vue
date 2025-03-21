export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'camera' | 'recorder' | 'kit' | 'network' | 'smart-home' | 'storage';
  brand: 'hikvision' | 'hiwatch';
  image: string;
  specs?: string[];
  additional_info?: string;
  maxResolution?: number;
  channels?: number;
  features?: string[];
}

export interface CatalogState {
  selectedCategory: string;
  selectedBrand: string;
  searchQuery: string;
}

export interface OrderForm {
  phone: string;
  email: string;
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface SelectedCamera {
  camera: Product;
  count: number;
}

export interface Form {
  selectedCameras: SelectedCamera[];
  resolution: string;
  selectedNvr: Product | null;
  useNvr: boolean;
  useCloud: boolean;
}

export interface CalculatorConfig {
  cameraCount: number;
  selectedCamera?: { id: string };
  selectedNvr?: { id: string };
  useNvr: boolean;
  useCloud: boolean;
}

export interface CalculatorResult {
  total: number;
  breakdown: {
    cameras: number;
    storage: number;
    cloudStorage: number;     // Добавляем поле для облачного хранилища
    installation: {
      mountingBox: number;     // Монтажные коробки
      cameraInstall: number;   // Установка камер
      cameraSetup: number;     // Настройка камер
      commissioning: number;   // Пуско-наладка
      nvrInstall?: number;     // Установка регистратора (если есть)
      nvrSetup?: number;       // Настройка регистратора
    };
    network: number;          // Стоимость сетевого оборудования
  };
  equipment: {
    cameras: Array<{
      name: string;
      price: number;
      count: number;
    }>;
    storage?: {
      type: 'nvr';
      name: string;
      price: number;
      hdd?: {
        name: string;
        price: number;
      };
    };
    network: {
      price: number;
      items: Array<{
        name: string;
        price: number;
        count: number;
      }>;
    };
  };
}

export interface CategoryOption {
  title: string;
  value: '' | 'camera' | 'recorder' | 'kit' | 'network' | 'smart-home';
}

export interface BrandOption {
  title: string;
  value: '' | 'hikvision' | 'hiwatch' | 'dahua' | 'axis';
}

export interface ResolutionType {
  title: string;
  value: '2mp' | '4mp' | '8mp';
}

export interface NetworkEquipment {
  name: string;
  price: number;
  type: 'power-supply' | 'poe-switch-4' | 'poe-switch-8' | 'poe-switch-4-multiple';
}

export interface HddOption {
  id: string;
  capacity: number;
  title: string;
  price: number;
}

interface RootState {
  cart: {
    items: CartItem[]
    total: number
  }
  user: {
    authorized: boolean
    profile?: UserProfile
  }
  catalog: {
    items: Product[]
    categories: Category[]
    filters: Filter[]
  }
  ui: {
    theme: 'light' | 'dark'
    language: 'ru' | 'en'
    notifications: Notification[]
  }
} 