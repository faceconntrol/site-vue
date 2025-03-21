import { useHead } from '@vueuse/head'

interface MetaOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
}

export function useMeta(options: MetaOptions) {
  const defaultTitle = 'Третий Глаз - Системы видеонаблюдения'
  const defaultDescription = 'Профессиональные системы видеонаблюдения и умный дом. Продажа, установка и обслуживание.'
  
  useHead({
    title: options.title ? `${options.title} | ${defaultTitle}` : defaultTitle,
    meta: [
      {
        name: 'description',
        content: options.description || defaultDescription
      },
      {
        name: 'keywords',
        content: options.keywords || 'видеонаблюдение, камеры, безопасность, умный дом'
      },
      {
        property: 'og:title',
        content: options.title || defaultTitle
      },
      {
        property: 'og:description',
        content: options.description || defaultDescription
      },
      {
        property: 'og:image',
        content: options.image || '/images/og-image.jpg'
      }
    ]
  })
} 