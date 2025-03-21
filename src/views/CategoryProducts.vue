<template>
  <div class="category-products">
    <v-breadcrumbs :items="breadcrumbs" class="pl-0 mb-4"></v-breadcrumbs>
    
    <div class="category-switch mb-6">
      <v-btn-toggle
        v-model="activeTab"
        mandatory
        class="category-tabs"
        density="comfortable"
      >
        <v-btn
          value="camera"
          @click="$router.push('/products/camera')"
          class="tab-btn"
          :class="{ 'active': activeTab === 'camera' }"
        >
          <v-icon class="mr-2">mdi-cctv</v-icon>
          Видеонаблюдение
        </v-btn>
        <v-btn
          value="smart-home"
          @click="$router.push('/products/smart-home')"
          class="tab-btn"
          :class="{ 'active': activeTab === 'smart-home' }"
        >
          <v-icon class="mr-2">mdi-home-automation</v-icon>
          Умный дом
        </v-btn>
      </v-btn-toggle>
    </div>

    <h2 class="text-h5 mb-6">{{ categoryTitle }}</h2>
    
    <v-row>
      <v-col 
        v-for="product in filteredProducts" 
        :key="product.id" 
        cols="6"
        sm="6"
        md="4"
        lg="3"
        class="mobile-col"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productsDB } from '@/data/catalog'
import type { Product } from '@/types/store'
import ProductCard from '@/components/ProductCard.vue'

// Правильно определяем пропсы
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({ category: null, brand: null, resolutions: [] })
  }
})

// Получаем поисковый запрос из родительского компонента
const searchQuery = inject('searchQuery', ref(''))

// Получаем текущий маршрут
const route = useRoute()
const router = useRouter()

// Состояние для переключателя
const activeTab = ref(route.params.category as string)

// Следим за изменением маршрута
watch(() => route.params.category, (newCategory) => {
  activeTab.value = newCategory as string
})

// Категория из параметров маршрута
const category = computed(() => route.params.category as string)

// Названия категорий
const categoryNames: Record<string, string> = {
  'camera': 'Камеры видеонаблюдения',
  'recorder': 'Видеорегистраторы',
  'network': 'Сетевое оборудование',
  'smart-home': 'Умный дом'
}

// Заголовок для текущей категории
const categoryTitle = computed(() => 
  categoryNames[category.value] || 'Продукты'
)

// Хлебные крошки
const breadcrumbs = computed(() => [
  {
    title: 'Каталог',
    disabled: false,
    to: '/products'
  },
  {
    title: categoryTitle.value,
    disabled: true
  }
])

// Все продукты
const products = Object.values(productsDB)

// Фильтрация по категории и поисковому запросу
const filteredProducts = computed(() => {
  return products.filter(product => {
    // Если мы в разделе умного дома
    if (category.value === 'smart-home') {
      // Проверяем поле section
      if (product.section !== 'smart-home') {
        return false;
      }
      
      // Если указана конкретная категория в фильтрах, проверяем соответствие
      if (filtersRef.value?.category && 
          filtersRef.value.category !== product.category) {
        return false;
      }
    } 
    // Для обычных категорий (не умного дома)
    else if (product.category !== category.value) {
      return false;
    }
    
    // Фильтр по поисковому запросу
    if (typeof searchQuery === 'object' && 'value' in searchQuery && searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      if (!product.title.toLowerCase().includes(query) && 
          !product.description.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    return true;
  });
})

// Инжектируем фильтры или используем пустой объект, если их нет
const filtersRef = inject('filters', ref({ category: null, brand: null, resolutions: [] }))
</script>

<style scoped>
.category-switch {
  display: flex;
  justify-content: center;
}

.category-tabs {
  max-width: 400px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
  border: none !important;
}

.tab-btn {
  text-transform: none !important;
  letter-spacing: normal !important;
  font-weight: 400;
  border-radius: 6px !important;
  height: 48px !important;
  min-width: 180px !important;
  transition: all 0.3s ease;
  border: none !important;
}

.tab-btn.active {
  background: white !important;
  color: var(--v-theme-primary) !important;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-btn:not(.active):hover {
  background: rgba(255, 255, 255, 0.5);
  color: rgba(0, 0, 0, 0.9);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 600px) {
  .category-tabs {
    max-width: none;
    margin: 0 16px;
  }

  .tab-btn {
    font-size: 14px;
    height: 44px !important;
    min-width: 0 !important;
    flex: 1;
  }

  .tab-btn .v-icon {
    font-size: 18px !important;
    margin-right: 4px !important;
  }
}

/* Оставляем существующие мобильные стили */
@media (max-width: 600px) {
  .category-products {
    padding: 8px !important;
  }
  
  .mobile-col {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }

  .v-row {
    margin: 0 -4px !important;
  }

  .v-col {
    padding: 4px !important;
  }

  .product-card {
    height: 100%;
  }

  .product-card .v-card-title {
    font-size: 0.9rem !important;
    line-height: 1.2;
  }

  .product-card .v-card-text {
    font-size: 0.8rem;
    padding: 8px;
  }

  .product-card .v-img {
    height: 120px !important;
  }
}
</style> 