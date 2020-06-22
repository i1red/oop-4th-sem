import { HTMLDivArrayItem } from './htmlarrayitem.js'


interface NumberArray {
    get(index: number): number;
    set(index: number, value: number): void;
    length: number;
}


class BuiltInNumberArray implements NumberArray {
    private container: Array<number>;

    constructor(initArray: Array<number>) {
        this.container = Array.from(initArray);
    }

    get(index: number): number {
        return this.container[index];
    }

    set(index: number, value: number): void {
        this.container[index] = value;
    }

    get length() {
        return this.container.length;
    }
}


export class HTMLNumberArray implements NumberArray {
    private items: Array<HTMLDivArrayItem>;
    private itemsParent: HTMLDivElement;

    constructor(initArray: Array<number>) {
        this.itemsParent = document.createElement('div');
        this.itemsParent.classList.add('array');
        this.items = initArray.map(value => new HTMLDivArrayItem(value, this.itemsParent));
    }

    get(index: number): number {
        return this.items[index].value;
    }

    set(index: number, value: number): void {
        this.items[index].value = value;
    }

    get length(): number {
        return this.items.length;
    }

    getHTMLDiv(): HTMLDivElement {
        return this.itemsParent;
    }
}
