import React, {useEffect, useMemo} from "react";
import onHover from "../events/onHover";
import drawGrid from "../utils/drawGrid";


export default function useLineChart({
                                         iterations,
                                         biggest,
                                         totals,
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
    const handleMouseOut = () => {
        drawChart()
    }
    const drawLine = ({point, position, onHover, valueKey, valueColor, valueLabel}) => {
        const pVariation = (point[valueKey] * 100) / biggest
        const height = ((pVariation * (layerOne.canvas.height - labelSpacing * 1.35)) / 100)
        let x = (position * (layerOne.canvas.width - labelSpacing * 1.75 - 4) / (data.length - 1)) + labelSpacing * 1.35,
            y = layerOne.canvas.height - labelSpacing - height

        if (points.length === 0)
            setPoints(prevState => {
                return [...prevState, {
                    x: x - 10,
                    y: y - 10,
                    axis: point[axis.field],
                    value: point[valueKey],
                    axisLabel: axis.label,
                    valueLabel: valueLabel,
                    color: valueColor,
                    width: 20,
                    height: 20
                }]
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

        values.filter(v => !v.hidden).map(valueObj => {
            data.forEach((el, index) => {
                drawLine({
                    point: el,
                    position: index,
                    onHover:  onHover !== undefined ? points[onHover].value === el[valueObj.field] && points[onHover].axis === el[axis.field] : false,
                    valueKey: valueObj.field,
                    valueColor: valueObj.hexColor,
                    valueLabel: valueObj.label
                })
            })
        })
    }

    const handleMouseMove = (event) => {
        const bBox = layerOne.canvas.parentNode.getBoundingClientRect()

        onHover({
            variant: 'line',
            ctx: layerTwo,
            event: {
                x: event.clientX - bBox.left,
                y: event.clientY - bBox.top,
                width: bBox.width,
                height: bBox.height
            },
            points: points,
            drawChart: drawChart
        })
    }

    useEffect(() => {
        if(layerZero){
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
        layerOne?.canvas.parentNode.addEventListener('mousemove', handleMouseMove)
        layerOne?.canvas.parentNode.addEventListener('mouseout', handleMouseOut)
        return () => {
            layerOne?.canvas.parentNode.removeEventListener('mousemove', handleMouseMove)
            layerOne?.canvas.parentNode.removeEventListener('mouseout', handleMouseOut)
        }
    }, [data, layerOne, width, height, theme, points])
}
