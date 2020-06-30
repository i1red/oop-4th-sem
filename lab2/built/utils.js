function randomInteger(min = 0, max = Number.MAX_SAFE_INTEGER) {
    return min + Math.round((Math.random() * Number.MAX_SAFE_INTEGER)) % (max - min);
}
export function randomNumberArray(arraySize) {
    let result = Array(arraySize);
    for (let i = 0; i < result.length; ++i) {
        result[i] = randomInteger(0, 100);
    }
    return result;
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
