import { createApp } from '@vue/runtime-dom'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createHead } from '@vueuse/head'

// Импортируем все компоненты Vuetify напрямую для предотвращения проблем с загрузкой
import 'vuetify/components'

// Добавляем отладочную информацию
console.log('Starting app initialization');
console.log('Window width:', window.innerWidth);
console.log('User Agent:', navigator.userAgent);

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(vuetify)
app.use(head)

app.mount('#app')

console.log('App initialization complete');
