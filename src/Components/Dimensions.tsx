import React, {RefObject} from 'react'
import onElementResize from 'element-resize-event'
import {debounce as _debounce} from 'lodash'

function defaultGetDimensions(element: Element) {
    return [element.clientWidth, element.clientHeight]
}

/**
 * Wraps a react component and adds properties `containerHeight` and
 * `containerWidth`. Useful for responsive design. Properties update on
 * window resize. **Note** that the parent element must have either a
 * height or a width, or nothing will be rendered
 *
 * Can be used as a
 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
 * (see examples)
 *
 * @param {object} [options]
 * @param {function} [options.getHeight] A function that is passed an element and returns element
 * height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
 * @param {function} [options.getWidth]  A function that is passed an element and returns element
 * width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
 * @param {number} [options.debounce] Optionally debounce the `onResize` callback function by
 * supplying the delay time in milliseconds. This will prevent excessive dimension
 * updates. See
 * https://lodash.com/docs#debounce for more information. Defaults to `0`, which disables debouncing.
 * @param {object} [options.debounceOpts] Options to pass to the debounce function. See
 * https://lodash.com/docs#debounce for all available options. Defaults to `{}`.
 * @param {object} [options.containerStyle] A style object for the `<div>` that will wrap your component.
 * The dimensions of this `div` are what are passed as props to your component. The default style is
 * `{ width: '100%', height: '100%', padding: 0, border: 0 }` which will cause the `div` to fill its
 * parent in most cases. If you are using a flexbox layout you will want to change this default style.
 * @param {string} [options.className] Control the class name set on the wrapper `<div>`
 * @param {boolean} [options.elementResize=false] Set true to watch the wrapper `div` for changes in
 * size which are not a result of window resizing - e.g. changes to the flexbox and other layout.
 * @return {function}                   A higher-order component that can be
 * used to enhance a react component `Dimensions()(MyComponent)`
 *
 * @example
 * // ES2015
 * import React from 'react'
 * import Dimensions from 'react-dimensions'
 *
 * class MyComponent extends React.Component {
 *   render() (
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )
 * }
 *
 * export default Dimensions()(MyComponent) // Enhanced component
 *
 * @example
 * // ES5
 * var React = require('react')
 * var Dimensions = require('react-dimensions')
 *
 * var MyComponent = React.createClass({
 *   render: function() {(
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )}
 * }
 *
 * module.exports = Dimensions()(MyComponent) // Enhanced component
 *
 */
type DimensionsHOCStates = {
    containerWidth: number;
    containerHeight: number
}

type DimensionsProps = {
    getDimensions?: (element: Element) => number[];
    debounce?: number;
    debounceOpts?: any;
    elementResize?: boolean

}
export default function Dimensions({
                                       getDimensions = defaultGetDimensions, debounce = 0,
                                       debounceOpts = {},
                                       elementResize = false
                                   }: DimensionsProps) {
    return (ComposedComponent: any) => {
        return class DimensionsHOC extends React.Component<{}, DimensionsHOCStates> {
            rqf: any;
            wrapper: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>()
            _parent: (Element) | undefined | null;


            constructor(props: {}) {
                super(props);

                if (!this.wrapper) {
                    throw new Error('Cannot find wrapper div')
                }

                this._parent = this.wrapper.current?.parentElement ? this.wrapper.current?.parentElement : null;

                this.updateDimensionsImmediate()

                if (elementResize) {
                    // Experimental: `element-resize-event` fires when an element resizes.
                    // It attaches its own window resize listener and also uses
                    // requestAnimationFrame, so we can just call `this.updateDimensions`.
                    onElementResize(this._parent!, this.updateDimensions)
                } else {
                    this.getWindow().addEventListener('resize', this.onResize, false)
                }

            }

            updateDimensionsImmediate = () => {
                const dimensions = getDimensions(this._parent!)

                if (dimensions[0] !== this.state.containerWidth ||
                    dimensions[1] !== this.state.containerHeight) {
                    this.setState({
                        containerWidth: dimensions[0],
                        containerHeight: dimensions[1]
                    })
                }
            }

            // Optionally-debounced updateDimensions callback
            updateDimensions = debounce === 0 ? this.updateDimensionsImmediate
                : _debounce(this.updateDimensionsImmediate, debounce, debounceOpts)

            onResize = () => {
                if (this.rqf) return
                this.rqf = this.getWindow().requestAnimationFrame(() => {
                    this.rqf = null
                    this.updateDimensions()
                })
            }

            // If the component is mounted in a different window to the javascript
            // context, as with https://github.com/JakeGinnivan/react-popout
            // then the `window` global will be different from the `window` that
            // contains the component.
            // Depends on `defaultView` which is not supported <IE9
            getWindow() {
                return window;
            }

            componentDidMount() {
            }

            componentWillUnmount() {
                this.getWindow().removeEventListener('resize', this.onResize)
                // TODO: remote element-resize-event listener.
                // pending https://github.com/KyleAMathews/element-resize-event/issues/2
            }

            /**
             * Returns the underlying wrapped component instance.
             * Useful if you need to access a method or property of the component
             * passed to react-dimensions.
             *
             * @return {object} The rendered React component
             **/
            getWrappedInstance() {
                return this.refs.wrappedInstance
            }

            render() {
                const {containerWidth, containerHeight} = this.state
                if (this._parent && !containerWidth && !containerHeight) {
                    // only trigger a warning about the wrapper div if we already have a reference to it
                    console.warn('Wrapper div has no height or width, try overriding style with `containerStyle` option')
                }
                const wrapperStyle = {
                    overflow: 'visible',
                    height: 0,
                    width: 0
                }

                const {state, props, updateDimensions} = this;
                return (
                    <div style={wrapperStyle} ref={this.wrapper}>
                        {(containerWidth || containerHeight) &&
                        <ComposedComponent
                            {...state}
                            {...props}
                            updateDimensions={updateDimensions}
                            ref='wrappedInstance'
                        />
                        }
                    </div>
                )
            }
        }
    }
}
