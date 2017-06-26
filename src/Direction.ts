export enum Direction {
    Up = 0,
    Right,
    Down,
    Left,
}

export function rotate(direction: Direction, offset: number): Direction {
    return (direction + offset + 4) % 4;
}
