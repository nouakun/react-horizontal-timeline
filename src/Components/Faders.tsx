import React from "react";
import Radium from "radium";

import Color from "color";
import { asCSS } from "../helpers";

const LEFT = "left";
const RIGHT = "right";

/**
 * Components propTypes
 */

export type FadersProps = {
  styles: {
    foreground: string;
    background: string;
    outline: string;
  };
};
/**
 * Returns the styles that generate a fading effect on the edges of the timeline
 *
 * @param  {object} styles The styles (user-definded/default).Mainly Information about the background, foreground, etc.
 * @param  {string} position The position of the fader. Can only be left or right
 * @param  {string} gradientDirection The direction in which we want to generate fade effect
 * @return {object} The styleing Information for the left or right fader
 */
const faderStyle: {
  base: any;
  specific: (styles: any, position: string, gradientDirection: string) => any;
} = {
  base: {
    top: "50%",
    position: "absolute",
    bottom: "auto",
    transform: "translateY(-50%)",
    height: "100%",
    width: 20,
    overflow: "hidden",
  },
  specific: (styles, position, gradientDirection) => ({
    [position]: 40,
    backgroundImage: `linear-gradient(to ${gradientDirection}, ${
      styles.background
    }, ${Color(styles.background).alpha(0).rgb()})`,
  }),
};

/**
 * The markup Information for an element that produces the fade effect at the end of the timeline
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
const Faders: React.FC<FadersProps> = (props) => (
  <ul style={{ listStyle: "none" }}>
    <li
      style={asCSS([
        faderStyle.base,
        faderStyle.specific(props.styles, LEFT, RIGHT),
      ])}
    />
    <li
      style={asCSS([
        faderStyle.base,
        faderStyle.specific(props.styles, RIGHT, LEFT),
      ])}
    />
  </ul>
);

export default Radium(Faders);
