import React from "react";
import { SizeMeProps } from "react-sizeme";
export declare type HorizontalTimelineProps = {
    index: number;
    titles: string[];
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
    minEventPadding?: number;
    maxEventPadding?: number;
    linePadding?: number;
    titleWidth?: number;
    styles?: any;
    fillingMotion?: any;
    slidingMotion?: any;
    isOpenEnding?: boolean;
    isOpenBeginning?: boolean;
    isTouchEnabled?: boolean;
    isKeyboardEnabled?: boolean;
    isRtl?: boolean;
} & SizeMeProps;
declare const _default: React.ComponentType<Pick<HorizontalTimelineProps, "index" | "styles" | "isRtl" | "fillingMotion" | "isTouchEnabled" | "isKeyboardEnabled" | "titles" | "onTitleClick" | "getLabel" | "renderTitles" | "minEventPadding" | "maxEventPadding" | "linePadding" | "titleWidth" | "slidingMotion" | "isOpenEnding" | "isOpenBeginning"> & import("react-sizeme").WithSizeProps>;
export default _default;
