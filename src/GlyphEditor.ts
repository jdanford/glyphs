import { ClassName } from "./ClassName";
import { IconClassName } from "./IconClassName";
import { Glyph } from "./glyphs";
import { GlyphGrid, GlyphGridOptions } from "./GlyphGrid";
import { StepSpeed } from "./StepSpeed";
import { ProgramCursor } from "./ProgramCursor";

const ENCODING_CHARS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHUNK_SEPARATOR: string = ":";
const GROUP_SEPARATOR: string = "-";

interface StringTable {
    [key: string]: string;
}

export interface GlyphEditorOptions extends GlyphGridOptions {
    initialHash: string;
}

export class GlyphEditor extends GlyphGrid {
    private activeCell?: HTMLElement;
    private editingCell?: HTMLElement;
    private lastStepTime: number;
    private charTable: StringTable;
    private aliasTable: StringTable;

    public cursor: ProgramCursor;
    public stack: number[];
    public running: boolean;
    public stepSpeed: StepSpeed;

    constructor(options: GlyphEditorOptions) {
        super(options);
        this.gridElement = options.gridElement;
        this.initState();
        this.initTables();
        this.loadFromHash(options.initialHash);
    }

    initState(): void {
        this.cursor = new ProgramCursor(this.width, this.height);
        this.stack = [];
        this.running = false;
        this.stepSpeed = StepSpeed.Slow;
        this.lastStepTime = 0;
    }

    onCellClick(cellElement: HTMLElement, event: MouseEvent): void {
        if (this.editingCell === cellElement) {
            this.endEditCell();
        }

        this.editCell(cellElement);
    }

    editCell(cellElement: HTMLElement): void {
        this.editingCell = cellElement;
        this.emit("editCell", this.editingCell);
    }

    endEditCell(): void {
        this.editingCell = undefined;
        this.emit("endEditCell");
    }

    initTables(): void {
        this.charTable = {};
        this.aliasTable = {};

        this.glyphs.forEach((glyph, i) => {
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
        this.clearActiveCell();
        this.activeCell = this.getCurrentCell();
        this.activeCell.classList.add(ClassName.Active);
        const alias = this.activeCell.title;

        this.executeAlias(alias);
        this.cursor.moveForward();
        this.emit("step");
    }

    executeAlias(alias: string): void {
        if (alias) {
            const glyph = this.dictionary[alias];
            glyph.effect(this);
        }
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
        this.clearConsole();
        this.emit("reset");
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
        this.clearConsole();
    }

    setRunning(running: boolean): boolean {
        if (this.running === running) {
            return false;
        }

        this.running = running;
        const eventType = running ? "start" : "pause";
        this.emit(eventType);
        return true;
    }

    setStepSpeed(stepSpeed: StepSpeed): boolean {
        if (this.stepSpeed === stepSpeed) {
            return false;
        }

        this.stepSpeed = stepSpeed;
        this.emit("changeSpeed");
        return true;
    }

    getHash(): string {
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

    saveHash(): void {
        const hash = this.getHash();
        this.emit("updateHash", hash);
    }

    print(text: string): void {
        this.emit("print", text);
    }

    println(text: string): void {
        this.print(text + "\n");
    }

    clearConsole(): void {
        this.emit("clearConsole");
    }

    getCurrentCell(): HTMLElement {
        const i = this.index(this.cursor.position.x, this.cursor.position.y);
        return this.gridCells[i];
    }

    getStackItem(n: number): number {
        const i = this.stack.length - n - 1;
        return this.stack[i];
    }
}
