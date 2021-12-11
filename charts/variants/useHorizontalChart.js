import useChart from "../hooks/useChart";
import React, {useEffect, useState} from "react";

import onHover from "../events/onHover";
import hexToRgba from "../utils/hexToRgba";
import useAsyncMemo from "../hooks/useAsyncMemo";
import PropTypes from "prop-types";


export default function useHorizontalChart(props) {
    const {
        points, setPoints, parentRef,
        theme, biggest, ref, iterations,
        labelSpacing, context,
         width, height
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
        variant: 'horizontal'
    })

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
            variant: 'horizontal'
        })
    }
    const handleMouseOut = () => {
        drawChart()
    }
    const dimensions = useAsyncMemo(() => {
        const length = props.data.length
        const o = ref.current ? (ref.current.height * 2) / (length * length) : undefined
        const h = ref.current ? ((ref.current.height - labelSpacing) / length) - o : undefined
        props.data.forEach((el, index) => {
            getPoints({point: el, position: index, barHeight: h, offset: o})
        })
        return {offset: o, barHeight: h}
    }, [height, labelSpacing, ref.current, width])

    let [firstRender, setFirstRender] = useState(true)
    let calledFirstRender = false

    const drawGrid = () => {

        context.grid({
            strokeStyle: theme.themes.fabric_border_secondary,
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
    }
    const drawChart = (onHover = undefined) => {

        context.clearAll()
        drawGrid()
        const color = props.color ? props.color : '#0095ff'
        context.fillStyle = hexToRgba(color, .65)

        if (firstRender && !calledFirstRender && points.length > 0) {
            calledFirstRender = true
            context.animatedRect(
                points,
                () => {
                    context.clearAll()
                    drawGrid()
                },
                0,
                dimensions.barHeight,
                500,
                () => setFirstRender(false),
                () => {
                    context.fillStyle = hexToRgba(props.color ? props.color : '#0095ff', .65)
                }
            )
        } else {
            context.clearAll()
            drawGrid()
            points.forEach((p, i) => {
                context.fillStyle = onHover === i ? hexToRgba(color, .9) : hexToRgba(color, .65)
                context.fillRect(p.x, p.y, p.width, p.height)
            })

        }
    }

    const getPoints = ({point, position, barHeight, offset}) => {
        const pVariation = (point[props.value.field] * 100) / biggest
        const y = (position) * (Math.abs(barHeight) + offset)
        const width = (pVariation * (ref.current.width - labelSpacing * 1.75)) / 100

        setPoints(prevState => {
            return [...prevState, {
                x: labelSpacing * 1.35,
                y: y,

                axis: point[props.axis.field],
                value: point[props.value.field],
                axisLabel: props.axis.label,
                valueLabel: props.value.label,
                width: width,
                height: barHeight
            }]
        })
    }

    useEffect(() => {

        if (context && dimensions.barHeight !== undefined) {
            context.defaultFont()
            drawChart()
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


useHorizontalChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    variant: PropTypes.string,
    axis: PropTypes.object,
    value: PropTypes.object,
    styles: PropTypes.object
}
