import { HTMLNumberArray } from './numberarray/numberarray.js'
import { quicksort, selectionSort, VisualizibleSortAlgorithm } from './sortalgoritms/visualizablealgoritms.js'
import { randomNumberArray } from './utils.js'


const selectSortAlgorithms: HTMLSelectElement = <HTMLSelectElement>document.getElementById('selectSortAlgorithms');
const btnSort: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btnSort');
const btnGenRandItems: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btnGenRandItems');
const spinItemsNumber: HTMLInputElement = <HTMLInputElement>document.getElementById('spinItemsNumber');
const content: HTMLDivElement = <HTMLDivElement>document.getElementById('content');


const algorithms = {
    quicksort: quicksort,
    selectionSort: selectionSort,
};


let array: HTMLNumberArray = null;
let algorithm: VisualizibleSortAlgorithm = quicksort;


btnSort.addEventListener('click', () => {
    algorithms[selectSortAlgorithms.value](array);
});


btnGenRandItems.addEventListener('click', () => {
    const arraySize: number = Number(spinItemsNumber.value);

    if (arraySize <= 0) {
        alert('Array size must be positive');
    }
    else {
        if (array !== null) {
            array.setParent(null);
        }
        array = new HTMLNumberArray(randomNumberArray(arraySize), content);
    }
});

