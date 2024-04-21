import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { User, RegisterBody, AuthBody } from './store.types'
import useAxios from '@/useApi/useAxios'


export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)
  const isUserNotLogedIn: Ref<boolean> = ref(true)
  const axios = useAxios()

  function auth(authBody: AuthBody) {
    try {
      const responce = axios.post('auth/')
    } catch (error) {
      console.error(error)
    }

  }

  function register(rigisterBody: RegisterBody) {
    try {
      const responce = axios.post('register/')
    } catch (error) {
      console.error(error)
    }

  }

  function logOut() {
    isUserNotLogedIn.value = true
    user.value = null
  }

  return { user, isUserNotLogedIn, auth, register, logOut }
})