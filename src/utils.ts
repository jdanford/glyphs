import { IconClassName } from "./IconClassName";
import { Point } from "./Point";

export function computeAbsolutePosition(element: HTMLElement): Point {
    let x = 0;
    let y = 0;

    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent as HTMLElement;
    } while (element);

    return { x, y };
}

export function createIconElement(iconName: string): HTMLElement {
    const element = document.createElement("i");
    const iconClassName = IconClassName.Prefix + iconName;
    element.classList.add(IconClassName.Base, iconClassName);
    return element;
}

export function getCellElement(event: Event): HTMLElement | null {
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

export function getChildByClassName(element: HTMLElement, className: string): HTMLElement {
    const child = element.getElementsByClassName(className)[0] as HTMLElement;
    if (child === null) {
        throw new Error(`Child with class='${className}' does not exist`);
    }

    return child;
}

export function getElementById(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error(`Element with id='${id}' does not exist`);
    }

    return element;
}
