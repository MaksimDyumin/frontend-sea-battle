import type { BackendShip, Ship } from "@/stores/store.types";

export default function mapShipCells(ships: Array<Ship>): Array<BackendShip> {
  const STATE_CHOICES = {
    'falsefalsefalse': "  ",
    'truefalsefalse': "S ",
    'truetruefalse': "SX",
    'falsefalsetrue': " X",
  }
  let backendShips: Array<BackendShip> = []
  ships.forEach((ship, index) => {
    const backendShip = ship.map((shipCell, index) => {
      const isShip = shipCell.isShip
      const isShipDeadCell = shipCell.isShipDeadCell
      const isShooted = shipCell.isShooted

      const res: string = String(isShip) + String(isShipDeadCell) + String(isShooted)

      return {
        state: STATE_CHOICES[res as keyof typeof STATE_CHOICES],
        coordinate_y: shipCell.coordinateY,
        coordinate_x: shipCell.coordinateX
      }
    })
    backendShips.push({cells: backendShip})
  })

  return backendShips
}