<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  placeholder?: string;
}>()

const imageLoaded = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

// Генерация URL для WebP если поддерживается
const webpSrc = computed(() => {
  // Проверяем, является ли это уже WebP
  if (props.src.endsWith('.webp')) return props.src
  
  // Иначе, заменяем расширение на .webp
  const dotIndex = props.src.lastIndexOf('.')
  if (dotIndex === -1) return props.src // нет расширения
  
  return `${props.src.substring(0, dotIndex)}.webp`
})

// Определение размера изображения
const dimensions = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) style.width = `${props.width}px`
  if (props.height) style.height = `${props.height}px`
  return style
})

// Загрузка изображения
const onImageLoad = () => {
  imageLoaded.value = true
}

// Настройка IntersectionObserver для ленивой загрузки
onMounted(() => {
  if (!props.lazy || !imgRef.value) return
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (imgRef.value) {
        // Загружаем изображение только когда оно видимо
        imgRef.value.src = props.src
        observer.disconnect()
      }
    }
  })
  
  observer.observe(imgRef.value)
})
</script>

<template>
  <div class="optimized-image" :style="dimensions">
    <picture>
      <!-- WebP версия -->
      <source :srcset="imageLoaded || !lazy ? webpSrc : ''" type="image/webp" />
      <!-- Оригинальная версия -->
      <img 
        ref="imgRef"
        :src="lazy ? (placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=') : src"
        :alt="alt"
        @load="onImageLoad"
        :class="{ 'loaded': imageLoaded }"
      />
    </picture>
    <!-- Скелетон пока изображение загружается -->
    <div v-if="!imageLoaded" class="skeleton"></div>
  </div>
</template>

<style scoped>
.optimized-image {
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

img.loaded {
  opacity: 1;
}

.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style> 