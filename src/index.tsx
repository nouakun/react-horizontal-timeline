import React from "react";

// Decorators
import Radium from "radium";

// Components
import EventsBar from "./Components/EventsBar";

// Helpers and constansts
import { cummulativeSeperation } from "./helpers";

import Constants from "./Constants";
import { SizeMe, SizeMeProps, withSize } from "react-sizeme";

export type HorizontalTimelineProps = {
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
  isRtl?: boolean;
} & SizeMeProps;

/**
 * Default method to convert a date to a string label
 * @param {string} date The string representation of a date
 * @return {string} The formatted date string
 */
const defaultGetLabel = (date: string) => date;

/**
 * @typedef HorizontalTimelineProps
 * @prop {UiStore} uiStore
 */

/**
 * @extends {Component<HorizontalTimelineProps, {}>}}
 */
class Index extends React.Component<
  HorizontalTimelineProps,
  {
    size: SizeMeProps["size"];
  }
> {
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
      foreground: "#61dafb",
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
    isRtl: false,
  };

  constructor(props: HorizontalTimelineProps) {
    super(props);
  }

  // static getDerivedStateFromProps(props: HorizontalTimelineProps) {
  //     return null
  // }

  render() {
    const {
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
      isRtl,
    } = this.props;

    return (
      <SizeMe monitorHeight>
        {({ size }) => {
          const { width, height } = size!;
          if (!width) {
            //As long as we do not know the width of our , do not render anything!
            return <></>;
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

          const visibleWidth = width - 80;

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
            <div>
              <EventsBar
                width={width!}
                height={height!}
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
                isRtl={isRtl!}
              />
            </div>
          );
        }}
      </SizeMe>
    );
  }
}

export default Radium(
  withSize({ monitorHeight: true, refreshRate: 25 })(Index)
);
