<script setup>
import { mdiShoppingOutline } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import { useMarketPlaceStore } from '@/stores/marketPlace'
import { useRouter } from 'vue-router'

const marketPlaceStore = useMarketPlaceStore()
const router = useRouter()

const submit = async () => {
  try {
    await marketPlaceStore.addProduct()
    router.push('/')
  } catch(error) {
    console.log(error)
    throw Error('Failed add product')
  }
}

async function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject
        }
      }
      reader.onerror = reject
    })
  }

async function handleFile(e) {
  const base64 = await convertFileToBase64(e.target.files[0])

  marketPlaceStore.payloadProduct.meta.image = base64.split('base64,')[1]
}

function handleSelectCategory(e) {
  const selected = e.target.value

  if (selected == 'Fashion') {
    marketPlaceStore.payloadProduct.category_id = 1
  } else if (selected == 'Education') {
    marketPlaceStore.payloadProduct.category_id = 2
  } else if (selected == 'Automotive') {
    marketPlaceStore.payloadProduct.category_id = 3
  } else if (selected == 'Medicine') {
    marketPlaceStore.payloadProduct.category_id = 4
  } else {
    marketPlaceStore.payloadProduct.category_id = 5
  }
}

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiShoppingOutline" title="Add Product" main>
      </SectionTitleLineWithButton>

      <CardBox class="mb-4" is-form @submit.prevent="submit">
        <FormField label="Name" help="Please enter your product name">
          <FormControl
            v-model="marketPlaceStore.payloadProduct.name"
            name="name"
            autocomplete="name"
            placeholder="John Doe"
          />
        </FormField>

        <FormField label="Description" help="Please enter your product description">
          <FormControl
            v-model="marketPlaceStore.payloadProduct.description"
            name="description"
            autocomplete="description"
            placeholder="Product description"
          />
        </FormField>

        <FormField label="Price" help="Please enter your product price">
          <FormControl
            v-model="marketPlaceStore.payloadProduct.price"
            name="price"
            autocomplete="price"
            placeholder="Product price"
          />
        </FormField>

        <FormField label="Category" help="Please enter your product category">
          <FormControl
            name="category"
            autocomplete="category"
            :options="['Fashion', 'Education', 'Automotive', 'Medicine', 'Technology']"
            @input="handleSelectCategory($event)"
          />
        </FormField>

        <FormField label="Width" help="Please enter your product width">
          <FormControl
            v-model="marketPlaceStore.payloadProduct.meta.width"
            name="width"
            autocomplete="price"
            placeholder="Product width"
          />
        </FormField>

        <FormField label="Height" help="Please enter your product height">
          <FormControl
            v-model="marketPlaceStore.payloadProduct.meta.height"
            name="height"
            autocomplete="height"
            placeholder="Product height"
          />
        </FormField>

        <FormField label="Length" help="Please enter your product length">
          <FormControl
            v-model="marketPlaceStore.payloadProduct.meta['length']"
            name="length"
            autocomplete="length"
            placeholder="Product length"
          />
        </FormField>

        <FormField label="Weight" help="Please enter your product weight">
          <FormControl
            v-model="marketPlaceStore.payloadProduct.meta.weight"
            name="weight"
            autocomplete="weight"
            placeholder="Product weight"
          />
        </FormField>

        <FormField label="Image" help="Please enter your product image">
          <FormFilePicker
            accept="image/gif, image/jpeg, image/png"
            @input="handleFile($event)"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Add" />
            <BaseButton to="/" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
