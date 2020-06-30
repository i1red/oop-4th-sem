import { HTMLDivArrayItem } from './htmlarrayitem.js';
import { StyleClass } from '../settings.js';
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
    constructor(initArray, parent = null) {
        this.parent = null;
        this.itemsParent = document.createElement('div');
        this.itemsParent.classList.add(StyleClass.Array);
        this.items = initArray.map(value => new HTMLDivArrayItem(value, this.itemsParent));
        this.setParent(parent);
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
    setParent(parent) {
        if (this.parent !== null) {
            this.parent.removeChild(this.itemsParent);
        }
        this.parent = parent;
        if (this.parent !== null) {
            this.parent.appendChild(this.itemsParent);
        }
    }
    addStyleClassToItem(index, cls) {
        this.items[index].addStyleClass(cls);
    }
    removeStyleClassFromItem(index, cls) {
        this.items[index].removeStyleClass(cls);
    }
}
