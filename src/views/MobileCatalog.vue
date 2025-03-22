<template>
  <div class="mobile-catalog">
    <!-- Мобильный заголовок с навигацией -->
    <div class="mobile-catalog-header">
      <h1 class="text-center">Каталог товаров</h1>
    </div>
    
    <!-- Переключатель между Видеонаблюдением и Умным домом -->
    <v-container class="mobile-container pa-0">
      <v-tabs
        v-model="mainCategory"
        bg-color="background"
        class="main-category-tabs"
        grow
      >
        <v-tab value="cctv" class="main-category-tab">
          <v-icon class="mr-1">mdi-cctv</v-icon>
          Видеонаблюдение
        </v-tab>
        <v-tab value="smart-home" class="main-category-tab">
          <v-icon class="mr-1">mdi-home-automation</v-icon>
          Умный дом
        </v-tab>
      </v-tabs>
    </v-container>
    
    <!-- Подкатегории для текущего основного раздела -->
    <v-container class="mobile-container pa-2">
      <div class="subcategories-container mb-4">
        <div class="d-flex flex-wrap">
          <v-btn
            v-for="category in currentCategories"
            :key="category.id"
            :class="['subcategory-btn ma-1', {'subcategory-active': currentCategory === category.id}]"
            variant="outlined"
            @click="onCategoryClick(category.id)"
          >
            {{ category.name }}
          </v-btn>
        </div>
      </div>
      
      <!-- Фильтры -->
      <div class="filters-container mb-4">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon class="mr-2">mdi-filter-variant</v-icon>
                Фильтры
                <v-chip v-if="activeFiltersCount > 0" size="small" color="primary" class="ml-2">
                  {{ activeFiltersCount }}
                </v-chip>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Поиск по каталогу -->
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                label="Поиск по названию"
                variant="outlined"
                density="comfortable"
                hide-details
                class="mb-3 search-field"
                clearable
                @update:model-value="onSearchUpdate"
              ></v-text-field>
              
              <!-- Производители -->
              <div class="filter-section">
                <div class="text-subtitle-1 mb-2">Производитель</div>
                <v-chip-group 
                  v-model="selectedBrands" 
                  multiple
                  @update:model-value="onBrandsUpdate"
                >
                  <v-chip
                    v-for="brand in availableBrands"
                    :key="brand.id"
                    filter
                    :value="brand.id"
                  >
                    {{ brand.name }}
                  </v-chip>
                </v-chip-group>
              </div>
              
              <!-- Фильтр по разрешению для камер -->
              <div v-if="currentCategory === 'cameras'" class="filter-section">
                <div class="text-subtitle-1 mb-2">Разрешение</div>
                <v-chip-group 
                  v-model="selectedResolutions" 
                  multiple
                  @update:model-value="onResolutionsUpdate"
                >
                  <v-chip filter value="2">2 МП</v-chip>
                  <v-chip filter value="4">4 МП</v-chip>
                  <v-chip filter value="6">6 МП</v-chip>
                  <v-chip filter value="8">8 МП</v-chip>
                </v-chip-group>
              </div>
              
              <v-btn
                @click="onResetFilters"
                variant="outlined"
                color="primary"
                class="mt-3"
                block
              >
                Сбросить фильтры
              </v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      
      <!-- Отображение списка товаров -->
      <div class="products-container">
        <div class="d-flex justify-space-between align-center mb-3">
          <div class="text-subtitle-1">{{ currentCategoryName }}</div>
          <div class="text-caption">{{ displayedProducts.length }} товаров</div>
        </div>
        
        <div v-if="displayedProducts.length > 0" class="product-list">
          <v-card 
            v-for="product in displayedProducts" 
            :key="product.id" 
            class="mb-4 mobile-product-card"
            @click="onProductClick(product)"
            elevation="1"
          >
            <div class="d-flex pa-2">
              <div class="product-thumb-container mr-2">
                <v-img
                  :src="getProductImage(product)"
                  height="80"
                  width="80"
                  cover
                  :alt="product.title"
                  class="product-thumb"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </div>
              <div class="product-details">
                <div class="text-subtitle-1 font-weight-medium text-truncate">{{ product.title }}</div>
                <div class="text-caption text-grey-darken-1">{{ product.brand || 'HikVision' }}</div>
                
                <!-- Показываем краткое описание -->
                <div class="text-caption text-grey-darken-2 product-description mt-1">
                  {{ truncateText(product.description, 60) }}
                </div>
                
                <div class="product-features mt-2 d-flex align-center flex-wrap">
                  <v-chip v-if="getProductResolution(product)" size="x-small" color="primary" class="mr-1 mb-1">
                    {{ getProductResolution(product) }}
                  </v-chip>
                  <div v-if="product.price" class="text-body-2 font-weight-bold ms-auto">
                    {{ formatPrice(product.price) }} ₽
                  </div>
                  <div v-else class="text-body-2 font-weight-bold ms-auto text-grey">
                    Цена по запросу
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Показываем часть дополнительной информации -->
            <v-divider v-if="product.additional_info || hasSpecs(product)"></v-divider>
            <div v-if="product.additional_info" class="pa-2 text-caption text-grey-darken-2 product-additional-info">
              {{ truncateText(product.additional_info, 100) }}
            </div>
            
            <!-- Показываем ключевые характеристики -->
            <div v-if="hasSpecs(product)" class="pa-2">
              <div class="text-caption font-weight-bold">Характеристики:</div>
              <div class="d-flex flex-wrap gap-1 mt-1">
                <v-chip 
                  v-for="(spec, index) in getKeySpecs(product)" 
                  :key="index"
                  size="x-small" 
                  color="grey-lighten-3" 
                  class="mr-1 mb-1"
                >
                  {{ spec.name }}: {{ spec.value }}
                </v-chip>
              </div>
            </div>
          </v-card>
        </div>
        <div v-else class="text-center pa-4">
          <v-icon icon="mdi-shopping" size="large" color="grey-lighten-1"></v-icon>
          <p class="mt-2 text-grey-darken-1">Товары не найдены</p>
        </div>
      </div>
    </v-container>
    
    <!-- Кнопка прокрутки наверх -->
    <v-btn
      v-show="showScrollTop"
      @click="scrollToTop"
      icon="mdi-arrow-up"
      color="primary"
      size="small"
      elevation="3"
      class="scroll-to-top"
    ></v-btn>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import * as catalogImport from '@/data/catalog';
import { useVisualEffects } from '@/composables/useVisualEffects';
import { cartService } from '@/services/cartService';

// Получаем функцию показа уведомлений (переместим вверх)
const { showNotification } = useVisualEffects();

// Получаем все продукты из каталога
const catalogProducts = catalogImport.productsDB 
  ? Object.values(catalogImport.productsDB) 
  : [];

// Добавляем отладку изображений
const firstProduct = catalogProducts.length > 0 ? catalogProducts[0] : null;
console.log('================= MOBILE CATALOG DEBUG =================');
console.log('Raw catalog import:', catalogImport);
console.log('Products loaded:', catalogProducts.length);
console.log('First product:', firstProduct);
if (firstProduct) {
  console.log('First product images:', firstProduct.images);
  if (firstProduct.images && firstProduct.images.length > 0) {
    console.log('First image:', firstProduct.images[0]);
  }
}
console.log('======================================================');

// Состояния компонента
const router = useRouter();
const mainCategory = ref('cctv'); // 'cctv' или 'smart-home'
const searchQuery = ref('');
const showScrollTop = ref(false);
const currentCategory = ref('');
const selectedBrands = ref([]);
const selectedResolutions = ref([]);

// Кэш для подсчета товаров в категориях
const categoryCounts = {};

// Доступные категории
const cctvCategories = [
  { id: 'cameras', name: 'IP-камеры' },
  { id: 'recorders', name: 'Видеорегистраторы' },
  { id: 'kits', name: 'Комплекты' },
  { id: 'network', name: 'Сетевое оборудование' }
];

const smartHomeCategories = [
  { id: 'sensors', name: 'Датчики' },
  { id: 'control-panels', name: 'Контрольные панели' },
  { id: 'smart-sockets', name: 'Умные розетки' },
  { id: 'accessories', name: 'Аксессуары' }
];

// Доступные производители
const availableBrands = [
  { id: 'hikvision', name: 'HikVision' },
  { id: 'hiwatch', name: 'HiWatch' }
];

// Текущие категории в зависимости от основного раздела
const currentCategories = computed(() => {
  return mainCategory.value === 'cctv' ? cctvCategories : smartHomeCategories;
});

// Название текущей категории
const currentCategoryName = computed(() => {
  const category = [...cctvCategories, ...smartHomeCategories].find(c => c.id === currentCategory.value);
  return category ? category.name : 'Все товары';
});

// Счетчик активных фильтров
const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchQuery.value) count++;
  count += selectedBrands.value.length;
  count += selectedResolutions.value.length;
  return count;
});

// Фильтрация товаров по категории
const categoryProducts = computed(() => {
  if (!currentCategory.value) return [];
  
  return catalogProducts.filter(product => {
    return isProductInCategory(product, currentCategory.value);
  });
});

// Отфильтрованные продукты с учетом всех активных фильтров
const displayedProducts = computed(() => {
  let filtered = [...categoryProducts.value];
  
  // Фильтр по бренду
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter(product => {
      const brand = (product.brand || '').toLowerCase();
      return selectedBrands.value.some(selectedBrand => 
        brand.includes(selectedBrand.toLowerCase())
      );
    });
  }
  
  // Фильтр по разрешению камер
  if (selectedResolutions.value.length > 0 && currentCategory.value === 'cameras') {
    filtered = filtered.filter(product => {
      const resolution = extractResolution(product);
      if (!resolution) return false;
      
      return selectedResolutions.value.includes(resolution);
    });
  }
  
  // Поиск по названию
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product => {
      return (product.title || '').toLowerCase().includes(query) || 
             (product.description || '').toLowerCase().includes(query);
    });
  }
  
  return filtered;
});

// Обработчики событий
function onCategoryClick(category) {
  currentCategory.value = category;
}

function onProductClick(product) {
  console.log('Переход к товару:', product.id);
  
  // Используем нижний регистр для ID продукта,
  // так как возможно сервер чувствителен к регистру
  const productId = product.id.toLowerCase();
  
  router.push({
    name: 'product-details',
    params: { id: productId }
  });
}

function onSearchUpdate(value) {
  searchQuery.value = value;
}

function onBrandsUpdate(value) {
  selectedBrands.value = value;
}

function onResolutionsUpdate(value) {
  selectedResolutions.value = value;
}

function onResetFilters() {
  searchQuery.value = '';
  selectedBrands.value = [];
  selectedResolutions.value = [];
}

// Форматирование цены
function formatPrice(price) {
  if (!price) return '';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Получение количества товаров для категории
function getCategoryCount(categoryId) {
  // Используем кэш для оптимизации
  if (categoryCounts[categoryId] !== undefined) {
    return categoryCounts[categoryId];
  }
  
  const count = catalogProducts.filter(product => isProductInCategory(product, categoryId)).length;
  categoryCounts[categoryId] = count;
  
  return count;
}

// Проверка принадлежности товара к категории
function isProductInCategory(product, categoryId) {
  if (!product) return false;
  
  const category = (product.category || '').toLowerCase();
  
  // Прямое совпадение
  if (category === categoryId) return true;
  
  // Проверка по разным типам категорий
  switch (categoryId) {
    case 'cameras':
      return category.includes('camera');
    case 'recorders':
      return category.includes('recorder') || 
             category.includes('nvr') || 
             category.includes('dvr');
    case 'kits':
      return category.includes('kit') || 
             category.includes('комплект');
    case 'network':
      return category.includes('network') || 
             category.includes('сеть');
    case 'sensors':
      return category.includes('sensor') || 
             category.includes('датчик');
    case 'control-panels':
      return category.includes('panel') || 
             category.includes('control');
    case 'smart-sockets':
      return category.includes('socket') || 
             category.includes('розетк');
    case 'accessories':
      return category.includes('accessory') || 
             category.includes('аксессуар');
    default:
      return false;
  }
}

// Извлечение разрешения из продукта для фильтрации
function extractResolution(product) {
  // Ищем в названии продукта
  const titleMatch = (product.title || '').match(/(\d+)\s*[мМ][пП]/i);
  if (titleMatch) {
    return titleMatch[1];
  }
  
  // Ищем в описании
  const descMatch = (product.description || '').match(/(\d+)\s*[мМ][пП]/i);
  if (descMatch) {
    return descMatch[1];
  }
  
  // Проверяем специальное поле resolution
  if (product.resolution) {
    const resNum = product.resolution.toString().match(/(\d+)/);
    if (resNum) {
      return resNum[1];
    }
  }
  
  // Ищем в спецификациях
  if (product.specs && Array.isArray(product.specs)) {
    for (const spec of product.specs) {
      if ((spec.name || '').toLowerCase().includes('разреш') || 
          (spec.name || '').toLowerCase().includes('resolution')) {
        
        const mpMatch = (spec.value || '').match(/(\d+)\s*[мМ][пП]/i);
        if (mpMatch) {
          return mpMatch[1];
        }
        
        const numMatch = (spec.value || '').match(/(\d+)/);
        if (numMatch) {
          return numMatch[1];
        }
      }
    }
  }
  
  return null;
}

// Получение разрешения для отображения
function getProductResolution(product) {
  const resolution = extractResolution(product);
  if (resolution) {
    return `${resolution} МП`;
  }
  return null;
}

// Получение изображения товара
function getProductImage(product) {
  // Заглушка для отсутствующего изображения
  const fallbackImage = '/img/no-image.png';
  
  console.log('Структура продукта:', Object.keys(product));
  
  // Если у продукта есть поле image (не images!)
  if (product.image) {
    console.log(`Найдено поле image: ${product.image}`);
    return product.image;
  }
  
  // Проверяем поле imageUrl
  if (product.imageUrl) {
    console.log(`Найдено поле imageUrl: ${product.imageUrl}`);
    return product.imageUrl;
  }
  
  // Проверяем поле photo
  if (product.photo) {
    console.log(`Найдено поле photo: ${product.photo}`);
    return product.photo;
  }
  
  // Проверяем поле img
  if (product.img) {
    console.log(`Найдено поле img: ${product.img}`);
    return product.img;
  }
  
  // Проверяем миниатюру
  if (product.thumbnail) {
    console.log(`Найдено поле thumbnail: ${product.thumbnail}`);
    return product.thumbnail;
  }
  
  // Заглушка, если не найдено ни одного изображения
  console.log('Изображение не найдено, возвращаем заглушку');
  return fallbackImage;
}

// Прокрутка наверх
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Слежение за скроллом
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

// Очистка кэша категорий при изменении фильтров
watch([selectedBrands, selectedResolutions, mainCategory], () => {
  // Сбрасываем кэш категорий
  Object.keys(categoryCounts).forEach(key => {
    delete categoryCounts[key];
  });
});

// Следим за изменением основной категории
watch(mainCategory, (newValue) => {
  console.log('Изменение основной категории:', newValue);
  
  // Устанавливаем первую категорию из нового раздела
  currentCategory.value = newValue === 'cctv' 
    ? cctvCategories[0].id 
    : smartHomeCategories[0].id;
  
  // Сбрасываем фильтры
  onResetFilters();
});

// Инициализация компонента
onMounted(() => {
  console.log('Мобильный каталог загружен. Всего товаров:', catalogProducts.length);
  
  window.addEventListener('scroll', handleScroll);
  
  // Устанавливаем начальную категорию
  if (!currentCategory.value) {
    currentCategory.value = mainCategory.value === 'cctv' 
      ? cctvCategories[0].id 
      : smartHomeCategories[0].id;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Функция для обрезки длинного текста
function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Улучшенная проверка наличия спецификаций с логированием
function hasSpecs(product) {
  const hasSpecsArray = product.specs && Array.isArray(product.specs) && product.specs.length > 0;
  
  // Добавляем логирование для первого продукта для отладки
  if (product.id === 'DS-2CD2327G2-LU') {
    console.log('Проверка спецификаций для первого продукта:');
    console.log('product.specs:', product.specs);
    console.log('hasSpecsArray:', hasSpecsArray);
  }
  
  return hasSpecsArray;
}

// Улучшенное получение ключевых характеристик для отображения
function getKeySpecs(product) {
  if (!hasSpecs(product)) return [];
  
  // Для отладки выводим спецификации первого продукта
  if (product.id === 'DS-2CD2327G2-LU') {
    console.log('Спецификации первого продукта:', product.specs.slice(0, 3));
  }
  
  try {
    // Улучшенная обработка с проверками на корректность данных
    return product.specs.slice(0, 3).map(spec => {
      // Проверяем, что spec - это объект и имеет поля name и value
      if (typeof spec === 'object' && spec !== null) {
        return {
          name: spec.name || 'Характеристика',
          value: spec.value ? truncateText(spec.value.toString(), 15) : '-'
        };
      } else {
        // Если spec имеет неправильный формат, возвращаем заглушку
        return { name: 'Характеристика', value: '-' };
      }
    });
  } catch (error) {
    console.error('Ошибка при получении спецификаций:', error);
    return [];
  }
}

// Функция добавления в корзину
function addToCart(product) {
  console.log('Добавление товара в корзину:', product.id);
  
  // Создаем объект для корзины
  const cartItem = {
    id: product.id,
    title: product.title,
    price: product.price || 0,
    image: getProductImage(product)
  };
  
  // Добавляем через сервис
  cartService.addItem(cartItem);
  
  // Показываем уведомление
  showNotification('Товар добавлен в корзину');
}
</script>

<style scoped>
.mobile-catalog {
  padding-bottom: 72px;
}

.mobile-container {
  max-width: 100%;
}

.mobile-catalog-header {
  background-color: var(--primary-color, #1976d2);
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

.filters-container {
  border-radius: 8px;
}

.filter-section {
  margin-bottom: 16px;
}

.subcategories-container {
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 12px;
  margin-top: 8px;
}

.subcategory-btn {
  border-radius: 20px;
  font-size: 14px;
  text-transform: none;
}

.subcategory-active {
  background-color: var(--primary-color, #1976d2);
  color: white;
}

.mobile-product-card {
  border-radius: 8px;
  overflow: hidden;
}

.product-thumb-container {
  width: 80px;
  height: 80px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-thumb {
  border-radius: 4px;
  overflow: hidden;
}

.product-details {
  flex: 1;
  min-width: 0;
}

.scroll-to-top {
  position: fixed;
  bottom: 80px;
  right: 16px;
  z-index: 99;
}

.search-field {
  border-radius: 20px;
}

.main-category-tabs {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 50px;
  z-index: 9;
}

.main-category-tab {
  text-transform: none;
  font-weight: 500;
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 36px;
}

.product-additional-info {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.gap-1 {
  gap: 4px;
}
</style> 