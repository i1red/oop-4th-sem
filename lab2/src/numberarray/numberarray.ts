import { HTMLDivArrayItem } from './htmlarrayitem.js'
import { StyleClass } from '../settings.js';


export interface NumberArray {
    get(index: number): number;
    set(index: number, value: number): void;
    length: number;
}


interface Parented {
    setParent(parent: HTMLElement): void;
}


interface StylableArray {
    addStyleClassToItem(index: number, cls: StyleClass): void;
    removeStyleClassFromItem(index: number, cls: StyleClass): void;
}

export interface StylableNumberArray extends NumberArray, StylableArray, Parented { }


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


export class HTMLNumberArray implements StylableNumberArray {
    private items: Array<HTMLDivArrayItem>;
    private itemsParent: HTMLDivElement;
    private parent: HTMLElement = null;

    constructor(initArray: Array<number>, parent: HTMLElement = null) {
        this.itemsParent = document.createElement('div');
        this.itemsParent.classList.add(StyleClass.Array);
        this.items = initArray.map(value => new HTMLDivArrayItem(value, this.itemsParent));

        this.setParent(parent);
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

    setParent(parent: HTMLElement): void {
        if (this.parent !== null) {
            this.parent.removeChild(this.itemsParent);
        }

        this.parent = parent;
        if (this.parent !== null) {
            this.parent.appendChild(this.itemsParent);
        }
    }

    addStyleClassToItem(index: number, cls: StyleClass): void {
        this.items[index].addStyleClass(cls);
    }

    removeStyleClassFromItem(index: number, cls: StyleClass): void {
        this.items[index].removeStyleClass(cls);
    }
}
