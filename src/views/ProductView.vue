<script setup>
import { mdiShoppingOutline } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { onBeforeMount, reactive, computed, ref } from 'vue'
import { useMarketPlaceStore } from '@/stores/marketPlace'
import { rupiah } from '@/utils/currencyUtils'
import debounce from '@/utils/debounceUtils'
import { useDarkModeStore } from '@/stores/darkMode'

const filter = reactive({
  name: ''
})
const marketPlaceStore = useMarketPlaceStore()
const darkModeStore = useDarkModeStore()

const currentPage = ref(1)

const totalPages = computed(() => {
  const perPage = 16
  const result = Math.ceil(marketPlaceStore.marketPlaceList.paginationMeta.totalRecord / perPage)
  return result < 1 ? 1 : result
})

const startPage = computed(() => {
  if (marketPlaceStore.marketPlaceList.paginationMeta.page === 1) {
    return 1
  }

  if (marketPlaceStore.marketPlaceList.paginationMeta.page === totalPages.value) {
    const pageShown = 5
    if (totalPages.value >= pageShown) {
      return totalPages.value - pageShown + 1
    }
  }

  return marketPlaceStore.marketPlaceList.paginationMeta.page - 1
})

const endPage = computed(() => {
  const pageShown = 5
  return Math.min(startPage.value + pageShown - 1, totalPages.value)
})

const pageNumber = computed(() => {
  const range = []

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === currentPage.value
    })
  }
  return range
})

const priceCurrency = computed(() => {
  return marketPlaceStore.marketPlaceList.paginationData.map((obj) => {
    return rupiah(obj.price)
  })
})

const imageStorage = computed(() => {
  return marketPlaceStore.marketPlaceList.paginationData.map((obj) => {
    if (obj.product_meta) {
      if (!obj.product_meta.image.includes('https')) {
        return `${import.meta.env.VITE_APP_API_BASE_URL}/${obj.product_meta.image}`
      }

      return obj.product_meta.image
    }
  })
})

async function handlePage(page) {
  currentPage.value = page
  await marketPlaceStore.fetchMarketPlace(page, 16, filter.name)
}

const handleFilter = debounce(
  async () =>
    await marketPlaceStore.fetchMarketPlace(1, 16, filter.name),
  500)

onBeforeMount(async () => {
  await marketPlaceStore.fetchMarketPlace(1, 16)
})

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiShoppingOutline" title="Marketplace" main>
        <!-- TODO: Render if logged in <slot>
          <BaseButton :icon="mdiPlus" color="whiteDark" label="Add Product"/>
        </slot> -->
      </SectionTitleLineWithButton>
      <div class="flex my-3 justify-end max-sm:flex-col max-sm:space-y-3">
        <FormControl
          v-model="filter.name" class="w-[300px] max-sm:w-full" placeholder="Search by Product Name"
          @input="handleFilter()" />
      </div>
      <CardBox class="mb-6">
        <div class="grid grid-cols-4 gap-4 max-sm:grid-cols-1 max-sm:gap-4">
          <div v-for="(item, index) in marketPlaceStore.marketPlaceList.paginationData" :key="index"
            class="flex flex-col bg-stone-200 p-2 cursor-pointer rounded-md" :class="{ 'bg-stone-700': darkModeStore.isEnabled == true }">
            <div>
              <img :src="imageStorage[index]" alt="">
            </div>
            <div class="text-center my-2">{{ item.name }}</div>
            <div class="text-center">{{ priceCurrency[index] }}</div>
          </div>
        </div>
      </CardBox>

      <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <BaseLevel class="flex space-x-2 items-center">
          <BaseButtons>
            <BaseButton v-for="page in pageNumber" :key="page.name" :active="page.name === currentPage" :label="page.name"
              :color="page.name === currentPage ? 'lightDark' : 'whiteDark'" small @click="handlePage(page.name)" />
          </BaseButtons>
          <small>Page {{ currentPage }} of {{ marketPlaceStore.marketPlaceList.paginationMeta.totalPage }}</small>
        </BaseLevel>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
