import { ref, computed } from 'vue'
import type { Product } from '@/types/store'
import { defineStore } from 'pinia'
import { INSTALLATION_COSTS } from '@/constants'

interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    includeInstallation: false
  }),

  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    totalAmount: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.product.price * item.quantity
      }, 0)
    },

    subtotal: (state) => {
      return state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    },

    installationCost: (state) => {
      if (!state.includeInstallation) return 0
      
      return state.items.reduce((sum, item) => {
        let cost = 0
        if (item.product.category === 'camera') {
          cost = (
            INSTALLATION_COSTS.mountingBox +
            INSTALLATION_COSTS.cameraInstall +
            INSTALLATION_COSTS.cameraSetup +
            INSTALLATION_COSTS.commissioning
          ) * item.quantity
        } else if (item.product.category === 'recorder') {
          cost = INSTALLATION_COSTS.nvrInstall + INSTALLATION_COSTS.nvrSetup
        }
        return sum + cost
      }, 0)
    },

    total: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      if (!state.includeInstallation) return subtotal
      
      const installation = state.items.reduce((sum, item) => {
        let cost = 0
        if (item.product.category === 'camera') {
          cost = (
            INSTALLATION_COSTS.mountingBox +
            INSTALLATION_COSTS.cameraInstall +
            INSTALLATION_COSTS.cameraSetup +
            INSTALLATION_COSTS.commissioning
          ) * item.quantity
        } else if (item.product.category === 'recorder') {
          cost = INSTALLATION_COSTS.nvrInstall + INSTALLATION_COSTS.nvrSetup
        }
        return sum + cost
      }, 0)
      
      return subtotal + installation
    }
  },

  actions: {
    addItem(product: Product) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },

    removeItem(productId: string) {
      const index = this.items.findIndex(item => item.product.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(productId: string, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(productId)
        return
      }
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.items = []
    },

    toggleInstallation() {
      this.includeInstallation = !this.includeInstallation
      console.log('Installation toggled:', this.includeInstallation)
    }
  },

  persist: {
    key: 'cart',
    paths: ['items', 'includeInstallation']
  }
})