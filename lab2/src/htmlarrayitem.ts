const DIV_ARRAY_ITEM_CSS = 'arrayItem';


export class HTMLDivArrayItem {
    private valueHolder: HTMLParagraphElement;
    private div: HTMLDivElement;

    constructor(value: number, parent: Element) {
        this.valueHolder = document.createElement('p');
        this.valueHolder.innerHTML = value.toString();

        this.div = document.createElement('div');
        this.div.classList.add(DIV_ARRAY_ITEM_CSS);
        this.div.appendChild(this.valueHolder);

        parent.appendChild(this.div);
    }

    get value(): number {
        return Number(this.valueHolder.innerHTML);
    }

    set value(value: number) {
        this.valueHolder.innerHTML = value.toString();
    }

    addStyleClass(cls: string): void {
        this.div.classList.add(cls);
    }

    removeStyleClass(cls: string): void {
        this.div.classList.remove(cls);
    }
}

