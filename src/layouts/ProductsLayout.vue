<template>
  <div class="products-layout">
    <v-container>
      <div class="header-container mb-4">
        <h1 class="text-h4 text-center">Каталог оборудования</h1>
        <v-btn 
          to="/cart" 
          color="primary"
          icon
          class="cart-btn"
        >
          <v-badge
            :content="cartStore.itemCount"
            :model-value="cartStore.itemCount > 0"
            color="error"
            floating
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
      
      <!-- Место для вложенных маршрутов -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :search-query="searchQuery" />
        </transition>
      </router-view>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { productsDB } from '@/data/catalog'

const cartStore = useCartStore()
const searchQuery = ref('')
const route = useRoute()

// Определяем текущий раздел
const currentSection = computed(() => {
  return route.params.category === 'smart-home' ? 'smart-home' : 'video'
})

// Все продукты
const allProducts = ref(Object.values(productsDB))

// Фильтры
const filters = ref({
  category: null,
  brand: null,
  resolutions: []
})

// Фильтрация продуктов
const filteredProducts = computed(() => {
  return allProducts.value.filter(product => {
    // Сначала проверяем, что продукт относится к текущему разделу
    if (currentSection.value === 'smart-home') {
      // Для раздела умный дом проверяем поле section
      if (product.section !== 'smart-home') return false;
    } else if (currentSection.value === 'video') {
      // Для видеонаблюдения фильтруем по обычным категориям
      if (product.category !== 'camera' && product.category !== 'recorder') return false;
    }
    
    // Фильтр по категории
    if (filters.value.category && product.category !== filters.value.category) return false;
    
    // Фильтр по бренду
    if (filters.value.brand && product.brand !== filters.value.brand) return false;
    
    // Остальные фильтры...
    
    return true;
  });
})

provide('searchQuery', searchQuery)
provide('filteredProducts', filteredProducts)
provide('filters', filters)
</script>

<style scoped>
.header-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-btn {
  position: absolute;
  right: 0;
}

/* Стили для существующих табов */
:deep(.v-tabs) {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 4px;
  max-width: 400px;
  margin: 0 auto;
}

:deep(.v-tab) {
  text-transform: none !important;
  letter-spacing: normal !important;
  font-weight: 400;
  min-width: 180px !important;
  height: 48px !important;
  border-radius: 8px !important;
}

:deep(.v-tab--selected) {
  background: white !important;
  color: var(--v-theme-primary) !important;
  font-weight: 500 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-tab:hover:not(.v-tab--selected)) {
  background: rgba(255, 255, 255, 0.5) !important;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 600px) {
  :deep(.v-tabs) {
    max-width: none;
    margin: 0 16px;
  }

  :deep(.v-tab) {
    min-width: 0 !important;
    font-size: 14px;
  }
}

/* Существующие стили */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Анимация при изменении количества */
.v-badge__badge {
  transition: all 0.3s ease;
}
</style> 