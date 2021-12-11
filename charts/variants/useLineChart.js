import useChart from "../hooks/useChart";
import React, {useEffect} from "react";
import onHover from "../events/onHover";
import PropTypes from "prop-types";


export default function useLineChart(props) {
    let xBefore, yBefore

    const drawLine = ({point, position, onHover, valueKey, valueColor, valueLabel}) => {
        const pVariation = (point[valueKey] * 100) / biggest
        const height = ((pVariation * (ref.current.height - labelSpacing * 1.35)) / 100)
        let x = (position * (ref.current.width - labelSpacing * 1.75 - 4) / (props.data.length - 1)) + labelSpacing * 1.35,
            y = ref.current.height - labelSpacing - height

        if (points.length === 0)
            setPoints(prevState => {
                return [...prevState, {
                    x: x - 10,
                    y: y - 10,
                    axis: point[props.axis.field],
                    value: point[valueKey],
                    axisLabel: props.axis.label,
                    valueLabel: valueLabel,
                    color: valueColor,
                    width: 20,
                    height: 20
                }]
            })

        context.strokeStyle = valueColor
        context.fillStyle = valueColor

        context.beginPath();
        context.arc(x, y, onHover ? 8 : 4, 0, 2 * Math.PI);
        context.fill();
        context.stroke();

        if (position > 0) {
            context.setLineDash([3, 3]);
            context.beginPath();
            context.moveTo(xBefore, yBefore);

            context.lineTo(x, y);
            context.stroke();
            context.setLineDash([]);
        }

        xBefore = x
        yBefore = y
    }

    const drawChart = (onHover) => {
        context.clearAll()
        context.grid({
            strokeStyle: theme.themes.fabric_border_secondary,
            variant: 'line',
            ctx: context,
            iterations: iterations,
            labelPadding: labelSpacing,
            data: props.data,
            element: ref.current,
            color: theme.themes.fabric_color_quaternary,
            axisKey: props.axis.field,
            width: ((ref.current.width - labelSpacing * 1.35) / (props.data.length)),
            offset: 0
        })
        props.values.map(valueObj => {
            props.data.forEach((el, index) => {
                drawLine({
                    point: el,
                    position: index,
                    onHover:  onHover !== undefined ? points[onHover].value === el[valueObj.field] && points[onHover].axis === el[props.axis.field] : false,
                    valueKey: valueObj.field,
                    valueColor: valueObj.hexColor,
                    valueLabel: valueObj.label
                })
            })
        })
    }

    const {
        points, setPoints, parentRef,
        theme, biggest, ref, iterations,
        labelSpacing, context,
        width, height
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        values: props.values
    })

    const handleMouseMove = (event) => {
        const bBox = ref.current?.getBoundingClientRect()

        onHover({
            variant: 'line',
            ctx: context,
            event: {
                x: event.clientX - bBox.left,
                y: event.clientY - bBox.top,
                width: bBox.width,
                height: bBox.height
            },
            points: points,
            drawChart: (onHover) => drawChart(onHover),
        })
    }

    useEffect(() => {
        if (context) {
            context.defaultFont()
            drawChart()
        }
        ref.current?.addEventListener('mousemove', handleMouseMove)
        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
        }
    }, [props.data, context, width, height, theme, points])


    return {ref, width, height, parentRef}
}


useLineChart.propTypes = {
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