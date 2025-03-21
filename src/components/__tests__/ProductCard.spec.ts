import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../ProductCard.vue'
import { productsDB } from '@/data/catalog'

// Мок для продукта
const mockProduct = Object.values(productsDB)[0]

describe('ProductCard', () => {
  it('renders product title correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
        isColorVuCamera: false,
        isAcuSenseCamera: false
      },
      global: {
        stubs: ['v-card', 'v-card-item', 'v-card-title', 'v-card-subtitle', 
                'v-card-text', 'v-btn', 'v-dialog', 'LazyImage']
      }
    })
    
    // Проверяем, что заголовок продукта отображается
    expect(wrapper.text()).toContain(mockProduct.title)
  })
  
  it('shows ColorVu badge when isColorVuCamera is true', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
        isColorVuCamera: true,
        isAcuSenseCamera: false
      },
      global: {
        stubs: ['v-card', 'v-card-item', 'v-card-title', 'v-card-subtitle', 
                'v-card-text', 'v-btn', 'v-dialog', 'LazyImage', 'v-tooltip']
      }
    })
    
    // Проверяем наличие лейбла ColorVu
    expect(wrapper.find('.colorvu-badge').exists()).toBe(true)
  })
  
  it('emits event when "Подробнее" button is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      },
      global: {
        stubs: ['v-card', 'v-card-item', 'v-card-title', 'v-card-subtitle', 
                'v-card-text', 'v-btn', 'v-dialog', 'LazyImage']
      }
    })
    
    // Симулируем клик по кнопке
    await wrapper.find('v-btn-stub').trigger('click')
    
    // Проверяем, что диалог открылся
    expect(wrapper.vm.dialog).toBe(true)
  })
}) 