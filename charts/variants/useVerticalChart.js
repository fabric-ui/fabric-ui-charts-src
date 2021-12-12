import useChart from "../hooks/useChart";
import React, {useEffect, useMemo, useState} from "react";

import onHover from "../events/onHover";
import hexToRgba from "../utils/hexToRgba";
import useAsyncMemo from "../hooks/useAsyncMemo";
import PropTypes from "prop-types";
import drawGrid from "../utils/drawGrid";
import Bar from "../elements/Bar";


export default function useVerticalChart({
                                             iterations,
                                             biggest,
                                             values,
                                             points,
                                             setPoints,
                                             theme,
                                             getLayer,
                                             data,
                                             axis,
                                             labelSpacing,
                                             width,
                                             height
                                         }) {


    const {layerZero, layerOne, layerTwo} = useMemo(() => {
        return {layerZero: getLayer(0), layerOne: getLayer(1), layerTwo: getLayer(2)}
    }, [width, height])
    let [bars, setBars] = useState([])

    const handleMouseMove = (event) => {
        const bBox = layerOne.canvas?.getBoundingClientRect()
        onHover({
            labelSpacing: labelSpacing,
            ctx: layerTwo,
            event: {
                x: event.clientX - bBox.left,
                y: event.clientY - bBox.top,
                width: bBox.width,
                height: bBox.height
            },
            points: points,
            drawChart: (onHover) => drawChart(onHover),
            variant: 'vertical'
        })
    }

    const handleMouseOut = () => {
        drawChart()
    }

    const dimensions = useAsyncMemo(() => {
        if (layerOne) {
            const length = data.length
            const o = (layerOne.canvas.width * 2) / (length ** 2)
            const w = ((layerOne.canvas.width - labelSpacing * 1.5) / length) - o

            return {offset: o, barWidth: w}
        } else return undefined
    }, [width, labelSpacing, layerOne])

    useEffect(() => {
        if (layerZero && dimensions) {
            layerZero.defaultFont()
            layerZero.clearAll()
            drawGrid({
                strokeStyle: theme.themes.fabric_border_secondary,
                variant: 'vertical',
                iterations: iterations,
                labelPadding: labelSpacing,
                data: data,
                element: layerOne.canvas,
                color: theme.themes.fabric_color_quaternary,
                axisKey: axis.field,
                width: dimensions.barWidth,
                offset: dimensions.offset, height: height,
                layer: layerZero
            })
        }
    }, [width, height, layerZero, dimensions])

    const drawChart = (onHover = undefined) => {

        layerOne.clearAll()
        let newPoints = [], newInstances = []
        values.forEach((valueObj, vi) => {
            data.forEach((point, index) => {
                const pVariation = (point[valueObj.field] * 100) / biggest
                const x = (index) * Math.abs(dimensions.barWidth ) + labelSpacing * 1.25 + dimensions.offset*.8 + dimensions.offset * (index + vi) + (index > 0 ? 5 : 0)

                const height = (pVariation * (layerOne.canvas.height - labelSpacing * 1.35)) / 100
                const y = layerOne.canvas.height - height - labelSpacing
                const instance = bars.length === 0 ? new Bar('height', dimensions.barWidth / values.length, height, x, y, index, valueObj.hexColor,) : bars[vi + index]

                if (bars.length === 0)
                    newInstances.push(instance)
                else {

                    instance.width = dimensions.barWidth / values.length
                    instance.color = valueObj.hexColor
                    instance.height = height
                    instance.x = x
                    instance.y = y
                }

                instance.draw(layerOne, onHover && points[onHover].value === point[valueObj.field] && points[onHover].axis === point[axis.field])
                const newPoint = {
                    x: x ,
                    y: y,
                    axis: point[axis.field],
                    axisLabel: axis.label,
                    value: point[valueObj.field],
                    valueLabel: valueObj.label,
                    height: height,
                    width: dimensions.barWidth/ values.length,
                    color: valueObj.hexColor

                }
                newPoints.push(newPoint)
            })
        })

        if (points.length === 0)
            setPoints(newPoints)
        if (bars.length === 0)
            setBars(newInstances)
    }

    useEffect(() => {
        if (layerOne && dimensions !== undefined) {
            layerOne.defaultFont()
            drawChart()
        }

        layerOne?.canvas.parentNode.addEventListener('mousemove', handleMouseMove)
        layerOne?.canvas.parentNode.addEventListener('mouseout', handleMouseOut)
        return () => {
            layerOne?.canvas.parentNode.removeEventListener('mousemove', handleMouseMove)
            layerOne?.canvas.parentNode.removeEventListener('mouseout', handleMouseOut)
        }
    }, [data, layerOne, width, height, theme, dimensions, bars])


}


