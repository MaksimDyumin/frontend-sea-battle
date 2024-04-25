<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { Orientation, type BoardCell } from '@/stores/store.types';
import { WhichBoard } from './components.types';
import { computed, ref } from 'vue';


const props = defineProps<{
  cell: BoardCell,
  which: WhichBoard
}>()

const gameStore = useGameStore()

function setShipToBoard(cell: BoardCell) {
  if (!gameStore.enabledOrientation || !gameStore.isChoosing) return

  const coord = (cell.coordinateY * 10) + cell.coordinateX
  gameStore.positionShip(gameStore.shipLength, gameStore.gameBoard[coord])
  const el: HTMLElement = gameStore.choosedElement
  window.removeEventListener('mousemove', gameStore.mosemoveFn)
  gameStore.isChoosing = false
  gameStore.choosedElement = null
}

function deleteShipFromBoard(cell: BoardCell) {
  gameStore.ships.forEach((ship) => {
    let flag = false
    ship.forEach((boardCell) => {
      if (boardCell == cell) flag = true
    })
    if (flag) {
      console.log(ship)
      ship.forEach((boardCell) => {
        boardCell.isShip = false
        boardCell.isShooted = false
      })
    }
  })
}

function handelClick(cell: BoardCell, which: WhichBoard) {
  gameStore.deleteMode ? deleteShipFromBoard(cell) : setShipToBoard(cell)
  if (which === WhichBoard.enemy) {
    gameStore.shootCell(cell)
  }
}

function cellClasses(cell: BoardCell, which: WhichBoard): string {
  const shipClass = cell.isShip ? 'ship-cell' : ''
  const shootedClass = cell.isShooted ? 'choosed-field' : ''
  const ShipDeadCellClass = cell.isShipDeadCell ? 'dead-ship-path' : ''
  const enemyClass = which === WhichBoard.enemy ? 'choose-field' : ''

  return `${shipClass} ${shootedClass} ${enemyClass} ${ShipDeadCellClass}`.trim();
}
</script>

<template>
  <div @click="handelClick(cell, which)" :class="`game-cell ${cellClasses(cell, which)}`">
  </div>
</template>

<style>
.game-cell {
  display: flex;
  width: 34px;
  height: 34px;
  border: 1px solid black;
  box-sizing: inherit;
  margin-right: -1px;
  margin-top: -1px;
  position: relative;
  z-index: 1;
}

.ship-cell {
  border: 3px solid blue;
  z-index: 2;
}

.choosed-field {
  background-color: rgb(186, 186, 186);
}

.choose-field {
  cursor: pointer;
}

.choose-field:hover {
  background-color: rgb(171, 171, 171);
}

.dead-ship-path:after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: "\274c";
  font-size: 21px;
  color: #FFF;
  line-height: 24px;
  text-align: center;
}
</style>
