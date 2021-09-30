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
import React from "react";
import Radium from "radium";
import { asCSS } from "../helpers";
import Constants from "../Constants";
/**
 * The static/non-static styles Information for a single event dot on the timeline
 */
var dots = {
    /**
     * The style information for the clickable dates that apper floating over the timeline
     */
    links: {
        position: "absolute",
        bottom: 0,
        textAlign: "center",
        paddingBottom: 15,
    },
    /**
     * The base style information for the event dot that appers exactly on the timeline
     */
    base: {
        position: "absolute",
        bottom: -5,
        height: 12,
        width: 12,
        borderRadius: "50%",
        transition: "background-color 0.3s, border-color 0.3s",
        ":hover": {},
    },
    /**
     * future: The style information for the future dot (wrt selected).
     * @param {object} styles User passed styles ( foreground, background etc info
     */
    future: function (styles) { return ({
        backgroundColor: styles.background,
        // border: `2px solid ${styles.background}`,
        border: "2px solid " + styles.outline,
    }); },
    /**
     * past: The styles information for the past dot (wrt selected)
     * @param {object} styles User passed styles ( foreground, background etc info
     */
    past: function (styles) { return ({
        backgroundColor: styles.background,
        border: "2px solid " + styles.foreground,
    }); },
    /**
     * present: The styles information for the preset dot
     * @param {object} styles User passed styles ( foreground, background etc info
     */
    present: function (styles) { return ({
        backgroundColor: styles.foreground,
        border: "2px solid " + styles.foreground,
    }); },
};
/**
 * The markup for one single dot on the timeline
 *
 * @param {object} props The props passed down
 * @return {StatelessFunctionalReactComponent} The markup for a dot
 */
var TimelineDot = /** @class */ (function (_super) {
    __extends(TimelineDot, _super);
    function TimelineDot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__getDotStyles__ = function (dotType, key) {
            var hoverStyle = {
                backgroundColor: _this.props.styles.foreground,
                border: "2px solid " + _this.props.styles.foreground,
            };
            return [
                dots.base,
                { left: _this.props.labelWidth / 2 - dots.base.width / 2 },
                dots[dotType](_this.props.styles),
                Radium.getState(_this.state, key, ":hover") ||
                    Radium.getState(_this.state, "dot-dot", ":hover")
                    ? hoverStyle
                    : undefined,
            ];
        };
        return _this;
    }
    TimelineDot.prototype.render = function () {
        var _a;
        var _b = this.props, index = _b.index, onClick = _b.onClick, date = _b.date, distanceFromOrigin = _b.distanceFromOrigin, labelWidth = _b.labelWidth, isRtl = _b.isRtl;
        var dotType = "future";
        if (this.props.index < this.props.selected) {
            dotType = "past";
        }
        else if (this.props.index === this.props.selected) {
            dotType = "present";
        }
        return (React.createElement("li", { key: this.props.date, id: "timeline-dot-" + this.props.date, className: dotType + " dot-label", onClick: function () { return onClick(index); }, style: asCSS([
                dots.links,
                {
                    cursor: "pointer",
                    width: this.props.labelWidth,
                    ":hover": {},
                },
                (_a = {},
                    _a[isRtl ? Constants.RIGHT : Constants.LEFT] = isRtl
                        ? distanceFromOrigin - labelWidth / 2
                        : distanceFromOrigin - labelWidth / 2,
                    _a),
            ]) },
            this.props.label,
            React.createElement("span", { key: "dot-dot", style: asCSS(this.__getDotStyles__(dotType, date)) })));
    };
    return TimelineDot;
}(React.Component));
export default Radium(TimelineDot);
//# sourceMappingURL=TimelineDot.js.map