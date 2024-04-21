import type { GameBoard } from "@/stores/store.types";

export const boardMocer = (): GameBoard => {
    let resultGameBoard: GameBoard = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const element = {
                isShip: false,
                isShooted: false,
                isShipDeadCell: false,
                coordinateY: i,
                coordinateX: j
            }
            resultGameBoard.push(element)
        }
    }

    return resultGameBoard
}