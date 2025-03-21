import { createRouter, createWebHistory } from 'vue-router'
import Cart from '@/views/Cart.vue'

// Выделение общих компонентов для переиспользования между маршрутами
const ProductsLayout = () => import('../layouts/ProductsLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/products',
      component: ProductsLayout,
      children: [
        {
          path: '',
          name: 'products',
          component: () => import('../views/Products.vue')
        },
        {
          path: 'category/:category',
          name: 'category',
          component: () => import('../views/CategoryProducts.vue')
        }
      ]
    },
    {
      path: '/technologies',
      name: 'technologies',
      component: () => import('../views/Technologies.vue')
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: () => import('../views/Solutions.vue')
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('../views/Calculator.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Компенсация высоты шапки
      }
    }
    return { top: 0 }
  }
})

export default router 