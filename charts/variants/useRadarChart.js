import useChart from "../hooks/useChart";
import React, {useEffect, useMemo} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import onHoverPieSlice from "../events/onHoverPieSlice";
import PropTypes from "prop-types";


export default function useRadarChart(props) {

    const {
        points, setPoints, parentRef,
        theme, ref, context, iterations,
        labelSpacing, total,
        width, height, randomColor
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
    })

    const ratio = useMemo(() => {
        return (props.donutRatio ? props.donutRatio : .7)
    }, [props.donutRatio])

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
            drawChart: (onHover) => drawChart(onHover),
            placement: placement,
            variant: props.variant,
            ratio: ratio
        })
    }
    const handleMouseOut = () => {
        drawChart()
    }

    const drawChart = (onHover = undefined) => {
        context.clearAll()

        const increment = placement.radius*1.5 / iterations.length
        let currentIncrement = 0
        for (let i = 0; i < iterations.length; i++) {
            context.polygon(props.data.length, placement.cx, placement.cy, currentIncrement)
            currentIncrement += increment
        }
        // const filteredData = props.data.filter(e => e[props.value.field] !== 0)
        // let startAngle = 0, newPoints = []
        //
        // filteredData.forEach((point, index) => {
        //         let tooltipY, tooltipX, endAngle = (point[props.value.field] / total) * (Math.PI * 2) + startAngle
        //         const color = points.length === 0 ? randomColor() : points[index].color
        //         const r = ((placement.radius + (props.variant === 'donut' ? placement.radius * ratio : 0)) / 2)
        //
        //         tooltipY = Math.sin((startAngle + endAngle) / 2) * r * 1.1
        //         tooltipX = Math.cos((startAngle + endAngle) / 2) * r * 1.1
        //
        //         const newPoint = {
        //             value: point[props.value.field],
        //             color: color,
        //             startAngle: startAngle,
        //             endAngle: endAngle,
        //             valueLabel: props.value.label,
        //             axis: point[props.axis.field],
        //             tooltipX: tooltipX + placement.cx,
        //             tooltipY: tooltipY + placement.cy
        //         }
        //         if (points.length === 0)
        //             newPoints.push(newPoint)
        //         context.animateSlice(
        //             theme.themes.fabric_background_primary,
        //             newPoint,
        //             placement.cx,
        //             placement.cy,
        //             context.animationEnded ? 0 : 500,
        //             placement.radius,
        //             onHover === index,
        //             index,
        //             () => {
        //
        //                 let deltaX, deltaY, theta, textAngle
        //                 const message = `${(newPoint.value * 100 / total).toFixed(2)}%`
        //                 context.font = '600 14px Roboto'
        //                 context.fillStyle = theme.themes.fabric_color_quaternary
        //                 context.lineWidth = 2
        //
        //                 theta = (newPoint.startAngle + newPoint.endAngle) / 2
        //                 textAngle = (theta * 180 / Math.PI)
        //                 deltaY = Math.sin(theta) * (placement.radius + 14) * 1.1
        //                 deltaX = Math.cos(theta) * (placement.radius + (textAngle > 90 && textAngle < 270 ? (message.length * 8) : 0)) * 1.1
        //                 context.fillText(message, (deltaX + placement.cx), deltaY + placement.cy)
        //                 context.closePath()
        //
        //                 if (index === filteredData.length - 1) {
        //                     if (points.length === 0)
        //                         setPoints(newPoints)
        //                     if (props.variant === 'donut')
        //                         context.animatedArc(placement.cx, placement.cy, placement.radius * ratio, 0, Math.PI * 2, context.donutAnimationEnded ? 0 : 500, () => context.donutAnimationEnded = true)
        //
        //                 }
        //
        //                 context.animationEnded = true
        //             })
        //         startAngle = endAngle
        //     }
        // )
    }


    useEffect(() => {

        if (context && width !== undefined && placement !== undefined) {
            context.defaultFont()
            drawChart()

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
