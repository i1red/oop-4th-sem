import { HTMLNumberArray } from './numberarray/numberarray';
import { VisualizableSortAlgorithm } from './sortalgoritms/visualizablealgoritms';
import { sortAlgorithmsInfo, SortAlgorithmInfo } from './sortalgoritms/algorithmsinfo';
import { randomNumberArray, setDisabledStatus, HTMLDisableableElement } from './utils';


let sortAlgorithmDescription = <HTMLDivElement>document.getElementById('sortAlgorithmDescription');

const SELECT_SORT_ALGORITHMS: HTMLSelectElement = initSelectSortAlgorithms();
const BTN_SORT = <HTMLButtonElement>document.getElementById('btnSort');
const BTN_GEN_RAND_ITEMS = <HTMLButtonElement>document.getElementById('btnGenRandItems');
const SPIN_ITEMS_NUMBER = <HTMLInputElement>document.getElementById('spinItemsNumber');
const SORT_ALGORITHM_VISUALIZATION = <HTMLDivElement>document.getElementById('sortAlgorithmVisualization');

const NOT_SECURE_ELEMENTS_FOR_SORT_PROCESS: HTMLDisableableElement[] = [SELECT_SORT_ALGORITHMS, BTN_GEN_RAND_ITEMS, BTN_SORT];

let array: HTMLNumberArray = null;


function loadSortAlgorithm(sortType: string): void {
    const algorithmInfo: SortAlgorithmInfo = sortAlgorithmsInfo[sortType];
    sortAlgorithmDescription.innerHTML = algorithmInfo.descriptionToHTML();
}


function generateArray(arraySize: number): void {
    if (array !== null) {
        array.setParent(null);
    }
    array = new HTMLNumberArray(randomNumberArray(arraySize), SORT_ALGORITHM_VISUALIZATION);
}


function initSelectSortAlgorithms(): HTMLSelectElement {
    let selectSortAlgorithms = <HTMLSelectElement>document.getElementById('selectSortAlgorithms');

    let loadedFirstAlgorithm: boolean = false;

    for (let [sortType, info] of Object.entries(sortAlgorithmsInfo)) {
        if (!loadedFirstAlgorithm) {
            loadSortAlgorithm(sortType);
            loadedFirstAlgorithm = true;
        }
        selectSortAlgorithms.innerHTML += `<option value="${sortType}">${info.name}</option>`
    }

    return selectSortAlgorithms;
}


SELECT_SORT_ALGORITHMS.addEventListener('change', () => {
    loadSortAlgorithm(SELECT_SORT_ALGORITHMS.value);
});


BTN_SORT.addEventListener('click', () => {
    const sortAlgorithm: VisualizableSortAlgorithm =
        sortAlgorithmsInfo[SELECT_SORT_ALGORITHMS.value].visualizableImplementation;

    setDisabledStatus(NOT_SECURE_ELEMENTS_FOR_SORT_PROCESS, true);
    sortAlgorithm(array).then(() => setDisabledStatus(NOT_SECURE_ELEMENTS_FOR_SORT_PROCESS, false));
});


BTN_GEN_RAND_ITEMS.addEventListener('click', () => {
    const arraySize: number = Number(SPIN_ITEMS_NUMBER.value);

    if (arraySize <= 0) {
        alert('Array size must be positive');
    }
    else {
        generateArray(arraySize);
    }
});
