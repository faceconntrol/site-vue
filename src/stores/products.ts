import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/data/catalog'
import { productsDB } from '@/data/catalog'

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>(Object.values(productsDB))
  const filters = ref({
    category: 'all',
    brand: [],
    resolution: []
  })
  
  const filteredProducts = computed(() => {
    // Логика фильтрации
    return products.value.filter(product => {
      // Реализация фильтров
      // ...
      return true 
    })
  })
  
  function setFilter(filterType: string, value: any) {
    // Обновление фильтров
    if (filterType in filters.value) {
      filters.value[filterType] = value
    }
  }
  
  return {
    products,
    filters,
    filteredProducts,
    setFilter
  }
}) 