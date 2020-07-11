import { HTMLFormat } from '../utils';


const algorithmsInfo = {
    selectionSort: {
        worstCaseComplexity: `O(${HTMLFormat.variable('n')}${HTMLFormat.power(2)})`,
        averageCaseComplexity: `O(${HTMLFormat.variable('n')}${HTMLFormat.power(2)})`,
        bestCaseComplexity: `O(${HTMLFormat.variable('n')}${HTMLFormat.power(2)})`,
        detailInfo: 'https://en.wikipedia.org/wiki/Selection_sort',
    },
    quicksort: {
        worstCaseComplexity: `O(${HTMLFormat.variable('n')}${HTMLFormat.power(2)})`,
        averageCaseComplexity: `O(${HTMLFormat.variable('n')}log${HTMLFormat.variable('n')})`,
        bestCaseComplexity: `O(${HTMLFormat.variable('n')}log${HTMLFormat.variable('n')})`,
        detailInfo: 'https://en.wikipedia.org/wiki/Quicksort',
    }
}


export function getInfoAsHTML(sortType: string): string {
    let info = algorithmsInfo[sortType];
    return `<p>Worst case complexity: ${info.worstCaseComplexity}</p>\
    <p>Average case complexity: ${info.averageCaseComplexity}</p>\
    <p>Best case complexity: ${info.bestCaseComplexity}</p>\
    <a href="${info.detailInfo}" target="_blank">Detail info</a>`;
}
