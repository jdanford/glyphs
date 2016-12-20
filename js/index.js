// Constants

var UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
var WIDTH = 32, HEIGHT = 32;
var STEP_INTERVAL = 200;
var ICON_CLASS_BASE = "fa";
var ICON_CLASS_PREFIX = "fa-";
var ACTIVE_CLASS = "active";
var STORAGE_KEY = "grid-data";

// Variables

var grid = new Array(WIDTH * HEIGHT);
var dictionary = {};

var direction;
var position;
var stack;
var activeCell;
var running;
var lastStepTime;

// DOM elements

var gridElement = document.getElementById("grid");
var outputElement = document.getElementById("output");
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
var saveButton = document.getElementById("save-button");
var loadButton = document.getElementById("load-button");
var clearButton = document.getElementById("clear-button");

// Functions

function index(x, y) {
    return y * WIDTH + x;
}

function setGlyph(cellElement, alias) {
    cellElement.dataset.alias = alias;

    var iconElement = cellElement.childNodes[0];
    iconElement.className = ICON_CLASS_BASE;

    if (alias) {
        var glyph = dictionary[alias];
        if (glyph) {
            var className = ICON_CLASS_PREFIX + glyph.className;
            iconElement.classList.add(className);
        }
    }
}

function initState() {
    direction = RIGHT;
    position = { x: 0, y: 0 };
    stack = [];
    activeCell = null;
    running = false;
    lastStepTime = 0;
}

function initGrid() {
    var textData = localStorage.getItem(STORAGE_KEY);
    var data;

    if (textData) {
        data = textData.split(",");
    }

    for (var y = 0; y < HEIGHT; y++) {
        var rowElement = document.createElement("tr");
        gridElement.appendChild(rowElement);

        for (var x = 0; x < WIDTH; x++) {
            var cellElement = document.createElement("td");
            var iconElement = document.createElement("i");
            cellElement.appendChild(iconElement);
            rowElement.appendChild(cellElement);

            var i = index(x, y);
            setGlyph(cellElement, data ? data[i] : "");
            grid[i] = cellElement;
        }
    }
}

function init() {
    initState();
    initGrid();

    gridElement.addEventListener("click", function (event) {
        var nodeName = event.target && event.target.nodeName;

        var cellElement;
        if (nodeName === "TD") {
            cellElement = event.target;
        } else if (nodeName === "I") {
            cellElement = event.target.parentNode;
        }

        if (cellElement) {
            var alias = prompt("Glyph:", "");
            setGlyph(cellElement, alias);
            save();
        }
    });

    startButton.addEventListener("click", function (event) {
        start();
    });

    stopButton.addEventListener("click", function (event) {
        stop();
    });

    saveButton.addEventListener("click", function (event) {
        alert(dataAsString());
    });

    loadButton.addEventListener("click", function (event) {
        var textData = prompt("Data:", "");
        load(textData);
    });

    clearButton.addEventListener("click", function (event) {
        var message = "Clear grid?";
        if (confirm(message)) {
            reset();
        }
    });
}

function step() {
    if (activeCell) {
        activeCell.classList.remove(ACTIVE_CLASS);
    }

    var i = index(position.x, position.y);
    activeCell = grid[i];

    activeCell.classList.add(ACTIVE_CLASS);

    var alias = activeCell.dataset.alias;
    if (alias) {
        var glyph = dictionary[alias];
        glyph.effect();
    }

    switch (direction) {
        case UP:
            position.y -= 1;
            break;
        case RIGHT:
            position.x += 1;
            break;
        case DOWN:
            position.y += 1;
            break;
        case LEFT:
            position.x -= 1;
            break;
    }

    position.x = (position.x + WIDTH) % WIDTH;
    position.y = (position.y + HEIGHT) % HEIGHT;
}

function start() {
    running = true;

    function callback(time) {
        if (running) {
            requestAnimationFrame(callback);
        }

        var nextStepTime = lastStepTime + STEP_INTERVAL;
        if (time >= nextStepTime) {
            lastStepTime = time;
            step();
        }
    }

    requestAnimationFrame(callback);
}

function stop() {
    running = false;
}

function dataAsString() {
    return grid.map(function (cellElement) {
        return cellElement.dataset.alias || "";
    }).join(",");
}

function save() {
    var data = dataAsString();
    localStorage.setItem(STORAGE_KEY, data);
}

function load(textData) {
    if (textData === undefined) {
        textData = localStorage.getItem(STORAGE_KEY);
    }

    if (textData) {
        var data = textData.split(",");
        for (var i = 0; i < WIDTH * HEIGHT; i++) {
            var cellElement = grid[i];
            var alias = data[i];
            setGlyph(cellElement, alias);
        }
    }
}

function reset() {
    initState();

    for (var i = 0; i < WIDTH * HEIGHT; i++) {
        var cellElement = grid[i];
        setGlyph(cellElement, "");
    }
}

function print(text) {
    var preElement = document.createElement("pre");
    preElement.textContent = text;

    outputElement.appendChild(preElement);
}

// Definitions

dictionary["up"] = {
    className: "arrow-up",
    effect: function () {
        direction = UP;
    }
};

dictionary["right"] = {
    className: "arrow-right",
    effect: function () {
        direction = RIGHT;
    }
};

dictionary["down"] = {
    className: "arrow-down",
    effect: function () {
        direction = DOWN;
    }
};

dictionary["left"] = {
    className: "arrow-left",
    effect: function () {
        direction = LEFT;
    }
};

dictionary["up-circle"] = {
    className: "arrow-circle-up",
    effect: function () {
        if (stack[stack.length - 1]) {
            direction = UP;
        }
    }
};

dictionary["right-circle"] = {
    className: "arrow-circle-right",
    effect: function () {
        if (stack[stack.length - 1]) {
            direction = RIGHT;
        }
    }
};

dictionary["down-circle"] = {
    className: "arrow-circle-down",
    effect: function () {
        if (stack[stack.length - 1]) {
            direction = DOWN;
        }
    }
};

dictionary["left-circle"] = {
    className: "arrow-circle-left",
    effect: function () {
        if (stack[stack.length - 1]) {
            direction = LEFT;
        }
    }
};

dictionary["arrows"] = {
    className: "arrows",
    effect: function () {
        direction = Math.floor(Math.random() * 4);
    }
};

dictionary["rotate-right"] = {
    className: "rotate-right",
    effect: function () {
        direction = (direction + 1 + 4) % 4;
    }
};

dictionary["rotate-left"] = {
    className: "rotate-left",
    effect: function () {
        direction = (direction - 1 + 4) % 4;
    }
};

dictionary["exchange"] = {
    className: "exchange",
    effect: function () {
        direction = (direction + 2 + 4) % 4;
    }
};

dictionary["car"] = {
    className: "car",
    effect: function () {
        stack.push(stack[stack.length - 1]);
    }
};

dictionary["plane"] = {
    className: "plane",
    effect: function () {
        stack.push(stack[stack.length - 2]);
    }
};

dictionary["bomb"] = {
    className: "bomb",
    effect: function () {
        stack.pop();
    }
};

dictionary["snowflake"] = {
    className: "snowflake-o",
    effect: function () {
        var i = stack.length - 2, j = stack.length - 1;
        var tmp = stack[i];
        stack[i] = stack[j];
        stack[j] = tmp;
    }
};

dictionary["leaf"] = {
    className: "leaf",
    effect: function () {
        stack.push(0);
    }
};

dictionary["sun"] = {
    className: "sun-o",
    effect: function () {
        stack[stack.length - 1]++;
    }
};

dictionary["moon"] = {
    className: "moon-o",
    effect: function () {
        stack[stack.length - 1]--;
    }
};

dictionary["smile"] = {
    className: "smile-o",
    effect: function () {
        var value = stack.pop();
        stack[stack.length - 1] += value;
    }
};

dictionary["comment"] = {
    className: "comment",
    effect: function () {
        print(stack[stack.length - 1]);
    }
};

dictionary["eye"] = {
    className: "eye",
    effect: function () {
        var string = prompt("Enter a number:", "");
        var value = parseInt(string);
        stack.push(value);
    }
};

dictionary["close"] = {
    className: "close",
    effect: function () {
        running = false;
    }
};

// Initialization

init();
