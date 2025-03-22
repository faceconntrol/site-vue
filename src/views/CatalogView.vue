<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { catalogItems as products } from '@/data/catalog'
import { Product } from '@/data/catalog'
import ProductCard from '@/components/ProductCard.vue'
import FiltersPanel from '@/components/FiltersPanel.vue'

// Типизированное определение Продукта
interface Product {
  id: string;
  title: string;
  description?: string;
  specs?: string[];
  features?: string[];
  additional_info?: string;
  image?: string;
  category?: string;
  brand?: string;
  price?: number;
}

// Состояние каталога
const products = ref<Product[]>(products);
const filteredProducts = ref<Product[]>([...products]);
const activeFilters = ref({
  category: 'all',
  colorvu: false,
  acusense: false,
  panoramic: false,
  ptz: false,
  search: '',
  price: {min: 0, max: 100000},
  sortBy: 'default'
});

// Проверки технологий камер
const isColorVuCamera = (product: Product) => {
  return product.features?.includes('colorvu') || 
         (product.specs?.some(spec => 
           spec.toLowerCase().includes('colorvu') || 
           spec.toLowerCase().includes('цветное изображение 24/7')
         )) ||
         product.title.toLowerCase().includes('colorvu');
};

const isAcuSenseCamera = (product: Product) => {
  return product.features?.includes('acusense') || 
         (product.specs?.some(spec => 
           spec.toLowerCase().includes('acusense') || 
           spec.toLowerCase().includes('классификация целей')
         )) ||
         product.title.toLowerCase().includes('acusense');
};

const isPanoramicCamera = (product: Product) => {
  return product.features?.includes('panoramic') || 
         (product.specs?.some(spec => 
           spec.toLowerCase().includes('панорам') || 
           spec.toLowerCase().includes('широкий угол') ||
           spec.toLowerCase().includes('360°') ||
           spec.toLowerCase().includes('180°')
         )) ||
         product.title.toLowerCase().includes('панорам');
};

const isPTZCamera = (product: Product) => {
  return product.features?.includes('ptz') || 
         (product.specs?.some(spec => 
           spec.toLowerCase().includes('поворотная') || 
           spec.toLowerCase().includes('ptz') ||
           spec.toLowerCase().includes('p.t.z') ||
           spec.toLowerCase().includes('поворот') ||
           spec.toLowerCase().includes('zoom') ||
           spec.toLowerCase().includes('зум')
         )) ||
         product.title.toLowerCase().includes('ptz');
};

// Функция фильтрации
const filterProducts = (products: Product[], filters: any) => {
  // Сначала фильтруем
  let filtered = products.filter((product: Product) => {
    // Базовая проверка отображения товара
    let shouldDisplay = true;
    
    // Категория
    if (filters.category && filters.category !== 'all') {
      shouldDisplay = product.category === filters.category;
    }
    
    // Технологии
    if (shouldDisplay && filters.colorvu) {
      shouldDisplay = isColorVuCamera(product);
    }
    
    if (shouldDisplay && filters.acusense) {
      shouldDisplay = isAcuSenseCamera(product);
    }
    
    if (shouldDisplay && filters.panoramic) {
      shouldDisplay = isPanoramicCamera(product);
    }
    
    if (shouldDisplay && filters.ptz) {
      shouldDisplay = isPTZCamera(product);
    }
    
    // Фильтр по цене
    if (shouldDisplay && filters.price) {
      if (product.price) {
        shouldDisplay = 
          product.price >= filters.price.min && 
          product.price <= filters.price.max;
      }
    }
    
    // Поиск по тексту
    if (shouldDisplay && filters.search) {
      const searchTerm = filters.search.toLowerCase();
      shouldDisplay = 
        (product.title && product.title.toLowerCase().includes(searchTerm)) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.specs && product.specs.some(spec => spec.toLowerCase().includes(searchTerm)));
    }
    
    return shouldDisplay;
  });
  
  // Затем сортируем
  if (filters.sortBy && filters.sortBy !== 'default') {
    filtered.sort((a, b) => {
      if (filters.sortBy === 'price_asc') {
        return (a.price || 0) - (b.price || 0);
      } else if (filters.sortBy === 'price_desc') {
        return (b.price || 0) - (a.price || 0);
      } else if (filters.sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }
  
  return filtered;
};

// Убедитесь, что импортируемые данные продуктов имеют правильный формат
console.log('Загружено продуктов:', products.length)

// Обработчик изменения фильтров - добавьте вывод для отладки
const handleFiltersChange = (newFilters: any) => {
  console.log('Новые фильтры:', newFilters)
  activeFilters.value = { ...newFilters }
  filteredProducts.value = filterProducts(products.value, activeFilters.value)
  console.log('Отфильтровано продуктов:', filteredProducts.value.length)
}

// Инициализация при загрузке компонента
onMounted(() => {
  // Применяем изначальную фильтрацию
  filteredProducts.value = filterProducts(products.value, activeFilters.value);
});
</script>

<template>
  <div class="catalog-view">
    <FiltersPanel 
      v-model:filters="activeFilters"
      @update:filters="handleFiltersChange" 
    />
    
    <div class="products-grid">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product" 
      />
      
      <div v-if="filteredProducts.length === 0" class="no-results">
        Нет товаров, соответствующих выбранным фильтрам
      </div>
    </div>
  </div>
</template> 