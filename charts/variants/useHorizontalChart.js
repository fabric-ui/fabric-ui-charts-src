import React, {useEffect, useMemo, useState} from "react";

import onHover from "../events/onHover";
import useAsyncMemo from "../hooks/useAsyncMemo";
import PropTypes from "prop-types";
import drawGrid from "../utils/drawGrid";
import Bar from "../elements/Bar";
import useHover from "../hooks/useHover";


export default function useHorizontalChart({
                                               iterations,
                                               biggest,
                                               values,
                                               points,
                                               setPoints,

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

    useHover(layerTwo, points, (event) => {
        onHover({
            labelSpacing: labelSpacing,
            ctx: layerTwo,
            event: event,
            points: points,
            drawChart: (onHover) => drawChart(onHover),
            variant: 'horizontal'
        })
    })

    const visibleValues = useMemo(() => {
        return values.filter(b => !b.hidden)
    }, [values])

    const dimensions = useAsyncMemo(() => {
        if (layerOne) {
            const length = data.length
            const o = (layerOne.canvas.height * 2) / (length ** 2)
            const h = ((layerOne.canvas.height - labelSpacing) / length) - o

            return {offset: o, barHeight: h}
        } else
            return undefined
    }, [height, labelSpacing, layerOne, width])

    useEffect(() => {
        if (layerZero && dimensions) {
            layerZero.defaultFont()
            layerZero.clearAll()
            drawGrid({
                strokeStyle: layerOne.getThemes().fabric_border_secondary,
                variant: 'horizontal',
                iterations: iterations,
                labelPadding: labelSpacing,
                data: data,
                element: layerOne.canvas,
                color: layerOne.getThemes().fabric_color_quaternary,
                axisKey: axis.field,
                width: width,
                offset: dimensions.offset,
                height: dimensions.barHeight,
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
                const x = labelSpacing * 1.35
                // const y = (index * Math.abs(dimensions.barHeight) + dimensions.offset * (index + vi))
                const width = (pVariation * (layerOne.canvas.width - labelSpacing * 1.75)) / 100
                const barH = (dimensions.barHeight) / visibleValues.length
                const y = index * (dimensions.barHeight + dimensions.offset)  + (vi * (barH + dimensions.offset / (visibleValues.length * 2)))
                const instance = bars.length === 0 ? new Bar('width', width, dimensions.barHeight / visibleValues.length, x, y, index, valueObj.hexColor,) : bars[vi + index]

                if (bars.length === 0)
                    newInstances.push(instance)
                else {
                    instance.width = width
                    instance.color = valueObj.hexColor
                    instance.height = dimensions.barHeight / visibleValues.length
                    instance.x = x
                    instance.y = y
                }

                instance.draw(layerOne, onHover?.axis === point[axis.field] && onHover.value === point[valueObj.field])
                const newPoint = {
                    x: x - dimensions.offset,
                    y: y,
                    axis: point[axis.field],
                    axisLabel: axis.label,
                    value: point[valueObj.field],
                    valueLabel: valueObj.label,
                    height: dimensions.barHeight / visibleValues.length,
                    width: width,
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
    }, [data, layerOne, width, height, dimensions, bars])

    useEffect(() => {
        setBars([])
        layerOne?.clearAll()
    }, [values])
}


useHorizontalChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    variant: PropTypes.string,
    axis: PropTypes.object,
    value: PropTypes.object,
    styles: PropTypes.object
}
