<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import ProductFilters from '@/components/ProductFilters.vue'
import { getCatalogProducts } from '@/data/catalog'
import type { Product as ProductType, Filters as FiltersType } from '@/types'
import { isSection } from '@/utils/productUtils'
import { useCatalogStore } from '@/stores/catalog'

const route = useRoute()
const sectionName = computed(() => route.params.section as string)
const catalogStore = useCatalogStore()

const products = ref<ProductType[]>([])
const filteredProducts = ref<ProductType[]>([])
const isLoading = ref(true)
const activeFilters = ref<FiltersType>({
  category: null,
  brand: null,
  search: '',
  maxResolution: null
})
const errorMessage = ref<string | null>(null)

// Определяем, является ли путь секцией или ID товара
const isSectionRoute = computed(() => isSection(route.params.section as string))

// Если это путь секции, получаем товары для этой секции
// Иначе считаем параметр ID товара
const displayMode = computed(() => isSectionRoute.value ? 'section' : 'product')

onMounted(async () => {
  console.log(`Режим отображения: ${displayMode.value}`)
  console.log(`Параметр маршрута: ${route.params.section}`)
  
  // Определяем, нужно ли загружать товары для секции или для отдельного товара
  if (isSectionRoute.value) {
    // Если это путь секции, устанавливаем соответствующую секцию
    console.log(`[DEBUG] ProductsView: Это маршрут секции: ${sectionName.value}`)
    
    // Устанавливаем секцию в store
    catalogStore.setSelectedSection(sectionName.value)
    
    // Принудительно устанавливаем фильтр категории, соответствующий секции
    if (sectionName.value === 'smart-home') {
      catalogStore.setCategory('smart-home')
    } else if (sectionName.value === 'video') {
      catalogStore.setCategory('video')
    }
  }
  
  console.log(`[DEBUG] ProductsView: загрузка продуктов для секции ${sectionName.value}`)
  isLoading.value = true
  
  try {
    products.value = await getCatalogProducts()
    console.log(`[DEBUG] ProductsView: загружено ${products.value.length} продуктов`)
    filterProducts()
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error)
    errorMessage.value = 'Не удалось загрузить продукты. Пожалуйста, попробуйте позже.'
  } finally {
    isLoading.value = false
  }
})

// Следим за изменениями в роуте
watch(() => route.params.section, () => {
  console.log(`[DEBUG] ProductsView: изменилась секция на ${sectionName.value}`)
  // Сбрасываем фильтры при смене секции
  activeFilters.value = {
    category: null,
    brand: null,
    search: '',
    maxResolution: null
  }
  filterProducts()
}, { immediate: true })

// Следим за изменениями фильтров и перезапускаем фильтрацию
watch(activeFilters, (newFilters: FiltersType) => {
  console.log('[DEBUG] ProductsView: фильтрация запущена с фильтрами:', newFilters)
  filterProducts()
}, { deep: true })

// Функция для фильтрации продуктов по выбранным фильтрам
const filterProducts = () => {
  console.log('[DEBUG] ProductsView: запуск фильтрации, section:', sectionName.value)
  console.log('[DEBUG] ProductsView: всего товаров:', products.value.length)
  
  if (!products.value.length) {
    filteredProducts.value = [];
    return;
  }
  
  // Вначале фильтруем по секции
  let filtered = products.value.filter((p: ProductType) => p.section === sectionName.value)
  console.log('[DEBUG] ProductsView: после фильтрации по секции осталось:', filtered.length)
  
  // Применяем фильтр категории, если выбран
  if (activeFilters.value.category) {
    console.log('[DEBUG] ProductsView: фильтрация по категории:', activeFilters.value.category)
    filtered = filtered.filter((product: ProductType) => product.category === activeFilters.value.category)
    console.log('[DEBUG] ProductsView: после фильтрации по категории осталось:', filtered.length)
  }
  
  // Применяем фильтр бренда, если выбран
  if (activeFilters.value.brand) {
    console.log('[DEBUG] ProductsView: фильтрация по бренду:', activeFilters.value.brand)
    filtered = filtered.filter((product: ProductType) => product.brand === activeFilters.value.brand)
    console.log('[DEBUG] ProductsView: после фильтрации по бренду осталось:', filtered.length)
  }
  
  // Применяем фильтр разрешения, если выбран и если категория - камеры
  if (activeFilters.value.maxResolution && 
      (activeFilters.value.category === 'camera' || !activeFilters.value.category)) {
    console.log('[DEBUG] ProductsView: фильтрация по разрешению:', activeFilters.value.maxResolution)
    filtered = filtered.filter((product: ProductType) => {
      // Извлекаем разрешение из спецификаций товара
      if (product.specs) {
        for (const spec of product.specs) {
          if (typeof spec === 'string' && spec.toLowerCase().includes('разрешение')) {
            // Пытаемся извлечь число из строки с разрешением
            const match = spec.match(/(\d+)\s*Мп/i);
            if (match && match[1]) {
              const resolution = parseInt(match[1], 10);
              console.log(`[DEBUG] ProductsView: продукт ${product.id} имеет разрешение ${resolution} Мп`);
              return resolution === activeFilters.value.maxResolution;
            }
          }
        }
      }
      
      // Если разрешение не найдено в спецификациях, проверяем название продукта
      if (product.title) {
        const match = product.title.match(/(\d+)\s*Мп/i);
        if (match && match[1]) {
          const resolution = parseInt(match[1], 10);
          console.log(`[DEBUG] ProductsView: продукт ${product.id} имеет разрешение ${resolution} Мп из названия`);
          return resolution === activeFilters.value.maxResolution;
        }
      }
      
      // Также проверяем в описании
      if (product.description) {
        const match = product.description.match(/(\d+)\s*Мп/i);
        if (match && match[1]) {
          const resolution = parseInt(match[1], 10);
          console.log(`[DEBUG] ProductsView: продукт ${product.id} имеет разрешение ${resolution} Мп из описания`);
          return resolution === activeFilters.value.maxResolution;
        }
      }
      
      // Если не нашли информации о разрешении, не включаем продукт
      return false;
    })
    console.log('[DEBUG] ProductsView: после фильтрации по разрешению осталось:', filtered.length)
  }
  
  // Обновляем отфильтрованные продукты
  filteredProducts.value = filtered
  console.log('[DEBUG] ProductsView: итого отфильтровано товаров:', filteredProducts.value.length)
}

// Обработчик изменения фильтров
const updateFilters = (filters: FiltersType) => {
  console.log('[DEBUG] ProductsView: получены новые фильтры:', filters)
  activeFilters.value = { ...filters }
  
  // Немедленно применяем новые фильтры
  filterProducts()
}

// Тип для продукта
interface Product {
  id: string;
  uniqueId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  section: string;
  specs?: string[];
  resolution?: string;
  [key: string]: any;
}

// Тип для фильтров
interface Filters {
  category: string | null;
  brand: string | null;
  search: string;
  maxResolution: string | null;
}

// Исправляем функцию для извлечения разрешения
const extractResolution = (product: Product): string | null => {
  // Проверяем свойство resolution
  if (product.resolution) {
    return product.resolution;
  }
  
  // Проверяем в specs строку с "Разрешение"
  if (product.specs) {
    const resolutionSpec = product.specs.find((spec: string) => 
      spec.includes('Разрешение') || spec.includes('разрешение')
    );
    
    if (resolutionSpec) {
      // Извлекаем значение разрешения
      const match = resolutionSpec.match(/(\d+)\s*[МмM][пП]|(\d+)×(\d+)/);
      if (match) {
        return match[0];
      }
    }
  }
  
  return null;
}
</script>

<template>
  <div class="products-container">
    <h1 class="text-h4 mb-4">
      {{ sectionName === 'video' ? 'Видеонаблюдение' : 'Умный дом' }}
    </h1>
    
    <v-row>
      <!-- Фильтры -->
      <v-col cols="12" md="3">
        <ProductFilters 
          :products="products" 
          :section="sectionName" 
          @update:filters="updateFilters"
        />
      </v-col>
      
      <!-- Список товаров -->
      <v-col cols="12" md="9">
        <div v-if="isLoading" class="d-flex justify-center align-center" style="height: 300px;">
          <v-progress-circular indeterminate color="primary" size="64" />
        </div>
        
        <div v-else-if="filteredProducts.length === 0" class="text-center py-8">
          <v-icon size="64" color="grey">mdi-emoticon-sad-outline</v-icon>
          <div class="text-h5 mt-4">Товары не найдены</div>
          <div class="text-subtitle-1 text-grey">Попробуйте изменить параметры фильтрации</div>
        </div>
        
        <v-row v-else>
          <v-col 
            v-for="product in filteredProducts" 
            :key="product.id" 
            cols="12" sm="6" md="4" lg="4"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.products-container {
  padding: 20px;
}

@media (max-width: 960px) {
  /* Стили для мобильной версии остаются без изменений */
}
</style> 