import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const payload = reactive({
    email: '',
    password: ''
  })

  const authUser = ref({
    isAuthenticated: false
  })

  const payloadRegister = reactive({
    email: '',
    password: '',
    username: '',
    name: ''
  })

  async function doRegister() {
    const { data: { data: response } } = await axios.post(
      `${import.meta.env.VITE_APP_API_BASE_URL}/auth/register`,
      payloadRegister,
      { headers: { "Content-Type": 'application/json' } }
    )

    return response
  }

  async function doLogin() {
    const { data: { data: response } } = await axios.post(
      `${import.meta.env.VITE_APP_API_BASE_URL}/auth/login`,
      payload,
      { headers: { "Content-Type": 'application/json' } }
    )

    localStorage.setItem('auth', response.token)
    parseToken()
  }

  function doLogout() {
    localStorage.removeItem('auth')
    parseToken()
  }

  function parseToken() {
    const token = localStorage.getItem('auth')

    if (token) {
      authUser.value = {
        isAuthenticated: true
      }
    } else {
      authUser.value = {
        isAuthenticated: false
      }
    }
  }

  return {
    doLogin,
    doLogout,
    parseToken,
    payload,
    authUser,
    payloadRegister,
    doRegister
  }
})
