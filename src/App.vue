<script setup lang="ts">
import Header from '@/components/Header.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import { useHead } from 'unhead'
import { computed, onErrorCaptured } from 'vue'

const currentPage = computed(() => {
  // Implement the logic to determine the current page
  return {
    value: 'Home',
    description: 'Description of the home page',
    title: 'Home | Третий глаз',
    image: 'https://example.com/home-image.jpg'
  }
})

useHead({
  title: computed(() => `${currentPage.value} | Третий глаз`),
  meta: [
    { name: 'description', content: computed(() => currentPage.value.description) },
    { property: 'og:title', content: computed(() => currentPage.value.title) },
    { property: 'og:description', content: computed(() => currentPage.value.description) },
    { property: 'og:image', content: computed(() => currentPage.value.image) }
  ]
})

onErrorCaptured((err, instance, info) => {
  console.error('Caught error:', err)
  // Можно добавить отправку ошибок в систему мониторинга
  return false
})
</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <ScrollToTop />
  </v-app>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
}

:root {
  --primary-color: #000000;
  --secondary-color: #333333;
  --accent-color: #666666;
  --bg-color: #FFFFFF;
  --text-color: #1A1A1A;
  --section-padding: 80px 0;
  --container-width: 1200px;
  --header-height: 80px;
}
</style>
