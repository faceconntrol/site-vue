<template>
  <div class="product-details-page">
    <v-container class="mobile-container pb-16">
      <!-- Верхняя панель с кнопкой возврата -->
      <div class="d-flex align-center mb-4">
        <v-btn icon @click="goBack" class="mr-2">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h2 class="text-h6 mb-0">Подробная информация</h2>
      </div>
      
      <!-- Сообщение о загрузке -->
      <v-skeleton-loader v-if="loading" type="card, article" class="mb-4"></v-skeleton-loader>
      
      <!-- Сообщение об ошибке -->
      <v-alert v-else-if="error" type="error" class="mb-4">
        {{ error }}
      </v-alert>
      
      <!-- Детали товара -->
      <template v-else-if="product">
        <!-- Основная информация о товаре -->
        <v-card class="mb-4">
          <v-img
            :src="getProductImage(product)"
            height="250"
            cover
            class="product-image"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle v-if="product.brand">{{ product.brand }}</v-card-subtitle>
          
          <v-card-text>
            <p class="text-body-1">{{ product.description }}</p>
            <v-chip v-if="getProductResolution(product)" color="primary" class="mt-2 mr-2">
              {{ getProductResolution(product) }} Мп
            </v-chip>
            <v-chip v-if="product.category" color="grey-lighten-3" class="mt-2">
              {{ product.category }}
            </v-chip>
            <div class="mt-4 d-flex justify-space-between align-center">
              <div v-if="product.price" class="text-h6 font-weight-bold">
                {{ formatPrice(product.price) }} ₽
              </div>
              <div v-else class="text-h6 text-grey">
                Цена по запросу
              </div>
              <v-btn 
                color="primary" 
                variant="elevated" 
                @click="addToCart"
                :loading="addingToCart"
              >
                <v-icon left class="mr-1">mdi-cart-plus</v-icon>
                Добавить в корзину
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
        
        <!-- Дополнительная информация -->
        <v-card v-if="product.additional_info" class="mb-4">
          <v-card-title>Дополнительная информация</v-card-title>
          <v-card-text>
            <p class="text-body-1">{{ product.additional_info }}</p>
          </v-card-text>
        </v-card>
        
        <!-- Характеристики -->
        <v-card v-if="hasSpecs(product) && product.specs.length > 0" class="mb-4">
          <v-card-title>Характеристики</v-card-title>
          <v-card-text>
            <v-list lines="one">
              <v-list-item v-for="(spec, index) in product.specs" :key="index">
                <template v-if="typeof spec === 'string'">
                  <v-list-item-title>{{ spec }}</v-list-item-title>
                </template>
                <template v-else-if="typeof spec === 'object' && spec !== null">
                  <v-list-item-title>{{ spec.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ spec.value }}</v-list-item-subtitle>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </template>
      
      <!-- Уведомление о добавлении в корзину -->
      <v-snackbar
        v-model="cartSnackbar"
        :timeout="2000"
        color="success"
      >
        Товар добавлен в корзину
        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="cartSnackbar = false"
          >
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productsDB } from '@/data/catalog';
import { useVisualEffects } from '@/composables/useVisualEffects';
import { cartService } from '@/services/cartService';
import { isSection } from '@/utils/productUtils';

// Импортируем функцию для отображения уведомлений
const { showNotification } = useVisualEffects();

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref(null);
const product = ref(null);
const addingToCart = ref(false);
const cartSnackbar = ref(false);

// Получаем каталог товаров и добавляем отладочную информацию
console.log('Импортированный каталог:', productsDB);

// Правильно получаем массив товаров из объекта productsDB
const products = Array.isArray(productsDB) 
  ? productsDB 
  : (typeof productsDB === 'object' && productsDB !== null 
    ? Object.values(productsDB) 
    : []);

console.log('Извлеченные товары:', products);

onMounted(async () => {
  try {
    console.log('Страница товара загружена, ID:', route.params.id);
    
    // Получаем ID товара из параметров маршрута
    const productId = route.params.id;
    
    // Проверяем, является ли ID названием секции
    if (isSection(productId)) {
      // Перенаправляем на страницу секции
      router.push(`/products?section=${productId}`);
      return;
    }

    // Ищем товар в каталоге, игнорируя регистр
    const foundProduct = findProductById(productId);
    
    if (foundProduct) {
      product.value = foundProduct;
      console.log('Товар найден:', foundProduct);
    } else {
      error.value = 'Товар не найден в каталоге';
      console.error('Товар не найден в каталоге');
      // Перенаправление на страницу со всеми товарами
      router.push('/products');
    }
  } catch (err) {
    console.error('Ошибка при загрузке товара:', err);
    error.value = 'Произошла ошибка при загрузке информации о товаре: ' + err.message;
  } finally {
    loading.value = false;
  }
});

// Функция для поиска товара по ID с учетом регистра
function findProductById(id) {
  if (!id) return null;
  
  // Преобразуем к нижнему регистру для нечувствительного к регистру поиска
  const normalizedId = id.toLowerCase();
  
  // Выводим все доступные ID для отладки если массив доступен
  if (Array.isArray(products)) {
    console.log('Доступные ID товаров:', products.map(p => p.id));
    
    // Ищем товар с точным совпадением ID (без учета регистра)
    const exactMatch = products.find(p => p.id && p.id.toLowerCase() === normalizedId);
    if (exactMatch) return exactMatch;
    
    // Если точного совпадения нет, проверяем содержится ли ID в имеющихся ID
    return products.find(p => {
      if (!p || !p.id) return false;
      const productId = p.id.toLowerCase();
      return productId.includes(normalizedId) || normalizedId.includes(productId);
    });
  } else {
    console.error('Массив товаров недоступен', products);
    return null;
  }
}

// Функция для возврата назад
function goBack() {
  router.back();
}

// Функция для получения изображения товара
function getProductImage(product) {
  if (!product) return '';
  
  // Если изображение задано явно, используем его
  if (product.image) {
    // Проверяем, начинается ли путь с "/"
    return product.image.startsWith('/') ? product.image : `/${product.image}`;
  }
  
  // Иначе формируем путь из ID товара
  return `/images/products/${product.id}.jpg`;
}

// Функция для форматирования цены
function formatPrice(price) {
  if (!price) return '';
  return new Intl.NumberFormat('ru-RU').format(price);
}

// Функция для проверки наличия спецификаций
function hasSpecs(product) {
  return product && product.specs && Array.isArray(product.specs) && product.specs.length > 0;
}

// Функция для получения разрешения камеры из продукта
function getProductResolution(product) {
  if (!product) return null;
  
  // Поиск в названии товара
  const titleMatch = (product.title || '').match(/(\d+)\s*[мМ][пП]/i);
  if (titleMatch) {
    return titleMatch[1];
  }
  
  // Поиск в описании
  const descMatch = (product.description || '').match(/(\d+)\s*[мМ][пП]/i);
  if (descMatch) {
    return descMatch[1];
  }
  
  // Проверка спецификаций
  if (hasSpecs(product)) {
    for (const spec of product.specs) {
      if (typeof spec === 'string' && spec.match(/(\d+)\s*[мМ][пП]/i)) {
        const match = spec.match(/(\d+)\s*[мМ][пП]/i);
        if (match) return match[1];
      } else if (spec && typeof spec === 'object' && spec.value) {
        const match = (spec.value || '').match(/(\d+)\s*[мМ][пП]/i);
        if (match) return match[1];
      }
    }
  }
  
  return null;
}

// Функция для добавления товара в корзину
function addToCart() {
  if (product.value) {
    console.log('Добавляем товар в корзину:', product.value.id);
    
    // Создаем объект товара для корзины
    const cartItem = {
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: getProductImage(product.value)
    };
    
    // Добавляем товар в корзину через сервис
    cartService.addItem(cartItem);
    
    // Показываем уведомление
    showNotification('Товар добавлен в корзину');
  }
}

// Функция для уведомления других компонентов об изменении корзины
function dispatchCartUpdateEvent() {
  // Метод 1: Универсальное событие для обеих версий приложения
  const cartUpdateEvent = new CustomEvent('cart-updated', {
    detail: { timestamp: new Date().getTime() }
  });
  window.dispatchEvent(cartUpdateEvent);
  
  // Метод 2: Событие storage для синхронизации между вкладками
  const tempKey = '_temp_cart_update_';
  localStorage.setItem(tempKey, Date.now().toString());
  localStorage.removeItem(tempKey);
  
  console.log('Отправлено событие обновления корзины');
}
</script>

<style scoped>
.product-details-page {
  padding-bottom: 70px;
}

.product-image {
  border-radius: 0;
}

.mobile-container {
  max-width: 100%;
  padding: 16px;
}
</style> 