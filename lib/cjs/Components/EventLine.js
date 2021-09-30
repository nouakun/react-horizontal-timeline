"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_motion_1 = require("react-motion");
var radium_1 = __importDefault(require("radium"));
var helpers_1 = require("../helpers");
var Constants_1 = __importDefault(require("../Constants"));
/**
 * The markup Information for an event Line. You can stack multiple lines on top of eachother
 *
 * @param  {object} props The props from parent, styling and positioning
 * @return {StatelessFunctionalReactComponent} Markup Information for the event line.
 */
var EventLine = function (_a) {
    var left = _a.left, width = _a.width, fillingMotion = _a.fillingMotion, backgroundColor = _a.backgroundColor, isRtl = _a.isRtl;
    return (react_1.default.createElement(react_motion_1.Motion, { style: {
            tWidth: react_motion_1.spring(width, fillingMotion),
            tLeft: react_motion_1.spring(left, fillingMotion),
        } }, function (_a) {
        var _b;
        var tWidth = _a.tWidth, tLeft = _a.tLeft;
        return (react_1.default.createElement("span", { "aria-hidden": "true", className: "timeline-eventline", style: helpers_1.asCSS([
                {
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    width: tWidth + "px",
                    transformOrigin: (isRtl ? Constants_1.default.RIGHT : Constants_1.default.LEFT) + " center",
                    backgroundColor: backgroundColor,
                },
                (_b = {}, _b[isRtl ? Constants_1.default.RIGHT : Constants_1.default.LEFT] = tLeft + "px", _b),
            ]) }));
    }));
};
exports.default = radium_1.default(EventLine);
//# sourceMappingURL=EventLine.js.map