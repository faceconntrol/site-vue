import { ref, computed } from '@vue/runtime-dom'
import type { Product } from '@/types/store'
import { productsDB } from '@/data/catalog'

const selectedCategory = ref('')
const selectedBrand = ref('')
const searchQuery = ref('')

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
    selectedCategory.value = category
  }

  const setBrand = (brand: string) => {
    selectedBrand.value = brand
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    selectedCategory,
    selectedBrand,
    searchQuery,
    products,
    filteredProducts,
    setCategory,
    setBrand,
    setSearchQuery
  }
} 