<template>
  <div class="mobile-catalog-all">
    <!-- Мобильный заголовок с навигацией -->
    <div class="mobile-catalog-header">
      <div class="d-flex align-center px-4">
        <v-btn
          icon
          variant="text"
          color="white"
          density="comfortable"
          @click="$router.push('/mobile-catalog')"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1 class="ml-2">Все товары</h1>
      </div>
    </div>
    
    <v-container class="pa-2">
      <!-- Поиск и фильтры -->
      <div class="d-flex align-center mb-3">
        <v-text-field
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify"
          label="Поиск"
          variant="outlined"
          density="comfortable"
          hide-details
          class="mr-2 search-field"
          clearable
        ></v-text-field>
        
        <v-btn
          @click="showFilters = !showFilters"
          icon
          variant="outlined"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </div>
      
      <!-- Фильтры -->
      <v-expand-transition>
        <div v-if="showFilters" class="mb-3">
          <v-card>
            <v-card-text>
              <h3 class="text-subtitle-1 mb-2">Бренды</h3>
              <div class="d-flex flex-wrap">
                <v-chip-group v-model="selectedBrands" multiple>
                  <v-chip v-for="brand in availableBrands" :key="brand" filter>
                    {{ brand }}
                  </v-chip>
                </v-chip-group>
              </div>
              
              <h3 class="text-subtitle-1 mb-2 mt-3">Технологии</h3>
              <div class="d-flex flex-wrap">
                <v-checkbox v-model="filterColorVu" label="ColorVu" hide-details class="mr-3 mb-2"></v-checkbox>
                <v-checkbox v-model="filterAcuSense" label="AcuSense" hide-details class="mb-2"></v-checkbox>
              </div>
              
              <h3 class="text-subtitle-1 mb-2 mt-3">Сортировка</h3>
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Сортировать по"
                density="comfortable"
                variant="outlined"
                hide-details
              ></v-select>
              
              <div class="d-flex mt-3">
                <v-btn @click="resetFilters" color="grey" variant="text" class="mr-2">Сбросить</v-btn>
                <v-btn @click="applyFilters" color="primary" block>Применить</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-expand-transition>
      
      <!-- Результаты поиска -->
      <div class="search-results mt-3">
        <p class="text-body-2 text-grey mb-2">Найдено товаров: {{ filteredProducts.length }}</p>
        
        <div v-if="filteredProducts.length > 0">
          <v-card
            v-for="product in sortedProducts"
            :key="product.id"
            class="mb-3 mobile-product-card"
            :to="`/products/${product.id}`"
            elevation="1"
          >
            <div class="d-flex">
              <v-img
                :src="getProductImageUrl(product)"
                height="90"
                width="90"
                cover
                class="product-thumb"
              ></v-img>
              <div class="product-details pa-2">
                <div class="d-flex justify-space-between">
                  <div>
                    <div class="text-subtitle-1 font-weight-medium text-truncate">{{ product.title }}</div>
                    <div class="text-caption text-grey">{{ product.brand }}</div>
                  </div>
                </div>
                
                <div class="mt-1 product-features">
                  <v-chip v-if="hasFeature(product, 'colorvu')" size="x-small" color="amber" class="mr-1">ColorVu</v-chip>
                  <v-chip v-if="hasFeature(product, 'acusense')" size="x-small" color="blue" class="mr-1">AcuSense</v-chip>
                </div>
                
                <div class="text-caption text-truncate-2 mt-1">
                  {{ product.description }}
                </div>
              </div>
            </div>
          </v-card>
        </div>
        
        <div v-else class="text-center pa-6">
          <v-icon size="large" color="grey">mdi-magnify-close</v-icon>
          <p class="mt-2">Ничего не найдено</p>
          <v-btn @click="resetFilters" color="primary" class="mt-3" variant="text">
            Сбросить фильтры
          </v-btn>
        </div>
      </div>
    </v-container>
    
    <!-- Скроллбек наверх -->
    <v-btn
      v-show="showScrollTop"
      @click="scrollToTop"
      icon="mdi-arrow-up"
      color="primary"
      class="scroll-to-top"
      size="small"
      elevation="3"
    ></v-btn>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import * as catalogImport from '@/data/catalog';
import * as testCatalog from '@/data/mobileCatalog';

// Получаем данные из правильного поля импорта
const catalogProducts = catalogImport.productsDB 
  ? Object.values(catalogImport.productsDB) 
  : testCatalog.products || [];

// Доступные бренды  
const availableBrands = computed(() => {
  const brandList = testCatalog.brands || [];
  if (brandList.length > 0) return brandList;
  
  // Если брендов нет в импорте, извлекаем из продуктов
  return [...new Set(catalogProducts.map(product => product.brand).filter(Boolean))];
});

// Логируем, что нашли в каталоге
console.log('Загрузка страницы всех товаров:', {
  productsCount: catalogProducts.length,
  availableBrands: availableBrands.value
});

// Состояние компонента
const searchQuery = ref('');
const showFilters = ref(false);
const filterColorVu = ref(false);
const filterAcuSense = ref(false);
const selectedBrands = ref([]);
const sortBy = ref('name-asc');
const showScrollTop = ref(false);

// Опции сортировки
const sortOptions = [
  { title: 'По названию (А-Я)', value: 'name-asc' },
  { title: 'По названию (Я-А)', value: 'name-desc' },
  { title: 'Новинки', value: 'new' }
];

// Фильтрованные товары
const filteredProducts = computed(() => {
  let filtered = [...catalogProducts];
  
  // Фильтр по строке поиска
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product => 
      product.title?.toLowerCase().includes(query) || 
      product.description?.toLowerCase().includes(query)
    );
  }
  
  // Фильтр по брендам
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter(product => 
      selectedBrands.value.includes(product.brand)
    );
  }
  
  // Фильтр по технологиям
  if (filterColorVu.value) {
    filtered = filtered.filter(product => hasFeature(product, 'colorvu'));
  }
  
  if (filterAcuSense.value) {
    filtered = filtered.filter(product => hasFeature(product, 'acusense'));
  }
  
  return filtered;
});

// Сортировка товаров
const sortedProducts = computed(() => {
  const products = [...filteredProducts.value];
  
  switch (sortBy.value) {
    case 'name-asc':
      return products.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    case 'name-desc':
      return products.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    case 'new':
      // Предполагаем, что новые товары имеют более высокий ID
      return products.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
    default:
      return products;
  }
});

// Методы
function hasFeature(product, feature) {
  const title = product.title?.toLowerCase() || '';
  const description = product.description?.toLowerCase() || '';
  const specs = Array.isArray(product.specs) ? product.specs.join(' ').toLowerCase() : '';
  
  return title.includes(feature) || 
         description.includes(feature) || 
         specs.includes(feature);
}

function applyFilters() {
  showFilters.value = false;
}

function resetFilters() {
  searchQuery.value = '';
  selectedBrands.value = [];
  filterColorVu.value = false;
  filterAcuSense.value = false;
  sortBy.value = 'name-asc';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Обновленная функция для получения URL изображения товара
function getProductImageUrl(product) {
  if (product.images && product.images.length) {
    // Проверяем, содержит ли путь к изображению протокол или слеш (абсолютный путь)
    const imagePath = product.images[0];
    
    if (typeof imagePath === 'string') {
      if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return imagePath;
      } else {
        // Используем относительный путь для активов внутри public
        return `/assets/products/${imagePath}`;
      }
    } else if (imagePath && imagePath.src) {
      // Для случая, если изображение хранится как объект {src: '...'}
      return imagePath.src;
    }
  }
  
  // Проверяем наличие поля image или thumbnail
  if (product.image) {
    return typeof product.image === 'string' ? product.image : product.image.src || product.image;
  }
  
  if (product.thumbnail) {
    return typeof product.thumbnail === 'string' ? product.thumbnail : product.thumbnail.src || product.thumbnail;
  }
  
  // Генерируем заглушку с названием товара вместо "Нет фото"
  const encodedTitle = encodeURIComponent(product.title || product.id || 'Товар');
  return `https://via.placeholder.com/100x100/555555/FFFFFF?text=${encodedTitle}`;
}

// Хуки жизненного цикла
onMounted(() => {
  console.log('Страница всех товаров загружена. Всего товаров:', catalogProducts.length);
  
  // Отслеживание скролла для показа кнопки "наверх"
  window.addEventListener('scroll', () => {
    showScrollTop.value = window.pageYOffset > 300;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => {});
});
</script>

<style scoped>
.mobile-catalog-all {
  padding-bottom: 72px; /* Для нижней навигации */
}

.mobile-catalog-header {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.mobile-catalog-header h1 {
  font-size: 1.25rem;
  margin: 0;
}

.search-field {
  border-radius: 8px;
  flex-grow: 1;
}

.mobile-product-card {
  border-radius: 8px;
  overflow: hidden;
}

.product-thumb {
  border-radius: 4px;
  overflow: hidden;
}

.product-details {
  flex: 1;
  min-width: 0; /* Для корректного обрезания текста */
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scroll-to-top {
  position: fixed;
  bottom: 80px;
  right: 16px;
  z-index: 99;
}

/* Адаптация для очень маленьких экранов */
@media (max-width: 320px) {
  .product-thumb {
    height: 70px;
    width: 70px;
  }
  
  .text-subtitle-1 {
    font-size: 0.9rem !important;
  }
}
</style> 