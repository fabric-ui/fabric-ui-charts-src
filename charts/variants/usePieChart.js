import useChart from "../hooks/useChart";
import React, {useEffect, useMemo} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import onHoverPieSlice from "../events/onHoverPieSlice";
import PropTypes from "prop-types";
import randomColor from "../utils/randomColor";


export default function usePieChart(props) {

    const {
        points, setPoints, parentRef,
        theme, ref, context,
        labelSpacing, totals,
        width, height
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        values: props.values,
    })

    const ratio = useMemo(() => {
        return (props.donutRatio ? props.donutRatio : .7)
    }, [props.donutRatio])

    const placement = useAsyncMemo(() => {
        if (width !== undefined && height !== undefined) {
            let cx = ref.current.width / 2
            let cy = ref.current.height / 2
            let radius = (cx > cy ? cy : cx) - 14

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
            ratioRadius: (props.variant === 'donut' ? (placement.radius*ratio/(props.values.length)) : placement.radius)
        })
    }
    const handleMouseOut = () => {
        drawChart()

    }

    const drawChart = (onHover = undefined) => {
        context.clearAll()

        const iteration = placement.radius / props.values.length
        let currentRadius = placement.radius, newPoints = []
        props.values.forEach((valueObj, vi) => {
            const filteredData = props.data.filter(e => e[valueObj.field] !== 0)

            let startAngle = 0
            context.clearArc(placement.cx, placement.cy, currentRadius, 0, Math.PI * 2)
            filteredData.forEach((point, index) => {
                    let tooltipY, tooltipX, endAngle = (point[valueObj.field] / totals[vi]) * (Math.PI * 2) + startAngle
                    const r = ((currentRadius) / 2)

                    tooltipY = Math.sin((startAngle + endAngle) / 2) * r * 1.5
                    tooltipX = Math.cos((startAngle + endAngle) / 2) * r * 1.5

                    const newPoint = {
                        value: point[valueObj.field],
                        color: valueObj.hexColor,
                        startAngle: startAngle,
                        endAngle: endAngle,
                        valueLabel: valueObj.label,
                        axis: point[props.axis.field],
                        radius: currentRadius,
                        tooltipX: tooltipX + placement.cx,
                        tooltipY: tooltipY + placement.cy,
                    }

                    if (points.length === 0)
                        newPoints.push(newPoint)
                    context.animateSlice(
                        theme.themes.fabric_background_primary,
                        newPoint,
                        placement.cx,
                        placement.cy,
                        context.animationEnded ? 0 : 500,
                        currentRadius,
                        onHover !== undefined ? points[onHover].value === point[valueObj.field] && points[onHover].axis === point[props.axis.field] : false,
                        index + vi,
                        () => {
                            // if (vi === 0) {
                            //     let deltaX, deltaY, theta, textAngle
                            //     const message = `${(newPoint.value * 100 / totals[vi]).toFixed(2)}%`
                            //     context.font = '600 14px Roboto'
                            //     context.fillStyle = theme.themes.fabric_color_quaternary
                            //     context.lineWidth = 2
                            //
                            //     theta = (newPoint.startAngle + newPoint.endAngle) / 2
                            //     textAngle = (theta * 180 / Math.PI)
                            //     deltaY = Math.sin(theta) * (currentRadius + 14) * 1.1
                            //     deltaX = Math.cos(theta) * (currentRadius + (textAngle > 90 && textAngle < 270 ? (message.length * 8) : 0)) * 1.1
                            //     context.fillText(message, (deltaX + placement.cx), deltaY + placement.cy)
                            //     context.closePath()
                            // }

                            if (index === filteredData.length - 1 && vi === props.values.length - 1) {
                                if (points.length === 0)
                                    setPoints(newPoints)
                                if (props.variant === 'donut')
                                    context.animatedArc(placement.cx, placement.cy, currentRadius * ratio, 0, Math.PI * 2, context.donutAnimationEnded ? 0 : 500, () => context.donutAnimationEnded = true)

                                context.animationEnded = true
                            }

                        })
                    startAngle = endAngle

                })

            currentRadius = currentRadius - iteration > 0 ? currentRadius - iteration : iteration
        })
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
    }, [totals, context, width, height, theme, points, placement])


    return {ref, width, height, parentRef}
}


usePieChart.propTypes = {
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