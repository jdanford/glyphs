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
System.register("Point", ["Direction"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
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
    exports_5("moveInDirection", moveInDirection);
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
/// <reference path="EventEmitter.d.ts" />
System.register("GlyphGrid", ["IconClassName"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
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
    var IconClassName_2, GlyphGrid;
    return {
        setters: [
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
                        var cellElement = getCellElement(event);
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
System.register("ProgramState", ["Direction", "Point"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
            exports_8("ProgramState", ProgramState);
        }
    };
});
System.register("GlyphEditor", ["ClassName", "GlyphGrid", "StepSpeed", "ProgramState"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var ClassName_1, GlyphGrid_1, StepSpeed_1, ProgramState_1, ENCODING_CHARS, CHUNK_SEPARATOR, GROUP_SEPARATOR, GlyphEditor;
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
            function (ProgramState_1_1) {
                ProgramState_1 = ProgramState_1_1;
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
                    _this.outputElement = options.outputElement;
                    _this.initState();
                    _this.initTables(options.glyphs);
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
                GlyphEditor.prototype.onCellClick = function (cellElement, event) {
                    if (this.editingCell === cellElement) {
                        this.endEditCell();
                    }
                    else {
                        this.editCell(cellElement);
                    }
                };
                GlyphEditor.prototype.editCell = function (cellElement) {
                    this.editingCell = cellElement;
                    this.emit("editCell", this.editingCell);
                };
                GlyphEditor.prototype.endEditCell = function () {
                    this.editingCell = undefined;
                    this.emit("endEditCell");
                };
                GlyphEditor.prototype.initTables = function (glyphs) {
                    var _this = this;
                    this.charTable = {};
                    this.aliasTable = {};
                    glyphs.forEach(function (glyph, i) {
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
                    this.emit("step");
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
                    this.clearOutput();
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
                    return this.gridCells[i];
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
                    var gridOptions = {
                        width: length,
                        height: length,
                        gridElement: options.gridElement,
                        glyphs: options.glyphs
                    };
                    _this = _super.call(this, gridOptions) || this;
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
System.register("ModalWindow", ["utils", "ClassName", "KeyCode"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var utils_1, ClassName_2, KeyCode_2, ModalWindow;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (ClassName_2_1) {
                ClassName_2 = ClassName_2_1;
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
                        return document.body.classList.contains(ClassName_2.ClassName.ModalOpen);
                    },
                    set: function (visible) {
                        if (this === ModalWindow.activeInstance && this.visible === visible) {
                            return;
                        }
                        document.body.classList.toggle(ClassName_2.ClassName.ModalOpen, visible);
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
            exports_13("ModalWindow", ModalWindow);
        }
    };
});
System.register("programs", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var programs;
    return {
        setters: [],
        execute: function () {
            exports_14("programs", programs = [{
                    name: "Fibonacci",
                    code: "0:qmrbupc-27:atnd",
                }, {
                    name: "Countdown",
                    code: "0:vbuc-24:wesd",
                }]);
        }
    };
});
System.register("HelpWindow", ["ClassName", "ModalWindow", "utils", "glyphs", "programs"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
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
            exports_15("HelpWindow", HelpWindow);
        }
    };
});
System.register("app", ["utils", "ClassName", "IconClassName", "glyphs", "StepSpeed", "GlyphEditor", "GlyphSelector", "ModalWindow", "HelpWindow"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
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
    var utils_3, ClassName_4, IconClassName_3, glyphs_2, StepSpeed_2, GlyphEditor_1, GlyphSelector_1, ModalWindow_2, HelpWindow_1, GRID_WIDTH, GRID_HEIGHT, App;
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
            function (StepSpeed_2_1) {
                StepSpeed_2 = StepSpeed_2_1;
            },
            function (GlyphEditor_1_1) {
                GlyphEditor_1 = GlyphEditor_1_1;
            },
            function (GlyphSelector_1_1) {
                GlyphSelector_1 = GlyphSelector_1_1;
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
            App = (function () {
                function App() {
                    this.editorGridElement = utils_3.getElementById("editor-grid");
                    this.outputElement = utils_3.getElementById("output");
                    this.fastButton = utils_3.getElementById("fast-button");
                    this.startButton = utils_3.getElementById("start-button");
                    this.stepButton = utils_3.getElementById("step-button");
                    this.stopButton = utils_3.getElementById("stop-button");
                    this.clearButton = utils_3.getElementById("clear-button");
                    this.helpButton = utils_3.getElementById("help-button");
                    this.darkThemeCheckbox = utils_3.getElementById("dark-theme-checkbox");
                    this.stateChangeListener = this.onStateChange.bind(this);
                    this.initChildren();
                    this.initListeners();
                    this.updateOutputSize();
                    this.setButtonState(false);
                    this.setDarkTheme(false);
                }
                App.prototype.initChildren = function () {
                    var editorOptions = { glyphs: glyphs_2.glyphs, width: GRID_WIDTH, height: GRID_HEIGHT, gridElement: this.editorGridElement, outputElement: this.outputElement };
                    this.editor = new GlyphEditor_1.GlyphEditor(editorOptions);
                    var selectorElement = utils_3.getElementById("selector-container");
                    var selectorGridElement = utils_3.getElementById("selector-grid");
                    var selectorOptions = { glyphs: glyphs_2.glyphs, containerElement: selectorElement, gridElement: selectorGridElement };
                    this.selector = new GlyphSelector_1.GlyphSelector(selectorOptions);
                    var modalContainer = utils_3.getElementById("modal-container");
                    ModalWindow_2.ModalWindow.setModalContainer(modalContainer);
                    var helpModal = utils_3.getElementById("help-modal");
                    this.helpWindow = new HelpWindow_1.HelpWindow({ modalElement: helpModal });
                };
                App.prototype.initListeners = function () {
                    var _this = this;
                    this.editor.addListener("start", this.stateChangeListener);
                    this.editor.addListener("pause", this.stateChangeListener);
                    this.editor.addListener("reset", this.stateChangeListener);
                    this.editor.addListener("changeSpeed", this.stateChangeListener);
                    this.editor.addListener("endEditCell", function () {
                        _this.selector.hide();
                    });
                    this.selector.addListener("close", function () {
                        _this.editor.endEditCell();
                    });
                    this.editor.addListener("editCell", function (cellElement) {
                        var position = computeAbsolutePosition(cellElement);
                        _this.selector.show(position);
                        _this.selector.once("selectGlyph", function (alias) {
                            _this.editor.endEditCell();
                            _this.editor.setGlyph(cellElement, alias);
                            _this.editor.saveToWindow();
                        });
                    });
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
                App.prototype.onStateChange = function () {
                    this.editor.endEditCell();
                    this.updateButtonState();
                };
                App.prototype.updateOutputSize = function () {
                    var width = this.editorGridElement.offsetWidth;
                    this.outputElement.style.setProperty("width", width + "px");
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
            exports_16("App", App);
            ;
        }
    };
});
System.register("index", ["app"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvSWNvbkNsYXNzTmFtZS50cyIsInNyYy91dGlscy50cyIsInNyYy9DbGFzc05hbWUudHMiLCJzcmMvRGlyZWN0aW9uLnRzIiwic3JjL1BvaW50LnRzIiwic3JjL0dseXBoR3JpZC50cyIsInNyYy9TdGVwU3BlZWQudHMiLCJzcmMvUHJvZ3JhbVN0YXRlLnRzIiwic3JjL0dseXBoRWRpdG9yLnRzIiwic3JjL2dseXBocy50cyIsInNyYy9LZXlDb2RlLnRzIiwic3JjL0dseXBoU2VsZWN0b3IudHMiLCJzcmMvTW9kYWxXaW5kb3cudHMiLCJzcmMvcHJvZ3JhbXMudHMiLCJzcmMvSGVscFdpbmRvdy50cyIsInNyYy9hcHAudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBQSxXQUFpQixhQUFhO2dCQUNiLGtCQUFJLEdBQVcsSUFBSSxDQUFDO2dCQUNwQixvQkFBTSxHQUFXLEtBQUssQ0FBQztnQkFDdkIsa0JBQUksR0FBVyxpQkFBaUIsQ0FBQztnQkFDakMsbUJBQUssR0FBVyxVQUFVLENBQUM7WUFDNUMsQ0FBQyxFQUxnQixhQUFhLEtBQWIsYUFBYSxRQUs3Qjs7Ozs7Ozs7SUNIRCx3QkFBK0IsRUFBVTtRQUNyQyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQW9CLEVBQUUscUJBQWtCLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDOztJQUVELDZCQUFvQyxPQUFvQixFQUFFLFNBQWlCO1FBQ3ZFLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FB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