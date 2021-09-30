"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TimelineDot_1 = __importDefault(require("./TimelineDot"));
/**
 * The markup Information for all the events on the horizontal timeline.
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
var Events = function (_a) {
    var events = _a.events, selectedIndex = _a.selectedIndex, styles = _a.styles, handleDateClick = _a.handleDateClick, labelWidth = _a.labelWidth, isRtl = _a.isRtl;
    return (react_1.default.createElement("ol", { className: "events-bar", style: {
            listStyle: "none",
        } }, events.map(function (event, index) { return (react_1.default.createElement(TimelineDot_1.default, { distanceFromOrigin: event.distance, label: event.label, date: event.date, index: index, key: index, onClick: handleDateClick, selected: selectedIndex, styles: styles, labelWidth: labelWidth, isRtl: isRtl })); })));
};
exports.default = Events;
//# sourceMappingURL=Events.js.map