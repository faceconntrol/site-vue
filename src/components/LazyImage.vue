<template>
  <div class="lazy-image" :style="{ paddingBottom: aspect ? aspect + '%' : '75%' }">
    <img
      ref="imgRef"
      :src="lazy ? placeholder : src"
      :alt="alt"
      @load="onLoad"
      :class="{ 'lazy-image__img': true, 'lazy-image__img--loaded': loaded }"
      loading="lazy"
    />
    <div v-if="!loaded" class="lazy-image__skeleton"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  src: string;
  alt: string;
  aspect?: number; // Соотношение сторон в процентах (высота/ширина * 100)
  lazy?: boolean;
  placeholder?: string;
}>(), {
  aspect: 75,
  lazy: true,
  placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4='
})

const loaded = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

const onLoad = () => {
  loaded.value = true
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

<style scoped>
.lazy-image {
  position: relative;
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.lazy-image__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy-image__img--loaded {
  opacity: 1;
}

.lazy-image__skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style> 