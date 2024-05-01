import { useUserStore } from "@/stores/user"
import useCookie from "@/useApi/useCookie"
import { useRouter, useRoute } from 'vue-router'
import useApi from "@/useApi/useAxios"

export async function checkAuth(routeParams: any) {
  const router = useRouter()
  const refreshToken = useCookie('refreshToken')
  const accessToken = useCookie('accessToken')
  const userStore = useUserStore()

  try {
    const responce: any = await userStore.getUserProfile()
    if (responce.statusText !== "OK") {
      userStore.isUserNotLogedIn = true
      return router.push({name: 'login'})
    }
    userStore.isUserNotLogedIn = false
  } catch (error) {
  }
}