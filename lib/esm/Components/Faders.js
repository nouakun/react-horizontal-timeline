import React from "react";
import Radium from "radium";
import Color from "color";
import { asCSS } from "../helpers";
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
            _a.backgroundImage = "linear-gradient(to " + gradientDirection + ", " + styles.background + ", " + Color(styles.background).alpha(0).rgb() + ")",
            _a);
    },
};
/**
 * The markup Information for an element that produces the fade effect at the end of the timeline
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
var Faders = function (props) { return (React.createElement("ul", { style: { listStyle: "none" } },
    React.createElement("li", { style: asCSS([
            faderStyle.base,
            faderStyle.specific(props.styles, LEFT, RIGHT),
        ]) }),
    React.createElement("li", { style: asCSS([
            faderStyle.base,
            faderStyle.specific(props.styles, RIGHT, LEFT),
        ]) }))); };
export default Radium(Faders);
//# sourceMappingURL=Faders.js.map