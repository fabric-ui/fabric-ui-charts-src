import React, {useEffect, useMemo, useState} from "react";

import onHover from "../events/onHover";
import useAsyncMemo from "../hooks/useAsyncMemo";
import drawGrid from "../utils/drawGrid";
import Bar from "../elements/Bar";
import useHover from "../hooks/useHover";


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

    const visibleValues = useMemo(() => {
        return values.filter(b => !b.hidden)
    }, [values])

    const {layerZero, layerOne, layerTwo} = useMemo(() => {
        return {layerZero: getLayer(0), layerOne: getLayer(1), layerTwo: getLayer(2)}
    }, [width, height])
    let [bars, setBars] = useState([])
    useHover(layerTwo, points, (event) => {
        onHover({
            labelSpacing: labelSpacing,
            ctx: layerTwo,
            event:event,
            points: points,
            drawChart: drawChart,
            variant: 'vertical'
        })
    })

    const dimensions = useAsyncMemo(() => {
        if (layerOne) {
            const length = data.length
            const o = (layerOne.canvas.width * 2) / (length ** 2)
            const w = ((layerOne.canvas.width - labelSpacing * 1.35) / length) - o

            return {offset: o, barWidth: w}
        } else return undefined
    }, [width, labelSpacing, layerOne, values])

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
                layer: layerZero,
                valuesLength: visibleValues.length
            })
        }
    }, [width, height, layerZero, dimensions, values])

    const drawChart = (onHover = undefined) => {
        layerOne.clearAll()
        let newPoints = [], newInstances = []
        data.forEach((point, index) => {
            visibleValues.forEach((valueObj, vi) => {
                const pVariation = (point[valueObj.field] * 100) / biggest
                const barW = (dimensions.barWidth) / visibleValues.length
                const x = index * (dimensions.barWidth + dimensions.offset) + labelSpacing * 1.35 + (vi * (barW + dimensions.offset / (visibleValues.length * 2))) +  dimensions.offset / (visibleValues.length + 1)
                const height = (pVariation * (layerOne.canvas.height - labelSpacing * 1.35)) / 100
                const y = layerOne.canvas.height - height - labelSpacing

                const instance = bars.length === 0 ? new Bar('height', barW, height, x, y, index, valueObj.hexColor,) : bars[vi + index]

                if (bars.length === 0)
                    newInstances.push(instance)
                else {
                    instance.width = barW
                    instance.color = valueObj.hexColor
                    instance.height = height
                    instance.x = x
                    instance.y = y
                }

                instance.draw(layerOne, onHover?.axis === point[axis.field] && onHover.value === point[valueObj.field])
                const newPoint = {
                    x: x,
                    y: y,
                    axis: point[axis.field],
                    axisLabel: axis.label,
                    value: point[valueObj.field],
                    valueLabel: valueObj.label,
                    height: height,
                    width: dimensions.barWidth / visibleValues.length,
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
    }, [data, layerOne, width, height, theme, dimensions, bars])

    useEffect(() => {
        setBars([])
        layerOne?.clearAll()
    }, [values])
}


