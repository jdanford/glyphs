import {getElementById} from "./utils";
import {ClassName} from "./ClassName";
import {IconClassName} from "./IconClassName";
import {glyphs} from "./glyphs";
import {GlyphGrid} from "./GlyphGrid";
import {StepSpeed} from "./StepSpeed";
import {ModalWindow} from "./ModalWindow";
import {HelpWindow} from "./HelpWindow";

export class App {
    private gridElement: HTMLElement;
    private outputElement: HTMLElement;
    private fastButton: HTMLElement;
    private startButton: HTMLElement;
    private stepButton: HTMLElement;
    private stopButton: HTMLElement;
    private clearButton: HTMLElement;
    private helpButton: HTMLElement;
    private darkThemeCheckbox: HTMLInputElement;

    private grid: GlyphGrid;
    private helpWindow: HelpWindow;

    constructor() {
        this.gridElement = getElementById("grid");
        this.outputElement = getElementById("output");
        this.fastButton = getElementById("fast-button");
        this.startButton = getElementById("start-button");
        this.stepButton = getElementById("step-button");
        this.stopButton = getElementById("stop-button");
        this.clearButton = getElementById("clear-button");
        this.helpButton = getElementById("help-button");
        this.darkThemeCheckbox = getElementById("dark-theme-checkbox") as HTMLInputElement;

        this.initChildren();
        this.initListeners();
        this.updateOutputSize();
        this.setButtonState(false);
        this.setDarkTheme(false);
    }

    private initChildren(): void {
        const gridOptions = {glyphs, gridElement: this.gridElement, outputElement: this.outputElement};
        this.grid = new GlyphGrid(gridOptions);

        const modalContainer = getElementById("modal-container");
        ModalWindow.setModalContainer(modalContainer);

        const helpModal = getElementById("help-modal");
        this.helpWindow = new HelpWindow({modalElement: helpModal});
    }

    private initListeners(): void {
        this.grid.addListener("start", () => this.updateButtonState());
        this.grid.addListener("pause", () => this.updateButtonState());
        this.grid.addListener("reset", () => this.updateButtonState());

        this.clearButton.addEventListener("click", _ => {
            const message = "Clear grid?";
            if (confirm(message)) {
                this.grid.clear();
                this.grid.saveToWindow();
            }
        });

        this.stopButton.addEventListener("click", _ => {
            this.grid.reset();
        });

        this.stepButton.addEventListener("click", _ => {
            if (this.grid.running) {
                this.grid.pause();
            } else {
                this.grid.step();
            }
        });

        this.startButton.addEventListener("click", _ => {
            this.grid.stepSpeed = StepSpeed.Slow;
            this.grid.start();
        });

        this.fastButton.addEventListener("click", _ => {
            this.grid.stepSpeed = StepSpeed.Fast;
            this.grid.start();
        });

        this.helpButton.addEventListener("click", _ => {
            this.helpWindow.show();
        });

        this.darkThemeCheckbox.addEventListener("change", _ => {
            this.setDarkTheme(this.darkThemeEnabled);
        });
    }

    private updateOutputSize(): void {
        const gridWidth = this.gridElement.offsetWidth;
        this.outputElement.style.setProperty("width", `${gridWidth}px`);
    }

    private setButtonState(running: boolean): void {
        const iconElement = this.stepButton.getElementsByClassName(IconClassName.Base)[0];
        const iconClassName = running ? IconClassName.Pause : IconClassName.Step;
        iconElement.className = IconClassName.Base;
        iconElement.classList.add(iconClassName);

        let runningSlow = running && this.grid.stepSpeed === StepSpeed.Slow;
        let runningFast = running && this.grid.stepSpeed === StepSpeed.Fast;

        this.startButton.classList.toggle("active", runningSlow);
        this.fastButton.classList.toggle("active", runningFast);
    }

    private updateButtonState(): void {
        this.setButtonState(this.grid.running);
    }

    private get darkThemeEnabled(): boolean {
        return this.darkThemeCheckbox.checked;
    }

    private setDarkTheme(enabled: boolean): void {
        document.body.classList.toggle(ClassName.DarkTheme, enabled);
    }
}
