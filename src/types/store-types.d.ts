import type { Product } from '@/data/catalog'

// Типы для калькулятора
interface CalculatorForm {
  resolution: string;
  useNvr: boolean;
  useCloud: boolean;
  selectedNvr: any;
  selectedHdd: HddOption | null;
}

interface CalculatorResult {
  total: number;
  equipment: {
    cameras: { name: string; price: number; count: number }[];
    storage?: {
      type: 'nvr';
      name: string;
      price: number;
      hdd?: { name: string; price: number };
    };
    network: {
      name: string;
      price: number;
    };
  };
  breakdown: {
    cameras: number;
    storage: number;
    installation: {
      mountingBox: number;
      cameraInstall: number;
      cameraSetup: number;
      commissioning: number;
      nvrInstall?: number;
      nvrSetup?: number;
    };
    cloudStorage?: number;
  };
  disclaimer: string;
}

// Тип для разрешения камер
interface ResolutionType {
  title: string;
  value: '2mp' | '4mp' | '6mp' | '8mp';
} 