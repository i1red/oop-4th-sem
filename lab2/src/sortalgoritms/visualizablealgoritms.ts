import { StylableNumberArray } from '../numberarray/numberarray';
import { StyleClass, VISUALIZABLE_SORT_ALGORITHM_DELAY } from '../settings';
import { sleep } from '../utils';


export interface VisualizableSortAlgorithm {
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


async function visualizableSwap(array: StylableNumberArray, i: number, j: number, delay: number = VISUALIZABLE_SORT_ALGORITHM_DELAY): Promise<void> {
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


async function visualizablePartition(array: StylableNumberArray, start: number, end: number, delay: number): Promise<number> {
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
            visualizableSwap(array, i, j);
        }
        array.removeStyleClassFromItem(j, StyleClass.TmpItem);
        await sleep(delay);
    }

    visualizableSwap(array, i + 1, end);

    array.removeStyleClassFromItem(end, StyleClass.PivotItem);
    removeStyleClassFromArrayRange(array, start, end + 1, StyleClass.PartitionCurrentItem);
    await sleep(delay);

    return i + 1;
}


async function visualizableQuicksortImpl(array: StylableNumberArray, start: number, end: number, delay: number): Promise<void> {
    if (start < end) {
        let index: number = await visualizablePartition(array, start, end, delay);

        array.addStyleClassToItem(index, StyleClass.PartitionResultItem);
        await sleep(delay);

        await visualizableQuicksortImpl(array, start, index - 1, delay);
        await visualizableQuicksortImpl(array, index + 1, end, delay);

        array.removeStyleClassFromItem(index, StyleClass.PartitionResultItem);
    }
}


export async function visualizableQuicksort(array: StylableNumberArray, delay: number = VISUALIZABLE_SORT_ALGORITHM_DELAY): Promise<void> {
    await visualizableQuicksortImpl(array, 0, array.length - 1, delay);
}


export async function visualizableSelectionSort(array: StylableNumberArray, delay: number = VISUALIZABLE_SORT_ALGORITHM_DELAY): Promise<void> {
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

        await visualizableSwap(array, minIndex, i, delay);

        array.removeStyleClassFromItem(minIndex, StyleClass.MinItem);
        array.removeStyleClassFromItem(i, StyleClass.CurrentItem);
        await sleep(delay);
    }
}
