import { IconClassName } from "./IconClassName";

export function getElementById(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error(`Element with id='${id}' does not exist`);
    }

    return element;
}

export function getChildByClassName(element: HTMLElement, className: string): HTMLElement {
    const child = element.getElementsByClassName(className)[0] as HTMLElement;
    if (child === null) {
        throw new Error(`Child with class='${className}' does not exist`);
    }

    return child;
}

export function createIconElement(iconName: string): HTMLElement {
    const element = document.createElement("i");
    const iconClassName = IconClassName.Prefix + iconName;
    element.classList.add(IconClassName.Base, iconClassName);
    return element;
}
