import useChart from "../../hooks/useChart";
import React, {useState, useEffect} from "react";

import onMouseMove from "./onMouseMove";
import drawGrid from "./drawGrid";
import chartPropsTemplate from "../../templates/chartPropsTemplate";
import hexToRgba from "../../utils/hexToRgba";
import useAsyncMemo from "../../utils/useAsyncMemo";
import animatedRects from "../../utils/animatedRects";


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
            drawChart: (onHover) => drawChart(context, true, onHover),
        })
    }

    const dimensions = useAsyncMemo(() => {
        const length = props.data.length
        const o = ref.current ? (ref.current.width - labelSpacing * 2) * .1 / length : undefined
        const w = ref.current ? ((ref.current.width - labelSpacing * 1.75) / length) - o : undefined

        return {offset: o, barWidth: w}
    }, [width, labelSpacing, ref.current])

    let [firstRender, setFirstRender] = useState(true)
    let calledFirstRender = false
    const drawChart = (clear, onHover) => {
        if (clear)
            clearCanvas()

        drawGrid({
            ctx: context,
            iterations: iterations,
            labelPadding: labelSpacing,
            data: props.data,
            element: ref.current,
            color: theme.themes.mfc_color_quaternary,
            axisKey: props.axis.field,
            width: dimensions.barWidth,
            offset: dimensions.offset
        })

        const color = props.color ? props.color : '#0095ff'
        context.fillStyle = hexToRgba(color, .65)

        if (points.length === 0)
            props.data.forEach((el, index) => {
                getPoints({
                    axis: el[props.axis.field],
                    value: el[props.value.field],
                    context: context,
                    position: index
                })
            })
        else if (firstRender && !calledFirstRender) {
            calledFirstRender = true
            animatedRects(
                points.map(p => {
                    return {...p, width: p.barWidth}
                }),
                () => {
                    clearCanvas()
                    drawGrid({
                            ctx: context,
                            iterations: iterations,
                            labelPadding: labelSpacing,
                            data: props.data,
                            element: ref.current,
                            color: theme.themes.mfc_color_quaternary,
                            axisKey: props.axis.field,
                            width: dimensions.barWidth,
                            offset: dimensions.offset
                        }
                    )
                },
                dimensions.barWidth,
                0,
                500,

                context,
                () => setFirstRender(false),
                () => {
                    context.fillStyle = hexToRgba(props.color ? props.color : '#0095ff', .65)
                }
            )
        } else
            points.forEach((p, i) => {
                if (onHover === i)
                    context.fillStyle = onHover ? hexToRgba(color, .9) : hexToRgba(color, .65)

                context.fillRect(p.x, p.y, p.barWidth, p.height)
            })
    }

    const getPoints = ({axis, value, position}) => {
        const pVariation = (value * 100) / biggest
        const x = (position) * Math.abs(dimensions.barWidth) + labelSpacing * 1.25 + dimensions.offset * (position + 1)
        const y = ref.current.height - labelSpacing * 1.35
        const height = (pVariation * (ref.current.height - labelSpacing * 2.35)) / 100
        setPoints(prevState => {
            return [...prevState, {
                x: x,
                y: y,
                x2: x + dimensions.barWidth,
                y2: labelSpacing,
                yPoint: y - height,
                axis: axis,
                value: value,
                height: -height,
                barWidth: dimensions.barWidth
            }]
        })
    }

    useEffect(() => {
        if (context) {

            context.fillStyle = theme.themes.mfc_color_primary
            context.font = "600 14px Roboto";
            if (dimensions.barWidth !== undefined)
                drawChart(true)


        }
        ref.current?.addEventListener('mousemove', handleMouseMove)
        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
        }

    }, [props.data, context, width, height, theme, firstRender, dimensions, points])


    return {ref, width, height, parentRef}
}


useVerticalChart.propTypes = chartPropsTemplate
