import {Direction} from "./Direction";
import {GlyphGrid} from "./GlyphGrid";

export interface Glyph {
    alias: string;
    icon: string;
    doc: string;
    effect(grid: GlyphGrid): void;
}

export const glyphs: Glyph[] = [{
    alias: "up",
    icon: "arrow-up",
    doc: "Points the cursor up.",
    effect(grid) {
        grid.direction = Direction.Up;
    }
}, {
    alias: "right",
    icon: "arrow-right",
    doc: "Points the cursor right.",
    effect(grid) {
        grid.direction = Direction.Right;
    }
}, {
    alias: "down",
    icon: "arrow-down",
    doc: "Points the cursor down.",
    effect(grid) {
        grid.direction = Direction.Down;
    }
}, {
    alias: "left",
    icon: "arrow-left",
    doc: "Points the cursor left.",
    effect(grid) {
        grid.direction = Direction.Left;
    }
}, {
    alias: "up-circle",
    icon: "arrow-circle-up",
    doc: "Points the cursor up if the first item on the stack is nonzero.",
    effect(grid) {
        if (grid.getStackItem(0)) {
            grid.direction = Direction.Up;
        }
    }
}, {
    alias: "right-circle",
    icon: "arrow-circle-right",
    doc: "Points the cursor right if the first item on the stack is nonzero.",
    effect(grid) {
        if (grid.getStackItem(0)) {
            grid.direction = Direction.Right;
        }
    }
}, {
    alias: "down-circle",
    icon: "arrow-circle-down",
    doc: "Points the cursor down if the first item on the stack is nonzero.",
    effect(grid) {
        if (grid.getStackItem(0)) {
            grid.direction = Direction.Down;
        }
    }
}, {
    alias: "left-circle",
    icon: "arrow-circle-left",
    doc: "Points the cursor left if the first item on the stack is nonzero.",
    effect(grid) {
        if (grid.getStackItem(0)) {
            grid.direction = Direction.Left;
        }
    }
}, {
    alias: "arrows",
    icon: "arrows",
    doc: "Points the cursor in a random direction.",
    effect(grid) {
        grid.direction = Math.floor(Math.random() * 4);
    }
}, {
    alias: "rotate-right",
    icon: "rotate-right",
    doc: "Rotates the cursor clockwise.",
    effect(grid) {
        grid.rotateDirection(1);
    }
}, {
    alias: "rotate-left",
    icon: "rotate-left",
    doc: "Rotates the cursor counter-clockwise.",
    effect(grid) {
        grid.rotateDirection(-1);
    }
}, {
    alias: "exchange",
    icon: "exchange",
    doc: "Reverses the direction of the cursor.",
    effect(grid) {
        grid.rotateDirection(2);
    }
}, {
    alias: "car",
    icon: "car",
    doc: "Copies the first item on the stack onto the top.",
    effect(grid) {
        grid.stack.push(grid.getStackItem(0));
    }
}, {
    alias: "plane",
    icon: "plane",
    doc: "Copies the second item on the stack onto the top.",
    effect(grid) {
        grid.stack.push(grid.getStackItem(1));
    }
}, {
    alias: "bomb",
    icon: "bomb",
    doc: "Pops the first item from the stack.",
    effect(grid) {
        grid.stack.pop();
    }
}, {
    alias: "snowflake",
    icon: "snowflake-o",
    doc: "Swaps the first two items on the stack.",
    effect(grid) {
        const i = grid.stack.length - 2, j = grid.stack.length - 1;
        const tmp = grid.stack[i];
        grid.stack[i] = grid.stack[j];
        grid.stack[j] = tmp;
    }
}, {
    alias: "leaf",
    icon: "leaf",
    doc: "Pushes the constant 0 onto the stack.",
    effect(grid) {
        grid.stack.push(0);
    }
}, {
    alias: "sun",
    icon: "sun-o",
    doc: "Increments the first item on the stack.",
    effect(grid) {
        grid.stack[grid.stack.length - 1]++;
    }
}, {
    alias: "moon",
    icon: "moon-o",
    doc: "Decrements the first item on the stack.",
    effect(grid) {
        grid.stack[grid.stack.length - 1]--;
    }
}, {
    alias: "smile",
    icon: "smile-o",
    doc: "Removes the first item from the stack and adds it to the second item.",
    effect(grid) {
        const value = grid.stack.pop();

        if (value === undefined) {
            throw new Error("Stack is empty");
        }

        grid.stack[grid.stack.length - 1] += value;
    }
}, {
    alias: "comment",
    icon: "comment",
    doc: "Prints the first item on the stack.",
    effect(grid) {
        const value = grid.getStackItem(0);
        grid.print(value.toString());
    }
}, {
    alias: "eye",
    icon: "eye",
    doc: "Reads a number from the user and pushes it onto the stack.",
    effect(grid) {
        const input = prompt("Enter a number:", "");
        const value = input ? parseInt(input) : 0;
        grid.stack.push(value);
    }
}, {
    alias: "close",
    icon: "close",
    doc: "Resets the program.",
    effect(grid) {
        grid.reset();
    }
}];
