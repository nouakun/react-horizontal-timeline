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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_motion_1 = require("react-motion");
var Events_1 = __importDefault(require("./Events"));
var EventLine_1 = __importDefault(require("./EventLine"));
var HorizontalTimelineButtons_1 = __importDefault(require("./HorizontalTimelineButtons"));
var Faders_1 = __importDefault(require("./Faders"));
var Constants_1 = __importDefault(require("../Constants"));
var radium_1 = __importDefault(require("radium"));
var helpers_1 = require("../helpers");
var EventsBar = /** @class */ (function (_super) {
    __extends(EventsBar, _super);
    function EventsBar(props) {
        var _this = _super.call(this, props) || this;
        _this.handleKeydown = function (event) {
            if (_this.props.isKeyboardEnabled) {
                if (event.keyCode === Constants_1.default.LEFT_KEY ||
                    event.keyCode === Constants_1.default.RIGHT_KEY) {
                    _this.updateSlide(Constants_1.default.KEYMAP[event.keyCode]);
                }
                else if (event.keyCode === Constants_1.default.UP_KEY) {
                    _this.props.indexClick(Math.min(_this.props.selectedIndex + 1, _this.props.events.length - 1));
                }
                else if (event.keyCode === Constants_1.default.DOWN_KEY) {
                    _this.props.indexClick(Math.max(_this.props.selectedIndex - 1, 0));
                }
            }
        };
        _this.handleTouchStart = function (event) {
            var touchObj = event.touches[0];
            _this.touch.coors.x = touchObj.pageX;
            _this.touch.coors.y = touchObj.pageY;
            _this.touch.isSwiping = false;
            _this.touch.started = true;
        };
        _this.handleTouchMove = function (event) {
            if (!_this.touch.started) {
                _this.handleTouchStart(event);
                return;
            }
            var touchObj = event.touches[0];
            var dx = Math.abs(_this.touch.coors.x - touchObj.pageX);
            var dy = Math.abs(_this.touch.coors.y - touchObj.pageY);
            var isSwiping = dx > dy && dx > _this.touch.threshold;
            if (isSwiping || dx > _this.touch.threshold || dy > _this.touch.threshold) {
                _this.touch.isSwiping = isSwiping;
                var dX = _this.touch.coors.x - touchObj.pageX; // amount scrolled
                _this.touch.coors.x = touchObj.pageX;
                _this.setState({
                    position: _this.state.position - dX,
                });
            }
            if (!_this.touch.isSwiping) {
                return;
            }
            // Prevent native scrolling
            event.preventDefault();
        };
        _this.handleTouchEnd = function () {
            // Make sure we are scrolled to a valid position
            _this.slideToPosition(_this.state.position);
            _this.touch.coors.x = 0;
            _this.touch.coors.y = 0;
            _this.touch.isSwiping = false;
            _this.touch.started = false;
        };
        /**
         * Slide the timeline to a specific position. This method wil automatically cap at 0 and the maximum possible position
         * @param {number} position: The position you want to slide to
         * @param props
         * @return {undefined} Modifies the value by which we translate the events bar
         */
        _this.slideToPosition = function (position, props) {
            if (props === void 0) { props = _this.props; }
            // the width of the timeline component between the two buttons (prev and next)
            var maxPosition = Math.min(props.visibleWidth - props.totalWidth, 0); // NEVER scroll to the right
            _this.setState({
                position: Math.max(Math.min(0, position), maxPosition),
                maxPosition: maxPosition,
            });
        };
        /**
         * This method translates the timeline by a certaing amount depending on if the direction passed
         * is left or right.
         *
         * @param {string} direction The direction towards which the timeline will translates
         * @param props
         * @return {undefined} Just modifies the value by which we need to translate the events bar in place
         */
        _this.updateSlide = function (direction, props) {
            if (props === void 0) { props = _this.props; }
            //  translate the timeline to the left('next')/right('prev')
            if (direction === Constants_1.default.RIGHT) {
                _this.slideToPosition(_this.props.isRtl
                    ? _this.state.position + props.visibleWidth - props.labelWidth
                    : _this.state.position - props.visibleWidth + props.labelWidth, props);
            }
            else if (direction === Constants_1.default.LEFT) {
                _this.slideToPosition(_this.props.isRtl
                    ? _this.state.position - props.visibleWidth + props.labelWidth
                    : _this.state.position + props.visibleWidth - props.labelWidth, props);
            }
        };
        _this.centerEvent = function (index, props) {
            if (props === void 0) { props = _this.props; }
            var event = props.events[index];
            _this.slideToPosition(-event.distance);
        };
        _this.state = {
            position: 0,
            maxPosition: Math.min(props.visibleWidth - props.totalWidth, 0),
        };
        _this.touch = {
            coors: {
                x: 0,
                y: 0,
            },
            isSwiping: false,
            started: false,
            threshold: 3,
        };
        return _this;
    }
    EventsBar.prototype.componentWillMount = function () {
        document.body.addEventListener("keydown", this.handleKeydown);
    };
    EventsBar.prototype.componentDidMount = function () {
        var selectedEvent = this.props.events[this.props.index];
        this.slideToPosition(-(selectedEvent.distance - this.props.visibleWidth / 2), this.props);
    };
    EventsBar.prototype.componentWillUnmount = function () {
        document.body.removeEventListener("keydown", this.handleKeydown);
    };
    EventsBar.prototype.componentWillReceiveProps = function (props) {
        var selectedEvent = props.events[props.index];
        var minVisible = -this.state.position; // Position is always negative!
        var maxVisible = minVisible + props.visibleWidth;
        if (selectedEvent.distance > minVisible + 10 &&
            selectedEvent.distance < maxVisible - 10) {
            //Make sure we are not outside the view
            this.slideToPosition(this.state.position, props);
        }
        else {
            //Try to center the selected index
            this.slideToPosition(-(selectedEvent.distance - props.visibleWidth / 2), props);
        }
    };
    EventsBar.prototype.render = function () {
        var _this = this;
        var _a = this.props, isTouchEnabled = _a.isTouchEnabled, index = _a.index, barPaddingLeft = _a.barPaddingLeft, barPaddingRight = _a.barPaddingRight, styles = _a.styles, totalWidth = _a.totalWidth, events = _a.events, width = _a.width, height = _a.height, fillingMotion = _a.fillingMotion, indexClick = _a.indexClick, labelWidth = _a.labelWidth;
        var _b = this.state, position = _b.position, maxPosition = _b.maxPosition;
        //  creating an array of list items that have an onClick handler into which
        //  passing the index of the clicked entity.
        // NOTE: Improve timeline dates handeling and eventsMinLapse handling
        var touchEvents = isTouchEnabled
            ? {
                onTouchStart: this.handleTouchStart,
                onTouchMove: this.handleTouchMove,
                onTouchEnd: this.handleTouchEnd,
            }
            : {};
        // filled value = distane from origin to the selected event
        var filledValue = events[index].distance - barPaddingLeft;
        var eventLineWidth = totalWidth - barPaddingLeft - barPaddingRight;
        return (react_1.default.createElement("div", __assign({ style: {
                width: width + "px",
                height: height + "px",
            } }, touchEvents),
            react_1.default.createElement("div", { className: "events-wrapper", style: {
                    position: "relative",
                    height: "100%",
                    margin: "0 40px",
                    overflow: "hidden",
                } },
                react_1.default.createElement(react_motion_1.Motion, { style: {
                        X: react_motion_1.spring(position, this.slidingMotion),
                    } }, function (_a) {
                    var _b;
                    var X = _a.X;
                    return (react_1.default.createElement("div", { className: "events", style: helpers_1.asCSS([
                            {
                                position: "absolute",
                                top: 49,
                                height: 2,
                                width: totalWidth,
                                WebkitTransform: "translate3d(" + (_this.props.isRtl ? X * -1 : X) + ", 0, 0)px",
                                transform: "translate3d(" + (_this.props.isRtl ? X * -1 : X) + "px, 0, 0)",
                            },
                            (_b = {}, _b[_this.props.isRtl ? Constants_1.default.RIGHT : Constants_1.default.LEFT] = 0, _b),
                        ]) },
                        react_1.default.createElement(EventLine_1.default, { left: barPaddingLeft, width: eventLineWidth, fillingMotion: fillingMotion, backgroundColor: styles.outline, isRtl: _this.props.isRtl }),
                        react_1.default.createElement(EventLine_1.default, { left: _this.props.barPaddingLeft, width: filledValue, fillingMotion: fillingMotion, backgroundColor: styles.foreground, isRtl: _this.props.isRtl }),
                        react_1.default.createElement(Events_1.default, { events: events, selectedIndex: index, styles: styles, handleDateClick: indexClick, labelWidth: labelWidth, isRtl: _this.props.isRtl })));
                })),
            react_1.default.createElement(Faders_1.default, { styles: this.props.styles }),
            react_1.default.createElement(HorizontalTimelineButtons_1.default, { maxPosition: maxPosition, position: position, styles: styles, updateSlide: this.updateSlide, isRtl: this.props.isRtl })));
    };
    return EventsBar;
}(react_1.default.Component));
exports.default = radium_1.default(EventsBar);
//# sourceMappingURL=EventsBar.js.map