import { HTMLDivArrayItem } from './htmlarrayitem.js';
class BuiltInNumberArray {
    constructor(initArray) {
        this.container = Array.from(initArray);
    }
    get(index) {
        return this.container[index];
    }
    set(index, value) {
        this.container[index] = value;
    }
    get length() {
        return this.container.length;
    }
}
export class HTMLNumberArray {
    constructor(initArray) {
        this.itemsParent = document.createElement('div');
        this.itemsParent.classList.add('array');
        this.items = initArray.map(value => new HTMLDivArrayItem(value, this.itemsParent));
    }
    get(index) {
        return this.items[index].value;
    }
    set(index, value) {
        this.items[index].value = value;
    }
    get length() {
        return this.items.length;
    }
    getHTMLDiv() {
        return this.itemsParent;
    }
}
