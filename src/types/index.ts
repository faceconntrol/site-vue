export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  brand?: string;
  section?: string;
  resolution?: number;
  channels?: number;
  additional_info?: string;
  specs?: string[];
}

export interface HddOption {
  id: string;
  title: string;
  price: number;
  capacity: number;
  value: number;
}

export interface CalculatorConfig {
  cameras: Array<{id: string, count: number}>;
  useNvr?: boolean;
  nvrId?: string;
  hddId?: string;
  useCloud?: boolean;
}

export interface CalculationResult {
  camerasTotal: number;
  nvrTotal: number;
  hddTotal: number;
  cloudTotal: number;
  grandTotal: number;
} 