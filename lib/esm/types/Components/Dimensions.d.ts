import React, { RefObject } from 'react';
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
declare type DimensionsHOCStates = {
    containerWidth: number;
    containerHeight: number;
};
declare type DimensionsProps = {
    getDimensions?: (element: Element) => number[];
    debounce?: number;
    debounceOpts?: any;
    elementResize?: boolean;
};
export default function Dimensions({ getDimensions, debounce, debounceOpts, elementResize }: DimensionsProps): (ComposedComponent: any) => {
    new (props: {}): {
        rqf: any;
        wrapper: RefObject<HTMLDivElement>;
        _parent: (Element) | undefined | null;
        updateDimensionsImmediate: () => void;
        updateDimensions: () => void;
        onResize: () => void;
        getWindow(): Window & typeof globalThis;
        componentDidMount(): void;
        componentWillUnmount(): void;
        /**
         * Returns the underlying wrapped component instance.
         * Useful if you need to access a method or property of the component
         * passed to react-dimensions.
         *
         * @return {object} The rendered React component
         **/
        getWrappedInstance(): React.ReactInstance;
        render(): JSX.Element;
        context: any;
        setState<K extends "containerWidth" | "containerHeight">(state: DimensionsHOCStates | ((prevState: Readonly<DimensionsHOCStates>, props: Readonly<{}>) => DimensionsHOCStates | Pick<DimensionsHOCStates, K> | null) | Pick<DimensionsHOCStates, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{}> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<DimensionsHOCStates>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<DimensionsHOCStates>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<DimensionsHOCStates>): any;
        componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<DimensionsHOCStates>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<DimensionsHOCStates>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<DimensionsHOCStates>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
export {};
