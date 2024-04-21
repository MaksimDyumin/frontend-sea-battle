<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue';
import { WhichBoard } from '@/components/components.types';

</script>

<template>
  <main class="configure-ships">
    <div class="player-board-container">
      <h3>Твое поле</h3>
      <GameBoard :which="WhichBoard.player" />
    </div>
    <div class="enemy-board-container">
      <h3>Поле противника</h3>
      <GameBoard :which="WhichBoard.enemy" class="enemy-board" />
    </div>

  </main>
</template>

<style lang="scss">
.configure-ships {
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 12%;

  .player-board-container,
  .enemy-board-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      font-weight: bold;
    }
  }

  .enemy-board-container {
    margin-left: 80px;
  }
}

@media (min-width: 1024px) {}
</style>
