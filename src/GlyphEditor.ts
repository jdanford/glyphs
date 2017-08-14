import { ClassName } from "./ClassName";
import { IconClassName } from "./IconClassName";
import { Glyph } from "./glyphs";
import { GlyphGrid, GlyphGridOptions } from "./GlyphGrid";
import { StepSpeed } from "./StepSpeed";
import { ProgramState } from "./ProgramState";

const ENCODING_CHARS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHUNK_SEPARATOR: string = ":";
const GROUP_SEPARATOR: string = "-";

interface StringTable {
    [key: string]: string;
}

export interface GlyphEditorOptions extends GlyphGridOptions {
    outputElement: HTMLElement;
}

export class GlyphEditor extends GlyphGrid {
    private outputElement: HTMLElement;
    private activeCell?: HTMLElement;
    private lastStepTime: number;
    private charTable: StringTable;
    private aliasTable: StringTable;

    public state: ProgramState;
    public running: boolean;
    public stepSpeed: StepSpeed;

    constructor(options: GlyphEditorOptions) {
        super(options);

        this.gridElement = options.gridElement;
        this.outputElement = options.outputElement;

        this.initState();
        this.initTables(options.glyphs);

        window.onhashchange = _ => this.loadFromWindow();
        this.loadFromWindow();
    }

    initState(): void {
        this.state = new ProgramState();
        this.running = false;
        this.stepSpeed = StepSpeed.Slow;
        this.lastStepTime = 0;
    }

    onCellClick(cellElement: HTMLElement, event: MouseEvent) {
        const alias = prompt("Glyph:", "") || "";
        this.setGlyph(cellElement, alias);
        this.saveToWindow();
    }

    initTables(glyphs: Glyph[]): void {
        this.charTable = {};
        this.aliasTable = {};

        glyphs.forEach((glyph, i) => {
            const { alias } = glyph;
            const char = ENCODING_CHARS[i];
            this.charTable[alias] = char;
            this.aliasTable[char] = alias;
        });
    }

    clearGrid(): void {
        for (let i = 0; i < this.width * this.height; i++) {
            const cellElement = this.gridCells[i];
            this.setGlyph(cellElement, "");
        }
    }

    step(): void {
        const i = this.index(this.state.position.x, this.state.position.y);

        this.clearActiveCell();
        this.activeCell = this.getCurrentCell();
        this.activeCell.classList.add(ClassName.Active);

        const alias = this.activeCell.title;
        if (alias) {
            const glyph = this.dictionary[alias];
            glyph.effect(this);
        }

        this.state.move();
        this.state.position.x = (this.state.position.x + this.width) % this.width;
        this.state.position.y = (this.state.position.y + this.height) % this.height;

        this.emitEvent("step");
    }

    start(): void {
        if (this.setRunning(true)) {
            const callback = (time: number) => {
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

    setRunning(running: boolean): boolean {
        if (this.running === running) {
            return false;
        }

        this.running = running;
        const eventType = running ? "start" : "pause";
        this.emitEvent(eventType);
        return true;
    }

    setStepSpeed(stepSpeed: StepSpeed): boolean {
        if (this.stepSpeed === stepSpeed) {
            return false;
        }

        this.stepSpeed = stepSpeed;
        this.emitEvent("changeSpeed");
        return true;
    }

    getHash(): string {
        let chunk = [];
        let currentChunk = null;

        for (let i = 0; i < this.width * this.height; i++) {
            const cellElement = this.gridCells[i];
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
                currentChunk = { index: i, string: "" };
            }

            currentChunk.string += char;
        }

        if (currentChunk && currentChunk.string) {
            chunk.push(currentChunk);
        }

        return chunk.map(({ index, string }) => index + CHUNK_SEPARATOR + string).join(GROUP_SEPARATOR);
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

            const cellElement = this.gridCells[index + i];
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
        const i = this.index(this.state.position.x, this.state.position.y);
        return this.gridCells[i];
    }
}
