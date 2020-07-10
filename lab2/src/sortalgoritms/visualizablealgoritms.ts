import { StylableNumberArray } from '../numberarray/numberarray';
import { StyleClass } from '../settings.js';
import { sleep } from '../utils.js';


export interface VisualizibleSortAlgorithm {
    (array: StylableNumberArray, delay?: number): Promise<void>;
}


function addStyleClassToArrayRange(array: StylableNumberArray, start: number, end: number, cls: StyleClass): void {
    for (let i: number = start; i < end; ++i) {
        array.addStyleClassToItem(i, cls);
    }
}


function removeStyleClassFromArrayRange(array: StylableNumberArray, start: number, end: number, cls: StyleClass): void {
    for (let i: number = start; i < end; ++i) {
        array.removeStyleClassFromItem(i, cls);
    }
}


async function swap(array: StylableNumberArray, i: number, j: number, delay: number = 1000): Promise<void> {
    if (i !== j) {
        array.addStyleClassToItem(i, StyleClass.SwappedItem);
        array.addStyleClassToItem(j, StyleClass.SwappedItem);
        await sleep(delay);

        let tmp: number = array.get(i);
        array.set(i, array.get(j));
        array.set(j, tmp);

        array.removeStyleClassFromItem(i, StyleClass.SwappedItem);
        array.removeStyleClassFromItem(j, StyleClass.SwappedItem);
    }
}


async function partition(array: StylableNumberArray, start: number, end: number, delay: number): Promise<number> {
    addStyleClassToArrayRange(array, start, end + 1, StyleClass.PartitionCurrentItem);
    await sleep(delay);

    let i: number = start - 1;
    let pivot: number = array.get(end);

    array.addStyleClassToItem(end, StyleClass.PivotItem);
    await sleep(delay);

    for (let j: number = start; j < end; ++j) {
        array.addStyleClassToItem(j, StyleClass.TmpItem);
        await sleep(delay);
        if (array.get(j) <= pivot) {
            ++i;
            swap(array, i, j);
        }
        array.removeStyleClassFromItem(j, StyleClass.TmpItem);
        await sleep(delay);
    }

    swap(array, i + 1, end);

    array.removeStyleClassFromItem(end, StyleClass.PivotItem);
    removeStyleClassFromArrayRange(array, start, end + 1, StyleClass.PartitionCurrentItem);
    await sleep(delay);

    return i + 1;
}


async function quicksortImpl(array: StylableNumberArray, start: number, end: number, delay: number): Promise<void> {
    if (start < end) {
        let index: number = await partition(array, start, end, delay);

        array.addStyleClassToItem(index, StyleClass.PartitionResultItem);
        await sleep(delay);

        await quicksortImpl(array, start, index - 1, delay);
        await quicksortImpl(array, index + 1, end, delay);

        array.removeStyleClassFromItem(index, StyleClass.PartitionResultItem);
    }
}


export async function quicksort(array: StylableNumberArray, delay: number = 1000): Promise<void> {
    await quicksortImpl(array, 0, array.length - 1, delay);
}


export async function selectionSort(array: StylableNumberArray, delay: number = 1000): Promise<void> {
    for (let i: number = 0; i < array.length - 1; ++i) {
        array.addStyleClassToItem(i, StyleClass.CurrentItem);
        await sleep(delay);

        let minIndex: number = i;

        array.addStyleClassToItem(minIndex, StyleClass.MinItem);
        await sleep(delay);

        for (let j: number = i + 1; j < array.length; ++j) {
            array.addStyleClassToItem(j, StyleClass.TmpItem);
            await sleep(delay);

            if (array.get(minIndex) > array.get(j)) {
                array.removeStyleClassFromItem(minIndex, StyleClass.MinItem);
                minIndex = j;
                array.addStyleClassToItem(minIndex, StyleClass.MinItem);
            }

            array.removeStyleClassFromItem(j, StyleClass.TmpItem);
            await sleep(delay);
        }

        await swap(array, minIndex, i, delay);

        array.removeStyleClassFromItem(minIndex, StyleClass.MinItem);
        array.removeStyleClassFromItem(i, StyleClass.CurrentItem);
        await sleep(delay);
    }
}
