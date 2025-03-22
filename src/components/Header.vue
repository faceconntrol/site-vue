<template>
  <v-app-bar color="primary" app>
    <v-container class="d-flex align-center">
      <v-toolbar-title class="text-uppercase d-flex align-center">
        <router-link to="/" class="text-white text-decoration-none d-flex align-center logo-link">
          <v-img
            src="/images/logo.png"
            alt="Третий Глаз"
            width="40"
            height="40"
            class="mr-2 logo-image"
          />
          <span class="logo-text">Третий Глаз</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <template v-for="item in menuItems" :key="item.title">
        <v-menu 
          v-if="item.children" 
          open-on-hover
          :close-delay="50"
          :open-delay="0"
          offset="5"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              text
              class="d-none d-sm-flex menu-btn"
              v-bind="props"
            >
              {{ item.title }}
              <v-icon right class="menu-icon">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list class="menu-dropdown pa-0" elevation="4" style="overflow: visible !important;">
            <v-list-item
              v-for="child in item.children"
              :key="child.title"
              :to="child.to"
              class="menu-item"
            >
              <v-list-item-title class="menu-item-title">
                {{ child.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-else
          :to="item.to"
          text
          class="d-none d-sm-flex menu-btn"
        >
          {{ item.title }}
        </v-btn>
      </template>

      <v-btn 
        to="/cart" 
        icon
        class="d-none d-sm-flex ml-4"
        color="white"
      >
        <v-badge
          :content="cartItemsCount"
          :model-value="cartItemsCount > 0"
          color="error"
          floating
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>

      <div 
        class="burger-wrapper d-flex d-sm-none" 
        @click="toggleMobileMenu"
      >
        <div class="burger-menu">
          <span 
            class="burger-line" 
            :class="{ 'active': mobileMenu }"
          ></span>
        </div>
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="mobileMenu"
    temporary
    app
  >
    <v-list>
      <template v-for="item in menuItems" :key="item.title">
        <v-list-group v-if="item.children">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            :to="child.to"
            @click="mobileMenu = false"
          >
            <v-list-item-title>{{ child.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :to="item.to"
          @click="mobileMenu = false"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
      <v-list-item to="/cart" @click="mobileMenu = false">
        <template v-slot:prepend>
          <v-badge
            :content="cartItemsCount"
            :model-value="cartItemsCount > 0"
            color="error"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </template>
        <v-list-item-title>Корзина</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
  >
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        :href="item.href"
        :target="item.href ? '_blank' : undefined"
        @click="drawer = false"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { cartService } from '@/services/cartService'

interface MenuItem {
  title: string;
  to?: string;
  icon?: string;
  children?: MenuItem[];
}

const menuItems = ref<MenuItem[]>([
  { title: 'Главная', to: '/' },
  { 
    title: 'Продукты',
    to: '/products',
    children: [
      { title: 'Оборудование', to: '/products' },
      { title: 'Технологии', to: '/technologies' },
      { title: 'Решения', to: '/solutions' }
    ]
  },
  { title: 'Калькулятор', to: '/calculator' },
  { title: 'Контакты', to: '/contact' }
])

const mobileMenu = ref(false)
const isMobile = ref(false)
const drawer = ref(false)
const cartItemsCount = ref(0)

// Вычисляемое свойство для общего количества товаров
const totalItems = computed(() => {
  return cartService.getItemCount()
})

const checkMobile = () => {
  isMobile.value = window.innerWidth < 960
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  updateCartCount()
  window.addEventListener('cart-updated', updateCartCount)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const toggleMobileMenu = () => {
  mobileMenu.value = !mobileMenu.value
}

// Функция для обновления количества товаров в корзине
function updateCartCount() {
  cartItemsCount.value = cartService.getItemCount()
}
</script>

<style scoped>
/* Анимация логотипа */
.logo-link {
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-image {
  transition: transform 0.5s ease;
}

.logo-link:hover .logo-image {
  transform: rotate(360deg);
}

.logo-text {
  position: relative;
  overflow: hidden;
}

.logo-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  transform: translateX(-100%);
  opacity: 0;
}

.logo-link:hover .logo-text::after {
  animation: shimmer 1.5s ease;
}

/* Анимация кнопок меню */
.menu-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.menu-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.5s ease;
}

.menu-btn:hover::before {
  left: 100%;
}

.menu-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #fff;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.menu-btn:hover::after {
  width: 80%;
}

.menu-icon {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-menu--active .menu-icon {
  transform: rotate(180deg) translateY(-2px);
}

/* Обновленные стили для бургер-меню */
.burger-wrapper {
  cursor: pointer;
  padding: 8px;
  margin: -8px;
  z-index: 100;
}

.burger-menu {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger-line {
  width: 24px;
  height: 2px;
  background-color: white;
  position: relative;
  transition: all 0.3s ease;
}

.burger-line::before,
.burger-line::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
  left: 0;
}

.burger-line::before {
  top: -8px;
}

.burger-line::after {
  bottom: -8px;
}

/* Анимация активного состояния */
.burger-line.active {
  background-color: transparent;
}

.burger-line.active::before {
  top: 0;
  transform: rotate(45deg);
}

.burger-line.active::after {
  bottom: 0;
  transform: rotate(-45deg);
}

/* Увеличиваем область клика на мобильных устройствах */
@media (max-width: 600px) {
  .burger-wrapper {
    padding: 12px;
    margin: -12px;
  }
}

/* Анимации */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Улучшенные стили для выпадающего меню */
.menu-dropdown {
  background: rgba(18, 18, 18, 0.95) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px !important;
  min-width: 200px;
  margin-top: 8px !important;
  animation: dropdownAppear 0.3s ease;
  overflow: visible !important;
}

.menu-item {
  position: relative;
  transition: all 0.3s ease;
  padding: 12px 16px;
  margin: 4px;
  border-radius: 6px;
  white-space: nowrap;
  overflow: visible;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--v-theme-primary);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(4px);
}

.menu-item:hover::before {
  transform: scaleY(1);
}

.menu-item-title {
  position: relative;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: visible;
}

.menu-item:hover .menu-item-title {
  color: white;
  transform: translateX(4px);
}

/* Улучшенная анимация иконки */
.menu-icon {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-menu--active .menu-icon {
  transform: rotate(180deg) translateY(-2px);
}

@keyframes dropdownAppear {
  0% {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Эффект свечения при наведении на активный пункт меню */
.menu-item.router-link-active {
  background: rgba(var(--v-theme-primary), 0.15);
}

.menu-item.router-link-active::before {
  transform: scaleY(1);
}

.menu-item.router-link-active .menu-item-title {
  color: var(--v-theme-primary);
}

/* Добавляем разделитель между пунктами */
.menu-item:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 8px;
  right: 8px;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

/* Эффект пульсации для активного пункта */
@keyframes activeItemPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.2);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--v-theme-primary), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0);
  }
}

.menu-item.router-link-active {
  animation: activeItemPulse 2s infinite;
}

.cart-btn {
  position: relative;
}

.v-badge__badge {
  transition: all 0.3s ease;
  opacity: 1 !important;
  visibility: visible !important;
}

/* Стили для иконки корзины */
.v-btn.v-btn--icon {
  margin-left: 8px;
}

/* Анимация появления бейджа */
@keyframes badgeAppear {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.v-badge__badge:not(:empty) {
  animation: badgeAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Переопределяем стили Vuetify для списка */
:deep(.v-list) {
  overflow: visible !important;
}

:deep(.v-list-item) {
  overflow: visible !important;
}
</style> 