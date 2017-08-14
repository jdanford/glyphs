import { Direction } from "./Direction";
import { GlyphEditor } from "./GlyphEditor";

export interface Glyph {
    alias: string;
    icon: string;
    doc: string;
    effect(editor: GlyphEditor): void;
}

export const glyphs: Glyph[] = [{
    alias: "up",
    icon: "arrow-up",
    doc: "Points the cursor up.",
    effect(editor) {
        editor.state.direction = Direction.Up;
    }
}, {
    alias: "right",
    icon: "arrow-right",
    doc: "Points the cursor right.",
    effect(editor) {
        editor.state.direction = Direction.Right;
    }
}, {
    alias: "down",
    icon: "arrow-down",
    doc: "Points the cursor down.",
    effect(editor) {
        editor.state.direction = Direction.Down;
    }
}, {
    alias: "left",
    icon: "arrow-left",
    doc: "Points the cursor left.",
    effect(editor) {
        editor.state.direction = Direction.Left;
    }
}, {
    alias: "up-circle",
    icon: "arrow-circle-up",
    doc: "Points the cursor up if the first item on the stack is nonzero.",
    effect(editor) {
        if (editor.state.getStackItem(0)) {
            editor.state.direction = Direction.Up;
        }
    }
}, {
    alias: "right-circle",
    icon: "arrow-circle-right",
    doc: "Points the cursor right if the first item on the stack is nonzero.",
    effect(editor) {
        if (editor.state.getStackItem(0)) {
            editor.state.direction = Direction.Right;
        }
    }
}, {
    alias: "down-circle",
    icon: "arrow-circle-down",
    doc: "Points the cursor down if the first item on the stack is nonzero.",
    effect(editor) {
        if (editor.state.getStackItem(0)) {
            editor.state.direction = Direction.Down;
        }
    }
}, {
    alias: "left-circle",
    icon: "arrow-circle-left",
    doc: "Points the cursor left if the first item on the stack is nonzero.",
    effect(editor) {
        if (editor.state.getStackItem(0)) {
            editor.state.direction = Direction.Left;
        }
    }
}, {
    alias: "arrows",
    icon: "arrows",
    doc: "Points the cursor in a random direction.",
    effect(editor) {
        editor.state.direction = Math.floor(Math.random() * 4);
    }
}, {
    alias: "rotate-right",
    icon: "rotate-right",
    doc: "Rotates the cursor clockwise.",
    effect(editor) {
        editor.state.rotateDirection(1);
    }
}, {
    alias: "rotate-left",
    icon: "rotate-left",
    doc: "Rotates the cursor counter-clockwise.",
    effect(editor) {
        editor.state.rotateDirection(-1);
    }
}, {
    alias: "exchange",
    icon: "exchange",
    doc: "Reverses the direction of the cursor.",
    effect(editor) {
        editor.state.rotateDirection(2);
    }
}, {
    alias: "car",
    icon: "car",
    doc: "Copies the first item on the stack onto the top.",
    effect(editor) {
        editor.state.stack.push(editor.state.getStackItem(0));
    }
}, {
    alias: "plane",
    icon: "plane",
    doc: "Copies the second item on the stack onto the top.",
    effect(editor) {
        editor.state.stack.push(editor.state.getStackItem(1));
    }
}, {
    alias: "bomb",
    icon: "bomb",
    doc: "Pops the first item from the stack.",
    effect(editor) {
        editor.state.stack.pop();
    }
}, {
    alias: "snowflake",
    icon: "snowflake-o",
    doc: "Swaps the first two items on the stack.",
    effect(editor) {
        const i = editor.state.stack.length - 2, j = editor.state.stack.length - 1;
        const tmp = editor.state.stack[i];
        editor.state.stack[i] = editor.state.stack[j];
        editor.state.stack[j] = tmp;
    }
}, {
    alias: "leaf",
    icon: "leaf",
    doc: "Pushes the constant 0 onto the stack.",
    effect(editor) {
        editor.state.stack.push(0);
    }
}, {
    alias: "sun",
    icon: "sun-o",
    doc: "Increments the first item on the stack.",
    effect(editor) {
        editor.state.stack[editor.state.stack.length - 1]++;
    }
}, {
    alias: "moon",
    icon: "moon-o",
    doc: "Decrements the first item on the stack.",
    effect(editor) {
        editor.state.stack[editor.state.stack.length - 1]--;
    }
}, {
    alias: "smile",
    icon: "smile-o",
    doc: "Removes the first item from the stack and adds it to the second item.",
    effect(editor) {
        const value = editor.state.stack.pop();

        if (value === undefined) {
            throw new Error("Stack is empty");
        }

        editor.state.stack[editor.state.stack.length - 1] += value;
    }
}, {
    alias: "comment",
    icon: "comment",
    doc: "Prints the first item on the stack.",
    effect(editor) {
        const value = editor.state.getStackItem(0);
        editor.print(value.toString());
    }
}, {
    alias: "eye",
    icon: "eye",
    doc: "Reads a number from the user and pushes it onto the stack.",
    effect(editor) {
        const input = prompt("Enter a number:", "");
        const value = input ? parseInt(input) : 0;
        editor.state.stack.push(value);
    }
}, {
    alias: "close",
    icon: "close",
    doc: "Resets the program.",
    effect(editor) {
        editor.reset();
    }
}];
