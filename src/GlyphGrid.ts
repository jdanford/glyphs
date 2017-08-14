/// <reference path="EventEmitter.d.ts" />

import { IconClassName } from "./IconClassName";
import { Glyph } from "./glyphs";

interface GlyphDictionary {
    [alias: string]: Glyph;
}

export interface GlyphGridOptions {
    width: number;
    height: number;
    gridElement: HTMLElement;
    glyphs: Glyph[];
}

export abstract class GlyphGrid extends EventEmitter {
    protected width: number;
    protected height: number;
    protected gridElement: HTMLElement;
    protected gridCells: HTMLElement[];
    protected dictionary: GlyphDictionary;

    protected abstract onCellClick(cellElement: HTMLElement, event: MouseEvent): void;

    constructor(options: GlyphGridOptions) {
        super();

        this.width = options.width;
        this.height = options.height;
        this.gridElement = options.gridElement;
        this.gridCells = new Array(this.width * this.height);

        this.initDictionary(options.glyphs);
        this.fill();

        this.gridElement.addEventListener("click", event => {
            const cellElement = getCellElement(event);
            if (cellElement) {
                this.onCellClick(cellElement, event);
            }
        });
    }

    private initDictionary(glyphs: Glyph[]): void {
        this.dictionary = {};

        glyphs.forEach((glyph, i) => {
            const { alias } = glyph;
            this.dictionary[alias] = glyph;
        });
    }

    private fill(): void {
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
                this.setGlyph(cellElement, "");
            }
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

    index(x: number, y: number): number {
        return y * this.width + x;
    }
}

function getCellElement(event: Event): HTMLElement | null {
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
}
