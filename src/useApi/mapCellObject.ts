import type { GameBoard } from "@/stores/store.types"

export default function mapCellObject(board: GameBoard) {
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

  return newBoard
}