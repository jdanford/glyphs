/// <reference path="EventEmitter.d.ts" />

import {ClassName} from "./ClassName";
import {IconClassName} from "./IconClassName";
import {Point, moveInDirection} from "./Point";
import {Direction, rotate} from "./Direction";
import {Glyph} from "./glyphs";

const ENCODING_CHARS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHUNK_SEPARATOR: string = ":";
const GROUP_SEPARATOR: string = "-";

const INITIAL_DIRECTION: Direction = Direction.Right;
const INITIAL_STEP_INTERVAL: number = 200;
const GRID_WIDTH: number = 24;
const GRID_HEIGHT: number = 24;

interface GlyphTable {
    [alias: string]: Glyph;
}

interface StringTable {
    [key: string]: string;
}

export interface GlyphGridOptions {
    gridElement: HTMLElement;
    outputElement: HTMLElement;
    glyphs: Glyph[];
}

export class GlyphGrid extends EventEmitter {
    private gridElement: HTMLElement;
    private outputElement: HTMLElement;

    private width: number;
    private height: number;
    private grid: HTMLElement[];
    private activeCell?: HTMLElement;

    private lastStepTime: number;
    private stepInterval: number;

    private dictionary: GlyphTable;
    private charTable: StringTable;
    private aliasTable: StringTable;

    public direction: Direction;
    public position: Point;
    public stack: number[];
    public running: boolean;

    constructor(options: GlyphGridOptions) {
        super();

        this.gridElement = options.gridElement;
        this.outputElement = options.outputElement;

        this.initState();
        this.initGrid();
        this.initDictionary(options.glyphs);

        window.onhashchange = _ => this.loadFromWindow();
        this.loadFromWindow();
    }

    initState(): void {
        this.direction = INITIAL_DIRECTION;
        this.position = {x: 0, y: 0};
        this.stack = [];

        this.running = false;
        this.lastStepTime = 0;
        this.stepInterval = INITIAL_STEP_INTERVAL;
    }

    initGrid(): void {
        this.width = GRID_WIDTH;
        this.height = GRID_HEIGHT;
        this.grid = new Array(this.width * this.height);
        this.fillGrid();

        this.gridElement.addEventListener("click", event => {
            const cellElement = getCellElement(event);
            if (cellElement) {
                const alias = prompt("Glyph:", "") || "";
                this.setGlyph(cellElement, alias);
                this.saveToWindow();
            }
        });
    }

    initDictionary(glyphs: Glyph[]): void {
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

    fillGrid(): void {
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

    clearGrid(): void {
        for (let i = 0; i < this.width * this.height; i++) {
            const cellElement = this.grid[i];
            this.setGlyph(cellElement, "");
        }
    }

    setGlyph(cellElement: HTMLElement, alias: string): void {
        const iconElement = cellElement.childNodes[0] as HTMLElement;
        iconElement.className = IconClassName.Base;

        cellElement.title = alias;

        if (alias) {
            const glyph = this.dictionary[alias];
            if (glyph) {
                const className = IconClassName.Prefix + glyph.icon;
                iconElement.classList.add(className);
            }
        }
    }

    step(): void {
        const i = this.index(this.position.x, this.position.y);

        this.clearActiveCell();
        this.activeCell = this.getCurrentCell();
        this.activeCell.classList.add(ClassName.Active);

        const alias = this.activeCell.title;
        if (alias) {
            const glyph = this.dictionary[alias];
            glyph.effect(this);
        }

        moveInDirection(this.position, this.direction);

        this.position.x = (this.position.x + this.width) % this.width;
        this.position.y = (this.position.y + this.height) % this.height;

        this.emitEvent("step");
    }

    toggle(): void {
        if (this.running) {
            this.pause();
        } else {
            this.start();
        }
    }

    start(): void {
        this.setRunning(true);

        const callback = (time: number) => {
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

    pause(): void {
        this.setRunning(false);
    }

    reset(): void {
        this.initState();
        this.clearActiveCell();
        this.clearOutput();
        this.emitEvent("reset");
    }

    clearActiveCell(): void {
        if (this.activeCell) {
            this.activeCell.classList.remove(ClassName.Active);
            this.activeCell = undefined;
        }
    }

    clear(): void {
        this.reset();
        this.clearGrid();
        this.clearOutput();
    }

    setRunning(running: boolean) {
        if (this.running === running) {
            return;
        }

        this.running = running;
        const eventType = running ? "start" : "pause";
        this.emitEvent(eventType);
    }

    getHash(): string {
        let chunk = [];
        let currentChunk = null;

        for (let i = 0; i < this.width * this.height; i++) {
            const cellElement = this.grid[i];
            const alias = cellElement.title;

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

    loadFromHash(hash: string): void {
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

    loadFromChunk(index: number, chunk: string): void {
        for (let i = 0; i < chunk.length; i++) {
            const char = chunk[i];
            const alias = this.aliasTable[char];
            if (!alias) {
                continue;
            }

            const cellElement = this.grid[index + i];
            this.setGlyph(cellElement, alias);
        }
    }

    saveToWindow(): void {
        const hash = this.getHash();
        window.location.hash = "#" + hash;
    }

    loadFromWindow(): void {
        const hash = window.location.hash.slice(1);
        this.loadFromHash(hash);
    }

    print(text: string): void {
        const preElement = document.createElement("pre");
        preElement.textContent = text;
        this.outputElement.appendChild(preElement);
    }

    clearOutput(): void {
        while (this.outputElement.firstChild) {
            this.outputElement.removeChild(this.outputElement.firstChild);
        }
    }

    getCurrentCell(): HTMLElement {
        const i = this.index(this.position.x, this.position.y);
        return this.grid[i];
    }

    index(x: number, y: number): number {
        return y * this.width + x;
    }

    getStackItem(n: number): number {
        const i = this.stack.length - n - 1;
        return this.stack[i];
    }

    rotateDirection(offset: number): void {
        this.direction = rotate(this.direction, offset);
    }
}

function getCellElement(event: Event): HTMLElement|null {
    if (!(event.target && event.target instanceof HTMLElement)) {
        return null;
    }

    switch (event.target.nodeName) {
        case "TD":
            return event.target;
        case "I":
            return event.target.parentNode as HTMLElement;
        default:
            return null;
    }
};
