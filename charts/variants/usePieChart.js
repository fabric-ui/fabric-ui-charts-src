import useChart from "../hooks/useChart";
import React, {useEffect, useState} from "react";

import onMouseMove from "./onMouseMove";

import chartPropsTemplate from "../templates/chartPropsTemplate";
import hexToRgba from "../utils/hexToRgba";
import useAsyncMemo from "../utils/useAsyncMemo";
import onHoverPieSlice from "./onHoverPieSlice";
import animatedSlices from "../utils/animatedSlices";


export default function usePieChart(props) {

    const {
        points, setPoints, parentRef,
        theme, ref, context,
        labelSpacing, total,
        clearCanvas, width, height, randomColor
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
    })

    const placement = useAsyncMemo(() => {
        let cx = ref.current.width / 2
        let cy = ref.current.height / 2
        let radius = (cx > cy ? cy : cx) - cy * .3

        return {cx, cy, radius}
    }, [width, height])


    let [firstRender, setFirstRender] = useState(true)
    let calledFirstRender = false


    const handleMouseMove = (event) => {
        const bBox = ref.current?.getBoundingClientRect()
        onHoverPieSlice({
            labelSpacing: labelSpacing,
            ctx: context,
            event: {
                x: event.clientX - bBox.left,
                y: event.clientY - bBox.top,
                width: bBox.width,
                height: bBox.height
            },
            points: points,
            drawChart: (onHover) => drawChart(true, onHover),
            placement: placement
        })
    }
    const handleMouseOut = () => {
        drawChart(true)
    }

    const drawChart = (clear, onHover) => {
        if (clear)
            clearCanvas()

        if (points.length === 0) {
            let startAngle = 0, newPoints = []

            props.data.forEach((point, index) => {
                    let endAngle = (point[props.value.field] / total) * (Math.PI * 2) + startAngle
                    const color = points.length === 0 ? randomColor() : points[index].color

                    if (onHover === index || onHover === undefined)
                        newPoints.push({
                            value: point[props.value.field],
                            color: color,
                            startAngle: startAngle,
                            endAngle: endAngle,
                            valueLabel: props.value.label,
                            axis: point[props.axis.field],
                        })

                    startAngle = endAngle
                }
            )
            setPoints(newPoints)
        } else {

            context.animatedSlices(
                points,
                () => clearCanvas(),
                firstRender && !calledFirstRender ? 500 : 0,
                // 500,
                () => {
                    setFirstRender(false)

                },
                (point, radius) => {
                    let deltaX, deltaY, theta, textAngle
                    const message = `${point.axis}: ${(point.value * 100 / total).toFixed(2)}%`

                    context.fillStyle = point.color
                    context.lineWidth = 2
                    context.strokeStyle = theme.themes.fabric_background_primary

                    theta = (point.startAngle + point.endAngle) / 2
                    textAngle = (theta * 180 / Math.PI)
                    deltaY = Math.sin(theta) * (radius + 14) * 1.1
                    deltaX = Math.cos(theta) * (radius + (textAngle > 90 && textAngle < 270 ? (message.length * 8) : 0)) * 1.1
                    context.fillText(message, (deltaX + placement.cx), deltaY + placement.cy)
                    context.closePath()
                },
                placement.radius,
                placement.cx,
                placement.cy,
                onHover

            )
            calledFirstRender = true
        }
    }


    useEffect(() => {
        if (context) {
            context.defaultFont()
            drawChart(true, undefined)
        }

        ref.current?.addEventListener('mousemove', handleMouseMove)
        ref.current?.addEventListener('mouseout', handleMouseOut)
        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
            ref.current?.removeEventListener('mouseout', handleMouseOut)
        }
    }, [props.data, context, width, height, theme, firstRender, points])


    return {ref, width, height, parentRef}
}


usePieChart.propTypes = chartPropsTemplate
