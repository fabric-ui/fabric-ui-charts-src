import React, {useEffect, useMemo, useState} from "react";

import onHover from "../events/onHover";
import useAsyncMemo from "../hooks/useAsyncMemo";
import PropTypes from "prop-types";
import drawGrid from "../utils/misc/drawGrid";
import Bar from "../elements/bar/Bar";
import useHover from "../hooks/useHover";
import Circle from "../elements/circle/Circle";


export default function useBarChart(
    {iterations, biggest, values, points, setPoints, getLayer, data, axis, labelSpacing, width, height, variant}
) {

    const {layerZero, layerOne, layerTwo} = useMemo(() => {
        return {layerZero: getLayer(0), layerOne: getLayer(1), layerTwo: getLayer(2)}
    }, [width, height])
    let [elements, setElements] = useState([])

    useHover(layerTwo, points, (event) => {
        onHover({
            labelSpacing: labelSpacing,
            ctx: layerTwo,
            event: event,
            points: points,
            drawChart: drawChart,
            variant: variant.replace('-bar', '')
        })
    })

    const visibleValues = useMemo(() => {
        return values.filter(b => !b.hidden)
    }, [values])

    const dimensions = useAsyncMemo(() => {
        if (layerOne) {
            const length = data.length
            const verticalOffset = (layerOne.canvas.height * 2) / (length ** 2)
            const bHeight = ((layerOne.canvas.height - labelSpacing) / length) - verticalOffset


            const horizontalOffset = (layerOne.canvas.width * 2) / (length ** 2)
            const bWidth = ((layerOne.canvas.width - labelSpacing * 1.35) / length) - horizontalOffset

            return {
                offset: variant.includes('horizontal') ? verticalOffset : horizontalOffset,
                barHeight: bHeight,
                barWidth: bWidth
            }
        } else
            return undefined
    }, [height, labelSpacing, layerOne, width])

    useEffect(() => {
        if (layerZero && dimensions) {
            layerZero.defaultFont()
            layerZero.clearAll()
            drawGrid({
                strokeStyle: layerOne.getThemes().fabric_border_secondary,
                variant: variant.replace('-bar', ''),
                iterations: iterations,
                labelPadding: labelSpacing,
                data: data,
                element: layerOne.canvas,
                color: layerOne.getThemes().fabric_color_quaternary,
                axisKey: axis.field,
                width: variant.includes('horizontal') ? width : dimensions.barWidth,
                offset: dimensions.offset,
                height: variant.includes('horizontal') ? dimensions.barHeight : height,
                layer: layerZero,
                valuesLength: visibleValues.length
            })
        }
    }, [width, height, layerZero, dimensions, values])

    const drawChart = (onHover = undefined, isMouseEvent = false) => {
        if (!isMouseEvent) {
            layerOne.clearAll()
            let newPoints = [], newInstances = []
            elements.forEach(bar => {
                bar.cancelAnimations()
            })
            data.forEach((point, index) => {
                const y = index * (height + dimensions.offset)
                const bar = new Bar(
                    variant.includes('horizontal') ? 'width' : 'height',
                    variant.includes('horizontal') ? width : dimensions.barWidth,
                    variant.includes('horizontal') ? dimensions.barHeight : height,
                    variant.includes('horizontal') ? labelSpacing : undefined,
                    variant.includes('horizontal') ? y : labelSpacing,
                    index,
                    visibleValues,
                    point,
                    layerOne,
                    biggest,
                    dimensions.offset,
                    (row) => {
                        newPoints.push({
                            x: row.x,
                            y: row.y,
                            axis: point[axis.field],
                            axisLabel: axis.label,
                            value: point[visibleValues[row.valueIndex].field],
                            valueLabel: visibleValues[row.valueIndex].label,
                            height: row.height,
                            width: row.width,
                            color: visibleValues[row.valueIndex].hexColor,
                            valueIndex: row.valueIndex,
                            dataIndex: row.dataIndex
                        })
                    })
                newInstances.push(bar)
                bar.draw()
            })

            if (points.length === 0)
                setPoints(newPoints)
            if (elements.length === 0)
                setElements(newInstances)
        } else {

            elements.forEach(bar => {
                if (onHover && bar.dataIndex === onHover.dataIndex)
                    bar.handleHover(onHover.valueIndex)
                else
                    bar.handleHoverExit()
            })
        }
    }


    useEffect(() => {
        if (layerOne && dimensions !== undefined) {
            layerOne.defaultFont()
            drawChart()
        }
    }, [data, layerOne, width, height, dimensions, elements])

    useEffect(() => {
        setElements([])
    }, [values])
}


useBarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    variant: PropTypes.string,
    axis: PropTypes.object,
    value: PropTypes.object,
    styles: PropTypes.object
}
