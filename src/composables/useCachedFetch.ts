import { ref, type Ref } from 'vue'
import { cacheService } from '@/services/cache'

interface UseCachedFetchOptions {
  ttl?: number
  immediate?: boolean
}

export function useCachedFetch<T>(
  url: string,
  options: UseCachedFetchOptions = {}
) {
  const data: Ref<T | null> = ref(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      // Проверяем кэш
      const cached = cacheService.get(url, { ttl: options.ttl })
      if (cached) {
        data.value = cached
        loading.value = false
        return
      }

      // Делаем запрос
      const response = await fetch(url)
      if (!response.ok) throw new Error('Network response was not ok')
      
      const json = await response.json()
      data.value = json

      // Кэшируем результат
      cacheService.set(url, json, { ttl: options.ttl })
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  if (options.immediate !== false) {
    execute()
  }

  return {
    data,
    error,
    loading,
    execute,
  }
} 