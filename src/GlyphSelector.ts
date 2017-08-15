import { KeyCode } from "./KeyCode";
import { Point } from "./Point";
import { Glyph } from "./glyphs";
import { GlyphGrid } from "./GlyphGrid";

export interface GlyphSelectorOptions {
    containerElement: HTMLElement;
    gridElement: HTMLElement;
    glyphs: Glyph[];
}

export class GlyphSelector extends GlyphGrid {
    private containerElement: HTMLElement;
    private keyPressedListener: (event: KeyboardEvent) => void;

    constructor(options: GlyphSelectorOptions) {
        const glyphCount = options.glyphs.length;
        const length = Math.ceil(Math.sqrt(glyphCount));
        const gridOptions = {
            width: length,
            height: length,
            gridElement: options.gridElement,
            glyphs: options.glyphs
        };

        super(gridOptions);
        this.containerElement = options.containerElement;
        this.keyPressedListener = this.onKeyPressed.bind(this);
    }

    protected getInitialGlyphAlias(i: number): string {
        const glyph = this.glyphs[i - 1] || { alias: "" };
        return glyph.alias;
    }

    protected onCellClick(cellElement: HTMLElement, event: MouseEvent): void {
        const alias = cellElement.title;
        this.emit("selectGlyph", alias);
    }

    private onKeyPressed(event: KeyboardEvent): void {
        if (event.keyCode === KeyCode.Escape) {
            this.emit("close");
        }
    }

    show(position: Point): void {
        const { x, y } = position;

        this.containerElement.style.setProperty("left", `${x}px`);
        this.containerElement.style.setProperty("top", `${y}px`);
        this.containerElement.removeAttribute("hidden");
        document.addEventListener("keyup", this.keyPressedListener);
    }

    hide(): void {
        this.containerElement.setAttribute("hidden", "");
        document.removeEventListener("keyup", this.keyPressedListener);
    }
}
