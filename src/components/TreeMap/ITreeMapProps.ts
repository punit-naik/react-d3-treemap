export interface ITreeMapProps {
    id: string;
    width: number;
    height: number;
    data: any;

    fontSize: number;

    /*
        Unit for values. For example MB
    */
    valueUnit?: string;

    /*
     * Format for the values
     * https://github.com/d3/d3-format#format
     */
    valueFormat?: string;

    onLeafClick: any;

    /*
     * Create and interpolates a background color range
     */
    rectRadius?: string;
    bgColorRangeLow?: string;
    bgColorRangeHigh?: string;

    /*
     * We do not need colorText anymore as it will be calculated as a high contrast color depending on background
     */
    // colorText?: string;

    /**
     * Hide breadcrumb
     */
    disableBreadcrumb?: boolean;

    colorModel?: ColorModel;

    hideNumberOfChildren?: boolean;
    hideValue?: boolean;
}

export enum ColorModel {
    Depth,
    Value,
    NumberOfChildren
}
