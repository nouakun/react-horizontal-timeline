import React from "react";
import { Motion, spring } from "react-motion";

import Events from "./Events";
import EventLine from "./EventLine";
import Faders from "./Faders";
import HorizontalTimelineButtons from "./HorizontalTimelineButtons";

import Constants from "../Constants";

/**
 * Components propTypes
 */
export type EventsBarProps = {
  width: number;
  height: number;
  events: {
    distance: number;
    label: string;
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
};

export type EventsBarStates = {
  position: number;
  maxPosition: number;
};

class EventsBar extends React.Component<EventsBarProps, EventsBarStates> {
  private touch: any;
  private slidingMotion: any;

  constructor(props: EventsBarProps) {
    super(props);

    this.state = {
      position: 0,
      maxPosition: Math.min(props.visibleWidth - props.totalWidth, 0),
    };

    this.touch = {
      coors: {
        x: 0,
        y: 0,
      },
      isSwiping: false,
      started: false,
      threshold: 3,
    };
  }

  componentWillMount() {
    document.body.addEventListener("keydown", this.handleKeydown);
  }

  componentDidMount() {
    const selectedEvent = this.props.events[this.props.index];
    this.slideToPosition(
      -(selectedEvent.distance - this.props.visibleWidth / 2),
      this.props
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (event: any) => {
    if (this.props.isKeyboardEnabled) {
      if (
        event.keyCode === Constants.LEFT_KEY ||
        event.keyCode === Constants.RIGHT_KEY
      ) {
        this.updateSlide(Constants.KEYMAP[event.keyCode]);
      } else if (event.keyCode === Constants.UP_KEY) {
        this.props.indexClick(
          Math.min(this.props.selectedIndex + 1, this.props.events.length - 1)
        );
      } else if (event.keyCode === Constants.DOWN_KEY) {
        this.props.indexClick(Math.max(this.props.selectedIndex - 1, 0));
      }
    }
  };

  handleTouchStart = (event: any) => {
    const touchObj = event.touches[0];

    this.touch.coors.x = touchObj.pageX;
    this.touch.coors.y = touchObj.pageY;
    this.touch.isSwiping = false;
    this.touch.started = true;
  };

  handleTouchMove = (event: any) => {
    if (!this.touch.started) {
      this.handleTouchStart(event);
      return;
    }

    const touchObj = event.touches[0];
    const dx = Math.abs(this.touch.coors.x - touchObj.pageX);
    const dy = Math.abs(this.touch.coors.y - touchObj.pageY);

    const isSwiping = dx > dy && dx > this.touch.threshold;

    if (
      isSwiping === true ||
      dx > this.touch.threshold ||
      dy > this.touch.threshold
    ) {
      this.touch.isSwiping = isSwiping;
      const dX = this.touch.coors.x - touchObj.pageX; // amount scrolled
      this.touch.coors.x = touchObj.pageX;
      this.setState({
        position: this.state.position - dX, // set new position
      });
    }
    if (this.touch.isSwiping !== true) {
      return;
    }
    // Prevent native scrolling
    event.preventDefault();
  };

  handleTouchEnd = () => {
    // Make sure we are scrolled to a valid position
    this.slideToPosition(this.state.position);
    this.touch.coors.x = 0;
    this.touch.coors.y = 0;
    this.touch.isSwiping = false;
    this.touch.started = false;
  };

  componentWillReceiveProps(props: EventsBarProps) {
    const selectedEvent = props.events[props.index];
    const minVisible = -this.state.position; // Position is always negative!
    const maxVisible = minVisible + props.visibleWidth;

    if (
      selectedEvent.distance > minVisible + 10 &&
      selectedEvent.distance < maxVisible - 10
    ) {
      //Make sure we are not outside the view
      this.slideToPosition(this.state.position, props);
    } else {
      //Try to center the selected index
      this.slideToPosition(
        -(selectedEvent.distance - props.visibleWidth / 2),
        props
      );
    }
  }

  /**
   * Slide the timeline to a specific position. This method wil automatically cap at 0 and the maximum possible position
   * @param {number} position: The position you want to slide to
   * @return {undefined} Modifies the value by which we translate the events bar
   */
  slideToPosition = (position: number, props = this.props) => {
    // the width of the timeline component between the two buttons (prev and next)
    const maxPosition = Math.min(props.visibleWidth - props.totalWidth, 0); // NEVER scroll to the right

    this.setState({
      position: Math.max(Math.min(0, position), maxPosition),
      maxPosition,
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
  updateSlide = (direction: string, props = this.props) => {
    //  translate the timeline to the left('next')/right('prev')
    if (direction === Constants.RIGHT) {
      this.slideToPosition(
        this.state.position - props.visibleWidth + props.labelWidth,
        props
      );
    } else if (direction === Constants.LEFT) {
      this.slideToPosition(
        this.state.position + props.visibleWidth - props.labelWidth,
        props
      );
    }
  };

  centerEvent = (index: number, props = this.props) => {
    const event = props.events[index];

    this.slideToPosition(-event.distance);
  };

  render() {
    const {
      isTouchEnabled,
      index,
      barPaddingLeft,
      barPaddingRight,
      styles,
      totalWidth,
      events,
      width,
      height,
      fillingMotion,
      indexClick,
      labelWidth,
    } = this.props;

    const { position, maxPosition } = this.state;

    //  creating an array of list items that have an onClick handler into which
    //  passing the index of the clicked entity.
    // NOTE: Improve timeline dates handeling and eventsMinLapse handling
    const touchEvents = isTouchEnabled
      ? {
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd,
        }
      : {};

    // filled value = distane from origin to the selected event
    const filledValue = events[index].distance - barPaddingLeft;
    const eventLineWidth = totalWidth - barPaddingLeft - barPaddingRight;

    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        {...touchEvents}
      >
        <div
          className="events-wrapper"
          style={{
            position: "relative",
            height: "100%",
            margin: "0 40px",
            overflow: "hidden",
          }}
        >
          <Motion
            style={{
              X: spring(position, this.slidingMotion),
            }}
          >
            {({ X }) => (
              <div
                className="events"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 49,
                  height: 2,
                  width: totalWidth,
                  WebkitTransform: `translate3d(${X}, 0, 0)px`,
                  transform: `translate3d(${X}px, 0, 0)`,
                }}
              >
                <EventLine
                  left={barPaddingLeft}
                  width={eventLineWidth}
                  fillingMotion={fillingMotion}
                  backgroundColor={styles.outline}
                />
                <EventLine
                  left={this.props.barPaddingLeft}
                  width={filledValue}
                  fillingMotion={fillingMotion}
                  backgroundColor={styles.foreground}
                />
                <Events
                  events={events}
                  selectedIndex={index}
                  styles={styles}
                  handleDateClick={indexClick}
                  labelWidth={labelWidth}
                />
              </div>
            )}
          </Motion>
        </div>
        <Faders styles={this.props.styles} />
        <HorizontalTimelineButtons
          maxPosition={maxPosition}
          position={position}
          styles={styles}
          updateSlide={this.updateSlide}
        />
      </div>
    );
  }
}

export default EventsBar;
