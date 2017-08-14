import { ClassName } from "./ClassName";
import { ModalWindow, ModalWindowOptions } from "./ModalWindow";
import { createIconElement, getChildByClassName } from "./utils";
import { Glyph, glyphs } from "./glyphs";
import { Program, programs } from "./programs";

export class HelpWindow extends ModalWindow {
    private programList: HTMLElement;
    private glyphList: HTMLElement;

    constructor(options: ModalWindowOptions) {
        super(options);
        this.programList = getChildByClassName(this.modalElement, "programs");
        this.glyphList = getChildByClassName(this.modalElement, "glyphs");

        this.initLists();
    }

    initLists(): void {
        programs.forEach(program => {
            const programElement = this.createProgramElement(program);
            this.programList.appendChild(programElement);
        });

        glyphs.forEach(glyph => {
            const glyphElement = this.createGlyphElement(glyph);
            this.glyphList.appendChild(glyphElement);
        });
    }

    createProgramElement(program: Program): HTMLElement {
        const programElement = document.createElement("li");
        const aElement = document.createElement("a");
        aElement.href = "#" + program.code;
        aElement.textContent = program.name;

        programElement.appendChild(aElement);
        return programElement;
    }

    createGlyphElement(glyph: Glyph): HTMLElement {
        const glyphElement = document.createElement("div");
        glyphElement.classList.add(ClassName.Group);

        const termElement = document.createElement("dt");
        const iconElement = createIconElement(glyph.icon);

        const definitionElement = document.createElement("dd");
        const aliasElement = document.createElement("span");
        aliasElement.classList.add(ClassName.Alias);
        aliasElement.textContent = glyph.alias;

        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add(ClassName.Description);
        descriptionElement.textContent = glyph.doc;

        termElement.appendChild(iconElement);
        definitionElement.appendChild(aliasElement);
        definitionElement.appendChild(descriptionElement);
        glyphElement.appendChild(termElement);
        glyphElement.appendChild(definitionElement);
        return glyphElement;
    }
}
