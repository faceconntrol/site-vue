<template>
  <v-container class="pa-2">
    <PageTitle title="Калькулятор стоимости" />

    <v-row>
      <v-col cols="12" md="7">
        <v-card class="pa-2">
          <v-form @submit.prevent="calculate" class="calculator-form">
            <v-select
              v-model="form.resolution"
              :items="resolutionTypes"
              item-title="title"
              item-value="value"
              label="Разрешение камер"
              density="compact"
              class="mb-1"
              hide-details
            />

            <div class="cameras-section my-2">
              <div v-for="brand in ['hikvision', 'hiwatch']" :key="brand" class="mb-1">
                <div class="d-flex align-center mb-1">
                  <v-icon icon="mdi-cctv" size="small" class="mr-1" />
                  <span class="text-subtitle-2">{{ brand === 'hikvision' ? 'Hikvision' : 'HiWatch' }}</span>
                </div>
                <div v-for="camera in filteredCamerasByBrand(brand)" :key="camera.id" class="camera-item py-1 px-2 rounded mb-1">
                  <div class="d-flex align-center">
                    <div class="product-image-wrapper mr-2">
                      <v-img
                        :src="camera.image"
                        :alt="camera.title"
                        class="rounded product-image"
                        cover
                      />
                    </div>
                    <v-checkbox
                      v-model="selectedCameraIds"
                      :value="camera.id"
                      :label="camera.title"
                      density="compact"
                      hide-details
                      class="flex-grow-1 camera-checkbox"
                    />
                    <v-text-field
                      v-if="selectedCameraIds.includes(camera.id)"
                      v-model.number="cameraCountMap[camera.id]"
                      type="number"
                      min="1"
                      max="32"
                      density="compact"
                      hide-details
                      class="camera-count-field"
                      style="max-width: 70px;"
                      @input="validateNumericInput"
                    />
                  </div>
                  <div class="text-caption text-grey-darken-1 ml-14">
                    {{ camera.description }}
                    <br>
                    <strong>{{ formatPrice(camera.price) }} ₽</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="storage-section mb-2">
              <div class="d-flex align-center mb-1">
                <v-icon icon="mdi-harddisk" size="small" class="mr-1" />
                <span class="text-subtitle-2">Хранение данных</span>
              </div>
              <div class="d-flex gap-2">
                <v-checkbox
                  v-model="form.useNvr"
                  label="Видеорегистратор"
                  density="compact"
                  hide-details
                />
                <v-checkbox
                  v-model="form.useCloud"
                  label="Облачное хранилище"
                  density="compact"
                  hide-details
                />
              </div>
            </div>

            <v-select
              v-if="form.useNvr"
              v-model="form.selectedNvr"
              :items="filteredNvrs"
              item-title="title"
              return-object
              :label="`Видеорегистратор (требуется минимум ${requiredChannels} ${getNounForm(requiredChannels, 'канал', 'канала', 'каналов')})`"
              density="compact"
              class="mb-2"
              hide-details
              :disabled="!form.useNvr || filteredNvrs.length === 0"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" density="compact">
                  <v-list-item-title class="text-body-2">{{ item.raw.title }}</v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ item.raw.channels }} каналов - {{ formatPrice(item.raw.price) }} ₽
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-select>

            <template v-if="form.useNvr && form.selectedNvr">
              <div class="storage-hdd-section mb-2">
                <div class="d-flex align-center mb-1 mt-2">
                  <v-icon icon="mdi-harddisk" size="small" class="mr-1" />
                  <span class="text-subtitle-2">Жесткий диск</span>
                </div>
                <v-radio-group v-model="form.selectedHdd" hide-details>
                  <v-radio
                    v-for="hdd in hddOptions"
                    :key="hdd.id"
                    :value="hdd"
                    :label="getHddLabel(hdd)"
                    density="compact"
                  ></v-radio>
                </v-radio-group>
              </div>
            </template>
          </v-form>

          <v-divider class="my-3"></v-divider>

          <v-btn
            color="primary"
            block
            :disabled="selectedCameraIds.length === 0"
            @click="calculate"
          >
            Рассчитать стоимость
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card class="pa-2" v-if="calculationComplete">
          <CalculatorResults :results="calculationResults" :formatPrice="formatPrice" />
          
          <v-card-actions>
            <v-btn
              color="primary"
              block
              class="mt-2"
              @click="submitOrder"
            >
              Оформить заказ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import CalculatorResults from '@/components/CalculatorResults.vue'
import { catalogData } from '@/data/catalog'
import { STORAGE_BITRATE } from '@/constants/storage'
import { SecurityCalculator } from '@/utils/calculator'
import type { HddOption } from '@/types'

// Типы для калькулятора
interface HddOption {
  id: string;
  title: string;
  price: number;
  capacity: number;
}

// Инициализация состояния
const form = ref({
  resolution: '2mp',
  useNvr: true,
  useCloud: false,
  selectedNvr: null,
  selectedHdd: null
})

const selectedCameraIds = ref<string[]>([])
const cameraCountMap = ref<Record<string, number>>({})
const calculationResults = ref(null)
const calculationComplete = ref(false)

// Опции для выбора разрешения
const resolutionTypes = [
  { title: '2 Мп (1080p)', value: '2mp' },
  { title: '4 Мп (1440p)', value: '4mp' },
  { title: '8 Мп (4K)', value: '8mp' }
]

// Опции для жестких дисков
const hddOptions: HddOption[] = [
  { id: 'hdd-1tb', title: 'HDD 1 ТБ', price: 3500, capacity: 1000 },
  { id: 'hdd-2tb', title: 'HDD 2 ТБ', price: 5000, capacity: 2000 },
  { id: 'hdd-4tb', title: 'HDD 4 ТБ', price: 8500, capacity: 4000 },
  { id: 'hdd-6tb', title: 'HDD 6 ТБ', price: 12000, capacity: 6000 }
]

// При изменении разрешения сбрасываем выбранный регистратор
watch(() => form.value.resolution, () => {
  form.value.selectedNvr = null
  form.value.selectedHdd = null
})

// При изменении списка камер сбрасываем выбранный регистратор, если он не подходит
watch([selectedCameraIds, cameraCountMap], () => {
  if (form.value.selectedNvr && form.value.selectedNvr.channels < requiredChannels.value) {
    form.value.selectedNvr = null
    form.value.selectedHdd = null
  }
})

// Вычисляем необходимое количество каналов для регистратора
const requiredChannels = computed(() => {
  return selectedCameraIds.value.reduce((total, id) => 
    total + (cameraCountMap.value[id] || 1), 0)
})

// Фильтруем видеорегистраторы, чтобы они поддерживали нужное количество камер
const filteredNvrs = computed(() => {
  const nvrs = Object.values(catalogData)
    .filter(product => 
      product.category === 'recorder' && 
      product.channels && 
      product.channels >= requiredChannels.value
    )
    .sort((a, b) => a.price - b.price)
  
  return nvrs
})

// Фильтруем камеры по бренду и разрешению
const filteredCamerasByBrand = (brand: string) => {
  const resolutionMap = {
    '2mp': 2,
    '4mp': 4,
    '8mp': 8
  }
  
  return Object.values(catalogData)
    .filter(product => 
      product.category === 'camera' && 
      product.brand === brand && 
      product.resolution === resolutionMap[form.value.resolution as keyof typeof resolutionMap]
    )
    .sort((a, b) => a.price - b.price)
}

// Инициализация счетчиков для выбранных камер
watch(selectedCameraIds, (newIds) => {
  // Добавляем записи для новых выбранных камер
  newIds.forEach(id => {
    if (!cameraCountMap.value[id]) {
      cameraCountMap.value[id] = 1
    }
  })
  
  // Удаляем записи для отмененных камер
  Object.keys(cameraCountMap.value).forEach(id => {
    if (!newIds.includes(id)) {
      delete cameraCountMap.value[id]
    }
  })
})

// При монтировании компонента устанавливаем начальные значения
onMounted(() => {
  // Выбираем первый HDD по умолчанию
  if (hddOptions.length > 0) {
    form.value.selectedHdd = hddOptions[0]
  }
})

// Расчет стоимости
const calculate = () => {
  if (selectedCameraIds.value.length === 0) {
    alert('Пожалуйста, выберите хотя бы одну камеру')
    return
  }
  
  const calculator = new SecurityCalculator(catalogData)
  
  try {
    calculationResults.value = calculator.calculateTotal({
      cameraIds: selectedCameraIds.value,
      cameraCounts: cameraCountMap.value,
      useNvr: form.value.useNvr,
      selectedNvr: form.value.selectedNvr,
      selectedHdd: form.value.selectedHdd,
      resolution: form.value.resolution
    })
    
    calculationComplete.value = true
  } catch (error) {
    console.error('Ошибка при расчете:', error)
    alert('Произошла ошибка при расчете стоимости. Пожалуйста, проверьте введенные данные.')
  }
}

// Отправка заказа
const submitOrder = () => {
  // Здесь будет логика оформления заказа
  console.log('Заказ оформлен:', {
    cameras: selectedCameraIds.value.map(id => ({
      id,
      title: catalogData[id].title,
      count: cameraCountMap.value[id] || 1
    })),
    nvr: form.value.selectedNvr,
    hdd: form.value.selectedHdd,
    total: calculationResults.value.total
  })
  
  alert('Заказ успешно оформлен! Мы свяжемся с вами для уточнения деталей.')
}

// Расчет дней хранения (для подсказок)
const calculateStorageDays = computed(() => {
  if (!form.value.selectedHdd) return 0
  
  const totalCameras = selectedCameraIds.value.reduce((sum, id) => 
    sum + (cameraCountMap.value[id] || 1), 0)
  
  if (totalCameras === 0) return 0
  
  const bitrate = STORAGE_BITRATE[form.value.resolution]?.mainstream.bitrate || 4096
  const gbPerDayPerCamera = (bitrate * 60 * 60 * 24) / (8 * 1024) // Перевод из Кбит/с в ГБ/день
  const totalGbPerDay = gbPerDayPerCamera * totalCameras
  
  // Учитываем, что часть пространства занимают метаданные файловой системы
  const hddCapacityGB = form.value.selectedHdd.capacity
  const reserveSpace = 0.05 // 5% резервируем для служебных нужд
  const usableSpace = hddCapacityGB * (1 - reserveSpace)
  
  return Math.floor(usableSpace / totalGbPerDay)
})

// Функция для метки HDD с информацией о времени хранения
const getHddLabel = (hdd: HddOption) => {
  const baseLabel = `${hdd.title} (${formatPrice(hdd.price)} ₽)`
  
  if (form.value.selectedHdd?.id !== hdd.id) {
    return baseLabel
  }
  
  const totalCameras = selectedCameraIds.value.reduce((sum, id) => 
    sum + (cameraCountMap.value[id] || 0), 0)
  
  if (totalCameras === 0) return baseLabel
  
  return `${baseLabel} - ${formatDays(calculateStorageDays.value)} записи при ${totalCameras} ${
    getNounForm(totalCameras, 'камере', 'камерах', 'камерах')
  } ${form.value.resolution}`
}

// Функция форматирования цены
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(price))
}

// Функция для проверки числовых значений
function validateNumericInput(event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Если ввод не является числом, очищаем поле
  if (value && isNaN(Number(value))) {
    input.value = ''
  }
}

function getNounForm(number: number, one: string, two: string, five: string) {
  let n = Math.abs(number)
  n %= 100
  if (n >= 5 && n <= 20) {
    return five
  }
  n %= 10
  if (n === 1) {
    return one
  }
  if (n >= 2 && n <= 4) {
    return two
  }
  return five
}

function formatDays(days: number) {
  if (days === 0) return 'менее 1 дня'
  if (days === 1) return '1 день'
  if (days > 1 && days < 5) return `${days} дня`
  return `${days} дней`
}
</script>

<style scoped>
.calculator-form {
  max-width: 100%;
}

.camera-item {
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s;
  font-size: 0.875rem;
}

.camera-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.camera-checkbox :deep(.v-label) {
  font-size: 0.875rem;
  opacity: 1;
  line-height: 1.2;
}

.camera-count-field {
  margin-left: 8px;
}

.cameras-section {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 6px;
}

:deep(.v-expansion-panel-title) {
  padding: 8px 16px;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 12px 16px;
}

.product-image-wrapper {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.text-caption {
  margin-left: 44px;
  font-size: 0.75rem;
  line-height: 1.2;
}

.text-subtitle-2 {
  font-size: 0.875rem;
}

:deep(.v-selection-control) {
  min-height: 28px;
}

.storage-estimate {
  font-size: 0.875rem;
}
</style> 