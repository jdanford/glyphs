/// <reference path="EventEmitter.d.ts" />

import { getCellElement } from "./utils";
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
    protected glyphs: Glyph[];
    protected dictionary: GlyphDictionary;

    protected abstract onCellClick(cellElement: HTMLElement, event: MouseEvent): void;

    constructor(options: GlyphGridOptions) {
        super();

        this.width = options.width;
        this.height = options.height;
        this.gridElement = options.gridElement;
        this.gridCells = new Array(this.width * this.height);
        this.glyphs = options.glyphs;

        this.initDictionary();
        this.fill();

        this.gridElement.addEventListener("click", event => {
            const cellElement = getCellElement(event);
            if (cellElement) {
                this.onCellClick(cellElement, event);
            }
        });
    }

    private initDictionary(): void {
        this.dictionary = {};

        this.glyphs.forEach((glyph, i) => {
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
                const alias = this.getInitialGlyphAlias(i);
                this.setGlyph(cellElement, alias);
            }
        }
    }

    protected getInitialGlyphAlias(i: number): string {
        return "";
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
