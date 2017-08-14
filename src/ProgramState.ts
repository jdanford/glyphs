import {Direction, rotate} from "./Direction";
import {Point, moveInDirection} from "./Point";
import {StepSpeed} from "./StepSpeed";

const INITIAL_DIRECTION: Direction = Direction.Right;

export class ProgramState {
    public direction: Direction;
    public position: Point;
    public stack: number[];

    constructor() {
        this.direction = INITIAL_DIRECTION;
        this.position = {x: 0, y: 0};
        this.stack = [];
    }

    getStackItem(n: number): number {
        const i = this.stack.length - n - 1;
        return this.stack[i];
    }

    rotateDirection(offset: number): void {
        this.direction = rotate(this.direction, offset);
    }

    move(): void {
        moveInDirection(this.position, this.direction);
    }
}
