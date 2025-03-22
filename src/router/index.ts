import { createRouter, createWebHistory } from 'vue-router'
import Cart from '@/views/Cart.vue'
// Явно импортируем компонент калькулятора
import CalculatorComponent from '@/views/CalculatorView.vue'

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
      component: () => import('@/views/CalculatorView.vue')
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
    },
    {
      path: '/calculator-test',
      name: 'calculator-test',
      component: () => import('@/views/CalculatorTest.vue')
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

// Добавляем более надежный механизм сохранения секции
router.beforeEach((to, from, next) => {
  // Проверяем наличие параметра section в from.query
  const fromSection = from.query.section;
  
  // Если переходим на /products без параметра section, но в предыдущем маршруте он был
  if (to.path.startsWith('/products') && !to.query.section && fromSection) {
    console.log(`[DEBUG] Router: Сохраняем секцию ${fromSection} при переходе на ${to.path}`);
    // Добавляем параметр section к новому маршруту
    const query = {...to.query, section: fromSection};
    next({...to, query});
  } else {
    next();
  }
});

export default router 