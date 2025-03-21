import { DefineComponent } from 'vue';
import { Product } from '@/data/catalog';

// Типы для компонентов с пропсами
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ProductCard: DefineComponent<{
      product: Product;
      isColorVuCamera?: boolean;
      isAcuSenseCamera?: boolean;
      isPanoramicCamera?: boolean;
      isPTZCamera?: boolean;
      tooltips?: Record<string, string>;
    }>;
    
    LazyImage: DefineComponent<{
      src: string;
      alt: string;
      aspect: number;
      placeholder?: string;
    }>;
    
    PageTitle: DefineComponent<{
      title: string;
    }>;
    
    ProductFilters: DefineComponent<{
      section: string;
      products: Product[];
    }>;
    
    CalculatorResults: DefineComponent<{
      results: any;
      formatPrice: (val: number) => string;
    }>;
  }
} 