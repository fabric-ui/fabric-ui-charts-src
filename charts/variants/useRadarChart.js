import useChart from "../hooks/useChart";
import React, {useEffect} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import PropTypes from "prop-types";
import hexToRgba from "../utils/hexToRgba";
import onHover from "../events/onHover";
import randomColor from "../utils/randomColor";


export default function useRadarChart(props) {

    const {
        points, setPoints, parentRef,
        theme, ref, context, iterations,
        total,
        width, height, biggest
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        values: props.values,
    })

    const placement = useAsyncMemo(() => {
        if (width !== undefined && height !== undefined) {
            let cx = ref.current.width / 2
            let cy = ref.current.height / 2
            let radius = ((cx > cy ? cy : cx) - cy * .3) * 1.25

            // console.log()
            return {cx, cy, radius}
        } else
            return undefined
    }, [width, height])


    const handleMouseMove = (event) => {
        const bBox = ref.current?.getBoundingClientRect()
        onHover({
            ctx: context,
            event: {
                x: event.clientX - bBox.left,
                y: event.clientY - bBox.top,
                width: bBox.width,
                height: bBox.height
            },
            points: points,
            drawChart: (onHover) => drawChart(onHover),
            placement: placement,
            variant: 'line'
        })
    }
    const handleMouseOut = () => {
        drawChart()
    }
    const drawValue = (index, step, shift, point, valueKey, valueLabel, valueColor, valueIndex, newPoints, onHover) => {
        context.strokeStyle = valueColor

        const pVariation = (point[valueKey]) / biggest

        let currentStep = index * step + shift;
        const axis = point[props.axis.field]

        if (valueIndex === 0) {
            const px = placement.cx + (placement.radius * 1.1) * Math.cos(currentStep),
                py = placement.cy + (placement.radius * 1.1 - 14) * Math.sin(currentStep)
            context.fillStyle = theme.themes.fabric_color_tertiary
            context.fillText(axis, px - axis.length * 4, py + 4)
        }
        const {x, y} = {
            x: placement.cx + (placement.radius * pVariation) * Math.cos(currentStep),
            y: placement.cy + (placement.radius * pVariation) * Math.sin(currentStep)
        }
        const newPoint = {
            x: x, y: y, width: 20, height: 20,
            axis: axis,
            value: point[valueKey],
            axisLabel: props.axis.label,
            valueLabel: valueLabel,
            color: valueColor
        }
        newPoints.push(newPoint)
        context.beginPath()
        if (index > 0)
            context.moveTo(newPoints[index - 1].x, newPoints[index - 1].y);
        context.lineTo(x, y);
        context.stroke();
        context.closePath()

        context.beginPath()
        context.arc(x, y, onHover ? 10 : 4, 0, Math.PI * 2, false)
        context.fillStyle = valueColor
        context.fill()
        context.closePath()

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
        context.clearAll()

        runIncrement((currentIncrement, i) => {
            context.polygon(theme.themes.fabric_border_secondary, props.data.length, placement.cx, placement.cy, currentIncrement, i === iterations.length-1)
        })
        runIncrement((currentIncrement, i) => {
            if (i > 0) {
                const value = `${iterations[iterations.length - i - 1]}`
                const px = placement.cx - value.length * 4, py = placement.cy - currentIncrement + 8
                context.fillStyle = theme.themes.fabric_background_primary
                context.fillRect(px - value.length, py - 11, value.length * 10, 14)

                context.fillStyle = theme.themes.fabric_color_tertiary
                context.fillText(value, px, py)
            }
        })

        let step = 2 * Math.PI / props.data.length,
            shift = (props.data.length % 2 ? -1 : 1) * (props.data.length / 2) * Math.PI / props.data.length
        context.lineWidth = 2

        let allPoints = []

        props.values.forEach((valueObj, vi) => {
            let newPoints = []
            props.data.forEach((point, index) => {
                drawValue(index, step, shift, point, valueObj.field, valueObj.label, valueObj.hexColor, vi, newPoints,  onHover ? points[onHover].value === point[valueObj.field] && points[onHover].axis === point[props.axis.field]: false )
            })

            // FILL
            context.beginPath()
            context.fillStyle = hexToRgba(valueObj.hexColor, .3)
            newPoints.forEach(p => {
                context.lineTo(p.x, p.y);
            })
            context.fill()
            context.closePath()
            // FILL
            // CONNECT-LAST-LINE
            context.beginPath()
            context.moveTo(newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);
            context.lineTo(newPoints[0].x, newPoints[0].y);
            context.stroke();
            context.closePath()
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

        if (context && width !== undefined && placement !== undefined) {
            context.defaultFont()
            drawChart()

            // if (context.animationEnded) {
            ref.current?.addEventListener('mousemove', handleMouseMove)
            ref.current?.addEventListener('mouseout', handleMouseOut)
            // }
        }

        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
            ref.current?.removeEventListener('mouseout', handleMouseOut)
        }
    }, [total, context, width, height, theme, points, placement])


    return {ref, width, height, parentRef}
}


useRadarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    variant: PropTypes.string,
    axis: PropTypes.object,
    values: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            hexColor: PropTypes.string
        })
    ).isRequired,
    styles: PropTypes.object
}