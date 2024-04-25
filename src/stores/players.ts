import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Player } from './store.types'
import useAxios from '@/useApi/useAxios'


export const usePlayersStore = defineStore('players', () => {
  const players: Ref<Array<Player> | null> = ref(null)
  const axios = useAxios().api

  async function getPlayers() {
    try {
      // const response = await axios.get('players/')
      // players.value = response.data
    } catch (error) {
      console.error(error)
    }


    await new Promise<void>(res => {
      setTimeout(() => {
        res()
      }, 500);
    })
    players.value = [
      { id: 1, userName: 'Игрок 1', status: 'Онлайн' },
      { id: 2, userName: 'Игрок 2', status: 'Оффлайн' },
      { id: 3, userName: 'Игрок 3', status: 'Оффлайн' },
      { id: 4, userName: 'Игрок 4', status: 'Онлайн' },
      { id: 5, userName: 'Игрок 5', status: 'Онлайн' },
    ];
  }

  return { players, getPlayers }
})