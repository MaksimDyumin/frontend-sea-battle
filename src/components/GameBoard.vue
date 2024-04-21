<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import GameCell from './GameCell.vue';
import { Orientation } from '@/stores/store.types';
import { WhichBoard } from './components.types';
// import type { WhichBoard } from './components.types';

const props = defineProps({
  which: {
    default: WhichBoard.player
  },
});

const gameStore = useGameStore()
const gameBoard = props.which === WhichBoard.player ? gameStore.gameBoard : gameStore.enemyGameBoard

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'i', 'J']


document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.keyCode === 82 && gameStore.enabledOrientation) {
    gameStore.orientation = gameStore.orientation === Orientation.onX ? Orientation.onY : Orientation.onX
  }
};
</script>

<template>
  <div class="game-board">
    <div class="left-path">
      <div class="empty-square">
      </div>
      <div class="y-coordinates">
        <span v-for="letter in 10">{{ letter }}</span>
      </div>
    </div>
    <div class="right-path">
      <div class="x-coordinates">
        <span v-for="letter in letters">{{ letter }}</span>
      </div>
      <div class="game-grid">
        <GameCell :which="which" v-for="cell in gameBoard" :key="cell.coordinateX + '_' + cell.coordinateX"
          :cell="cell" />
      </div>
    </div>


  </div>
</template>

<style scoped lang="scss">
.game-board {
  display: flex;
  margin-top: 60px;

  .left-path {
    .empty-square {
      width: 33px;
      height: 33px;
    }

    .y-coordinates {

      span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        width: 34px;
        height: 34px;
        border: 1px solid black;
        border-right: 2px solid black;
        box-sizing: inherit;
        margin-right: -1px;
        margin-top: -1px;
        position: relative;
        z-index: 1;
      }

    }
  }
}

.game-grid {
  width: 330px;
  display: flex;
  flex-wrap: wrap;
}

.x-coordinates {
  display: flex;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    width: 34px;
    height: 34px;
    border: 1px solid black;
    border-bottom: 2px solid black;
    box-sizing: inherit;
    margin-right: -1px;
    margin-top: -1px;
    position: relative;
    z-index: 1;
  }
}
</style>
