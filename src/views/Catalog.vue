<template>
  <v-container>
    <PageTitle title="Каталог оборудования" />
    <v-row>
      <!-- Фильтры -->
      <v-col cols="12" md="3">
        <!-- ... остальной код ... -->
      </v-col>
      
      <!-- Список товаров -->
      <v-col cols="12" md="9">
        <!-- ... остальной код ... -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { catalogService } from '@/services/catalogService';
import PageTitle from '@/components/PageTitle.vue'
// остальной код
</script> 