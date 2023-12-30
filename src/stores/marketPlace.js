import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useMarketPlaceStore = defineStore('marketPlace', () => {
  const marketPlaceList = ref({
    paginationMeta: {},
    paginationData: []
  })

  const marketPlaceDetail = ref({})

  async function fetchMarketPlace(page, pageSize, filter='') {
    let link = `/marketplace?page=${page}&pageSize=${pageSize}`

    if (filter != '') {
      link += `&name=${filter}`
    }

    const { data: { data: response } } = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}${link}`)
    marketPlaceList.value = response
  }

  return {
    marketPlaceDetail,
    marketPlaceList,
    fetchMarketPlace
  }
})
