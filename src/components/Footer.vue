<template>
  <v-footer class="bg-primary">
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <h3 class="text-h6 text-white mb-4">Контакты</h3>
          <div class="text-white">
            <p>{{ COMPANY_INFO.address }}</p>
            <p>Тел: {{ COMPANY_INFO.phone }}</p>
            <p>Email: {{ COMPANY_INFO.email }}</p>
          </div>
        </v-col>
        
        <v-col cols="12" sm="4">
          <h3 class="text-h6 text-white mb-4">Соцсети</h3>
          <div class="d-flex gap-4">
            <v-btn
              v-for="(link, network) in SOCIAL_LINKS"
              :key="network"
              :href="link"
              icon
              variant="text"
              color="white"
            >
              <v-icon>mdi-{{ network }}</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="text-h6 text-white mb-4">Навигация</h3>
          <v-list bg-color="transparent" class="pa-0">
            <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              :to="item.to"
              class="pa-0"
              color="white"
            >
              <v-list-item-title class="text-white">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider class="my-4 border-opacity-25" color="white" />
      
      <div class="text-center text-white">
        © {{ new Date().getFullYear() }} {{ COMPANY_INFO.name }}. Все права защищены.
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { COMPANY_INFO, SOCIAL_LINKS } from '@/constants'
import { ref } from 'vue'

const menuItems = ref([
  { title: 'Главная', to: '/' },
  { title: 'Продукты', to: '/products' },
  { title: 'Технологии', to: '/technologies' },
  { title: 'Решения', to: '/solutions' },
  { title: 'Калькулятор', to: '/calculator' },
  { title: 'Контакты', to: '/contact' }
])
</script> 