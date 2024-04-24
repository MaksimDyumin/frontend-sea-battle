import { ref, reactive, computed } from 'vue'
import type { Ref, UnwrapNestedRefs } from 'vue'
import { defineStore } from 'pinia'
import { Orientation, type BoardCell, type GameBoard, type Ship } from './store.types'
import { boardMocer } from '@/useApi/mocBoard'
import { calcIndexByCoordinates } from '@/useApi/calcCoordinate'
import useAxios from '@/useApi/useAxios'

export const useGameStore = defineStore('game', () => {
  const gameBoard: UnwrapNestedRefs<GameBoard> = reactive(boardMocer())
  const enemyGameBoard: UnwrapNestedRefs<GameBoard> = reactive(boardMocer())
  const shipLength: number = 1
  const orientation: Ref<Orientation> = ref(Orientation.onX)
  const enabledOrientation: Ref<boolean> = ref(true)
  const isChoosing: Ref<boolean> = ref(false)
  const axios = useAxios()
  let deleteMode = false
  let ships: Array<Ship> = []
  let rCounter = 1
  let mosemoveFn: any = null
  let choosedElement: any = null


  function getGameBoardCellByCoord(corX: number, corY: number) {
    return gameBoard.filter((cell) => {
      if (cell.coordinateX === corX && cell.coordinateY === corY) return true
    })
  }

  function clearBoard() {
    ships.forEach(ship => {
      ship.forEach((boardCell) => {
        boardCell.isShip = false
        boardCell.isShooted = false
      })
    })
  }

  async function setShipsConfig(board: GameBoard) {
    const STATE_CHOICES = {
      'falsefalsefalse': "  ",
      'truefalsefalse': "S ",
      'truetruefalse': "SX",
      'falsefalsetrue': " X",
    }
     
    const newBoard = board.map((cell, index) => {
      const isShip = cell.isShip
      const isShipDeadCell = cell.isShipDeadCell
      const isShooted = cell.isShooted

      const res: string = String(isShip) + String(isShipDeadCell) + String(isShooted)
      return {
        state: STATE_CHOICES[res as keyof typeof STATE_CHOICES],
        coordinate_y: cell.coordinateY,
        coordinate_x: cell.coordinateX
      }
    })

    const response = await axios.post('api/v1/boards', newBoard)
    console.log(response);
  }

  function shootCell(cell: BoardCell) {
    // axios.post('shootCell', cell)
    // cell.isShip
    cell.isShooted = true
  }

  function positionShip(length: number, startCell: BoardCell) {

    const startIndex = startCell.coordinateX + startCell.coordinateY * 10
    let indexesArray = [startIndex]

    let stepLength = 1
    for (let i = 1; i < length; i++) {
      if (i % 3 === 0) {
        stepLength += 1
      }

      let stepValue = i % 2 === 0 ? stepLength : -stepLength
      const coordinate = calcIndexByCoordinates(startCell, stepValue, orientation)

      if (coordinate < 0 || gameBoard[coordinate].isShip || (orientation.value === Orientation.onX && startCell.coordinateY !== Math.floor(coordinate / 10))) {
        throw Error('Неправильное расположение корабля')
      }

      indexesArray.push(coordinate)
    }
    let store = []
    for (const index of indexesArray) {
      gameBoard[index].isShip = true
      store.push(gameBoard[index])
    }
    ships.push(store)
  }

  return {
    gameBoard, enemyGameBoard, orientation,
    enabledOrientation, choosedElement, mosemoveFn,
    isChoosing, shipLength, rCounter,
    ships, deleteMode,
    getGameBoardCellByCoord, positionShip, clearBoard,
    setShipsConfig, shootCell
  }
})
