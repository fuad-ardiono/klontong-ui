<script setup>
import { mdiShoppingOutline, mdiPlus } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { reactive } from 'vue'

const filter = reactive({
  name: ''
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiShoppingOutline" title="Product" main>
        <slot>
          <BaseButton :icon="mdiPlus" color="whiteDark" label="Add Product"/>
        </slot>
      </SectionTitleLineWithButton>
      <div class="flex my-3 justify-end max-sm:flex-col max-sm:space-y-3">
        <FormControl v-model="filter.name" class="w-[300px] max-sm:w-full" placeholder="Search by Product Name" />
      </div>
      <CardBox class="mb-6">
        <div class="flex">
          <span>Product 1</span>
          <span>Product 2</span>
          <span>Product 3</span>
          <span>Product 4</span>
          <span>Product 5</span>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
