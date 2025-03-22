<template>
  <div class="calculator-results">
    <v-card-title class="text-center">
      <span class="text-h5">Результат расчета</span>
    </v-card-title>
    
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <h3 class="text-h6 mb-2">Итоговая стоимость</h3>
          <div class="text-h5 mb-4">{{ formatPrice(results.total) }} ₽</div>
          
          <v-divider class="mb-4"></v-divider>
          
          <!-- Раздел оборудования -->
          <h3 class="text-subtitle-1 mb-2">Оборудование</h3>
          
          <!-- Камеры -->
          <div v-if="results.equipment?.cameras && results.equipment.cameras.length > 0" class="mb-3">
            <div class="mb-1"><strong>Камеры:</strong> {{ formatPrice(results.breakdown.cameras) }} ₽</div>
            <v-list density="compact" class="bg-grey-lighten-4 rounded">
              <v-list-item v-for="(camera, index) in results.equipment.cameras" :key="index" class="px-2">
                <template v-slot:prepend>
                  <v-icon icon="mdi-cctv" size="small" class="mr-1"></v-icon>
                </template>
                <v-list-item-title class="text-body-2">
                  {{ camera.name }} x {{ camera.count }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ formatPrice(camera.price) }} ₽ × {{ camera.count }} = {{ formatPrice(camera.price * camera.count) }} ₽
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
          
          <!-- Монтажные коробки -->
          <div v-if="results.equipment?.mountingBoxes" class="mb-3">
            <div class="mb-1"><strong>Монтажные коробки:</strong> {{ formatPrice(results.breakdown.mountingBoxes) }} ₽</div>
            <v-list density="compact" class="bg-grey-lighten-4 rounded">
              <v-list-item class="px-2">
                <template v-slot:prepend>
                  <v-icon icon="mdi-package-variant-closed" size="small" class="mr-1"></v-icon>
                </template>
                <v-list-item-title class="text-body-2">
                  {{ results.equipment.mountingBoxes.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ formatPrice(results.equipment.mountingBoxes.price) }} ₽ × {{ results.equipment.mountingBoxes.count }} = {{ formatPrice(results.equipment.mountingBoxes.total) }} ₽
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
          
          <!-- Система хранения -->
          <div v-if="results.equipment?.storage" class="mb-3">
            <div class="mb-1"><strong>Система хранения:</strong> {{ formatPrice(results.breakdown.storage) }} ₽</div>
            <v-list density="compact" class="bg-grey-lighten-4 rounded">
              <!-- Видеорегистратор -->
              <v-list-item class="px-2">
                <template v-slot:prepend>
                  <v-icon icon="mdi-video-box" size="small" class="mr-1"></v-icon>
                </template>
                <v-list-item-title class="text-body-2">
                  {{ results.equipment.storage.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ formatPrice(results.equipment.storage.price) }} ₽
                </v-list-item-subtitle>
              </v-list-item>
              
              <!-- Жесткий диск -->
              <v-list-item v-if="results.equipment.storage.hdd" class="px-2">
                <template v-slot:prepend>
                  <v-icon icon="mdi-harddisk" size="small" class="mr-1"></v-icon>
                </template>
                <v-list-item-title class="text-body-2">
                  {{ results.equipment.storage.hdd.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ formatPrice(results.equipment.storage.hdd.price) }} ₽
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
          
          <!-- Сетевое оборудование -->
          <div v-if="results.equipment?.network && results.equipment.network.items && results.equipment.network.items.length > 0" class="mb-3">
            <div class="mb-1"><strong>Сетевое оборудование:</strong> {{ formatPrice(results.breakdown.network) }} ₽</div>
            <v-list density="compact" class="bg-grey-lighten-4 rounded">
              <v-list-item v-for="(item, index) in results.equipment.network.items" :key="index" class="px-2">
                <template v-slot:prepend>
                  <v-icon :icon="item.name.includes('блок') ? 'mdi-power-plug' : 'mdi-switch'" size="small" class="mr-1"></v-icon>
                </template>
                <v-list-item-title class="text-body-2">
                  {{ item.name }} {{ item.count > 1 ? `x ${item.count}` : '' }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ formatPrice(item.price) }} ₽ {{ item.count > 1 ? `× ${item.count} = ${formatPrice(item.price * item.count)} ₽` : '' }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
          
          <!-- Итого оборудование -->
          <div class="text-subtitle-2 mt-2 mb-3 pa-2 bg-grey-lighten-5 rounded">
            <strong>Итого оборудование:</strong> {{ formatPrice(results.breakdown.equipmentTotal) }} ₽
          </div>
          
          <!-- Облачное хранилище - выделенный блок -->
          <div v-if="results.equipment?.cloudStorage" class="cloud-storage-block mb-4">
            <div class="d-flex align-center justify-space-between">
              <div>
                <v-icon icon="mdi-cloud" class="mr-2" color="blue" />
                <strong>Облачное хранилище ({{ results.equipment.cloudStorage.storagePeriod }} архива)</strong>
              </div>
              <span class="cloud-price">{{ formatPrice(results.equipment.cloudStorage.monthlyPrice) }} ₽/мес</span>
            </div>
            <div class="text-caption mt-1">
              Стоимость указана за месяц использования облачного хранилища
            </div>
          </div>
          
          <v-divider class="my-4"></v-divider>
          
          <!-- Раздел монтажных работ -->
          <h3 class="text-subtitle-1 mb-2">Монтажные работы</h3>
          
          <div class="mb-3">
            <v-list density="compact" class="bg-grey-lighten-4 rounded">
              <!-- Установка камер -->
              <v-list-item v-if="results.services?.cameraInstallation" class="px-2">
                <v-list-item-title class="text-body-2">
                  Установка камер ({{ formatPrice(results.services.cameraInstallation.perItem) }} ₽ × {{ results.services.cameraInstallation.count }})
                </v-list-item-title>
                <template v-slot:append>
                  <span class="text-body-2">{{ formatPrice(results.services.cameraInstallation.price) }} ₽</span>
                </template>
              </v-list-item>
              
              <!-- Настройка камер -->
              <v-list-item v-if="results.services?.cameraSetup" class="px-2">
                <v-list-item-title class="text-body-2">
                  Настройка камер ({{ formatPrice(results.services.cameraSetup.perItem) }} ₽ × {{ results.services.cameraSetup.count }})
                </v-list-item-title>
                <template v-slot:append>
                  <span class="text-body-2">{{ formatPrice(results.services.cameraSetup.price) }} ₽</span>
                </template>
              </v-list-item>
              
              <!-- Пусконаладка -->
              <v-list-item v-if="results.services?.commissioning" class="px-2">
                <v-list-item-title class="text-body-2">
                  Пусконаладочные работы ({{ formatPrice(results.services.commissioning.perItem) }} ₽ × {{ results.services.commissioning.count }})
                </v-list-item-title>
                <template v-slot:append>
                  <span class="text-body-2">{{ formatPrice(results.services.commissioning.price) }} ₽</span>
                </template>
              </v-list-item>
              
              <!-- Установка видеорегистратора -->
              <v-list-item v-if="results.services?.nvrInstallation" class="px-2">
                <v-list-item-title class="text-body-2">
                  Установка видеорегистратора
                </v-list-item-title>
                <template v-slot:append>
                  <span class="text-body-2">{{ formatPrice(results.services.nvrInstallation.price) }} ₽</span>
                </template>
              </v-list-item>
              
              <!-- Настройка видеорегистратора -->
              <v-list-item v-if="results.services?.nvrSetup" class="px-2">
                <v-list-item-title class="text-body-2">
                  Настройка видеорегистратора
                </v-list-item-title>
                <template v-slot:append>
                  <span class="text-body-2">{{ formatPrice(results.services.nvrSetup.price) }} ₽</span>
                </template>
              </v-list-item>
            </v-list>
          </div>
          
          <div class="text-subtitle-2 mt-2 mb-3 pa-2 bg-grey-lighten-5 rounded">
            <strong>Итого монтажные работы:</strong> {{ formatPrice(results.breakdown.installationTotal) }} ₽
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface CalculatorResultProps {
  results: {
    total: number;
    breakdown: {
      cameras: number;
      storage: number;
      network: number;
      mountingBoxes: number;
      cloudStorage?: number;
      cloudStoragePeriod?: string;
      installation: {
        cameraInstall: number;
        cameraSetup: number;
        commissioning: number;
        nvrInstall: number;
        nvrSetup: number;
      };
      equipmentTotal: number;
      installationTotal: number;
    };
    equipment: {
      cameras: Array<{
        id: string;
        name: string;
        price: number;
        count: number;
      }>;
      mountingBoxes: {
        name: string;
        price: number;
        count: number;
        total: number;
      };
      storage?: {
        type: string;
        name: string;
        price: number;
        hdd?: {
          name: string;
          price: number;
        };
      };
      network: {
        price: number;
        items: Array<{
          name: string;
          price: number;
          count: number;
        }>;
      };
      cloudStorage?: {
        monthlyPrice: number;
        storagePeriod: string;
      };
    };
    services: {
      cameraInstallation?: {
        price: number;
        perItem: number;
        count: number;
      };
      cameraSetup?: {
        price: number;
        perItem: number;
        count: number;
      };
      commissioning?: {
        price: number;
        perItem: number;
        count: number;
      };
      nvrInstallation?: {
        price: number;
        perItem: number;
        count: number;
      };
      nvrSetup?: {
        price: number;
        perItem: number;
        count: number;
      };
    };
  };
  formatPrice: (value: number) => string;
}

defineProps<CalculatorResultProps>()
</script>

<style scoped>
.calculator-results {
  margin-top: 16px;
}

.total-card {
  background-color: #f5f5f5;
}

.cloud-storage-block {
  border: 1px solid #e0f2fe;
  background-color: #f0f9ff;
  border-radius: 4px;
  padding: 12px;
}

.cloud-price {
  font-weight: bold;
  font-size: 1.1rem;
  color: #0284c7;
}
</style> 