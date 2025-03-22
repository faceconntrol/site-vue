import { defineStore } from 'pinia'

// Используем константу для ключа корзины
const CART_KEY = 'shopping-cart';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  
  // Инициализация корзины при создании хранилища
  actions: {
    initialize() {
      const cartData = localStorage.getItem(CART_KEY);
      if (cartData) {
        try {
          this.items = JSON.parse(cartData);
        } catch (e) {
          console.error('Ошибка при загрузке корзины из localStorage:', e);
        }
      }
    },
    
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
      
      // Сохраняем в localStorage с использованием единого ключа
      localStorage.setItem(CART_KEY, JSON.stringify(this.items))
    },
    
    // Другие методы для работы с корзиной
  }
}) 