import { visualizableQuicksort, visualizableSelectionSort, VisualizableSortAlgorithm as VisualizableSortAlgorithm } from './visualizablealgoritms';
import { HTMLFormat } from '../utils';


interface SortAlgorithmDescription {
    worstCaseComplexity: string;
    averageCaseComplexity: string;
    bestCaseComplexity: string;
    detailInfoLink: string;
}


export class SortAlgorithmInfo {
    name: string;
    visualizableImplementation: VisualizableSortAlgorithm;
    description: SortAlgorithmDescription;

    constructor(name: string, visualizableImplementation: VisualizableSortAlgorithm, info: SortAlgorithmDescription) {
        this.name = name;
        this.visualizableImplementation = visualizableImplementation;
        this.description = info;
    }

    descriptionToHTML(): string {
        return `<p>Worst case complexity: ${this.description.worstCaseComplexity}</p>\
        <p>Average case complexity: ${this.description.averageCaseComplexity}</p>\
        <p>Best case complexity: ${this.description.bestCaseComplexity}</p>\
        <a href="${this.description.detailInfoLink}" target="_blank">Detail info</a>`;
    }
}


interface SortAlgorithmsInfoContainer {
    [field: string]: SortAlgorithmInfo;
}


export const sortAlgorithmsInfo: SortAlgorithmsInfoContainer = {
    selectionSort: new SortAlgorithmInfo(
        'Selection sort',
        visualizableSelectionSort,
        {
            worstCaseComplexity: `O(${HTMLFormat.variable('n')}${HTMLFormat.power(2)})`,
            averageCaseComplexity: `O(${HTMLFormat.variable('n')}${HTMLFormat.power(2)})`,
            bestCaseComplexity: `O(${HTMLFormat.variable('n')}${HTMLFormat.power(2)})`,
            detailInfoLink: 'https://en.wikipedia.org/wiki/Selection_sort',
        }
    ),
    quicksort: new SortAlgorithmInfo(
        'Quicksort',
        visualizableQuicksort,
        {
            worstCaseComplexity: `O(${HTMLFormat.variable('n')}${HTMLFormat.power(2)})`,
            averageCaseComplexity: `O(${HTMLFormat.variable('n')}log${HTMLFormat.variable('n')})`,
            bestCaseComplexity: `O(${HTMLFormat.variable('n')}log${HTMLFormat.variable('n')})`,
            detailInfoLink: 'https://en.wikipedia.org/wiki/Quicksort',
        }
    ),
}
