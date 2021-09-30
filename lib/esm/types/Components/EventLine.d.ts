import React from "react";
export declare type EventLineProps = {
    left: number;
    width: number;
    fillingMotion: {
        stiffness: number;
        damping: number;
    };
    backgroundColor: string;
    isRtl: boolean;
};
declare const _default: React.FC<EventLineProps>;
export default _default;
