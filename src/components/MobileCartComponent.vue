<template>
  <div class="mobile-cart-container">
    <v-toolbar color="primary" dark class="cart-toolbar">
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Корзина</v-toolbar-title>
    </v-toolbar>

    <div v-if="loading" class="d-flex flex-column align-center justify-center my-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <div class="mt-4">Загрузка корзины...</div>
    </div>

    <div v-else-if="cartItems.length === 0" class="empty-cart-container">
      <v-icon size="64" color="grey lighten-1">mdi-cart-outline</v-icon>
      <div class="text-h6 mt-4 text-center">Корзина пуста</div>
      <div class="text-body-2 text-center mt-2 text-grey">Добавьте товары из каталога</div>
      <v-btn 
        color="primary" 
        class="mt-6" 
        @click="goToCatalog"
        rounded
      >
        Перейти в каталог
      </v-btn>
    </div>

    <div v-else class="cart-items-container">
      <div class="text-h6 px-4 pt-4">Товары в корзине ({{ cartItems.length }})</div>
      
      <v-list class="cart-items-list">
        <v-list-item v-for="item in cartItems" :key="item.id" class="cart-item">
          <v-list-item-avatar class="cart-item-image">
            <v-img
              :src="getProductImage(item)"
              cover
              width="80"
              height="80"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="cart-item-title">{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="item.price" class="mt-1">
              {{ formatPrice(item.price) }} ₽
            </v-list-item-subtitle>
            <div class="quantity-control mt-2">
              <v-btn
                x-small
                icon
                @click="decreaseQuantity(item)"
                :disabled="item.quantity <= 1"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="quantity-display">{{ item.quantity }}</span>
              <v-btn
                x-small
                icon
                @click="increaseQuantity(item)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
              @click="removeItem(item)"
              class="remove-item-btn"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <div class="cart-summary pa-4">
        <div class="d-flex justify-space-between mb-2">
          <div class="text-subtitle-1">Всего товаров:</div>
          <div class="text-subtitle-1">{{ totalItems }}</div>
        </div>
        <div class="d-flex justify-space-between mb-4">
          <div class="text-h6">Итого:</div>
          <div class="text-h6">{{ formatPrice(totalPrice) }} ₽</div>
        </div>
        
        <v-btn 
          color="success" 
          block 
          @click="checkout"
          rounded
        >
          Оформить заказ
        </v-btn>
        
        <v-btn 
          text 
          block 
          color="primary" 
          class="mt-2"
          @click="goToCatalog"
        >
          Продолжить покупки
        </v-btn>
      </div>
    </div>
    
    <!-- Сообщение об успешном оформлении заказа -->
    <v-snackbar
      v-model="checkoutSnackbar"
      :timeout="3000"
      color="success"
      bottom
    >
      Заказ успешно оформлен!
    </v-snackbar>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { productsDB } from '@/data/catalog';

export default {
  name: 'MobileCartComponent',
  
  setup() {
    console.log('Инициализация мобильной корзины');
    
    const CART_KEY = 'shopping-cart'; // Используем такой же ключ, как в ProductDetails.vue
    const router = useRouter();
    const loading = ref(true);
    const cartItems = ref([]);
    const checkoutSnackbar = ref(false);
    
    // Загрузка товаров из localStorage
    const loadCartItems = () => {
      console.log('Загрузка корзины из localStorage...');
      loading.value = true;
      
      try {
        const savedCart = localStorage.getItem(CART_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          console.log('Загруженные данные корзины:', parsedCart);
          
          // Загрузка полной информации о товарах
          const products = productsDB;
          
          // Добавление дополнительной информации из базы продуктов
          cartItems.value = parsedCart.map(item => {
            const productInfo = products.find(p => p.id.toLowerCase() === item.id.toLowerCase());
            
            if (productInfo) {
              console.log('Найдена информация о товаре:', productInfo.title);
              return {
                ...item,
                title: productInfo.title || item.title,
                price: productInfo.price || item.price,
                image: productInfo.image || item.image
              };
            }
            
            return item;
          });
          
          console.log('Обработанные товары в корзине:', cartItems.value);
        } else {
          console.log('Корзина пуста');
          cartItems.value = [];
        }
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
        cartItems.value = [];
      }
      
      loading.value = false;
    };
    
    // Сохранение корзины в localStorage
    const saveCart = () => {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems.value));
        console.log('Корзина сохранена:', cartItems.value);
        
        // Отправляем событие обновления корзины
        const cartUpdateEvent = new CustomEvent('cart-updated', {
          detail: { timestamp: new Date().getTime() }
        });
        window.dispatchEvent(cartUpdateEvent);
        
        // Дополнительно синхронизируем между вкладками
        const tempKey = '_temp_cart_update_';
        localStorage.setItem(tempKey, Date.now().toString());
        localStorage.removeItem(tempKey);
      } catch (error) {
        console.error('Ошибка при сохранении корзины:', error);
      }
    };
    
    // Обработчики действий с товарами
    const increaseQuantity = (item) => {
      item.quantity++;
      saveCart();
    };
    
    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        item.quantity--;
        saveCart();
      }
    };
    
    const removeItem = (item) => {
      cartItems.value = cartItems.value.filter(i => i.id !== item.id);
      saveCart();
    };
    
    // Переход в каталог
    const goToCatalog = () => {
      console.log('Переход в мобильный каталог');
      router.push('/mobile-catalog'); // Важно: используем правильный путь
    };
    
    // Оформление заказа
    const checkout = () => {
      // Здесь будет логика оформления заказа
      checkoutSnackbar.value = true;
      
      // Очищаем корзину после оформления заказа
      cartItems.value = [];
      saveCart();
      
      // После оформления заказа можно перенаправить на страницу благодарности
      setTimeout(() => {
        // router.push('/thank-you');
      }, 2000);
    };
    
    // Получение изображения товара
    const getProductImage = (item) => {
      if (!item.image) return '/images/placeholder.jpg';
      
      // Проверяем, начинается ли путь с "/"
      if (item.image.startsWith('/')) {
        return item.image;
      } else {
        return '/' + item.image;
      }
    };
    
    // Форматирование цены
    const formatPrice = (price) => {
      if (!price) return '0';
      return new Intl.NumberFormat('ru-RU').format(price);
    };
    
    // Вычисляемые свойства
    const totalItems = computed(() => {
      return cartItems.value.reduce((acc, item) => acc + (item.quantity || 1), 0);
    });
    
    const totalPrice = computed(() => {
      return cartItems.value.reduce((acc, item) => {
        return acc + ((item.price || 0) * (item.quantity || 1));
      }, 0);
    });
    
    // Обработчик события обновления корзины
    const handleCartUpdate = (event) => {
      console.log('Получено событие обновления корзины:', event);
      loadCartItems();
    };
    
    // Жизненный цикл компонента
    onMounted(() => {
      console.log('Компонент корзины смонтирован');
      loadCartItems();
      
      // Подписываемся на события обновления корзины
      window.addEventListener('cart-updated', handleCartUpdate);
      window.addEventListener('storage', (event) => {
        if (event.key === CART_KEY || event.key === '_temp_cart_update_') {
          console.log('Событие storage корзины:', event);
          loadCartItems();
        }
      });
    });
    
    onBeforeUnmount(() => {
      // Отписываемся от событий
      window.removeEventListener('cart-updated', handleCartUpdate);
    });
    
    return {
      loading,
      cartItems,
      checkoutSnackbar,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      goToCatalog,
      checkout,
      getProductImage,
      formatPrice,
      totalItems,
      totalPrice
    };
  }
};
</script>

<style scoped>
.mobile-cart-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.cart-toolbar {
  flex-shrink: 0;
}

.empty-cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.cart-items-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart-items-list {
  background-color: white;
  margin: 0.5rem 0;
}

.cart-item {
  border-bottom: 1px solid #f0f0f0;
  padding: 12px;
}

.cart-item-image {
  margin-right: 16px;
  border-radius: 8px;
  overflow: hidden;
}

.cart-item-title {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 4px;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-display {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
}

.cart-summary {
  background-color: white;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  margin-top: auto;
}

.remove-item-btn {
  color: #ff5252;
}
</style> 