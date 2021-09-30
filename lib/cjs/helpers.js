"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asCSS = exports.cummulativeSeperation = exports.dateDistanceExtremes = exports.zip = exports.daydiff = void 0;
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
exports.daydiff = function (first, second) {
    return Math.round(second - first);
};
/**
 * Takes a list of lists and zips them together (size should be the same).
 *
 * e.g. zip([['row0col0', 'row0col1', 'row0col2'], ['row1col0', 'row1col1', 'row1col2']]);
 * = [["row0col0","row1col0"], ["row0col1","row1col1"], ["row0col2","row1col2"]]
 * @param {array} rows An array (of size 2) of arrays (of equal size).
 * @return {array} An array (of size of either array in param) of arrays (of size 2)
 */
exports.zip = function (rows) {
    return rows.map(function (_, index) { return rows.map(function (row) { return row[index]; }); });
};
/**
 * Determines the minimum and maximum distance between a list of dates
 * @param {array} dates The array containing all the dates
 * @return {{min: number, max: number}} The minimum and maximum distances
 */
exports.dateDistanceExtremes = function (dates) {
    // determine the minimum distance among events
    var datePairs = exports.zip([dates.slice(0, -1), dates.slice(1)]);
    var dateDistances = datePairs.map(function (_a) {
        var x = _a[0], y = _a[1];
        return exports.daydiff(x.length, y.length);
    });
    // return the minimum distance between two dates but considering that all dates
    // are the same then return the provided minimum seperation.
    return {
        min: Math.min.apply(null, dateDistances),
        max: Math.max.apply(null, dateDistances),
    };
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
// the interface for this function is pure
exports.cummulativeSeperation = function (dates, labelWidth, minEventPadding, maxEventPadding, startPadding) {
    // using dynamic programming to set up the distance from the origin of the timeline.
    var distances = new Array(dates.length);
    distances[0] = startPadding;
    // Calculating the minimum seperation between events
    var dateExtremes = exports.dateDistanceExtremes(dates);
    var datesDiff = dateExtremes.max - dateExtremes.min;
    var paddingDiff = maxEventPadding - minEventPadding;
    // const halfLabel = labelWidth / 2;
    for (var index = 1; index < distances.length; index += 1) {
        var distance = exports.daydiff(dates[index - 1].length, dates[index].length);
        // relative spacing according to min and max seperation
        var seperation = datesDiff === 0
            ? maxEventPadding
            : Math.round(((distance - dateExtremes.min) * paddingDiff) / datesDiff +
                minEventPadding);
        // the distance_from_origin(n) = distance_from_origin(n-1) + distance between n and n - 1.
        distances[index] = distances[index - 1] + labelWidth + seperation;
    }
    return distances;
};
function asCSS(styles) {
    return styles;
}
exports.asCSS = asCSS;
//# sourceMappingURL=helpers.js.map