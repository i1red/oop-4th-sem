import { quicksort, selectionSort } from '../src/sortalgoritms/usualalgorithms';
import { BuiltInNumberArray } from '../src/numberarray/numberarray';
import { randomNumberArray } from '../src/utils';
import { expect } from 'chai';


describe('Test sort algorithms', () => {
    const arraySize = 2000;

    const testSetups = [
        { description: 'Test quicksort', algorithm: quicksort },
        { description: 'Test selection sort', algorithm: selectionSort },
    ];

    for (let testSetup of testSetups) {
        it(testSetup.description, () => {
            let initArray: Array<number> = randomNumberArray(arraySize, -arraySize, arraySize);

            let actualArray = new BuiltInNumberArray(initArray);
            testSetup.algorithm(actualArray);

            let expectedArray: Array<number> = initArray.sort((a: number, b: number) => a - b);

            for (let i = 0; i < arraySize; ++i) {
                expect(actualArray.get(i)).to.equal(expectedArray[i]);
            }
        });
    }
})
