// Константы
export const CART_KEY = 'shopping-cart';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

class CartService {
  items: CartItem[] = [];
  
  constructor() {
    this.loadCart();
    
    // Слушаем события обновления корзины из разных частей приложения
    window.addEventListener('storage', (event) => {
      if (event.key === CART_KEY) {
        this.loadCart();
      }
    });
    
    window.addEventListener('cart-updated', () => {
      this.loadCart();
    });
    
    console.log('CartService initialized with items:', this.items);
  }
  
  // Загрузка корзины из localStorage
  loadCart() {
    try {
      const cartData = localStorage.getItem(CART_KEY);
      if (cartData) {
        this.items = JSON.parse(cartData);
      }
    } catch (error) {
      console.error('Ошибка при загрузке корзины:', error);
      this.items = [];
    }
    return this.items;
  }
  
  // Сохранение корзины в localStorage
  saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    
    // Отправляем событие об обновлении корзины
    const event = new CustomEvent('cart-updated');
    window.dispatchEvent(event);
    
    return this.items;
  }
  
  // Получение товаров из корзины
  getItems() {
    return this.items;
  }
  
  // Получение общего количества товаров
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
  
  // Получение общей стоимости
  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  // Проверка пустой ли корзины
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Добавление товара в корзину
  addItem(item: Omit<CartItem, 'quantity'>) {
    const existingItem = this.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...item,
        quantity: 1
      });
    }
    
    this.saveCart();
    return this.items;
  }
  
  // Удаление товара из корзины
  removeItem(itemId: string) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveCart();
    return this.items;
  }
  
  // Обновление количества товара
  updateQuantity(itemId: string, quantity: number) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(itemId);
      } else {
        this.saveCart();
      }
    }
    return this.items;
  }
  
  // Очистка корзины
  clearCart() {
    this.items = [];
    this.saveCart();
    return this.items;
  }
}

// Создаем один экземпляр для всего приложения
export const cartService = new CartService(); 