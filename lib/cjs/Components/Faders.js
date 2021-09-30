"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var radium_1 = __importDefault(require("radium"));
var colord_1 = require("colord");
var helpers_1 = require("../helpers");
var LEFT = "left";
var RIGHT = "right";
/**
 * Returns the styles that generate a fading effect on the edges of the timeline
 *
 * @param  {object} styles The styles (user-definded/default).Mainly Information about the background, foreground, etc.
 * @param  {string} position The position of the fader. Can only be left or right
 * @param  {string} gradientDirection The direction in which we want to generate fade effect
 * @return {object} The styleing Information for the left or right fader
 */
var faderStyle = {
    base: {
        top: "50%",
        position: "absolute",
        bottom: "auto",
        transform: "translateY(-50%)",
        height: "100%",
        width: 20,
        overflow: "hidden",
    },
    specific: function (styles, position, gradientDirection) {
        var _a;
        return (_a = {},
            _a[position] = 40,
            _a.backgroundImage = "linear-gradient(to " + gradientDirection + ", " + styles.background + ", " + colord_1.colord(styles.background).alpha(0).toRgbString() + ")",
            _a);
    },
};
/**
 * The markup Information for an element that produces the fade effect at the end of the timeline
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
var Faders = function (props) {
    var styles = props.styles;
    return (react_1.default.createElement("ul", { className: "timeline-faders", style: { listStyle: "none" } },
        react_1.default.createElement("li", { style: helpers_1.asCSS([
                faderStyle.base,
                faderStyle.specific(styles, LEFT, RIGHT),
            ]) }),
        react_1.default.createElement("li", { style: helpers_1.asCSS([
                faderStyle.base,
                faderStyle.specific(styles, RIGHT, LEFT),
            ]) })));
};
exports.default = radium_1.default(Faders);
//# sourceMappingURL=Faders.js.map