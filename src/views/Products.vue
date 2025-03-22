<template>
  <div class="products-container">
    <!-- Используем v-tabs вместо кнопок для переключения разделов -->
    <v-tabs
      v-model="selectedSection"
      color="primary"
      grow
      class="mb-6"
    >
      <v-tab value="video">
        <v-icon class="mr-2">mdi-cctv</v-icon>
        Видеонаблюдение
      </v-tab>
      <v-tab value="smart-home">
        <v-icon class="mr-2">mdi-home-automation</v-icon>
        Умный дом
      </v-tab>
    </v-tabs>

    <v-row>
      <!-- Колонка с фильтрами -->
      <v-col cols="12" md="3">
        <ProductFilters
          :products="products" 
          :section="selectedSection"
          :filters="filters"
          @update:filters="handleFiltersUpdate"
        />
      </v-col>

      <!-- Колонка с товарами -->
      <v-col cols="12" md="9">
        <div v-if="isLoading" class="d-flex justify-center align-center my-12">
          <v-progress-circular indeterminate color="primary" size="64" />
        </div>
        
        <div v-else>
          <!-- Счетчик товаров и результаты поиска -->
          <div class="d-flex justify-space-between align-center mb-4">
            <div class="text-body-1">
              Найдено товаров: {{ filteredProducts.length }}
            </div>
            <div v-if="filters.search" class="text-body-2">
              Результаты поиска: "{{ filters.search }}"
              <v-btn 
                variant="text" 
                density="compact" 
                icon="mdi-close"
                @click="filters.search = ''; handleFiltersUpdate(filters);"
              ></v-btn>
            </div>
          </div>
          
          <!-- Сетка товаров -->
          <v-row v-if="filteredProducts.length > 0">
          <v-col 
              v-for="product in filteredProducts" 
              :key="product.uniqueId"
              cols="12" sm="6" md="4" lg="4"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>
          
          <!-- Сообщение, если нет товаров -->
          <v-alert
            v-else
            type="info"
            variant="tonal"
            title="Нет товаров"
            text="По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтрации."
            class="mt-4"
          ></v-alert>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCatalogProducts } from '@/data/catalog'
import { useCatalogStore } from '@/stores/catalog'
import ProductFilters from '@/components/ProductFilters.vue'
import ProductCard from '@/components/ProductCard.vue'
import { debounce } from 'lodash'
import type { Product } from '@/types'

// Logs для отладки
console.log('[DEBUG] Products: Компонент инициализирован')

// Router и Route
const router = useRouter()
const route = useRoute()

// Store для кэширования данных
const catalogStore = useCatalogStore()

// Состояние компонента
const products = ref<Product[]>([])
const isLoading = ref(true)
const selectedSection = ref('video') // По умолчанию "video"

// Определение типа фильтров
interface Filters {
  category: string | null;
  brand: string | null;
  search: string;
  maxResolution: string[] | null;
  resolutions: string[];
}

// Создаем пустой объект фильтров с начальными значениями
const filters = ref<Filters>({
  category: null,
  brand: null,
  search: '',
  resolutions: []  // Используем это название поля вместо maxResolution
})

// Загрузка товаров
const loadProducts = async () => {
  console.log('[DEBUG] Products: Начинаем загрузку товаров')
  
  try {
    const data = await getCatalogProducts()
    console.log('[DEBUG] Products: Получены данные из catalog.ts', data.length)
    
    if (data && data.length > 0) {
      console.log('[DEBUG] Products: Пример товара #0:', data[0])
      console.log('[DEBUG] Products: Пример товара #1:', data[1])
      console.log('[DEBUG] Products: Пример товара #2:', data[2])
      console.log('[DEBUG] Products: Пример товара #3:', data[3])
      console.log('[DEBUG] Products: Пример товара #4:', data[4])
      
      // Обогащаем товары: добавляем uniqueId и нормализуем title
      products.value = data.map((product: Product, index: number) => {
        const uniqueId = `product-${product.id || index}`
        
        // Формируем полный объект товара
        const formattedProduct = {
          ...product,
          uniqueId,
          title: product.title || product.id,
        }
        
        // Определяем секцию товара, если не задана
        if (!formattedProduct.section) {
          const isVideoCategory = ['camera', 'recorder', 'network', 'accessories'].includes(product.category || '');
          formattedProduct.section = isVideoCategory ? 'video' : 'smart-home';
          console.log(`[DEBUG] Назначена секция для товара ${product.title}: ${formattedProduct.section}`);
        }
        
        return formattedProduct
      })
      
      console.log('[DEBUG] Products: Загружено', products.value.length, '"товаров"')
      console.log('[DEBUG] Products: Статистика товаров после загрузки:')
      console.log('- Всего товаров:', products.value.length)
      console.log('- Товаров в секции smart-home:', products.value.filter((p: Product) => p.section === 'smart-home').length)
      console.log('- Товаров в секции video:', products.value.filter((p: Product) => p.section === 'video').length)
      
      // Восстанавливаем состояние фильтров и раздел из URL если есть
      const sectionParam = route.query.section as string
      if (sectionParam && ['video', 'smart-home'].includes(sectionParam)) {
        selectedSection.value = sectionParam
      }
      
      const categoryParam = route.query.category as string
      if (categoryParam) {
        filters.value.category = categoryParam
      }
      
      const searchParam = route.query.search as string
      if (searchParam) {
        filters.value.search = searchParam
      }
    }
  } catch (error) {
    console.error('[ERROR] Products: Ошибка загрузки товаров:', error)
  } finally {
    isLoading.value = false
  }
}

// Функция для извлечения значения разрешения из спецификаций продукта
const extractResolution = (product) => {
  if (!product.specs || !Array.isArray(product.specs)) {
    return null;
  }
  
  // Ищем запись, содержащую "разрешение" или "Мп"
  const resolutionSpec = product.specs.find(spec => 
    spec.toLowerCase().includes('разрешение') || 
    spec.toLowerCase().includes(' мп ')
  );
  
  if (resolutionSpec) {
    // Извлекаем числовое значение из строки
    const match = resolutionSpec.match(/(\d+)\s*(?:мп|mp)/i);
    if (match) {
      return parseInt(match[1], 10);
    }
  }
  
  // Если есть прямое поле resolution, используем его
  if (product.resolution) {
    return parseInt(product.resolution, 10);
  }
  
  return null;
}

// Обработка изменения фильтров от компонента
const handleFiltersUpdate = (newFilters: Filters) => {
  console.log(`[DEBUG] Products: Обновление всех фильтров:`, newFilters)
  filters.value = { ...newFilters }
  
  // Обновляем URL
  router.replace({ 
    query: { 
      ...route.query, 
      section: selectedSection.value,
      category: filters.value.category || undefined,
      search: filters.value.search || undefined
    } 
  })
}

// Добавляем реакцию на поисковые запросы
watch(() => filters.value.search, (newSearchQuery) => {
  console.log(`[DEBUG] Products: Применяем поисковый запрос: "${newSearchQuery}"`)
})

// Обновление логики фильтрации в вычисляемом свойстве filteredProducts
const filteredProducts = computed(() => {
  console.log('[DEBUG] Products: Начинаем фильтрацию товаров')
  console.log('[DEBUG] Products: Текущая секция:', selectedSection.value)
  console.log('[DEBUG] Products: Текущие фильтры:', filters.value)
  
  // Фильтрация по секции
  let result = products.value.filter(product => 
    product.section === selectedSection.value
  )
  console.log('[DEBUG] Products: После фильтрации только по секции:', result.length, '"товаров"')
  
  // Фильтрация по категории
  if (filters.value.category) {
    result = result.filter(product => 
      product.category === filters.value.category
    )
    console.log('[DEBUG] Products: После фильтрации по категории:', result.length, '"товаров"')
  }
  
  // Добавляем фильтрацию по поисковому запросу
  if (filters.value.search && filters.value.search.trim() !== '') {
    const searchLower = filters.value.search.toLowerCase().trim()
    result = result.filter(product => {
      // Поиск по заголовку и описанию
      const titleMatch = (product.title || '').toLowerCase().includes(searchLower)
      const descMatch = (product.description || '').toLowerCase().includes(searchLower)
      const idMatch = (product.id || '').toLowerCase().includes(searchLower)
      
      // Поиск по дополнительной информации
      const additionalMatch = product.additional_info ? 
        product.additional_info.toLowerCase().includes(searchLower) : false
      
      // Поиск по спецификациям
      let specsMatch = false
      if (product.specs && Array.isArray(product.specs)) {
        specsMatch = product.specs.some(spec => 
          spec.toLowerCase().includes(searchLower)
        )
      }
      
      return titleMatch || descMatch || idMatch || additionalMatch || specsMatch
    })
    console.log('[DEBUG] Products: После фильтрации по поиску:', result.length, '"товаров"')
  }
  
  // Фильтр по бренду
  if (filters.value.brand && filters.value.brand.trim() !== '') {
    console.log('[DEBUG] Products: Фильтрация по бренду:', filters.value.brand);
    
    result = result.filter(p => {
      const brand = p.brand || '';
      return brand.toLowerCase().includes((filters.value.brand || '').toLowerCase());
    });
    console.log('[DEBUG] Products: После фильтрации по бренду:', result.length, 'товаров');
  }
  
  // Фильтр по разрешению
  if (filters.value.resolutions && filters.value.resolutions.length > 0) {
    console.log('[DEBUG] Products: Фильтрация по разрешениям:', filters.value.resolutions);
    
    result = result.filter(p => {
      const resolution = extractResolution(p);
      // Проверяем, что разрешение не null и конвертируем в число для сравнения
      return resolution !== null && filters.value.resolutions.includes(resolution);
    });
    console.log('[DEBUG] Products: После фильтрации по разрешению:', result.length, 'товаров');
  }
  
  return result;
})

// Обновляем URL при изменении раздела
watch(selectedSection, (newSection) => {
  router.replace({ query: { ...route.query, section: newSection } })
})

onMounted(async () => {
  // Загружаем товары при монтировании компонента
  await loadProducts()
  
  // Используем метод из store для сохранения состояния (если он есть)
  if (typeof catalogStore.setProducts === 'function') {
    catalogStore.setProducts(products.value)
  }
})
</script>

<style scoped>
.products-container {
  padding: 16px;
}
</style> 