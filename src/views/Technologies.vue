<template>
  <div>
    <v-container>
      <PageTitle title="Технологии Hikvision" />
      <p class="text-body-1 text-center mb-8 max-w-3xl mx-auto">
        Передовые технологии для обеспечения безопасности и комфорта
      </p>

      <v-tabs
        v-model="selectedCategory"
        color="primary"
        grow
        class="mb-12"
      >
        <v-tab value="video">Видеонаблюдение</v-tab>
        <v-tab value="smart-home">Умный дом</v-tab>
      </v-tabs>
      
      <v-row class="technologies-grid">
        <v-col 
          v-for="tech in filteredTechnologies" 
          :key="tech.title"
          cols="12" 
          sm="6" 
          md="4"
        >
          <v-card class="technology-card h-100" elevation="2">
            <template v-if="tech.category === 'video'">
              <iframe
                :src="getTechVideo(tech.title)"
                width="100%"
                height="300"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="rounded-t-lg"
              ></iframe>
            </template>
            <template v-else>
              <v-img
                :src="tech.image"
                height="300"
                cover
                class="rounded-t-lg"
              />
            </template>
            <v-card-item>
              <div class="tech-icon mb-4">
                <v-icon size="40" color="primary">{{ tech.icon }}</v-icon>
              </div>
              <v-card-title class="text-h5 font-weight-bold mb-4">{{ tech.title }}</v-card-title>
              <v-card-text>
                <p class="mb-4">{{ tech.description }}</p>
                <ul class="features-list">
                  <li v-for="(feature, index) in tech.features" :key="index">
                    {{ feature }}
                  </li>
                </ul>
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from '@vue/runtime-dom'
import { technologies } from '@/data/technologies'
import PageTitle from '@/components/PageTitle.vue'

const selectedCategory = ref('video')

const filteredTechnologies = computed(() => {
  return technologies.filter(tech => tech.category === selectedCategory.value)
})

const getTechVideo = (title: string): string => {
  const videos: Record<string, string> = {
    'ColorVu': 'https://www.youtube.com/embed/2kbrsaKoAbU',
    'AcuSense': 'https://www.youtube.com/embed/q9RCqJmz0GE',
    'DarkFighter': 'https://www.youtube.com/embed/k0Fi-l1B1hY',
    'Deep Learning': 'https://www.youtube.com/embed/FT3P1pkZd44',
    'TandemVu': 'https://www.youtube.com/embed/v8_7dW_JaE0',
    'Smart IR': 'https://www.youtube.com/embed/I8IDtgXiU5A'
  }
  return videos[title] || ''
}
</script>

<style scoped>
.technology-card {
  transition: transform 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  overflow: hidden;
}

.technology-card:hover {
  transform: translateY(-8px);
}

.technology-card .v-img {
  border-radius: 16px 16px 0 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding-left: 24px;
  position: relative;
  margin-bottom: 8px;
}

.features-list li::before {
  content: "•";
  position: absolute;
  left: 8px;
  color: var(--primary-color);
}

iframe {
  border-radius: 16px 16px 0 0;
}
</style> 