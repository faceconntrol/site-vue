<template>
  <div class="calculator content-wrapper">
    <h1 class="text-h3 mb-6">Калькулятор стоимости</h1>
    
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="text-h5 mb-4">Конфигурация системы</h2>
            
            <v-text-field
              v-model="config.cameraCount"
              label="Количество камер"
              type="number"
              min="1"
            />
            
            <v-select
              v-model="config.cameraModel"
              :items="cameraModels"
              label="Модель камеры"
            />
            
            <v-select
              v-model="config.nvrModel"
              :items="nvrModels"
              label="Модель видеорегистратора"
            />
            
            <v-switch
              v-model="config.useCloud"
              label="Облачное хранение"
            />
          </v-col>
          
          <v-col cols="12" md="6">
            <h2 class="text-h5 mb-4">Расчет стоимости</h2>
            
            <v-list>
              <v-list-item>
                <v-list-item-title>Камеры</v-list-item-title>
                <v-list-item-subtitle>{{ calculation.breakdown.cameras }} ₽</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-title>Хранение данных</v-list-item-title>
                <v-list-item-subtitle>{{ calculation.breakdown.storage }} ₽</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-title>Монтаж</v-list-item-title>
                <v-list-item-subtitle>{{ calculation.breakdown.installation }} ₽</v-list-item-subtitle>
              </v-list-item>
              
              <v-divider class="my-2"></v-divider>
              
              <v-list-item>
                <v-list-item-title class="text-h6">Итого</v-list-item-title>
                <v-list-item-subtitle class="text-h6">{{ calculation.total }} ₽</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            
            <v-btn
              color="primary"
              block
              class="mt-4"
              @click="submitOrder"
            >
              Оформить заказ
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const config = ref({
  cameraCount: 1,
  cameraModel: '',
  nvrModel: '',
  useCloud: false
})

const cameraModels = [
  'IP-камера ColorVu 4MP',
  'IP-камера AcuSense 2MP',
  'IP-камера DarkFighter 8MP'
]

const nvrModels = [
  'NVR на 4 канала',
  'NVR на 8 каналов',
  'NVR на 16 каналов'
]

const calculation = computed(() => {
  const breakdown = {
    cameras: config.value.cameraCount * 12500,
    storage: config.value.useCloud ? 1200 : 0,
    installation: config.value.cameraCount * 3000
  }
  
  return {
    breakdown,
    total: breakdown.cameras + breakdown.storage + breakdown.installation
  }
})

const submitOrder = () => {
  // Здесь будет логика оформления заказа
  console.log('Order submitted:', {
    config: config.value,
    calculation: calculation.value
  })
}
</script> 