import useChart from "../../hooks/useChart";
import React, {useEffect, useState} from "react";

import onMouseMove from "./onMouseMove";
import chartPropsTemplate from "../../templates/chartPropsTemplate";
import hexToRgba from "../../utils/hexToRgba";
import useAsyncMemo from "../../utils/useAsyncMemo";


export default function useHorizontalChart(props) {
    const {
        points, setPoints, parentRef,
        theme, biggest, ref, iterations,
        labelSpacing, context,
        clearCanvas, width, height
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
        variant: 'horizontal'
    })

    const handleMouseMove = (event) => {
        const bBox = ref.current?.getBoundingClientRect()
        onMouseMove({
            ctx: context,
            event: {
                x: event.clientX - bBox.left,
                y: event.clientY - bBox.top,
                width: bBox.width,
                height: bBox.height
            },
            points: points,
            drawChart: (onHover) =>
                drawChart(true, onHover),
        })
    }

    const dimensions = useAsyncMemo(() => {
        const length = props.data.length
        const o = ref.current ? (ref.current.height * 2 )/(length*length): undefined
        const h = ref.current ? ((ref.current.height - labelSpacing ) / length) - o : undefined
        props.data.forEach((el, index) => {
            getPoints({
                axis: el[props.axis.field],
                value: el[props.value.field],
                context: context,
                position: index,
                barHeight: h,
                offset: o
            })
        })
        return {offset: o, barHeight: h}
    }, [height, labelSpacing, ref.current])

    let [firstRender, setFirstRender] = useState(true)
    let calledFirstRender = false


    const drawChart = (clear, onHover) => {
        if (clear)
            clearCanvas()

        context.grid({
            variant: 'horizontal',
            iterations: iterations,
            labelPadding: labelSpacing,
            data: props.data,
            element: ref.current,
            color: theme.themes.fabric_color_quaternary,
            axisKey: props.axis.field,
            height: dimensions.barHeight,
            offset: dimensions.offset
        })

        const color = props.color ? props.color : '#0095ff'
        context.fillStyle = hexToRgba(color, .65)

        // if (points.length === 0)

        if (firstRender && !calledFirstRender && points.length > 0) {
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
                            height: dimensions.barHeight,
                            offset: dimensions.offset
                        }
                    )
                },
                0,
                dimensions.barHeight,
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

    const getPoints = ({axis, value, position, barHeight, offset}) => {
        const pVariation = (value * 100) / biggest
        const y = (position) * (Math.abs(barHeight) + offset)
        const width = (pVariation * (ref.current.width - labelSpacing * 1.75)) / 100

        setPoints(prevState => {
            return [...prevState, {
                x: labelSpacing * 1.35,
                y: y,

                axis: axis,
                value: value,
                width: width,
                height: barHeight
            }]
        })
    }

    useEffect(() => {
        if (context) {
            context.fillStyle = theme.themes.fabric_color_primary
            context.font = "600 14px Roboto";

            if (height && dimensions.barHeight)
                drawChart(true, undefined)
        }
        ref.current?.addEventListener('mousemove', handleMouseMove)
        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
        }

    }, [props.data, context, width, height, theme, firstRender, dimensions, points])


    return {ref, width, height, parentRef}
}


useHorizontalChart.propTypes = chartPropsTemplate
