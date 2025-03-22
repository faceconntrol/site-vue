import { ref, reactive, computed } from 'vue';

/**
 * Хук для работы с фильтрацией товаров
 * @param {Array} products - Массив товаров для фильтрации
 * @returns {Object} - Методы и состояние для фильтрации
 */
export default function useProductFilters(products = []) {
  // Состояние фильтров
  const filters = reactive({
    category: '',
    brand: [],
    feature: [],
    priceRange: [0, 999999],
    search: ''
  });
  
  // Доступные значения фильтров
  const availableFilters = computed(() => {
    // Получение уникальных значений для категорий и брендов
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    
    // Получение доступных технологий
    const features = [];
    products.forEach(product => {
      if (product.features && Array.isArray(product.features)) {
        product.features.forEach(feature => {
          if (!features.includes(feature)) {
            features.push(feature);
          }
        });
      }
    });
    
    // Определение минимальной и максимальной цены
    let minPrice = 0;
    let maxPrice = 999999;
    
    if (products.length) {
      const prices = products.map(p => p.price).filter(p => typeof p === 'number' && !isNaN(p));
      if (prices.length) {
        minPrice = Math.min(...prices);
        maxPrice = Math.max(...prices);
      }
    }
    
    return {
      categories,
      brands,
      features,
      priceRange: [minPrice, maxPrice]
    };
  });
  
  // Проверка наличия активных фильтров
  const hasActiveFilters = computed(() => {
    return (
      filters.category !== '' || 
      filters.brand.length > 0 || 
      filters.feature.length > 0 || 
      filters.search !== '' ||
      filters.priceRange[0] > availableFilters.value.priceRange[0] ||
      filters.priceRange[1] < availableFilters.value.priceRange[1]
    );
  });
  
  // Фильтрация товаров
  const applyFilters = (productsToFilter = products) => {
    let filtered = [...productsToFilter];
    
    // Фильтрация по категории
    if (filters.category) {
      filtered = filtered.filter(product => {
        const category = (product.category || '').toLowerCase();
        return category === filters.category.toLowerCase() || 
               category.includes(filters.category.toLowerCase());
      });
    }
    
    // Фильтрация по бренду
    if (filters.brand.length > 0) {
      filtered = filtered.filter(product => {
        const brand = (product.brand || '').toLowerCase();
        return filters.brand.some(b => brand.includes(b.toLowerCase()));
      });
    }
    
    // Фильтрация по технологиям
    if (filters.feature.length > 0) {
      filtered = filtered.filter(product => {
        // Проверка в массиве характеристик
        if (product.features && Array.isArray(product.features)) {
          return filters.feature.some(feature => 
            product.features.some(f => f.toLowerCase() === feature.toLowerCase())
          );
        }
        
        // Проверка в названии
        const title = (product.title || '').toLowerCase();
        return filters.feature.some(feature => title.includes(feature.toLowerCase()));
      });
    }
    
    // Фильтрация по цене
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price);
      return !isNaN(price) && 
             price >= filters.priceRange[0] && 
             price <= filters.priceRange[1];
    });
    
    // Фильтрация по поисковому запросу
    if (filters.search) {
      const searchQuery = filters.search.toLowerCase();
      filtered = filtered.filter(product => {
        return (product.title || '').toLowerCase().includes(searchQuery) || 
               (product.description || '').toLowerCase().includes(searchQuery);
      });
    }
    
    return filtered;
  };
  
  // Сброс всех фильтров
  const resetAllFilters = () => {
    filters.category = '';
    filters.brand = [];
    filters.feature = [];
    filters.search = '';
    filters.priceRange = [...availableFilters.value.priceRange];
  };
  
  // Обновление фильтра по категории
  const updateCategoryFilter = (category) => {
    filters.category = category;
  };
  
  // Обновление фильтров по бренду
  const updateBrandFilter = (brands) => {
    filters.brand = Array.isArray(brands) ? brands : [brands];
  };
  
  // Обновление фильтров по технологиям
  const updateFeatureFilter = (features) => {
    filters.feature = Array.isArray(features) ? features : [features];
  };
  
  // Обновление фильтра по поиску
  const updateSearchFilter = (search) => {
    filters.search = search;
  };
  
  // Обновление диапазона цен
  const updatePriceRangeFilter = (range) => {
    filters.priceRange = range;
  };
  
  return {
    filters,
    availableFilters,
    applyFilters,
    resetAllFilters,
    updateCategoryFilter,
    updateBrandFilter,
    updateFeatureFilter,
    updateSearchFilter,
    updatePriceRangeFilter,
    hasActiveFilters
  };
} 