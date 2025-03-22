import { productsDB } from '@/data/catalog';

// Интерфейсы для более строгой типизации
export interface Product {
  id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  brand?: string;
  resolution?: string;
  specs?: Array<string | {name: string, value: string}>;
  additional_info?: string;
}

// Класс для работы с каталогом
class CatalogService {
  products: Product[] = [];
  
  constructor() {
    this.loadProducts();
  }
  
  // Загрузка всех продуктов
  loadProducts() {
    if (Array.isArray(productsDB)) {
      this.products = productsDB;
    } else if (typeof productsDB === 'object' && productsDB !== null) {
      this.products = Object.values(productsDB);
    } else {
      this.products = [];
      console.error('Ошибка формата данных каталога');
    }
    
    return this.products;
  }
  
  // Получение всех продуктов
  getAllProducts() {
    return this.products;
  }
  
  // Получение продукта по ID
  getProductById(id: string) {
    return this.products.find(product => product.id.toLowerCase() === id.toLowerCase());
  }
  
  // Фильтрация продуктов
  filterProducts(options: {
    category?: string,
    brand?: string,
    minPrice?: number,
    maxPrice?: number,
    search?: string,
    resolution?: string
  }) {
    return this.products.filter(product => {
      // Фильтр по категории
      if (options.category && product.category !== options.category) {
        return false;
      }
      
      // Фильтр по бренду
      if (options.brand && product.brand !== options.brand) {
        return false;
      }
      
      // Фильтр по минимальной цене
      if (options.minPrice && product.price && product.price < options.minPrice) {
        return false;
      }
      
      // Фильтр по максимальной цене
      if (options.maxPrice && product.price && product.price > options.maxPrice) {
        return false;
      }
      
      // Фильтр по поисковому запросу
      if (options.search) {
        const search = options.search.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(search);
        const matchesDescription = product.description ? product.description.toLowerCase().includes(search) : false;
        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }
      
      // Фильтр по разрешению (для камер)
      if (options.resolution && product.resolution !== options.resolution) {
        return false;
      }
      
      return true;
    });
  }
  
  // Получение уникальных брендов
  getBrands() {
    const brands = new Set();
    this.products.forEach(product => {
      if (product.brand) {
        brands.add(product.brand);
      }
    });
    return Array.from(brands).sort();
  }
  
  // Получение уникальных категорий
  getCategories() {
    const categories = new Set();
    this.products.forEach(product => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    return Array.from(categories).sort();
  }
}

// Создаем единственный экземпляр сервиса для всего приложения
export const catalogService = new CatalogService(); 