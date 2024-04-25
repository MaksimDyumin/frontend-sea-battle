
export type BoardCell = {
    isShip: boolean,
    isShipDeadCell: boolean,
    isShooted: boolean,
    coordinateY: number,
    coordinateX: number,
}
export type GameBoard = Array<BoardCell>

export type BackendCell = {
    state: string,
    coordinate_y: number,
    coordinate_x: number
}
export type BackendBoard = Array<BackendCell>

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
    username: string,
    password: string
}
export type AuthBody = {
    username: string,
    password: string
}

export type Player = {
    id: number,
    userName: string,
    status: string
}