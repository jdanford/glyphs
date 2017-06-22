const glyphs = [{
    alias: "up",
    icon: "arrow-up",
    doc: "Points the cursor up",
    effect(grid) {
        grid.direction = Direction.UP;
    }
}, {
    alias: "right",
    icon: "arrow-right",
    doc: "Points the cursor right",
    effect(grid) {
        grid.direction = Direction.RIGHT;
    }
}, {
    alias: "down",
    icon: "arrow-down",
    doc: "Points the cursor down",
    effect(grid) {
        grid.direction = Direction.DOWN;
    }
}, {
    alias: "left",
    icon: "arrow-left",
    doc: "Points the cursor left",
    effect(grid) {
        grid.direction = Direction.LEFT;
    }
}, {
    alias: "up-circle",
    icon: "arrow-circle-up",
    doc: "Points the cursor up if the first item on the stack evaluates to true",
    effect(grid) {
        if (grid.getStackItem(0)) {
            grid.direction = Direction.UP;
        }
    }
}, {
    alias: "right-circle",
    icon: "arrow-circle-right",
    doc: "Points the cursor right if the first item on the stack evaluates to true",
    effect(grid) {
        if (grid.getStackItem(0)) {
            grid.direction = Direction.RIGHT;
        }
    }
}, {
    alias: "down-circle",
    icon: "arrow-circle-down",
    doc: "Points the cursor down if the first item on the stack evaluates to true",
    effect(grid) {
        if (grid.getStackItem(0)) {
            grid.direction = Direction.DOWN;
        }
    }
}, {
    alias: "left-circle",
    icon: "arrow-circle-left",
    doc: "Points the cursor left if the first item on the stack evaluates to true",
    effect(grid) {
        if (grid.getStackItem(0)) {
            grid.direction = Direction.LEFT;
        }
    }
}, {
    alias: "arrows",
    icon: "arrows",
    doc: "Points the cursor in a random direction",
    effect(grid) {
        grid.direction = Math.floor(Math.random() * 4);
    }
}, {
    alias: "rotate-right",
    icon: "rotate-right",
    doc: "Rotates the cursor clockwise",
    effect(grid) {
        grid.rotateDirection(1);
    }
}, {
    alias: "rotate-left",
    icon: "rotate-left",
    doc: "Rotates the cursor counter-clockwise",
    effect(grid) {
        grid.rotateDirection(-1);
    }
}, {
    alias: "exchange",
    icon: "exchange",
    doc: "Reverses the direction of the cursor",
    effect(grid) {
        grid.rotateDirection(2);
    }
}, {
    alias: "car",
    icon: "car",
    doc: "Copies the first item on the stack onto the top",
    effect(grid) {
        grid.stack.push(grid.getStackItem(0));
    }
}, {
    alias: "plane",
    icon: "plane",
    doc: "Copies the second item on the stack onto the top",
    effect(grid) {
        grid.stack.push(grid.getStackItem(1));
    }
}, {
    alias: "bomb",
    icon: "bomb",
    doc: "Pops the top item from the stack",
    effect(grid) {
        grid.stack.pop();
    }
}, {
    alias: "snowflake",
    icon: "snowflake-o",
    doc: "Swaps the top two items on the stack",
    effect(grid) {
        const i = grid.stack.length - 2, j = grid.stack.length - 1;
        const tmp = grid.stack[i];
        grid.stack[i] = grid.stack[j];
        grid.stack[j] = tmp;
    }
}, {
    alias: "leaf",
    icon: "leaf",
    doc: "Pushes the constant 0 onto the stack",
    effect(grid) {
        grid.stack.push(0);
    }
}, {
    alias: "sun",
    icon: "sun-o",
    doc: "Increments the first item on the stack",
    effect(grid) {
        grid.stack[grid.stack.length - 1]++;
    }
}, {
    alias: "moon",
    icon: "moon-o",
    doc: "Decrements the first item on the stack",
    effect(grid) {
        grid.stack[grid.stack.length - 1]--;
    }
}, {
    alias: "smile",
    icon: "smile-o",
    doc: "Removes the first item from the stack and adds it to the second item",
    effect(grid) {
        const value = grid.stack.pop();
        grid.stack[grid.stack.length - 1] += value;
    }
}, {
    alias: "comment",
    icon: "comment",
    doc: "Prints the first item on the stack",
    effect(grid) {
        grid.print(grid.getStackItem(0));
    }
}, {
    alias: "eye",
    icon: "eye",
    doc: "Reads a number from the user and pushes it onto the stack",
    effect(grid) {
        const string = prompt("Enter a number:", "");
        const value = parseInt(string);
        grid.stack.push(value);
    }
}, {
    alias: "close",
    icon: "close",
    doc: "Resets the program",
    effect(grid) {
        grid.reset();
    }
}];
