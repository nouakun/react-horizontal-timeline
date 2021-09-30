import { CSSProperties } from "react";
/**
 * This file contains some helper functions which are stateless (provide a pure interface)
 * and are used by the timeline component.
 */
/**
 * Differance between two dates
 *
 * @param  {Date} first Date of the first event
 * @param  {Date} second Date of the second event
 * @return {number} Differance between the two dates
 */
export declare const daydiff: (first: number, second: number) => number;
/**
 * Takes a list of lists and zips them together (size should be the same).
 *
 * e.g. zip([['row0col0', 'row0col1', 'row0col2'], ['row1col0', 'row1col1', 'row1col2']]);
 * = [["row0col0","row1col0"], ["row0col1","row1col1"], ["row0col2","row1col2"]]
 * @param {array} rows An array (of size 2) of arrays (of equal size).
 * @return {array} An array (of size of either array in param) of arrays (of size 2)
 */
export declare const zip: (rows: string[][]) => string[][];
/**
 * Determines the minimum and maximum distance between a list of dates
 * @param {array} dates The array containing all the dates
 * @return {{min: number, max: number}} The minimum and maximum distances
 */
export declare const dateDistanceExtremes: (dates: string[]) => {
    min: number;
    max: number;
};
/**
 * Given dates and some bounds returns an array of positioning information w.r.t. some origin for
 * that set of dates.
 *
 * @param {dates} the array containing dates the dates
 * @param {number} labelWidth The width the label is going to use
 * @param {number} minEventPadding The minimum padding between events.
 * @param {number} maxEventPadding The maximum padding between events.
 * @param {number} startPadding The padding at the beginning of the timeline
 * @return {array} positioning information for dates from a given origin point
 */
export declare const cummulativeSeperation: any;
/**
 * Fix raduim type issue
 * @see https://github.com/FormidableLabs/radium/issues/995#issuecomment-426905002
 */
declare type RadiumStyleProp = CSSProperties | undefined | null | boolean;
export declare function asCSS(styles: RadiumStyleProp | RadiumStyleProp[]): CSSProperties;
export {};
