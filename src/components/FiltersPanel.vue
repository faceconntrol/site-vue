<script setup lang="ts">
import { ref, watch } from 'vue'

// Типизация фильтров (по образцу мобильной версии)
interface Filters {
  category: string;
  colorvu: boolean;
  acusense: boolean;
  panoramic: boolean;
  ptz: boolean;
  search: string;
  price?: {min: number, max: number};
  sortBy?: string;
}

const props = defineProps<{
  filters: Filters;
}>()

const emit = defineEmits<{
  'update:filters': [filters: Filters]
}>()

// Локальная копия фильтров для двусторонней привязки
const localFilters = ref<Filters>({ ...props.filters })

// Отслеживаем изменения локальных фильтров
watch(localFilters, (newFilters: any) => {
  console.log('Фильтры изменены:', newFilters)
  emit('update:filters', newFilters)
}, { deep: true })

// Отслеживаем изменения пропсов для обновления локальных фильтров
watch(() => props.filters, (newFilters: any) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

// Сброс фильтров
const resetFilters = () => {
  localFilters.value = {
    category: 'all',
    colorvu: false,
    acusense: false,
    panoramic: false,
    ptz: false,
    search: '',
    price: {min: 0, max: 100000},
    sortBy: 'default'
  }
  emit('update:filters', localFilters.value)
}

// Диапазон цен
const priceRange = ref([0, 100000])

// Следим за изменением диапазона цен
watch(priceRange, (newRange: number[]) => {
  localFilters.value.price = {
    min: newRange[0],
    max: newRange[1]
  }
}, { deep: true })

// Опции сортировки
const sortOptions = [
  { text: 'По умолчанию', value: 'default' },
  { text: 'Цена (низкая > высокая)', value: 'price_asc' },
  { text: 'Цена (высокая > низкая)', value: 'price_desc' },
  { text: 'По названию', value: 'name' }
]
</script>

<template>
  <div class="filters-panel">
    <v-card class="pa-4">
      <!-- Поиск -->
      <v-text-field
        v-model="localFilters.search"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        class="mb-4"
      ></v-text-field>
      
      <!-- Сортировка -->
      <div class="text-subtitle-1 mb-2">Сортировка</div>
      <v-select
        v-model="localFilters.sortBy"
        :items="sortOptions"
        item-title="text"
        item-value="value"
        label="Сортировать по"
        density="compact"
        class="mb-4"
      ></v-select>
      
      <!-- Категории -->
      <div class="text-subtitle-1 mb-2">Категории</div>
      <v-select
        v-model="localFilters.category"
        :items="[
          { text: 'Все товары', value: 'all' },
          { text: 'Камеры', value: 'camera' },
          { text: 'Регистраторы', value: 'nvr' },
          { text: 'Датчики', value: 'sensor' },
          { text: 'Охранные системы', value: 'security' }
        ]"
        item-title="text"
        item-value="value"
        label="Категория"
        density="compact"
        class="mb-4"
      ></v-select>
      
      <!-- Диапазон цен -->
      <div class="text-subtitle-1 mb-2">Цена</div>
      <v-range-slider
        v-model="priceRange"
        :min="0"
        :max="100000"
        :step="1000"
        thumb-label
        class="mb-4"
      >
        <template v-slot:thumb-label="{ modelValue }">
          {{ modelValue.toLocaleString() }}
        </template>
      </v-range-slider>
      
      <!-- Технологии -->
      <div class="text-subtitle-1 mb-2">Технологии</div>
      <div class="d-flex flex-wrap">
        <v-checkbox
          v-model="localFilters.colorvu"
          label="ColorVu"
          density="compact"
          class="mr-4"
        ></v-checkbox>
        
        <v-checkbox
          v-model="localFilters.acusense"
          label="AcuSense"
          density="compact"
          class="mr-4"
        ></v-checkbox>
        
        <v-checkbox
          v-model="localFilters.panoramic"
          label="Панорамные"
          density="compact"
          class="mr-4"
        ></v-checkbox>
        
        <v-checkbox
          v-model="localFilters.ptz"
          label="PTZ (поворотные)"
          density="compact"
        ></v-checkbox>
      </div>
      
      <!-- Кнопка сброса -->
      <v-btn 
        color="primary" 
        variant="outlined" 
        class="mt-4"
        @click="resetFilters"
      >
        Сбросить фильтры
      </v-btn>
    </v-card>
  </div>
</template> 