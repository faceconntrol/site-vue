import { ref, computed } from '@vue/runtime-dom'
import type { Product } from '@/types/store'
import { productsDB } from '@/data/catalog'

const selectedCategory = ref('')
const selectedBrand = ref('')
const searchQuery = ref('')
const selectedSection = ref('video')

const products = computed(() => Object.entries(productsDB).map(([id, product]) => ({
  ...product,
  id
})))

const filteredProducts = computed(() => {
  let result = products.value

  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value)
  }

  if (selectedBrand.value) {
    result = result.filter(product => product.brand === selectedBrand.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  return result
})

export const useCatalogStore = () => {
  const setCategory = (category: string) => {
    console.log(`[DEBUG] Store: Установка категории: ${category}`)
    selectedCategory.value = category
  }

  const setBrand = (brand: string) => {
    selectedBrand.value = brand
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setSelectedSection = (section: string) => {
    console.log(`[DEBUG] Store: Установка выбранной секции: ${section}`);
    if (section === 'video' || section === 'smart-home') {
      selectedSection.value = section;
    }
  }

  return {
    selectedCategory,
    selectedBrand,
    searchQuery,
    selectedSection,
    products,
    filteredProducts,
    setCategory,
    setBrand,
    setSearchQuery,
    setSelectedSection
  }
}

export default {
  state: {
    selectedSection: 'video'
  },
  
  mutations: {
    setSelectedSection(state: any, section: string) {
      console.log(`[DEBUG] Store: Установка выбранной секции: ${section}`);
      if (section === 'video' || section === 'smart-home') {
        state.selectedSection = section;
      }
    },
    
    setCategoryFilter(state: any, category: string) {
      // Реализация установки категории
    }
  }
} 