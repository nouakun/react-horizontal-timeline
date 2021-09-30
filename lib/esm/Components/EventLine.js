import React from "react";
import { Motion, spring } from "react-motion";
import Radium from "radium";
import { asCSS } from "../helpers";
import Constants from "../Constants";
/**
 * The markup Information for an event Line. You can stack multiple lines on top of eachother
 *
 * @param  {object} props The props from parent, styling and positioning
 * @return {StatelessFunctionalReactComponent} Markup Information for the event line.
 */
var EventLine = function (_a) {
    var left = _a.left, width = _a.width, fillingMotion = _a.fillingMotion, backgroundColor = _a.backgroundColor, isRtl = _a.isRtl;
    return (React.createElement(Motion, { style: {
            tWidth: spring(width, fillingMotion),
            tLeft: spring(left, fillingMotion),
        } }, function (_a) {
        var _b;
        var tWidth = _a.tWidth, tLeft = _a.tLeft;
        return (React.createElement("span", { "aria-hidden": "true", className: "timeline-eventline", style: asCSS([
                {
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    width: tWidth + "px",
                    transformOrigin: (isRtl ? Constants.RIGHT : Constants.LEFT) + " center",
                    backgroundColor: backgroundColor,
                },
                (_b = {}, _b[isRtl ? Constants.RIGHT : Constants.LEFT] = tLeft + "px", _b),
            ]) }));
    }));
};
export default Radium(EventLine);
//# sourceMappingURL=EventLine.js.map