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
        if (width !== undefined && height !== undefined) {
            let cx = ref.current.width / 2
            let cy = ref.current.height / 2
            let radius = (cx > cy ? cy : cx) - cy * .3

            // console.log()
            return {cx, cy, radius}
        } else
            return undefined
    }, [width, height])


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
        const filteredData = props.data.filter(e => e[props.value.field] !== 0)
        let startAngle = 0, newPoints = []

        filteredData.forEach((point, index) => {
                let tooltipY, tooltipX, endAngle = (point[props.value.field] / total) * (Math.PI * 2) + startAngle
                const color = points.length === 0 ? randomColor() : points[index].color


                tooltipY = Math.sin((startAngle + endAngle) / 2) * (placement.radius / 2) * 1.1
                tooltipX = Math.cos((startAngle + endAngle) / 2) * (placement.radius / 2) * 1.1

                const newPoint = {
                    value: point[props.value.field],
                    color: color,
                    startAngle: startAngle,
                    endAngle: endAngle,
                    valueLabel: props.value.label,
                    axis: point[props.axis.field],
                    tooltipX: tooltipX + placement.cx,
                    tooltipY: tooltipY + placement.cy
                }
                if (points.length === 0)
                    newPoints.push(newPoint)
                context.animateSlice(
                    theme.themes.fabric_background_primary,
                    newPoint,
                    placement.cx,
                    placement.cy,
                    context.animationEnded ? 0 : 500,
                    placement.radius,
                    onHover === index,
                    index,
                    () => {

                        let deltaX, deltaY, theta, textAngle
                        const message = `${newPoint.axis}: ${(newPoint.value * 100 / total).toFixed(2)}%`
                        context.font = '600 14px Roboto'
                        context.fillStyle = newPoint.color
                        context.lineWidth = 2

                        theta = (newPoint.startAngle + newPoint.endAngle) / 2
                        textAngle = (theta * 180 / Math.PI)
                        deltaY = Math.sin(theta) * (placement.radius + 14) * 1.1
                        deltaX = Math.cos(theta) * (placement.radius + (textAngle > 90 && textAngle < 270 ? (message.length * 8) : 0)) * 1.1
                        context.fillText(message, (deltaX + placement.cx), deltaY + placement.cy)
                        context.closePath()

                        if (index === filteredData.length - 1 && points.length === 0)
                            setPoints(newPoints)

                        context.animationEnded = true
                    })
                startAngle = endAngle
            }
        )


    }


    useEffect(() => {

        if (context && !isNaN(width) && width !== undefined && placement !== undefined) {
            context.defaultFont()
            drawChart(true, undefined)

            if (context.animationEnded) {
                ref.current?.addEventListener('mousemove', handleMouseMove)
                ref.current?.addEventListener('mouseout', handleMouseOut)
            }
        }

        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
            ref.current?.removeEventListener('mouseout', handleMouseOut)
        }
    }, [total, context, width, height, theme, points, placement])


    return {ref, width, height, parentRef}
}


usePieChart.propTypes = chartPropsTemplate
