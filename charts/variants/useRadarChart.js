import React, {useEffect, useMemo} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import hexToRgba from "../utils/hexToRgba";
import onHover from "../events/onHover";


export default function useRadarChart({
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
                                          height
                                      }) {

    const {layerZero, layerOne, layerTwo} = useMemo(() => {
        return {layerZero: getLayer(0), layerOne: getLayer(1), layerTwo: getLayer(2)}
    }, [width, height])

    const placement = useAsyncMemo(() => {
        if (width !== undefined && height !== undefined) {
            let cx = layerZero.canvas.width / 2
            let cy = layerZero.canvas.height / 2
            let radius = ((cx > cy ? cy : cx) - cy * .3) * 1.25

            return {cx, cy, radius}
        } else
            return undefined
    }, [width, height])


    const handleMouseMove = (event) => {
        const bBox = layerZero.canvas?.getBoundingClientRect()
        onHover({
            ctx: layerTwo,
            event: {
                x: event.clientX - bBox.left,
                y: event.clientY - bBox.top,
                width: bBox.width,
                height: bBox.height
            },
            points: points,
            placement: placement,
            variant: 'line',
            drawChart: drawChart
        })
    }
    const handleMouseOut = () => {
        drawChart()
    }
    const drawValue = (index, step, shift, point, valueKey, valueLabel, valueColor, valueIndex, newPoints, onHover) => {
        layerOne.strokeStyle = valueColor

        const pVariation = (point[valueKey]) / biggest

        let currentStep = index * step + shift;
        const axisAttr = point[axis?.field]

        const {x, y} = {
            x: placement.cx + (placement.radius * pVariation) * Math.cos(currentStep),
            y: placement.cy + (placement.radius * pVariation) * Math.sin(currentStep)
        }
        const newPoint = {
            x: x, y: y, width: 20, height: 20,
            axis: axisAttr,
            value: point[valueKey],
            axisLabel: axis.label,
            valueLabel: valueLabel,
            color: valueColor
        }
        newPoints.push(newPoint)
        layerOne.beginPath()
        if (index > 0)
            layerOne.moveTo(newPoints[index - 1].x, newPoints[index - 1].y);
        layerOne.lineTo(x, y);
        layerOne.stroke();
        layerOne.closePath()

        layerOne.beginPath()
        layerOne.arc(x, y, onHover ? 10 : 4, 0, Math.PI * 2, false)
        layerOne.fillStyle = valueColor
        layerOne.fill()
        layerOne.closePath()

    }

    const runIncrement = (method) => {
        const increment = placement.radius / (iterations.length - 1)
        let currentIncrement = 0

        for (let i = 0; i < iterations.length; i++) {
            method(currentIncrement, i)
            currentIncrement += increment
        }
    }
    const drawChart = (onHover = undefined) => {
        layerOne.clearAll()

        let step = 2 * Math.PI / data.length,
            shift = (data.length % 2 ? -1 : 1) * (data.length / 2) * Math.PI / data.length
        layerOne.lineWidth = 2

        let allPoints = []

        values.filter(v => !v.hidden).forEach((valueObj, vi) => {
            let newPoints = []
            data.forEach((point, index) => {
                drawValue(index, step, shift, point, valueObj.field, valueObj.label, valueObj.hexColor, vi, newPoints, onHover !== undefined ? points[onHover].value === point[valueObj.field] && points[onHover].axis === point[axis.field] : false)
            })

            // FILL
            layerOne.beginPath()
            layerOne.fillStyle = hexToRgba(valueObj.hexColor, .3)
            newPoints.forEach(p => {
                layerOne.lineTo(p.x, p.y);
            })
            layerOne.fill()
            layerOne.closePath()
            // FILL
            // CONNECT-LAST-LINE
            layerOne.beginPath()
            layerOne.moveTo(newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);
            layerOne.lineTo(newPoints[0].x, newPoints[0].y);
            layerOne.stroke();
            layerOne.closePath()
            // CONNECT-LAST-LINE
            allPoints.push(...newPoints)
        })


        // POINTS
        if (points.length === 0)
            setPoints(allPoints.map(p => {
                return {...p, x: p.x - 10, y: p.y - 10}
            }))
    }

    useEffect(() => {
        if (layerZero && placement) {
            layerZero.clearAll()
            layerZero.defaultFont()
            let step = 2 * Math.PI / data.length,
                shift = (data.length % 2 ? -1 : 1) * (data.length / 2) * Math.PI / data.length
            data.map((d, index)=> {

                let currentStep = index * step + shift;
                const px = placement.cx + (placement.radius * 1.1) * Math.cos(currentStep),
                    py = placement.cy + (placement.radius * 1.1 - 4) * Math.sin(currentStep)
                layerZero.fillStyle = theme.themes.fabric_color_tertiary
                layerZero.fillText(d[axis.field], px - d[axis.field].length * 4, py + 4)

            })

            layerZero.lineWidth = 1
            runIncrement((currentIncrement, i) => {
                layerZero.polygon(theme.themes.fabric_border_secondary, data.length, placement.cx, placement.cy, currentIncrement, i === iterations.length - 1)
            })
            runIncrement((currentIncrement, i) => {
                if (i > 0) {
                    const value = `${iterations[iterations.length - i - 1]}`
                    const px = placement.cx - value.length * 4, py = placement.cy - currentIncrement + 8
                    layerZero.fillStyle = theme.themes.fabric_background_primary
                    layerZero.fillRect(px - value.length, py - 11, value.length * 10, 14)

                    layerZero.fillStyle = theme.themes.fabric_color_tertiary
                    layerZero.fillText(value, px, py)
                }
            })
        }
    }, [width, height, layerZero, placement, totals])

    useEffect(() => {
        if (layerOne && width !== undefined && placement !== undefined) {
            layerOne?.defaultFont()
            drawChart()
        }
        layerOne?.canvas.parentNode.addEventListener('mousemove', handleMouseMove)
        layerOne?.canvas.parentNode.addEventListener('mouseout', handleMouseOut)
        return () => {
            layerOne?.canvas.parentNode.removeEventListener('mousemove', handleMouseMove)
            layerOne?.canvas.parentNode.removeEventListener('mouseout', handleMouseOut)
        }
    }, [totals, width, height, theme, points, placement])

}


// useRadarChart.propTypes =