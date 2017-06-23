import {glyphs} from "./glyphs";
import {GlyphGrid} from "./GlyphGrid";
import {ICON_CLASS_BASE, ICON_CLASS_PAUSE, ICON_CLASS_PLAY, DARK_THEME_CLASS} from "./constants";

export class App {
    private gridElement: HTMLElement;
    private outputElement: HTMLElement;
    private startButton: HTMLElement;
    private stepButton: HTMLElement;
    private stopButton: HTMLElement;
    private clearButton: HTMLElement;
    private darkThemeCheckbox: HTMLInputElement;
    private grid: GlyphGrid;

    constructor() {
        this.gridElement = getElementById("grid");
        this.outputElement = getElementById("output");
        this.startButton = getElementById("start-button");
        this.stepButton = getElementById("step-button");
        this.stopButton = getElementById("stop-button");
        this.clearButton = getElementById("clear-button");
        this.darkThemeCheckbox = getElementById("dark-theme-checkbox") as HTMLInputElement;

        const gridOptions = {gridElement: this.gridElement, outputElement: this.outputElement, glyphs};
        this.grid = new GlyphGrid(gridOptions);

        this.initListeners();
        this.updateOutputSize();
        this.setButtonState(false);
        this.setDarkTheme(false);
    }

    initListeners() {
        this.grid.addListener("start", () => this.updateButtonState());
        this.grid.addListener("pause", () => this.updateButtonState());
        this.grid.addListener("reset", () => this.updateButtonState());

        this.startButton.addEventListener("click", _ => {
            this.grid.toggle();
        });

        this.stepButton.addEventListener("click", _ => {
            this.grid.step();
        });

        this.stopButton.addEventListener("click", _ => {
            this.grid.reset();
        });

        this.clearButton.addEventListener("click", _ => {
            const message = "Clear grid?";
            if (confirm(message)) {
                this.grid.clear();
            }
        });

        this.darkThemeCheckbox.addEventListener("change", _ => {
            this.setDarkTheme(this.darkThemeEnabled);
        });
    }

    updateOutputSize() {
        const gridWidth = this.gridElement.offsetWidth;
        this.outputElement.style.setProperty("width", `${gridWidth}px`);
    }

    setButtonState(running: boolean) {
        const iconElement = this.startButton.getElementsByClassName(ICON_CLASS_BASE)[0];
        const iconClass = running ? ICON_CLASS_PAUSE : ICON_CLASS_PLAY;
        iconElement.className = ICON_CLASS_BASE;
        iconElement.classList.add(iconClass);
    }

    updateButtonState() {
        this.setButtonState(this.grid.running);
    }

    get darkThemeEnabled(): boolean {
        return this.darkThemeCheckbox.checked;
    }

    setDarkTheme(useDarkTheme: boolean) {
        document.body.classList.toggle(DARK_THEME_CLASS, useDarkTheme);
    }
}

function getElementById(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error(`Element with id='${id}' does not exist`);
    }

    return element;
}
