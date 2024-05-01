import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { checkAuth } from '@/middlewares/checkAuth'
import type { RouteParams } from '@/router/router.types'
// import type {NavigationGuardWithThis} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middlewares: [checkAuth]
      }
    },
    {
      path: '/configureShips',
      name: 'configureShips',
      component: () => import('../views/ConfigureShipsView.vue'),
      meta: {
        middlewares: [checkAuth]
      }
    },
    {
      path: '/searchOpponent',
      name: 'searchOpponent',
      component: () => import('../views/ChooseOpponentView.vue'),
      meta: {
        middlewares: [checkAuth]
      }
    },
    {
      path: '/battle',
      name: 'battle',
      component: () => import('@/views/BattleView.vue'),
      meta: {
        middlewares: [checkAuth]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
  ]
})

router.beforeEach((routeParams: any) => {
  const middlewares: Array<Function> = routeParams.meta.middlewares
  if (!middlewares) return
  for(let middleware of middlewares) {
    middleware(routeParams)
  }
}) 

export default router
