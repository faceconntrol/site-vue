<template>
  <div>
    <!-- Главный баннер -->
    <section class="hero-section">
      <v-parallax
        src="/images/main.PNG"
        height="100vh"
      >
        <div class="hero-overlay" />
        <v-container class="hero-content d-flex align-center" style="height: 100%">
          <v-row>
            <v-col cols="12" md="8" lg="6">
              <h1 class="text-h2 font-weight-bold text-white mb-6">
                Системы видеонаблюдения в Ленинградской области
              </h1>
              <p class="text-h5 text-white mb-8">
                Профессиональная установка систем безопасности в Ленинградской области. Комплексные решения для СНТ, частных домов и бизнеса с гарантией качества.
              </p>
              <div class="d-flex flex-wrap button-container">
                <v-btn
                  :to="'/products'"
                  size="large"
                  color="primary"
                  class="action-button"
                >
                  Каталог оборудования
                  <v-icon class="ms-2">mdi-camera-wireless</v-icon>
                </v-btn>
                <v-btn
                  :to="'/calculator'"
                  size="large"
                  color="secondary"
                  class="action-button"
                >
                  Рассчитать стоимость
                  <v-icon class="ms-2">mdi-calculator</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div class="scroll-down-arrow" @click="scrollToServices">
          <v-icon icon="mdi-chevron-down" size="48" color="white" />
        </div>
      </v-parallax>
    </section>

    <!-- Секция услуг -->
    <section id="services" class="py-16">
      <v-container>
        <h2 class="text-h3 text-center font-weight-bold mb-12 section-title">
          Наши услуги
          <div class="title-underline"></div>
        </h2>
        <v-row>
          <v-col
            v-for="service in SERVICES"
            :key="service.title"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              class="service-card h-100"
              elevation="0"
              :class="{ 'on-hover': hover }"
              @mouseenter="hover = true"
              @mouseleave="hover = false"
            >
              <div class="card-image-wrapper">
                <v-img
                  :src="service.image"
                  height="200"
                  cover
                  class="service-image"
                >
                  <div class="image-overlay"></div>
                </v-img>
                <v-icon
                  :icon="service.icon"
                  size="48"
                  color="primary"
                  class="service-icon"
                />
              </div>
              <v-card-item>
                <v-card-title class="text-h5 font-weight-bold mb-4 service-title">
                  {{ service.title }}
                </v-card-title>
                <v-card-text class="text-body-1 service-description">
                  {{ service.description }}
                </v-card-text>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Секция "Для кого подходит" -->
    <section class="audience-section py-16 bg-grey-lighten-4">
      <v-container>
        <h2 class="text-h3 text-center font-weight-bold mb-12 section-title">
          Для кого подходит
          <div class="title-underline"></div>
        </h2>
        <v-row>
          <v-col 
            v-for="(audience, index) in audiences" 
            :key="audience.title" 
            cols="12" 
            sm="6" 
            lg="3"
          >
            <v-card
              class="audience-card h-100"
              elevation="0"
              :class="{ 'on-hover': hoveredAudience === index }"
              @mouseenter="hoveredAudience = index"
              @mouseleave="hoveredAudience = null"
            >
              <div class="card-image-wrapper">
                <v-img
                  :src="audience.image"
                  height="200"
                  cover
                  class="audience-image"
                >
                  <div class="image-overlay"></div>
                </v-img>
                <v-icon 
                  :icon="audience.icon" 
                  size="48" 
                  color="primary" 
                  class="audience-icon"
                />
              </div>
              <v-card-item>
                <v-card-title class="text-h5 font-weight-bold mb-4 audience-title">
                  {{ audience.title }}
                </v-card-title>
                <v-card-text class="text-body-1 audience-description">
                  {{ audience.description }}
                </v-card-text>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Секция "Какие задачи решает" -->
    <section class="tasks-section py-16">
      <v-container>
        <h2 class="text-h3 text-center font-weight-bold mb-12 section-title">
          Какие задачи решает видеонаблюдение
          <div class="title-underline"></div>
        </h2>
        <v-row>
          <v-col v-for="(task, index) in tasks" :key="task.title" cols="12" sm="6" lg="3">
            <v-card
              class="task-card h-100"
              elevation="0"
              :class="{ 'on-hover': hoveredTask === index }"
              @mouseenter="hoveredTask = index"
              @mouseleave="hoveredTask = null"
            >
              <div class="card-image-wrapper">
                <v-img
                  :src="task.image"
                  height="200"
                  cover
                  class="task-image"
                >
                  <div class="image-overlay"></div>
                </v-img>
                <v-icon
                  :icon="task.icon"
                  size="48"
                  color="primary"
                  class="task-icon"
                />
              </div>
              <v-card-item>
                <v-card-title class="text-h5 font-weight-bold mb-4 task-title">
                  {{ task.title }}
                </v-card-title>
                <v-card-text class="text-body-1 task-description">
                  {{ task.description }}
                </v-card-text>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Добавляем новую секцию после секции tasks -->
    <section class="why-us-section py-16">
      <v-container>
        <h2 class="text-h3 text-center font-weight-bold mb-12 section-title">
          Почему выбирают нас
          <div class="title-underline"></div>
        </h2>
        <v-row>
          <v-col v-for="(feature, index) in features" :key="feature.title" cols="12" sm="6" md="4">
            <div 
              class="feature-card"
              :style="{ '--delay': `${index * 0.1}s` }"
            >
              <div class="feature-icon-wrap">
                <v-icon :icon="feature.icon" size="32" class="feature-icon" />
              </div>
              <div class="feature-content">
                <div class="feature-header">
                  <span class="feature-number">0{{ index + 1 }}</span>
                  <h3 class="text-h5 font-weight-bold">{{ feature.title }}</h3>
                </div>
                <p class="text-body-1 mt-4">{{ feature.description }}</p>
              </div>
              <div class="feature-background"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '@vueuse/head'
import { FEATURES, SERVICES } from '@/constants'

interface Task {
  title: string;
  description: string;
  image: string;
  icon: string;
}

interface Audience {
  title: string;
  description: string;
  image: string;
  icon: string;
}

const hover = ref(false)
const hoveredTask = ref<number | null>(null)
const hoveredAudience = ref(null)

const tasks: Task[] = [
  {
    title: 'Безопасность',
    description: 'Защита от краж, вандализма и других противоправных действий. Круглосуточный мониторинг территории с записью в архив. Мгновенные уведомления о подозрительной активности. Интеграция с охранной сигнализацией.',
    image: '/images/tasks/security.jpg',
    icon: 'mdi-shield-check'
  },
  {
    title: 'Мониторинг',
    description: 'Контроль рабочих процессов и соблюдения регламентов. Удаленный доступ к камерам через интернет. Наблюдение за сотрудниками и подрядчиками. Контроль качества обслуживания клиентов.',
    image: '/images/tasks/monitoring.jpg',
    icon: 'mdi-monitor-eye'
  },
  {
    title: 'Аналитика',
    description: 'Сбор и анализ данных для оптимизации бизнес-процессов. Подсчет посетителей и определение их демографии. Анализ поведения покупателей в торговом зале. Тепловые карты активности.',
    image: '/images/tasks/analytics.jpg',
    icon: 'mdi-chart-bar'
  },
  {
    title: 'Документирование',
    description: 'Фиксация событий и ведение архива для отчетности. Экспорт видеозаписей и скриншотов. Создание отчетов по инцидентам. Доказательная база для службы безопасности и правоохранительных органов.',
    image: '/images/tasks/documentation.jpg',
    icon: 'mdi-file-document'
  }
]

const audiences: Audience[] = [
  {
    icon: 'mdi-home-group',
    title: 'Садоводства, СНТ/ТСН',
    description: 'Комплексные системы безопасности для садоводств и дачных товариществ. Контроль въездов, мониторинг территорий, предотвращение свалок. Удаленный доступ для правления и охраны.',
    image: '/images/audiences/business.jpg'
  },
  {
    icon: 'mdi-home',
    title: 'Частные дома',
    description: 'Современные системы для защиты частной собственности. Круглосуточный контроль периметра, наблюдение за строительными работами. Мгновенные уведомления о происшествиях.',
    image: '/images/audiences/private.jpg'
  },
  {
    icon: 'mdi-store',
    title: 'Магазины и склады',
    description: 'Профессиональные системы для торговых точек и складов. Контроль кассовых операций и персонала, предотвращение краж. Интеграция с системами учета.',
    image: '/images/audiences/residential.jpg'
  },
  {
    icon: 'mdi-office-building',
    title: 'Офисы и производство',
    description: 'Интеллектуальные системы для офисов и промышленных объектов. Контроль доступа, учет времени, мониторинг процессов. Интеграция с охранными системами.',
    image: '/images/audiences/industrial.jpg'
  }
]

const scrollToServices = () => {
  const servicesSection = document.getElementById('services')
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const features = [
  {
    icon: 'mdi-shield-check',
    title: 'Гарантия качества',
    description: 'Предоставляем гарантию на оборудование и монтажные работы. Используем только сертифицированное оборудование от проверенных производителей.'
  },
  {
    icon: 'mdi-account-group',
    title: 'Опытные специалисты',
    description: 'Наши инженеры имеют более 5 лет опыта в проектировании и установке систем видеонаблюдения любой сложности.'
  },
  {
    icon: 'mdi-clock-fast',
    title: 'Быстрая установка',
    description: 'Выполняем монтаж в кратчайшие сроки без потери качества. Средний срок установки системы - 1-2 дня.'
  },
  {
    icon: 'mdi-cctv',
    title: 'Мониторинг оборудования',
    description: 'Система автоматического мониторинга непрерывно отслеживает состояние всех компонентов, мгновенно выявляет неполадки и отправляет уведомления для оперативного реагирования.'
  },
  {
    icon: 'mdi-cash-multiple',
    title: 'Честные цены',
    description: 'Прозрачное ценообразование без скрытых платежей. Предоставляем подробную смету до начала работ.'
  },
  {
    icon: 'mdi-tools',
    title: 'Сервисное обслуживание',
    description: 'Выполняем регулярное техническое обслуживание и оперативный ремонт установленных систем.'
  }
]

// SEO мета-теги
useHead({
  title: 'Системы видеонаблюдения в Мшинской и Дивенской | Установка и обслуживание | Третий Глаз',
  meta: [
    {
      name: 'description',
      content: 'Профессиональная установка систем видеонаблюдения в Мшинской и Дивенской. Комплексные решения для частных домов, СНТ и бизнеса. Проектирование, монтаж и обслуживание систем безопасности с гарантией.'
    },
    {
      name: 'keywords',
      content: 'видеонаблюдение Мшинская, видеонаблюдение Дивенская, камеры СНТ, системы безопасности, установка камер, монтаж видеонаблюдения, умный дом, системы безопасности СНТ'
    }
  ]
})

// Обработчик видимости элементов
const handleVisibility = () => {
  const elements = {
    titles: document.querySelectorAll('.section-title'),
    cards: document.querySelectorAll('.feature-card')
  }

  const windowHeight = window.innerHeight
  const triggerPoint = windowHeight * 0.8

  // Обработка заголовков
  elements.titles.forEach(title => {
    const rect = title.getBoundingClientRect()
    if (rect.top <= triggerPoint && rect.bottom >= 0) {
      title.classList.add('visible')
    }
  })

  // Обработка карточек
  elements.cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    if (rect.top <= triggerPoint && rect.bottom >= 0) {
      if (!card.classList.contains('visible')) {
        setTimeout(() => card.classList.add('visible'), index * 150)
      }
    }
  })
}

// Обработчик движения мыши для эффекта свечения
const handleMouseMove = (event: MouseEvent, card: HTMLElement) => {
  const rect = card.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  card.style.setProperty('--x', `${x}%`)
  card.style.setProperty('--y', `${y}%`)
}

onMounted(() => {
  handleVisibility()

  // Оптимизированный обработчик скролла
  let ticking = false
  const scrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleVisibility()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', scrollHandler)

  // Добавляем обработчики для эффекта свечения
  const cards = document.querySelectorAll('.feature-card')
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => handleMouseMove(e, card as HTMLElement))
  })

  // Очистка при размонтировании
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler)
    cards.forEach(card => {
      card.removeEventListener('mousemove', (e) => handleMouseMove(e, card as HTMLElement))
    })
  })
})
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  background-image: url('/images/main.PNG');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
}

/* Фоны для секций */
section {
  position: relative;
}

section:nth-of-type(2) {
  background-color: #f8f9fa;
}

section:nth-of-type(3) {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
}

section:nth-of-type(4) {
  background-color: #f1f3f5;
}

section:nth-of-type(5) {
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

.service-card,
.audience-card,
.task-card {
  transition: all 0.3s ease !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.service-card:hover,
.audience-card:hover,
.task-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
}

.service-card:hover .card-image-wrapper,
.audience-card:hover .card-image-wrapper,
.task-card:hover .card-image-wrapper {
  transform: scale(1.02);
}

.card-image-wrapper {
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card:hover .image-overlay {
  opacity: 1;
}

.service-icon {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 50%;
  transform: scale(0);
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1) rotate(360deg);
}

.service-card .v-img {
  height: 240px !important;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
  flex: 0 0 240px;
}

.service-card .v-card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  flex: 1;
}

.service-card .v-card-title {
  font-size: 1.5rem !important;
  font-weight: bold;
  margin: 16px 0;
  text-align: center;
  width: 100%;
}

.service-card .v-card-text {
  text-align: center;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1rem;
  width: 100%;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding-left: 24px;
  position: relative;
  margin-bottom: 8px;
}

.features-list li::before {
  content: "•";
  position: absolute;
  left: 8px;
  color: var(--primary-color);
}

.audience-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.audience-card {
  position: relative;
  transition: all 0.3s ease;
  background: white;
  overflow: hidden;
}

.audience-card.on-hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.6)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.audience-card.on-hover .image-overlay {
  opacity: 1;
}

.audience-icon {
  position: absolute;
  right: 16px;
  bottom: 16px;
  transform: scale(0.8);
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.audience-card.on-hover .audience-icon {
  transform: scale(1);
  opacity: 1;
}

.audience-title {
  position: relative;
  transition: color 0.3s ease;
}

.audience-card.on-hover .audience-title {
  color: var(--v-theme-primary);
}

.audience-description {
  opacity: 0.8;
  line-height: 1.5;
}

/* Адаптивность */
@media (max-width: 600px) {
  .audience-card {
    margin-bottom: 16px;
  }
  
  .audience-title {
    font-size: 1.25rem !important;
  }
  
  .audience-description {
    font-size: 0.875rem !important;
  }
}

/* Стили для секции задач */
.task-card {
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
}

.task-card.on-hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.task-image {
  height: 200px !important;
  object-fit: cover;
}

.task-icon {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 50%;
  transform: scale(0);
  transition: all 0.3s ease;
}

.task-card.on-hover .task-icon {
  transform: scale(1) rotate(360deg);
}

.task-card .v-card-item {
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: left;
}

.task-title {
  font-size: 1.25rem !important;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 16px !important;
  color: var(--v-theme-primary);
  text-align: left;
  padding: 0;
  width: 100%;
}

.task-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
  text-align: left;
  padding: 0;
  width: 100%;
}

.task-card.on-hover .image-overlay {
  opacity: 1;
}

.scroll-down-arrow {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 2;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-20px);
  }
  60% {
    transform: translateX(-50%) translateY(-10px);
  }
}

.action-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Эффект свечения при наведении */
.action-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

/* Пульсация кнопки */
.action-button {
  animation: pulse 2s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(var(--v-theme-primary), 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0);
  }
}

/* Дополнительный эффект при наведении */
.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
}

/* Разные цвета анимации для разных кнопок */
.action-button[color="primary"]::before {
  background: radial-gradient(
    circle,
    rgba(var(--v-theme-primary), 0.3) 0%,
    rgba(var(--v-theme-primary), 0) 70%
  );
}

.action-button[color="secondary"]::before {
  background: radial-gradient(
    circle,
    rgba(var(--v-theme-secondary), 0.3) 0%,
    rgba(var(--v-theme-secondary), 0) 70%
  );
}

.button-container {
  gap: 16px;
}

@media (max-width: 600px) {
  .button-container {
    gap: 24px;
  }
}

/* Стили для заголовков секций */
.section-title {
  position: relative;
  display: inline-block;
  padding: 20px 40px;
  margin-bottom: 48px !important;
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-title.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Подчеркивание */
.title-underline {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100px;
  height: 3px;
  background: var(--v-theme-primary);
  transition: transform 0.5s ease 0.3s;
  border-radius: 1.5px;
  transform-origin: left;
}

.section-title.visible .title-underline {
  transform: translateX(-50%) scaleX(1);
}

/* Общие стили для карточек */
.card-image-wrapper {
  position: relative;
  overflow: hidden;
}

/* Анимации */
@keyframes dots {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(8px);
  }
}

/* Адаптивность */
@media (max-width: 600px) {
  .service-card,
  .audience-card,
  .task-card {
    margin-bottom: 24px;
  }
}

/* Новые стили для секции "Почему выбирают нас" */
.why-us-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
}

.why-us-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(var(--v-theme-primary), 0.1) 0%, transparent 70%);
}

.feature-card {
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  height: 100%;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(var(--v-theme-primary), 0.5);
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(var(--v-theme-primary), 0.2);
}

.feature-icon-wrap {
  position: relative;
  width: 64px;
  height: 64px;
  background: rgba(var(--v-theme-primary), 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0.8);
}

.feature-card.visible .feature-icon-wrap {
  transform: scale(1);
}

.feature-card:hover .feature-icon-wrap {
  background: rgba(var(--v-theme-primary), 0.2);
  transform: rotate(-10deg) scale(1.1);
}

.feature-icon {
  color: rgb(var(--v-theme-primary));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.5);
}

.feature-card.visible .feature-icon {
  opacity: 1;
  transform: scale(1);
}

.feature-card:hover .feature-icon {
  transform: rotate(10deg) scale(1.2);
}

.feature-content {
  position: relative;
  z-index: 2;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.2s;
}

.feature-card.visible .feature-content {
  transform: translateY(0);
  opacity: 1;
}

.feature-number {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.8), transparent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.3s;
}

.feature-card.visible .feature-number {
  opacity: 0.6;
  transform: translateX(0);
}

.feature-card:hover .feature-number {
  opacity: 0.8;
  transform: scale(1.1);
}

/* Эффект свечения при наведении */
.feature-background {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(var(--v-theme-primary), 0.15) 0%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .feature-background {
  opacity: 1;
}

/* Добавляем интерактивный эффект свечения при движении мыши */
.feature-card {
  --x: 50%;
  --y: 50%;
}

@media (hover: hover) {
  .feature-card:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
}

/* Адаптивность */
@media (max-width: 960px) {
  .feature-card {
    margin-bottom: 1.5rem;
  }
}

/* Общие стили для карточек обеих секций */
.task-card .v-card-item,
.audience-card .v-card-item {
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: left;
}

.task-title,
.audience-title {
  font-size: 1.25rem !important;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 16px !important;
  color: var(--v-theme-primary);
  text-align: left;
  padding: 0;
  width: 100%;
}

.task-description,
.audience-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
  text-align: left;
  padding: 0;
  width: 100%;
}

/* Мобильная версия */
@media (max-width: 600px) {
  .task-card .v-card-item,
  .audience-card .v-card-item {
    padding: 16px;
  }

  .task-title,
  .audience-title {
    font-size: 1.125rem !important;
    margin-bottom: 12px !important;
  }

  .task-description,
  .audience-description {
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

/* Общие стили для иконок в обеих секциях */
.task-icon,
.audience-icon {
  position: absolute;
  right: 16px;
  bottom: 16px;
  transform: scale(0);
  background: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

/* Анимация появления иконок при наведении */
.task-card.on-hover .task-icon,
.audience-card.on-hover .audience-icon {
  transform: scale(1.2);
}

/* Общие стили для оверлея в обеих секциях */
.task-card .image-overlay,
.audience-card .image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.6)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.task-card.on-hover .image-overlay,
.audience-card.on-hover .image-overlay {
  opacity: 1;
}

/* Убираем elevation по умолчанию */
:deep(.v-card) {
  elevation: 0;
}
</style> 