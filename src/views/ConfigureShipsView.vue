<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue';
import ShipsManager from '@/components/ShipsManager.vue';
import SwitchMode from '@/components/SwitchMode.vue';
import { useGameStore } from '@/stores/game';


const gameStore = useGameStore()

async function setShipsConfig() {
  await gameStore.setShipsConfig(gameStore.gameBoard)
}

</script>

<template>
  <div class="configure-ships">
    <div class="left-side">
      <ShipsManager />
    </div>
    <div class="right-side">
      <SwitchMode />
      <GameBoard />
      <button @click="setShipsConfig">Подтвердить конфигурацию</button>
    </div>

  </div>
</template>

<style scoped lang="scss">
.configure-ships {
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 12%;

  .right-side {
    align-items: center;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 20px;
    }
  }
}

@media (min-width: 1024px) {}
</style>
