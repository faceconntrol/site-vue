import { createApp } from '@vue/runtime-dom'
import { createHead } from '@vueuse/head'
import App from './App.vue'

// Стили
import './styles/global.scss'

// Vuetify
import vuetify from './plugins/vuetify'

// Router
import router from './router'

// Pinia
import { createPinia } from 'pinia'

// Аналитика
import { initYandexMetrika } from './plugins/analytics'

// Компоненты

const app = createApp(App)
const head = createHead()
const pinia = createPinia()

app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(head)

// Инициализация аналитики только в production
if (import.meta.env.PROD) {
  initYandexMetrika(router, 12345678) // Замените на реальный ID счётчика
}

app.mount('#app')
