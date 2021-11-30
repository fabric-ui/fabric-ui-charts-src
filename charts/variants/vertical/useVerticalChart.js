import useChart from "../../hooks/useChart";
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import onMouseMove from "./onMouseMove";


export default function useVerticalChart(props) {
    let xBefore, yBefore

    const drawBar = ({axis, value, position, context}) => {
        const pVariation = (value * 100) / biggest

        const length = props.data.length
        const offset = (ref.current.width - labelSpacing * 2)*.1/length
        const width = ((ref.current.width - labelSpacing * 1.75) / length) - offset
        const x = (position) * Math.abs(width) + labelSpacing * 1.25 + offset * (position + 1)
        const y = ref.current.height - labelSpacing * 1.35
        const height = (pVariation * (ref.current.height - labelSpacing * 2.35)) / 100

        if (points.length === 0)
            setPoints(prevState => {
                return [...prevState, {
                    x: x,
                    y: y,
                    x2: x + width,
                    y2: y - height,
                    axis: axis,
                    value: value
                }]
            })


        context.fillStyle = props.color ? props.color : '#0095ff'
        // const h = ref.current.height - labelSpacing * 1.25
        // const w = ref.current.width - labelSpacing * 2
        context.fillRect(x, y, width, -height);
        context.fill();


        xBefore = x
        yBefore = y
    }

    const drawChart = (ctx, clear) => {
        if (clear)
            clearCanvas()
        drawGrid()
        props.data.forEach((el, index) => {
            drawBar({
                axis: el[props.axis.field],
                value: el[props.value.field],
                context: ctx,
                position: index
            })
        })
    }

    const {
        points, setPoints, parentRef,
        theme, biggest, ref,
        labelSpacing, context, drawGrid,
        clearCanvas, width, height
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
        onMouseMove: event => onMouseMove({
            ctx: context,
            event: event,
            points: points,
            drawChart: () => drawChart(context, true),
        })
    })

    useEffect(() => {
        if (context) {
            context.setLineDash([3, 3])
            context.fillStyle = theme.themes.mfc_color_primary
            context.font = "600 14px Roboto";
            drawChart(context, true)
        }
    }, [props.data, context, width, height, theme])


    return {ref, width, height, parentRef}
}


useVerticalChart.propTypes = {
    parentRef: PropTypes.element,
    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),

    data: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    legends: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    })),

    color: PropTypes.string
}
