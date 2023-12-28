<script setup>
import { mdiShape, mdiPlus } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
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
      <SectionTitleLineWithButton :icon="mdiShape" title="Category" main>
        <slot>
          <BaseButton :icon="mdiPlus" color="whiteDark" label="Add Category" />
        </slot>
      </SectionTitleLineWithButton>
      <div class="flex my-3 justify-end">
        <FormControl v-model="filter.name" class="w-[300px]" placeholder="Search Category Name and Hit Enter" />
      </div>
      <CardBox class="mb-6" has-table>
        <TableSampleClients />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
