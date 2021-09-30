import React from "react";
import Radium from "radium";
import Constants from "../Constants";
// icons
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { asCSS } from "../helpers";
// this handles the rendering part of the buttons that appear on either side of
// the timeline.
/**
 * These are the static styles for the buttons on either side of the timeline.
 *
 * @param {styles} styles The user-definded styles/the default styles
 * @param {boolean} active Hacky crap to get svg filling color right
 * @return {object} An object containing styles for the buttons
 * link: styles defined for the link elements i.e. the href tag.
 * icon: styles defined for the icon that appears on the button.
 * inactive: styles defined for when the icons are inactive.
 */
var buttonStyles = {
    link: function (p) { return ({
        position: "absolute",
        top: "49px",
        bottom: "auto",
        transform: "translateY(-50%)",
        height: 34,
        width: 34,
        borderRadius: "50%",
        border: "2px solid " + p.outline,
        overflow: "hidden",
        textIndent: "100%",
        whiteSpace: "nowrap",
        transition: "border-color 0.3s",
    }); },
    icon: function (styles, active) { return ({
        position: "absolute",
        left: 0,
        top: "50%",
        bottom: "auto",
        transform: "translateY(-50%)",
        height: 20,
        width: 29,
        overflow: "hidden",
        textIndent: "100%",
        whiteSpace: "nowrap",
        fill: active ? styles.foreground : styles.outline,
    }); },
    inactive: function (styles) { return ({
        color: styles.outline,
        cursor: "not-allowed",
        ":hover": {
            border: "2px solid " + styles.outline,
        },
    }); },
    active: function (styles) { return ({
        cursor: "pointer",
        ":hover": {
            border: "2px solid " + styles.foreground,
            color: styles.foreground,
        },
    }); },
};
/**
 * Markup for both the buttons (that translate the timeline left or right).
 *
 * @param  {object} props The info provided by the parent
 * @return {StatelessFunctionalReactComponent} The Markup info for both the buttons
 */
var HorizontalTimelineButtons = function (props) {
    var _a, _b;
    var buttonBackEnabled = Math.round(props.position) < 0;
    var buttonForwardEnabled = Math.round(props.position) > Math.round(props.maxPosition);
    // const baseStyles = [buttonStyles.link(props.styles)];
    var isRtl = props.isRtl;
    var NextIcon = isRtl ? FaAngleLeft : FaAngleRight;
    var BackIcon = isRtl ? FaAngleRight : FaAngleLeft;
    return (React.createElement("ul", { className: "buttons" },
        React.createElement("li", { className: "button-back " + (buttonBackEnabled ? "enabled" : "disabled"), key: isRtl ? Constants.RIGHT : Constants.LEFT, onClick: function () {
                return props.updateSlide(isRtl ? Constants.RIGHT : Constants.LEFT);
            }, style: asCSS([
                buttonStyles.link(props.styles),
                buttonBackEnabled
                    ? buttonStyles.active(props.styles)
                    : buttonStyles.inactive(props.styles),
                (_a = {}, _a[isRtl ? Constants.RIGHT : Constants.LEFT] = 0, _a),
            ]) },
            React.createElement(BackIcon, { style: buttonStyles.icon(props.styles, buttonBackEnabled) })),
        React.createElement("li", { className: "button-forward " + (buttonForwardEnabled ? "enabled" : "disabled"), key: isRtl ? Constants.LEFT : Constants.RIGHT, onClick: function () {
                return props.updateSlide(isRtl ? Constants.LEFT : Constants.RIGHT);
            }, style: asCSS([
                buttonStyles.link(props.styles),
                buttonForwardEnabled
                    ? buttonStyles.active(props.styles)
                    : buttonStyles.inactive(props.styles),
                (_b = {}, _b[isRtl ? Constants.LEFT : Constants.RIGHT] = 0, _b),
            ]) },
            React.createElement(NextIcon, { style: buttonStyles.icon(props.styles, buttonForwardEnabled) }))));
};
// Wrapping the buttons with Radium (so we get all the styling goodness)
export default Radium(HorizontalTimelineButtons);
//# sourceMappingURL=HorizontalTimelineButtons.js.map