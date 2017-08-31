System.register("IconClassName", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var IconClassName;
    return {
        setters: [],
        execute: function () {
            (function (IconClassName) {
                IconClassName.Base = "fa";
                IconClassName.Prefix = "fa-";
                IconClassName.Step = "fa-step-forward";
                IconClassName.Pause = "fa-pause";
            })(IconClassName || (IconClassName = {}));
            exports_1("IconClassName", IconClassName);
        }
    };
});
System.register("Direction", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function rotate(direction, offset) {
        return (direction + offset + 4) % 4;
    }
    exports_2("rotate", rotate);
    var Direction;
    return {
        setters: [],
        execute: function () {
            (function (Direction) {
                Direction[Direction["Up"] = 0] = "Up";
                Direction[Direction["Right"] = 1] = "Right";
                Direction[Direction["Down"] = 2] = "Down";
                Direction[Direction["Left"] = 3] = "Left";
            })(Direction || (Direction = {}));
            exports_2("Direction", Direction);
        }
    };
});
System.register("Point", ["Direction"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function moveInDirection(point, direction) {
        switch (direction) {
            case Direction_1.Direction.Up:
                point.y -= 1;
                break;
            case Direction_1.Direction.Right:
                point.x += 1;
                break;
            case Direction_1.Direction.Down:
                point.y += 1;
                break;
            case Direction_1.Direction.Left:
                point.x -= 1;
                break;
        }
    }
    exports_3("moveInDirection", moveInDirection);
    function wrapBounds(point, width, height) {
        const x = (point.x + width) % width;
        const y = (point.y + height) % height;
        return { x, y };
    }
    exports_3("wrapBounds", wrapBounds);
    var Direction_1;
    return {
        setters: [
            function (Direction_1_1) {
                Direction_1 = Direction_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("utils", ["IconClassName"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function computeAbsolutePosition(element) {
        let x = 0;
        let y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        return { x, y };
    }
    exports_4("computeAbsolutePosition", computeAbsolutePosition);
    function createIconElement(iconName) {
        const element = document.createElement("i");
        const iconClassName = IconClassName_1.IconClassName.Prefix + iconName;
        element.classList.add(IconClassName_1.IconClassName.Base, iconClassName);
        return element;
    }
    exports_4("createIconElement", createIconElement);
    function getCellElement(event) {
        if (!(event.target && event.target instanceof HTMLElement)) {
            return null;
        }
        switch (event.target.nodeName) {
            case "TD":
                return event.target;
            case "I":
                return event.target.parentNode;
            default:
                return null;
        }
    }
    exports_4("getCellElement", getCellElement);
    function getChildByClassName(element, className) {
        const child = element.getElementsByClassName(className)[0];
        if (child === null) {
            throw new Error(`Child with class='${className}' does not exist`);
        }
        return child;
    }
    exports_4("getChildByClassName", getChildByClassName);
    function getElementById(id) {
        const element = document.getElementById(id);
        if (element === null) {
            throw new Error(`Element with id='${id}' does not exist`);
        }
        return element;
    }
    exports_4("getElementById", getElementById);
    function getWindowHash() {
        return window.location.hash.slice(1);
    }
    exports_4("getWindowHash", getWindowHash);
    function setWindowHash(hash) {
        window.location.hash = "#" + hash;
    }
    exports_4("setWindowHash", setWindowHash);
    var IconClassName_1;
    return {
        setters: [
            function (IconClassName_1_1) {
                IconClassName_1 = IconClassName_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("ClassName", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var ClassName;
    return {
        setters: [],
        execute: function () {
            (function (ClassName) {
                ClassName.Active = "active";
                ClassName.Alias = "alias";
                ClassName.DarkTheme = "dark-theme";
                ClassName.Description = "description";
                ClassName.Group = "group";
                ClassName.Input = "input";
                ClassName.ModalOpen = "modal-open";
                ClassName.Output = "output";
            })(ClassName || (ClassName = {}));
            exports_5("ClassName", ClassName);
        }
    };
});
/// <reference path="EventEmitter.d.ts" />
System.register("GlyphGrid", ["utils", "IconClassName"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var utils_1, IconClassName_2, GlyphGrid;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (IconClassName_2_1) {
                IconClassName_2 = IconClassName_2_1;
            }
        ],
        execute: function () {
            GlyphGrid = class GlyphGrid extends EventEmitter {
                constructor(options) {
                    super();
                    this.width = options.width;
                    this.height = options.height;
                    this.gridElement = options.gridElement;
                    this.gridCells = new Array(this.width * this.height);
                    this.glyphs = options.glyphs;
                    this.initDictionary();
                    this.fill();
                    this.gridElement.addEventListener("click", event => {
                        const cellElement = utils_1.getCellElement(event);
                        if (cellElement) {
                            this.onCellClick(cellElement, event);
                        }
                    });
                }
                initDictionary() {
                    this.dictionary = {};
                    this.glyphs.forEach((glyph, i) => {
                        const { alias } = glyph;
                        this.dictionary[alias] = glyph;
                    });
                }
                fill() {
                    for (let y = 0; y < this.height; y++) {
                        const rowElement = document.createElement("tr");
                        this.gridElement.appendChild(rowElement);
                        for (let x = 0; x < this.width; x++) {
                            const cellElement = document.createElement("td");
                            const iconElement = document.createElement("i");
                            cellElement.appendChild(iconElement);
                            rowElement.appendChild(cellElement);
                            const i = this.index(x, y);
                            this.gridCells[i] = cellElement;
                            const alias = this.getInitialGlyphAlias(i);
                            this.setGlyph(cellElement, alias);
                        }
                    }
                }
                getInitialGlyphAlias(i) {
                    return "";
                }
                setGlyph(cellElement, alias) {
                    const iconElement = cellElement.childNodes[0];
                    iconElement.className = IconClassName_2.IconClassName.Base;
                    cellElement.title = alias;
                    if (alias) {
                        const glyph = this.dictionary[alias];
                        if (glyph) {
                            const className = IconClassName_2.IconClassName.Prefix + glyph.icon;
                            iconElement.classList.add(className);
                        }
                    }
                }
                index(x, y) {
                    return y * this.width + x;
                }
                get elementWidth() {
                    return this.gridElement.offsetWidth;
                }
            };
            exports_6("GlyphGrid", GlyphGrid);
        }
    };
});
System.register("StepSpeed", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var StepSpeed;
    return {
        setters: [],
        execute: function () {
            (function (StepSpeed) {
                StepSpeed[StepSpeed["Slow"] = 150] = "Slow";
                StepSpeed[StepSpeed["Fast"] = 25] = "Fast";
            })(StepSpeed || (StepSpeed = {}));
            exports_7("StepSpeed", StepSpeed);
        }
    };
});
System.register("ProgramCursor", ["Direction", "Point"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var Direction_2, Point_1, INITIAL_DIRECTION, ProgramCursor;
    return {
        setters: [
            function (Direction_2_1) {
                Direction_2 = Direction_2_1;
            },
            function (Point_1_1) {
                Point_1 = Point_1_1;
            }
        ],
        execute: function () {
            INITIAL_DIRECTION = Direction_2.Direction.Right;
            ProgramCursor = class ProgramCursor {
                constructor(width, height) {
                    this.direction = INITIAL_DIRECTION;
                    this.position = { x: 0, y: 0 };
                    this.width = width;
                    this.height = height;
                }
                rotateDirection(offset) {
                    this.direction = Direction_2.rotate(this.direction, offset);
                }
                move(direction) {
                    Point_1.moveInDirection(this.position, direction);
                }
                moveForward() {
                    this.move(this.direction);
                    this.wrapPosition();
                }
                moveBackward() {
                    const backwardDirection = Direction_2.rotate(this.direction, 2);
                    this.move(backwardDirection);
                    this.wrapPosition();
                }
                wrapPosition() {
                    Point_1.wrapBounds(this.position, this.width, this.height);
                }
            };
            exports_8("ProgramCursor", ProgramCursor);
        }
    };
});
System.register("GlyphEditor", ["ClassName", "GlyphGrid", "StepSpeed", "ProgramCursor"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var ClassName_1, GlyphGrid_1, StepSpeed_1, ProgramCursor_1, ENCODING_CHARS, CHUNK_SEPARATOR, GROUP_SEPARATOR, GlyphEditor;
    return {
        setters: [
            function (ClassName_1_1) {
                ClassName_1 = ClassName_1_1;
            },
            function (GlyphGrid_1_1) {
                GlyphGrid_1 = GlyphGrid_1_1;
            },
            function (StepSpeed_1_1) {
                StepSpeed_1 = StepSpeed_1_1;
            },
            function (ProgramCursor_1_1) {
                ProgramCursor_1 = ProgramCursor_1_1;
            }
        ],
        execute: function () {
            ENCODING_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            CHUNK_SEPARATOR = ":";
            GROUP_SEPARATOR = "-";
            GlyphEditor = class GlyphEditor extends GlyphGrid_1.GlyphGrid {
                constructor(options) {
                    super(options);
                    this.gridElement = options.gridElement;
                    this.initState();
                    this.initTables();
                    this.loadFromHash(options.initialHash);
                }
                initState() {
                    this.cursor = new ProgramCursor_1.ProgramCursor(this.width, this.height);
                    this.stack = [];
                    this.running = false;
                    this.stepSpeed = StepSpeed_1.StepSpeed.Slow;
                    this.lastStepTime = 0;
                }
                onCellClick(cellElement, event) {
                    if (this.editingCell === cellElement) {
                        this.endEditCell();
                    }
                    this.editCell(cellElement);
                }
                editCell(cellElement) {
                    this.editingCell = cellElement;
                    this.emit("editCell", this.editingCell);
                }
                endEditCell() {
                    this.editingCell = undefined;
                    this.emit("endEditCell");
                }
                initTables() {
                    this.charTable = {};
                    this.aliasTable = {};
                    this.glyphs.forEach((glyph, i) => {
                        const { alias } = glyph;
                        const char = ENCODING_CHARS[i];
                        this.charTable[alias] = char;
                        this.aliasTable[char] = alias;
                    });
                }
                clearGrid() {
                    for (let i = 0; i < this.width * this.height; i++) {
                        const cellElement = this.gridCells[i];
                        this.setGlyph(cellElement, "");
                    }
                }
                step() {
                    this.clearActiveCell();
                    this.activeCell = this.getCurrentCell();
                    this.activeCell.classList.add(ClassName_1.ClassName.Active);
                    const alias = this.activeCell.title;
                    this.executeAlias(alias);
                    this.cursor.moveForward();
                    this.emit("step");
                }
                executeAlias(alias) {
                    if (alias) {
                        const glyph = this.dictionary[alias];
                        glyph.effect(this);
                    }
                }
                start() {
                    if (this.setRunning(true)) {
                        const callback = (time) => {
                            if (!this.running) {
                                return;
                            }
                            requestAnimationFrame(callback);
                            const nextStepTime = this.lastStepTime + this.stepSpeed;
                            if (time >= nextStepTime) {
                                this.lastStepTime = time;
                                this.step();
                            }
                        };
                        requestAnimationFrame(callback);
                    }
                }
                pause() {
                    this.setRunning(false);
                }
                reset() {
                    this.initState();
                    this.clearActiveCell();
                    this.clearConsole();
                    this.emit("reset");
                }
                clearActiveCell() {
                    if (this.activeCell) {
                        this.activeCell.classList.remove(ClassName_1.ClassName.Active);
                        this.activeCell = undefined;
                    }
                }
                clear() {
                    this.reset();
                    this.clearGrid();
                    this.clearConsole();
                }
                setRunning(running) {
                    if (this.running === running) {
                        return false;
                    }
                    this.running = running;
                    const eventType = running ? "start" : "pause";
                    this.emit(eventType);
                    return true;
                }
                setStepSpeed(stepSpeed) {
                    if (this.stepSpeed === stepSpeed) {
                        return false;
                    }
                    this.stepSpeed = stepSpeed;
                    this.emit("changeSpeed");
                    return true;
                }
                getHash() {
                    const chunks = [];
                    let currentChunk = null;
                    for (let i = 0; i < this.width * this.height; i++) {
                        const cellElement = this.gridCells[i];
                        const alias = cellElement.title;
                        if (!alias) {
                            if (currentChunk) {
                                chunks.push(currentChunk);
                                currentChunk = null;
                            }
                            continue;
                        }
                        const char = this.charTable[alias];
                        if (!char) {
                            continue;
                        }
                        if (!currentChunk) {
                            currentChunk = { index: i, string: "" };
                        }
                        currentChunk.string += char;
                    }
                    if (currentChunk && currentChunk.string) {
                        chunks.push(currentChunk);
                    }
                    return chunks.map(({ index, string }) => index + CHUNK_SEPARATOR + string).join(GROUP_SEPARATOR);
                }
                loadFromHash(hash) {
                    this.clear();
                    const chunks = hash.split(GROUP_SEPARATOR);
                    if (!chunks[0]) {
                        return;
                    }
                    chunks.forEach(chunk => {
                        const [indexString, string] = chunk.split(CHUNK_SEPARATOR);
                        const index = parseInt(indexString);
                        this.loadFromChunk(index, string);
                    });
                }
                loadFromChunk(index, chunk) {
                    for (let i = 0; i < chunk.length; i++) {
                        const char = chunk[i];
                        const alias = this.aliasTable[char];
                        if (!alias) {
                            continue;
                        }
                        const cellElement = this.gridCells[index + i];
                        this.setGlyph(cellElement, alias);
                    }
                }
                saveHash() {
                    const hash = this.getHash();
                    this.emit("updateHash", hash);
                }
                print(text) {
                    this.emit("print", text);
                }
                println(text) {
                    this.print(text + "\n");
                }
                clearConsole() {
                    this.emit("clearConsole");
                }
                getCurrentCell() {
                    const i = this.index(this.cursor.position.x, this.cursor.position.y);
                    return this.gridCells[i];
                }
                getStackItem(n) {
                    const i = this.stack.length - n - 1;
                    return this.stack[i];
                }
            };
            exports_9("GlyphEditor", GlyphEditor);
        }
    };
});
System.register("glyphs", ["Direction"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var Direction_3, glyphs;
    return {
        setters: [
            function (Direction_3_1) {
                Direction_3 = Direction_3_1;
            }
        ],
        execute: function () {
            exports_10("glyphs", glyphs = [{
                    alias: "up",
                    icon: "arrow-up",
                    doc: "Points the cursor up.",
                    effect(editor) {
                        editor.cursor.direction = Direction_3.Direction.Up;
                    }
                }, {
                    alias: "right",
                    icon: "arrow-right",
                    doc: "Points the cursor right.",
                    effect(editor) {
                        editor.cursor.direction = Direction_3.Direction.Right;
                    }
                }, {
                    alias: "down",
                    icon: "arrow-down",
                    doc: "Points the cursor down.",
                    effect(editor) {
                        editor.cursor.direction = Direction_3.Direction.Down;
                    }
                }, {
                    alias: "left",
                    icon: "arrow-left",
                    doc: "Points the cursor left.",
                    effect(editor) {
                        editor.cursor.direction = Direction_3.Direction.Left;
                    }
                }, {
                    alias: "up-circle",
                    icon: "arrow-circle-up",
                    doc: "Points the cursor up if the first item on the stack is nonzero.",
                    effect(editor) {
                        if (editor.getStackItem(0)) {
                            editor.cursor.direction = Direction_3.Direction.Up;
                        }
                    }
                }, {
                    alias: "right-circle",
                    icon: "arrow-circle-right",
                    doc: "Points the cursor right if the first item on the stack is nonzero.",
                    effect(editor) {
                        if (editor.getStackItem(0)) {
                            editor.cursor.direction = Direction_3.Direction.Right;
                        }
                    }
                }, {
                    alias: "down-circle",
                    icon: "arrow-circle-down",
                    doc: "Points the cursor down if the first item on the stack is nonzero.",
                    effect(editor) {
                        if (editor.getStackItem(0)) {
                            editor.cursor.direction = Direction_3.Direction.Down;
                        }
                    }
                }, {
                    alias: "left-circle",
                    icon: "arrow-circle-left",
                    doc: "Points the cursor left if the first item on the stack is nonzero.",
                    effect(editor) {
                        if (editor.getStackItem(0)) {
                            editor.cursor.direction = Direction_3.Direction.Left;
                        }
                    }
                }, {
                    alias: "arrows",
                    icon: "arrows",
                    doc: "Points the cursor in a random direction.",
                    effect(editor) {
                        editor.cursor.direction = Math.floor(Math.random() * 4);
                    }
                }, {
                    alias: "rotate-right",
                    icon: "rotate-right",
                    doc: "Rotates the cursor clockwise.",
                    effect(editor) {
                        editor.cursor.rotateDirection(1);
                    }
                }, {
                    alias: "rotate-left",
                    icon: "rotate-left",
                    doc: "Rotates the cursor counter-clockwise.",
                    effect(editor) {
                        editor.cursor.rotateDirection(-1);
                    }
                }, {
                    alias: "exchange",
                    icon: "exchange",
                    doc: "Reverses the direction of the cursor.",
                    effect(editor) {
                        editor.cursor.rotateDirection(2);
                    }
                }, {
                    alias: "car",
                    icon: "car",
                    doc: "Copies the first item on the stack onto the top.",
                    effect(editor) {
                        editor.stack.push(editor.getStackItem(0));
                    }
                }, {
                    alias: "plane",
                    icon: "plane",
                    doc: "Copies the second item on the stack onto the top.",
                    effect(editor) {
                        editor.stack.push(editor.getStackItem(1));
                    }
                }, {
                    alias: "bomb",
                    icon: "bomb",
                    doc: "Pops the first item from the stack.",
                    effect(editor) {
                        editor.stack.pop();
                    }
                }, {
                    alias: "snowflake",
                    icon: "snowflake-o",
                    doc: "Swaps the first two items on the stack.",
                    effect(editor) {
                        const i = editor.stack.length - 2, j = editor.stack.length - 1;
                        const tmp = editor.stack[i];
                        editor.stack[i] = editor.stack[j];
                        editor.stack[j] = tmp;
                    }
                }, {
                    alias: "leaf",
                    icon: "leaf",
                    doc: "Pushes the constant 0 onto the stack.",
                    effect(editor) {
                        editor.stack.push(0);
                    }
                }, {
                    alias: "sun",
                    icon: "sun-o",
                    doc: "Increments the first item on the stack.",
                    effect(editor) {
                        editor.stack[editor.stack.length - 1]++;
                    }
                }, {
                    alias: "moon",
                    icon: "moon-o",
                    doc: "Decrements the first item on the stack.",
                    effect(editor) {
                        editor.stack[editor.stack.length - 1]--;
                    }
                }, {
                    alias: "smile",
                    icon: "smile-o",
                    doc: "Removes the first item from the stack and adds it to the second item.",
                    effect(editor) {
                        const value = editor.stack.pop();
                        if (value === undefined) {
                            throw new Error("Stack is empty");
                        }
                        editor.stack[editor.stack.length - 1] += value;
                    }
                }, {
                    alias: "comment",
                    icon: "comment",
                    doc: "Prints the first item on the stack.",
                    effect(editor) {
                        const value = editor.getStackItem(0);
                        editor.println(value.toString());
                    }
                }, {
                    alias: "eye",
                    icon: "eye",
                    doc: "Reads a number from the user and pushes it onto the stack.",
                    effect(editor) {
                        const input = prompt("Enter a number:", "");
                        const value = input ? parseInt(input) : 0;
                        editor.stack.push(value);
                    }
                }, {
                    alias: "close",
                    icon: "close",
                    doc: "Resets the program.",
                    effect(editor) {
                        editor.reset();
                    }
                }]);
        }
    };
});
// From https://github.com/nfriend/ts-keycode-enum/blob/master/Key.enum.ts
System.register("KeyCode", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var KeyCode;
    return {
        setters: [],
        execute: function () {
            (function (KeyCode) {
                KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
                KeyCode[KeyCode["Tab"] = 9] = "Tab";
                KeyCode[KeyCode["Enter"] = 13] = "Enter";
                KeyCode[KeyCode["Shift"] = 16] = "Shift";
                KeyCode[KeyCode["Ctrl"] = 17] = "Ctrl";
                KeyCode[KeyCode["Alt"] = 18] = "Alt";
                KeyCode[KeyCode["PauseBreak"] = 19] = "PauseBreak";
                KeyCode[KeyCode["CapsLock"] = 20] = "CapsLock";
                KeyCode[KeyCode["Escape"] = 27] = "Escape";
                KeyCode[KeyCode["Space"] = 32] = "Space";
                KeyCode[KeyCode["PageUp"] = 33] = "PageUp";
                KeyCode[KeyCode["PageDown"] = 34] = "PageDown";
                KeyCode[KeyCode["End"] = 35] = "End";
                KeyCode[KeyCode["Home"] = 36] = "Home";
                KeyCode[KeyCode["LeftArrow"] = 37] = "LeftArrow";
                KeyCode[KeyCode["UpArrow"] = 38] = "UpArrow";
                KeyCode[KeyCode["RightArrow"] = 39] = "RightArrow";
                KeyCode[KeyCode["DownArrow"] = 40] = "DownArrow";
                KeyCode[KeyCode["Insert"] = 45] = "Insert";
                KeyCode[KeyCode["Delete"] = 46] = "Delete";
                KeyCode[KeyCode["Zero"] = 48] = "Zero";
                KeyCode[KeyCode["ClosedParen"] = 48] = "ClosedParen";
                KeyCode[KeyCode["One"] = 49] = "One";
                KeyCode[KeyCode["ExclamationMark"] = 49] = "ExclamationMark";
                KeyCode[KeyCode["Two"] = 50] = "Two";
                KeyCode[KeyCode["AtSign"] = 50] = "AtSign";
                KeyCode[KeyCode["Three"] = 51] = "Three";
                KeyCode[KeyCode["PoundSign"] = 51] = "PoundSign";
                KeyCode[KeyCode["Hash"] = 51] = "Hash";
                KeyCode[KeyCode["Four"] = 52] = "Four";
                KeyCode[KeyCode["DollarSign"] = 52] = "DollarSign";
                KeyCode[KeyCode["Five"] = 53] = "Five";
                KeyCode[KeyCode["PercentSign"] = 53] = "PercentSign";
                KeyCode[KeyCode["Six"] = 54] = "Six";
                KeyCode[KeyCode["Caret"] = 54] = "Caret";
                KeyCode[KeyCode["Hat"] = 54] = "Hat";
                KeyCode[KeyCode["Seven"] = 55] = "Seven";
                KeyCode[KeyCode["Ampersand"] = 55] = "Ampersand";
                KeyCode[KeyCode["Eight"] = 56] = "Eight";
                KeyCode[KeyCode["Star"] = 56] = "Star";
                KeyCode[KeyCode["Asterik"] = 56] = "Asterik";
                KeyCode[KeyCode["Nine"] = 57] = "Nine";
                KeyCode[KeyCode["OpenParen"] = 57] = "OpenParen";
                KeyCode[KeyCode["A"] = 65] = "A";
                KeyCode[KeyCode["B"] = 66] = "B";
                KeyCode[KeyCode["C"] = 67] = "C";
                KeyCode[KeyCode["D"] = 68] = "D";
                KeyCode[KeyCode["E"] = 69] = "E";
                KeyCode[KeyCode["F"] = 70] = "F";
                KeyCode[KeyCode["G"] = 71] = "G";
                KeyCode[KeyCode["H"] = 72] = "H";
                KeyCode[KeyCode["I"] = 73] = "I";
                KeyCode[KeyCode["J"] = 74] = "J";
                KeyCode[KeyCode["K"] = 75] = "K";
                KeyCode[KeyCode["L"] = 76] = "L";
                KeyCode[KeyCode["M"] = 77] = "M";
                KeyCode[KeyCode["N"] = 78] = "N";
                KeyCode[KeyCode["O"] = 79] = "O";
                KeyCode[KeyCode["P"] = 80] = "P";
                KeyCode[KeyCode["Q"] = 81] = "Q";
                KeyCode[KeyCode["R"] = 82] = "R";
                KeyCode[KeyCode["S"] = 83] = "S";
                KeyCode[KeyCode["T"] = 84] = "T";
                KeyCode[KeyCode["U"] = 85] = "U";
                KeyCode[KeyCode["V"] = 86] = "V";
                KeyCode[KeyCode["W"] = 87] = "W";
                KeyCode[KeyCode["X"] = 88] = "X";
                KeyCode[KeyCode["Y"] = 89] = "Y";
                KeyCode[KeyCode["Z"] = 90] = "Z";
                KeyCode[KeyCode["LeftWindowKey"] = 91] = "LeftWindowKey";
                KeyCode[KeyCode["RightWindowKey"] = 92] = "RightWindowKey";
                KeyCode[KeyCode["SelectKey"] = 93] = "SelectKey";
                KeyCode[KeyCode["Numpad0"] = 96] = "Numpad0";
                KeyCode[KeyCode["Numpad1"] = 97] = "Numpad1";
                KeyCode[KeyCode["Numpad2"] = 98] = "Numpad2";
                KeyCode[KeyCode["Numpad3"] = 99] = "Numpad3";
                KeyCode[KeyCode["Numpad4"] = 100] = "Numpad4";
                KeyCode[KeyCode["Numpad5"] = 101] = "Numpad5";
                KeyCode[KeyCode["Numpad6"] = 102] = "Numpad6";
                KeyCode[KeyCode["Numpad7"] = 103] = "Numpad7";
                KeyCode[KeyCode["Numpad8"] = 104] = "Numpad8";
                KeyCode[KeyCode["Numpad9"] = 105] = "Numpad9";
                KeyCode[KeyCode["Multiply"] = 106] = "Multiply";
                KeyCode[KeyCode["Add"] = 107] = "Add";
                KeyCode[KeyCode["Subtract"] = 109] = "Subtract";
                KeyCode[KeyCode["DecimalPoint"] = 110] = "DecimalPoint";
                KeyCode[KeyCode["Divide"] = 111] = "Divide";
                KeyCode[KeyCode["F1"] = 112] = "F1";
                KeyCode[KeyCode["F2"] = 113] = "F2";
                KeyCode[KeyCode["F3"] = 114] = "F3";
                KeyCode[KeyCode["F4"] = 115] = "F4";
                KeyCode[KeyCode["F5"] = 116] = "F5";
                KeyCode[KeyCode["F6"] = 117] = "F6";
                KeyCode[KeyCode["F7"] = 118] = "F7";
                KeyCode[KeyCode["F8"] = 119] = "F8";
                KeyCode[KeyCode["F9"] = 120] = "F9";
                KeyCode[KeyCode["F10"] = 121] = "F10";
                KeyCode[KeyCode["F11"] = 122] = "F11";
                KeyCode[KeyCode["F12"] = 123] = "F12";
                KeyCode[KeyCode["NumLock"] = 144] = "NumLock";
                KeyCode[KeyCode["ScrollLock"] = 145] = "ScrollLock";
                KeyCode[KeyCode["SemiColon"] = 186] = "SemiColon";
                KeyCode[KeyCode["Equals"] = 187] = "Equals";
                KeyCode[KeyCode["Comma"] = 188] = "Comma";
                KeyCode[KeyCode["Dash"] = 189] = "Dash";
                KeyCode[KeyCode["Period"] = 190] = "Period";
                KeyCode[KeyCode["UnderScore"] = 189] = "UnderScore";
                KeyCode[KeyCode["PlusSign"] = 187] = "PlusSign";
                KeyCode[KeyCode["ForwardSlash"] = 191] = "ForwardSlash";
                KeyCode[KeyCode["Tilde"] = 192] = "Tilde";
                KeyCode[KeyCode["GraveAccent"] = 192] = "GraveAccent";
                KeyCode[KeyCode["OpenBracket"] = 219] = "OpenBracket";
                KeyCode[KeyCode["ClosedBracket"] = 221] = "ClosedBracket";
                KeyCode[KeyCode["Quote"] = 222] = "Quote";
            })(KeyCode || (KeyCode = {}));
            exports_11("KeyCode", KeyCode);
        }
    };
});
System.register("GlyphSelector", ["KeyCode", "GlyphGrid"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var KeyCode_1, GlyphGrid_2, GlyphSelector;
    return {
        setters: [
            function (KeyCode_1_1) {
                KeyCode_1 = KeyCode_1_1;
            },
            function (GlyphGrid_2_1) {
                GlyphGrid_2 = GlyphGrid_2_1;
            }
        ],
        execute: function () {
            GlyphSelector = class GlyphSelector extends GlyphGrid_2.GlyphGrid {
                constructor(options) {
                    const glyphCount = options.glyphs.length;
                    const length = Math.ceil(Math.sqrt(glyphCount));
                    super({
                        width: length,
                        height: length,
                        gridElement: options.gridElement,
                        glyphs: options.glyphs
                    });
                    this.containerElement = options.containerElement;
                    this.keyPressedListener = this.onKeyPressed.bind(this);
                }
                getInitialGlyphAlias(i) {
                    const glyph = this.glyphs[i - 1] || { alias: "" };
                    return glyph.alias;
                }
                onCellClick(cellElement, event) {
                    const alias = cellElement.title;
                    this.emit("selectGlyph", alias);
                }
                onKeyPressed(event) {
                    if (event.keyCode === KeyCode_1.KeyCode.Escape) {
                        this.emit("close");
                    }
                }
                show(position) {
                    const { x, y } = position;
                    this.containerElement.style.setProperty("left", `${x}px`);
                    this.containerElement.style.setProperty("top", `${y}px`);
                    this.containerElement.removeAttribute("hidden");
                    document.addEventListener("keyup", this.keyPressedListener);
                }
                hide() {
                    this.containerElement.setAttribute("hidden", "");
                    document.removeEventListener("keyup", this.keyPressedListener);
                }
            };
            exports_12("GlyphSelector", GlyphSelector);
        }
    };
});
System.register("Console", ["utils", "ClassName"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var utils_2, ClassName_2, Console;
    return {
        setters: [
            function (utils_2_1) {
                utils_2 = utils_2_1;
            },
            function (ClassName_2_1) {
                ClassName_2 = ClassName_2_1;
            }
        ],
        execute: function () {
            Console = class Console {
                constructor(options) {
                    this.containerElement = options.containerElement;
                    this.outputElement = utils_2.getChildByClassName(this.containerElement, ClassName_2.ClassName.Output);
                }
                print(text) {
                    this.outputElement.textContent += text;
                }
                clear() {
                    this.outputElement.textContent = "";
                }
                get elementWidth() {
                    const property = this.containerElement.style["width"] || "0px";
                    return +property.slice(0, -2);
                }
                set elementWidth(width) {
                    this.containerElement.style.setProperty("width", `${width}px`);
                }
            };
            exports_13("Console", Console);
        }
    };
});
System.register("ModalWindow", ["utils", "ClassName", "KeyCode"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var utils_3, ClassName_3, KeyCode_2, ModalWindow;
    return {
        setters: [
            function (utils_3_1) {
                utils_3 = utils_3_1;
            },
            function (ClassName_3_1) {
                ClassName_3 = ClassName_3_1;
            },
            function (KeyCode_2_1) {
                KeyCode_2 = KeyCode_2_1;
            }
        ],
        execute: function () {
            ModalWindow = class ModalWindow {
                constructor(options) {
                    this.keyPressedListener = this.onKeyPressed.bind(this);
                    this.modalElement = options.modalElement;
                    this.closeButton = utils_3.getChildByClassName(this.modalElement, "close-button");
                    this.initListeners();
                }
                static setModalContainer(modalContainer) {
                    if (this.modalContainer === modalContainer) {
                        return;
                    }
                    if (this.modalContainer) {
                        this.modalContainer.removeEventListener("click", this.containerClickListener);
                    }
                    this.modalContainer = modalContainer;
                    this.modalContainer.addEventListener("click", this.containerClickListener);
                }
                static hideActiveInstance() {
                    if (this.activeInstance) {
                        this.activeInstance.hide();
                    }
                }
                initListeners() {
                    this.modalElement.addEventListener("click", event => event.stopPropagation());
                    this.closeButton.addEventListener("click", _ => this.hide());
                }
                onKeyPressed(event) {
                    if (!this.visible) {
                        return;
                    }
                    if (event.keyCode === KeyCode_2.KeyCode.Escape) {
                        this.hide();
                    }
                }
                show() {
                    this.visible = true;
                }
                hide() {
                    this.visible = false;
                }
                get visible() {
                    return document.body.classList.contains(ClassName_3.ClassName.ModalOpen);
                }
                set visible(visible) {
                    if (this === ModalWindow.activeInstance && this.visible === visible) {
                        return;
                    }
                    document.body.classList.toggle(ClassName_3.ClassName.ModalOpen, visible);
                    if (visible) {
                        document.addEventListener("keyup", this.keyPressedListener);
                        ModalWindow.activeInstance = this;
                    }
                    else {
                        document.removeEventListener("keyup", this.keyPressedListener);
                    }
                }
            };
            ModalWindow.containerClickListener = ModalWindow.hideActiveInstance.bind(ModalWindow);
            exports_14("ModalWindow", ModalWindow);
        }
    };
});
System.register("programs", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var programs;
    return {
        setters: [],
        execute: function () {
            exports_15("programs", programs = [{
                    name: "Fibonacci",
                    code: "0:qmrbupc-27:atnd",
                }, {
                    name: "Countdown",
                    code: "0:vbuc-24:wesd",
                }]);
        }
    };
});
System.register("HelpWindow", ["ClassName", "ModalWindow", "utils", "glyphs", "programs"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var ClassName_4, ModalWindow_1, utils_4, glyphs_1, programs_1, HelpWindow;
    return {
        setters: [
            function (ClassName_4_1) {
                ClassName_4 = ClassName_4_1;
            },
            function (ModalWindow_1_1) {
                ModalWindow_1 = ModalWindow_1_1;
            },
            function (utils_4_1) {
                utils_4 = utils_4_1;
            },
            function (glyphs_1_1) {
                glyphs_1 = glyphs_1_1;
            },
            function (programs_1_1) {
                programs_1 = programs_1_1;
            }
        ],
        execute: function () {
            HelpWindow = class HelpWindow extends ModalWindow_1.ModalWindow {
                constructor(options) {
                    super(options);
                    this.programList = utils_4.getChildByClassName(this.modalElement, "programs");
                    this.glyphList = utils_4.getChildByClassName(this.modalElement, "glyphs");
                    this.initLists();
                }
                initLists() {
                    programs_1.programs.forEach(program => {
                        const programElement = this.createProgramElement(program);
                        this.programList.appendChild(programElement);
                    });
                    glyphs_1.glyphs.forEach(glyph => {
                        const glyphElement = this.createGlyphElement(glyph);
                        this.glyphList.appendChild(glyphElement);
                    });
                }
                createProgramElement(program) {
                    const programElement = document.createElement("li");
                    const aElement = document.createElement("a");
                    aElement.href = "#" + program.code;
                    aElement.textContent = program.name;
                    programElement.appendChild(aElement);
                    return programElement;
                }
                createGlyphElement(glyph) {
                    const glyphElement = document.createElement("div");
                    glyphElement.classList.add(ClassName_4.ClassName.Group);
                    const termElement = document.createElement("dt");
                    const iconElement = utils_4.createIconElement(glyph.icon);
                    const definitionElement = document.createElement("dd");
                    const aliasElement = document.createElement("span");
                    aliasElement.classList.add(ClassName_4.ClassName.Alias);
                    aliasElement.textContent = glyph.alias;
                    const descriptionElement = document.createElement("div");
                    descriptionElement.classList.add(ClassName_4.ClassName.Description);
                    descriptionElement.textContent = glyph.doc;
                    termElement.appendChild(iconElement);
                    definitionElement.appendChild(aliasElement);
                    definitionElement.appendChild(descriptionElement);
                    glyphElement.appendChild(termElement);
                    glyphElement.appendChild(definitionElement);
                    return glyphElement;
                }
            };
            exports_16("HelpWindow", HelpWindow);
        }
    };
});
System.register("App", ["utils", "ClassName", "IconClassName", "glyphs", "StepSpeed", "GlyphEditor", "GlyphSelector", "Console", "ModalWindow", "HelpWindow"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var utils_5, ClassName_5, IconClassName_3, glyphs_2, StepSpeed_2, GlyphEditor_1, GlyphSelector_1, Console_1, ModalWindow_2, HelpWindow_1, GRID_WIDTH, GRID_HEIGHT, CLEAR_MESSAGE, App;
    return {
        setters: [
            function (utils_5_1) {
                utils_5 = utils_5_1;
            },
            function (ClassName_5_1) {
                ClassName_5 = ClassName_5_1;
            },
            function (IconClassName_3_1) {
                IconClassName_3 = IconClassName_3_1;
            },
            function (glyphs_2_1) {
                glyphs_2 = glyphs_2_1;
            },
            function (StepSpeed_2_1) {
                StepSpeed_2 = StepSpeed_2_1;
            },
            function (GlyphEditor_1_1) {
                GlyphEditor_1 = GlyphEditor_1_1;
            },
            function (GlyphSelector_1_1) {
                GlyphSelector_1 = GlyphSelector_1_1;
            },
            function (Console_1_1) {
                Console_1 = Console_1_1;
            },
            function (ModalWindow_2_1) {
                ModalWindow_2 = ModalWindow_2_1;
            },
            function (HelpWindow_1_1) {
                HelpWindow_1 = HelpWindow_1_1;
            }
        ],
        execute: function () {
            GRID_WIDTH = 24;
            GRID_HEIGHT = 24;
            CLEAR_MESSAGE = "Clear grid?";
            App = class App {
                constructor() {
                    this.editorContainer = utils_5.getElementById("editor-container");
                    this.clearButton = utils_5.getElementById("clear-button");
                    this.stopButton = utils_5.getElementById("stop-button");
                    this.stepButton = utils_5.getElementById("step-button");
                    this.startButton = utils_5.getElementById("start-button");
                    this.fastButton = utils_5.getElementById("fast-button");
                    this.helpButton = utils_5.getElementById("help-button");
                    this.darkThemeCheckbox = utils_5.getElementById("dark-theme-checkbox");
                    this.stateChangeListener = this.onStateChange.bind(this);
                    this.initChildren();
                    this.initListeners();
                    this.updateConsoleSize();
                    this.setButtonState(false);
                }
                initChildren() {
                    const initialHash = utils_5.getWindowHash();
                    const editorGridElement = utils_5.getElementById("editor-grid");
                    this.editor = new GlyphEditor_1.GlyphEditor({
                        glyphs: glyphs_2.glyphs,
                        initialHash,
                        width: GRID_WIDTH,
                        height: GRID_HEIGHT,
                        gridElement: editorGridElement,
                    });
                    const selectorElement = utils_5.getElementById("selector-container");
                    const selectorGridElement = utils_5.getElementById("selector-grid");
                    this.selector = new GlyphSelector_1.GlyphSelector({
                        glyphs: glyphs_2.glyphs,
                        containerElement: selectorElement,
                        gridElement: selectorGridElement,
                    });
                    const consoleElement = utils_5.getElementById("console");
                    this.console = new Console_1.Console({ containerElement: consoleElement });
                    const modalContainer = utils_5.getElementById("modal-container");
                    ModalWindow_2.ModalWindow.setModalContainer(modalContainer);
                    const helpModal = utils_5.getElementById("help-modal");
                    this.helpWindow = new HelpWindow_1.HelpWindow({ modalElement: helpModal });
                }
                initListeners() {
                    this.editor.addListener("start", this.stateChangeListener);
                    this.editor.addListener("pause", this.stateChangeListener);
                    this.editor.addListener("reset", this.stateChangeListener);
                    this.editor.addListener("changeSpeed", this.stateChangeListener);
                    this.editor.addListener("updateHash", utils_5.setWindowHash);
                    window.addEventListener("resize", _ => {
                        this.updateConsoleSize();
                    });
                    window.onhashchange = _ => {
                        const hash = utils_5.getWindowHash();
                        this.editor.loadFromHash(hash);
                    };
                    this.editor.addListener("print", (text) => {
                        this.console.print(text);
                    });
                    this.editor.addListener("clearConsole", () => {
                        this.console.clear();
                    });
                    this.editor.addListener("editCell", (cellElement) => {
                        this.editor.pause();
                        const position = utils_5.computeAbsolutePosition(cellElement);
                        this.selector.show(position);
                        this.selector.addListener("selectGlyph", (alias) => {
                            this.editor.endEditCell();
                            this.editor.setGlyph(cellElement, alias);
                            this.editor.saveHash();
                        });
                    });
                    this.editor.addListener("endEditCell", () => {
                        this.selector.hide();
                        this.selector.removeAllListeners("selectGlyph");
                    });
                    this.selector.addListener("close", () => {
                        this.editor.endEditCell();
                    });
                    this.editorContainer.addEventListener("click", event => {
                        this.editor.endEditCell();
                    });
                    this.editorContainer.childNodes.forEach(element => {
                        element.addEventListener("click", event => event.stopPropagation());
                    });
                    this.clearButton.addEventListener("click", _ => {
                        if (confirm(CLEAR_MESSAGE)) {
                            this.editor.clear();
                            this.editor.saveHash();
                        }
                    });
                    this.stopButton.addEventListener("click", _ => {
                        this.editor.reset();
                    });
                    this.stepButton.addEventListener("click", _ => {
                        if (this.editor.running) {
                            this.editor.pause();
                        }
                        else {
                            this.editor.step();
                        }
                    });
                    this.startButton.addEventListener("click", _ => {
                        this.editor.setStepSpeed(StepSpeed_2.StepSpeed.Slow);
                        this.editor.start();
                    });
                    this.fastButton.addEventListener("click", _ => {
                        this.editor.setStepSpeed(StepSpeed_2.StepSpeed.Fast);
                        this.editor.start();
                    });
                    this.helpButton.addEventListener("click", _ => {
                        this.helpWindow.show();
                    });
                    this.darkThemeCheckbox.addEventListener("change", _ => {
                        this.darkThemeEnabled = this.darkThemeCheckbox.checked;
                    });
                }
                onStateChange() {
                    this.editor.endEditCell();
                    this.updateButtonState();
                }
                updateConsoleSize() {
                    this.console.elementWidth = this.editor.elementWidth;
                }
                setButtonState(running) {
                    const iconElement = this.stepButton.getElementsByClassName(IconClassName_3.IconClassName.Base)[0];
                    const iconClassName = running ? IconClassName_3.IconClassName.Pause : IconClassName_3.IconClassName.Step;
                    iconElement.className = IconClassName_3.IconClassName.Base;
                    iconElement.classList.add(iconClassName);
                    const runningSlow = running && this.editor.stepSpeed === StepSpeed_2.StepSpeed.Slow;
                    const runningFast = running && this.editor.stepSpeed === StepSpeed_2.StepSpeed.Fast;
                    this.startButton.classList.toggle(ClassName_5.ClassName.Active, runningSlow);
                    this.fastButton.classList.toggle(ClassName_5.ClassName.Active, runningFast);
                }
                updateButtonState() {
                    this.setButtonState(this.editor.running);
                }
                get darkThemeEnabled() {
                    return document.body.classList.contains(ClassName_5.ClassName.DarkTheme);
                }
                set darkThemeEnabled(enabled) {
                    document.body.classList.toggle(ClassName_5.ClassName.DarkTheme, enabled);
                }
            };
            exports_17("App", App);
        }
    };
});
System.register("index", ["App"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var App_1;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            document.addEventListener("DOMContentLoaded", _ => {
                const app = new App_1.App();
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvSWNvbkNsYXNzTmFtZS50cyIsInNyYy9EaXJlY3Rpb24udHMiLCJzcmMvUG9pbnQudHMiLCJzcmMvdXRpbHMudHMiLCJzcmMvQ2xhc3NOYW1lLnRzIiwic3JjL0dseXBoR3JpZC50cyIsInNyYy9TdGVwU3BlZWQudHMiLCJzcmMvUHJvZ3JhbUN1cnNvci50cyIsInNyYy9HbHlwaEVkaXRvci50cyIsInNyYy9nbHlwaHMudHMiLCJzcmMvS2V5Q29kZS50cyIsInNyYy9HbHlwaFNlbGVjdG9yLnRzIiwic3JjL0NvbnNvbGUudHMiLCJzcmMvTW9kYWxXaW5kb3cudHMiLCJzcmMvcHJvZ3JhbXMudHMiLCJzcmMvSGVscFdpbmRvdy50cyIsInNyYy9BcHAudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBLFdBQWlCLGFBQWE7Z0JBQ2Isa0JBQUksR0FBVyxJQUFJLENBQUM7Z0JBQ3BCLG9CQUFNLEdBQVcsS0FBSyxDQUFDO2dCQUN2QixrQkFBSSxHQUFXLGlCQUFpQixDQUFDO2dCQUNqQyxtQkFBSyxHQUFXLFVBQVUsQ0FBQztZQUM1QyxDQUFDLEVBTGdCLGFBQWEsS0FBYixhQUFhLFFBSzdCOzs7Ozs7OztJQ0VELGdCQUF1QixTQUFvQixFQUFFLE1BQWM7UUFDdkQsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7O1lBVEQsV0FBWSxTQUFTO2dCQUNqQixxQ0FBTSxDQUFBO2dCQUNOLDJDQUFLLENBQUE7Z0JBQ0wseUNBQUksQ0FBQTtnQkFDSix5Q0FBSSxDQUFBO1lBQ1IsQ0FBQyxFQUxXLFNBQVMsS0FBVCxTQUFTLFFBS3BCOzs7Ozs7OztJQ0VELHlCQUFnQyxLQUFZLEVBQUUsU0FBb0I7UUFDOUQsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FB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