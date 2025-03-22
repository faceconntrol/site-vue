<script setup lang="ts">
import Header from '@/components/Header.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import MobileHeader from '@/components/MobileHeader.vue'
import MobileBottomNav from '@/components/MobileBottomNav.vue'
import { useHead } from '@vueuse/head'
import { computed, onMounted, ref } from 'vue'
// Импортируем onErrorCaptured из композиционного API Vue
import { onErrorCaptured } from '@vue/runtime-core'
import Notification from '@/components/Notification.vue'
import { useVisualEffects } from '@/composables/useVisualEffects'

// Инициализируем определение мобильной платформы временным решением
// пока исправляем проблему с импортом
const isMobile = ref(false);
const isIOS = ref(false);

// Определяем мобильную платформу непосредственно здесь
onMounted(() => {
  console.log('========= MOBILE DEBUG INFO =========');
  console.log('Device Pixel Ratio:', window.devicePixelRatio);
  console.log('User Agent:', navigator.userAgent);
  console.log('Window Dimensions:', window.innerWidth + 'x' + window.innerHeight);
  console.log('Screen Dimensions:', window.screen.width + 'x' + window.screen.height);
  console.log('====================================');
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
  const isAndroidDevice = /android/i.test(userAgent);
  
  // Проверка только по размеру окна
  const windowWidth = window.innerWidth;
  console.log('Window width check:', windowWidth);
  
  // Принудительно применяем мобильные стили если ширина меньше 768px
  if (windowWidth <= 768) {
    document.body.classList.add('mobile-device');
    isMobile.value = true;
    
    // Принудительно добавляем класс для iOS-подобного дизайна, пока тестируем
    document.body.classList.add('ios-device');
    isIOS.value = true;
    console.log('Mobile device detected by width, added classes');
  }
  
  // Установка переменной для правильной высоты на мобильных
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  
  // Обработчик изменения размера экрана
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    if (newWidth <= 768 && !isMobile.value) {
      document.body.classList.add('mobile-device');
      document.body.classList.add('ios-device');
      isMobile.value = true;
      isIOS.value = true;
    } else if (newWidth > 768 && isMobile.value) {
      document.body.classList.remove('mobile-device');
      document.body.classList.remove('ios-device');
      isMobile.value = false;
      isIOS.value = false;
    }
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  });
});

const currentPage = computed(() => {
  // Implement the logic to determine the current page
  return {
    value: 'Home',
    description: 'Description of the home page',
    title: 'Home | Третий глаз',
    image: 'https://example.com/home-image.jpg'
  }
})

// useHead({
//   title: computed(() => `${currentPage.value} | Третий глаз`),
//   meta: [
//     { name: 'description', content: computed(() => currentPage.value.description) },
//     { property: 'og:title', content: computed(() => currentPage.value.title) },
//     { property: 'og:description', content: computed(() => currentPage.value.description) },
//     { property: 'og:image', content: computed(() => currentPage.value.image) }
//   ]
// })

useHead({
  title: 'Система видеонаблюдения',
  meta: [
    { name: 'description', content: 'Профессиональные системы видеонаблюдения' }
  ]
})

const { isNotificationVisible, notificationMessage } = useVisualEffects()

onErrorCaptured((err, instance, info) => {
  console.error('Caught error:', err)
  // Можно добавить отправку ошибок в систему мониторинга
  return false
})
</script>

<template>
  <v-app>
    <!-- Заменяем стандартный header на мобильный, если на мобильном устройстве -->
    <Header v-if="!isMobile" />
    <MobileHeader v-else />
    
    <v-main>
      <router-view v-slot="{ Component }">
        <transition 
          :name="isMobile ? 'page-transition' : 'fade'" 
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    
    <!-- Добавляем нижнюю навигацию для мобильных устройств -->
    <MobileBottomNav v-if="isMobile" />
    
    <ScrollToTop v-if="!isMobile" />
    
    <!-- Добавьте компонент уведомлений -->
    <Notification 
      :visible="isNotificationVisible" 
      :message="notificationMessage" 
    />
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
