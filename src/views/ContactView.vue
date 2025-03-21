<template>
  <v-container>
    <PageTitle title="Контакты" />
    <div class="contact content-wrapper">
      <h1 class="text-h3 mb-6">Контакты</h1>
      
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-text>
              <h2 class="text-h5 mb-4">Наш адрес</h2>
              <p class="mb-2">Ленинградская область, Лужский район</p>
              <p class="mb-2">п. Мшинская</p>
              <p class="mb-4">ул. Ленина, д. 1</p>
              
              <h2 class="text-h5 mb-4">Контактные данные</h2>
              <p class="mb-2">Телефон: +7 (921) 123-45-67</p>
              <p class="mb-2">Email: info@third-eye.ru</p>
              
              <h2 class="text-h5 mb-4 mt-6">Режим работы</h2>
              <p class="mb-2">Пн-Пт: 9:00 - 18:00</p>
              <p class="mb-2">Сб: 10:00 - 16:00</p>
              <p>Вс: выходной</p>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>
              <h2 class="text-h5 mb-4">Напишите нам</h2>
              <v-form @submit.prevent="submitForm">
                <v-text-field
                  v-model="form.name"
                  label="Ваше имя"
                  required
                />
                
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  required
                />
                
                <v-textarea
                  v-model="form.message"
                  label="Сообщение"
                  required
                />
                
                <v-btn
                  color="primary"
                  type="submit"
                  block
                >
                  Отправить
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  // Здесь будет логика отправки формы
  console.log('Form submitted:', form.value)
}
</script> 