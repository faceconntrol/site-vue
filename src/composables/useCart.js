import { ref, onMounted } from 'vue';

// Константа для ключа корзины
export const CART_KEY = 'shopping-cart';

export function useCart() {
  const cartItems = ref([]);
  
  // Загрузка корзины при инициализации
  onMounted(() => {
    loadCart();
  });
  
  // Загрузка корзины из localStorage
  function loadCart() {
    const cartData = localStorage.getItem(CART_KEY);
    if (cartData) {
      try {
        cartItems.value = JSON.parse(cartData);
      } catch (e) {
        console.error('Ошибка при загрузке корзины:', e);
        cartItems.value = [];
      }
    }
  }
  
  // Сохранение корзины в localStorage
  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems.value));
    
    // Отправляем событие для синхронизации корзины между компонентами
    const event = new CustomEvent('cart-updated', { detail: cartItems.value });
    window.dispatchEvent(event);
  }
  
  // Добавление товара в корзину
  function addToCart(product) {
    if (!product) return;
    
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price || 0,
      image: product.image || '',
      quantity: 1
    };
    
    const existingItem = cartItems.value.find(item => item.id === cartItem.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push(cartItem);
    }
    
    saveCart();
  }
  
  // Удаление товара из корзины
  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
    saveCart();
  }
  
  return {
    cartItems,
    loadCart,
    addToCart,
    removeFromCart
  };
} 