<template>
  <div class="cart-page">
    <v-container>
      <h1 class="text-h4 mb-6">Корзина</h1>
      
      <div v-if="isEmpty" class="empty-cart">
        <v-icon size="80" class="mb-4">mdi-cart-off</v-icon>
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары из каталога, чтобы продолжить покупки</p>
        <v-btn 
          color="primary" 
          :to="isMobile ? '/mobile-catalog' : '/products'" 
          class="mt-4"
        >
          Перейти в каталог
        </v-btn>
      </div>
      
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <div class="quantity-controls">
                <v-btn small icon @click="decrementQuantity(item.id)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="quantity">{{ item.quantity }}</span>
                <v-btn small icon @click="incrementQuantity(item.id)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="item-price">
              <div class="price">{{ formatPrice(item.price * item.quantity) }}</div>
              <v-btn icon small @click="removeItem(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        
        <div class="cart-summary">
          <div class="d-flex justify-space-between align-center mb-4">
            <div class="subtitle-1">Итого:</div>
            <div class="title">{{ formatPrice(totalPrice) }}</div>
          </div>
          
          <v-btn block color="primary" class="mb-2">Оформить заказ</v-btn>
          <v-btn block variant="outlined" @click="clearCart">Очистить корзину</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { cartService } from '@/services/cartService';

// Состояние корзины
const cartItems = ref(cartService.loadCart());
const isEmpty = computed(() => cartItems.value.length === 0);
const totalPrice = computed(() => cartService.getTotalPrice());

// Определение мобильной версии
const isMobile = ref(false);

// Обновление корзины при монтировании
onMounted(() => {
  console.log('Страница корзины инициализирована');
  cartItems.value = cartService.loadCart();
  console.log('Текущие товары в корзине:', cartItems.value);
  
  // Проверяем, является ли устройство мобильным по классу на body
  isMobile.value = document.body.classList.contains('mobile-device');
  console.log('Мобильная версия:', isMobile.value);
  
  // Слушаем обновления корзины
  window.addEventListener('cart-updated', () => {
    cartItems.value = cartService.loadCart();
  });
});

// Функция форматирования цены
function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);
}

// Функции управления корзиной
function removeItem(itemId) {
  cartItems.value = cartService.removeItem(itemId);
}

function incrementQuantity(itemId) {
  const item = cartItems.value.find(i => i.id === itemId);
  if (item) {
    cartItems.value = cartService.updateQuantity(itemId, item.quantity + 1);
  }
}

function decrementQuantity(itemId) {
  const item = cartItems.value.find(i => i.id === itemId);
  if (item) {
    if (item.quantity > 1) {
      cartItems.value = cartService.updateQuantity(itemId, item.quantity - 1);
    } else {
      cartItems.value = cartService.removeItem(itemId);
    }
  }
}

function clearCart() {
  cartItems.value = cartService.clearCart();
}
</script>

<style scoped>
.cart-page {
  min-height: calc(100vh - 64px)
}

.empty-cart {
  text-align: center;
  padding: 120px 0;
}

.cart-content {
  padding: 24px 0;
}

.cart-items {
  margin-bottom: 24px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  margin-bottom: 16px;
}

.item-image {
  width: 100px;
  height: 100px;
  margin-right: 16px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin-bottom: 8px;
}

.quantity-controls {
  margin-top: 8px;
  margin-bottom: 8px;
}

.item-price {
  text-align: right;
}

.price {
  margin-right: 8px;
}

.cart-summary {
  text-align: right;
}

.subtitle-1 {
  font-size: 1.25rem;
  font-weight: 500;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style> 