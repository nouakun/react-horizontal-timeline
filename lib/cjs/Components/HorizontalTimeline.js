"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// Decorators
var radium_1 = __importDefault(require("radium"));
/** @ts-ignore */
var react_dimensions_1 = __importDefault(require("react-dimensions"));
// Components
var EventsBar_1 = __importDefault(require("./EventsBar"));
// Helpers and constansts
var helpers_1 = require("../helpers");
var Constants_1 = __importDefault(require("../Constants"));
/**
 * Default method to convert a date to a string label
 * @param {string} date The string representation of a date
 * @return {string} The formatted date string
 */
var defaultGetLabel = function (date) { return date; };
/*
 * is the Horizontal Timeline. component expects an array of dates
 * just as strings (e.g. 1993-01-01) and layes them horizontaly on the the screen
 * also expects a callback which is activated when that particular index is
 * clicked passing that index along
 */
var HorizontalTimeline = /** @class */ (function (_super) {
    __extends(HorizontalTimeline, _super);
    function HorizontalTimeline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HorizontalTimeline.prototype.render = function () {
        var _a = this.props, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, values = _a.values, labelWidth = _a.labelWidth, minEventPadding = _a.minEventPadding, maxEventPadding = _a.maxEventPadding, linePadding = _a.linePadding, getLabel = _a.getLabel, isTouchEnabled = _a.isTouchEnabled, styles = _a.styles, fillingMotion = _a.fillingMotion, indexClick = _a.indexClick, index = _a.index;
        if (!containerWidth) {
            //As long as we do not know the width of our container, do not render anything!
            return false;
        }
        // Convert the date strings to actual date objects
        var dates = values.map(function (value) { return value; });
        // Calculate the distances for all events
        var distances = helpers_1.cummulativeSeperation(dates, labelWidth, minEventPadding, maxEventPadding, linePadding);
        // Convert the distances and dates to events
        var events = distances.map(function (distance, index) { return ({
            distance: distance,
            label: getLabel(values[index], index),
            date: values[index],
        }); });
        var visibleWidth = containerWidth - 80;
        var totalWidth = Math.max(events[events.length - 1].distance + this.props.linePadding, visibleWidth);
        var barPaddingRight = 0;
        var barPaddingLeft = 0;
        if (!this.props.isOpenEnding) {
            barPaddingRight = totalWidth - events[events.length - 1].distance;
        }
        if (!this.props.isOpenBeginning) {
            barPaddingLeft = events[0].distance;
        }
        return (react_1.default.createElement(EventsBar_1.default, { width: containerWidth, height: containerHeight, events: events, isTouchEnabled: isTouchEnabled, totalWidth: totalWidth, visibleWidth: visibleWidth, index: this.props.index, styles: styles, indexClick: indexClick, labelWidth: labelWidth, fillingMotion: fillingMotion, barPaddingRight: barPaddingRight, barPaddingLeft: barPaddingLeft, selectedIndex: index, isKeyboardEnabled: isTouchEnabled }));
    };
    HorizontalTimeline.defaultProps = {
        // --- EVENTS ---
        getLabel: defaultGetLabel,
        // --- POSITIONING ---
        minEventPadding: Constants_1.default.MIN_EVENT_PADDING,
        maxEventPadding: Constants_1.default.MAX_EVENT_PADDING,
        linePadding: Constants_1.default.TIMELINE_PADDING,
        labelWidth: Constants_1.default.DATE_WIDTH,
        // --- STYLING ---
        styles: {
            outline: "#dfdfdf",
            background: "#f8f8f8",
            foreground: "#7b9d6f",
        },
        fillingMotion: {
            stiffness: 150,
            damping: 25,
        },
        slidingMotion: {
            stiffness: 150,
            damping: 25,
        },
        isOpenEnding: true,
        isOpenBeginning: true,
        // --- INTERACTION ---
        isTouchEnabled: true,
        isKeyboardEnabled: true,
    };
    return HorizontalTimeline;
}(react_1.default.Component));
exports.default = radium_1.default(react_dimensions_1.default({ elementResize: true })(HorizontalTimeline));
//# sourceMappingURL=HorizontalTimeline.js.map