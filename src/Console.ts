import { getChildByClassName } from "./utils";
import { ClassName } from "./ClassName";

export interface ConsoleOptions {
    containerElement: HTMLElement;
}

export class Console {
    private containerElement: HTMLElement;
    private outputElement: HTMLElement;

    constructor(options: ConsoleOptions) {
        this.containerElement = options.containerElement;
        this.outputElement = getChildByClassName(this.containerElement, ClassName.Output);
    }

    print(text: string): void {
        this.outputElement.textContent += text;
    }

    clear(): void {
        this.outputElement.textContent = "";
    }

    get elementWidth(): number {
        const property = this.containerElement.style["width"] || "0px";
        return +property.slice(0, -2);
    }

    set elementWidth(width: number) {
        this.containerElement.style.setProperty("width", `${width}px`);
    }
}
