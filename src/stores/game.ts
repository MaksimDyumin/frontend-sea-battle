import { ref, reactive, computed } from 'vue'
import type { Ref, UnwrapNestedRefs } from 'vue'
import { defineStore } from 'pinia'
import { Orientation, type BoardCell, type GameBoard, type Ship } from './store.types'
import { boardMocer } from '@/useApi/mocBoard'
import { calcIndexByCoordinates } from '@/useApi/calcCoordinate'
import useAxios from '@/useApi/useAxios'
import mapCellObject from '@/useApi/mapCellObject'
import reversMapCellObject from '@/useApi/reversMapCellObject'

export const useGameStore = defineStore('game', () => {
  const gameBoard: UnwrapNestedRefs<GameBoard> = reactive(boardMocer())
  const enemyGameBoard: UnwrapNestedRefs<GameBoard> = reactive(boardMocer())
  const shipLength: number = 1
  const orientation: Ref<Orientation> = ref(Orientation.onX)
  const enabledOrientation: Ref<boolean> = ref(true)
  const isChoosing: Ref<boolean> = ref(false)
  const axios = useAxios().api
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
    const newBoard = mapCellObject(board)
    try {
      const response = await axios.post('api/v1/boards/', {cells: newBoard})
      
      // response.data
      // gameBoard = 
      return response
    } catch (error) {
      console.error(error)
    }
    
  }

  async function getShipsConfig() {
    const response = await axios.get('api/v1/boards/')

    const newBoard = reversMapCellObject(response.data.cells)
    // newBoard.forEach((cell, index, array) => {
    //   const boardCell = gameBoard[index]
    //   boardCell.isShip = cell.isShip ? true : false
    //   boardCell.isShipDeadCell = cell.isShipDeadCell ? true : false
    //   boardCell.isShooted = cell.isShooted ? true : false
    // })
    for (let cell of newBoard) {
      const coord = (cell.coordinateY * 10) + cell.coordinateX
      const boardCell1 = gameBoard[coord]
      boardCell1.isShip = cell.isShip ? true : false
      boardCell1.isShipDeadCell = cell.isShipDeadCell ? true : false
      boardCell1.isShooted = cell.isShooted ? true : false
    }

    await new Promise<any>(r => {
      setTimeout(() => {
        r(1)
      }, 1000);
    })

    // gameBoard.forEach((cell, index, array) => {
    //   cell.isShip = true
    // })
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
    setShipsConfig, shootCell, getShipsConfig
  }
})
