import { getElementById, computeAbsolutePosition } from "./utils";
import { ClassName } from "./ClassName";
import { IconClassName } from "./IconClassName";
import { glyphs } from "./glyphs";
import { StepSpeed } from "./StepSpeed";
import { GlyphEditor } from "./GlyphEditor";
import { GlyphSelector } from "./GlyphSelector";
import { ModalWindow } from "./ModalWindow";
import { HelpWindow } from "./HelpWindow";

const GRID_WIDTH: number = 24;
const GRID_HEIGHT: number = 24;

export class App {
    private editorGridElement: HTMLElement;
    private outputElement: HTMLElement;
    private fastButton: HTMLElement;
    private startButton: HTMLElement;
    private stepButton: HTMLElement;
    private stopButton: HTMLElement;
    private clearButton: HTMLElement;
    private helpButton: HTMLElement;
    private darkThemeCheckbox: HTMLInputElement;
    private editor: GlyphEditor;
    private selector: GlyphSelector;
    private helpWindow: HelpWindow;
    private stateChangeListener: (event: KeyboardEvent) => void;

    constructor() {
        this.editorGridElement = getElementById("editor-grid");
        this.outputElement = getElementById("output");
        this.fastButton = getElementById("fast-button");
        this.startButton = getElementById("start-button");
        this.stepButton = getElementById("step-button");
        this.stopButton = getElementById("stop-button");
        this.clearButton = getElementById("clear-button");
        this.helpButton = getElementById("help-button");
        this.darkThemeCheckbox = getElementById("dark-theme-checkbox") as HTMLInputElement;
        this.stateChangeListener = this.onStateChange.bind(this);

        this.initChildren();
        this.initListeners();
        this.updateOutputSize();
        this.setButtonState(false);
        this.setDarkTheme(false);
    }

    private initChildren(): void {
        const editorOptions = { glyphs, width: GRID_WIDTH, height: GRID_HEIGHT, gridElement: this.editorGridElement, outputElement: this.outputElement };
        this.editor = new GlyphEditor(editorOptions);

        const selectorElement = getElementById("selector-container");
        const selectorGridElement = getElementById("selector-grid");
        const selectorOptions = { glyphs, containerElement: selectorElement, gridElement: selectorGridElement };
        this.selector = new GlyphSelector(selectorOptions);

        const modalContainer = getElementById("modal-container");
        ModalWindow.setModalContainer(modalContainer);

        const helpModal = getElementById("help-modal");
        this.helpWindow = new HelpWindow({ modalElement: helpModal });
    }

    private initListeners(): void {
        this.editor.addListener("start", this.stateChangeListener);
        this.editor.addListener("pause", this.stateChangeListener);
        this.editor.addListener("reset", this.stateChangeListener);
        this.editor.addListener("changeSpeed", this.stateChangeListener);

        this.editor.addListener("endEditCell", () => {
            this.selector.hide();
        });

        this.selector.addListener("close", () => {
            this.editor.endEditCell();
        });

        this.editor.addListener("editCell", (cellElement: HTMLElement) => {
            const position = computeAbsolutePosition(cellElement);
            this.selector.show(position);
            this.selector.once("selectGlyph", (alias: string) => {
                this.editor.endEditCell();
                this.editor.setGlyph(cellElement, alias);
                this.editor.saveToWindow();
            });
        });

        this.clearButton.addEventListener("click", _ => {
            const message = "Clear grid?";
            if (confirm(message)) {
                this.editor.clear();
                this.editor.saveToWindow();
            }
        });

        this.stopButton.addEventListener("click", _ => {
            this.editor.reset();
        });

        this.stepButton.addEventListener("click", _ => {
            if (this.editor.running) {
                this.editor.pause();
            } else {
                this.editor.step();
            }
        });

        this.startButton.addEventListener("click", _ => {
            this.editor.setStepSpeed(StepSpeed.Slow);
            this.editor.start();
        });

        this.fastButton.addEventListener("click", _ => {
            this.editor.setStepSpeed(StepSpeed.Fast);
            this.editor.start();
        });

        this.helpButton.addEventListener("click", _ => {
            this.helpWindow.show();
        });

        this.darkThemeCheckbox.addEventListener("change", _ => {
            this.setDarkTheme(this.darkThemeEnabled);
        });
    }

    private onStateChange(): void {
        this.editor.endEditCell();
        this.updateButtonState();
    }

    private updateOutputSize(): void {
        const width = this.editorGridElement.offsetWidth;
        this.outputElement.style.setProperty("width", `${width}px`);
    }

    private setButtonState(running: boolean): void {
        const iconElement = this.stepButton.getElementsByClassName(IconClassName.Base)[0];
        const iconClassName = running ? IconClassName.Pause : IconClassName.Step;
        iconElement.className = IconClassName.Base;
        iconElement.classList.add(iconClassName);

        const runningSlow = running && this.editor.stepSpeed === StepSpeed.Slow;
        const runningFast = running && this.editor.stepSpeed === StepSpeed.Fast;
        this.startButton.classList.toggle(ClassName.Active, runningSlow);
        this.fastButton.classList.toggle(ClassName.Active, runningFast);
    }

    private updateButtonState(): void {
        this.setButtonState(this.editor.running);
    }

    private get darkThemeEnabled(): boolean {
        return this.darkThemeCheckbox.checked;
    }

    private setDarkTheme(enabled: boolean): void {
        document.body.classList.toggle(ClassName.DarkTheme, enabled);
    }
}
