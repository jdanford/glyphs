const BASIC_DICTIONARY = {
    "up": {
        className: "arrow-up",
        effect(grid) {
            grid.direction = UP;
        }
    },

    "right": {
        className: "arrow-right",
        effect(grid) {
            grid.direction = RIGHT;
        }
    },

    "down": {
        className: "arrow-down",
        effect(grid) {
            grid.direction = DOWN;
        }
    },

    "left": {
        className: "arrow-left",
        effect(grid) {
            grid.direction = LEFT;
        }
    },

    "up-circle": {
        className: "arrow-circle-up",
        effect(grid) {
            if (grid.getStackItem(0)) {
                grid.direction = UP;
            }
        }
    },

    "right-circle": {
        className: "arrow-circle-right",
        effect(grid) {
            if (grid.getStackItem(0)) {
                grid.direction = RIGHT;
            }
        }
    },

    "down-circle": {
        className: "arrow-circle-down",
        effect(grid) {
            if (grid.getStackItem(0)) {
                grid.direction = DOWN;
            }
        }
    },

    "left-circle": {
        className: "arrow-circle-left",
        effect(grid) {
            if (grid.getStackItem(0)) {
                grid.direction = LEFT;
            }
        }
    },

    "arrows": {
        className: "arrows",
        effect(grid) {
            grid.direction = Math.floor(Math.random() * 4);
        }
    },

    "rotate-right": {
        className: "rotate-right",
        effect(grid) {
            grid.rotateDirection(1);
        }
    },

    "rotate-left": {
        className: "rotate-left",
        effect(grid) {
            grid.rotateDirection(-1);
        }
    },

    "exchange": {
        className: "exchange",
        effect(grid) {
            grid.rotateDirection(2);
        }
    },

    "car": {
        className: "car",
        effect(grid) {
            grid.stack.push(grid.getStackItem(0));
        }
    },

    "plane": {
        className: "plane",
        effect(grid) {
            grid.stack.push(grid.getStackItem(1));
        }
    },

    "bomb": {
        className: "bomb",
        effect(grid) {
            grid.stack.pop();
        }
    },

    "snowflake": {
        className: "snowflake-o",
        effect(grid) {
            const i = grid.stack.length - 2, j = grid.stack.length - 1;
            const tmp = grid.stack[i];
            grid.stack[i] = grid.stack[j];
            grid.stack[j] = tmp;
        }
    },

    "leaf": {
        className: "leaf",
        effect(grid) {
            grid.stack.push(0);
        }
    },

    "sun": {
        className: "sun-o",
        effect(grid) {
            grid.stack[grid.stack.length - 1]++;
        }
    },

    "moon": {
        className: "moon-o",
        effect(grid) {
            grid.stack[grid.stack.length - 1]--;
        }
    },

    "smile": {
        className: "smile-o",
        effect(grid) {
            const value = grid.stack.pop();
            grid.stack[grid.stack.length - 1] += value;
        }
    },

    "comment": {
        className: "comment",
        effect(grid) {
            grid.print(grid.getStackItem(0));
        }
    },

    "eye": {
        className: "eye",
        effect(grid) {
            const string = prompt("Enter a number:", "");
            const value = parseInt(string);
            grid.stack.push(value);
        }
    },

    "close": {
        className: "close",
        effect(grid) {
            grid.reset();
        }
    },
};
