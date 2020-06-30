function swap(array, i, j) {
    if (i !== j) {
        let tmp = array.get(i);
        array.set(i, array.get(j));
        array.set(j, tmp);
    }
}
function partition(array, start, end) {
    let i = start - 1;
    let pivot = array.get(end);
    for (let j = start; j < end; ++j) {
        if (array.get(j) <= pivot) {
            ++i;
            swap(array, i, j);
        }
    }
    swap(array, i + 1, end);
    return i + 1;
}
function quicksortImpl(array, start, end) {
    if (start < end) {
        let index = partition(array, start, end);
        quicksortImpl(array, start, index - 1);
        quicksortImpl(array, index + 1, end);
    }
}
export function quicksort(array) {
    quicksortImpl(array, 0, array.length - 1);
}
export function selectionSort(array) {
    for (let i = 0; i < array.length - 1; ++i) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; ++j) {
            if (array.get(minIndex) > array.get(j)) {
                minIndex = j;
            }
        }
        swap(array, minIndex, i);
    }
}
