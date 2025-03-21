// Определения для недостающих типов

interface HddOption {
  id: string
  name: string
  size: number
  price: number
  title?: string
  capacity?: number
}

interface CartItem {
  product: import('../data/catalog').Product
  quantity: number
}

interface UserProfile {
  name: string
  email: string
  phone: string
}

interface Category {
  id: string
  name: string
}

interface Filter {
  id: string
  name: string
  values: string[]
}

// Расширение компонентных свойств Vue
declare module 'vue' {
  interface ComponentCustomProperties {
    $style: { [key: string]: string }
  }
}

// Глобальные объявления для сторонних библиотек
declare global {
  interface Window {
    ymaps: any
  }
} 