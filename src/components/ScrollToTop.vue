<template>
  <v-fade-transition>
    <v-btn
      v-show="showButton"
      icon="mdi-arrow-up"
      color="primary"
      size="large"
      class="scroll-to-top"
      :class="{ 'bounce': isAtBottom }"
      @click="scrollToTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)
const isAtBottom = ref(false)
const scrollThreshold = 300 // Показывать кнопку после прокрутки на 300px

const checkScroll = () => {
  showButton.value = window.scrollY > scrollThreshold
  
  // Проверяем, достиг ли пользователь конца страницы
  const bottomThreshold = 50 // пикселей от конца страницы
  const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - bottomThreshold
  isAtBottom.value = isBottom
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Анимация подпрыгивания */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

/* Анимация пульсации */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--v-theme-primary), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0);
  }
}

.bounce {
  animation: bounce 2s infinite, pulse 2s infinite;
}

@media (max-width: 600px) {
  .scroll-to-top {
    bottom: 16px;
    right: 16px;
  }
}
</style> 