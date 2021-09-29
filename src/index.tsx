import React from "react";

// Decorators
import Radium from "radium";

/** @ts-ignore */
import dimensions from "react-dimensions";

// Components
import EventsBar from "./EventsBar";

// Helpers and constansts
import {cummulativeSeperation} from "../helpers";

import Constants from "../Constants";

export interface HorizontalTimelineProps {
    // --- EVENTS ---
    // Selected index
    index: number;
    // Array containing the sorted date strings
    values: string[];
    // Function that takes the index of the array as argument
    indexClick: (index: number) => void;
    // Function to calculate the label based on the date string
    getLabel?: (date: string, index: number) => string;
    // --- POSITIONING ---
    // the minimum padding between events
    minEventPadding?: number;
    // The maximum padding between events
    maxEventPadding?: number;
    // Padding at the front and back of the line
    linePadding?: number;
    // The width of the label
    labelWidth?: number;
    // --- STYLING ---
    styles?: any;
    fillingMotion?: any;
    slidingMotion?: any;
    isOpenEnding?: boolean;
    isOpenBeginning?: boolean;
    // --- INTERACTION ---
    isTouchEnabled?: boolean;
    isKeyboardEnabled?: boolean;
    containerWidth?: number;
    containerHeight?: number;
}


/**
 * Default method to convert a date to a string label
 * @param {string} date The string representation of a date
 * @return {string} The formatted date string
 */
const defaultGetLabel = (date: string) => date;

/*
 * is the Horizontal Timeline. component expects an array of dates
 * just as strings (e.g. 1993-01-01) and layes them horizontaly on the the screen
 * also expects a callback which is activated when that particular index is
 * clicked passing that index along
 */
class HorizontalTimeline extends React.Component<HorizontalTimelineProps> {
    static defaultProps = {
        // --- EVENTS ---
        getLabel: defaultGetLabel,
        // --- POSITIONING ---
        minEventPadding: Constants.MIN_EVENT_PADDING,
        maxEventPadding: Constants.MAX_EVENT_PADDING,
        linePadding: Constants.TIMELINE_PADDING,
        labelWidth: Constants.DATE_WIDTH,
        // --- STYLING ---
        styles: {
            outline: "#dfdfdf",
            background: "#f8f8f8",
            foreground: "#7b9d6f",
        },
        fillingMotion: {
            stiffness: 150,
            damping: 25,
        },
        slidingMotion: {
            stiffness: 150,
            damping: 25,
        },
        isOpenEnding: true,
        isOpenBeginning: true,
        // --- INTERACTION ---
        isTouchEnabled: true,
        isKeyboardEnabled: true,

    }

    render() {

        const {
            containerWidth,
            containerHeight,
            values,
            labelWidth,
            minEventPadding,
            maxEventPadding,
            linePadding,
            getLabel,
            isTouchEnabled,
            styles,
            fillingMotion,
            indexClick,
            index,
        } = this.props;

        if (!containerWidth) {
            //As long as we do not know the width of our container, do not render anything!
            return false;
        }

        // Convert the date strings to actual date objects
        const dates = values.map((value) => value);
        // Calculate the distances for all events
        const distances = cummulativeSeperation(
            dates,
            labelWidth,
            minEventPadding,
            maxEventPadding,
            linePadding
        );

        // Convert the distances and dates to events
        const events = distances.map((distance: number, index: number) => ({
            distance,
            label: getLabel!(values[index], index),
            date: values[index],
        }));

        const visibleWidth = containerWidth - 80;

        const totalWidth = Math.max(
            events[events.length - 1].distance + this.props.linePadding,
            visibleWidth
        );

        let barPaddingRight = 0;
        let barPaddingLeft = 0;
        if (!this.props.isOpenEnding) {
            barPaddingRight = totalWidth - events[events.length - 1].distance;
        }
        if (!this.props.isOpenBeginning) {
            barPaddingLeft = events[0].distance;
        }

        return (
            <EventsBar
                width={containerWidth!}
                height={containerHeight!}
                events={events}
                isTouchEnabled={isTouchEnabled!}
                totalWidth={totalWidth}
                visibleWidth={visibleWidth}
                index={this.props.index}
                styles={styles}
                indexClick={indexClick}
                labelWidth={labelWidth!}
                fillingMotion={fillingMotion}
                barPaddingRight={barPaddingRight}
                barPaddingLeft={barPaddingLeft}
                selectedIndex={index}
                isKeyboardEnabled={isTouchEnabled!}
            />
        );

    }
}


export default Radium(dimensions({elementResize: true})(HorizontalTimeline));
