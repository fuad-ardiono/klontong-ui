import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

export const useMarketPlaceStore = defineStore('marketPlace', () => {
  const marketPlaceList = ref({
    paginationMeta: {},
    paginationData: []
  })

  const marketPlaceDetail = ref(null)

  const payloadProduct = reactive({
    name: '',
    description: '',
    category_id: '',
    price: '',
    meta: {
      width: '',
      height: '',
      weight: '',
      length: '',
      image: ''
    }
  })

  async function addProduct() {
    const { data: { data: response } } = await axios.post(
      `${import.meta.env.VITE_APP_API_BASE_URL}/product`,
      payloadProduct,
      { headers: { "Content-Type": 'application/json', "Authorization": `Bearer ${localStorage.getItem('auth')}` } }
    )

    return response
  }

  async function fetchMarketPlace(page, pageSize, filter='') {
    let link = `/marketplace?page=${page}&pageSize=${pageSize}`

    if (filter != '') {
      link += `&name=${filter}`
    }

    const { data: { data: response } } = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}${link}`)
    marketPlaceList.value = response
  }

  async function fetchMarketPlaceDetail(productId) {
    const { data: { data: response } } = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/marketplace/${productId}`)
    marketPlaceDetail.value = response
  }

  return {
    marketPlaceDetail,
    marketPlaceList,
    fetchMarketPlace,
    fetchMarketPlaceDetail,
    payloadProduct,
    addProduct
  }
})
