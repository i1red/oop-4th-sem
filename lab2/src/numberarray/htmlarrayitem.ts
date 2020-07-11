import { StyleClass } from '../settings';


export class HTMLDivArrayItem {
    private valueHolder: HTMLParagraphElement;
    private div: HTMLDivElement;

    constructor(value: number, parent: Element) {
        this.valueHolder = document.createElement('p');
        this.valueHolder.innerHTML = value.toString();

        this.div = document.createElement('div');
        this.div.classList.add(StyleClass.DivArrayItem);
        this.div.appendChild(this.valueHolder);

        parent.appendChild(this.div);
    }

    get value(): number {
        return Number(this.valueHolder.innerHTML);
    }

    set value(value: number) {
        this.valueHolder.innerHTML = value.toString();
    }

    addStyleClass(cls: StyleClass): void {
        this.div.classList.add(cls);
    }

    removeStyleClass(cls: StyleClass): void {
        this.div.classList.remove(cls);
    }
}

