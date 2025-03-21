import {
  ref,
  computed,
  reactive,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  toRef,
  toRefs,
  provide,
  inject,
  readonly,
  getCurrentInstance,
  type Ref,
  type ComputedRef,
  type WatchStopHandle,
  type ComponentInternalInstance,
  useAttrs,
  useSlots
} from '@vue/runtime-dom'

// Переэкспорт для использования в компонентах
export {
  ref,
  computed,
  reactive,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  toRef,
  toRefs,
  provide,
  inject,
  readonly,
  getCurrentInstance,
  useAttrs,
  useSlots
}

// Экспорт типов
export type {
  Ref,
  ComputedRef,
  WatchStopHandle,
  ComponentInternalInstance
} 