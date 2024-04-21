import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/configureShips',
      name: 'configureShips',
      component: () => import('../views/ConfigureShipsView.vue')
    },
    {
      path: '/searchOpponent',
      name: 'searchOpponent',
      component: () => import('../views/ChooseOpponentView.vue')
    },
    {
      path: '/battle',
      name: 'battle',
      component: () => import('@/views/BattleView.vue')
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

export default router
