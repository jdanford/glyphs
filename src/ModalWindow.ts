import { getChildByClassName } from "./utils";
import { ClassName } from "./ClassName";
import { KeyCode } from "./KeyCode";

export interface ModalWindowOptions {
    modalElement: HTMLElement;
}

export class ModalWindow {
    private static modalContainer: HTMLElement;
    private static activeInstance?: ModalWindow;
    private static containerClickListener = ModalWindow.hideActiveInstance.bind(ModalWindow);

    static setModalContainer(modalContainer: HTMLElement): void {
        if (this.modalContainer === modalContainer) {
            return;
        }

        if (this.modalContainer) {
            this.modalContainer.removeEventListener("click", this.containerClickListener);
        }

        this.modalContainer = modalContainer;
        this.modalContainer.addEventListener("click", this.containerClickListener);
    }

    protected static hideActiveInstance(): void {
        if (this.activeInstance) {
            this.activeInstance.hide();
        }
    }

    protected modalElement: HTMLElement;
    private closeButton: HTMLElement;
    private keyPressedListener = this.onKeyPressed.bind(this);

    constructor(options: ModalWindowOptions) {
        this.modalElement = options.modalElement;
        this.closeButton = getChildByClassName(this.modalElement, "close-button");
        this.initListeners();
    }

    private initListeners(): void {
        this.modalElement.addEventListener("click", event => event.stopPropagation());
        this.closeButton.addEventListener("click", _ => this.hide());
    }

    private onKeyPressed(event: KeyboardEvent): void {
        if (!this.visible) {
            return;
        }

        if (event.keyCode === KeyCode.Escape) {
            this.hide();
        }
    }

    show(): void {
        this.visible = true;
    }

    hide(): void {
        this.visible = false;
    }

    get visible(): boolean {
        return document.body.classList.contains(ClassName.ModalOpen);
    }

    set visible(visible: boolean) {
        if (this === ModalWindow.activeInstance && this.visible === visible) {
            return;
        }

        document.body.classList.toggle(ClassName.ModalOpen, visible);

        if (visible) {
            document.addEventListener("keyup", this.keyPressedListener);
            ModalWindow.activeInstance = this;
        } else {
            document.removeEventListener("keyup", this.keyPressedListener);
        }
    }
}
