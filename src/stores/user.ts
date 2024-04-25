import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { User, RegisterBody, AuthBody } from './store.types'
import useAxios from '@/useApi/useAxios'
import useCookie from '@/useApi/useCookie'


export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)
  const isUserNotLogedIn: Ref<boolean> = ref(true)
  const {api: axios, publicClient: client} = useAxios()
  // const client = useAxios().

  async function auth(authBody: AuthBody) {
    try {
      const responce = await axios.post('api/v1/token/', authBody)
      const refreshToken = useCookie('refreshToken')
      const accessToken = useCookie('accessToken')
      refreshToken.value = responce.data.refresh
      accessToken.value = responce.data.access
      return responce
    } catch (error) {
      console.error(error)
    }

  }

  function register(registerBody: RegisterBody) {
    try {
      const responce = client.post('api/v1/user/', registerBody)
      return responce
    } catch (error) {
      console.error(error)
      return false
    }
  }

  function logOut() {
    isUserNotLogedIn.value = true
    user.value = null
  }

  return { user, isUserNotLogedIn, auth, register, logOut }
})