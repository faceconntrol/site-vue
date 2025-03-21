<template>
  <v-card class="filters-card">
    <v-card-title class="filters-header d-flex align-center pa-4">
      <v-icon start class="mr-2">mdi-filter-variant</v-icon>
      Фильтры
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-card-text class="pa-4">
      <!-- Поиск по каталогу -->
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        label="Поиск по каталогу"
        variant="outlined"
        density="comfortable"
        hide-details
        class="mb-4"
        clearable
      />
      
      <v-divider class="mb-4"></v-divider>
      
      <!-- Существующие фильтры -->
      <div class="filters-section">
        <!-- Категории для видеонаблюдения -->
        <v-select
          v-if="section === 'video'"
          v-model="localFilters.category"
          :items="videoCategories"
          item-title="title"
          item-value="value"
          label="Категория"
          clearable
          density="compact"
          class="mb-4"
        />

        <!-- Категории для умного дома -->
        <v-select
          v-else
          v-model="localFilters.category"
          :items="smartHomeCategories"
          item-title="title"
          item-value="value"
          label="Тип устройства"
          clearable
          density="compact"
          class="mb-4"
        />

        <!-- Фильтр по брендам -->
        <v-select
          v-model="localFilters.brand"
          :items="brandItems"
          item-title="title"
          item-value="value"
          label="Производитель"
          clearable
          density="compact"
          class="mb-4"
        />

        <!-- Фильтр по разрешению (только для камер) -->
        <template v-if="section === 'video' && localFilters.category === 'camera'">
          <div class="text-subtitle-2 mb-2">Разрешение</div>
          <div class="resolution-filters">
            <v-checkbox
              v-for="res in resolutions"
              :key="res.value"
              v-model="localFilters.resolutions"
              :label="res.label"
              :value="res.value"
              density="compact"
              hide-details
              class="resolution-checkbox"
            />
          </div>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import type { Product } from '@/types/store'

const props = defineProps<{
  products: Product[],
  section: string
}>()

const emit = defineEmits<{
  (e: 'update:filters', filters: {
    category: string | null,
    brand: string | null,
    resolutions: number[]
  }): void
}>()

const videoCategories = [
  { title: 'IP-камеры', value: 'camera' },
  { title: 'Видеорегистраторы', value: 'recorder' },
  { title: 'Сетевое оборудование', value: 'network' }
]

const smartHomeCategories = [
  { title: 'Датчики', value: 'sensors' },
  { title: 'Панели управления', value: 'control-panels' },
  { title: 'Умные розетки', value: 'smart-sockets' },
  { title: 'Комплекты', value: 'kits' },
]

const resolutions = [
  { label: '2 Мп', value: 2 },
  { label: '4 Мп', value: 4 },
  { label: '6 Мп', value: 6 },
  { label: '8 Мп', value: 8 }
]

const localFilters = ref({
  category: null as string | null,
  brand: null as string | null,
  resolutions: [] as number[]
})

// Получаем поисковый запрос из провайдера
const searchQuery = inject('searchQuery', ref(''))

// Добавляем наблюдатель за изменением категорий
watch(() => props.section, (newSection) => {
  // Сбрасываем категорию при смене раздела
  localFilters.value.category = null;
  
  // Получаем доступные категории в зависимости от секции
  const getCategories = () => {
    if (newSection === 'smart-home') {
      // Фильтруем только те категории, которые есть в данных
      const availableCategories = Array.from(new Set<string>(
        props.products
          .filter(p => p.section === 'smart-home')
          .map(p => p.category)
      ));
      
      // Используем только доступные категории
      const categoryItems = smartHomeCategories.filter(
        cat => availableCategories.includes(cat.value)
      );
      
      return categoryItems;
    }
    
    return videoCategories;
  };
  
  // Получаем доступные бренды для текущего раздела
  const getBrands = () => {
    // Берем только товары текущей секции
    const products = newSection
      ? props.products.filter(p => p.section === newSection)
      : props.products;
      
    const brands = Array.from(new Set<string>(products.map(p => p.brand)));
    return brands.map(brand => ({
      title: brand === 'hikvision' ? 'Hikvision' : 'HiWatch',
      value: brand
    }));
  };
})

// В методе фильтрации добавляем проверку на секцию
const brandItems = computed(() => {
  // Фильтруем бренды в зависимости от выбранной секции
  const products = props.section === 'smart-home' 
    ? props.products.filter(p => p.section === 'smart-home')
    : props.products;
    
  const brands = Array.from(new Set<string>(products.map(p => p.brand)));
  return brands.map(brand => ({
    title: brand === 'hikvision' ? 'Hikvision' : 'HiWatch',
    value: brand
  }));
})

// Сбрасываем фильтры при смене раздела
watch(() => props.section, () => {
  localFilters.value = {
    category: null,
    brand: null,
    resolutions: []
  }
})

// Обновляем фильтры при изменении
watch(localFilters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })

// Примерная логика:
const filteredProducts = computed(() => {
  return props.products.filter(product => {
    let matches = true;
    
    // Если выбран раздел умного дома и фильтр категории
    if (props.section === 'smart-home' && localFilters.value.category) {
      // Проверяем либо точное совпадение категории, либо совпадение секции
      matches = matches && 
        (product.category === localFilters.value.category || 
         (product.section === 'smart-home' && localFilters.value.category === 'smart-home'));
    } 
    // Для раздела видеонаблюдения используем обычную логику
    else if (localFilters.value.category) {
      matches = matches && product.category === localFilters.value.category;
    }
    
    // Остальные фильтры без изменений
    // ...
    
    return matches;
  });
})
</script>

<style scoped>
.filters-card {
  border-radius: 12px;
  position: sticky;
  top: 16px;
}

.filters-header {
  font-size: 1.1rem;
  font-weight: 500;
  background: #f5f5f5;
}

/* Стили для поискового поля */
:deep(.v-text-field) {
  width: 100%;
}

:deep(.v-field) {
  border-radius: 8px;
}

.v-checkbox {
  margin-top: 0;
}

/* Стили для мобильных устройств */
@media (max-width: 600px) {
  .filters-card {
    position: static;
    margin-bottom: 16px;
  }

  .resolution-filters {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 8px;
    margin: 0 -12px;
    padding: 0 12px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .resolution-filters::-webkit-scrollbar {
    display: none;
  }

  .resolution-checkbox {
    flex: 0 0 auto;
    margin: 0 !important;
    padding: 0 !important;
  }

  :deep(.v-selection-control) {
    min-height: 32px !important;
    margin: 0 !important;
  }

  :deep(.v-selection-control__wrapper) {
    margin-right: 4px !important;
  }

  :deep(.v-label) {
    font-size: 14px;
    opacity: 1;
    white-space: nowrap;
  }
}
</style> 