import React, {useEffect, useMemo} from "react";
import onHover from "../events/onHover";
import drawGrid from "../utils/drawGrid";
import useHover from "../hooks/useHover";


export default function useLineChart({
                                         iterations,
                                         biggest,
                                         points,
                                         setPoints,
                                         theme,
                                         getLayer,
                                         data,
                                         axis,
                                         values,
                                         width,
                                         height,
                                         labelSpacing
                                     }) {

    const {layerZero, layerOne, layerTwo} = useMemo(() => {
        return {layerZero: getLayer(0), layerOne: getLayer(1), layerTwo: getLayer(2)}
    }, [width, height])

    let xBefore, yBefore

    const visibleValues = useMemo(() => {
        return values.filter(v => !v.hidden)
    }, [values])

    const drawLine = ({point, position, onHover, valueKey, valueColor, valueLabel, newPoints = []}) => {
        const pVariation = (point[valueKey] * 100) / biggest
        const height = ((pVariation * (layerOne.canvas.height - labelSpacing * 1.35)) / 100)
        let x = (position * (layerOne.canvas.width - labelSpacing * 1.75 - 4) / (data.length - 1)) + labelSpacing * 1.35,
            y = layerOne.canvas.height - labelSpacing - height


        newPoints.push({
            x: x - 10,
            y: y - 10,
            axis: point[axis.field],
            value: point[valueKey],
            axisLabel: axis.label,
            valueLabel: valueLabel,
            color: valueColor,
            width: 20,
            height: 20
        })

        layerOne.strokeStyle = valueColor
        layerOne.fillStyle = valueColor

        layerOne.beginPath();
        layerOne.arc(x, y, onHover ? 8 : 4, 0, 2 * Math.PI);
        layerOne.fill();
        layerOne.stroke();

        if (position > 0) {
            layerOne.setLineDash([3, 3]);
            layerOne.beginPath();
            layerOne.moveTo(xBefore, yBefore);

            layerOne.lineTo(x, y);
            layerOne.stroke();
            layerOne.setLineDash([]);
        }

        xBefore = x
        yBefore = y
    }

    const drawChart = (onHover) => {
        layerOne.clearAll()
        let newPoints = []
        visibleValues.map((valueObj, vi) => {
            data.forEach((point, index) => {
                drawLine({
                    point: point,
                    position: index,
                    onHover: onHover?.axis === point[axis.field] && onHover.value === point[valueObj.field],
                    valueKey: valueObj.field,
                    valueColor: valueObj.hexColor,
                    valueLabel: valueObj.label,
                    newPoints: newPoints
                })
            })
        })

        if (points.length === 0 && newPoints.length > 0)
            setPoints(newPoints)
    }


    useHover(layerTwo, points, (event) => {
        onHover({
            variant: 'line',
            ctx: layerTwo,
            event: event,
            points: points,
            drawChart: drawChart
        })
    })


    useEffect(() => {
        if (layerZero) {
            layerZero.clearAll()
            layerZero.defaultFont()
            drawGrid({
                layer: layerZero,
                strokeStyle: theme.themes.fabric_border_secondary,
                variant: 'line',
                iterations: iterations,
                labelPadding: labelSpacing,
                data: data,
                color: theme.themes.fabric_color_quaternary,
                axisKey: axis.field,
                width: ((layerZero.canvas.width - labelSpacing * 1.35) / (data.length)),
                offset: 0
            })
        }
    }, [layerZero, data, width, height, values])

    useEffect(() => {
        if (layerOne) {
            layerOne.defaultFont()
            drawChart()
        }
    }, [data, layerOne, width, height, theme, points])
}
