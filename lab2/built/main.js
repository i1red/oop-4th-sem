import { HTMLNumberArray } from './numberarray/numberarray.js';
import { quicksort, selectionSort } from './sortalgoritms/visualizablealgoritms.js';
import { randomNumberArray } from './utils.js';
const selectSortAlgorithms = document.getElementById('selectSortAlgorithms');
const btnSort = document.getElementById('btnSort');
const btnGenRandItems = document.getElementById('btnGenRandItems');
const spinItemsNumber = document.getElementById('spinItemsNumber');
const content = document.getElementById('content');
const algorithms = {
    quicksort: quicksort,
    selectionSort: selectionSort,
};
let array = null;
let algorithm = quicksort;
btnSort.addEventListener('click', () => {
    algorithms[selectSortAlgorithms.value](array);
});
btnGenRandItems.addEventListener('click', () => {
    const arraySize = Number(spinItemsNumber.value);
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
