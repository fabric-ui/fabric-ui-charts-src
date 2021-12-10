import useChart from "../hooks/useChart";
import React, {useEffect, useMemo} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import onHoverPieSlice from "../events/onHoverPieSlice";
import PropTypes from "prop-types";
import hexToRgba from "../utils/hexToRgba";
import onHover from "../events/onHover";
import animatedPolygon from "../prototypes/animatedPolygon";


export default function useRadarChart(props) {

    const {
        points, setPoints, parentRef,
        theme, ref, context, iterations,
        labelSpacing, total,
        width, height, randomColor, biggest
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
    })
    const color = randomColor()
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

    const drawChart = (onHover = undefined) => {
        context.clearAll()

        const increment = placement.radius * 1.5 / iterations.length
        let currentIncrement = 0

        for (let i = 0; i < iterations.length; i++) {
          context.polygon(theme.themes.fabric_border_secondary, props.data.length, placement.cx, placement.cy, currentIncrement)

            if (i > 0) {
                const value = `${iterations[iterations.length - i - 1]}`
                const px = placement.cx - value.length * 4, py = placement.cy - currentIncrement + 8
                context.fillStyle = theme.themes.fabric_background_primary
                context.fillRect(px-value.length, py - 11, value.length*10, 14)
                context.fillStyle = theme.themes.fabric_color_tertiary
                context.fillText(value,px , py)
            }

            currentIncrement += increment

        }


        let step = 2 * Math.PI / props.data.length,
            shift = (props.data.length % 2 ? -1 : 1) * (props.data.length / 2) * Math.PI / props.data.length

        context.strokeStyle = color
        context.lineWidth = 2
        let newPoints = []
        // context.animatedPolygon()
        props.data.forEach((point, index) => {
            const pVariation = (point[props.value.field]) / biggest
            let currentStep = index * step + shift;
            const axis = point[props.axis.field]

            const px = placement.cx + (placement.radius*1.5 ) * Math.cos(currentStep), py =  placement.cy + (placement.radius*1.5 - 32) * Math.sin(currentStep)
            context.fillStyle = theme.themes.fabric_color_tertiary
            context.fillText(axis, px - axis.length*4, py)

            const {x, y} = {
                x: placement.cx + (placement.radius * pVariation) * Math.cos(currentStep),
                y: placement.cy + (placement.radius * pVariation) * Math.sin(currentStep)
            }



            newPoints.push({
                x: x, y: y, width: 20, height: 20,
                axis: axis,
                value: point[props.value.field],
                axisLabel: props.axis.label,
                valueLabel: props.value.label,
                color: color
            })
            context.beginPath()
            if (index > 0)
                context.moveTo(newPoints[index - 1].x, newPoints[index - 1].y);
            context.lineTo(x, y);
            context.stroke();
            context.closePath()

            context.beginPath()
            context.arc(x, y, onHover === index ? 10 : 4, 0, Math.PI * 2, false)
            context.fillStyle = color
            context.fill()
            context.closePath()
        })


        // FILL
        context.beginPath()
        context.fillStyle = hexToRgba(color, .5)
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

        // POINTS
        if (points.length === 0)
            setPoints(newPoints.map(p => {
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

    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),

    data: PropTypes.arrayOf(PropTypes.object),

    donutRatio: PropTypes.number,
    variant: PropTypes.oneOf(['pie', 'donut']),

}
