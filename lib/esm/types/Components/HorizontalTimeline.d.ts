export interface HorizontalTimelineProps {
    index: number;
    values: string[];
    indexClick: (index: number) => void;
    getLabel?: (date: string, index: number) => string;
    minEventPadding?: number;
    maxEventPadding?: number;
    linePadding?: number;
    labelWidth?: number;
    styles?: any;
    fillingMotion?: any;
    slidingMotion?: any;
    isOpenEnding?: boolean;
    isOpenBeginning?: boolean;
    isTouchEnabled?: boolean;
    isKeyboardEnabled?: boolean;
    containerWidth?: number;
    containerHeight?: number;
}
declare const _default: HorizontalTimelineProps;
export default _default;
