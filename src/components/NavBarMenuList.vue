<script setup>
import NavBarItem from '@/components/NavBarItem.vue'
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})

const authStore = useAuthStore()

const emit = defineEmits(['menu-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const menuComputed = computed(() => {
  if (authStore.authUser.isAuthenticated) {
    return props.menu.filter((obj) => {
      return obj.label !== 'Login'
    })
  } else {
    return props.menu.filter((obj) => {
      return obj.label !== 'AuthenticatedUser'
    })
  }
})
</script>

<template>
  <NavBarItem v-for="(item, index) in menuComputed" :key="index" :item="item" @menu-click="menuClick"/>
</template>
