import { StyleClass } from './settings.js';


function randomInteger(min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number {
    return min + Math.round((Math.random() * Number.MAX_SAFE_INTEGER)) % (max - min);
}


export function randomNumberArray(arraySize: number): Array<number> {
    let result = Array<number>(arraySize);
    for (let i: number = 0; i < result.length; ++i) {
        result[i] = randomInteger(0, 100);
    }
    return result;
}


export function sleep(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}


export namespace HTMLFormat {
    export function variable(variable: string): string {
        return `<var>${variable}</var>`;
    }

    export function power(power: number): string {
        return `<span class="${StyleClass.Power}">${power}</span>`
    }
}
