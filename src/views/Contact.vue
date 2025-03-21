<template>
  <div class="contact-page py-16">
    <v-container>
      <h2 class="text-h4 font-weight-bold mb-6">Свяжитесь с нами</h2>

      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <div class="contact-info mb-8">
            <h2 class="text-h5 font-weight-bold mb-4">Контактная информация</h2>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-phone</v-icon>
                </template>
                <v-list-item-title>
                  <a href="tel:+78129998877" class="text-decoration-none">+7 (921) 948-66-75</a>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-email</v-icon>
                </template>
                <v-list-item-title>
                  <a href="mailto:info@third-eye.ru" class="text-decoration-none">info@third-eye.ru</a>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-clock-outline</v-icon>
                </template>
                <v-list-item-title>
                  Пн-Вс: 10:00 - 19:00
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="contact-form pa-6" elevation="2">
            <h2 class="text-h5 font-weight-bold mb-6">Оставить заявку</h2>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="form.name"
                label="Ваше имя"
                required
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                v-model="form.phone"
                label="Телефон"
                required
                :rules="[rules.required, rules.phone]"
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                label="Email"
                :rules="[rules.email]"
              ></v-text-field>

              <v-textarea
                v-model="form.message"
                label="Сообщение"
                rows="4"
              ></v-textarea>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
              >
                Отправить заявку
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>

      <h1 class="text-h3 font-weight-bold mb-6">Установка видеонаблюдения в Ленинградской области</h1>
      
      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <v-card class="region-card h-100" elevation="2">
            <v-card-item>
              <v-card-title class="text-h5 font-weight-bold mb-4">
                <v-icon start color="primary" class="me-2">mdi-map-marker</v-icon>
                Мшинская (Мшинское)
              </v-card-title>
              <v-card-text>
                <p class="text-body-1 mb-4">
                  Профессиональная установка систем видеонаблюдения в поселке Мшинская и прилегающих садоводствах. 
                  Комплексные решения для защиты вашей собственности с возможностью удаленного доступа и мониторинга.
                </p>
                
                <h3 class="text-h6 mb-3">Садоводства и территории:</h3>
                <v-expansion-panels class="mb-6 snt-list-panel">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      Список СНТ ({{ sntMshinskaya.length }} садоводств)
                      <template v-slot:actions="{ expanded }">
                        <v-icon color="primary">
                          {{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                        </v-icon>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <ul class="features-list snt-grid">
                        <li v-for="(snt, index) in sntMshinskaya" :key="index">
                          {{ snt }}
                        </li>
                      </ul>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
                
                <!-- Полный список СНТ (для SEO, скрыт визуально) -->
                <div class="visually-hidden">
                  <h4>Мы устанавливаем видеонаблюдение в следующих СНТ:</h4>
                  <ul class="seo-list">
                    <li v-for="(snt, index) in sntMshinskaya" :key="index">
                      Установка видеонаблюдения {{ snt }} Мшинская, монтаж камер {{ snt }},
                      системы безопасности {{ snt }}, охранное видеонаблюдение {{ snt }},
                      IP-камеры {{ snt }}, монтаж видеонаблюдения {{ snt }}
                      {{ snt }}
                    </li>
                  </ul>
                </div>

                <h3 class="text-h6 mb-3">Предлагаемые решения:</h3>
                <ul class="features-list">
                  <li>Системы для частных домов и дач с удаленным доступом</li>
                  <li>Комплексная защита территории СНТ</li>
                  <li>Видеонаблюдение для магазинов и предприятий</li>
                  <li>Камеры с ночным видением и датчиками движения</li>
                  <li>Интеграция с системами умного дома</li>
                </ul>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="region-card h-100" elevation="2">
            <v-card-item>
              <v-card-title class="text-h5 font-weight-bold mb-4">
                <v-icon start color="primary" class="me-2">mdi-map-marker</v-icon>
                Дивенская (Дивенское)
              </v-card-title>
              <v-card-text>
                <p class="text-body-1 mb-4">
                  Современные системы видеонаблюдения для жителей Дивенской и окрестностей. 
                  Профессиональный монтаж с учетом особенностей местности и климатических условий.
                </p>

                <h3 class="text-h6 mb-3">Садоводства и территории:</h3>
                <v-expansion-panels class="mb-6 snt-list-panel">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      Список СНТ ({{ sntDivenskaya.length }} садоводств)
                      <template v-slot:actions="{ expanded }">
                        <v-icon color="primary">
                          {{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                        </v-icon>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <ul class="features-list snt-grid">
                        <li v-for="(snt, index) in sntDivenskaya" :key="index">
                          {{ snt }}
                        </li>
                      </ul>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
                
                <!-- Полный список СНТ (для SEO, скрыт визуально) -->
                <div class="visually-hidden">
                  <h4>Мы устанавливаем видеонаблюдение в следующих СНТ и поселках Дивенской:</h4>
                  <ul class="seo-list">
                    <li v-for="(snt, index) in sntDivenskaya" :key="index">
                      Установка видеонаблюдения {{ snt }} Дивенская, монтаж камер {{ snt }},
                      системы безопасности {{ snt }}, охранное видеонаблюдение {{ snt }},
                      IP-камеры {{ snt }}, монтаж видеонаблюдения {{ snt }}
                      {{ snt }}
                    </li>
                  </ul>
                </div>

                <h3 class="text-h6 mb-3">Предлагаемые решения:</h3>
                <ul class="features-list">
                  <li>Системы контроля периметра большой территории</li>
                  <li>Видеонаблюдение для частных домов и дач</li>
                  <li>Комплексные системы безопасности для СНТ</li>
                  <li>Камеры с распознаванием автомобильных номеров</li>
                  <li>Профессиональное техническое обслуживание</li>
                </ul>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mb-12">
        <v-col cols="12">
          <div class="text-center">
            <p class="text-h6 mb-6">
              Работаем во всех населенных пунктах и садоводствах Ленинградской области. 
              Бесплатный выезд специалиста для оценки объекта.
            </p>
            <v-btn
              color="primary"
              size="large"
              to="/calculator"
              class="mx-2"
            >
              Рассчитать стоимость
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <p class="text-h6 font-weight-bold mb-6">
        Мы применяем современное оборудование и индивидуальный подход к каждому клиенту, что позволяет нам
        предлагать оптимальные решения для любых объектов.
      </p>
      
      <h3 class="text-h5 font-weight-bold mt-8 mb-4">Другие населенные пункты, где мы работаем:</h3>
      
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="(location, index) in otherLocations" :key="index">
          <v-card class="location-card h-100" flat>
            <v-card-item>
              <v-card-title class="d-flex align-center">
                <v-icon color="primary" class="me-2">mdi-map-marker</v-icon>
                {{ location.name }}
              </v-card-title>
              <v-card-text>
                <p class="text-body-2">
                  {{ location.description }}
                </p>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- SEO-текст для дополнительных локаций -->
      <div class="visually-hidden">
        <h4>Установка видеонаблюдения в Гатчинском и Лужском районах</h4>
        <p>
          Компания "Третий Глаз" предлагает профессиональные услуги по монтажу систем видеонаблюдения в следующих населенных пунктах:
          <span v-for="location in otherLocations" :key="location.name">
            Установка видеонаблюдения в {{ location.name }}, монтаж камер в {{ location.name }}, 
            системы безопасности {{ location.name }}, охранное видеонаблюдение {{ location.name }}, 
            IP-камеры {{ location.name }}, монтаж видеонаблюдения {{ location.name }}.
          </span>
          Работаем по всей Ленинградской области, предлагаем выгодные цены и профессиональный монтаж.
        </p>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from '@vue/runtime-dom'
import { validateEmail, validatePhone } from '@/utils/helpers'
import { useHead } from '@vueuse/head'

interface ContactForm {
  name: string
  phone: string
  email: string
  message: string
}

// SEO мета-теги
useHead({
  title: 'Установка видеонаблюдения в Мшинской, Дивенской, Гатчине, Луге и других населенных пунктах | Контакты | Третий Глаз',
  meta: [
    {
      name: 'description',
      content: 'Профессиональная установка систем видеонаблюдения в Мшинской, Дивенской, Гатчине, Луге и других населенных пунктах. Работаем во всех СНТ Ленинградской области. Бесплатный выезд специалиста для оценки объекта.'
    },
    {
      name: 'keywords',
      content: 'установка видеонаблюдения Мшинская, установка видеонаблюдения Дивенская, монтаж камер СНТ, системы безопасности Ленинградская область, контакты установщика видеонаблюдения'
    }
  ]
})

// Списки СНТ
const sntMshinskaya = [
  'СНТ Нева Мшинское',
  'СНТ Дружба-2',
  'СНТ Ворошиловец',
  'СНТ Металлург',
  'СНТ Испытатель',
  'СНТ ЛОС',
  'СНТ Якорь',
  'СНТ Веретено',
  'СНТ Рассвет-2',
  'СНТ Причал',
  'СНТ Разинец',
  'СНТ Атмосфера',
  'СНТ Заря',
  'СТ Невское',
  'СНТ Технолог',
  'СНТ Советская звезда',
  'СНТ Каскад',
  'Мшинское СНТ Невское',
  'СНТ Краностроитель',
  'СНТ Равенство',
  'СНТ Содружество',
  'СНТ Рассвет',
  'СНТ Старт',
  'СНТ Спектр',
  'СНТ Прогресс',
  'СНТ Гидростроитель',
  'СНТ Буревестник',
  'СНТ ЛИСИ',
  'СНТ Ручей',
  'СНТ Обуховец-2',
  'СНТ Нептун',
  'СНТ Сигнал-2',
  'СНТ Импульс',
  'СНТ Дружба',
  'ТСН Тельмановец',
  'СНТ Строитель-2',
  'СНТ Парус',
  'СНТ Железнодорожник',
  'СНТ Строитель',
  'СНТ Соколовское',
  'СНТ Лесное 17',
  'СНТ Балтиец-2',
  'СНТ Дизелист',
  'СНТ Березка',
  'СНТ Металлист',
  'СНТ Метро-1',
  'СНТ Корабел',
  'СНТ Самсон',
  'СНТ Обуховец 1',
  'СНТ Кронштадтец',
  'СНТ Светоч',
  'СНТ Балтиец-1',
  'СНТ ВНИИМ им. Д.И.Менделеева',
  'СНТ Первомайская заря',
  'СНТ Радуга-1',
  'СНТ Мшинское',
  'СНТ Игрушка',
  'СНТ Солнечное',
  'СНТ Знамя',
  'СНТ Пролетарец',
  'СНТ Лесное',
  'СНТ Озон',
  'СНТ Нева Северная'
]

// Список СНТ Дивенской
const sntDivenskaya = [
  'СНТ Невмаш',
  'СНТ Лутиновка',
  'д. Большая Дивенка',
  'п. Дивенский',
  'СНТ Олимп',
  'ТСН Красный Маяк',
  'СНТ Эстри',
  'СНТ Дивное-2',
  'КП Дивенка',
  'СНТ Аэрофлот',
  'ТСН Театральный',
  'СНТ Экран',
  'СНТ Урожай',
  'СНТ Карбюратор',
  'СНТ Радуга',
  'СНТ Дивенское',
  'СНТ Дивное',
  'СНТ Дружное',
  'ТСН Дивная Поляна',
  'СНТ Нива',
  'СНТ Строитель',
  'СНТ Волна'
]

// Дополнительные локации
const otherLocations = [
  {
    name: 'Гатчина',
    description: 'Профессиональная установка систем видеонаблюдения в Гатчине и пригородах. Комплексная защита жилых домов, офисов и предприятий.'
  },
  {
    name: 'Прибытково',
    description: 'Монтаж камер видеонаблюдения в поселке Прибытково. Современные решения для частных домов и дач.'
  },
  {
    name: 'Карташевская',
    description: 'Установка систем безопасности в Карташевской. Защита частной и коммерческой недвижимости.'
  },
  {
    name: 'Суйда',
    description: 'Видеонаблюдение для жителей Суйды. Системы с удаленным доступом и круглосуточным мониторингом.'
  },
  {
    name: 'Сиверский',
    description: 'Монтаж камер в поселке Сиверский. Оборудование для наблюдения за территорией в любое время суток.'
  },
  {
    name: 'Никольское',
    description: 'Комплексные решения для безопасности в Никольском. IP-камеры с высоким разрешением.'
  },
  {
    name: 'Рождествено',
    description: 'Установка видеонаблюдения в Рождествено. Интеграция с системами умного дома.'
  },
  {
    name: 'Большая Ящера',
    description: 'Защита частной собственности в поселке Большая Ящера. Камеры с ночным видением и датчиками движения.'
  },
  {
    name: 'Сорочкино',
    description: 'Видеонаблюдение для жителей Сорочкино. Профессиональный монтаж и настройка оборудования.'
  },
  {
    name: 'Толмачёво',
    description: 'Комплексные системы безопасности в Толмачёво. Удаленный доступ к камерам с мобильного устройства.'
  },
  {
    name: 'Луга',
    description: 'Профессиональная установка видеонаблюдения в Луге. Решения для частных домов, организаций и предприятий.'
  }
]

const form = ref<ContactForm>({
  name: '',
  phone: '',
  email: '',
  message: ''
})

const loading = ref(false)

const rules = {
  required: (v: string) => !!v || 'Обязательное поле',
  email: (v: string) => !v || validateEmail(v) || 'Неверный формат email',
  phone: (v: string) => validatePhone(v) || 'Неверный формат телефона'
}

const submitForm = async () => {
  loading.value = true
  try {
    // Здесь будет логика отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000))
    form.value = {
      name: '',
      phone: '',
      email: '',
      message: ''
    }
    alert('Заявка успешно отправлена!')
  } catch (error) {
    alert('Произошла ошибка при отправке заявки')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-page {
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

.contact-form {
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
}

.region-card {
  transition: transform 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.region-card:hover {
  transform: translateY(-8px);
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

.snt-list-panel {
  border: none;
  box-shadow: none;
  background: transparent;
}

:deep(.v-expansion-panel) {
  background: transparent !important;
  box-shadow: none !important;
}

:deep(.v-expansion-panel-title) {
  padding: 8px 0;
  color: var(--v-theme-primary);
  font-weight: 500;
}

.snt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 8px;
}

/* Скрытый список для SEO */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.location-card {
  padding: 8px;
  border-radius: 8px;
  background-color: #f5f5f5;
  transition: background-color 0.3s;
  margin-bottom: 8px;
}

.location-card:hover {
  background-color: #e0e0e0;
}
</style> 