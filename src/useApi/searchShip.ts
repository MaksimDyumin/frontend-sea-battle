import type { GameBoard, Ship } from "@/stores/store.types";

export default function searchShip(backendShips: Array<Ship>, board: GameBoard) {
  // for(let ship of ships) {
  //   for(let searchedShip of searchedShips) {

  //     let flag = true
  //     for (let i = 0; i < searchedShip.length; i++) {
  //       const searchedShipCell = searchedShip[i]
  //       const boardShip = ship[i]
  //       if (searchedShipCell.coordinateX !== boardShip.coordinateX 
  //         && searchedShipCell.coordinateY !== boardShip.coordinateY) {
  //         flag = false
  //       }
  //     }
  //     if (flag) return ship
  //   }
  // }

  const shipsFromBoard = []

  for(let backendShip of backendShips) {
    const newShipFromBoard = []
    for(let backendShipCell of backendShip) {
      const index = backendShipCell.coordinateX + (backendShipCell.coordinateY * 10)
      newShipFromBoard.push(board[index])
    }
    shipsFromBoard.push(newShipFromBoard)
  }
  return shipsFromBoard
}