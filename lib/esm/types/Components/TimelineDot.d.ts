import React from "react";
/**
 * Component Props type
 */
export declare type TimelineDotProps = {
    selected: number;
    index: number;
    date: string;
    onClick: (index: number) => void;
    label: string;
    labelWidth: number;
    distanceFromOrigin: number;
    styles: {
        foreground: string;
        outline: string;
    };
    isRtl: boolean;
};
/**
 * The markup for one single dot on the timeline
 *
 * @param {object} props The props passed down
 * @return {StatelessFunctionalReactComponent} The markup for a dot
 */
declare class TimelineDot extends React.Component<TimelineDotProps, {}> {
    __getDotStyles__: (dotType: string, key: string | void) => any[];
    render(): JSX.Element;
}
declare const _default: typeof TimelineDot;
export default _default;
