import useChart from "../hooks/useChart";
import React, {useEffect, useState} from "react";

import onMouseMove from "./onMouseMove";

import chartPropsTemplate from "../templates/chartPropsTemplate";
import hexToRgba from "../utils/hexToRgba";
import useAsyncMemo from "../utils/useAsyncMemo";


export default function useVerticalChart(props) {

    const {
        points, setPoints, parentRef,
        theme, biggest, ref, iterations,
        labelSpacing, context,
        clearCanvas, width, height
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,

    })

    let [firstRender, setFirstRender] = useState(true)
    let calledFirstRender = false


    const handleMouseMove = (event) => {
        const bBox = ref.current?.getBoundingClientRect()
        onMouseMove({
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
            variant: 'vertical'
        })
    }
    const handleMouseOut = () => {
        drawChart(true)
    }
    const dimensions = useAsyncMemo(() => {
        const length = props.data.length
        const o = ref.current ? (ref.current.width * 2) / (length * length) : undefined
        const w = ref.current ? ((ref.current.width - labelSpacing * 1.5) / length) - o : undefined

        return {offset: o, barWidth: w}
    }, [width, labelSpacing, ref.current])

    const drawChart = (clear, onHover) => {
        if (clear)
            clearCanvas()

        context.grid({
            variant: 'vertical',
            iterations: iterations,
            labelPadding: labelSpacing,
            data: props.data,
            element: ref.current,
            color: theme.themes.fabric_color_quaternary,
            axisKey: props.axis.field,
            width: dimensions.barWidth,
            offset: dimensions.offset
        })

        const color = props.color ? props.color : '#0095ff'
        context.fillStyle = hexToRgba(color, .65)

        if (points.length === 0)
            props.data.forEach((point, index) => {
                getPoints({point: point, position: index})
            })
        else if (firstRender && !calledFirstRender) {
            calledFirstRender = true
            context.animatedRect(
                points,
                () => {
                    clearCanvas()
                    context.grid({
                        iterations: iterations,
                        labelPadding: labelSpacing,
                        data: props.data,
                        element: ref.current,
                        color: theme.themes.fabric_color_quaternary,
                        axisKey: props.axis.field,
                        width: dimensions.barWidth,
                        offset: dimensions.offset
                    })
                },
                dimensions.barWidth,
                0,
                500,
                () => setFirstRender(false),
                () => {
                    context.fillStyle = hexToRgba(props.color ? props.color : '#0095ff', .65)
                }
            )
        } else
            points.forEach((p, i) => {

                context.fillStyle = onHover === i ? hexToRgba(color, .9) : hexToRgba(color, .65)

                context.fillRect(p.x, p.y, p.width, p.height)
            })
    }

    const getPoints = ({point, position}) => {
        const pVariation = (point[props.value.field] * 100) / biggest
        const x = (position) * Math.abs(dimensions.barWidth) + labelSpacing * 1.25 + dimensions.offset + dimensions.offset * (position)

        const height = (pVariation * (ref.current.height - labelSpacing * 1.35)) / 100
        const y = ref.current.height - height - labelSpacing
        setPoints(prevState => {
            return [...prevState, {
                x: x,
                y: y,

                axis: point[props.axis.field],
                axisLabel: props.axis.label,
                value: point[props.value.field],
                valueLabel: props.value.label,
                height: height,
                width: dimensions.barWidth
            }]
        })
    }

    useEffect(() => {
        if (context && dimensions.barWidth !== undefined) {
            context.defaultFont()
            drawChart(true, undefined)
        }

        ref.current?.addEventListener('mousemove', handleMouseMove)
        ref.current?.addEventListener('mouseout', handleMouseOut)
        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
            ref.current?.removeEventListener('mouseout', handleMouseOut)
        }
    }, [props.data, context, width, height, theme, firstRender, dimensions, points])


    return {ref, width, height, parentRef}
}


useVerticalChart.propTypes = chartPropsTemplate
