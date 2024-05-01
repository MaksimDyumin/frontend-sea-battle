<template>
  <div class="player-list">
    <h2>Список игроков</h2>
    <transition name="fade" mode="out-in">
      <div v-if="isLoading" class="loading">Загрузка...</div>
      <ul v-else>
        <li @click="$router.push({ name: 'battle' })" v-for="player in userStore.players" :key="player.id"
          class="player-item">
          <span>{{ player.username }}</span> - <span class="status" :class="getStatusClass(player?.status)">
            {{ player.status ? player.status : 'Не известно' }}
          </span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
// import { usePlayersStore } from '@/stores/players';
import { useUserStore } from '@/stores/user';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

const userStore = useUserStore()
const isLoading: Ref<boolean> = ref(true);

const getStatusClass = (status: string | undefined) => {
  if (status === undefined) return 'status-offline'
  return status.toLowerCase() === 'онлайн' ? 'status-online' : 'status-offline';
};

onMounted(async () => {
  // await userStore.getPlayers()
  isLoading.value = false;
});
</script>

<style scoped>
.player-list {
  max-width: 600px;
  margin: 0 auto;
}

.loading,
.no-players {
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.no-players {
  color: #999;
}

ul {
  list-style-type: none;
  padding: 0;
}

.player-item {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}

.status {
  font-weight: bold;
}

.status-online {
  color: green;
}

.status-offline {
  color: red;
}
</style>