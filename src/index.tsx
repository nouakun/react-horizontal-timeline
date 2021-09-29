import React from "react";
import * as HZM from "./Components/HorizontalTimeline";

const HorizontalTimeline: React.FC<HZM.HorizontalTimelineProps> = ({
  children,
  ...otherProps
}) => {
  return <HZM.default {...otherProps}>{children}</HZM.default>;
};

export default HorizontalTimeline;
