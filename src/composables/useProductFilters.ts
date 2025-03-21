import { ref, computed } from 'vue'
import type { Product } from '@/data/catalog'

export function useProductFilters(products: Product[]) {
  const filterCategory = ref<string | null>(null)
  const filterBrand = ref<string | null>(null)
  const searchQuery = ref('')

  const filteredProducts = computed(() => {
    return products.filter(product => {
      let matches = true
      
      if (filterCategory.value && filterCategory.value !== 'all') {
        matches = matches && product.category === filterCategory.value
      }
      
      if (filterBrand.value) {
        matches = matches && product.brand === filterBrand.value
      }
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        matches = matches && (
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        )
      }
      
      return matches
    })
  })

  return {
    filterCategory,
    filterBrand,
    searchQuery,
    filteredProducts
  }
} 