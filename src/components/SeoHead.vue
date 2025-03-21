<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed } from 'vue'

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  url?: string;
}

const props = withDefaults(defineProps<SeoProps>(), {
  title: 'Системы видеонаблюдения',
  description: 'Профессиональные системы видеонаблюдения Hikvision и HiWatch для бизнеса и дома',
  keywords: 'видеонаблюдение, камеры, регистраторы, hikvision, hiwatch',
  image: '/images/logo.png',
  type: 'website',
  url: 'https://yoursite.ru'
})

const fullTitle = computed(() => `${props.title} | Третий Глаз - системы видеонаблюдения`)

useHead({
  title: fullTitle,
  meta: [
    { name: 'description', content: props.description },
    { name: 'keywords', content: props.keywords },
    // Open Graph
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.image },
    { property: 'og:url', content: props.url },
    { property: 'og:type', content: props.type },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: props.title },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: props.image }
  ]
})
</script>

<template>
  <!-- Компонент не имеет визуального представления -->
</template> 