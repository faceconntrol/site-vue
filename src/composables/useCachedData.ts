import { ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export function useCachedData<T>(key: string, initialValue: T, expiration = 3600000) {
  // Создаем структуру данных с метаданными о времени сохранения
  const cachedData = useLocalStorage<{ data: T; timestamp: number } | null>(key, null)
  const data = ref<T>(initialValue)
  
  // При инициализации проверяем кэш
  if (cachedData.value) {
    const now = Date.now()
    const isExpired = now - cachedData.value.timestamp > expiration
    
    if (!isExpired) {
      data.value = cachedData.value.data
    } else {
      // Если данные устарели, очищаем кэш
      cachedData.value = null
    }
  }
  
  // Отслеживаем изменения данных и обновляем кэш
  watch(data, (newData) => {
    cachedData.value = {
      data: newData,
      timestamp: Date.now()
    }
  }, { deep: true })
  
  return data
} 