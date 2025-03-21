import { Product } from '@/data/catalog'

export interface ProductCardProps {
  product: Product;
  isColorVuCamera?: boolean;
  isAcuSenseCamera?: boolean;
  isPanoramicCamera?: boolean;
  isPTZCamera?: boolean;
}

export interface CalculatorFormProps {
  cameraModels: any[];
  nvrModels: any[];
  defaultValues?: any;
}

// И так далее для других компонентов 