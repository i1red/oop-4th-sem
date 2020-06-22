const DIV_ARRAY_ITEM_CSS = 'arrayItem';
export class HTMLDivArrayItem {
    constructor(value, parent) {
        this.valueHolder = document.createElement('p');
        this.valueHolder.innerHTML = value.toString();
        this.div = document.createElement('div');
        this.div.classList.add(DIV_ARRAY_ITEM_CSS);
        this.div.appendChild(this.valueHolder);
        parent.appendChild(this.div);
    }
    get value() {
        return Number(this.valueHolder.innerHTML);
    }
    set value(value) {
        this.valueHolder.innerHTML = value.toString();
    }
    addStyleClass(cls) {
        this.div.classList.add(cls);
    }
    removeStyleClass(cls) {
        this.div.classList.remove(cls);
    }
}
