
export type BoardCell = {
    isShip: boolean,
    isShooted: boolean,
    isShipDeadCell: boolean,
    coordinateY: number,
    coordinateX: number,
}
export type GameBoard = Array<BoardCell>

export type Ship = Array<BoardCell>

export type User = {
    id: number,
    name: string
}

export enum Orientation {
    onX = 0,
    onY = 1
}
export type OrientationType = Record<Orientation, number>;

export type RegisterBody = {
    userName: string,
    password: string
}
export type AuthBody = {
    userName: string,
    password: string
}

export type Player = {
    id: number,
    userName: string,
    status: string
}