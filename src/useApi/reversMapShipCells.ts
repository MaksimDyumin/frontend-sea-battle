import type { BackendShip, Ship } from "@/stores/store.types";

export default function reversMapShipCells(backendShips: Array<BackendShip>): Array<Ship> {
  const STATE_CHOICES = {
    "  ": [false, false, false],
    "S ": [true, false, false],
    "SX": [true, true, false],
    " X": [false, false, true],
  }

  let ships: Array<Ship> = []

  backendShips.forEach((backendShip, index) => {

    const shipCells = backendShip.cells.map((backendShipCell, index) => {
      const [v1, v2, v3] = STATE_CHOICES[backendShipCell.state as keyof typeof STATE_CHOICES]

      return {
        isShip: v1,
        isShooted: v2,
        isShipDeadCell: v3,
        coordinateY: backendShipCell.coordinate_y,
        coordinateX: backendShipCell.coordinate_x,
      }
    })
    ships.push(shipCells)
  })

  return ships
}