import { onMounted, onUnmounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Хук для анимации появления элементов
export function useFadeInAnimation(threshold = 0.1, rootMargin = '0px') {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  
  const { stop } = useIntersectionObserver(
    elementRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold, rootMargin }
  )
  
  return { elementRef, isVisible }
}

// Хук для анимации параллакса
export function useParallax(factor = 0.2) {
  const elementRef = ref<HTMLElement | null>(null)
  const offset = ref(0)
  
  const handleScroll = () => {
    if (!elementRef.value) return
    
    const rect = elementRef.value.getBoundingClientRect()
    const scrollPos = window.scrollY
    const elementPos = rect.top + scrollPos
    const distance = scrollPos - elementPos
    
    offset.value = distance * factor
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  
  return { elementRef, offset }
}

export function useVisualEffects() {
  const isNotificationVisible = ref(false);
  const notificationMessage = ref('');
  const notificationTimeout = ref<number | null>(null);

  /**
   * Показывает уведомление с указанным сообщением
   * @param message Текст уведомления
   * @param duration Продолжительность показа в миллисекундах (по умолчанию 3000мс)
   */
  function showNotification(message: string, duration: number = 3000) {
    // Очищаем предыдущий таймер, если он есть
    if (notificationTimeout.value) {
      clearTimeout(notificationTimeout.value);
    }

    // Устанавливаем сообщение и показываем уведомление
    notificationMessage.value = message;
    isNotificationVisible.value = true;

    // Устанавливаем таймер скрытия
    notificationTimeout.value = window.setTimeout(() => {
      isNotificationVisible.value = false;
      notificationTimeout.value = null;
    }, duration);
    
    console.log('Показано уведомление:', message);
  }

  return {
    isNotificationVisible,
    notificationMessage,
    showNotification
  };
} 