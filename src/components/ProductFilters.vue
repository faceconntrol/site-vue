<template>
  <v-card class="filters-card">
    <v-card-title class="filters-header d-flex align-center pa-4">
      <v-icon start class="mr-2">mdi-filter-variant</v-icon>
      Фильтры
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-card-text class="pa-4">
      <!-- Поле поиска -->
      <div class="px-4 pt-2">
      <v-text-field
          v-model="localFilters.search"
        label="Поиск по каталогу"
          density="compact"
        variant="outlined"
          prepend-inner-icon="mdi-magnify"
        hide-details
          class="mb-3"
          @input="debounceSearch"
        clearable
        ></v-text-field>
        <div v-if="localFilters.search" class="text-caption text-grey mb-2">
          Поиск по названию, описанию и спецификациям
        </div>
      </div>
      
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
          @update:model-value="selectCategory"
        />

        <!-- Категории для умного дома -->
        <v-select
          v-else-if="section === 'smart-home'"
          v-model="localFilters.category"
          :items="Object.entries(filteredCategories).map(([value, title]) => ({ value, title }))"
          item-title="title"
          item-value="value"
          label="Категория"
          clearable
          density="compact"
          class="mb-4"
          @update:model-value="selectCategory"
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
          @update:model-value="selectBrand"
        />

        <!-- Фильтр по разрешению (только для камер) -->
        <template v-if="section === 'video' && localFilters.category === 'camera'">
          <div class="text-subtitle-2 mb-2">Разрешение (Мп)</div>
          <div class="resolution-filters">
            <v-checkbox
              v-for="res in resolutions"
              :key="res.value"
              v-model="localFilters.resolutions"
              :value="res.value"
              :label="res.title || res.label"
              density="compact"
              hide-details
              class="resolution-checkbox"
              multiple
              @change="updateResolutionFilters"
            />
          </div>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Product, Filters } from '@/types'
import { catalogService } from '@/services/catalogService'
import { debounce } from 'lodash'

const props = defineProps<{
  products: Product[]
  section: string
  filters?: Filters
}>()

const emit = defineEmits<{
  'update:filters': [filters: Filters]
}>()

// Локальное состояние фильтров
const selectedCategory = ref('')
const selectedBrand = ref('')
const selectedResolution = ref<number | null>(null)

// Вычисляемые свойства для фильтров
const availableCategories = computed(() => {
  const sectionProducts = props.products.filter((p: any) => p.section === props.section)
  const categories = new Set(sectionProducts.map((p: any) => p.category))
  return Array.from(categories).filter(Boolean).sort()
})

const availableBrands = computed(() => {
  let filtered = props.products.filter((p: any) => p.section === props.section)
  if (selectedCategory.value) {
    filtered = filtered.filter((p: any) => p.category === selectedCategory.value)
  }
  const brands = new Set(filtered.map((p: any) => p.brand))
  return Array.from(brands).filter(Boolean).sort()
})

// Доступные разрешения для камер
const availableResolutions = computed(() => {
  // Показываем разрешения только для категории камер
  if (props.section === 'video' && selectedCategory.value === 'camera') {
    return [2, 4, 6, 8] // Фиксированные значения разрешений
  }
  return []
})

// Обработчики изменения фильтров
const updateCategory = (category: string) => {
  console.log('[DEBUG] ProductFilters: выбрана категория:', category)
  selectedCategory.value = category
  // Сбрасываем другие фильтры при смене категории
  selectedBrand.value = ''
  selectedResolution.value = null
  emitFilters()
}

const updateBrand = (brand: string) => {
  console.log('[DEBUG] ProductFilters: выбран бренд:', brand)
  selectedBrand.value = brand
  emitFilters()
}

const updateResolution = (resolution: number) => {
  console.log('[DEBUG] ProductFilters: изменение разрешения:', resolution)
  selectedResolution.value = resolution
  console.log('[DEBUG] Текущие разрешения после изменения:', selectedResolution.value)
  emitFilters()
}

// Получаем доступные категории в зависимости от выбранной секции
const getCategoriesForSection = (section: string) => {
  const result: Record<string, string> = {};
  
  if (props.section === 'video') {
    result['camera'] = 'Камеры видеонаблюдения';
    result['recorder'] = 'Видеорегистраторы';
    result['network'] = 'Сетевое оборудование';
    result['accessories'] = 'Аксессуары';
  } else if (props.section === 'smart-home') {
    result['control-panels'] = 'Панели управления';
    result['sensors'] = 'Датчики';
    result['kit'] = 'Комплекты';
    result['smart-sockets'] = 'Умные розетки';
  }
  
  console.log('[DEBUG] ProductFilters: Доступные категории для секции', props.section, result);
  
  return result;
}

// Отправляем обновленные фильтры наверх
const emitFilters = () => {
  // Создаем копию фильтров для отправки
  const currentFilters = {
    category: localFilters.value.category || '',
    brand: localFilters.value.brand || '',
    search: localFilters.value.search || '',
    resolutions: localFilters.value.resolutions || []
  };
  
  console.log(`[DEBUG] ProductFilters: изменились фильтры:`, JSON.stringify(currentFilters));
  emit('update:filters', currentFilters);
}

// Добавляем isUpdatingFromProps как ref
const isUpdatingFromProps = ref(false);

// При изменении props.filters обновляем локальные фильтры
watch(() => props.filters, (newVal: any) => {
  // Блокируем обновления внутренних состояний если они идентичны входящим фильтрам
  if (JSON.stringify(localFilters.value) !== JSON.stringify(newVal)) {
    isUpdatingFromProps.value = true;
    localFilters.value = { ...newVal };
    
    // Для совместимости также обновляем выбранные значения
    selectedCategory.value = newVal.category || '';
    selectedBrand.value = newVal.brand || '';
    
    // Для множественного выбора разрешений
    // Это не сбросит текущие выбранные разрешения
  }
})

// Сбрасываем фильтры при изменении секции
watch(() => props.section, () => {
  selectedCategory.value = ''
  selectedBrand.value = ''
  selectedResolution.value = null
  emitFilters()
})

// Заполняем фильтры из пропсов при монтировании
onMounted(() => {
  if (props.filters) {
    selectedCategory.value = props.filters.category || ''
    selectedBrand.value = props.filters.brand || ''
    selectedResolution.value = props.filters.resolutions && props.filters.resolutions.length > 0 ? props.filters.resolutions[0] : null
  }

  // Инициализируем доступные категории при загрузке
  const availableCats = buildAvailableCategoriesForSection(props.products, props.section);
  videoCategories.value = [
    { title: 'Все категории', value: null },
    ...Object.entries(availableCats).map(([value, title]) => ({ value, title }))
  ];
  
  console.log('[DEBUG] ProductFilters: Категории при инициализации:', videoCategories.value);
})

// Массив доступных разрешений
const resolutions = [
  { value: 2, title: '2 Мп' },
  { value: 4, title: '4 Мп' },
  { value: 6, title: '6 Мп' },
  { value: 8, title: '8 Мп' }
]

// Локальная копия фильтров для двустороннего связывания
const localFilters = ref<Filters>({
  category: props.filters?.category || null,
  brand: props.filters?.brand || null,
  search: props.filters?.search || '',
  resolutions: props.filters?.resolutions || []
});

// Категории для разных секций
const videoCategories = ref<Array<{title: string, value: string}>>([]);

// Категории для умного дома
const smartHomeCategories = [
  { title: 'Контрольные панели', value: 'control-panels' },
  { title: 'Датчики', value: 'sensors' },
  { title: 'Комплекты', value: 'kits' }
]

// Получаем бренды из сервиса
const brands = computed(() => catalogService.getBrands())
const categories = computed(() => catalogService.getCategories())

// Переменная для поискового запроса
const searchQuery = ref('')

// Добавляем наблюдатель за изменением поискового запроса
watch(() => searchQuery.value, (newVal: string) => {
  // Обрабатываем изменение поискового запроса
  console.log(`[DEBUG] Поисковый запрос изменен: ${newVal}`)
})

// Вычисляемое свойство для брендов
const brandItems = computed(() => {
  return brands.value.map((brand: string) => ({
    title: brand.charAt(0).toUpperCase() + brand.slice(1),
    value: brand
  }))
})

// Следим за изменениями локальных фильтров
watch(
  () => localFilters.value,
  (newFilters: Filters) => {
    console.log(`[DEBUG] ProductFilters: изменились фильтры: ${JSON.stringify(newFilters)}`)
    // Отправляем событие изменения фильтров
    emit('update:filters', newFilters)
  },
  { deep: true }
)

// Функция выбора категории
function selectCategory(category: string | null) {
  console.log(`[DEBUG] ProductFilters: выбрана категория: ${category}`)
  localFilters.value.category = category
}

// Функция выбора бренда
function selectBrand(brand: string | null) {
  console.log(`[DEBUG] ProductFilters: выбран бренд: ${brand}`)
  localFilters.value.brand = brand
}

// Функция для обновления фильтров разрешения
function updateResolutionFilters() {
  // Выводим выбранные разрешения в консоль для отладки
  console.log(`[DEBUG] ProductFilters: выбраны разрешения:`, localFilters.value.resolutions);
  
  // Отправляем обновленные фильтры вверх по иерархии компонентов
  emitFilters();
}

// Отображаем только нужные категории для текущей секции
const filteredCategories = computed(() => {
  const result = {};
  const availableCategories = getCategoriesForSection(props.section);
  
  for (const category in availableCategories) {
    // Проверяем, есть ли товары с такой категорией
    const hasProducts = props.products.some((p: Product) => 
      p.section === props.section && p.category === category
    );
    
    if (hasProducts) {
      result[category] = availableCategories[category];
    }
  }
  
  console.log('[DEBUG] ProductFilters: Доступные категории для секции', props.section, result);
  
  return result;
});

// Выводим доступные категории в консоль для отладки
watch(() => props.section, (newSection: string) => {
  console.log('[DEBUG] ProductFilters: Секция изменилась на', newSection);
  
  // Подсчитываем количество товаров по категориям для текущей секции
  const categoryCounts: Record<string, number> = {};
  props.products.forEach((product: Product) => {
    if (product.section === newSection) {
      const category = product.category || 'undefined';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });
  
  console.log('[DEBUG] ProductFilters: Распределение товаров по категориям в секции', newSection, categoryCounts);
}, { immediate: true });

// В функции updateFilters изменить обработку maxResolution
const updateFilters = (key: string, value: any) => {
  if (isUpdatingFromProps.value) return;
  
  if (key === 'resolutions') {
    // Преобразуем значение в массив перед отправкой
    const parsedValue = Array.isArray(value) ? value.map(Number) : [];
    console.log(`[DEBUG] ProductFilters: изменение разрешения:`, parsedValue);
    
    // Обновляем локальные фильтры
    localFilters.value = {
      ...localFilters.value,
      [key]: parsedValue
    };
    
    // Отправляем обновленные фильтры
    emit('update:filters', localFilters.value);
  } else {
    // ... остальной код для других типов фильтров
  }
}

// Функция для получения доступных категорий с учетом текущей секции
const getAvailableCategories = (section: string) => {
  // Объект с переводами категорий
  const categoryLabels = {
    camera: 'Камеры видеонаблюдения',
    recorder: 'Видеорегистраторы',
    kit: 'Готовые комплекты',
    network: 'Сетевое оборудование',
    accessories: 'Аксессуары',
    'control-panels': 'Контрольные панели',
    sensors: 'Датчики',
    'smart-sockets': 'Умные розетки'
  };
  
  // ... остальной код функции ...
}

// Добавьте логирование при построении фильтров категорий
const buildCategoryFilters = (products: Product[], section: string) => {
  // Подсчет товаров по категориям
  const categoryCounts = {};
  products.forEach(product => {
    if (product.section === section) {
      const category = product.category || 'undefined';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });
  
  console.log('[DEBUG] ProductFilters: Распределение товаров по категориям в секции', `"${section}"`, categoryCounts);
  
  // ... остальной код ...
}

// Добавляем тип для categoryCounts
const categoryCounts: Record<string, number> = {};

// Обновляем категории для видео-секции
availableCategories.video = {
  'camera': 'Камеры',
  'recorder': 'Регистраторы',
  'kit': 'Комплекты',
  'network': 'Сетевое оборудование',  // Добавляем сетевое оборудование
  'accessories': 'Аксессуары'
};

// Оставляем остальные категории как есть

// Добавляем тип только для категорий
interface CategoryMap {
  [key: string]: string;
}

// Обновляем категории для видео-секции вместо переопределения всей переменной
// Удаляем объявление: const availableCategories: Record<string, CategoryMap> = { ... }
// И используем следующее:

// Обновляем категории для видео
availableCategories.video = {
  'camera': 'Камеры',
  'recorder': 'Регистраторы',
  'kit': 'Комплекты',
  'network': 'Сетевое оборудование',  // Добавляем сетевое оборудование
  'accessories': 'Аксессуары'
};

// Оставляем остальные категории без изменений

// Удаляем дублирующиеся объявления переменных categoryCounts и другие переменные,
// которые уже могут быть объявлены в другом месте файла

// Дебаунс для поиска, чтобы не отправлять запрос на каждый символ
const debounceSearch = debounce(() => {
  console.log('[DEBUG] ProductFilters: Поисковый запрос:', localFilters.value.search);
  emit('update:filters', localFilters.value);
}, 300);

// Функция обновления фильтров
const onFiltersUpdate = () => {
  console.log('[DEBUG] ProductFilters: Обновление фильтров', localFilters.value);
  emit('update:filters', localFilters.value);
};

// Обработчик изменения категории
const handleCategoryChange = (category) => {
  localFilters.value.category = category;
  onFiltersUpdate();
};

// Обработчик изменения бренда
const handleBrandChange = (brand) => {
  localFilters.value.brand = brand;
  onFiltersUpdate();
};

// Функция для построения списка доступных категорий в секции
const buildAvailableCategoriesForSection = (products, section) => {
  console.log('[DEBUG] ProductFilters: Создаем доступные категории для секции', section);
  
  // Словарь соответствия технических имен категорий и их русских названий
  const categoryTitles = {
    'camera': 'IP-камеры',
    'recorder': 'Видеорегистраторы',
    'kit': 'Комплекты',
    'network': 'Сетевое оборудование',
    'ptz': 'Поворотные камеры',
    'panoramic': 'Панорамные камеры',
    'sensors': 'Датчики',
    'control-panels': 'Контрольные панели',
    'smart-sockets': 'Умные розетки',
    'kits': 'Комплекты'
  };
  
  // Создаем пустой объект для результата
  const availableCategories = {};
  
  // Получаем только товары из указанной секции
  const sectionProducts = products.filter(p => p.section === section);
  console.log(`[DEBUG] ProductFilters: Найдено ${sectionProducts.length} товаров в секции "${section}"`);
  
  // Вывод первых 3-х товаров для отладки
  if (sectionProducts.length > 0) {
    console.log('[DEBUG] ProductFilters: Примеры товаров в секции:');
    sectionProducts.slice(0, 3).forEach((p, i) => {
      console.log(`  ${i+1}. ${p.title}, категория: ${p.category}, бренд: ${p.brand}`);
    });
  }
  
  // Создаем массив уникальных категорий
  const uniqueCategories = [...new Set(sectionProducts.map(p => p.category))];
  console.log('[DEBUG] ProductFilters: Уникальные категории в секции:', uniqueCategories);
  
  // Заполняем доступные категории с их русскими названиями
  uniqueCategories.forEach(category => {
    if (category) {
      // Проверяем, есть ли товары этой категории в данной секции
      const categoryProducts = sectionProducts.filter(p => p.category === category);
      
      if (categoryProducts.length > 0) {
        // Используем перевод из словаря или оригинальное название, если перевода нет
        availableCategories[category] = categoryTitles[category] || category;
        console.log(`[DEBUG] ProductFilters: Добавлена категория "${category}" (${availableCategories[category]}) с ${categoryProducts.length} товарами`);
      }
    }
  });
  
  // Если категорий нет или список пуст, используем стандартные значения
  if (Object.keys(availableCategories).length === 0) {
    console.log('[DEBUG] ProductFilters: Не найдено категорий, используем стандартные для секции', section);
    
    if (section === 'video') {
      availableCategories['camera'] = 'IP-камеры';
      availableCategories['recorder'] = 'Видеорегистраторы';
      availableCategories['kit'] = 'Комплекты';
      availableCategories['network'] = 'Сетевое оборудование';
    } else if (section === 'smart-home') {
      availableCategories['sensors'] = 'Датчики';
      availableCategories['control-panels'] = 'Контрольные панели';
      availableCategories['smart-sockets'] = 'Умные розетки';
    }
  }
  
  console.log('[DEBUG] ProductFilters: Итоговые доступные категории:', availableCategories);
  return availableCategories;
};
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