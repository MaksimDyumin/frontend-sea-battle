import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import type { Ref } from 'vue'
import type { User, RegisterBody, AuthBody } from './store.types'
import useAxios from '@/useApi/useAxios'
import useCookie from '@/useApi/useCookie'


export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)
  const isUserNotLogedIn: Ref<boolean> = ref(true)
  const {api: axios, publicClient: client} = useAxios()
  const players: Array<User> = reactive([]);

  async function auth(authBody: AuthBody) {
    try {
      const responce = await axios.post('api/v1/token/', authBody)
      const refreshToken = useCookie('refreshToken')
      const accessToken = useCookie('accessToken')
      refreshToken.value = responce.data.refresh
      accessToken.value = responce.data.access
      isUserNotLogedIn.value = false
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

  async function getUserProfile() {
    try {
      const responce = await client.get('api/v1/profile/')
      user.value = responce.data
      return responce
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async function getPlayers() {
    try {
      const response = await axios.get('api/v1/players_list')
      response.data.forEach((player: User) => {
        players.push(player)
      })
      return response
    } catch (error) {
      
    }
  }

  return { user, isUserNotLogedIn, players, auth, register, logOut, getPlayers, getUserProfile }
})