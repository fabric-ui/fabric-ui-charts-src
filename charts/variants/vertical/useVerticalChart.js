import useChart from "../../hooks/useChart";
import React, {useState, useEffect} from "react";

import onMouseMove from "./onMouseMove";
import drawGrid from "./drawGrid";
import chartPropsTemplate from "../../templates/chartPropsTemplate";
import hexToRgba from "../../utils/hexToRgba";
import useAsyncMemo from "../../utils/useAsyncMemo";


export default function useVerticalChart(props) {
    let xBefore, yBefore
    const {
        points, setPoints, parentRef,
        theme, biggest, ref, iterations,
        labelSpacing, context,
        clearCanvas, width, height
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
        onMouseMove: event => onMouseMove({
            ctx: context,
            event: event,
            points: points,
            drawChart: (onHover) => drawChart(context, true, onHover),
        })
    })

    const dimensions = useAsyncMemo(() => {
        const length = props.data.length
        const o = ref.current ? (ref.current.width - labelSpacing * 2) * .1 / length : 0
        const w = ref.current ? ((ref.current.width - labelSpacing * 1.75) / length) - o : 0

        return {offset: o, barWidth: w}
    }, [width, labelSpacing, ref.current])

    let [firstRender, setFirstRender] = useState(true)

    const drawChart = (ctx, clear, onHover) => {
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
        props.data.forEach((el, index) => {
            drawBar({
                axis: el[props.axis.field],
                value: el[props.value.field],
                context: ctx,
                position: index,
                onHover: onHover === index
            })
        })

    }

    const drawBar = ({axis, value, position, context, onHover}) => {
        const pVariation = (value * 100) / biggest
        const x = (position) * Math.abs(dimensions.barWidth) + labelSpacing * 1.25 + dimensions.offset * (position + 1)
        const y = ref.current.height - labelSpacing * 1.35
        const height = (pVariation * (ref.current.height - labelSpacing * 2.35)) / 100
        console.log(firstRender)
        if (points.length === 0)
            setPoints(prevState => {
                return [...prevState, {
                    x: x,
                    y: y,
                    x2: x + dimensions.barWidth,
                    y2: labelSpacing,
                    yPoint: y - height,
                    axis: axis,
                    value: value,
                    barWidth: dimensions.barWidth
                }]
            })
        const color = props.color ? props.color : '#0095ff'
        context.fillStyle = onHover ? hexToRgba(color, .9) : hexToRgba(color, .65)
        // if (firstRender)
        //     context.animatedRect({
        //         placement: {x: x, y: y},
        //         dimensions: {
        //             initialHeight: 0,
        //             initialWidth: dimensions.barWidth,
        //             finalWidth: dimensions.barWidth,
        //             finalHeight: -height
        //         },
        //         animationTimestamp: 5000
        //     });
        // else
            context.fillRect(x, y,dimensions.barWidth, -height )
        context.fill();

        xBefore = x
        yBefore = y
    }

    useEffect(() => {
        if (context) {

            context.fillStyle = theme.themes.mfc_color_primary
            context.font = "600 14px Roboto";
            drawChart(context, true)
            setFirstRender(false)
        }
    }, [props.data, context, width, height, theme, firstRender])


    return {ref, width, height, parentRef}
}


useVerticalChart.propTypes = chartPropsTemplate
