<template>
  <div class="all-products">    
    <v-tabs
      v-model="selectedSection"
      color="primary"
      grow
      class="mb-6"
    >
      <v-tab value="video">Видеонаблюдение</v-tab>
      <v-tab value="smart-home">Умный дом</v-tab>
    </v-tabs>

    <v-row>
      <!-- Фильтры -->
      <v-col cols="12" md="3">
        <ProductFilters
          :products="filteredBySection"
          :section="selectedSection"
          @update:filters="updateFilters"
        />
      </v-col>

      <!-- Список продуктов -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col 
            v-for="product in filteredBySearch" 
            :key="product.id" 
            cols="12"
            sm="6" 
            lg="4"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import { productsDB } from '@/data/catalog'
import { extractResolution } from '@/utils/productUtils'
import type { Product } from '@/types/store'
import ProductFilters from '@/components/ProductFilters.vue'
import ProductCard from '@/components/ProductCard.vue'

// Получаем поисковый запрос из родительского компонента
const searchQuery = inject('searchQuery', '')

// Получаем все продукты
const products = Object.values(productsDB)

// Выбранный раздел (видеонаблюдение/умный дом)
const selectedSection = ref('video')

// Фильтруем продукты по выбранному разделу
const filteredBySection = computed(() => {
  if (selectedSection.value === 'video') {
    return products.filter(p => ['camera', 'recorder', 'network'].includes(p.category))
  } else {
    return products.filter(p => p.section === 'smart-home')
  }
})

// Состояние фильтров
const filters = ref({
  category: null as string | null,
  brand: null as string | null,
  resolutions: [] as number[]
})

// Фильтрация продуктов
const filteredProducts = computed(() => {
  return filteredBySection.value.filter(product => {
    // Фильтр по категории
    if (filters.value.category && product.category !== filters.value.category) {
      return false
    }

    // Фильтр по бренду
    if (filters.value.brand && product.brand !== filters.value.brand) {
      return false
    }

    // Фильтр по разрешению (только для камер)
    if (filters.value.resolutions.length > 0 && product.category === 'camera') {
      const productResolution = extractResolution(product.specs)
      if (!productResolution || !filters.value.resolutions.includes(productResolution)) {
        return false
      }
    }

    return true
  })
})

// Обновление фильтров
const updateFilters = (newFilters: typeof filters.value) => {
  filters.value = newFilters
}

// Сброс фильтров при смене раздела
watch(selectedSection, () => {
  filters.value = {
    category: null,
    brand: null,
    resolutions: []
  }
})

// Фильтрация продуктов по поисковому запросу
const filteredBySearch = computed(() => {
  if (typeof searchQuery === 'object' && searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    return filteredProducts.value.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    )
  }
  return filteredProducts.value
})
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease;
}

.v-card:hover {
  transform: translateY(-4px);
}

.technology-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.colorvu {
  background-color: #2196F3;
}

.acusense {
  background-color: #4CAF50;
}

/* Мобильная версия */
@media (max-width: 600px) {
  .v-container {
    padding: 8px;
  }

  .v-row {
    margin: 0 -8px;
  }

  .v-col {
    padding: 8px;
  }

  /* Компактные фильтры */
  :deep(.v-card) {
    padding: 12px !important;
  }

  :deep(.v-select) {
    margin-bottom: 12px !important;
  }

  :deep(.v-select .v-field) {
    min-height: 40px !important;
  }

  /* Обновленные стили для чекбоксов разрешения */
  :deep(.resolution-filters) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 4px;
    padding: 4px 0;
    margin: 0 -12px;
    padding: 0 12px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }

  :deep(.resolution-filters::-webkit-scrollbar) {
    display: none; /* Chrome, Safari */
  }

  :deep(.v-checkbox) {
    margin: 0 !important;
    padding: 0 !important;
    flex: 0 0 auto;
    min-width: auto;
  }

  :deep(.v-checkbox .v-selection-control) {
    min-height: 32px !important;
    padding: 0 8px;
  }

  :deep(.v-checkbox label) {
    font-size: 14px;
    white-space: nowrap;
  }
}
</style> 