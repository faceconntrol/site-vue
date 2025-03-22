<template>
  <div class="cart-component">
    <h3 class="text-h6 mb-4">Корзина</h3>
    
    <v-alert v-if="error" type="error" class="mb-3">
      {{ error }}
    </v-alert>
    
    <div v-if="items.length === 0" class="empty-cart">
      <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
      <p class="text-subtitle-1 text-center mt-2">Ваша корзина пуста</p>
    </div>
    
    <v-list v-else lines="two">
      <v-list-item v-for="item in items" :key="item.id" class="mb-2">
        <template v-slot:prepend>
          <v-avatar size="48" rounded>
            <v-img :src="item.image" cover></v-img>
          </v-avatar>
        </template>
        
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ formatPrice(item.price) }} ₽ × {{ item.quantity }}
        </v-list-item-subtitle>
        
        <template v-slot:append>
          <div class="d-flex align-center">
            <v-btn icon variant="text" density="compact" @click="removeItem(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>
    
    <div v-if="items.length > 0" class="cart-summary mt-4">
      <div class="d-flex justify-space-between">
        <span class="text-subtitle-1">Итого:</span>
        <span class="text-h6">{{ formatPrice(totalPrice) }} ₽</span>
      </div>
      <v-btn color="primary" block class="mt-4">Оформить заказ</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const items = ref([]);
const error = ref(null);

// Загрузка товаров из localStorage
function loadCartItems() {
  try {
    const cartData = localStorage.getItem('cart');
    console.log('Загрузка данных корзины:', cartData);
    
    if (cartData) {
      items.value = JSON.parse(cartData);
    } else {
      items.value = [];
    }
  } catch (e) {
    console.error('Ошибка при загрузке корзины:', e);
    error.value = 'Не удалось загрузить корзину: ' + e.message;
    items.value = [];
  }
}

// Удаление товара из корзины
function removeItem(item) {
  try {
    const index = items.value.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items.value.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(items.value));
    }
  } catch (e) {
    console.error('Ошибка при удалении товара:', e);
    error.value = 'Не удалось удалить товар: ' + e.message;
  }
}

// Форматирование цены
function formatPrice(price) {
  if (!price) return '0';
  return new Intl.NumberFormat('ru-RU').format(price);
}

// Вычисление общей стоимости корзины
const totalPrice = computed(() => {
  return items.value.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return total + (price * quantity);
  }, 0);
});

// Загружаем товары при монтировании компонента
onMounted(() => {
  loadCartItems();
  
  // Добавляем слушатель события для обновления корзины
  window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
      loadCartItems();
    }
  });
});
</script>

<style scoped>
.cart-component {
  max-width: 600px;
  margin: 0 auto;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: #888;
}
</style> 