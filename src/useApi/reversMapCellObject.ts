import type { BackendBoard, BackendCell, BoardCell, GameBoard } from "@/stores/store.types"

export default function reversMapCellObject(board: BackendBoard): GameBoard {
  const STATE_CHOICES = {
    "  ": [false, false, false],
    "S ": [true, false, false],
    "SX": [true, true, false],
    " X": [false, false, true],
  }

  const newBoard = board.map((cell, index) => {
    const [v1, v2, v3] = STATE_CHOICES[cell.state as keyof typeof STATE_CHOICES]

    return {
      isShip: v1,
      isShooted: v2,
      isShipDeadCell: v3,
      coordinateY: cell.coordinate_y,
      coordinateX: cell.coordinate_x,
    }
  })

  return newBoard
}