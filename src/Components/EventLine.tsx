import React from "react";
import { Motion, spring } from "react-motion";
import Radium from "radium";
import { asCSS } from "../helpers";
import Constants from "../Constants";

export type EventLineProps = {
  left: number;
  width: number;
  fillingMotion: {
    stiffness: number;
    damping: number;
  };
  backgroundColor: string;
  isRtl: boolean;
};

/**
 * The markup Information for an event Line. You can stack multiple lines on top of eachother
 *
 * @param  {object} props The props from parent, styling and positioning
 * @return {StatelessFunctionalReactComponent} Markup Information for the event line.
 */
const EventLine: React.FC<EventLineProps> = ({
  left,
  width,
  fillingMotion,
  backgroundColor,
  isRtl,
}) => (
  <Motion
    style={{
      tWidth: spring(width, fillingMotion),
      tLeft: spring(left, fillingMotion),
    }}
  >
    {({ tWidth, tLeft }) => {
      return (
        <span
          aria-hidden="true"
          className="timeline-eventline"
          style={asCSS([
            {
              position: "absolute",
              top: 0,
              height: "100%",
              width: `${tWidth}px`,
              transformOrigin: `${
                isRtl ? Constants.RIGHT : Constants.LEFT
              } center`,
              backgroundColor,
            },
            { [isRtl ? Constants.RIGHT : Constants.LEFT]: `${tLeft}px` },
          ])}
        />
      );
    }}
  </Motion>
);

export default Radium(EventLine);
