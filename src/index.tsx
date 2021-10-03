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
  titles: string[];

  // Function that takes the index of the array as argument
  onTitleClick: (index: number) => void;

  /**
   * @deprecated Use renderTitles instead.
   * @param date string
   * @param index number
   *
   * @return string
   */
  getLabel?: (date: string, index: number) => string;

  /**
   * Customize the titles as you prefer.
   *
   * @since 1.0.1
   * @param title string
   * @param index number
   *
   * @return JSX.Element | string
   */

  renderTitles?: (title: string, index: number) => JSX.Element | string;

  // --- POSITIONING ---
  // the minimum padding between events
  minEventPadding?: number;

  // The maximum padding between events
  maxEventPadding?: number;

  // Padding at the front and back of the line
  linePadding?: number;

  // The width of the label
  titleWidth?: number;

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
 * Default render of title.
 * @since 1.0.1
 *
 * @param title
 */
const defaultRenderTitles = (title: string) => title;

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
    renderTitles: defaultRenderTitles,

    // --- POSITIONING ---
    minEventPadding: Constants.MIN_EVENT_PADDING,
    maxEventPadding: Constants.MAX_EVENT_PADDING,
    linePadding: Constants.TIMELINE_PADDING,
    titleWidth: Constants.DATE_WIDTH,
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
      titles,
      titleWidth,
      minEventPadding,
      maxEventPadding,
      linePadding,
      renderTitles,
      isTouchEnabled,
      styles,
      fillingMotion,
      onTitleClick,
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

          // Convert the title strings to actual title objects
          const titlesList = titles.map((title) => title);

          // Calculate the distances for all events
          const distances = cummulativeSeperation(
            titlesList,
            titleWidth!,
            minEventPadding!,
            maxEventPadding!,
            linePadding!
          );

          // Convert the distances and dates to events
          const events = distances.map((distance: number, index: number) => ({
            distance,
            label: renderTitles!(titlesList[index], index),
            date: titles[index],
          }));

          const visibleWidth = width - 80;

          const totalWidth = Math.max(
            events[events.length - 1].distance + this.props.linePadding!,
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
                indexClick={onTitleClick}
                labelWidth={titleWidth!}
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
