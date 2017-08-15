import { Direction, rotate } from "./Direction";
import { Point, moveInDirection } from "./Point";

const INITIAL_DIRECTION: Direction = Direction.Right;

export class ProgramCursor {
    public direction: Direction;
    public position: Point;

    constructor() {
        this.direction = INITIAL_DIRECTION;
        this.position = { x: 0, y: 0 };
    }

    rotateDirection(offset: number): void {
        this.direction = rotate(this.direction, offset);
    }

    advance(): void {
        moveInDirection(this.position, this.direction);
    }
}
