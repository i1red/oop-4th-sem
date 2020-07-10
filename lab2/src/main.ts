import { HTMLNumberArray } from './numberarray/numberarray.js'
import { quicksort, selectionSort, VisualizibleSortAlgorithm } from './sortalgoritms/visualizablealgoritms.js'
import { getInfoAsHTML } from './sortalgoritms/algorithmsinfo.js';
import { randomNumberArray } from './utils.js'


const selectSortAlgorithms: HTMLSelectElement = <HTMLSelectElement>document.getElementById('selectSortAlgorithms');
const btnSort: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btnSort');
const btnGenRandItems: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btnGenRandItems');
const spinItemsNumber: HTMLInputElement = <HTMLInputElement>document.getElementById('spinItemsNumber');
const sortAlgorithmVisualization: HTMLDivElement = <HTMLDivElement>document.getElementById('sortAlgorithmVisualization');

let sortAlgorithmDescription: HTMLDivElement = <HTMLDivElement>document.getElementById('sortAlgorithmDescription');


const algorithms = {
    quicksort: quicksort,
    selectionSort: selectionSort,
};

let array: HTMLNumberArray = null;
let algorithm: VisualizibleSortAlgorithm = quicksort;


function setDisabledStatus(status: boolean): void {
    selectSortAlgorithms.disabled = status;
    btnGenRandItems.disabled = status;
    btnSort.disabled = status;
}


selectSortAlgorithms.addEventListener('change', () => {
    sortAlgorithmDescription.innerHTML = getInfoAsHTML(selectSortAlgorithms.value);
    algorithm = algorithms[selectSortAlgorithms.value];
});


btnSort.addEventListener('click', () => {
    setDisabledStatus(true);
    algorithm(array).then(() => setDisabledStatus(false));
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
        array = new HTMLNumberArray(randomNumberArray(arraySize), sortAlgorithmVisualization);
    }
});

