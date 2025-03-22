<template>
  <v-card class="storage-estimate-block pa-3 my-4" v-if="isReady">
    <div class="d-flex align-center mb-2">
      <v-icon icon="mdi-harddisk" class="mr-2" color="primary" />
      <div class="text-h6">Срок хранения архива</div>
    </div>
    
    <div class="storage-details">
      <div v-if="storageDays > 0" class="storage-days" :class="storageClass">
        {{ storageDays }} {{ getPluralForm(storageDays, 'день', 'дня', 'дней') }}
      </div>
      <div v-else class="storage-days text-error">
        Необходимо выбрать жёсткий диск
      </div>
      
      <v-divider class="my-2"></v-divider>
      
      <div class="storage-info">
        <v-select 
          v-model="selectedHddValue"
          :items="hddList"
          item-title="title"
          item-value="value"
          label="Выберите жёсткий диск"
          variant="outlined"
          density="compact"
          class="mb-2"
          @update:model-value="emitSelectedHdd"
        ></v-select>
        
        <div class="camera-info mt-2">
          <div class="info-row">
            <span class="info-label">Количество камер:</span>
            <span class="info-value">{{ cameraCount }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Общий битрейт:</span>
            <span class="info-value">{{ totalBitrate.toFixed(2) }} Мбит/с</span>
          </div>
          <div class="info-row">
            <span class="info-label">Расчётный размер архива:</span>
            <span class="info-value">{{ (dailyStorage / 1024).toFixed(2) }} ГБ/день</span>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

// Список доступных жёстких дисков с ценами
const hddList = [
  { id: 'hdd1tb', title: '1 ТБ', value: 1024, price: 3500 },
  { id: 'hdd2tb', title: '2 ТБ', value: 2048, price: 5000 },
  { id: 'hdd4tb', title: '4 ТБ', value: 4096, price: 8500 },
  { id: 'hdd6tb', title: '6 ТБ', value: 6144, price: 12000 },
  { id: 'hdd8tb', title: '8 ТБ', value: 8192, price: 16000 }
];

// Определение эмиттеров
const emit = defineEmits(['update:selected-hdd']);

// Пропсы
const props = defineProps({
  cameraCount: {
    type: Number,
    required: true
  },
  totalBitrate: {
    type: Number,
    required: true,
    default: 0
  }
});

// Состояние компонента
const selectedHddValue = ref(null);
const isReady = ref(false);

// Получаем выбранный HDD
const selectedHdd = computed(() => {
  if (!selectedHddValue.value) return null;
  
  return hddList.find(hdd => hdd.value === selectedHddValue.value) || null;
});

// Эмиттер выбранного диска
function emitSelectedHdd() {
  emit('update:selected-hdd', selectedHdd.value);
}

// Расчёт ежедневного объёма хранения (в МБ)
const dailyStorage = computed(() => {
  if (props.totalBitrate <= 0) return 0;
  
  // Формула: битрейт (Мбит/с) * 3600 * 24 / 8 = МБ/день
  return (props.totalBitrate * 3600 * 24) / 8;
});

// Расчёт дней хранения
const storageDays = computed(() => {
  if (!selectedHdd.value || dailyStorage.value <= 0) return 0;
  
  // Формула: объём HDD (МБ) / ежедневный объём (МБ)
  const days = Math.floor(selectedHdd.value.value / (dailyStorage.value / 1024));
  return days;
});

// Определение класса для цветового индикатора срока хранения
const storageClass = computed(() => {
  if (storageDays.value <= 7) return 'text-error';
  if (storageDays.value <= 14) return 'text-warning';
  return 'text-success';
});

// Функция для склонения существительных
const getPluralForm = (count: number, form1: string, form2: string, form5: string): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return form1;
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return form2;
  } else {
    return form5;
  }
};

// Следим за изменениями выбранного диска
watch(selectedHdd, (newValue) => {
  emitSelectedHdd();
});

onMounted(() => {
  // Установка значения по умолчанию
  selectedHddValue.value = 4096; // 4 ТБ по умолчанию
  isReady.value = true;
  // Вызываем при инициализации
  emitSelectedHdd();
});
</script>

<style scoped>
.storage-estimate-block {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

.storage-days {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 8px 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.info-label {
  color: #666;
  font-size: 14px;
}

.info-value {
  font-weight: 500;
  font-size: 14px;
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