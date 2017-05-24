class GlyphGrid {
    constructor(options) {
        this.gridElement = options.gridElement;
        this.outputElement = options.outputElement;
        this.dictionary = options.dictionary || {};
        this.width = options.width || 32;
        this.height = options.height || 32;
        this.stepInterval = options.stepInterval || 200;

        this.initState();
        this.initGrid();
    }

    initState() {
        this.direction = RIGHT;
        this.position = {x: 0, y: 0};
        this.stack = [];
        this.running = false;
        this.lastStepTime = 0;

        if (this.activeCell) {
            this.activeCell.classList.remove(ACTIVE_CLASS);
            this.activeCell = null;
        }
    }

    initGrid() {
        this.grid = new Array(this.width * this.height);

        const data = this.getHashData();

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

                const alias = data ? data[i] : "";
                this.setGlyph(cellElement, alias);
            }
        }

        this.gridElement.addEventListener("click", event => {
            const nodeName = event.target && event.target.nodeName;

            let cellElement;
            if (nodeName === "TD") {
                cellElement = event.target;
            } else if (nodeName === "I") {
                cellElement = event.target.parentNode;
            }

            if (cellElement) {
                const alias = prompt("Glyph:", "");
                this.setGlyph(cellElement, alias);
                this.updateHash();
            }
        });

        window.onhashchange = _ => this.loadFromHash();
    }

    clearGrid() {
        for (let i = 0; i < this.width * this.height; i++) {
            const cellElement = this.grid[i];
            this.setGlyph(cellElement, "");
        }

        this.updateHash();
    }

    setGlyph(cellElement, alias) {
        cellElement.dataset.alias = alias;

        const iconElement = cellElement.childNodes[0];
        iconElement.className = ICON_CLASS_BASE;

        if (alias) {
            const glyph = this.dictionary[alias];
            if (glyph) {
                const className = ICON_CLASS_PREFIX + glyph.className;
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
            case UP:
                this.position.y -= 1;
                break;
            case RIGHT:
                this.position.x += 1;
                break;
            case DOWN:
                this.position.y += 1;
                break;
            case LEFT:
                this.position.x -= 1;
                break;
        }

        this.position.x = (this.position.x + this.width) % this.width;
        this.position.y = (this.position.y + this.height) % this.height;
    }

    start() {
        this.running = true;

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

    stop() {
        this.running = false;
    }

    updateHash() {
        window.location.hash = "#" + this.grid.map(cellElement => cellElement.dataset.alias || "").join(",");
    }

    loadFromHash() {
        const data = this.getHashData();
        for (let i = 0; i < this.width * this.height; i++) {
            const cellElement = this.grid[i];
            const alias = data[i];
            this.setGlyph(cellElement, alias);
        }
    }

    getHashData() {
        const hash = window.location.hash.slice(1);
        return hash && hash.split(",");
    }

    reset() {
        this.initState();
        this.clearGrid();
    }

    print(text) {
        const preElement = document.createElement("pre");
        preElement.textContent = text;

        outputElement.appendChild(preElement);
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
