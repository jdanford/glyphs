var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
System.register("utils", ["IconClassName"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function getElementById(id) {
        var element = document.getElementById(id);
        if (element === null) {
            throw new Error("Element with id='" + id + "' does not exist");
        }
        return element;
    }
    exports_2("getElementById", getElementById);
    function getChildByClassName(element, className) {
        var child = element.getElementsByClassName(className)[0];
        if (child === null) {
            throw new Error("Child with class='" + className + "' does not exist");
        }
        return child;
    }
    exports_2("getChildByClassName", getChildByClassName);
    function createIconElement(iconName) {
        var element = document.createElement("i");
        var iconClassName = IconClassName_1.IconClassName.Prefix + iconName;
        element.classList.add(IconClassName_1.IconClassName.Base, iconClassName);
        return element;
    }
    exports_2("createIconElement", createIconElement);
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
System.register("ClassName", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var ClassName;
    return {
        setters: [],
        execute: function () {
            (function (ClassName) {
                ClassName.Active = "active";
                ClassName.DarkTheme = "dark-theme";
                ClassName.ModalOpen = "modal-open";
                ClassName.Group = "group";
                ClassName.Alias = "alias";
                ClassName.Description = "description";
            })(ClassName || (ClassName = {}));
            exports_3("ClassName", ClassName);
        }
    };
});
System.register("Direction", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function rotate(direction, offset) {
        return (direction + offset + 4) % 4;
    }
    exports_4("rotate", rotate);
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
            exports_4("Direction", Direction);
        }
    };
});
System.register("StepSpeed", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var StepSpeed;
    return {
        setters: [],
        execute: function () {
            (function (StepSpeed) {
                StepSpeed[StepSpeed["Slow"] = 200] = "Slow";
                StepSpeed[StepSpeed["Fast"] = 40] = "Fast";
            })(StepSpeed || (StepSpeed = {}));
            exports_5("StepSpeed", StepSpeed);
        }
    };
});
System.register("Point", ["Direction"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
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
    exports_6("moveInDirection", moveInDirection);
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
System.register("ProgramState", ["Direction", "Point"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Direction_2, Point_1, INITIAL_DIRECTION, ProgramState;
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
            ProgramState = (function () {
                function ProgramState() {
                    this.direction = INITIAL_DIRECTION;
                    this.position = { x: 0, y: 0 };
                    this.stack = [];
                }
                ProgramState.prototype.getStackItem = function (n) {
                    var i = this.stack.length - n - 1;
                    return this.stack[i];
                };
                ProgramState.prototype.rotateDirection = function (offset) {
                    this.direction = Direction_2.rotate(this.direction, offset);
                };
                ProgramState.prototype.move = function () {
                    Point_1.moveInDirection(this.position, this.direction);
                };
                return ProgramState;
            }());
            exports_7("ProgramState", ProgramState);
        }
    };
});
/// <reference path="EventEmitter.d.ts" />
System.register("GlyphEditor", ["ClassName", "IconClassName", "StepSpeed", "ProgramState"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
    var ClassName_1, IconClassName_2, StepSpeed_1, ProgramState_1, ENCODING_CHARS, CHUNK_SEPARATOR, GROUP_SEPARATOR, GRID_WIDTH, GRID_HEIGHT, GlyphEditor;
    return {
        setters: [
            function (ClassName_1_1) {
                ClassName_1 = ClassName_1_1;
            },
            function (IconClassName_2_1) {
                IconClassName_2 = IconClassName_2_1;
            },
            function (StepSpeed_1_1) {
                StepSpeed_1 = StepSpeed_1_1;
            },
            function (ProgramState_1_1) {
                ProgramState_1 = ProgramState_1_1;
            }
        ],
        execute: function () {
            ENCODING_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            CHUNK_SEPARATOR = ":";
            GROUP_SEPARATOR = "-";
            GRID_WIDTH = 24;
            GRID_HEIGHT = 24;
            GlyphEditor = (function (_super) {
                __extends(GlyphEditor, _super);
                function GlyphEditor(options) {
                    var _this = _super.call(this) || this;
                    _this.gridElement = options.gridElement;
                    _this.outputElement = options.outputElement;
                    _this.initState();
                    _this.initGrid();
                    _this.initDictionary(options.glyphs);
                    window.onhashchange = function (_) { return _this.loadFromWindow(); };
                    _this.loadFromWindow();
                    return _this;
                }
                GlyphEditor.prototype.initState = function () {
                    this.state = new ProgramState_1.ProgramState();
                    this.running = false;
                    this.stepSpeed = StepSpeed_1.StepSpeed.Slow;
                    this.lastStepTime = 0;
                };
                GlyphEditor.prototype.initGrid = function () {
                    var _this = this;
                    this.width = GRID_WIDTH;
                    this.height = GRID_HEIGHT;
                    this.grid = new Array(this.width * this.height);
                    this.fillGrid();
                    this.gridElement.addEventListener("click", function (event) {
                        var cellElement = getCellElement(event);
                        if (cellElement) {
                            var alias = prompt("Glyph:", "") || "";
                            _this.setGlyph(cellElement, alias);
                            _this.saveToWindow();
                        }
                    });
                };
                GlyphEditor.prototype.initDictionary = function (glyphs) {
                    var _this = this;
                    this.dictionary = {};
                    this.charTable = {};
                    this.aliasTable = {};
                    glyphs.forEach(function (glyph, i) {
                        var alias = glyph.alias;
                        _this.dictionary[alias] = glyph;
                        var char = ENCODING_CHARS[i];
                        _this.charTable[alias] = char;
                        _this.aliasTable[char] = alias;
                    });
                };
                GlyphEditor.prototype.fillGrid = function () {
                    for (var y = 0; y < this.height; y++) {
                        var rowElement = document.createElement("tr");
                        this.gridElement.appendChild(rowElement);
                        for (var x = 0; x < this.width; x++) {
                            var cellElement = document.createElement("td");
                            var iconElement = document.createElement("i");
                            cellElement.appendChild(iconElement);
                            rowElement.appendChild(cellElement);
                            var i = this.index(x, y);
                            this.grid[i] = cellElement;
                            this.setGlyph(cellElement, "");
                        }
                    }
                };
                GlyphEditor.prototype.clearGrid = function () {
                    for (var i = 0; i < this.width * this.height; i++) {
                        var cellElement = this.grid[i];
                        this.setGlyph(cellElement, "");
                    }
                };
                GlyphEditor.prototype.setGlyph = function (cellElement, alias) {
                    var iconElement = cellElement.childNodes[0];
                    iconElement.className = IconClassName_2.IconClassName.Base;
                    cellElement.title = alias;
                    if (alias) {
                        var glyph = this.dictionary[alias];
                        if (glyph) {
                            var className = IconClassName_2.IconClassName.Prefix + glyph.icon;
                            iconElement.classList.add(className);
                        }
                    }
                };
                GlyphEditor.prototype.step = function () {
                    var i = this.index(this.state.position.x, this.state.position.y);
                    this.clearActiveCell();
                    this.activeCell = this.getCurrentCell();
                    this.activeCell.classList.add(ClassName_1.ClassName.Active);
                    var alias = this.activeCell.title;
                    if (alias) {
                        var glyph = this.dictionary[alias];
                        glyph.effect(this);
                    }
                    this.state.move();
                    this.state.position.x = (this.state.position.x + this.width) % this.width;
                    this.state.position.y = (this.state.position.y + this.height) % this.height;
                    this.emitEvent("step");
                };
                GlyphEditor.prototype.start = function () {
                    var _this = this;
                    if (this.setRunning(true)) {
                        var callback_1 = function (time) {
                            if (!_this.running) {
                                return;
                            }
                            requestAnimationFrame(callback_1);
                            var nextStepTime = _this.lastStepTime + _this.stepSpeed;
                            if (time >= nextStepTime) {
                                _this.lastStepTime = time;
                                _this.step();
                            }
                        };
                        requestAnimationFrame(callback_1);
                    }
                };
                GlyphEditor.prototype.pause = function () {
                    this.setRunning(false);
                };
                GlyphEditor.prototype.reset = function () {
                    this.initState();
                    this.clearActiveCell();
                    this.clearOutput();
                    this.emitEvent("reset");
                };
                GlyphEditor.prototype.clearActiveCell = function () {
                    if (this.activeCell) {
                        this.activeCell.classList.remove(ClassName_1.ClassName.Active);
                        this.activeCell = undefined;
                    }
                };
                GlyphEditor.prototype.clear = function () {
                    this.reset();
                    this.clearGrid();
                    this.clearOutput();
                };
                GlyphEditor.prototype.setRunning = function (running) {
                    if (this.running === running) {
                        return false;
                    }
                    this.running = running;
                    var eventType = running ? "start" : "pause";
                    this.emitEvent(eventType);
                    return true;
                };
                GlyphEditor.prototype.setStepSpeed = function (stepSpeed) {
                    if (this.stepSpeed === stepSpeed) {
                        return false;
                    }
                    this.stepSpeed = stepSpeed;
                    this.emitEvent("changeSpeed");
                    return true;
                };
                GlyphEditor.prototype.getHash = function () {
                    var chunk = [];
                    var currentChunk = null;
                    for (var i = 0; i < this.width * this.height; i++) {
                        var cellElement = this.grid[i];
                        var alias = cellElement.title;
                        if (!alias) {
                            if (currentChunk) {
                                chunk.push(currentChunk);
                                currentChunk = null;
                            }
                            continue;
                        }
                        var char = this.charTable[alias];
                        if (!char) {
                            continue;
                        }
                        if (!currentChunk) {
                            currentChunk = { index: i, string: "" };
                        }
                        currentChunk.string += char;
                    }
                    if (currentChunk && currentChunk.string) {
                        chunk.push(currentChunk);
                    }
                    return chunk.map(function (_a) {
                        var index = _a.index, string = _a.string;
                        return index + CHUNK_SEPARATOR + string;
                    }).join(GROUP_SEPARATOR);
                };
                GlyphEditor.prototype.loadFromHash = function (hash) {
                    var _this = this;
                    this.clear();
                    var chunks = hash.split(GROUP_SEPARATOR);
                    if (!chunks[0]) {
                        return;
                    }
                    chunks.forEach(function (chunk) {
                        var _a = chunk.split(CHUNK_SEPARATOR), indexString = _a[0], string = _a[1];
                        var index = parseInt(indexString);
                        _this.loadFromChunk(index, string);
                    });
                };
                GlyphEditor.prototype.loadFromChunk = function (index, chunk) {
                    for (var i = 0; i < chunk.length; i++) {
                        var char = chunk[i];
                        var alias = this.aliasTable[char];
                        if (!alias) {
                            continue;
                        }
                        var cellElement = this.grid[index + i];
                        this.setGlyph(cellElement, alias);
                    }
                };
                GlyphEditor.prototype.saveToWindow = function () {
                    var hash = this.getHash();
                    window.location.hash = "#" + hash;
                };
                GlyphEditor.prototype.loadFromWindow = function () {
                    var hash = window.location.hash.slice(1);
                    this.loadFromHash(hash);
                };
                GlyphEditor.prototype.print = function (text) {
                    var preElement = document.createElement("pre");
                    preElement.textContent = text;
                    this.outputElement.appendChild(preElement);
                };
                GlyphEditor.prototype.clearOutput = function () {
                    while (this.outputElement.firstChild) {
                        this.outputElement.removeChild(this.outputElement.firstChild);
                    }
                };
                GlyphEditor.prototype.getCurrentCell = function () {
                    var i = this.index(this.state.position.x, this.state.position.y);
                    return this.grid[i];
                };
                GlyphEditor.prototype.index = function (x, y) {
                    return y * this.width + x;
                };
                return GlyphEditor;
            }(EventEmitter));
            exports_8("GlyphEditor", GlyphEditor);
            ;
        }
    };
});
System.register("glyphs", ["Direction"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Direction_3, glyphs;
    return {
        setters: [
            function (Direction_3_1) {
                Direction_3 = Direction_3_1;
            }
        ],
        execute: function () {
            exports_9("glyphs", glyphs = [{
                    alias: "up",
                    icon: "arrow-up",
                    doc: "Points the cursor up.",
                    effect: function (editor) {
                        editor.state.direction = Direction_3.Direction.Up;
                    }
                }, {
                    alias: "right",
                    icon: "arrow-right",
                    doc: "Points the cursor right.",
                    effect: function (editor) {
                        editor.state.direction = Direction_3.Direction.Right;
                    }
                }, {
                    alias: "down",
                    icon: "arrow-down",
                    doc: "Points the cursor down.",
                    effect: function (editor) {
                        editor.state.direction = Direction_3.Direction.Down;
                    }
                }, {
                    alias: "left",
                    icon: "arrow-left",
                    doc: "Points the cursor left.",
                    effect: function (editor) {
                        editor.state.direction = Direction_3.Direction.Left;
                    }
                }, {
                    alias: "up-circle",
                    icon: "arrow-circle-up",
                    doc: "Points the cursor up if the first item on the stack is nonzero.",
                    effect: function (editor) {
                        if (editor.state.getStackItem(0)) {
                            editor.state.direction = Direction_3.Direction.Up;
                        }
                    }
                }, {
                    alias: "right-circle",
                    icon: "arrow-circle-right",
                    doc: "Points the cursor right if the first item on the stack is nonzero.",
                    effect: function (editor) {
                        if (editor.state.getStackItem(0)) {
                            editor.state.direction = Direction_3.Direction.Right;
                        }
                    }
                }, {
                    alias: "down-circle",
                    icon: "arrow-circle-down",
                    doc: "Points the cursor down if the first item on the stack is nonzero.",
                    effect: function (editor) {
                        if (editor.state.getStackItem(0)) {
                            editor.state.direction = Direction_3.Direction.Down;
                        }
                    }
                }, {
                    alias: "left-circle",
                    icon: "arrow-circle-left",
                    doc: "Points the cursor left if the first item on the stack is nonzero.",
                    effect: function (editor) {
                        if (editor.state.getStackItem(0)) {
                            editor.state.direction = Direction_3.Direction.Left;
                        }
                    }
                }, {
                    alias: "arrows",
                    icon: "arrows",
                    doc: "Points the cursor in a random direction.",
                    effect: function (editor) {
                        editor.state.direction = Math.floor(Math.random() * 4);
                    }
                }, {
                    alias: "rotate-right",
                    icon: "rotate-right",
                    doc: "Rotates the cursor clockwise.",
                    effect: function (editor) {
                        editor.state.rotateDirection(1);
                    }
                }, {
                    alias: "rotate-left",
                    icon: "rotate-left",
                    doc: "Rotates the cursor counter-clockwise.",
                    effect: function (editor) {
                        editor.state.rotateDirection(-1);
                    }
                }, {
                    alias: "exchange",
                    icon: "exchange",
                    doc: "Reverses the direction of the cursor.",
                    effect: function (editor) {
                        editor.state.rotateDirection(2);
                    }
                }, {
                    alias: "car",
                    icon: "car",
                    doc: "Copies the first item on the stack onto the top.",
                    effect: function (editor) {
                        editor.state.stack.push(editor.state.getStackItem(0));
                    }
                }, {
                    alias: "plane",
                    icon: "plane",
                    doc: "Copies the second item on the stack onto the top.",
                    effect: function (editor) {
                        editor.state.stack.push(editor.state.getStackItem(1));
                    }
                }, {
                    alias: "bomb",
                    icon: "bomb",
                    doc: "Pops the first item from the stack.",
                    effect: function (editor) {
                        editor.state.stack.pop();
                    }
                }, {
                    alias: "snowflake",
                    icon: "snowflake-o",
                    doc: "Swaps the first two items on the stack.",
                    effect: function (editor) {
                        var i = editor.state.stack.length - 2, j = editor.state.stack.length - 1;
                        var tmp = editor.state.stack[i];
                        editor.state.stack[i] = editor.state.stack[j];
                        editor.state.stack[j] = tmp;
                    }
                }, {
                    alias: "leaf",
                    icon: "leaf",
                    doc: "Pushes the constant 0 onto the stack.",
                    effect: function (editor) {
                        editor.state.stack.push(0);
                    }
                }, {
                    alias: "sun",
                    icon: "sun-o",
                    doc: "Increments the first item on the stack.",
                    effect: function (editor) {
                        editor.state.stack[editor.state.stack.length - 1]++;
                    }
                }, {
                    alias: "moon",
                    icon: "moon-o",
                    doc: "Decrements the first item on the stack.",
                    effect: function (editor) {
                        editor.state.stack[editor.state.stack.length - 1]--;
                    }
                }, {
                    alias: "smile",
                    icon: "smile-o",
                    doc: "Removes the first item from the stack and adds it to the second item.",
                    effect: function (editor) {
                        var value = editor.state.stack.pop();
                        if (value === undefined) {
                            throw new Error("Stack is empty");
                        }
                        editor.state.stack[editor.state.stack.length - 1] += value;
                    }
                }, {
                    alias: "comment",
                    icon: "comment",
                    doc: "Prints the first item on the stack.",
                    effect: function (editor) {
                        var value = editor.state.getStackItem(0);
                        editor.print(value.toString());
                    }
                }, {
                    alias: "eye",
                    icon: "eye",
                    doc: "Reads a number from the user and pushes it onto the stack.",
                    effect: function (editor) {
                        var input = prompt("Enter a number:", "");
                        var value = input ? parseInt(input) : 0;
                        editor.state.stack.push(value);
                    }
                }, {
                    alias: "close",
                    icon: "close",
                    doc: "Resets the program.",
                    effect: function (editor) {
                        editor.reset();
                    }
                }]);
        }
    };
});
// From https://github.com/nfriend/ts-keycode-enum/blob/master/Key.enum.ts
System.register("KeyCode", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
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
            exports_10("KeyCode", KeyCode);
        }
    };
});
System.register("ModalWindow", ["utils", "ClassName", "KeyCode"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var utils_1, ClassName_2, KeyCode_1, ModalWindow;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (ClassName_2_1) {
                ClassName_2 = ClassName_2_1;
            },
            function (KeyCode_1_1) {
                KeyCode_1 = KeyCode_1_1;
            }
        ],
        execute: function () {
            ModalWindow = (function () {
                function ModalWindow(options) {
                    this.escapeKeyListener = this.onEscapeKeyPressed.bind(this);
                    this.modalElement = options.modalElement;
                    this.closeButton = utils_1.getChildByClassName(this.modalElement, "close-button");
                    this.initListeners();
                }
                ModalWindow.setModalContainer = function (modalContainer) {
                    if (this.modalContainer === modalContainer) {
                        return;
                    }
                    if (this.modalContainer) {
                        this.modalContainer.removeEventListener("click", this.containerClickListener);
                    }
                    this.modalContainer = modalContainer;
                    this.modalContainer.addEventListener("click", this.containerClickListener);
                };
                ModalWindow.hideActiveInstance = function () {
                    if (this.activeInstance) {
                        this.activeInstance.hide();
                    }
                };
                ModalWindow.prototype.initListeners = function () {
                    var _this = this;
                    this.modalElement.addEventListener("click", function (event) { return event.stopPropagation(); });
                    this.closeButton.addEventListener("click", function (_) { return _this.hide(); });
                };
                ModalWindow.prototype.onEscapeKeyPressed = function (event) {
                    if (!this.visible) {
                        return;
                    }
                    if (event.keyCode === KeyCode_1.KeyCode.Escape) {
                        this.hide();
                    }
                };
                ModalWindow.prototype.show = function () {
                    this.visible = true;
                };
                ModalWindow.prototype.hide = function () {
                    this.visible = false;
                };
                Object.defineProperty(ModalWindow.prototype, "visible", {
                    get: function () {
                        return document.body.classList.contains(ClassName_2.ClassName.ModalOpen);
                    },
                    set: function (visible) {
                        if (this === ModalWindow.activeInstance && this.visible === visible) {
                            return;
                        }
                        document.body.classList.toggle(ClassName_2.ClassName.ModalOpen, visible);
                        if (visible) {
                            document.addEventListener("keyup", this.escapeKeyListener);
                            ModalWindow.activeInstance = this;
                        }
                        else {
                            document.removeEventListener("keyup", this.escapeKeyListener);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ModalWindow;
            }());
            ModalWindow.containerClickListener = ModalWindow.hideActiveInstance.bind(ModalWindow);
            exports_11("ModalWindow", ModalWindow);
        }
    };
});
System.register("programs", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var programs;
    return {
        setters: [],
        execute: function () {
            exports_12("programs", programs = [{
                    name: "Fibonacci",
                    code: "0:qmrbupc-27:atnd",
                }, {
                    name: "Countdown",
                    code: "0:vbuc-24:wesd",
                }]);
        }
    };
});
System.register("HelpWindow", ["ClassName", "ModalWindow", "utils", "glyphs", "programs"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var ClassName_3, ModalWindow_1, utils_2, glyphs_1, programs_1, HelpWindow;
    return {
        setters: [
            function (ClassName_3_1) {
                ClassName_3 = ClassName_3_1;
            },
            function (ModalWindow_1_1) {
                ModalWindow_1 = ModalWindow_1_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            },
            function (glyphs_1_1) {
                glyphs_1 = glyphs_1_1;
            },
            function (programs_1_1) {
                programs_1 = programs_1_1;
            }
        ],
        execute: function () {
            HelpWindow = (function (_super) {
                __extends(HelpWindow, _super);
                function HelpWindow(options) {
                    var _this = _super.call(this, options) || this;
                    _this.programList = utils_2.getChildByClassName(_this.modalElement, "programs");
                    _this.glyphList = utils_2.getChildByClassName(_this.modalElement, "glyphs");
                    _this.initLists();
                    return _this;
                }
                HelpWindow.prototype.initLists = function () {
                    var _this = this;
                    programs_1.programs.forEach(function (program) {
                        var programElement = _this.createProgramElement(program);
                        _this.programList.appendChild(programElement);
                    });
                    glyphs_1.glyphs.forEach(function (glyph) {
                        var glyphElement = _this.createGlyphElement(glyph);
                        _this.glyphList.appendChild(glyphElement);
                    });
                };
                HelpWindow.prototype.createProgramElement = function (program) {
                    var programElement = document.createElement("li");
                    var aElement = document.createElement("a");
                    aElement.href = "#" + program.code;
                    aElement.textContent = program.name;
                    programElement.appendChild(aElement);
                    return programElement;
                };
                HelpWindow.prototype.createGlyphElement = function (glyph) {
                    var glyphElement = document.createElement("div");
                    glyphElement.classList.add(ClassName_3.ClassName.Group);
                    var termElement = document.createElement("dt");
                    var iconElement = utils_2.createIconElement(glyph.icon);
                    var definitionElement = document.createElement("dd");
                    var aliasElement = document.createElement("span");
                    aliasElement.classList.add(ClassName_3.ClassName.Alias);
                    aliasElement.textContent = glyph.alias;
                    var descriptionElement = document.createElement("div");
                    descriptionElement.classList.add(ClassName_3.ClassName.Description);
                    descriptionElement.textContent = glyph.doc;
                    termElement.appendChild(iconElement);
                    definitionElement.appendChild(aliasElement);
                    definitionElement.appendChild(descriptionElement);
                    glyphElement.appendChild(termElement);
                    glyphElement.appendChild(definitionElement);
                    return glyphElement;
                };
                return HelpWindow;
            }(ModalWindow_1.ModalWindow));
            exports_13("HelpWindow", HelpWindow);
        }
    };
});
System.register("app", ["utils", "ClassName", "IconClassName", "glyphs", "GlyphEditor", "StepSpeed", "ModalWindow", "HelpWindow"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var utils_3, ClassName_4, IconClassName_3, glyphs_2, GlyphEditor_1, StepSpeed_2, ModalWindow_2, HelpWindow_1, App;
    return {
        setters: [
            function (utils_3_1) {
                utils_3 = utils_3_1;
            },
            function (ClassName_4_1) {
                ClassName_4 = ClassName_4_1;
            },
            function (IconClassName_3_1) {
                IconClassName_3 = IconClassName_3_1;
            },
            function (glyphs_2_1) {
                glyphs_2 = glyphs_2_1;
            },
            function (GlyphEditor_1_1) {
                GlyphEditor_1 = GlyphEditor_1_1;
            },
            function (StepSpeed_2_1) {
                StepSpeed_2 = StepSpeed_2_1;
            },
            function (ModalWindow_2_1) {
                ModalWindow_2 = ModalWindow_2_1;
            },
            function (HelpWindow_1_1) {
                HelpWindow_1 = HelpWindow_1_1;
            }
        ],
        execute: function () {
            App = (function () {
                function App() {
                    this.gridElement = utils_3.getElementById("editor-grid");
                    this.outputElement = utils_3.getElementById("output");
                    this.fastButton = utils_3.getElementById("fast-button");
                    this.startButton = utils_3.getElementById("start-button");
                    this.stepButton = utils_3.getElementById("step-button");
                    this.stopButton = utils_3.getElementById("stop-button");
                    this.clearButton = utils_3.getElementById("clear-button");
                    this.helpButton = utils_3.getElementById("help-button");
                    this.darkThemeCheckbox = utils_3.getElementById("dark-theme-checkbox");
                    this.initChildren();
                    this.initListeners();
                    this.updateOutputSize();
                    this.setButtonState(false);
                    this.setDarkTheme(false);
                }
                App.prototype.initChildren = function () {
                    var gridOptions = { glyphs: glyphs_2.glyphs, gridElement: this.gridElement, outputElement: this.outputElement };
                    this.editor = new GlyphEditor_1.GlyphEditor(gridOptions);
                    var modalContainer = utils_3.getElementById("modal-container");
                    ModalWindow_2.ModalWindow.setModalContainer(modalContainer);
                    var helpModal = utils_3.getElementById("help-modal");
                    this.helpWindow = new HelpWindow_1.HelpWindow({ modalElement: helpModal });
                };
                App.prototype.initListeners = function () {
                    var _this = this;
                    var updateListener = function () { return _this.updateButtonState(); };
                    this.editor.addListener("start", updateListener);
                    this.editor.addListener("pause", updateListener);
                    this.editor.addListener("reset", updateListener);
                    this.editor.addListener("changeSpeed", updateListener);
                    this.clearButton.addEventListener("click", function (_) {
                        var message = "Clear grid?";
                        if (confirm(message)) {
                            _this.editor.clear();
                            _this.editor.saveToWindow();
                        }
                    });
                    this.stopButton.addEventListener("click", function (_) {
                        _this.editor.reset();
                    });
                    this.stepButton.addEventListener("click", function (_) {
                        if (_this.editor.running) {
                            _this.editor.pause();
                        }
                        else {
                            _this.editor.step();
                        }
                    });
                    this.startButton.addEventListener("click", function (_) {
                        _this.editor.setStepSpeed(StepSpeed_2.StepSpeed.Slow);
                        _this.editor.start();
                    });
                    this.fastButton.addEventListener("click", function (_) {
                        _this.editor.setStepSpeed(StepSpeed_2.StepSpeed.Fast);
                        _this.editor.start();
                    });
                    this.helpButton.addEventListener("click", function (_) {
                        _this.helpWindow.show();
                    });
                    this.darkThemeCheckbox.addEventListener("change", function (_) {
                        _this.setDarkTheme(_this.darkThemeEnabled);
                    });
                };
                App.prototype.updateOutputSize = function () {
                    var gridWidth = this.gridElement.offsetWidth;
                    this.outputElement.style.setProperty("width", gridWidth + "px");
                };
                App.prototype.setButtonState = function (running) {
                    var iconElement = this.stepButton.getElementsByClassName(IconClassName_3.IconClassName.Base)[0];
                    var iconClassName = running ? IconClassName_3.IconClassName.Pause : IconClassName_3.IconClassName.Step;
                    iconElement.className = IconClassName_3.IconClassName.Base;
                    iconElement.classList.add(iconClassName);
                    var runningSlow = running && this.editor.stepSpeed === StepSpeed_2.StepSpeed.Slow;
                    var runningFast = running && this.editor.stepSpeed === StepSpeed_2.StepSpeed.Fast;
                    this.startButton.classList.toggle("active", runningSlow);
                    this.fastButton.classList.toggle("active", runningFast);
                };
                App.prototype.updateButtonState = function () {
                    this.setButtonState(this.editor.running);
                };
                Object.defineProperty(App.prototype, "darkThemeEnabled", {
                    get: function () {
                        return this.darkThemeCheckbox.checked;
                    },
                    enumerable: true,
                    configurable: true
                });
                App.prototype.setDarkTheme = function (enabled) {
                    document.body.classList.toggle(ClassName_4.ClassName.DarkTheme, enabled);
                };
                return App;
            }());
            exports_14("App", App);
        }
    };
});
System.register("index", ["app"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var app_1;
    return {
        setters: [
            function (app_1_1) {
                app_1 = app_1_1;
            }
        ],
        execute: function () {
            document.addEventListener("DOMContentLoaded", function (_) {
                var app = new app_1.App();
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvSWNvbkNsYXNzTmFtZS50cyIsInNyYy91dGlscy50cyIsInNyYy9DbGFzc05hbWUudHMiLCJzcmMvRGlyZWN0aW9uLnRzIiwic3JjL1N0ZXBTcGVlZC50cyIsInNyYy9Qb2ludC50cyIsInNyYy9Qcm9ncmFtU3RhdGUudHMiLCJzcmMvR2x5cGhFZGl0b3IudHMiLCJzcmMvZ2x5cGhzLnRzIiwic3JjL0tleUNvZGUudHMiLCJzcmMvTW9kYWxXaW5kb3cudHMiLCJzcmMvcHJvZ3JhbXMudHMiLCJzcmMvSGVscFdpbmRvdy50cyIsInNyYy9hcHAudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBQSxXQUFpQixhQUFhO2dCQUNiLGtCQUFJLEdBQVcsSUFBSSxDQUFDO2dCQUNwQixvQkFBTSxHQUFXLEtBQUssQ0FBQztnQkFDdkIsa0JBQUksR0FBVyxpQkFBaUIsQ0FBQztnQkFDakMsbUJBQUssR0FBVyxVQUFVLENBQUM7WUFDNUMsQ0FBQyxFQUxnQixhQUFhLEtBQWIsYUFBYSxRQUs3Qjs7Ozs7Ozs7SUNIRCx3QkFBK0IsRUFBVTtRQUNyQyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQW9CLEVBQUUscUJBQWtCLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDOztJQUVELDZCQUFvQyxPQUFvQixFQUFFLFNBQWlCO1FBQ3ZFLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQWdCLENBQUM7UUFDMUUsRUFBRSxDQUFDLENBQUMsS0FB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