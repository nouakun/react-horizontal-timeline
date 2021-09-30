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
import React from 'react';
import onElementResize from 'element-resize-event';
import { debounce as _debounce } from 'lodash';
function defaultGetDimensions(element) {
    return [element.clientWidth, element.clientHeight];
}
export default function Dimensions(_a) {
    var _b = _a.getDimensions, getDimensions = _b === void 0 ? defaultGetDimensions : _b, _c = _a.debounce, debounce = _c === void 0 ? 0 : _c, _d = _a.debounceOpts, debounceOpts = _d === void 0 ? {} : _d, _e = _a.elementResize, elementResize = _e === void 0 ? false : _e;
    return function (ComposedComponent) {
        return /** @class */ (function (_super) {
            __extends(DimensionsHOC, _super);
            function DimensionsHOC(props) {
                var _a, _b;
                var _this = _super.call(this, props) || this;
                _this.wrapper = React.createRef();
                _this.updateDimensionsImmediate = function () {
                    var dimensions = getDimensions(_this._parent);
                    if (dimensions[0] !== _this.state.containerWidth ||
                        dimensions[1] !== _this.state.containerHeight) {
                        _this.setState({
                            containerWidth: dimensions[0],
                            containerHeight: dimensions[1]
                        });
                    }
                };
                // Optionally-debounced updateDimensions callback
                _this.updateDimensions = debounce === 0 ? _this.updateDimensionsImmediate
                    : _debounce(_this.updateDimensionsImmediate, debounce, debounceOpts);
                _this.onResize = function () {
                    if (_this.rqf)
                        return;
                    _this.rqf = _this.getWindow().requestAnimationFrame(function () {
                        _this.rqf = null;
                        _this.updateDimensions();
                    });
                };
                if (!_this.wrapper) {
                    throw new Error('Cannot find wrapper div');
                }
                _this._parent = ((_a = _this.wrapper.current) === null || _a === void 0 ? void 0 : _a.parentElement) ? (_b = _this.wrapper.current) === null || _b === void 0 ? void 0 : _b.parentElement : null;
                _this.updateDimensionsImmediate();
                if (elementResize) {
                    // Experimental: `element-resize-event` fires when an element resizes.
                    // It attaches its own window resize listener and also uses
                    // requestAnimationFrame, so we can just call `this.updateDimensions`.
                    onElementResize(_this._parent, _this.updateDimensions);
                }
                else {
                    _this.getWindow().addEventListener('resize', _this.onResize, false);
                }
                return _this;
            }
            // If the component is mounted in a different window to the javascript
            // context, as with https://github.com/JakeGinnivan/react-popout
            // then the `window` global will be different from the `window` that
            // contains the component.
            // Depends on `defaultView` which is not supported <IE9
            DimensionsHOC.prototype.getWindow = function () {
                return window;
            };
            DimensionsHOC.prototype.componentDidMount = function () {
            };
            DimensionsHOC.prototype.componentWillUnmount = function () {
                this.getWindow().removeEventListener('resize', this.onResize);
                // TODO: remote element-resize-event listener.
                // pending https://github.com/KyleAMathews/element-resize-event/issues/2
            };
            /**
             * Returns the underlying wrapped component instance.
             * Useful if you need to access a method or property of the component
             * passed to react-dimensions.
             *
             * @return {object} The rendered React component
             **/
            DimensionsHOC.prototype.getWrappedInstance = function () {
                return this.refs.wrappedInstance;
            };
            DimensionsHOC.prototype.render = function () {
                var _a = this.state, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight;
                if (this._parent && !containerWidth && !containerHeight) {
                    // only trigger a warning about the wrapper div if we already have a reference to it
                    console.warn('Wrapper div has no height or width, try overriding style with `containerStyle` option');
                }
                var wrapperStyle = {
                    overflow: 'visible',
                    height: 0,
                    width: 0
                };
                var _b = this, state = _b.state, props = _b.props, updateDimensions = _b.updateDimensions;
                return (React.createElement("div", { style: wrapperStyle, ref: this.wrapper }, (containerWidth || containerHeight) &&
                    React.createElement(ComposedComponent, __assign({}, state, props, { updateDimensions: updateDimensions, ref: 'wrappedInstance' }))));
            };
            return DimensionsHOC;
        }(React.Component));
    };
}
//# sourceMappingURL=Dimensions.js.map