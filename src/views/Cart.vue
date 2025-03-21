<template>
  <div class="cart-page">
    <v-container>
      <h1 class="text-h4 mb-6">Корзина</h1>
      
      <div v-if="cartStore.itemCount > 0">
        <v-list>
          <v-list-item
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="mb-4"
          >
            <template v-slot:prepend>
              <v-img
                :src="item.product.image || '/images/no-image.jpg'"
                :alt="item.product.title"
                width="100"
                height="100"
                cover
                class="rounded"
              />
            </template>

            <v-list-item-title class="text-h6 mb-2">
              {{ item.product.title }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ formatPrice(item.product.price) }} ₽ × {{ item.quantity }} шт.
            </v-list-item-subtitle>

            <template v-slot:append>
              <div class="d-flex align-center">
                <div class="text-h6 mr-4">
                  {{ formatPrice(item.product.price * item.quantity) }} ₽
                </div>
                <div class="d-flex align-center">
                  <v-btn
                    icon="mdi-minus"
                    variant="tonal"
                    size="small"
                    @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                  />
                  <span class="mx-3">{{ item.quantity }}</span>
                  <v-btn
                    icon="mdi-plus"
                    variant="tonal"
                    size="small"
                    @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                  />
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    color="error"
                    class="ml-4"
                    @click="cartStore.removeItem(item.product.id)"
                  />
                </div>
              </div>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="my-6" />

        <div class="d-flex justify-space-between align-center mb-4">
          <v-switch
            :model-value="cartStore.includeInstallation"
            @update:model-value="cartStore.toggleInstallation()"
            label="Включить установку"
          />
          <div class="text-right">
            <div class="text-h6 mb-2">
              Итого: {{ formatPrice(cartStore.total) }} ₽
            </div>
            <div v-if="cartStore.includeInstallation" class="text-caption">
              Включая установку: {{ formatPrice(cartStore.installationCost) }} ₽
            </div>
          </div>
        </div>

        <div class="d-flex justify-end">
          <v-btn
            color="error"
            variant="text"
            class="mr-4"
            @click="cartStore.clearCart"
          >
            Очистить корзину
          </v-btn>
          <v-btn
            color="primary"
            size="large"
            @click="checkout"
          >
            Оформить заказ
          </v-btn>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <v-icon
          icon="mdi-cart-off"
          size="64"
          color="grey-lighten-1"
          class="mb-4"
        />
        <h2 class="text-h5 mb-4">Корзина пуста</h2>
        <v-btn
          color="primary"
          to="/products"
        >
          Перейти к каталогу
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useMemoize } from '@vueuse/core'

const cartStore = useCartStore()

const formatPrice = useMemoize(
  (price: number) => new Intl.NumberFormat('ru-RU').format(price)
)

const checkout = () => {
  // Здесь будет логика оформления заказа
  console.log('Оформление заказа...')
}
</script>

<style scoped>
.cart-page {
  min-height: calc(100vh - 64px);
  padding: 24px 0;
}

.v-list-item {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  margin-bottom: 16px;
}
</style> 