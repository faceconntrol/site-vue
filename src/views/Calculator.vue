<template>
  <v-container fluid>
    <PageTitle title="Калькулятор стоимости" />

    <v-row>
      <!-- Левая половина - форма выбора -->
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-form @submit.prevent="calculate">
            <!-- Разрешение камер и фильтр производителя -->
            <div class="mb-4">
              <div class="d-flex align-center mb-2">
                <div class="text-subtitle-1">Разрешение камер</div>
                <v-spacer></v-spacer>
                <v-btn-toggle v-model="form.manufacturer" mandatory density="compact">
                  <v-btn value="all">Все</v-btn>
                  <v-btn value="hikvision">Hikvision</v-btn>
                  <v-btn value="hiwatch">HiWatch</v-btn>
                </v-btn-toggle>
              </div>
            <v-select
              v-model="form.resolution"
                :items="resolutionOptions"
                label="Выберите разрешение"
                variant="outlined"
              density="compact"
              ></v-select>
                </div>

            <!-- Список камер -->
            <div class="camera-selection mb-4">
              <div class="text-subtitle-1 mb-2">
                <v-icon icon="mdi-cctv" class="mr-2" />
                Выберите камеры:
                    </div>

              <div v-for="camera in filteredCamerasByResolution" :key="camera.id" class="camera-item mb-2">
                <div class="d-flex">
                    <v-checkbox
                      v-model="selectedCameraIds"
                      :value="camera.id"
                      hide-details
                    class="mr-2"
                      density="compact"
                  ></v-checkbox>
                  
                  <div class="camera-thumbnail mr-2">
                    <v-img
                      :src="camera.image || '/images/placeholder.jpg'"
                      width="50"
                      height="50"
                      cover
                      class="rounded"
                    ></v-img>
                  </div>
                  
                  <div class="camera-details flex-grow-1">
                    <div class="text-body-2 font-weight-medium">{{ camera.title }}</div>
                    <div class="text-subtitle-2 font-weight-bold">{{ formatPrice(camera.price) }} ₽</div>
                  </div>
                  
                  <div v-if="selectedCameraIds.includes(camera.id)" class="camera-quantity">
                    <v-btn size="x-small" icon variant="text" @click.stop="decrementCamera(camera.id)">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span class="mx-1">{{ cameraCountMap[camera.id] || 1 }}</span>
                    <v-btn size="x-small" icon variant="text" @click.stop="incrementCamera(camera.id)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>

            <!-- Хранение данных -->
            <div class="storage-section mb-4">
              <div class="text-subtitle-1 mb-2">
                <v-icon icon="mdi-database" class="mr-2" />
                Хранение данных
              </div>
              
              <!-- Видеорегистратор -->
                <v-checkbox
                  v-model="form.useNvr"
                  label="Видеорегистратор"
                  hide-details
                  density="compact"
                class="mb-2"
              ></v-checkbox>

            <v-select
              v-if="form.useNvr"
              v-model="form.selectedNvr"
                :items="filteredNvrOptions"
                item-title="title"
                item-value="id"
                return-object
                label="Выберите видеорегистратор"
                variant="outlined"
                density="compact"
                class="mb-3 ml-8"
              ></v-select>
              
              <!-- Жесткий диск -->
              <v-select
                v-if="form.useNvr && form.selectedNvr"
                v-model="form.selectedHdd"
                :items="hddOptions"
              item-title="title"
                item-value="id"
              return-object
                label="Выберите жесткий диск"
                variant="outlined"
                density="compact"
                class="mb-3 ml-8"
                @update:model-value="updateStorageDays"
              ></v-select>
              
              <!-- Компактная информация о хранении архива -->
              <v-alert
                v-if="storageDays > 0"
                :color="storageDaysColor"
              density="compact"
                variant="tonal"
                class="ml-8"
              >
                <div class="d-flex align-center">
                  <v-icon :icon="storageDaysIcon" class="mr-2"></v-icon>
                  <span>Примерный срок хранения: <strong>{{ storageDays }} {{ getDaysForm(storageDays) }}</strong></span>
                </div>
              </v-alert>
              
              <!-- Облачное хранилище -->
              <v-checkbox
                v-model="form.useCloud"
                label="Облачное хранилище"
                hide-details
                  density="compact"
                class="mt-2"
              ></v-checkbox>
              </div>

            <!-- Кнопка расчета -->
            <v-btn
              color="primary"
              block
              type="submit"
              :loading="isLoading"
              variant="elevated"
            >
              Рассчитать стоимость
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <!-- Правая половина - результаты -->
      <v-col cols="12" md="6">
        <v-card v-if="calculationResults" class="pa-4">
          <div class="text-h6 mb-4">Результаты расчета</div>
          
          <!-- Оборудование -->
          <v-expansion-panels class="mb-4">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <div class="d-flex align-center">
                  <v-icon icon="mdi-cctv-off" class="mr-2"></v-icon>
                  <span>Оборудование</span>
                  <v-spacer></v-spacer>
                  <span class="text-subtitle-1 font-weight-bold">
                    {{ formatPrice(calculationResults.breakdown.equipment) }} ₽
                  </span>
              </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list>
                  <v-list-item v-for="item in getEquipmentItems()" :key="item.name">
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon"></v-icon>
            </template>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ formatPrice(item.price) }} ₽ × {{ item.count }} = {{ formatPrice(item.total) }} ₽
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
            
            <!-- Услуги -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <div class="d-flex align-center">
                  <v-icon icon="mdi-tools" class="mr-2"></v-icon>
                  <span>Монтажные работы</span>
                  <v-spacer></v-spacer>
                  <span class="text-subtitle-1 font-weight-bold">
                    {{ formatPrice(calculationResults.breakdown.services) }} ₽
                  </span>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list>
                  <v-list-item v-for="item in getServiceItems()" :key="item.name">
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon"></v-icon>
            </template>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ formatPrice(item.price) }} ₽ × {{ item.count }} = {{ formatPrice(item.total) }} ₽
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
            
            <!-- Облачное хранилище -->
            <v-expansion-panel v-if="calculationResults.cloudStorage">
              <v-expansion-panel-title>
                <div class="d-flex align-center">
                  <v-icon icon="mdi-cloud" class="mr-2"></v-icon>
                  <span>Облачное хранилище</span>
                  <v-spacer></v-spacer>
                  <span class="text-subtitle-1 font-weight-bold text-info">
                    {{ formatPrice(calculationResults.cloudStorage.monthlyPrice) }} ₽/мес
                  </span>
            </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list>
                  <v-list-item v-for="item in calculationResults.cloudStorage.cameras" :key="item.id">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-cloud-upload"></v-icon>
            </template>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ formatPrice(item.price) }} ₽/мес × {{ item.count }} = {{ formatPrice(item.price * item.count) }} ₽/мес
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          
          <!-- Итоговая стоимость -->
          <v-card class="mt-6 bg-primary" variant="elevated">
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <span class="text-h5 text-white">Общая стоимость:</span>
                <span class="text-h4 text-white font-weight-bold">
                  {{ formatPrice(calculationResults.total) }} ₽
                </span>
              </div>
            </v-card-text>
          </v-card>
          
          <!-- Примечание о кабеле -->
          <v-alert
            type="info"
            variant="tonal"
            class="mt-4"
            density="compact"
          >
            <p class="mb-0">Все расчеты указаны без учета стоимости и прокладки кабеля.</p>
            <p class="mb-0">Примерный срок хранения архива: {{ storageDays }} {{ getDaysForm(storageDays) }}.</p>
          </v-alert>

          <v-btn
            color="success"
            block
            variant="elevated"
            class="mt-4"
            @click="orderSystem"
          >
            Оформить заказ
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import PageTitle from '../components/PageTitle.vue';
import { SecurityCalculator } from '../services/calculator';
import { productsDB } from '../data/catalog';
import type { Product } from '../types';

// Состояние формы
const form = ref({
  resolution: '2mp',
  manufacturer: 'all',
  useNvr: true,
  selectedNvr: null,
  selectedHdd: null,
  useCloud: false
});

// Опции разрешения камер
const resolutionOptions = [
  { title: '2 МП (1080p)', value: '2mp' },
  { title: '4 МП (1440p)', value: '4mp' },
  { title: '5 МП (2560×1920)', value: '5mp' },
  { title: '6 МП (3072×2048)', value: '6mp' },
  { title: '8 МП (4K)', value: '8mp' }
];

// Мапа преобразования строкового обозначения разрешения в числовое
const resolutionMap: Record<string, number> = {
  '2mp': 2,
  '4mp': 4,
  '5mp': 5,
  '6mp': 6,
  '8mp': 8
};

// Выбранные камеры
const selectedCameraIds = ref<string[]>([]);

// Количество выбранных камер
const cameraCountMap = ref<Record<string, number>>({});

// Состояние загрузки
const isLoading = ref(false);

// Расчетные значения хранения
const storageDays = ref(0);
const dailyStorage = ref(0);

// Данные для расчета архива по стандартам Hikvision (H.265+, 20 к/с)
const storageBitrates: Record<string, number> = {
  '2mp': 1024, // ~1 Мбит/с для 2MP
  '4mp': 2048, // ~2 Мбит/с для 4MP
  '5mp': 2560, // ~2.5 Мбит/с для 5MP
  '6mp': 3072, // ~3 Мбит/с для 6MP
  '8mp': 4096  // ~4 Мбит/с для 8MP
};

// Получение выбранного разрешения в числовом формате
const selectedResolutionMP = computed(() => {
  return resolutionMap[form.value.resolution] || 2;
});

// Список камер, отфильтрованный по разрешению и производителю
const filteredCamerasByResolution = computed(() => {
  const exactResolution = selectedResolutionMP.value;
  const manufacturer = form.value.manufacturer;
  
  console.log(`Фильтрация камер по точному разрешению: ${exactResolution}MP, производитель: ${manufacturer}`);
  
  // Получаем все камеры из каталога
  let filteredCameras = Object.values(productsDB).filter(product => {
    // Проверяем, что это камера
    if (product.category !== 'camera') return false;
    
    // Получаем разрешение камеры как число
    const cameraResolution = Number(product.resolution) || 2;
    
    // Отладочная информация
    console.log(`Проверка камеры ${product.id}: разрешение = ${cameraResolution}, требуется = ${exactResolution}`);
    
    // Камера подходит, если её разрешение совпадает с выбранным
    // или если это особый случай для 2MP (разрешение может быть указано как 1.3, 1.8, 2)
    if (exactResolution === 2) {
      return cameraResolution <= 2;
    }
    
    // Для других разрешений сравниваем точно
    return cameraResolution === exactResolution;
  });
  
  console.log(`Отфильтровано ${filteredCameras.length} камер по разрешению`);
  
  // Фильтрация по производителю, если выбран не "all"
  if (manufacturer !== 'all') {
    filteredCameras = filteredCameras.filter(camera => {
      if (manufacturer === 'hikvision') {
        // Проверяем, является ли камера Hikvision
        if (camera.brand && camera.brand.toLowerCase() === 'hikvision') return true;
        
        const id = (camera.id || '').toLowerCase();
        const title = (camera.title || '').toLowerCase();
        
        return (id.includes('hikvision') || title.includes('hikvision') || 
                (id.startsWith('ds-') && !id.includes('hiwatch') && !title.includes('hiwatch')));
      }
      
      if (manufacturer === 'hiwatch') {
        // Проверяем, является ли камера HiWatch
        if (camera.brand && camera.brand.toLowerCase() === 'hiwatch') return true;
        
        const id = (camera.id || '').toLowerCase();
        const title = (camera.title || '').toLowerCase();
        
        return (id.includes('hiwatch') || title.includes('hiwatch') || id.includes('hw-'));
      }
      
      return false;
    });
    
    console.log(`Отфильтровано ${filteredCameras.length} камер по производителю ${manufacturer}`);
  }
  
  // Сортировка: сначала по разрешению, затем по цене
  return filteredCameras.sort((a, b) => {
    return (a.price || 0) - (b.price || 0);
  });
});

// Список NVR, отфильтрованный по разрешению и каналам
const filteredNvrOptions = computed(() => {
  const maxResolution = selectedResolutionMP.value;
  const requiredChannels = getRequiredChannels();
  
  console.log(`Поиск регистраторов: требуется разрешение ${maxResolution}MP и ${requiredChannels} каналов`);
  
  // Фильтруем регистраторы по разрешению и количеству каналов
  const filteredRecorders = Object.values(productsDB).filter(product => {
    if (product.category !== 'recorder') return false;
    
    // Получаем максимальное поддерживаемое разрешение
    const nvrMaxResolution = Number(product.maxResolution) || 2;
    
    // Получаем количество каналов
    const nvrChannels = Number(product.channels) || 4;
    
    // Регистратор подходит, если его максимальное разрешение >= требуемого
    // и количество каналов >= требуемого
    return (nvrMaxResolution >= maxResolution && nvrChannels >= requiredChannels);
  });
  
  console.log(`Найдено ${filteredRecorders.length} подходящих регистраторов`);
  
  // Сортировка регистраторов по цене и количеству каналов
  return filteredRecorders.sort((a, b) => {
    const channelsA = Number(a.channels) || 4;
    const channelsB = Number(b.channels) || 4;
    
    // Если разница в каналах небольшая, сортируем по цене
    if (Math.abs(channelsA - channelsB) <= 4) {
      return (a.price || 0) - (b.price || 0);
    }
    
    // Иначе предпочитаем регистратор с меньшим (но достаточным) числом каналов
    return channelsA - channelsB;
  });
});

// Опции для жестких дисков (WD Purple Surveillance)
const hddOptions = [
  { title: 'HDD WD Purple 1TB', id: 'hdd1tb', value: 1000 * 1024, price: 6500 },
  { title: 'HDD WD Purple 2TB', id: 'hdd2tb', value: 2000 * 1024, price: 10000 },
  { title: 'HDD WD Purple 4TB', id: 'hdd4tb', value: 4000 * 1024, price: 13400 },
  { title: 'HDD WD Purple 6TB', id: 'hdd6tb', value: 6000 * 1024, price: 18500 },
  { title: 'HDD WD Purple 8TB', id: 'hdd8tb', value: 8000 * 1024, price: 24000 }
];

// Расчет времени хранения архива
function updateStorageDays() {
  // Если нет выбранного HDD или не используется NVR, то храним 0 дней
  if (!form.value.useNvr || !form.value.selectedHdd) {
    storageDays.value = 0;
    dailyStorage.value = 0;
    return;
  }
  
  // Получаем размер выбранного диска в МБ
  const diskSizeInMB = form.value.selectedHdd.value;
  
  // Рассчитываем суммарный битрейт всех камер (по данным от Hikvision)
  let totalBitrateKbps = 0;
  
  for (const id of selectedCameraIds.value) {
    const camera = productsDB[id];
    if (!camera) continue;
    
    // Определяем битрейт камеры в зависимости от разрешения
    const resolutionMp = Number(camera.resolution) || 2;
    let bitrateKey = '2mp';
    
    if (resolutionMp >= 8) bitrateKey = '8mp';
    else if (resolutionMp >= 6) bitrateKey = '6mp';
    else if (resolutionMp >= 5) bitrateKey = '5mp';
    else if (resolutionMp >= 4) bitrateKey = '4mp';
    
    const bitrate = storageBitrates[bitrateKey];
    
    // Умножаем на количество камер данного типа
    const count = cameraCountMap.value[id] || 1;
    totalBitrateKbps += bitrate * count;
    
    console.log(`Камера ${camera.title}: разрешение ${resolutionMp}MP, битрейт ${bitrate} кбит/с, кол-во: ${count}`);
  }
  
  // Рассчитываем ежедневный объем данных в МБ
  // totalBitrateKbps * 3600 секунд * 24 часа / 8 (биты в байты) / 1024 (в МБ)
  const dailyStorageMB = (totalBitrateKbps * 3600 * 24) / 8 / 1024;
  dailyStorage.value = Math.round(dailyStorageMB);
  
  // Рассчитываем количество дней хранения
  // Учитываем, что реально доступно около 90% объема диска
  const availableDiskSpace = diskSizeInMB * 0.9;
  storageDays.value = Math.floor(availableDiskSpace / dailyStorageMB);
  
  console.log(`Расчет хранения: ${dailyStorageMB.toFixed(2)} МБ в день, ${storageDays.value} дней на диске ${diskSizeInMB/1024} ТБ`);
}

// Инкремент и декремент количества камер
function incrementCamera(id: string) {
  const currentCount = cameraCountMap.value[id] || 1;
  cameraCountMap.value[id] = currentCount + 1;
  updateStorageDays();
}

function decrementCamera(id: string) {
  const currentCount = cameraCountMap.value[id] || 1;
  if (currentCount > 1) {
    cameraCountMap.value[id] = currentCount - 1;
  }
  updateStorageDays();
}

// Цвет индикатора хранения
const storageDaysColor = computed(() => {
  if (storageDays.value <= 7) return 'error';
  if (storageDays.value <= 14) return 'warning';
  return 'success';
});

// Иконка для индикатора хранения
const storageDaysIcon = computed(() => {
  if (storageDays.value <= 7) return 'mdi-alert-circle';
  if (storageDays.value <= 14) return 'mdi-alert';
  return 'mdi-check-circle';
});

// Форматирование цены
function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price);
}

// Получение формы слова "день" в зависимости от числа
function getDaysForm(days: number): string {
  return getPluralForm(days, 'день', 'дня', 'дней');
}

// Вспомогательная функция для склонения слов
function getPluralForm(count: number, form1: string, form2: string, form5: string): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return form1;
  } else if (
    [2, 3, 4].includes(lastDigit) && 
    ![12, 13, 14].includes(lastTwoDigits)
  ) {
    return form2;
  } else {
    return form5;
  }
}

// Получение списка элементов оборудования для результатов
function getEquipmentItems() {
  if (!calculationResults.value || !calculationResults.value.equipment) {
    return [];
  }
  
  const equipment = [];
  
  for (const [key, item] of Object.entries(calculationResults.value.equipment)) {
    let icon = 'mdi-cctv';
    
    if (key.includes('nvr')) icon = 'mdi-video';
    if (key.includes('hdd')) icon = 'mdi-harddisk';
    if (key.includes('switch')) icon = 'mdi-switch';
    if (key.includes('power')) icon = 'mdi-power-plug';
    if (key.includes('mounting')) icon = 'mdi-toolbox';
    
    equipment.push({
      ...item,
      icon
    });
  }
  
  return equipment;
}

// Получение списка услуг для результатов
function getServiceItems() {
  if (!calculationResults.value || !calculationResults.value.services) {
    return [];
  }
  
  const services = [];
  
  for (const [key, service] of Object.entries(calculationResults.value.services)) {
    let icon = 'mdi-tools';
    
    if (key.includes('installation')) icon = 'mdi-hammer-wrench';
    if (key.includes('setup')) icon = 'mdi-cog';
    if (key.includes('commission')) icon = 'mdi-check-circle';
    
    services.push({
      ...service,
      icon
    });
  }
  
  return services;
}

// Результаты расчета
const calculationResults = ref(null);

// Расчет стоимости системы
async function calculate() {
  isLoading.value = true;
  
  try {
    // Создаем калькулятор
    const calculator = new SecurityCalculator(productsDB);
    
    // Создаем массив камер с их количеством
    const cameras = selectedCameraIds.value.map(id => ({
      id,
      count: cameraCountMap.value[id] || 1
    }));
    
    // Создаем конфигурацию для расчета
    const config = {
      cameras,
      useNvr: form.value.useNvr,
      useCloud: form.value.useCloud
    };
    
    // Добавляем идентификаторы NVR и HDD, если они выбраны
    if (form.value.useNvr && form.value.selectedNvr) {
      config.nvrId = form.value.selectedNvr.id;
    }
    
    if (form.value.selectedHdd) {
      config.hddId = form.value.selectedHdd.id;
    }
    
    // Вызываем расчет
    calculationResults.value = calculator.calculateTotal(config);
    
    // Добавляем информацию о хранении архива
    calculationResults.value.storage = {
      days: storageDays.value,
      dailySize: dailyStorage.value
    };
    
    console.log('Результаты расчета:', calculationResults.value);
  } catch (error) {
    console.error('Ошибка при расчете:', error);
  } finally {
    isLoading.value = false;
  }
}

// Оформление заказа
function orderSystem() {
  // Здесь будет логика оформления заказа
  console.log('Заказ оформлен:', {
    cameras: selectedCameraIds.value.map(id => ({
      id,
      title: productsDB[id].title,
      count: cameraCountMap.value[id] || 1
    })),
    nvr: form.value.selectedNvr,
    hdd: form.value.selectedHdd,
    useCloud: form.value.useCloud,
    total: calculationResults.value?.total
  });
}

// Инициализация
onMounted(() => {
  console.log('Калькулятор инициализирован');
  
  // Отладочная информация о камерах в каталоге
  const camerasMap = {};
  Object.values(productsDB)
    .filter(p => p.category === 'camera')
    .forEach(camera => {
      const res = Number(camera.resolution) || 2;
      camerasMap[res] = (camerasMap[res] || 0) + 1;
    });
  
  console.log('Распределение камер по разрешению:', camerasMap);
});

// Получение требуемого количества каналов
function getRequiredChannels(): number {
  return selectedCameraIds.value.reduce((sum, id) => {
    return sum + (cameraCountMap.value[id] || 1);
  }, 0);
}
</script>

<style scoped>
.camera-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  transition: all 0.2s ease;
}

.camera-item:hover {
  background-color: #f5f5f5;
}

.camera-thumbnail {
  min-width: 50px;
  width: 50px;
  height: 50px;
  overflow: hidden;
}

.camera-quantity {
  display: flex;
  align-items: center;
  min-width: 80px;
  justify-content: flex-end;
}

.storage-info {
  border: 1px solid #e0e0e0;
}

.storage-days {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 8px 0;
}

.text-error {
  color: #ef4444;
}

.text-warning {
  color: #f59e0b;
}

.text-success {
  color: #10b981;
}
</style> 