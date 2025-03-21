<template>
  <v-btn
    :to="{ name: 'cart' }"
    icon
    class="cart-button"
  >
    <v-badge
      :content="totalItems"
      :model-value="totalItems > 0"
      color="primary"
    >
      <v-icon icon="mdi-cart" />
    </v-badge>
  </v-btn>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()
const totalItems = computed(() => cartStore.totalItems)
</script> 