import { ref, reactive, computed } from 'vue'
import type { Ref, UnwrapNestedRefs } from 'vue'
import { defineStore } from 'pinia'
import { Orientation, type BoardCell, type GameBoard, type Ship } from './store.types'
import { boardMocer } from '@/useApi/mocBoard'
import { calcIndexByCoordinates } from '@/useApi/calcCoordinate'
import useAxios from '@/useApi/useAxios'
import mapCellObject from '@/useApi/mapCellObject'
import reversMapCellObject from '@/useApi/reversMapCellObject'
import mapShipCells from '@/useApi/mapShipCells'
import reversMapShipCells from '@/useApi/reversMapShipCells'
import searchShip from '@/useApi/searchShip'

export const useGameStore = defineStore('game', () => {
  const gameBoard: Ref<GameBoard> = ref(boardMocer())
  const enemyGameBoard: UnwrapNestedRefs<GameBoard> = reactive(boardMocer())
  const shipLength: number = 1
  const orientation: Ref<Orientation> = ref(Orientation.onX)
  const enabledOrientation: Ref<boolean> = ref(true)
  const isChoosing: Ref<boolean> = ref(false)
  const axios = useAxios().api

  

  let deleteMode = false
  // let ships: Ref<Array<Ship>> = ref([])
  let ships: Ref<Array<Ship>> = ref([])
  let rCounter = 1
  let mosemoveFn: any = null
  let choosedElement: any = null

  const cBoard = computed((newWal): GameBoard => {
    return gameBoard.value
  })

  const cShips = computed((newWal): Array<Ship> => {
    return ships.value
  })

  


  function getGameBoardCellByCoord(corX: number, corY: number) {
    return gameBoard.value.filter((cell) => {
      if (cell.coordinateX === corX && cell.coordinateY === corY) return true
    })
  }

  function clearBoard() {
    ships.value.forEach((ship: Ship) => {
      ship.forEach((boardCell: BoardCell) => {
        boardCell.isShip = false
        boardCell.isShooted = false
      })
    })
  }

  async function setShipsConfig(board: GameBoard) {
    const newBoard = mapCellObject(board)
    const newShips = mapShipCells(ships.value)
    console.log({cells: newBoard, ships: newShips})
    try {
      const response = await axios.post('api/v1/boards/', {cells: newBoard, ships: newShips})
      return response
    } catch (error) {
      console.error(error)
    }
    
  }

  async function getShipsConfig() {
    const response = await axios.get('api/v1/boards/')
    
    const newBoard = reversMapCellObject(response.data.cells)
    gameBoard.value = newBoard

    const responceShips = reversMapShipCells(response.data.ships) 
    const shipsFromBoard = searchShip(responceShips, gameBoard.value)
    ships.value = shipsFromBoard

    return response
  }

  function shootCell(cell: BoardCell) {
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

      if (coordinate < 0 || gameBoard.value[coordinate].isShip || (orientation.value === Orientation.onX && startCell.coordinateY !== Math.floor(coordinate / 10))) {
        throw Error('Неправильное расположение корабля')
      }

      indexesArray.push(coordinate)
    }
    let ship: Ship = []
    for (const index of indexesArray) {
      gameBoard.value[index].isShip = true
      ship.push(gameBoard.value[index])
    }
    
    ships.value.push(ship)
  }

  return {
    gameBoard, enemyGameBoard, orientation,
    enabledOrientation, choosedElement, mosemoveFn,
    isChoosing, shipLength, rCounter,
    ships, deleteMode, cBoard, cShips,
    getGameBoardCellByCoord, positionShip, clearBoard,
    setShipsConfig, shootCell, getShipsConfig
  }
})
