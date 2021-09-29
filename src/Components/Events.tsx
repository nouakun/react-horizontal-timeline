import React from "react";
import TimelineDot from "./TimelineDot";

/**
 * Component propTypes
 */
export type EventsProps = {
  events: {
    distance: number;
    label: string;
    date: string;
  }[];
  // The index of the selected event
  selectedIndex: number;
  // a handler for clicks on a datapoint
  handleDateClick: (index: number) => void;
  // The width you want the labels to be
  labelWidth: number;
  // Custom styling
  styles?: any;
};
/**
 * The markup Information for all the events on the horizontal timeline.
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
const Events: React.FC<EventsProps> = ({
  events,
  selectedIndex,
  styles,
  handleDateClick,
  labelWidth,
}) => (
  <ol
    className="events-bar"
    style={{
      listStyle: "none",
    }}
  >
    {events.map((event, index) => (
      <TimelineDot
        distanceFromOrigin={event.distance}
        label={event.label}
        date={event.date}
        index={index}
        key={index}
        onClick={handleDateClick}
        selected={selectedIndex}
        styles={styles}
        labelWidth={labelWidth}
      />
    ))}
  </ol>
);

export default Events;
