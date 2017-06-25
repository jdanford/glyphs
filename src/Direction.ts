export enum Direction {
    UP = 0,
    RIGHT,
    DOWN,
    LEFT,
}

export function rotate(direction: Direction, offset: number): Direction {
    return (direction + offset + 4) % 4;
}
