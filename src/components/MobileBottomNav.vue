<template>
  <v-bottom-navigation
    color="primary"
    class="mobile-bottom-nav"
    grow
    fixed
  >
    <v-btn value="home" to="/">
      <v-icon>mdi-home</v-icon>
      <span>Главная</span>
    </v-btn>
    
    <v-btn value="mobile-catalog" to="/mobile-catalog">
      <v-icon>mdi-view-grid</v-icon>
      <span>Каталог</span>
    </v-btn>
    
    <v-btn value="calculator" to="/calculator">
      <v-icon>mdi-calculator</v-icon>
      <span>Калькулятор</span>
    </v-btn>
    
    <!-- Заменяем кнопку корзины на кнопку контактов -->
    <v-btn value="contact" to="/contact">
      <v-icon>mdi-phone</v-icon>
      <span>Контакты</span>
    </v-btn>
    
    <!-- Добавляем кнопку "Еще" для доступа к дополнительным разделам -->
    <v-btn @click="showMoreMenu = true">
      <v-icon>mdi-dots-horizontal</v-icon>
      <span>Еще</span>
    </v-btn>
  </v-bottom-navigation>
  
  <!-- Меню с дополнительными разделами -->
  <v-bottom-sheet v-model="showMoreMenu" class="more-menu-sheet">
    <v-card class="more-menu-card">
      <v-card-title class="d-flex align-center">
        Дополнительно
        <v-spacer></v-spacer>
        <v-btn icon @click="showMoreMenu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <v-divider></v-divider>
      
      <v-list>
        <v-list-item to="/technologies" @click="showMoreMenu = false">
          <template v-slot:prepend>
            <v-icon>mdi-atom</v-icon>
          </template>
          <v-list-item-title>Технологии</v-list-item-title>
        </v-list-item>
        
        <v-list-item to="/solutions" @click="showMoreMenu = false">
          <template v-slot:prepend>
            <v-icon>mdi-package-variant-closed</v-icon>
          </template>
          <v-list-item-title>Решения</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CART_KEY } from '@/composables/useCart';

const showMoreMenu = ref(false);
const cartItemsCount = ref(0);

// Используем глобальную переменную состояния мобильного устройства
const isMobile = computed(() => {
  return document.body.classList.contains('mobile-device');
});

function updateCartCount() {
  const cartData = localStorage.getItem(CART_KEY);
  if (cartData) {
    try {
      const cart = JSON.parse(cartData);
      cartItemsCount.value = cart.reduce((total, item) => total + item.quantity, 0);
    } catch (e) {
      console.error('Ошибка при чтении корзины:', e);
      cartItemsCount.value = 0;
    }
  } else {
    cartItemsCount.value = 0;
  }
}

onMounted(() => {
  console.log('MobileBottomNav загружен, мобильная версия:', isMobile.value);
  updateCartCount();
  window.addEventListener('cart-updated', updateCartCount);
});
</script>

<style scoped>
.mobile-bottom-nav {
  z-index: 100;
}

.more-menu-card {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.ios-device .more-menu-card {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.v-bottom-navigation :deep(.v-btn) {
  min-width: 0 !important;
}
</style> 