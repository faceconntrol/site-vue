<template>
  <v-container>
    <PageTitle title="Технологии" />
    <v-row>
      <v-col v-for="tech in technologies" 
             :key="tech.title" 
             cols="12" 
             md="6" 
             class="mb-6">
        <v-card>
          <v-img
            :src="tech.image"
            height="300"
            cover
          />
          <v-card-title>{{ tech.title }}</v-card-title>
          <v-card-text>
            <p class="mb-4">{{ tech.description }}</p>
            <v-chip-group>
              <v-chip v-for="feature in tech.features" 
                     :key="feature">
                {{ feature }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'

const technologies = ref([
  {
    title: 'ColorVu',
    description: 'Технология для получения цветного изображения в условиях низкой освещенности',
    image: '/images/technologies/colorvu.jpg',
    features: ['Цветное изображение 24/7', 'Высокая четкость', 'Защита от засветки']
  },
  {
    title: 'AcuSense',
    description: 'Интеллектуальная система распознавания объектов на базе искусственного интеллекта',
    image: '/images/technologies/acusense.jpg',
    features: ['Распознавание людей', 'Распознавание транспорта', 'Ложные срабатывания < 1%']
  },
  {
    title: 'DarkFighter',
    description: 'Технология для работы камер в условиях экстремально низкой освещенности',
    image: '/images/technologies/darkfighter.jpg',
    features: ['Работа при 0.0005 лк', 'Шумоподавление', 'HDR 140дБ']
  },
  {
    title: 'Deep Learning',
    description: 'Алгоритмы глубокого обучения для интеллектуального видеоанализа',
    image: '/images/technologies/deep-learning.jpg',
    features: ['Распознавание лиц', 'Подсчет посетителей', 'Детекция масок']
  }
])
</script> 