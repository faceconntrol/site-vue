import { ref, computed } from 'vue'
import { productsDB } from '@/data/catalog'
import type { Product } from '@/data/catalog'

export function useProductService() {
  const allProducts = ref(Object.values(productsDB))
  
  // Фильтры по категориям
  const getByCategory = (category: string) => {
    return allProducts.value.filter(p => p.category === category)
  }
  
  const getCameras = computed(() => getByCategory('camera'))
  const getRecorders = computed(() => getByCategory('recorder'))
  const getNetworkDevices = computed(() => getByCategory('network'))
  
  // Фильтрация по параметрам
  const filterProducts = (filters: Record<string, any>) => {
    return allProducts.value.filter(product => {
      // Реализация фильтрации
      let matches = true
      
      if (filters.category && filters.category !== 'all') {
        matches = matches && product.category === filters.category
      }
      
      if (filters.brand && filters.brand.length > 0) {
        matches = matches && filters.brand.includes(product.brand)
      }
      
      // Дополнительные фильтры
      
      return matches
    })
  }
  
  return {
    allProducts,
    getCameras,
    getRecorders,
    getNetworkDevices,
    filterProducts
  }
} 