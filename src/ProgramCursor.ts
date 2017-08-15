import { Direction, rotate } from "./Direction";
import { Point, moveInDirection, wrapBounds } from "./Point";

const INITIAL_DIRECTION: Direction = Direction.Right;

export class ProgramCursor {
    public direction: Direction;
    public position: Point;
    public width: number;
    public height: number;

    constructor(width: number, height: number) {
        this.direction = INITIAL_DIRECTION;
        this.position = { x: 0, y: 0 };
        this.width = width;
        this.height = height;
    }

    rotateDirection(offset: number): void {
        this.direction = rotate(this.direction, offset);
    }

    move(direction: Direction): void {
        moveInDirection(this.position, direction);
    }

    moveForward(): void {
        this.move(this.direction);
        this.wrapPosition();
    }

    moveBackward(): void {
        const backwardDirection = rotate(this.direction, 2);
        this.move(backwardDirection);
        this.wrapPosition();
    }

    wrapPosition(): void {
        wrapBounds(this.position, this.width, this.height);
    }
}
