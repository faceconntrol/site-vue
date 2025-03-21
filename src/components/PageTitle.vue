<template>
  <v-row class="page-title">
    <v-col cols="12" class="text-center">
      <h1 class="text-h4 font-weight-medium">{{ title }}</h1>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.page-title {
  margin: 0;
  padding: 16px 0 24px;
}

h1 {
  margin: 0;
  color: var(--v-primary-base);
  position: relative;
  display: inline-block;
}

h1::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: var(--v-primary-base);
  border-radius: 2px;
}
</style> 