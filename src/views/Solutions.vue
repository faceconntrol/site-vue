<template>
  <v-container class="pa-2">
    <PageTitle title="Готовые решения" />
    
    <v-tabs v-model="activeTab" color="primary" class="mb-4">
      <v-tab value="cctv">Видеонаблюдение</v-tab>
      <v-tab value="smarthome">Умный дом</v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <!-- Решения для видеонаблюдения -->
      <v-window-item value="cctv">
        <v-row>
          <v-col cols="12" md="4" v-for="solution in cctvSolutions" :key="solution.id">
            <v-card class="h-100">
              <v-card-title class="text-center pt-4">{{ solution.title }}</v-card-title>
              
              <v-card-text>
                <div class="text-subtitle-1 mb-3">Комплект включает:</div>
                
                <v-list density="compact">
                  <v-list-item v-for="(item, index) in solution.items" :key="index">
                    <v-list-item-title>
                      {{ item.count }}x {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ formatPrice(item.price) }} ₽ × {{ item.count }} = {{ formatPrice(item.price * item.count) }} ₽
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>

                <v-divider class="my-3" />

                <div class="d-flex justify-space-between align-center">
                  <div class="text-subtitle-1">Стоимость оборудования:</div>
                  <div class="text-h6">{{ formatPrice(solution.equipmentTotal) }} ₽</div>
                </div>

                <div class="d-flex justify-space-between align-center mt-2">
                  <div class="text-subtitle-1">Стоимость монтажа:</div>
                  <div class="text-h6">{{ formatPrice(solution.installationTotal) }} ₽</div>
                </div>

                <v-divider class="my-3" />

                <div class="d-flex justify-space-between align-center">
                  <div class="text-h6">Итого:</div>
                  <div class="text-h5 font-weight-bold">{{ formatPrice(solution.total) }} ₽</div>
                </div>
              </v-card-text>

              <v-card-actions class="pa-4">
                <v-btn
                  color="primary"
                  block
                  @click="orderSolution(solution)"
                >
                  Заказать комплект
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- Решения для умного дома -->
      <v-window-item value="smarthome">
        <v-row>
          <v-col cols="12" md="4" v-for="solution in smartHomeSolutions" :key="solution.title">
            <v-card class="h-100">
              <v-card-title class="text-center pt-4">{{ solution.title }}</v-card-title>
              
              <v-card-text>
                <div class="text-subtitle-1 mb-3">{{ solution.description }}</div>
                
                <v-list density="compact">
                  <v-list-item v-for="(productId, index) in solution.products" :key="index">
                    <v-list-item-title>
                      {{ getProductTitle(productId) }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ formatPrice(getProductPrice(productId)) }} ₽
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                
                <v-divider class="my-3" />
                
                <div class="text-subtitle-1 mb-2">Преимущества:</div>
                <v-list density="compact">
                  <v-list-item v-for="(benefit, index) in solution.benefits" :key="index">
                    <v-list-item-title class="text-body-2">
                      <v-icon size="small" color="success" class="mr-1">mdi-check-circle</v-icon>
                      {{ benefit }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
                
                <v-divider class="my-3" />
                
                <div class="d-flex justify-space-between align-center">
                  <div class="text-h6">Итого:</div>
                  <div class="text-h5 font-weight-bold">{{ formatPrice(solution.price) }} ₽</div>
                </div>
              </v-card-text>
              
              <v-card-actions class="pa-4">
                <v-btn
                  color="primary"
                  block
                  @click="orderSmartHomeSolution(solution)"
                >
                  Заказать комплект
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>

    <!-- Диалог заказа -->
    <v-dialog v-model="showOrderDialog" max-width="500px">
      <!-- Форма заказа -->
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { formatPrice } from '@/utils/helpers'
import PageTitle from '@/components/PageTitle.vue'
import { useCatalogStore } from '@/stores/catalog'
import { smartHomeBasic, smartHomeAdvanced, smartApartment, smartHousePro, businessSecurity } from '@/data/solutions'

interface SolutionItem {
  name: string
  count: number
  price: number
}

interface Solution {
  id: string
  title: string
  items: SolutionItem[]
  equipmentTotal: number
  installationTotal: number
  total: number
}

// Константы для расчета стоимости монтажа
const INSTALLATION_PRICES = {
  CAMERA_INSTALL: 1500,    // Установка камеры
  CAMERA_SETUP: 400,       // Настройка камеры
  MOUNTING_BOX: 700,       // Монтажная коробка
  NVR_INSTALL: 1500,       // Установка регистратора
  NVR_SETUP: 1500,         // Настройка регистратора
  COMMISSIONING: 500       // Пуско-наладка
}

const store = useCatalogStore()

// Получаем актуальные цены из каталога
const getPriceFromCatalog = (productId: string, defaultPrice: number): number => {
  const product = store.products.value.find(p => p.id === productId)
  return product ? product.price : defaultPrice
}

// ID продуктов в каталоге
const PRODUCT_IDS = {
  // Камеры
  CAMERA_2MP: 'DS-I200',
  CAMERA_4MP: 'DS-2CD2143G2-I',
  CAMERA_8MP: 'DS-2CD2183G2-I',
  // Регистраторы
  NVR_BASIC: 'DS-N204P4',  // Обновляем ID регистратора
  NVR_STANDARD: 'DS-7604NI-K1/4P',
  NVR_PRO: 'DS-7608NI-K2/8P',
  // Коммутатор
  SWITCH: 'DS-3E0106P-E/M'
}

// Функция обновления цен в решении
const updateSolutionPrices = (solution: Solution) => {
  solution.items.forEach(item => {
    // Обновляем цены на камеры
    if (item.name.includes('DS-I200')) {
      const basePrice = getPriceFromCatalog(PRODUCT_IDS.CAMERA_2MP, 5990)
      item.price = basePrice
    }
    // Обновляем цены на регистраторы
    else if (item.name.includes('DS-N204')) {
      const basePrice = getPriceFromCatalog(PRODUCT_IDS.NVR_BASIC, 8690)
      item.price = basePrice
    }
    else if (item.name.includes('DS-2CD2143G2-I')) {
      const basePrice = getPriceFromCatalog(PRODUCT_IDS.CAMERA_4MP, 12990)
      item.price = basePrice
    }
    else if (item.name.includes('DS-2CD2183G2-I')) {
      const basePrice = getPriceFromCatalog(PRODUCT_IDS.CAMERA_8MP, 19990)
      item.price = basePrice
    }
    else if (item.name.includes('DS-7604NI-K1/4P')) {
      const basePrice = getPriceFromCatalog(PRODUCT_IDS.NVR_STANDARD, 15990)
      item.price = basePrice
    }
    else if (item.name.includes('DS-7608NI-K2/8P')) {
      const basePrice = getPriceFromCatalog(PRODUCT_IDS.NVR_PRO, 24990)
      item.price = basePrice
    }
    // Обновляем цену на коммутатор
    else if (item.name.includes('DS-3E0106P-E/M')) {
      const basePrice = getPriceFromCatalog(PRODUCT_IDS.SWITCH, 5990)
      item.price = basePrice
    }
  })
}

// Активный таб (видеонаблюдение или умный дом)
const activeTab = ref('cctv')

// Готовые решения
const cctvSolutions = ref<Solution[]>([
  {
    id: 'basic',
    title: 'Базовое видеонаблюдение',
    items: [
      { name: 'IP-камера HiWatch DS-I200 (2МП)', count: 4, price: 0 },
      { name: 'IP-видеорегистратор HiWatch DS-N204P4', count: 1, price: 0 },
      { name: 'Коммутатор DS-3E0106P-E/M (4 порта PoE)', count: 1, price: 0 },
      { name: 'Жесткий диск WD Purple 2 ТБ', count: 1, price: 10000 },
      { name: 'Монтажная коробка', count: 4, price: 700 }
    ],
    get equipmentTotal() {
      // Считаем общую стоимость оборудования
      const total = this.items.reduce((sum, item) => {
        // Монтажные коробки считаются как оборудование
        if (item.name.includes('Монтажная коробка')) {
          return sum + (item.price * item.count)
        }
        return sum + (item.price * item.count)
      }, 0)
      return total
    },
    get installationTotal() {
      const cameraCount = 4
      // Расчет стоимости работ
      const cameraInstallation = INSTALLATION_PRICES.CAMERA_INSTALL * cameraCount  // Установка камер
      const cameraSetup = INSTALLATION_PRICES.CAMERA_SETUP * cameraCount          // Настройка камер
      const commissioning = INSTALLATION_PRICES.COMMISSIONING * cameraCount       // Пуско-наладка
      const nvrInstall = INSTALLATION_PRICES.NVR_INSTALL                         // Установка регистратора
      const nvrSetup = INSTALLATION_PRICES.NVR_SETUP                            // Настройка регистратора
      
      return cameraInstallation + cameraSetup + commissioning + nvrInstall + nvrSetup
    },
    get total() {
      return this.equipmentTotal + this.installationTotal
    }
  },
  {
    id: 'standard',
    title: 'Стандартное видеонаблюдение',
    items: [
      { name: 'IP-камера Hikvision DS-2CD2143G2-I (4МП)', count: 4, price: 0 },
      { name: 'IP-видеорегистратор Hikvision DS-7604NI-K1/4P', count: 1, price: 0 },
      { name: 'Коммутатор DS-3E0106P-E/M (4 порта PoE)', count: 1, price: 0 },
      { name: 'Жесткий диск WD Purple 2 ТБ', count: 1, price: 10000 },
      { name: 'Монтажная коробка', count: 4, price: 700 }
    ],
    get equipmentTotal() {
      // Считаем общую стоимость оборудования
      const total = this.items.reduce((sum, item) => {
        // Монтажные коробки считаются как оборудование
        if (item.name.includes('Монтажная коробка')) {
          return sum + (item.price * item.count)
        }
        return sum + (item.price * item.count)
      }, 0)
      return total
    },
    get installationTotal() {
      const cameraCount = 4
      // Расчет стоимости работ
      const cameraInstallation = INSTALLATION_PRICES.CAMERA_INSTALL * cameraCount  // Установка камер
      const cameraSetup = INSTALLATION_PRICES.CAMERA_SETUP * cameraCount          // Настройка камер
      const commissioning = INSTALLATION_PRICES.COMMISSIONING * cameraCount       // Пуско-наладка
      const nvrInstall = INSTALLATION_PRICES.NVR_INSTALL                         // Установка регистратора
      const nvrSetup = INSTALLATION_PRICES.NVR_SETUP                            // Настройка регистратора
      
      return cameraInstallation + cameraSetup + commissioning + nvrInstall + nvrSetup
    },
    get total() {
      return this.equipmentTotal + this.installationTotal
    }
  },
  {
    id: 'professional',
    title: 'Профессиональное видеонаблюдение',
    items: [
      { name: 'IP-камера Hikvision DS-2CD2183G2-I (8МП)', count: 4, price: 0 },
      { name: 'IP-видеорегистратор Hikvision DS-7608NI-K2/8P', count: 1, price: 0 },
      { name: 'Коммутатор DS-3E0106P-E/M (4 порта PoE)', count: 1, price: 0 },
      { name: 'Жесткий диск WD Purple 4 ТБ', count: 1, price: 13400 },
      { name: 'Монтажная коробка', count: 4, price: 700 }
    ],
    get equipmentTotal() {
      // Считаем общую стоимость оборудования
      const total = this.items.reduce((sum, item) => {
        // Монтажные коробки считаются как оборудование
        if (item.name.includes('Монтажная коробка')) {
          return sum + (item.price * item.count)
        }
        return sum + (item.price * item.count)
      }, 0)
      return total
    },
    get installationTotal() {
      const cameraCount = 4
      // Расчет стоимости работ
      const cameraInstallation = INSTALLATION_PRICES.CAMERA_INSTALL * cameraCount  // Установка камер
      const cameraSetup = INSTALLATION_PRICES.CAMERA_SETUP * cameraCount          // Настройка камер
      const commissioning = INSTALLATION_PRICES.COMMISSIONING * cameraCount       // Пуско-наладка
      const nvrInstall = INSTALLATION_PRICES.NVR_INSTALL                         // Установка регистратора
      const nvrSetup = INSTALLATION_PRICES.NVR_SETUP                            // Настройка регистратора
      
      return cameraInstallation + cameraSetup + commissioning + nvrInstall + nvrSetup
    },
    get total() {
      return this.equipmentTotal + this.installationTotal
    }
  }
])

// Решения для умного дома
const smartHomeSolutions = ref([
  smartHomeBasic,
  smartHomeAdvanced,
  smartApartment,
  smartHousePro,
  businessSecurity
])

// Диалог заказа
const showOrderDialog = ref(false)
const selectedSolution = ref<Solution | null>(null)

// Функция заказа для решений видеонаблюдения
const orderSolution = (solution: Solution) => {
  selectedSolution.value = solution
  showOrderDialog.value = true
}

// Получаем заголовок и цену продукта по ID
const getProductTitle = (productId: string): string => {
  const product = store.products.value.find(p => p.id === productId)
  return product ? product.title : productId
}

const getProductPrice = (productId: string): number => {
  const product = store.products.value.find(p => p.id === productId)
  return product ? product.price : 0
}

// Заказ решения для умного дома
const orderSmartHomeSolution = (solution: any) => {
  selectedSolution.value = {
    id: solution.title,
    title: solution.title,
    items: solution.products.map((productId: string) => ({
      name: getProductTitle(productId),
      count: 1,
      price: getProductPrice(productId)
    })),
    equipmentTotal: solution.price,
    installationTotal: 0,
    total: solution.price
  }
  showOrderDialog.value = true
}

// Обновляем цены при изменении каталога
watch(() => store.products.value, () => {
  cctvSolutions.value.forEach(updateSolutionPrices)
}, { deep: true })

// Загружаем актуальные цены при монтировании компонента
onMounted(() => {
  cctvSolutions.value.forEach(updateSolutionPrices)
})

// Добавим вывод для отладки с детализацией
watch(() => cctvSolutions.value, (newSolutions) => {
  newSolutions.forEach(solution => {
    console.log(`${solution.title}:`)
    console.log('Детализация оборудования:')
    solution.items.forEach(item => {
      console.log(`${item.name}: ${item.price} × ${item.count} = ${item.price * item.count}`)
    })
    console.log('Итого оборудование:', solution.equipmentTotal)
    console.log('Итого монтаж:', solution.installationTotal)
    console.log('ВСЕГО:', solution.total)
    console.log('---')
  })
}, { deep: true })
</script>

<style scoped>
.v-card-title {
  word-break: normal;
  white-space: normal;
  line-height: 1.2;
}

.v-list-item-title {
  white-space: normal;
  line-height: 1.2;
}
</style> 