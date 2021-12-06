import useChart from "../hooks/useChart";
import React, {useEffect, useState} from "react";

import onMouseMove from "./onMouseMove";

import chartPropsTemplate from "../templates/chartPropsTemplate";
import hexToRgba from "../utils/hexToRgba";
import useAsyncMemo from "../utils/useAsyncMemo";
import onHoverPieSlice from "./onHoverPieSlice";


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
        let radius = (cx > cy ? cy : cx) - cy * .1

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

        let startAngle = 0
        let newPoints = []

        props.data.forEach((el, index) => {
            let endAngle, deltaX, deltaY, theta, newRadius = placement.radius
            const color = points.length === 0 ? randomColor() : points[index].color


            context.fillStyle = color
            context.lineWidth = 1
            context.strokeStyle = color
            context.beginPath()

            endAngle = (el[props.value.field] / total) * (Math.PI * 2) + startAngle
            if (points.length === 0)
                newPoints.push({
                    value: el[props.value.field],
                    color: color,
                    startAngle: startAngle,
                    endAngle: endAngle,
                    valueLabel: props.value.label,
                    axis: el[props.axis.field]
                })

            context.moveTo(placement.cx, placement.cy)
            context.arc(placement.cx, placement.cy, placement.radius, startAngle, endAngle, false)
            context.lineTo(placement.cx, placement.cy)
            context.fill()
            context.stroke()

            context.closePath()

            if (onHover === index) {
                context.beginPath()

                newRadius = newRadius * 1.05
                context.moveTo(placement.cx, placement.cy)
                context.arc(placement.cx, placement.cy, newRadius, startAngle, endAngle, false)
                context.lineTo(placement.cx, placement.cy)
                context.fill()
                console.log(theme.themes.fabric_background_primary)
                context.strokeStyle = theme.themes.fabric_background_primary
                context.stroke()
            }

            const message = `${el[props.axis.field]}: ${(el[props.value.field] * 100 / total).toFixed(2)}%`
            theta = (startAngle + endAngle) / 2
            deltaY = Math.sin(theta) * 1.05 * newRadius
            deltaX = Math.cos(theta) * 1.1 * newRadius

            context.fillText(message, deltaX + placement.cx, deltaY + placement.cy)

            context.closePath()
            startAngle = endAngle
        })

        if (points.length === 0)
            setPoints(newPoints)

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
