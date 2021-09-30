import React from "react";
/**
 * Components propTypes
 */
export declare type EventsBarProps = {
    width: number;
    height: number;
    events: {
        distance: number;
        label: JSX.Element | string;
        date: string;
    }[];
    isTouchEnabled: boolean;
    isKeyboardEnabled: boolean;
    totalWidth: number;
    visibleWidth: number;
    index: number;
    styles: any;
    indexClick: (index: number) => void;
    labelWidth: number;
    fillingMotion: any;
    barPaddingRight: number;
    barPaddingLeft: number;
    selectedIndex: number;
    isRtl: boolean;
};
export declare type EventsBarStates = {
    position: number;
    maxPosition: number;
};
declare class EventsBar extends React.Component<EventsBarProps, EventsBarStates> {
    private touch;
    private slidingMotion;
    constructor(props: EventsBarProps);
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleKeydown: (event: any) => void;
    handleTouchStart: (event: any) => void;
    handleTouchMove: (event: any) => void;
    handleTouchEnd: () => void;
    componentWillReceiveProps(props: EventsBarProps): void;
    /**
     * Slide the timeline to a specific position. This method wil automatically cap at 0 and the maximum possible position
     * @param {number} position: The position you want to slide to
     * @param props
     * @return {undefined} Modifies the value by which we translate the events bar
     */
    slideToPosition: (position: number, props?: Readonly<EventsBarProps> & Readonly<{
        children?: React.ReactNode;
    }>) => void;
    /**
     * This method translates the timeline by a certaing amount depending on if the direction passed
     * is left or right.
     *
     * @param {string} direction The direction towards which the timeline will translates
     * @param props
     * @return {undefined} Just modifies the value by which we need to translate the events bar in place
     */
    updateSlide: (direction: string, props?: Readonly<EventsBarProps> & Readonly<{
        children?: React.ReactNode;
    }>) => void;
    centerEvent: (index: number, props?: Readonly<EventsBarProps> & Readonly<{
        children?: React.ReactNode;
    }>) => void;
    render(): JSX.Element;
}
declare const _default: typeof EventsBar;
export default _default;
