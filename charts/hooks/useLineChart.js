import useChart from "./useChart";
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import drawLineChart from "../variants/line/drawLineChart";
import onMouseMove from "../variants/line/onMouseMove";


export default function useLineChart(props) {



    const {
        points,
        setPoints,
        theme,
        biggest,
        ref,
        labelSpacing,
        context,
        drawGrid,
        clearCanvas,
        width, height
    } = useChart({
        valueLabel: props.value.label,
        axisLabel: props.axis.label,
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
        onMouseMove: event => onMouseMove({
            event: event, points: points,
            ctx: context,
            clear: true,
            data: props.data,
            drawLine: drawLine,
            drawGrid: drawGrid,
            clearCanvas: clearCanvas,
            axisKey: props.axis.field,
            valueKey: props.value.field
        })
    })



    useEffect(() => {
        if (context) {
            context.setLineDash([3, 3])
            context.fillStyle = theme.themes.mfc_color_primary
            context.font = "600 14px Roboto";
            drawLineChart({
                ctx: context,
                clear: true,
                data: props.data,
                drawLine: drawLine,
                drawGrid: drawGrid,
                clearCanvas: clearCanvas,
                axisKey: props.axis.field,
                valueKey: props.value.field
            })
        }
    }, [props.data, context, width, height, theme])


    return {ref, width, height}
}


useLineChart.propTypes = {
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
