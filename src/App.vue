<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-text-field label="Link" @keydown.enter="" />

        <v-row dense>
          <v-col v-for="(product, _) in products" :key="_" cols="12" md="6">
            <product-card :product="product" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { Product, Vendor } from '@/types/product'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const products = ref<Product[]>([
  {
    apiUrl: 'https://shopee.ph/api/v4/item/get?itemid=16762754180&shopid=282024671',
    pageUrl: 'https://shopee.ph/Aquaflask-(22oz-40oz)-Dream-Collection-(Limited-Edition)-with-Silicone-Boot-i.282024671.16762754180',
    vendor: Vendor.Shopee,
  },
  {
    apiUrl: 'https://shopee.ph/api/v4/item/get?itemid=14122238472&shopid=426377685',
    pageUrl: 'https://shopee.ph/Lovito-Casual-Plain-Raw-Hem-Lace-Up-Ripped-Pants-L10104-(Light-Gray)-i.426377685.14122238472',
    vendor: Vendor.Shopee,
  },
])

onMounted(() => {
  products.value.forEach((product) => {
    product.loading = true;

    axios.get(`https://corsproxy.io/?${product.apiUrl}`)
      .then(({ data }) => {
        product.data = data
      })
      .finally(() => {
        product.loading = false;
      })
  })
})
</script>
