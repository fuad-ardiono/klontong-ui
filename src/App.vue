<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

onBeforeMount(() => {
  authStore.parseToken()
})
</script>

<template>
  <RouterView />
</template>
