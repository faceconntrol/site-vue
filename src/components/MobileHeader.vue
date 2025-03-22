<template>
  <div v-if="isMobileDevice" class="mobile-header">
    <!-- Статус бар -->
    <div class="status-bar"></div>
    
    <v-app-bar flat class="mobile-app-bar">
      <v-app-bar-nav-icon 
        v-if="showBackButton" 
        @click="$router.back()"
      >
        <v-icon>{{ isIOSDevice ? 'mdi-chevron-left' : 'mdi-arrow-left' }}</v-icon>
      </v-app-bar-nav-icon>
      
      <v-app-bar-nav-icon
        v-else
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      
      <!-- Добавляем логотип в мобильную шапку -->
      <img 
        v-if="!showBackButton" 
        src="/favicon-32x32.png" 
        alt="Третий глаз" 
        class="mobile-logo mx-2"
      />
      
      <v-app-bar-title>{{ title }}</v-app-bar-title>
      
      <!-- Добавляем кнопку корзины в верхний правый угол -->
      <v-btn icon to="/cart">
        <v-badge
          :content="cartItemsCount"
          :model-value="cartItemsCount > 0"
          color="error"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    
    <!-- Обновленное боковое меню с группировкой -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      class="mobile-drawer"
    >
      <v-list>
        <v-list-item prepend-avatar="/favicon-32x32.png" class="drawer-header">
          <v-list-item-title class="font-weight-bold">Третий глаз</v-list-item-title>
          <v-list-item-subtitle>Системы безопасности</v-list-item-subtitle>
        </v-list-item>
        
        <v-divider class="my-2"></v-divider>
        
        <!-- Основная навигация -->
        <v-list-item to="/" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-home</v-icon>
          </template>
          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>
        
        <!-- Каталог -->
        <v-list-item to="/products" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-camera</v-icon>
          </template>
          <v-list-item-title>Каталог</v-list-item-title>
        </v-list-item>
        
        <!-- Калькулятор -->
        <v-list-item to="/calculator" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-calculator</v-icon>
          </template>
          <v-list-item-title>Калькулятор</v-list-item-title>
        </v-list-item>
        
        <!-- Корзина -->
        <v-list-item to="/cart" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-cart</v-icon>
          </template>
          <v-list-item-title>Корзина</v-list-item-title>
          <v-list-item-subtitle v-if="cartItemsCount > 0">
            {{ cartItemsCount }} товаров
          </v-list-item-subtitle>
        </v-list-item>
        
        <v-divider class="my-2"></v-divider>
        
        <!-- Дополнительные разделы -->
        <v-list-item to="/technologies" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-atom</v-icon>
          </template>
          <v-list-item-title>Технологии</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/solutions" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-package-variant-closed</v-icon>
          </template>
          <v-list-item-title>Решения</v-list-item-title>
        </v-list-item>
        
        <!-- Добавляем пункт меню Контакты -->
        <v-list-item to="/contact" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-phone</v-icon>
          </template>
          <v-list-item-title>Контакты</v-list-item-title>
        </v-list-item>
      </v-list>
      
      <template v-slot:append>
        <!-- Удаляем кнопку, так как страницы request-call не существует -->
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { cartService } from '@/services/cartService';

const route = useRoute();
const drawer = ref(false);
const isMobileDevice = ref(false);
const isIOSDevice = ref(false);
const cartItemsCount = ref(0);

function updateCartCount() {
  cartItemsCount.value = cartService.getItemCount();
}

onMounted(() => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Проверка размера окна
  isMobileDevice.value = window.innerWidth <= 768;
  
  // Проверка iOS
  isIOSDevice.value = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
  
  // Слушаем изменение размера окна
  window.addEventListener('resize', () => {
    isMobileDevice.value = window.innerWidth <= 768;
  });

  // Первоначальное обновление счетчика
  updateCartCount();
  
  // Слушаем события обновления корзины
  window.addEventListener('cart-updated', updateCartCount);
});

// Определяем заголовок страницы
const title = computed(() => {
  switch (route.name) {
    case 'home': return 'Третий глаз';
    case 'products': return 'Каталог';
    case 'calculator': return 'Калькулятор';
    case 'cart': return 'Корзина';
    case 'technologies': return 'Технологии';
    case 'solutions': return 'Решения';
    case 'contact': return 'Контакты';
    default: return 'Третий глаз';
  }
});

// Показывать ли кнопку "назад"
const showBackButton = computed(() => {
  // Не показываем на главной странице
  return route.name !== 'home';
});
</script>

<style scoped>
.drawer-header {
  background-color: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.mobile-drawer :deep(.v-list-item--active) {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.ios-device .mobile-drawer :deep(.v-list-item--active) {
  border-radius: 8px;
  margin: 0 8px;
}

/* Стили для логотипа */
.mobile-logo {
  height: 24px;
  width: 24px;
  object-fit: contain;
  margin: 0 8px;
  padding: 2px;
}

/* Стили для аватара в боковом меню */
.v-avatar img {
  object-fit: contain;
  padding: 4px;
}
</style> 