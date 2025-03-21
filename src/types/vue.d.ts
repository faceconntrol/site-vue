// Определение глобального пространства имен Vue
import * as Vue from 'vue'

declare global {
  interface Window {
    Vue: typeof Vue
    ymaps: any
  }
}

// Экспорты Vue API
declare module 'vue' {
  export const ref: typeof Vue.ref
  export const computed: typeof Vue.computed
  export const reactive: typeof Vue.reactive
  export const watch: typeof Vue.watch
  export const watchEffect: typeof Vue.watchEffect
  export const onMounted: typeof Vue.onMounted
  export const onUnmounted: typeof Vue.onUnmounted
  export const onBeforeUnmount: typeof Vue.onBeforeUnmount
  export const onActivated: typeof Vue.onActivated
  export const onDeactivated: typeof Vue.onDeactivated
  export const getCurrentInstance: typeof Vue.getCurrentInstance
  export const inject: typeof Vue.inject
  export const provide: typeof Vue.provide
  export const readonly: typeof Vue.readonly
  export const toRef: typeof Vue.toRef
  export const toRefs: typeof Vue.toRefs
  export const useAttrs: typeof Vue.useAttrs
  export const useSlots: typeof Vue.useSlots
  
  // Типы
  export type Ref<T> = Vue.Ref<T>
  export type ComputedRef<T> = Vue.ComputedRef<T>
  export type WatchStopHandle = Vue.WatchStopHandle
  export type ComponentInternalInstance = Vue.ComponentInternalInstance
}

// Исправление ошибок для компонентов продукта
interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  brand: string
  specs?: string[]
  additional_info?: string
  maxResolution?: number
}

interface HddOption {
  id: number
  name: string
  size: number
  price: number
}

interface CartItem {
  product: Product
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

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $style: { [key: string]: string }
  }
} 