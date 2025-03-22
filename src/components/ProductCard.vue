<template>
  <v-card 
    class="product-card" 
    role="article"
    aria-labelledby="product-title-{{ product.id }}"
  >
    <!-- Технологические лейблы (справа) -->
    <v-tooltip v-if="product.category === 'camera' && isColorVuCamera" location="top">
      <template v-slot:activator="{ props: tooltip }">
        <div
          class="floating-btn badge tech-badge colorvu-badge"
          v-bind="tooltip">
          ColorVu
        </div>
      </template>
      {{ tooltips.colorvu }}
    </v-tooltip>

    <!-- Лейбл AcuSense -->
    <v-tooltip v-if="product.category === 'camera' && isAcuSenseCamera" location="top">
      <template v-slot:activator="{ props: tooltip }">
        <div
          class="floating-btn badge tech-badge acusense-badge"
          v-bind="tooltip">
          AcuSense
        </div>
      </template>
      {{ tooltips.acusense }}
    </v-tooltip>

    <!-- Тип камеры (слева) -->
    <v-tooltip v-if="product.category === 'camera' && isPanoramicCamera" location="top">
      <template v-slot:activator="{ props: tooltip }">
        <div v-if="isPanoramicCamera" 
             class="floating-btn badge type-badge panoramic-badge"
             v-bind="tooltip">
          панорамная
        </div>
      </template>
      {{ tooltips.panoramic }}
    </v-tooltip>

    <!-- Лейбл максимального разрешения -->
    <v-tooltip v-if="showResolutionBadge" location="top">
      <template v-slot:activator="{ props: tooltip }">
        <div v-if="product.category === 'recorder' && product.maxResolution" 
             class="floating-btn badge tech-badge resolution-badge"
             v-bind="tooltip">
          до {{ product.maxResolution }} Мп
        </div>
      </template>
      {{ tooltips.resolution }}
    </v-tooltip>

    <!-- Тип камеры (слева) -->
    <v-tooltip v-if="product.category === 'camera' && isPTZCamera" location="top">
      <template v-slot:activator="{ props: tooltip }">
        <div v-if="isPTZCamera" 
             class="floating-btn badge type-badge ptz-badge"
             v-bind="tooltip">
          поворотная
        </div>
      </template>
      {{ tooltips.ptz }}
    </v-tooltip>

    <!-- Оверлей для добавления в корзину -->
    <div class="cart-overlay d-flex flex-column align-center justify-center">
      <!-- Количество товара -->
      <div v-if="quantity > 0" class="quantity-display mb-2">
        {{ quantity }} шт.
      </div>
      <div class="d-flex align-center gap-4">
        <v-btn
          v-if="quantity > 0"
          icon="mdi-minus"
          size="small"
          color="primary"
          class="overlay-btn"
          variant="tonal"
          elevation="2"
          @click.stop="decreaseQuantity"
        />
        <v-btn
          icon="mdi-plus"
          size="small"
          color="primary"
          class="overlay-btn"
          variant="tonal"
          elevation="2"
          @click.stop="addToCart"
        />
      </div>
      <span class="action-hint mt-2">
        {{ quantity > 0 ? 'Изменить количество' : 'Добавить в корзину' }}
      </span>
    </div>

    <!-- Изображение -->
    <v-img
      :src="product.image"
      :lazy-src="product.thumbnail"
      loading="lazy"
      height="200"
    />

    <!-- Контент -->
    <v-card-item class="pa-4">
      <v-card-title 
        :id="'product-title-' + product.id" 
        class="text-subtitle-1 font-weight-bold text-truncate mb-2 px-0"
      >
        {{ product.title }}
      </v-card-title>
      <v-card-subtitle class="text-body-2 product-description px-0">
        {{ product.description }}
      </v-card-subtitle>
    </v-card-item>

    <!-- Футер карточки: цена и кнопка подробнее -->
    <div class="card-footer">
      <div class="d-flex align-center justify-space-between">
        <div class="text-h6 font-weight-bold">
          {{ formatPrice(product.price) }} ₽
        </div>
        <v-btn
          :aria-label="`Подробнее о ${product.title}`"
          color="primary"
          variant="elevated"
          density="comfortable"
          size="small"
          @click="dialog = true"
        >
          Подробнее
        </v-btn>
      </div>
    </div>

    <!-- Диалоговое окно с подробной информацией -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-item>
          <v-card-title class="text-h5 font-weight-bold">
            {{ product.title }}
          </v-card-title>
          <template v-slot:append>
            <v-btn
              icon="mdi-close"
              variant="text"
              @click="dialog = false"
            />
          </template>
        </v-card-item>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-img
                :src="product.image"
                :alt="product.title"
                cover
                height="300"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-h6 mb-2">Описание</div>
              <p class="mb-4">{{ product.description }}</p>
              
              <template v-if="product.additional_info">
                <div class="text-h6 mb-2">Дополнительная информация</div>
                <p class="mb-4">{{ product.additional_info }}</p>
              </template>

              <div class="text-h6 mb-2">Характеристики</div>
              <ul class="specs-list">
                <li v-for="spec in product.specs" :key="spec">{{ spec }}</li>
              </ul>

              <div class="text-h4 primary--text mt-4">
                {{ formatPrice(product.price) }} ₽
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMemoize } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import type { ProductCardProps } from '@/types/component-props'
import LazyImage from '@/components/LazyImage.vue'
import { cartService } from '@/services/cartService'

// Типизированные пропсы
const props = defineProps<ProductCardProps>()

// Добавление структурированных данных через useHead
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': props.product.title,
        'description': props.product.description || '',
        'image': props.product.image || '',
        'offers': {
          '@type': 'Offer',
          'price': props.product.price,
          'priceCurrency': 'RUB',
          'availability': 'https://schema.org/InStock'
        }
      })
    }
  ]
})

// Логирование для отладки
onMounted(() => {
  console.log('Product data:', props.product)
  console.log('Features:', props.product.features)
  console.log('Specs:', props.product.specs)
  console.log('Is ColorVu:', isColorVuCamera.value)
  console.log('Is AcuSense:', isAcuSenseCamera.value)
  console.log('Is Panoramic:', isPanoramicCamera.value)
  console.log('Is PTZ:', isPTZCamera.value)
})

// Реактивное состояние
const dialog = ref(false)

// Вычисляемые свойства
const tooltips = computed(() => ({
  colorvu: 'Технология цветного ночного видения ColorVu',
  acusense: 'Технология интеллектуального анализа AcuSense',
  panoramic: 'Панорамный обзор 180° или 360°',
  resolution: `Максимальное разрешение ${props.product.maxResolution} МП`,
  ptz: 'Поворотная камера с оптическим зумом'
}))

// Вычисляемые свойства для определения типов камер
const isColorVuCamera = computed(() => {
  return props.product.features?.includes('colorvu') || 
         props.product.specs?.some((spec: string) => 
           spec.toLowerCase().includes('colorvu') ||
           spec.toLowerCase().includes('color vu')
         )
})

const isAcuSenseCamera = computed(() => {
  return props.product.features?.includes('acusense') || 
         props.product.specs?.some((spec: string) => 
           spec.toLowerCase().includes('acusense') ||
           spec.toLowerCase().includes('acu sense') ||
           spec.toLowerCase().includes('ai детекция')
         )
})

const isPanoramicCamera = computed(() => {
  return props.product.features?.includes('panoramic') || 
         props.product.specs?.some((spec: string) => 
           spec.toLowerCase().includes('панорамная') || 
           spec.toLowerCase().includes('panoramic') ||
           spec.toLowerCase().includes('панорам') ||
           spec.toLowerCase().includes('180°') ||
           spec.toLowerCase().includes('360°')
         )
})

const isPTZCamera = computed(() => {
  return props.product.features?.includes('ptz') || 
         props.product.specs?.some((spec: string) => 
           spec.toLowerCase().includes('поворотная') || 
           spec.toLowerCase().includes('ptz') ||
           spec.toLowerCase().includes('p.t.z') ||
           spec.toLowerCase().includes('поворот') ||
           spec.toLowerCase().includes('zoom') ||
           spec.toLowerCase().includes('зум')
         )
})

// Вычисляемое свойство для определения максимального разрешения регистратора
const showResolutionBadge = computed(() => {
  return props.product.category === 'recorder' && props.product.maxResolution
})

// Мемоизированная функция для форматирования цены
const formatPrice = useMemoize(
  (price: number) => new Intl.NumberFormat('ru-RU').format(price)
)

// Методы
function openDialog() {
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

const isAddingToCart = ref(false)
const quantity = ref(0)

function getProductImage(product: any) {
  return product.image || `/images/products/${product.id}.webp`
}

function updateQuantity() {
  try {
    const items = cartService.getItems()
    const item = items.find(i => i.id === props.product.id)
    quantity.value = item ? item.quantity : 0
  } catch (error) {
    console.error('Ошибка при обновлении количества:', error)
    quantity.value = 0
  }
}

function addToCart() {
  isAddingToCart.value = true
  
  setTimeout(() => {
    cartService.addItem({
      id: props.product.id,
      title: props.product.title,
      price: props.product.price,
      image: getProductImage(props.product)
    })
    
    isAddingToCart.value = false
    updateQuantity()
  }, 300)
}

const increaseQuantity = () => {
  cartService.updateQuantity(props.product.id, quantity.value + 1)
  updateQuantity()
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    cartService.updateQuantity(props.product.id, quantity.value - 1)
  } else {
    cartService.removeItem(props.product.id)
  }
  updateQuantity()
}

// Обработчик ошибки загрузки изображения
const handleImageError = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = '/images/no-image.jpg'
  }
}

// Функция определения отображения продукта на основе фильтров и поиска
const shouldDisplayProduct = (product: any, searchInput?: string) => {
  let shouldDisplay = true;

  // Проверяем только если у продукта есть описание, спецификации или название
  if (searchInput && product) {
    const searchTerm = searchInput.toLowerCase();
    // Ищем совпадения в различных полях продукта
    const matchesSearch = 
      (product.title && product.title.toLowerCase().includes(searchTerm)) ||
      (product.description && product.description.toLowerCase().includes(searchTerm)) ||
      (product.specs && product.specs.some((spec: string) => spec.toLowerCase().includes(searchTerm)));
    
    shouldDisplay = matchesSearch;
  }
  
  return shouldDisplay;
};

// Экспортируем функцию для использования в других компонентах
defineExpose({ shouldDisplayProduct });

// Определение интерфейса продукта для улучшения типизации
interface Product {
  id: string;
  title: string;
  description?: string;
  specs?: string[];
  features?: string[];
  additional_info?: string;
  image?: string;
  category?: string;
  brand?: string;
  price?: number;
}

// Теперь используем этот интерфейс
const debugFeatures = (product: Product) => {
  console.group('Product Features Debug:', product.title)
  console.log('Specs:', product.specs)
  console.log('ColorVu:', isColorVuCamera.value)
  console.log('AcuSense:', isAcuSenseCamera.value)
  console.log('Panoramic:', isPanoramicCamera.value)
  console.log('PTZ:', isPTZCamera.value)
  console.groupEnd()
}

// Вызовем её при монтировании
onMounted(() => {
  debugFeatures(props.product)
  updateQuantity()
  window.addEventListener('cart-updated', updateQuantity)
})
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 420px;
  position: relative;
  overflow: visible !important;
}

.product-image {
  height: 180px;
  object-fit: cover;
  transition: opacity 0.3s ease;
  position: relative;
}

.product-description {
  min-height: 80px;
  max-height: 80px;
  overflow-y: auto;
  white-space: normal;
  line-height: 1.4;
  margin-bottom: 0;
}

.product-description::-webkit-scrollbar {
  width: 4px;
}

.product-description::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.product-description::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

.product-description::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.text-h6 {
  color: var(--v-primary-base);
}

.specs-list {
  list-style-type: none;
  padding-left: 0;
}

.specs-list li {
  padding: 4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.specs-list li:last-child {
  border-bottom: none;
}

/* Общие стили для плавающих элементов */
.floating-btn {
  position: absolute;
  z-index: 3;
}

/* Стили для бейджей */
.badge {
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
  cursor: help;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

/* Технологические бейджи (справа) */
.tech-badge {
  right: 8px;
}

/* Типы камер (слева) */
.type-badge {
  left: 8px;
}

.colorvu-badge {
  top: 8px;
  background: rgba(76, 175, 80, 0.9);
  color: white;
  z-index: 2;
}

.acusense-badge {
  top: 40px;
  background: rgba(255, 152, 0, 0.9);
  color: white;
  z-index: 2;
}

.panoramic-badge {
  top: 8px;
  background: rgba(33, 150, 243, 0.9);
  color: white;
  z-index: 2;
}

.ptz-badge {
  top: 40px;
  background: rgba(156, 39, 176, 0.9);
  color: white;
  z-index: 2;
}

.resolution-badge {
  top: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 2;
}

/* Стили для мобильных устройств */
@media (max-width: 600px) {
  .product-card {
    height: auto;
    min-height: 300px;
  }
  
  .product-image {
    height: 120px;
  }
  
  .v-card-title {
    font-size: 14px !important;
    line-height: 1.2;
    margin-bottom: 4px !important;
  }
  
  .v-card-subtitle {
    font-size: 12px !important;
    display: block !important;
    overflow: visible !important;
    -webkit-line-clamp: unset !important;
  }
  
  .product-description {
    min-height: unset;
    max-height: none;
    overflow: visible;
  }

  .v-card-text {
    padding: 8px !important;
  }
  
  .v-card-actions {
    padding: 8px !important;
    margin-top: auto;
  }

  .badge {
    font-size: 10px;
    padding: 2px 4px;
  }

  .card-footer {
    padding: 12px;
  }

  .cart-overlay {
    display: none; /* Отключаем оверлей на мобильных */
  }

  .quantity-display {
    font-size: 10px;
    padding: 2px 6px;
  }
}

.card-footer {
  margin-top: auto;
  padding: 16px;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 5;
}

/* Стили для оверлея корзины */
.cart-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 160px;
  height: 100px;
  background: rgba(255, 255, 255, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 4;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: -20px;
}

/* Затемнение только изображения при наведении */
.product-image {
  transition: opacity 0.3s ease;
  position: relative;
}

.product-card:hover .product-image {
  opacity: 0.8;
}

.product-card:hover .cart-overlay {
  opacity: 1;
}

.overlay-btn {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  transition: transform 0.2s ease;
  background: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

.overlay-btn:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.9) !important;
}

.gap-4 {
  gap: 16px;
}

.quantity-display {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 4px;
}

.action-hint {
  color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  margin-top: 8px;
}
</style> 