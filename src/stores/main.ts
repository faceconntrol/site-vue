import { defineStore } from 'pinia'

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
}

export const useMainStore = defineStore('main', {
  state: () => ({
    products: [
      {
        id: 1,
        title: 'IP-камера ColorVu',
        description: 'Цветное изображение 24/7, разрешение 4МП',
        price: 12500,
        image: '/images/products/colorvu-camera.jpg',
        category: 'Камеры'
      },
      {
        id: 2,
        title: 'IP-видеорегистратор',
        description: '8 каналов, поддержка 4K, HDD 2TB',
        price: 15900,
        image: '/images/products/nvr.jpg',
        category: 'Видеорегистраторы'
      },
      {
        id: 3,
        title: 'Умный домофон',
        description: 'Wi-Fi, удаленный доступ, запись видео',
        price: 18900,
        image: '/images/products/smart-intercom.jpg',
        category: 'Умный дом'
      }
    ] as Product[]
  }),
  
  getters: {
    filteredProducts: (state) => state.products
  }
}) 