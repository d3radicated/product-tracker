<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, PropType } from 'vue';
import { Product, Vendor } from '@/types/product';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'refresh', product: Product): void
}>()

const product = computed(() => props.product)

function openProduct(product: Product) {
  window.open(product.pageUrl, '_blank')
}
</script>

<template>
  <v-card>
    <v-progress-linear indeterminate :active="product.loading || false" />

    <v-card-text v-if="product.vendor === Vendor.Lazada">
    </v-card-text>

    <template v-else-if="product.vendor === Vendor.Shopee">
      <v-card-title>
        <div v-text="product.data?.data.name" />

        <v-spacer />

        <v-btn icon="mdi-refresh" variant="text" @click="emit('refresh', product)" />

        <v-btn icon="mdi-open-in-new" variant="text" @click="openProduct(product)" />
      </v-card-title>

      <v-card-text>
        <div class="models">
          <v-chip
            v-for="model in product.data?.data.models || []"
            :key="model.modelid"
            label
            size="small"
            variant="outlined"
            :color="model.normal_stock ? 'success' : 'error'"
          >
            {{ model.name }}
          </v-chip>
        </div>
      </v-card-text>
    </template>
  </v-card>
</template>

<style lang="scss" scoped>
.models > .v-chip:not(:last-of-type) {
  margin-right: 4px;
  margin-bottom: 4px;
}
</style>
