<template>
  <div class="calculator-results">
    <h3>Результаты расчета:</h3>
    
    <!-- Оборудование -->
    <div class="result-item">
      <span>Стоимость камер:</span>
      <span>{{ formatPrice(results.breakdown.cameras) }} ₽</span>
    </div>

    <div v-if="results.breakdown.storage" class="result-item">
      <span>Видеорегистратор:</span>
      <span>{{ formatPrice(results.breakdown.storage) }} ₽</span>
    </div>

    <!-- Монтажные работы -->
    <div class="result-item">
      <span>Монтажные коробки:</span>
      <span>{{ formatPrice(results.breakdown.installation.mountingBox) }} ₽</span>
    </div>

    <div class="result-item">
      <span>Установка камер:</span>
      <span>{{ formatPrice(results.breakdown.installation.cameraInstall) }} ₽</span>
    </div>

    <div class="result-item">
      <span>Настройка камер:</span>
      <span>{{ formatPrice(results.breakdown.installation.cameraSetup) }} ₽</span>
    </div>

    <div class="result-item">
      <span>Пуско-наладочные работы:</span>
      <span>{{ formatPrice(results.breakdown.installation.commissioning) }} ₽</span>
    </div>

    <div v-if="results.breakdown.installation.nvrInstall" class="result-item">
      <span>Установка регистратора:</span>
      <span>{{ formatPrice(results.breakdown.installation.nvrInstall) }} ₽</span>
    </div>

    <!-- Итого -->
    <div class="result-item total">
      <span>Итого:</span>
      <span>{{ formatPrice(results.total) }} ₽</span>
    </div>
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
      installation: {
        mountingBox: number;
        cameraInstall: number;
        cameraSetup: number;
        commissioning: number;
        nvrInstall?: number;
        nvrSetup?: number;
      };
      cloudStorage?: number;
    };
  };
  formatPrice: (value: number) => string;
}

defineProps<CalculatorResultProps>()
</script> 