import React from "react";
import TimelineDot from "./TimelineDot";
/**
 * The markup Information for all the events on the horizontal timeline.
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
var Events = function (_a) {
    var events = _a.events, selectedIndex = _a.selectedIndex, styles = _a.styles, handleDateClick = _a.handleDateClick, labelWidth = _a.labelWidth, isRtl = _a.isRtl;
    return (React.createElement("ol", { className: "events-bar", style: {
            listStyle: "none",
        } }, events.map(function (event, index) { return (React.createElement(TimelineDot, { distanceFromOrigin: event.distance, label: event.label, date: event.date, index: index, key: index, onClick: handleDateClick, selected: selectedIndex, styles: styles, labelWidth: labelWidth, isRtl: isRtl })); })));
};
export default Events;
//# sourceMappingURL=Events.js.map