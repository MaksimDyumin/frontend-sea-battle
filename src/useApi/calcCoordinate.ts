import { Orientation, type BoardCell } from "@/stores/store.types"
import type { Ref } from "vue"

export const calcIndexByCoordinates = (startCell: BoardCell, stepValue: number, orientation: Ref<Orientation>) => {
    let coordinate = -1
    if (orientation.value === Orientation.onX) {
        coordinate = startCell.coordinateX + stepValue + (startCell.coordinateY * 10)
    } else if (orientation.value === Orientation.onY) {
        coordinate = startCell.coordinateX + ((startCell.coordinateY * 10) + (10 * stepValue))
    }

    return coordinate
}