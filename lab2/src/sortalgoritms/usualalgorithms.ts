import { NumberArray } from '../numberarray/numberarray';


function swap(array: NumberArray, i: number, j: number): void {
    if (i !== j) {
        let tmp: number = array.get(i);
        array.set(i, array.get(j));
        array.set(j, tmp);
    }
}


function partition(array: NumberArray, start: number, end: number): number {
    let i: number = start - 1;
    let pivot: number = array.get(end);

    for (let j: number = start; j < end; ++j) {
        if (array.get(j) <= pivot) {
            ++i;
            swap(array, i, j);
        }
    }

    swap(array, i + 1, end);
    return i + 1;
}


function quicksortImpl(array: NumberArray, start: number, end: number): void {
    if (start < end) {
        let index: number = partition(array, start, end);

        quicksortImpl(array, start, index - 1);
        quicksortImpl(array, index + 1, end);
    }
}


export function quicksort(array: NumberArray): void {
    quicksortImpl(array, 0, array.length - 1);
}


export function selectionSort(array: NumberArray): void {
    for (let i: number = 0; i < array.length - 1; ++i) {
        let minIndex: number = i;

        for (let j: number = i + 1; j < array.length; ++j) {
            if (array.get(minIndex) > array.get(j)) {
                minIndex = j;
            }
        }
        swap(array, minIndex, i);
    }
}