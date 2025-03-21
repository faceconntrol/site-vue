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
                <div class="d-flex align-center mb-1">
                  <v-icon icon="mdi-harddisk" size="small" class="mr-1" />
                  <span class="text-subtitle-2">Жесткий диск для видеонаблюдения</span>
                </div>
                
                <v-radio-group
                  v-model="form.selectedHdd"
                  density="compact"
                  class="mt-1"
                  hide-details
                >
                  <template v-for="hdd in hddOptions" :key="hdd.id">
                    <v-radio
                      :label="getHddLabel(hdd)"
                      :value="hdd"
                    />
                  </template>
                </v-radio-group>
              </div>
            </template>

            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!isFormValid"
              @click="calculate"
              block
            >
              Рассчитать стоимость
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card v-if="result" class="pa-3">
          <h2 class="text-h6 mb-3">Результат расчета</h2>
          
          <!-- Оборудование -->
          <div class="mb-3">
            <div class="text-subtitle-1 mb-2">Оборудование:</div>
            <template v-for="camera in result.equipment.cameras" :key="camera.name">
              <div class="d-flex justify-space-between mb-1">
                <span>{{ camera.name }} ({{ camera.count }} шт.):</span>
                <span>{{ formatPrice(camera.price * camera.count) }} ₽</span>
              </div>
            </template>

            <!-- Монтажные коробки -->
            <div class="d-flex justify-space-between mb-1">
              <span>Монтажные коробки ({{ getTotalCameras }} шт.):</span>
              <span>{{ formatPrice(result.breakdown.installation.mountingBox) }} ₽</span>
            </div>
            
            <template v-if="result.equipment.storage">
              <div class="d-flex justify-space-between mb-1">
                <span>{{ result.equipment.storage.name }}:</span>
                <span>{{ formatPrice(result.equipment.storage.price) }} ₽</span>
              </div>
              <div v-if="result.equipment.storage.hdd" class="d-flex justify-space-between mb-1">
                <span>{{ result.equipment.storage.hdd.name }}:</span>
                <span>{{ formatPrice(result.equipment.storage.hdd.price) }} ₽</span>
              </div>
            </template>

            <template v-if="result && result.equipment.network.items.length > 0">
              <div class="result-section">
                <h3 class="text-subtitle-1 font-weight-medium">Сетевое оборудование</h3>
                <div v-for="(item, index) in result.equipment.network.items" :key="index" class="d-flex justify-space-between">
                  <span>{{ item.name }} {{ item.count > 1 ? `(${item.count} шт.)` : '' }}</span>
                  <span>{{ formatPrice(item.price) }} ₽</span>
                </div>
              </div>
            </template>

            <v-divider class="my-2" />
            
            <div class="d-flex justify-space-between">
              <strong>Итого за оборудование:</strong>
              <strong>{{ formatPrice(getTotalEquipment) }} ₽</strong>
            </div>
          </div>

          <!-- Монтажные работы -->
          <div class="mb-3">
            <div class="text-subtitle-1 mb-2">Монтажные работы:</div>
            <div class="d-flex justify-space-between mb-1">
              <span>Установка камер:</span>
              <span>{{ formatPrice(result.breakdown.installation.cameraInstall) }} ₽</span>
            </div>
            <div class="d-flex justify-space-between mb-1">
              <span>Настройка камер:</span>
              <span>{{ formatPrice(result.breakdown.installation.cameraSetup) }} ₽</span>
            </div>
            <div class="d-flex justify-space-between mb-1">
              <span>Пуско-наладочные работы:</span>
              <span>{{ formatPrice(result.breakdown.installation.commissioning) }} ₽</span>
            </div>
            <template v-if="result.breakdown.installation.nvrInstall">
              <div class="d-flex justify-space-between mb-1">
                <span>Установка видеорегистратора:</span>
                <span>{{ formatPrice(result.breakdown.installation.nvrInstall) }} ₽</span>
              </div>
              <div class="d-flex justify-space-between mb-1">
                <span>Настройка видеорегистратора:</span>
                <span>{{ formatPrice(result.breakdown.installation.nvrSetup) }} ₽</span>
              </div>
            </template>

            <v-divider class="my-2" />
            
            <div class="d-flex justify-space-between">
              <strong>Итого за работы:</strong>
              <strong>{{ formatPrice(getTotalWork) }} ₽</strong>
            </div>
          </div>

          <!-- Облачное хранилище -->
          <template v-if="result.breakdown.cloudStorage">
            <div class="mb-3">
              <div class="text-subtitle-1 mb-2">Облачное хранилище:</div>
              <div class="d-flex justify-space-between mb-1">
                <span>Ежемесячная плата:</span>
                <span>{{ formatPrice(result.breakdown.cloudStorage) }} ₽</span>
              </div>
            </div>
          </template>

          <v-divider class="my-3" />

          <!-- Итого -->
          <div class="d-flex flex-column">
            <div class="d-flex justify-space-between mb-1">
              <span>Оборудование:</span>
              <span>{{ formatPrice(getTotalEquipment) }} ₽</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span>Монтажные работы:</span>
              <span>{{ formatPrice(getTotalWork) }} ₽</span>
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="text-h6">ИТОГО:</span>
              <span class="text-h6 text-primary">{{ formatPrice(result.total) }} ₽</span>
            </div>
          </div>

          <v-alert
            type="info"
            variant="tonal"
            density="compact"
            class="text-caption mt-3 mb-0"
          >
            {{ result.disclaimer }}
          </v-alert>

          <v-btn
            color="primary"
            block
            class="mt-3"
            @click="showOrderDialog = true"
          >
            Заказать
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from '@vue/runtime-dom'
import { useCatalogStore } from '@/stores/catalog'
import { formatPrice } from '@/utils/helpers'
import { NETWORK_EQUIPMENT } from '@/constants'
import { STORAGE_BITRATE } from '@/constants/storage'
import type { 
  Product,
  Form,
  OrderForm,
  CalculatorResult,
  ResolutionType,
  NetworkEquipment,
  HddOption
} from '@/types/store'
import PageTitle from '@/components/PageTitle.vue'

const hddOptions: HddOption[] = [
  { id: 'hdd-1tb', capacity: 1, title: 'WD Purple 1 ТБ', price: 6500 },
  { id: 'hdd-2tb', capacity: 2, title: 'WD Purple 2 ТБ', price: 10000 },
  { id: 'hdd-4tb', capacity: 4, title: 'WD Purple 4 ТБ', price: 13400 },
  { id: 'hdd-6tb', capacity: 6, title: 'WD Purple 6 ТБ', price: 18500 }
]

interface Form {
  selectedCameras: SelectedCamera[];
  resolution: string;
  selectedNvr: Product | null;
  selectedHdd: HddOption | null;
  useNvr: boolean;
  useCloud: boolean;
}

const form = ref<Form>({
  selectedCameras: [],
  resolution: '',
  selectedNvr: null,
  selectedHdd: null,
  useNvr: false,
  useCloud: false
})

const loading = ref(false)
const result = ref<CalculatorResult | null>(null)
const showOrderDialog = ref(false)
const orderFormRef = ref<any>(null)
const orderFormValid = ref(false)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const orderFormErrors = ref<Record<string, string[]>>({})

const store = useCatalogStore()
const selectedCameraIds = ref<string[]>([])
const cameraCountMap = ref<Record<string, number>>({})

// Добавляем наблюдатель за изменением выбранных камер
watch(selectedCameraIds, (newIds, oldIds) => {
  // Находим новые выбранные ID (которых не было в старом массиве)
  const newlySelectedIds = newIds.filter(id => !oldIds?.includes(id))
  
  // Для каждого нового ID устанавливаем количество 1
  newlySelectedIds.forEach(id => {
    cameraCountMap.value[id] = 1
  })
  
  // Удаляем количество для отмеченных камер
  const unselectedIds = oldIds?.filter(id => !newIds.includes(id)) || []
  unselectedIds.forEach(id => {
    delete cameraCountMap.value[id]
  })
})

// Сбрасываем все фильтры при монтировании компонента
store.setCategory('')
store.setBrand('')
store.setSearchQuery('')

const resolutionTypes: ResolutionType[] = [
  { title: '2 Мп (1920×1080)', value: '2mp' },
  { title: '4 Мп (2560×1440)', value: '4mp' },
  { title: '6 Мп (3072×2048)', value: '6mp' },
  { title: '8 Мп (3840×2160)', value: '8mp' },
]

const filteredCameras = computed(() => {
  return store.products.value.filter(product => {
    if (product.category !== 'camera') return false
    if (!form.value.resolution) return true
    
    const resolution = product.specs.find((spec: string) => 
      spec.toLowerCase().includes('мп') || 
      spec.toLowerCase().includes('mp')
    )
    if (!resolution) return false
    
    const match = resolution.toLowerCase().match(/(\d+)\s*мп/i)
    if (!match) return false
    
    const resValue = match[1] + 'mp'
    return resValue === form.value.resolution
  })
})

const filteredCamerasByBrand = (brand: string) => {
  return filteredCameras.value.filter(camera => camera.brand === brand)
}

const totalCameraCount = computed(() => {
  return Object.values(cameraCountMap.value).reduce((sum, count) => sum + (count || 0), 0)
})

const filteredNvrs = computed(() => {
  const totalCameras = totalCameraCount.value
  
  // Получаем максимальное разрешение выбранных камер
  const maxCameraResolution = selectedCameraIds.value.reduce((maxRes, id) => {
    const camera = store.products.value.find(p => p.id === id)
    if (!camera) return maxRes
    
    // Ищем разрешение в спецификациях камеры
    const resSpec = camera.specs.find(spec => 
      spec.toLowerCase().includes('мп') || 
      spec.toLowerCase().includes('mp')
    )
    
    if (!resSpec) return maxRes
    
    const match = resSpec.match(/(\d+)\s*мп/i)
    if (!match) return maxRes
    
    const resolution = parseInt(match[1])
    return Math.max(maxRes, resolution)
  }, 0)

  console.log('Filtering NVRs:')
  console.log('Total cameras needed:', totalCameras)
  console.log('Max camera resolution:', maxCameraResolution, 'MP')
  
  return store.products.value.filter(product => {
    if (product.category !== 'recorder') {
      return false
    }
    
    console.log(`\nChecking ${product.title}:`)
    console.log('- Category:', product.category)
    console.log('- Channels:', product.channels)
    console.log('- Max Resolution:', product.maxResolution)
    
    // Проверяем наличие свойства channels
    if (typeof product.channels !== 'number') {
      console.warn(`- Warning: NVR ${product.title} has no channels property`)
      return false
    }
    
    // Проверяем достаточность каналов
    const hasEnoughChannels = product.channels >= totalCameras
    
    // Проверяем поддержку разрешения камер
    const supportsResolution = (product.maxResolution || 0) >= maxCameraResolution
    
    console.log('- Has enough channels:', hasEnoughChannels)
    console.log('- Supports resolution:', supportsResolution)
    
    return hasEnoughChannels && supportsResolution
  }).sort((a, b) => (a.channels || 0) - (b.channels || 0))
})

const isFormValid = computed(() => {
  // Проверяем, что выбрана хотя бы одна камера
  const hasCameras = selectedCameraIds.value.length > 0
  
  // Проверяем корректность количества камер
  const hasValidCameraCounts = selectedCameraIds.value.every(id => 
    cameraCountMap.value[id] && cameraCountMap.value[id] > 0
  )

  // Проверяем видеорегистратор, если он используется
  const hasValidNvr = !form.value.useNvr || (
    form.value.useNvr && form.value.selectedNvr !== null
  )

  // Проверяем HDD, если используется регистратор
  const hasValidHdd = !form.value.useNvr || (
    form.value.useNvr && form.value.selectedHdd !== null
  )

  console.log('Валидация формы:', {
    hasCameras,
    hasValidCameraCounts,
    hasValidNvr,
    hasValidHdd
  })

  return hasCameras && hasValidCameraCounts && hasValidNvr && hasValidHdd
})

const requiredChannels = computed(() => {
  const totalCameras = totalCameraCount.value
  if (totalCameras <= 4) return 4
  if (totalCameras <= 8) return 8
  if (totalCameras <= 16) return 16
  return 32
})

// Расчет сетевого оборудования
function calculateNetworkEquipment(cameraCount: number, cameras: Product[]) {
  const networkItems = [];
  let totalPrice = 0;
  
  // Проверяем, что константы сетевого оборудования определены
  if (!NETWORK_EQUIPMENT || !NETWORK_EQUIPMENT.poeSwitch4 || !NETWORK_EQUIPMENT.poeSwitch8) {
    console.error('Константы сетевого оборудования не определены');
    return {
      price: 0,
      items: []
    };
  }

  // Добавляем сетевое оборудование согласно требованиям
  if (cameraCount === 1) {
    // Для одной камеры - блок питания
    networkItems.push({
      name: "Блок питания для камеры",
      price: 1000,
      count: 1
    });
    totalPrice += 1000;
  } else if (cameraCount >= 2 && cameraCount <= 4) {
    // Для 2-4 камер - коммутатор DS-3E0106P-E/M
    // Ищем в каталоге или используем фиксированную цену
    const switch4Port = store.products.value.find(p => p.id === 'DS-3E0106P-E/M') || 
                        { title: 'Коммутатор DS-3E0106P-E/M (4 порта PoE)', price: 4000 };
    
    networkItems.push({
      name: switch4Port.title,
      price: switch4Port.price,
      count: 1
    });
    totalPrice += switch4Port.price;
  } else if (cameraCount >= 5 && cameraCount <= 8) {
    // Для 5-8 камер - коммутатор DS-3E0310P-E/M
    const switch8Port = store.products.value.find(p => p.id === 'DS-3E0310P-E/M') || 
                        { title: 'Коммутатор DS-3E0310P-E/M (8 портов PoE)', price: 6000 };
    
    networkItems.push({
      name: switch8Port.title,
      price: switch8Port.price,
      count: 1
    });
    totalPrice += switch8Port.price;
  } else if (cameraCount >= 9) {
    // Для 9+ камер - рассчитываем количество коммутаторов DS-3E0106P-E/M
    const switch4Port = store.products.value.find(p => p.id === 'DS-3E0106P-E/M') || 
                        { title: 'Коммутатор DS-3E0106P-E/M (4 порта PoE)', price: 4000 };
    
    // Рассчитываем количество коммутаторов (округляем вверх)
    const switchCount = Math.ceil(cameraCount / 4);
    
    networkItems.push({
      name: `${switchCount}x ${switch4Port.title}`,
      price: switch4Port.price * switchCount,
      count: switchCount
    });
    totalPrice += switch4Port.price * switchCount;
  }
  
  // Возвращаем результат
  return {
    price: totalPrice,
    items: networkItems
  };
}

const calculate = async () => {
  loading.value = true
  console.log('Начинаем расчет...')
  console.log('Выбранные камеры:', selectedCameraIds.value)
  console.log('Форма валидна:', isFormValid.value)

  try {
    // Проверяем, что выбрана хотя бы одна камера
    if (selectedCameraIds.value.length === 0) {
      throw new Error('Не выбрано ни одной камеры')
    }

    const selectedCameras = selectedCameraIds.value.map(id => ({
      camera: store.products.value.find(p => p.id === id) as Product,
      count: cameraCountMap.value[id]
    }))

    // Проверяем, что все камеры найдены
    if (selectedCameras.some(item => !item.camera)) {
      throw new Error('Не удалось найти одну из выбранных камер')
    }

    const totalCameras = selectedCameras.reduce((sum, item) => 
      sum + item.count, 0)

    // Монтажные работы 
    const mountingBox = totalCameras * 700      // 700₽ за монтажную коробку
    const cameraInstall = totalCameras * 1500   // 1500₽ за установку камеры
    const cameraSetup = totalCameras * 400      // 400₽ за настройку камеры
    const commissioning = totalCameras * 500    // 500₽ за пуско-наладку
    const nvrInstall = form.value.useNvr ? 1500 : 0  // 1500₽ за установку регистратора
    const nvrSetup = form.value.useNvr ? 1500 : 0    // 1500₽ за настройку регистратора

    const installationTotal = mountingBox + cameraInstall + cameraSetup + 
                             commissioning + nvrInstall + nvrSetup

    // Проверяем наличие констант сетевого оборудования
    if (!NETWORK_EQUIPMENT || !NETWORK_EQUIPMENT.poeSwitch4 || !NETWORK_EQUIPMENT.poeSwitch8) {
      throw new Error('Не найдены константы сетевого оборудования')
    }

    const networkEquipment = calculateNetworkEquipment(
      totalCameras,
      selectedCameras.map(item => item.camera)
    )

    const camerasTotal = selectedCameras.reduce((sum, item) => 
      sum + (item.camera.price * item.count), 0)
    const storageTotal = form.value.useNvr && form.value.selectedNvr 
      ? form.value.selectedNvr.price + (form.value.selectedHdd?.price || 0)
      : 0
    const cloudStorageTotal = form.value.useCloud ? totalCameras * 500 : 0

    result.value = {
      total: 0, // Будет пересчитано ниже
      breakdown: {
        cameras: camerasTotal,
        storage: storageTotal,
        cloudStorage: cloudStorageTotal,
        installation: {
          mountingBox,        // Монтажные коробки
          cameraInstall,      // Установка камер
          cameraSetup,        // Настройка камер
          commissioning,      // Пуско-наладка
          nvrInstall,        // Установка регистратора
          nvrSetup           // Настройка регистратора
        },
        network: networkEquipment.price
      },
      equipment: {
        cameras: selectedCameras.map(item => ({
          name: item.camera.title,
          price: item.camera.price,
          count: item.count
        })),
        storage: form.value.useNvr && form.value.selectedNvr ? {
          type: 'nvr',
          name: form.value.selectedNvr.title,
          price: form.value.selectedNvr.price,
          hdd: form.value.selectedHdd ? {
            name: form.value.selectedHdd.title,
            price: form.value.selectedHdd.price
          } : undefined
        } : undefined,
        network: {
          price: networkEquipment.price,
          items: networkEquipment.items
        }
      },
      installationDetails: {
        cameraInstallation: cameraInstall,
        cameraSetup: cameraSetup,
        nvrInstallation: nvrInstall,
        networkInstallation: networkEquipment.price
      },
      disclaimer: 'Стоимость указана без учета кабеля и его прокладки. Стоимость облачного хранения указана за месяц.'
    }

    // Правильный расчет общей стоимости
    const equipmentTotal = result.value.breakdown.cameras + 
      result.value.breakdown.storage + 
      result.value.breakdown.cloudStorage + 
      result.value.breakdown.network +
      result.value.breakdown.installation.mountingBox;
      
    const calculatedInstallationTotal = 
      result.value.breakdown.installation.cameraInstall + 
      result.value.breakdown.installation.cameraSetup + 
      result.value.breakdown.installation.commissioning + 
      (result.value.breakdown.installation.nvrInstall || 0) + 
      (result.value.breakdown.installation.nvrSetup || 0);
      
    result.value.total = equipmentTotal + calculatedInstallationTotal;

    console.log('Расчет успешно завершен')
  } catch (error) {
    console.error('Ошибка при расчете:', error)
    alert('Произошла ошибка при расчете. Пожалуйста, проверьте введенные данные.')
  } finally {
    loading.value = false
  }
}

const submitOrder = async () => {
  isSubmitting.value = true
  try {
    // Здесь должна быть логика отправки заказа
    showSuccess.value = true
    showOrderDialog.value = false
  } catch (error) {
    console.error('Error submitting order:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Вспомогательная функция для склонения существительных
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

// Добавим вычисляемые свойства для подсчета итогов
const getTotalEquipment = computed(() => {
  if (!result.value) return 0
  return result.value.breakdown.cameras + 
         result.value.breakdown.storage + 
         result.value.breakdown.cloudStorage + 
         result.value.breakdown.network +
         result.value.breakdown.installation.mountingBox
})

const getTotalWork = computed(() => {
  if (!result.value) return 0
  const installation = result.value.breakdown.installation
  return installation.cameraInstall + 
         installation.cameraSetup + 
         installation.commissioning + 
         (installation.nvrInstall || 0) + 
         (installation.nvrSetup || 0)
})

const getTotalCameras = computed(() => {
  if (!result.value) return 0
  return result.value.equipment.cameras.reduce((sum, camera) => sum + camera.count, 0)
})

// Обновим функцию расчета времени хранения
const calculateStorageDays = computed(() => {
  if (!form.value.selectedHdd || !form.value.resolution) return 0
  
  const totalCameras = selectedCameraIds.value.reduce((sum, id) => 
    sum + (cameraCountMap.value[id] || 0), 0)
  
  const resolution = form.value.resolution as keyof typeof STORAGE_BITRATE
  
  // Проверка на наличие объекта STORAGE_BITRATE и правильного ключа resolution
  if (!STORAGE_BITRATE || !STORAGE_BITRATE[resolution]) {
    console.error('Не найдены данные о битрейте для разрешения', resolution);
    return 0;
  }
  
  const bitrateInfo = STORAGE_BITRATE[resolution]
  
  if (!bitrateInfo) return 0

  // Расчет только для основного потока
  const totalBitrate = bitrateInfo.mainstream.bitrate * totalCameras
  const bytesPerDay = (totalBitrate * 3600 * 24) / (8 * 1024) // МБ в день
  const gbPerDay = bytesPerDay / 1024 // ГБ в день
  
  const hddCapacityGB = form.value.selectedHdd?.capacity ? form.value.selectedHdd.capacity * 1000 : 0 // переводим ТБ в ГБ
  const reserveSpace = 0.1 // 10% резерв для системы
  const usableSpace = hddCapacityGB * (1 - reserveSpace)
  
  return Math.floor(usableSpace / gbPerDay)
})

// Упростим функцию отображения информации
const getBitrateInfo = (resolution: string) => {
  const info = STORAGE_BITRATE[resolution as keyof typeof STORAGE_BITRATE]
  if (!info) return ''
  return info.resolution
}

// Добавим функцию форматирования дней
const formatDays = (days: number) => {
  if (days === 0) return 'менее 1 дня'
  if (days === 1) return '1 день'
  if (days > 1 && days < 5) return `${days} дня`
  return `${days} дней`
}

const getHddLabel = (hdd: HddOption) => {
  const baseLabel = `${hdd.title} (${formatPrice(hdd.price)} ₽)`
  
  if (form.value.selectedHdd?.id !== hdd.id) {
    return baseLabel
  }
  
  const totalCameras = selectedCameraIds.value.reduce((sum, id) => 
    sum + (cameraCountMap.value[id] || 0), 0)
  
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