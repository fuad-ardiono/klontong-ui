<script setup>
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk, mdiEmail, mdiPound } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const router = useRouter()

const submit = async () => {
  try {
    await authStore.doRegister()
    router.push('/login')
  } catch {
    throw Error('Failed to register')
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <h3 class="font-bold mb-5">Register Form</h3>

        <FormField label="Name" help="Please enter your name">
          <FormControl
            v-model="authStore.payloadRegister.name"
            :icon="mdiAccount"
            name="name"
            autocomplete="name"
            placeholder="John Doe"
          />
        </FormField>

        <FormField label="Email" help="Please enter your email">
          <FormControl
            v-model="authStore.payloadRegister.email"
            :icon="mdiEmail"
            name="email"
            autocomplete="email"
            placeholder="example@example.com"
          />
        </FormField>

        <FormField label="Username" help="Please enter your username">
          <FormControl
            v-model="authStore.payloadRegister.username"
            :icon="mdiPound"
            name="username"
            autocomplete="username"
            placeholder="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="authStore.payloadRegister.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="Password"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Register" />
            <BaseButton to="/login" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
