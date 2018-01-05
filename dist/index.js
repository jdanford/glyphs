/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const IconClassName_1 = __webpack_require__(2);
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
exports.computeAbsolutePosition = computeAbsolutePosition;
function createIconElement(iconName) {
    const element = document.createElement("i");
    const iconClassName = IconClassName_1.IconClassName.Prefix + iconName;
    element.classList.add(IconClassName_1.IconClassName.Base, iconClassName);
    return element;
}
exports.createIconElement = createIconElement;
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
exports.getCellElement = getCellElement;
function getChildByClassName(element, className) {
    const child = element.getElementsByClassName(className)[0];
    if (child === null) {
        throw new Error(`Child with class='${className}' does not exist`);
    }
    return child;
}
exports.getChildByClassName = getChildByClassName;
function getElementById(id) {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error(`Element with id='${id}' does not exist`);
    }
    return element;
}
exports.getElementById = getElementById;
function getWindowHash() {
    return window.location.hash.slice(1);
}
exports.getWindowHash = getWindowHash;
function setWindowHash(hash) {
    window.location.hash = "#" + hash;
}
exports.setWindowHash = setWindowHash;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClassName;
(function (ClassName) {
    ClassName.Active = "active";
    ClassName.Alias = "alias";
    ClassName.DarkTheme = "dark-theme";
    ClassName.Description = "description";
    ClassName.Group = "group";
    ClassName.Input = "input";
    ClassName.ModalOpen = "modal-open";
    ClassName.Output = "output";
})(ClassName = exports.ClassName || (exports.ClassName = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IconClassName;
(function (IconClassName) {
    IconClassName.Base = "fa";
    IconClassName.Prefix = "fa-";
    IconClassName.Step = "fa-step-forward";
    IconClassName.Pause = "fa-pause";
})(IconClassName = exports.IconClassName || (exports.IconClassName = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction = exports.Direction || (exports.Direction = {}));
function rotate(direction, offset) {
    return (direction + offset + 4) % 4;
}
exports.rotate = rotate;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __webpack_require__(3);
exports.glyphs = [{
        alias: "up",
        icon: "arrow-up",
        doc: "Points the cursor up.",
        effect(editor) {
            editor.cursor.direction = Direction_1.Direction.Up;
        }
    }, {
        alias: "right",
        icon: "arrow-right",
        doc: "Points the cursor right.",
        effect(editor) {
            editor.cursor.direction = Direction_1.Direction.Right;
        }
    }, {
        alias: "down",
        icon: "arrow-down",
        doc: "Points the cursor down.",
        effect(editor) {
            editor.cursor.direction = Direction_1.Direction.Down;
        }
    }, {
        alias: "left",
        icon: "arrow-left",
        doc: "Points the cursor left.",
        effect(editor) {
            editor.cursor.direction = Direction_1.Direction.Left;
        }
    }, {
        alias: "up-circle",
        icon: "arrow-circle-up",
        doc: "Points the cursor up if the first item on the stack is nonzero.",
        effect(editor) {
            if (editor.getStackItem(0)) {
                editor.cursor.direction = Direction_1.Direction.Up;
            }
        }
    }, {
        alias: "right-circle",
        icon: "arrow-circle-right",
        doc: "Points the cursor right if the first item on the stack is nonzero.",
        effect(editor) {
            if (editor.getStackItem(0)) {
                editor.cursor.direction = Direction_1.Direction.Right;
            }
        }
    }, {
        alias: "down-circle",
        icon: "arrow-circle-down",
        doc: "Points the cursor down if the first item on the stack is nonzero.",
        effect(editor) {
            if (editor.getStackItem(0)) {
                editor.cursor.direction = Direction_1.Direction.Down;
            }
        }
    }, {
        alias: "left-circle",
        icon: "arrow-circle-left",
        doc: "Points the cursor left if the first item on the stack is nonzero.",
        effect(editor) {
            if (editor.getStackItem(0)) {
                editor.cursor.direction = Direction_1.Direction.Left;
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
    }];


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StepSpeed;
(function (StepSpeed) {
    StepSpeed[StepSpeed["Slow"] = 150] = "Slow";
    StepSpeed[StepSpeed["Fast"] = 25] = "Fast";
})(StepSpeed = exports.StepSpeed || (exports.StepSpeed = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = __webpack_require__(12);
const utils_1 = __webpack_require__(0);
const IconClassName_1 = __webpack_require__(2);
class GlyphGrid extends EventEmitter {
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
        iconElement.className = IconClassName_1.IconClassName.Base;
        cellElement.title = alias;
        if (alias) {
            const glyph = this.dictionary[alias];
            if (glyph) {
                const className = IconClassName_1.IconClassName.Prefix + glyph.icon;
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
}
exports.GlyphGrid = GlyphGrid;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Key;
(function (Key) {
    Key[Key["Backspace"] = 8] = "Backspace";
    Key[Key["Tab"] = 9] = "Tab";
    Key[Key["Enter"] = 13] = "Enter";
    Key[Key["Shift"] = 16] = "Shift";
    Key[Key["Ctrl"] = 17] = "Ctrl";
    Key[Key["Alt"] = 18] = "Alt";
    Key[Key["PauseBreak"] = 19] = "PauseBreak";
    Key[Key["CapsLock"] = 20] = "CapsLock";
    Key[Key["Escape"] = 27] = "Escape";
    Key[Key["Space"] = 32] = "Space";
    Key[Key["PageUp"] = 33] = "PageUp";
    Key[Key["PageDown"] = 34] = "PageDown";
    Key[Key["End"] = 35] = "End";
    Key[Key["Home"] = 36] = "Home";
    Key[Key["LeftArrow"] = 37] = "LeftArrow";
    Key[Key["UpArrow"] = 38] = "UpArrow";
    Key[Key["RightArrow"] = 39] = "RightArrow";
    Key[Key["DownArrow"] = 40] = "DownArrow";
    Key[Key["Insert"] = 45] = "Insert";
    Key[Key["Delete"] = 46] = "Delete";
    Key[Key["Zero"] = 48] = "Zero";
    Key[Key["ClosedParen"] = 48] = "ClosedParen";
    Key[Key["One"] = 49] = "One";
    Key[Key["ExclamationMark"] = 49] = "ExclamationMark";
    Key[Key["Two"] = 50] = "Two";
    Key[Key["AtSign"] = 50] = "AtSign";
    Key[Key["Three"] = 51] = "Three";
    Key[Key["PoundSign"] = 51] = "PoundSign";
    Key[Key["Hash"] = 51] = "Hash";
    Key[Key["Four"] = 52] = "Four";
    Key[Key["DollarSign"] = 52] = "DollarSign";
    Key[Key["Five"] = 53] = "Five";
    Key[Key["PercentSign"] = 53] = "PercentSign";
    Key[Key["Six"] = 54] = "Six";
    Key[Key["Caret"] = 54] = "Caret";
    Key[Key["Hat"] = 54] = "Hat";
    Key[Key["Seven"] = 55] = "Seven";
    Key[Key["Ampersand"] = 55] = "Ampersand";
    Key[Key["Eight"] = 56] = "Eight";
    Key[Key["Star"] = 56] = "Star";
    Key[Key["Asterik"] = 56] = "Asterik";
    Key[Key["Nine"] = 57] = "Nine";
    Key[Key["OpenParen"] = 57] = "OpenParen";
    Key[Key["A"] = 65] = "A";
    Key[Key["B"] = 66] = "B";
    Key[Key["C"] = 67] = "C";
    Key[Key["D"] = 68] = "D";
    Key[Key["E"] = 69] = "E";
    Key[Key["F"] = 70] = "F";
    Key[Key["G"] = 71] = "G";
    Key[Key["H"] = 72] = "H";
    Key[Key["I"] = 73] = "I";
    Key[Key["J"] = 74] = "J";
    Key[Key["K"] = 75] = "K";
    Key[Key["L"] = 76] = "L";
    Key[Key["M"] = 77] = "M";
    Key[Key["N"] = 78] = "N";
    Key[Key["O"] = 79] = "O";
    Key[Key["P"] = 80] = "P";
    Key[Key["Q"] = 81] = "Q";
    Key[Key["R"] = 82] = "R";
    Key[Key["S"] = 83] = "S";
    Key[Key["T"] = 84] = "T";
    Key[Key["U"] = 85] = "U";
    Key[Key["V"] = 86] = "V";
    Key[Key["W"] = 87] = "W";
    Key[Key["X"] = 88] = "X";
    Key[Key["Y"] = 89] = "Y";
    Key[Key["Z"] = 90] = "Z";
    Key[Key["LeftWindowKey"] = 91] = "LeftWindowKey";
    Key[Key["RightWindowKey"] = 92] = "RightWindowKey";
    Key[Key["SelectKey"] = 93] = "SelectKey";
    Key[Key["Numpad0"] = 96] = "Numpad0";
    Key[Key["Numpad1"] = 97] = "Numpad1";
    Key[Key["Numpad2"] = 98] = "Numpad2";
    Key[Key["Numpad3"] = 99] = "Numpad3";
    Key[Key["Numpad4"] = 100] = "Numpad4";
    Key[Key["Numpad5"] = 101] = "Numpad5";
    Key[Key["Numpad6"] = 102] = "Numpad6";
    Key[Key["Numpad7"] = 103] = "Numpad7";
    Key[Key["Numpad8"] = 104] = "Numpad8";
    Key[Key["Numpad9"] = 105] = "Numpad9";
    Key[Key["Multiply"] = 106] = "Multiply";
    Key[Key["Add"] = 107] = "Add";
    Key[Key["Subtract"] = 109] = "Subtract";
    Key[Key["DecimalPoint"] = 110] = "DecimalPoint";
    Key[Key["Divide"] = 111] = "Divide";
    Key[Key["F1"] = 112] = "F1";
    Key[Key["F2"] = 113] = "F2";
    Key[Key["F3"] = 114] = "F3";
    Key[Key["F4"] = 115] = "F4";
    Key[Key["F5"] = 116] = "F5";
    Key[Key["F6"] = 117] = "F6";
    Key[Key["F7"] = 118] = "F7";
    Key[Key["F8"] = 119] = "F8";
    Key[Key["F9"] = 120] = "F9";
    Key[Key["F10"] = 121] = "F10";
    Key[Key["F11"] = 122] = "F11";
    Key[Key["F12"] = 123] = "F12";
    Key[Key["NumLock"] = 144] = "NumLock";
    Key[Key["ScrollLock"] = 145] = "ScrollLock";
    Key[Key["SemiColon"] = 186] = "SemiColon";
    Key[Key["Equals"] = 187] = "Equals";
    Key[Key["Comma"] = 188] = "Comma";
    Key[Key["Dash"] = 189] = "Dash";
    Key[Key["Period"] = 190] = "Period";
    Key[Key["UnderScore"] = 189] = "UnderScore";
    Key[Key["PlusSign"] = 187] = "PlusSign";
    Key[Key["ForwardSlash"] = 191] = "ForwardSlash";
    Key[Key["Tilde"] = 192] = "Tilde";
    Key[Key["GraveAccent"] = 192] = "GraveAccent";
    Key[Key["OpenBracket"] = 219] = "OpenBracket";
    Key[Key["ClosedBracket"] = 221] = "ClosedBracket";
    Key[Key["Quote"] = 222] = "Quote";
})(Key = exports.Key || (exports.Key = {}));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ts_keycode_enum_1 = __webpack_require__(7);
const utils_1 = __webpack_require__(0);
const ClassName_1 = __webpack_require__(1);
class ModalWindow {
    constructor(options) {
        this.keyPressedListener = this.onKeyPressed.bind(this);
        this.modalElement = options.modalElement;
        this.closeButton = utils_1.getChildByClassName(this.modalElement, "close-button");
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
        if (event.keyCode === ts_keycode_enum_1.Key.Escape) {
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
        return document.body.classList.contains(ClassName_1.ClassName.ModalOpen);
    }
    set visible(visible) {
        if (this === ModalWindow.activeInstance && this.visible === visible) {
            return;
        }
        document.body.classList.toggle(ClassName_1.ClassName.ModalOpen, visible);
        if (visible) {
            document.addEventListener("keyup", this.keyPressedListener);
            ModalWindow.activeInstance = this;
        }
        else {
            document.removeEventListener("keyup", this.keyPressedListener);
        }
    }
}
ModalWindow.containerClickListener = ModalWindow.hideActiveInstance.bind(ModalWindow);
exports.ModalWindow = ModalWindow;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __webpack_require__(10);
document.addEventListener("DOMContentLoaded", _ => {
    const app = new App_1.App();
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(0);
const ClassName_1 = __webpack_require__(1);
const IconClassName_1 = __webpack_require__(2);
const glyphs_1 = __webpack_require__(4);
const StepSpeed_1 = __webpack_require__(5);
const GlyphEditor_1 = __webpack_require__(11);
const GlyphSelector_1 = __webpack_require__(15);
const Console_1 = __webpack_require__(16);
const ModalWindow_1 = __webpack_require__(8);
const HelpWindow_1 = __webpack_require__(17);
const GRID_WIDTH = 24;
const GRID_HEIGHT = 24;
const CLEAR_MESSAGE = "Clear grid?";
class App {
    constructor() {
        this.editorContainer = utils_1.getElementById("editor-container");
        this.clearButton = utils_1.getElementById("clear-button");
        this.stopButton = utils_1.getElementById("stop-button");
        this.stepButton = utils_1.getElementById("step-button");
        this.startButton = utils_1.getElementById("start-button");
        this.fastButton = utils_1.getElementById("fast-button");
        this.helpButton = utils_1.getElementById("help-button");
        this.darkThemeCheckbox = utils_1.getElementById("dark-theme-checkbox");
        this.stateChangeListener = this.onStateChange.bind(this);
        this.initChildren();
        this.initListeners();
        this.updateConsoleSize();
        this.setButtonState(false);
    }
    initChildren() {
        const initialHash = utils_1.getWindowHash();
        const editorGridElement = utils_1.getElementById("editor-grid");
        this.editor = new GlyphEditor_1.GlyphEditor({
            glyphs: glyphs_1.glyphs,
            initialHash,
            width: GRID_WIDTH,
            height: GRID_HEIGHT,
            gridElement: editorGridElement,
        });
        const selectorElement = utils_1.getElementById("selector-container");
        const selectorGridElement = utils_1.getElementById("selector-grid");
        this.selector = new GlyphSelector_1.GlyphSelector({
            glyphs: glyphs_1.glyphs,
            containerElement: selectorElement,
            gridElement: selectorGridElement,
        });
        const consoleElement = utils_1.getElementById("console");
        this.console = new Console_1.Console({ containerElement: consoleElement });
        const modalContainer = utils_1.getElementById("modal-container");
        ModalWindow_1.ModalWindow.setModalContainer(modalContainer);
        const helpModal = utils_1.getElementById("help-modal");
        this.helpWindow = new HelpWindow_1.HelpWindow({ modalElement: helpModal });
    }
    initListeners() {
        this.editor.addListener("start", this.stateChangeListener);
        this.editor.addListener("pause", this.stateChangeListener);
        this.editor.addListener("reset", this.stateChangeListener);
        this.editor.addListener("changeSpeed", this.stateChangeListener);
        this.editor.addListener("updateHash", utils_1.setWindowHash);
        window.addEventListener("resize", _ => {
            this.updateConsoleSize();
        });
        window.onhashchange = _ => {
            const hash = utils_1.getWindowHash();
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
            const position = utils_1.computeAbsolutePosition(cellElement);
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
        Array.from(this.editorContainer.childNodes).forEach(element => {
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
            this.editor.setStepSpeed(StepSpeed_1.StepSpeed.Slow);
            this.editor.start();
        });
        this.fastButton.addEventListener("click", _ => {
            this.editor.setStepSpeed(StepSpeed_1.StepSpeed.Fast);
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
        const iconElement = this.stepButton.getElementsByClassName(IconClassName_1.IconClassName.Base)[0];
        const iconClassName = running ? IconClassName_1.IconClassName.Pause : IconClassName_1.IconClassName.Step;
        iconElement.className = IconClassName_1.IconClassName.Base;
        iconElement.classList.add(iconClassName);
        const runningSlow = running && this.editor.stepSpeed === StepSpeed_1.StepSpeed.Slow;
        const runningFast = running && this.editor.stepSpeed === StepSpeed_1.StepSpeed.Fast;
        this.startButton.classList.toggle(ClassName_1.ClassName.Active, runningSlow);
        this.fastButton.classList.toggle(ClassName_1.ClassName.Active, runningFast);
    }
    updateButtonState() {
        this.setButtonState(this.editor.running);
    }
    get darkThemeEnabled() {
        return document.body.classList.contains(ClassName_1.ClassName.DarkTheme);
    }
    set darkThemeEnabled(enabled) {
        document.body.classList.toggle(ClassName_1.ClassName.DarkTheme, enabled);
    }
}
exports.App = App;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ClassName_1 = __webpack_require__(1);
const GlyphGrid_1 = __webpack_require__(6);
const StepSpeed_1 = __webpack_require__(5);
const ProgramCursor_1 = __webpack_require__(13);
const ENCODING_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHUNK_SEPARATOR = ":";
const GROUP_SEPARATOR = "-";
class GlyphEditor extends GlyphGrid_1.GlyphGrid {
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
        if (this.activeCell) {
            this.cursor.moveForward();
        }
        this.clearActiveCell();
        this.activeCell = this.getCurrentCell();
        this.activeCell.classList.add(ClassName_1.ClassName.Active);
        const alias = this.activeCell.title;
        this.emit("step");
        this.executeAlias(alias);
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
}
exports.GlyphEditor = GlyphEditor;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter v5.2.4 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function (exports) {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    function isValidListener (listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
            throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);

                for (i = 0; i < listeners.length; i++) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return EventEmitter;
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}(this || {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __webpack_require__(3);
const Point_1 = __webpack_require__(14);
const INITIAL_DIRECTION = Direction_1.Direction.Right;
class ProgramCursor {
    constructor(width, height) {
        this.direction = INITIAL_DIRECTION;
        this.position = { x: 0, y: 0 };
        this.width = width;
        this.height = height;
    }
    rotateDirection(offset) {
        this.direction = Direction_1.rotate(this.direction, offset);
    }
    move(direction) {
        Point_1.moveInDirection(this.position, direction);
    }
    moveForward() {
        this.move(this.direction);
        this.wrapPosition();
    }
    moveBackward() {
        const backwardDirection = Direction_1.rotate(this.direction, 2);
        this.move(backwardDirection);
        this.wrapPosition();
    }
    wrapPosition() {
        Point_1.wrapBounds(this.position, this.width, this.height);
    }
}
exports.ProgramCursor = ProgramCursor;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = __webpack_require__(3);
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
exports.moveInDirection = moveInDirection;
function wrapBounds(point, width, height) {
    const x = (point.x + width) % width;
    const y = (point.y + height) % height;
    return { x, y };
}
exports.wrapBounds = wrapBounds;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ts_keycode_enum_1 = __webpack_require__(7);
const GlyphGrid_1 = __webpack_require__(6);
class GlyphSelector extends GlyphGrid_1.GlyphGrid {
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
        if (event.keyCode === ts_keycode_enum_1.Key.Escape) {
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
}
exports.GlyphSelector = GlyphSelector;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(0);
const ClassName_1 = __webpack_require__(1);
class Console {
    constructor(options) {
        this.containerElement = options.containerElement;
        this.outputElement = utils_1.getChildByClassName(this.containerElement, ClassName_1.ClassName.Output);
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
}
exports.Console = Console;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ClassName_1 = __webpack_require__(1);
const ModalWindow_1 = __webpack_require__(8);
const utils_1 = __webpack_require__(0);
const glyphs_1 = __webpack_require__(4);
const programs_1 = __webpack_require__(18);
class HelpWindow extends ModalWindow_1.ModalWindow {
    constructor(options) {
        super(options);
        this.programList = utils_1.getChildByClassName(this.modalElement, "programs");
        this.glyphList = utils_1.getChildByClassName(this.modalElement, "glyphs");
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
        glyphElement.classList.add(ClassName_1.ClassName.Group);
        const termElement = document.createElement("dt");
        const iconElement = utils_1.createIconElement(glyph.icon);
        const definitionElement = document.createElement("dd");
        const aliasElement = document.createElement("span");
        aliasElement.classList.add(ClassName_1.ClassName.Alias);
        aliasElement.textContent = glyph.alias;
        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add(ClassName_1.ClassName.Description);
        descriptionElement.textContent = glyph.doc;
        termElement.appendChild(iconElement);
        definitionElement.appendChild(aliasElement);
        definitionElement.appendChild(descriptionElement);
        glyphElement.appendChild(termElement);
        glyphElement.appendChild(definitionElement);
        return glyphElement;
    }
}
exports.HelpWindow = HelpWindow;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.programs = [{
        name: "Fibonacci",
        code: "0:qmrbupc-27:atnd",
    }, {
        name: "Countdown",
        code: "0:vbuc-24:wesd",
    }];


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map