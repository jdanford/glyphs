// Constants

var UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
var WIDTH = 32, HEIGHT = 32;
var STEP_INTERVAL = 200;
var ICON_CLASS_BASE = "fa";
var ICON_CLASS_PREFIX = "fa-";
var ACTIVE_CLASS = "active";

// Globals

var direction = RIGHT;
var position = {
    x: 0,
    y: 0
};

var stack = [];
var dictionary = {};
var grid = new Array(WIDTH * HEIGHT);
var activeCell = null;
var running = false;
var lastStepTime = 0;

function index(x, y) {
    return y * WIDTH + x;
}

var gridElement = document.getElementById("grid");
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");

function setGlyph(cellElement, alias) {
    cellElement.dataset.alias = alias;

    var iconElement = cellElement.childNodes[0];
    iconElement.className = ICON_CLASS_BASE;

    if (alias) {
        var glyph = dictionary[alias];
        iconElement.classList.add(ICON_CLASS_PREFIX + glyph.className);
    }
}

for (var y = 0; y < HEIGHT; y++) {
    var rowElement = document.createElement("tr");
    gridElement.appendChild(rowElement);

    for (var x = 0; x < WIDTH; x++) {
        var cellElement = document.createElement("td");
        var iconElement = document.createElement("i");
        cellElement.appendChild(iconElement);
        rowElement.appendChild(cellElement);

        setGlyph(cellElement, "");

        var i = index(x, y);
        grid[i] = cellElement;
    }
}

gridElement.addEventListener("click", function (event) {
    if (event.target && event.target.nodeName === "TD") {
        var cellElement = event.target;
        var alias = prompt("Glyph:", "");
        setGlyph(cellElement, alias);
    }
});

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

startButton.addEventListener("click", function (event) {
    start();
});

stopButton.addEventListener("click", function (event) {
    stop();
});

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

dictionary["arrows"] = {
    className: "arrows",
    effect: function () {
        direction = Math.floor(Math.random() * 4);
    }
};

dictionary["clockwise"] = {
    className: "repeat",
    effect: function () {
        direction = (direction + 1 + 4) % 4;
    }
};

dictionary["counter-clockwise"] = {
    className: "undo",
    effect: function () {
        direction = (direction - 1 + 4) % 4;
    }
};
