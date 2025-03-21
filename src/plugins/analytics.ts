import type { Router } from 'vue-router'

declare global {
  interface Window {
    ym: (counterId: number, method: string, ...args: any[]) => void;
  }
}

export function initYandexMetrika(router: Router, counterId: number) {
  // Добавление скрипта Яндекс.Метрики
  const script = document.createElement('script')
  script.async = true
  script.src = `https://mc.yandex.ru/metrika/tag.js`
  
  script.onload = () => {
    // Инициализация счетчика
    window.ym(counterId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    })
    
    // Отслеживание изменения маршрутов
    router.afterEach((to) => {
      window.ym(counterId, 'hit', to.fullPath)
    })
  }
  
  document.head.appendChild(script)
} 