import { Direction } from "./Direction";

export interface Point {
    x: number;
    y: number;
}

export function moveInDirection(point: Point, direction: Direction): void {
    switch (direction) {
        case Direction.Up:
            point.y -= 1;
            break;
        case Direction.Right:
            point.x += 1;
            break;
        case Direction.Down:
            point.y += 1;
            break;
        case Direction.Left:
            point.x -= 1;
            break;
    }
}

export function wrapBounds(point: Point, width: number, height: number): Point {
    const x = (point.x + width) % width;
    const y = (point.y + height) % height;
    return {x, y};
}
