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
        var x = (point.x + width) % width;
        var y = (point.y + height) % height;
        return { x: x, y: y };
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
        var x = 0;
        var y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        return { x: x, y: y };
    }
    exports_4("computeAbsolutePosition", computeAbsolutePosition);
    function createIconElement(iconName) {
        var element = document.createElement("i");
        var iconClassName = IconClassName_1.IconClassName.Prefix + iconName;
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
        var child = element.getElementsByClassName(className)[0];
        if (child === null) {
            throw new Error("Child with class='" + className + "' does not exist");
        }
        return child;
    }
    exports_4("getChildByClassName", getChildByClassName);
    function getElementById(id) {
        var element = document.getElementById(id);
        if (element === null) {
            throw new Error("Element with id='" + id + "' does not exist");
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
            GlyphGrid = (function (_super) {
                __extends(GlyphGrid, _super);
                function GlyphGrid(options) {
                    var _this = _super.call(this) || this;
                    _this.width = options.width;
                    _this.height = options.height;
                    _this.gridElement = options.gridElement;
                    _this.gridCells = new Array(_this.width * _this.height);
                    _this.glyphs = options.glyphs;
                    _this.initDictionary();
                    _this.fill();
                    _this.gridElement.addEventListener("click", function (event) {
                        var cellElement = utils_1.getCellElement(event);
                        if (cellElement) {
                            _this.onCellClick(cellElement, event);
                        }
                    });
                    return _this;
                }
                GlyphGrid.prototype.initDictionary = function () {
                    var _this = this;
                    this.dictionary = {};
                    this.glyphs.forEach(function (glyph, i) {
                        var alias = glyph.alias;
                        _this.dictionary[alias] = glyph;
                    });
                };
                GlyphGrid.prototype.fill = function () {
                    for (var y = 0; y < this.height; y++) {
                        var rowElement = document.createElement("tr");
                        this.gridElement.appendChild(rowElement);
                        for (var x = 0; x < this.width; x++) {
                            var cellElement = document.createElement("td");
                            var iconElement = document.createElement("i");
                            cellElement.appendChild(iconElement);
                            rowElement.appendChild(cellElement);
                            var i = this.index(x, y);
                            this.gridCells[i] = cellElement;
                            var alias = this.getInitialGlyphAlias(i);
                            this.setGlyph(cellElement, alias);
                        }
                    }
                };
                GlyphGrid.prototype.getInitialGlyphAlias = function (i) {
                    return "";
                };
                GlyphGrid.prototype.setGlyph = function (cellElement, alias) {
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
                GlyphGrid.prototype.index = function (x, y) {
                    return y * this.width + x;
                };
                Object.defineProperty(GlyphGrid.prototype, "elementWidth", {
                    get: function () {
                        return this.gridElement.offsetWidth;
                    },
                    enumerable: true,
                    configurable: true
                });
                return GlyphGrid;
            }(EventEmitter));
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
            ProgramCursor = (function () {
                function ProgramCursor(width, height) {
                    this.direction = INITIAL_DIRECTION;
                    this.position = { x: 0, y: 0 };
                    this.width = width;
                    this.height = height;
                }
                ProgramCursor.prototype.rotateDirection = function (offset) {
                    this.direction = Direction_2.rotate(this.direction, offset);
                };
                ProgramCursor.prototype.move = function (direction) {
                    Point_1.moveInDirection(this.position, direction);
                };
                ProgramCursor.prototype.moveForward = function () {
                    this.move(this.direction);
                    this.wrapPosition();
                };
                ProgramCursor.prototype.moveBackward = function () {
                    var backwardDirection = Direction_2.rotate(this.direction, 2);
                    this.move(backwardDirection);
                    this.wrapPosition();
                };
                ProgramCursor.prototype.wrapPosition = function () {
                    Point_1.wrapBounds(this.position, this.width, this.height);
                };
                return ProgramCursor;
            }());
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
            GlyphEditor = (function (_super) {
                __extends(GlyphEditor, _super);
                function GlyphEditor(options) {
                    var _this = _super.call(this, options) || this;
                    _this.gridElement = options.gridElement;
                    _this.initState();
                    _this.initTables();
                    _this.loadFromHash(options.initialHash);
                    return _this;
                }
                GlyphEditor.prototype.initState = function () {
                    this.cursor = new ProgramCursor_1.ProgramCursor(this.width, this.height);
                    this.stack = [];
                    this.running = false;
                    this.stepSpeed = StepSpeed_1.StepSpeed.Slow;
                    this.lastStepTime = 0;
                };
                GlyphEditor.prototype.onCellClick = function (cellElement, event) {
                    if (this.editingCell === cellElement) {
                        this.endEditCell();
                    }
                    this.editCell(cellElement);
                };
                GlyphEditor.prototype.editCell = function (cellElement) {
                    this.editingCell = cellElement;
                    this.emit("editCell", this.editingCell);
                };
                GlyphEditor.prototype.endEditCell = function () {
                    this.editingCell = undefined;
                    this.emit("endEditCell");
                };
                GlyphEditor.prototype.initTables = function () {
                    var _this = this;
                    this.charTable = {};
                    this.aliasTable = {};
                    this.glyphs.forEach(function (glyph, i) {
                        var alias = glyph.alias;
                        var char = ENCODING_CHARS[i];
                        _this.charTable[alias] = char;
                        _this.aliasTable[char] = alias;
                    });
                };
                GlyphEditor.prototype.clearGrid = function () {
                    for (var i = 0; i < this.width * this.height; i++) {
                        var cellElement = this.gridCells[i];
                        this.setGlyph(cellElement, "");
                    }
                };
                GlyphEditor.prototype.step = function () {
                    this.clearActiveCell();
                    this.activeCell = this.getCurrentCell();
                    this.activeCell.classList.add(ClassName_1.ClassName.Active);
                    var alias = this.activeCell.title;
                    this.executeAlias(alias);
                    this.cursor.moveForward();
                    this.emit("step");
                };
                GlyphEditor.prototype.executeAlias = function (alias) {
                    if (alias) {
                        var glyph = this.dictionary[alias];
                        glyph.effect(this);
                    }
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
                    this.clearConsole();
                    this.emit("reset");
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
                    this.clearConsole();
                };
                GlyphEditor.prototype.setRunning = function (running) {
                    if (this.running === running) {
                        return false;
                    }
                    this.running = running;
                    var eventType = running ? "start" : "pause";
                    this.emit(eventType);
                    return true;
                };
                GlyphEditor.prototype.setStepSpeed = function (stepSpeed) {
                    if (this.stepSpeed === stepSpeed) {
                        return false;
                    }
                    this.stepSpeed = stepSpeed;
                    this.emit("changeSpeed");
                    return true;
                };
                GlyphEditor.prototype.getHash = function () {
                    var chunks = [];
                    var currentChunk = null;
                    for (var i = 0; i < this.width * this.height; i++) {
                        var cellElement = this.gridCells[i];
                        var alias = cellElement.title;
                        if (!alias) {
                            if (currentChunk) {
                                chunks.push(currentChunk);
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
                        chunks.push(currentChunk);
                    }
                    return chunks.map(function (_a) {
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
                        var cellElement = this.gridCells[index + i];
                        this.setGlyph(cellElement, alias);
                    }
                };
                GlyphEditor.prototype.saveHash = function () {
                    var hash = this.getHash();
                    this.emit("updateHash", hash);
                };
                GlyphEditor.prototype.print = function (text) {
                    this.emit("print", text);
                };
                GlyphEditor.prototype.println = function (text) {
                    this.print(text + "\n");
                };
                GlyphEditor.prototype.clearConsole = function () {
                    this.emit("clearConsole");
                };
                GlyphEditor.prototype.getCurrentCell = function () {
                    var i = this.index(this.cursor.position.x, this.cursor.position.y);
                    return this.gridCells[i];
                };
                GlyphEditor.prototype.getStackItem = function (n) {
                    var i = this.stack.length - n - 1;
                    return this.stack[i];
                };
                return GlyphEditor;
            }(GlyphGrid_1.GlyphGrid));
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
                    effect: function (editor) {
                        editor.cursor.direction = Direction_3.Direction.Up;
                    }
                }, {
                    alias: "right",
                    icon: "arrow-right",
                    doc: "Points the cursor right.",
                    effect: function (editor) {
                        editor.cursor.direction = Direction_3.Direction.Right;
                    }
                }, {
                    alias: "down",
                    icon: "arrow-down",
                    doc: "Points the cursor down.",
                    effect: function (editor) {
                        editor.cursor.direction = Direction_3.Direction.Down;
                    }
                }, {
                    alias: "left",
                    icon: "arrow-left",
                    doc: "Points the cursor left.",
                    effect: function (editor) {
                        editor.cursor.direction = Direction_3.Direction.Left;
                    }
                }, {
                    alias: "up-circle",
                    icon: "arrow-circle-up",
                    doc: "Points the cursor up if the first item on the stack is nonzero.",
                    effect: function (editor) {
                        if (editor.getStackItem(0)) {
                            editor.cursor.direction = Direction_3.Direction.Up;
                        }
                    }
                }, {
                    alias: "right-circle",
                    icon: "arrow-circle-right",
                    doc: "Points the cursor right if the first item on the stack is nonzero.",
                    effect: function (editor) {
                        if (editor.getStackItem(0)) {
                            editor.cursor.direction = Direction_3.Direction.Right;
                        }
                    }
                }, {
                    alias: "down-circle",
                    icon: "arrow-circle-down",
                    doc: "Points the cursor down if the first item on the stack is nonzero.",
                    effect: function (editor) {
                        if (editor.getStackItem(0)) {
                            editor.cursor.direction = Direction_3.Direction.Down;
                        }
                    }
                }, {
                    alias: "left-circle",
                    icon: "arrow-circle-left",
                    doc: "Points the cursor left if the first item on the stack is nonzero.",
                    effect: function (editor) {
                        if (editor.getStackItem(0)) {
                            editor.cursor.direction = Direction_3.Direction.Left;
                        }
                    }
                }, {
                    alias: "arrows",
                    icon: "arrows",
                    doc: "Points the cursor in a random direction.",
                    effect: function (editor) {
                        editor.cursor.direction = Math.floor(Math.random() * 4);
                    }
                }, {
                    alias: "rotate-right",
                    icon: "rotate-right",
                    doc: "Rotates the cursor clockwise.",
                    effect: function (editor) {
                        editor.cursor.rotateDirection(1);
                    }
                }, {
                    alias: "rotate-left",
                    icon: "rotate-left",
                    doc: "Rotates the cursor counter-clockwise.",
                    effect: function (editor) {
                        editor.cursor.rotateDirection(-1);
                    }
                }, {
                    alias: "exchange",
                    icon: "exchange",
                    doc: "Reverses the direction of the cursor.",
                    effect: function (editor) {
                        editor.cursor.rotateDirection(2);
                    }
                }, {
                    alias: "car",
                    icon: "car",
                    doc: "Copies the first item on the stack onto the top.",
                    effect: function (editor) {
                        editor.stack.push(editor.getStackItem(0));
                    }
                }, {
                    alias: "plane",
                    icon: "plane",
                    doc: "Copies the second item on the stack onto the top.",
                    effect: function (editor) {
                        editor.stack.push(editor.getStackItem(1));
                    }
                }, {
                    alias: "bomb",
                    icon: "bomb",
                    doc: "Pops the first item from the stack.",
                    effect: function (editor) {
                        editor.stack.pop();
                    }
                }, {
                    alias: "snowflake",
                    icon: "snowflake-o",
                    doc: "Swaps the first two items on the stack.",
                    effect: function (editor) {
                        var i = editor.stack.length - 2, j = editor.stack.length - 1;
                        var tmp = editor.stack[i];
                        editor.stack[i] = editor.stack[j];
                        editor.stack[j] = tmp;
                    }
                }, {
                    alias: "leaf",
                    icon: "leaf",
                    doc: "Pushes the constant 0 onto the stack.",
                    effect: function (editor) {
                        editor.stack.push(0);
                    }
                }, {
                    alias: "sun",
                    icon: "sun-o",
                    doc: "Increments the first item on the stack.",
                    effect: function (editor) {
                        editor.stack[editor.stack.length - 1]++;
                    }
                }, {
                    alias: "moon",
                    icon: "moon-o",
                    doc: "Decrements the first item on the stack.",
                    effect: function (editor) {
                        editor.stack[editor.stack.length - 1]--;
                    }
                }, {
                    alias: "smile",
                    icon: "smile-o",
                    doc: "Removes the first item from the stack and adds it to the second item.",
                    effect: function (editor) {
                        var value = editor.stack.pop();
                        if (value === undefined) {
                            throw new Error("Stack is empty");
                        }
                        editor.stack[editor.stack.length - 1] += value;
                    }
                }, {
                    alias: "comment",
                    icon: "comment",
                    doc: "Prints the first item on the stack.",
                    effect: function (editor) {
                        var value = editor.getStackItem(0);
                        editor.println(value.toString());
                    }
                }, {
                    alias: "eye",
                    icon: "eye",
                    doc: "Reads a number from the user and pushes it onto the stack.",
                    effect: function (editor) {
                        var input = prompt("Enter a number:", "");
                        var value = input ? parseInt(input) : 0;
                        editor.stack.push(value);
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
            GlyphSelector = (function (_super) {
                __extends(GlyphSelector, _super);
                function GlyphSelector(options) {
                    var _this = this;
                    var glyphCount = options.glyphs.length;
                    var length = Math.ceil(Math.sqrt(glyphCount));
                    _this = _super.call(this, {
                        width: length,
                        height: length,
                        gridElement: options.gridElement,
                        glyphs: options.glyphs
                    }) || this;
                    _this.containerElement = options.containerElement;
                    _this.keyPressedListener = _this.onKeyPressed.bind(_this);
                    return _this;
                }
                GlyphSelector.prototype.getInitialGlyphAlias = function (i) {
                    var glyph = this.glyphs[i - 1] || { alias: "" };
                    return glyph.alias;
                };
                GlyphSelector.prototype.onCellClick = function (cellElement, event) {
                    var alias = cellElement.title;
                    this.emit("selectGlyph", alias);
                };
                GlyphSelector.prototype.onKeyPressed = function (event) {
                    if (event.keyCode === KeyCode_1.KeyCode.Escape) {
                        this.emit("close");
                    }
                };
                GlyphSelector.prototype.show = function (position) {
                    var x = position.x, y = position.y;
                    this.containerElement.style.setProperty("left", x + "px");
                    this.containerElement.style.setProperty("top", y + "px");
                    this.containerElement.removeAttribute("hidden");
                    document.addEventListener("keyup", this.keyPressedListener);
                };
                GlyphSelector.prototype.hide = function () {
                    this.containerElement.setAttribute("hidden", "");
                    document.removeEventListener("keyup", this.keyPressedListener);
                };
                return GlyphSelector;
            }(GlyphGrid_2.GlyphGrid));
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
            Console = (function () {
                function Console(options) {
                    this.containerElement = options.containerElement;
                    this.outputElement = utils_2.getChildByClassName(this.containerElement, ClassName_2.ClassName.Output);
                }
                Console.prototype.print = function (text) {
                    this.outputElement.textContent += text;
                };
                Console.prototype.clear = function () {
                    this.outputElement.textContent = "";
                };
                Object.defineProperty(Console.prototype, "elementWidth", {
                    get: function () {
                        var property = this.containerElement.style["width"] || "0px";
                        return +property.slice(0, -2);
                    },
                    set: function (width) {
                        this.containerElement.style.setProperty("width", width + "px");
                    },
                    enumerable: true,
                    configurable: true
                });
                return Console;
            }());
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
            ModalWindow = (function () {
                function ModalWindow(options) {
                    this.keyPressedListener = this.onKeyPressed.bind(this);
                    this.modalElement = options.modalElement;
                    this.closeButton = utils_3.getChildByClassName(this.modalElement, "close-button");
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
                ModalWindow.prototype.onKeyPressed = function (event) {
                    if (!this.visible) {
                        return;
                    }
                    if (event.keyCode === KeyCode_2.KeyCode.Escape) {
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
                        return document.body.classList.contains(ClassName_3.ClassName.ModalOpen);
                    },
                    set: function (visible) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                return ModalWindow;
            }());
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
            HelpWindow = (function (_super) {
                __extends(HelpWindow, _super);
                function HelpWindow(options) {
                    var _this = _super.call(this, options) || this;
                    _this.programList = utils_4.getChildByClassName(_this.modalElement, "programs");
                    _this.glyphList = utils_4.getChildByClassName(_this.modalElement, "glyphs");
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
                    glyphElement.classList.add(ClassName_4.ClassName.Group);
                    var termElement = document.createElement("dt");
                    var iconElement = utils_4.createIconElement(glyph.icon);
                    var definitionElement = document.createElement("dd");
                    var aliasElement = document.createElement("span");
                    aliasElement.classList.add(ClassName_4.ClassName.Alias);
                    aliasElement.textContent = glyph.alias;
                    var descriptionElement = document.createElement("div");
                    descriptionElement.classList.add(ClassName_4.ClassName.Description);
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
            exports_16("HelpWindow", HelpWindow);
        }
    };
});
System.register("app", ["utils", "ClassName", "IconClassName", "glyphs", "StepSpeed", "GlyphEditor", "GlyphSelector", "Console", "ModalWindow", "HelpWindow"], function (exports_17, context_17) {
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
            App = (function () {
                function App() {
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
                App.prototype.initChildren = function () {
                    var initialHash = utils_5.getWindowHash();
                    var editorGridElement = utils_5.getElementById("editor-grid");
                    this.editor = new GlyphEditor_1.GlyphEditor({
                        glyphs: glyphs_2.glyphs,
                        initialHash: initialHash,
                        width: GRID_WIDTH,
                        height: GRID_HEIGHT,
                        gridElement: editorGridElement,
                    });
                    var selectorElement = utils_5.getElementById("selector-container");
                    var selectorGridElement = utils_5.getElementById("selector-grid");
                    this.selector = new GlyphSelector_1.GlyphSelector({
                        glyphs: glyphs_2.glyphs,
                        containerElement: selectorElement,
                        gridElement: selectorGridElement,
                    });
                    var consoleElement = utils_5.getElementById("console");
                    this.console = new Console_1.Console({ containerElement: consoleElement });
                    var modalContainer = utils_5.getElementById("modal-container");
                    ModalWindow_2.ModalWindow.setModalContainer(modalContainer);
                    var helpModal = utils_5.getElementById("help-modal");
                    this.helpWindow = new HelpWindow_1.HelpWindow({ modalElement: helpModal });
                };
                App.prototype.initListeners = function () {
                    var _this = this;
                    this.editor.addListener("start", this.stateChangeListener);
                    this.editor.addListener("pause", this.stateChangeListener);
                    this.editor.addListener("reset", this.stateChangeListener);
                    this.editor.addListener("changeSpeed", this.stateChangeListener);
                    this.editor.addListener("updateHash", utils_5.setWindowHash);
                    window.addEventListener("resize", function (_) {
                        _this.updateConsoleSize();
                    });
                    window.onhashchange = function (_) {
                        var hash = utils_5.getWindowHash();
                        _this.editor.loadFromHash(hash);
                    };
                    this.editor.addListener("print", function (text) {
                        _this.console.print(text);
                    });
                    this.editor.addListener("clearConsole", function () {
                        _this.console.clear();
                    });
                    this.editor.addListener("editCell", function (cellElement) {
                        var position = utils_5.computeAbsolutePosition(cellElement);
                        _this.selector.show(position);
                        _this.selector.once("selectGlyph", function (alias) {
                            _this.editor.endEditCell();
                            _this.editor.setGlyph(cellElement, alias);
                            _this.editor.saveHash();
                        });
                    });
                    this.editor.addListener("endEditCell", function () {
                        _this.selector.hide();
                    });
                    this.selector.addListener("close", function () {
                        _this.editor.endEditCell();
                    });
                    this.clearButton.addEventListener("click", function (_) {
                        if (confirm(CLEAR_MESSAGE)) {
                            _this.editor.clear();
                            _this.editor.saveHash();
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
                        _this.darkThemeEnabled = _this.darkThemeCheckbox.checked;
                    });
                };
                App.prototype.onStateChange = function () {
                    this.editor.endEditCell();
                    this.updateButtonState();
                };
                App.prototype.updateConsoleSize = function () {
                    this.console.elementWidth = this.editor.elementWidth;
                };
                App.prototype.setButtonState = function (running) {
                    var iconElement = this.stepButton.getElementsByClassName(IconClassName_3.IconClassName.Base)[0];
                    var iconClassName = running ? IconClassName_3.IconClassName.Pause : IconClassName_3.IconClassName.Step;
                    iconElement.className = IconClassName_3.IconClassName.Base;
                    iconElement.classList.add(iconClassName);
                    var runningSlow = running && this.editor.stepSpeed === StepSpeed_2.StepSpeed.Slow;
                    var runningFast = running && this.editor.stepSpeed === StepSpeed_2.StepSpeed.Fast;
                    this.startButton.classList.toggle(ClassName_5.ClassName.Active, runningSlow);
                    this.fastButton.classList.toggle(ClassName_5.ClassName.Active, runningFast);
                };
                App.prototype.updateButtonState = function () {
                    this.setButtonState(this.editor.running);
                };
                Object.defineProperty(App.prototype, "darkThemeEnabled", {
                    get: function () {
                        return document.body.classList.contains(ClassName_5.ClassName.DarkTheme);
                    },
                    set: function (enabled) {
                        document.body.classList.toggle(ClassName_5.ClassName.DarkTheme, enabled);
                    },
                    enumerable: true,
                    configurable: true
                });
                return App;
            }());
            exports_17("App", App);
        }
    };
});
System.register("index", ["app"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvSWNvbkNsYXNzTmFtZS50cyIsInNyYy9EaXJlY3Rpb24udHMiLCJzcmMvUG9pbnQudHMiLCJzcmMvdXRpbHMudHMiLCJzcmMvQ2xhc3NOYW1lLnRzIiwic3JjL0dseXBoR3JpZC50cyIsInNyYy9TdGVwU3BlZWQudHMiLCJzcmMvUHJvZ3JhbUN1cnNvci50cyIsInNyYy9HbHlwaEVkaXRvci50cyIsInNyYy9nbHlwaHMudHMiLCJzcmMvS2V5Q29kZS50cyIsInNyYy9HbHlwaFNlbGVjdG9yLnRzIiwic3JjL0NvbnNvbGUudHMiLCJzcmMvTW9kYWxXaW5kb3cudHMiLCJzcmMvcHJvZ3JhbXMudHMiLCJzcmMvSGVscFdpbmRvdy50cyIsInNyYy9hcHAudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBQSxXQUFpQixhQUFhO2dCQUNiLGtCQUFJLEdBQVcsSUFBSSxDQUFDO2dCQUNwQixvQkFBTSxHQUFXLEtBQUssQ0FBQztnQkFDdkIsa0JBQUksR0FBVyxpQkFBaUIsQ0FBQztnQkFDakMsbUJBQUssR0FBVyxVQUFVLENBQUM7WUFDNUMsQ0FBQyxFQUxnQixhQUFhLEtBQWIsYUFBYSxRQUs3Qjs7Ozs7Ozs7SUNFRCxnQkFBdUIsU0FBb0IsRUFBRSxNQUFjO1FBQ3ZELE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7OztZQVRELFdBQVksU0FBUztnQkFDakIscUNBQU0sQ0FBQTtnQkFDTiwyQ0FBSyxDQUFBO2dCQUNMLHlDQUFJLENBQUE7Z0JBQ0oseUNBQUksQ0FBQTtZQUNSLENBQUMsRUFMVyxTQUFTLEtBQVQsU0FBUyxRQUtwQjs7Ozs7Ozs7SUNFRCx5QkFBZ0MsS0FBWSxFQUFFLFNBQW9CO1FBQzlELE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FB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