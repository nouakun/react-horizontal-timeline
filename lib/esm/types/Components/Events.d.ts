import React from "react";
/**
 * Component propTypes
 */
export declare type EventsProps = {
    events: {
        distance: number;
        label: JSX.Element | string;
        date: string;
    }[];
    selectedIndex: number;
    handleDateClick: (index: number) => void;
    labelWidth: number;
    styles?: any;
    isRtl: boolean;
};
/**
 * The markup Information for all the events on the horizontal timeline.
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
declare const Events: React.FC<EventsProps>;
export default Events;
