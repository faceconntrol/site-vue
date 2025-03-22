import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    // Удаляем или комментируем маршрут about, так как файла нет
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/products',
      name: 'products',
      // Исправляем на Products.vue вместо ProductsView.vue, если нужно
      component: () => import('../views/Products.vue')
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: () => import('../views/ProductDetails.vue')
    },
    // Добавляем маршруты, которых не хватает
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
      component: () => import('../views/Cart.vue')
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
    // Специальные мобильные маршруты
    {
      path: '/mobile-catalog',
      name: 'mobile-catalog',
      component: () => import('../views/MobileCatalog.vue')
    },
    {
      path: '/mobile-catalog/all',
      name: 'mobile-catalog-all',
      component: () => import('../views/MobileCatalogAll.vue')
    },
    {
      path: '/mobile/cart',
      name: 'MobileCart',
      component: () => import('@/components/MobileCartComponent.vue')
    },
    {
      path: '/mobile/catalog',
      name: 'MobileCatalog',
      component: () => import('@/views/MobileCatalog.vue')
    },
    {
      path: '/calculator-test',
      name: 'calculator-test',
      component: () => import('../views/CalculatorTest.vue')
    }
  ]
})

export default router 