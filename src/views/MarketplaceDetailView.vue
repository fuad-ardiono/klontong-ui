<script setup>
import { mdiShoppingOutline } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { onBeforeMount, computed } from 'vue'
import { useMarketPlaceStore } from '@/stores/marketPlace'
import { rupiah } from '@/utils/currencyUtils'
import { useRoute } from 'vue-router'

const marketPlaceStore = useMarketPlaceStore()
const route = useRoute()


const priceCurrency = computed(() => {
  if (marketPlaceStore.marketPlaceDetail) {
    return rupiah(marketPlaceStore.marketPlaceDetail.price)
  }

  return rupiah(0)
})

const imageStorage = computed(() => {
  if (marketPlaceStore.marketPlaceDetail) {
    if (marketPlaceStore.marketPlaceDetail.product_meta.image.includes('https')) {
      return marketPlaceStore.marketPlaceDetail.product_meta.image
    } else {
      return `${import.meta.env.VITE_APP_API_BASE_URL}${marketPlaceStore.marketPlaceDetail.product_meta.image}`
    }
  }

  return ''
})

onBeforeMount(async () => {
  await marketPlaceStore.fetchMarketPlaceDetail(route.params.productId)
})

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain v-if="marketPlaceStore.marketPlaceDetail">
      <SectionTitleLineWithButton :icon="mdiShoppingOutline" :title="marketPlaceStore.marketPlaceDetail.name" main>
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div class="flex justify-between max-sm:flex-col max-sm:items-center">
          <div class="w-1/2">
            <img :src="imageStorage" alt="">
          </div>
          <div class="w-1/2 space-y-2">
            <h3 class="font-bold">{{ priceCurrency }}</h3>

            <p>{{ marketPlaceStore.marketPlaceDetail.description }}</p>

            <div class="pt-3">
              <p class="italic">Product Specification</p>
              <p class="italic">Height: {{ marketPlaceStore.marketPlaceDetail.product_meta.height }}</p>
              <p class="italic">Length: {{ marketPlaceStore.marketPlaceDetail.product_meta.length }}</p>
              <p class="italic">Width: {{ marketPlaceStore.marketPlaceDetail.product_meta.width }}</p>
              <p class="italic">Weight: {{ marketPlaceStore.marketPlaceDetail.product_meta.weight }}</p>
            </div>

            <div class="pt-3">
              <p>Category: {{ marketPlaceStore.marketPlaceDetail.category.name }}</p>
            </div>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
