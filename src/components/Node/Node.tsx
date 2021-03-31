import * as React from "react";

const styles: any = require("./Node.module.css");

import { INodeProps } from "./INodeProps";

class Node extends React.Component<INodeProps, {}> {

    public render() {
        return this._getNestedFolderTypeNode();
    }

    private _getNestedFolderTypeNode() {
        const {
            bgColor,
            onClick,
            onLeafClick,
            name,
            id,
            label,
            valueWithFormat,
            valueUnit,
            hasChildren,
            xTranslated,
            yTranslated,
            isSelectedNode,
            width,
            height,
            fontSize,
            textColor,
            nodeTotalNodes,
            globalTotalNodes,
            url,
            hideNumberOfChildren,
            treemapId
        } = this.props;
        const cursor = hasChildren === true && isSelectedNode === false ? "pointer" : "auto";
        const itemsWidth = this._getNumberItemsWidthByNumberOfChars(fontSize, nodeTotalNodes.toString().length);
        const clipWidth = width > itemsWidth ? width - itemsWidth : width;
        return (
            <g
                transform={`translate(${xTranslated},${yTranslated})`}
                className={styles.node + " " + (nodeTotalNodes === globalTotalNodes ? styles.rootNode : null)}
                id={id.toString()}
                onClick={(e) => hasChildren ? onClick(e) : onLeafClick(e, label)}
            >
                <rect
                    id={"rect-" + id}
                    width={width}
                    height={height}
                    fill={bgColor}
                />
                <clipPath
                    id={"clip-".concat(treemapId, "-" , id.toString())}
                >
                    <rect
                        width={width} 
                        height={height}
                        fill={bgColor} 
                    />
                </clipPath>
                <a href={url} target="_blank">
                    <text
                        clipPath={"url(#clip-".concat(treemapId, "-" , id.toString(), ")")}
                    >
                        {this._getLabelNewLine()}
                    </text>
                </a>
                {!hideNumberOfChildren && this._getNumberOfItemsRect()}
                <title>{label + "\nResults: " + valueWithFormat + ((valueUnit === "") ? "" : " ") + valueUnit + "\nChildren: " + nodeTotalNodes + "/" + globalTotalNodes}</title>
            </g>
        );
    }

    private _getNumberItemsHeightByFontSize(fontSize: number) {
        return fontSize;
    }
    private _getNumberItemsWidthByNumberOfChars(fontSize: number, numberOfChars: number) {
        return fontSize / 2 * numberOfChars + 5;
    }

    private _getNumberOfItemsRect() {
        const {
            bgColor,
            name,
            width,
            height,
            fontSize,
            textColor,
            nodeTotalNodes
        } = this.props;
        const itemsWidth = this._getNumberItemsWidthByNumberOfChars(fontSize, nodeTotalNodes.toString().length);
        const itemsHeight = this._getNumberItemsHeightByFontSize(fontSize);

        if (width > itemsWidth
            && height > itemsHeight) {
            return (
                <g>
                    <rect
                        id={"rectNumberItems-" + name}
                        x={width - itemsWidth - 2}
                        y={2}
                        width={itemsWidth}
                        height={itemsHeight}
                        fill={bgColor}
                        rx={"5px"}
                        fillOpacity={0.9}
                        stroke={textColor}
                    />
                    <text
                        fontSize={fontSize}
                        fill={textColor}
                        x={width - itemsWidth} 
                        y={fontSize} 
                    >
                        {nodeTotalNodes}
                    </text>
                </g>
            );
        }

    }

    private _getLabelNewLine() {
        const {
            height,
            width,
            label,
            textColor,
            fontSize,
            valueWithFormat,
            valueUnit,
            hasChildren,
            nodeTotalNodes,
            globalTotalNodes,
            hideValue
        } = this.props;
        const itemsWidth = this._getNumberItemsWidthByNumberOfChars(fontSize, nodeTotalNodes.toString().length);
        const itemsHeight = this._getNumberItemsHeightByFontSize(fontSize);
        if (hasChildren === true) {
            const fullLabel = hideValue ? label : label + "\xa0(" + valueWithFormat + ((valueUnit === "") ? "" : " ") + valueUnit + ")";
            return (
                <tspan fontSize={fontSize} fill={textColor} dx={4} dy={fontSize} >
                    {fullLabel}
                </tspan>
            );
        } else {
            if (label) {
                const fullLabel = hideValue ? label.split(/(?=[A-Z][^A-Z])/g) : label.split(/(?=[A-Z][^A-Z])/g).concat("(" + valueWithFormat + ((valueUnit === "") ? "" : " ") + valueUnit + ")");
                    return (
                        <tspan fontSize={fontSize} fill={textColor} dx={4} dy={fontSize} >
                            {fullLabel}
                        </tspan>
                    );
               
            }
        }
    }
}

export default Node;
