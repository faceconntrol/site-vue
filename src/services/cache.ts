interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
}

export class CacheService {
  private static readonly CACHE_PREFIX = 'third-eye_'
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 часа

  static set(key: string, data: any): void {
    const item = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(this.CACHE_PREFIX + key, JSON.stringify(item))
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(this.CACHE_PREFIX + key)
    if (!item) return null

    const parsed = JSON.parse(item)
    if (Date.now() - parsed.timestamp > this.CACHE_DURATION) {
      localStorage.removeItem(this.CACHE_PREFIX + key)
      return null
    }

    return parsed.data as T
  }

  private storage: Map<string, { data: any; timestamp: number }> = new Map()
  private defaultTTL = 5 * 60 * 1000 // 5 минут по умолчанию

  set(key: string, data: any, options: CacheOptions = {}) {
    const timestamp = Date.now()
    this.storage.set(key, { data, timestamp })
  }

  get(key: string, options: CacheOptions = {}): any | null {
    const cached = this.storage.get(key)
    if (!cached) return null

    const ttl = options.ttl || this.defaultTTL
    const isExpired = Date.now() - cached.timestamp > ttl

    if (isExpired) {
      this.storage.delete(key)
      return null
    }

    return cached.data
  }

  clear() {
    this.storage.clear()
  }

  delete(key: string) {
    this.storage.delete(key)
  }
}

export const cacheService = new CacheService() 