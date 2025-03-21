<template>
  <!-- This is an empty template, as we're using onMounted to add structured data -->
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  product: {
    id: string
    title: string
    description?: string
    image?: string
    price: number
  }
}>()

let scriptElement: HTMLElement | null = null

onMounted(() => {
  // Создаем структурированные данные JSON-LD
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': props.product.title,
    'description': props.product.description || '',
    'image': props.product.image || '',
    'offers': {
      '@type': 'Offer',
      'price': props.product.price,
      'priceCurrency': 'RUB',
      'availability': 'https://schema.org/InStock'
    }
  }

  // Создаем элемент script для JSON-LD
  scriptElement = document.createElement('script')
  scriptElement.setAttribute('type', 'application/ld+json')
  scriptElement.textContent = JSON.stringify(structuredData)
  
  // Добавляем элемент в head
  document.head.appendChild(scriptElement)
})

onBeforeUnmount(() => {
  // Удаляем элемент при размонтировании компонента
  if (scriptElement && document.head.contains(scriptElement)) {
    document.head.removeChild(scriptElement)
  }
})
</script> 