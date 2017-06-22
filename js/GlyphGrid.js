const getCellElement = event => {
    const nodeName = event.target && event.target.nodeName;
    switch (nodeName) {
        case "TD":
            return event.target;
        case "I":
            return event.target.parentNode;
        default:
            return null;
    }
};

class GlyphGrid extends EventEmitter {
    constructor(options) {
        super();

        this.gridElement = options.gridElement;
        this.outputElement = options.outputElement;

        this.initState();
        this.initGrid();
        this.initDictionary(glyphs);

        window.onhashchange = _ => this.loadFromWindow();
        this.loadFromWindow();
    }

    initState() {
        this.direction = INITIAL_DIRECTION;
        this.position = {x: 0, y: 0};
        this.stack = [];

        this.running = false;
        this.lastStepTime = 0;
        this.stepInterval = INITIAL_STEP_INTERVAL;
    }

    initGrid() {
        this.width = GRID_WIDTH;
        this.height = GRID_HEIGHT;
        this.grid = new Array(this.width * this.height);
        this.fillGrid();

        this.gridElement.addEventListener("click", event => {
            const cellElement = getCellElement(event);
            if (cellElement) {
                const alias = prompt("Glyph:", "");
                this.setGlyph(cellElement, alias);
                this.saveToWindow();
            }
        });
    }

    initDictionary(glyphs) {
        this.dictionary = {};
        this.charTable = {};
        this.aliasTable = {};

        glyphs.forEach((glyph, i) => {
            const {alias} = glyph;
            this.dictionary[alias] = glyph;

            const char = ENCODING_CHARS[i];
            this.charTable[alias] = char;
            this.aliasTable[char] = alias;
        });
    }

    fillGrid() {
        for (let y = 0; y < this.height; y++) {
            const rowElement = document.createElement("tr");
            this.gridElement.appendChild(rowElement);

            for (let x = 0; x < this.width; x++) {
                const cellElement = document.createElement("td");
                const iconElement = document.createElement("i");
                cellElement.appendChild(iconElement);
                rowElement.appendChild(cellElement);

                const i = this.index(x, y);
                this.grid[i] = cellElement;
                this.setGlyph(cellElement, "");
            }
        }
    }

    clearGrid() {
        for (let i = 0; i < this.width * this.height; i++) {
            const cellElement = this.grid[i];
            this.setGlyph(cellElement, "");
        }
    }

    setGlyph(cellElement, alias) {
        const iconElement = cellElement.childNodes[0];
        iconElement.className = ICON_CLASS_BASE;

        cellElement.dataset.alias = alias;

        if (alias) {
            const glyph = this.dictionary[alias];
            if (glyph) {
                const className = ICON_CLASS_PREFIX + glyph.icon;
                iconElement.classList.add(className);
            }
        }
    }

    step() {
        if (this.activeCell) {
            this.activeCell.classList.remove(ACTIVE_CLASS);
        }

        const i = this.index(this.position.x, this.position.y);
        this.activeCell = this.grid[i];

        this.activeCell.classList.add(ACTIVE_CLASS);

        const alias = this.activeCell.dataset.alias;
        if (alias) {
            const glyph = this.dictionary[alias];
            glyph.effect(this);
        }

        switch (this.direction) {
            case Direction.UP:
                this.position.y -= 1;
                break;
            case Direction.RIGHT:
                this.position.x += 1;
                break;
            case Direction.DOWN:
                this.position.y += 1;
                break;
            case Direction.LEFT:
                this.position.x -= 1;
                break;
        }

        this.position.x = (this.position.x + this.width) % this.width;
        this.position.y = (this.position.y + this.height) % this.height;

        this.emitEvent("step");
    }

    toggle() {
        if (this.running) {
            this.pause();
        } else {
            this.start();
        }
    }

    start() {
        this.setRunning(true);

        const callback = time => {
            if (!this.running) {
                return;
            }

            requestAnimationFrame(callback);

            const nextStepTime = this.lastStepTime + this.stepInterval;
            if (time >= nextStepTime) {
                this.lastStepTime = time;
                this.step();
            }
        };

        requestAnimationFrame(callback);
    }

    pause() {
        this.setRunning(false);
    }

    reset() {
        this.initState();

        if (this.activeCell) {
            this.activeCell.classList.remove(ACTIVE_CLASS);
            this.activeCell = null;
        }

        this.emitEvent("reset");
    }

    clear() {
        this.reset();
        this.clearGrid();
        this.clearOutput();
        this.saveToWindow();
    }

    setRunning(running) {
        if (this.running === running) {
            return;
        }

        this.running = running;
        const eventType = running ? "start" : "pause";
        this.emitEvent(eventType);
    }

    getHash() {
        let chunk = [];
        let currentChunk = null;

        for (let i = 0; i < this.width * this.height; i++) {
            const cellElement = this.grid[i];
            const alias = cellElement.dataset.alias;

            if (!alias) {
                if (currentChunk) {
                    chunk.push(currentChunk);
                    currentChunk = null;
                }

                continue;
            }

            const char = this.charTable[alias];
            if (!char) {
                continue;
            }

            if (!currentChunk) {
                currentChunk = {index: i, string: ""};
            }

            currentChunk.string += char;
        }

        if (currentChunk && currentChunk.string) {
            chunk.push(currentChunk);
        }

        return chunk.map(({index, string}) => index + CHUNK_SEPARATOR + string).join(GROUP_SEPARATOR);
    }

    loadFromHash(hash) {
        this.clearGrid();

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

    loadFromChunk(index, string) {
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            const alias = this.aliasTable[char];
            if (!alias) {
                continue;
            }

            const cellElement = this.grid[index + i];
            this.setGlyph(cellElement, alias);
        }
    }

    saveToWindow() {
        const hash = this.getHash();
        window.location.hash = "#" + hash;
    }

    loadFromWindow() {
        const hash = window.location.hash.slice(1);
        this.loadFromHash(hash);
    }

    print(text) {
        const preElement = document.createElement("pre");
        preElement.textContent = text;
        this.outputElement.appendChild(preElement);
    }

    clearOutput() {
        while (this.outputElement.firstChild) {
            this.outputElement.removeChild(this.outputElement.firstChild);
        }
    }

    index(x, y) {
        return y * this.width + x;
    }

    getStackItem(n) {
        const i = this.stack.length - n - 1;
        return this.stack[i];
    }

    rotateDirection(offset) {
        this.direction = (this.direction + offset + 4) % 4;
    }
}
