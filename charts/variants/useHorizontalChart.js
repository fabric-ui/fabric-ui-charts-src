import React, {useEffect, useMemo, useState} from "react";

import onHover from "../events/onHover";
import useAsyncMemo from "../hooks/useAsyncMemo";
import PropTypes from "prop-types";
import drawGrid from "../utils/drawGrid";
import Bar from "../elements/Bar";


export default function useHorizontalChart({
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
            variant: 'horizontal'
        })
    }

    const handleMouseOut = () => {
        drawChart()
    }
    const valuesLength = useMemo(() => {
        return values.filter(v => !v.hidden).length
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
                strokeStyle: theme.themes.fabric_border_secondary,
                variant: 'horizontal',
                iterations: iterations,
                labelPadding: labelSpacing,
                data: data,
                element: layerOne.canvas,
                color: theme.themes.fabric_color_quaternary,
                axisKey: axis.field,
                width: width,
                offset: dimensions.offset,
                height: dimensions.barHeight,
                layer: layerZero,
                valuesLength: valuesLength
            })
        }
    }, [width, height, layerZero, dimensions, values])

    const drawChart = (onHover = undefined) => {
        console.log(bars.length)

        layerOne.clearAll()
        let newPoints = [], newInstances = []

            data.forEach((point, index) => {
                values.filter(v => !v.hidden).forEach((valueObj, vi) => {
                const pVariation = (point[valueObj.field] * 100) / biggest
                const x = labelSpacing * 1.35
                // const y = (index * Math.abs(dimensions.barHeight) + dimensions.offset * (index + vi))
                const width = (pVariation * (layerOne.canvas.width - labelSpacing * 1.75)) / 100
                const barH = (dimensions.barHeight) / valuesLength
                const y = index * (dimensions.barHeight + dimensions.offset)  + (vi * (barH + dimensions.offset / (valuesLength * 2)))
                const instance = bars.length === 0 ? new Bar('width', width, dimensions.barHeight / values.filter(v => !v.hidden).length, x, y, index, valueObj.hexColor,) : bars[vi + index]

                if (bars.length === 0)
                    newInstances.push(instance)
                else {
                    instance.width = width
                    instance.color = valueObj.hexColor
                    instance.height = dimensions.barHeight / values.filter(v => !v.hidden).length
                    instance.x = x
                    instance.y = y
                }

                instance.draw(layerOne, onHover !== undefined && points[onHover].value === point[valueObj.field] && points[onHover].axis === point[axis.field])
                const newPoint = {
                    x: x - dimensions.offset,
                    y: y,
                    axis: point[axis.field],
                    axisLabel: axis.label,
                    value: point[valueObj.field],
                    valueLabel: valueObj.label,
                    height: dimensions.barHeight / values.filter(v => !v.hidden).length,
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

        layerOne?.canvas.parentNode.addEventListener('mousemove', handleMouseMove)
        layerOne?.canvas.addEventListener('mouseout', handleMouseOut)
        return () => {
            layerOne?.canvas.parentNode.removeEventListener('mousemove', handleMouseMove)
            layerOne?.canvas.removeEventListener('mouseout', handleMouseOut)
        }
    }, [data, layerOne, width, height, theme, dimensions, bars])

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
