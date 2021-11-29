import React from "react";
import PropTypes from 'prop-types'
import useChart from "../../hooks/useChart";
import shared from "../../styles/Charts.module.css";

export default function PieChart(props) {

    const render = (context) => {
        if (context) {
            context.clearRect(0, 0, ref.current.width, ref.current.height);

            let startAngle = 0

            let cx = ref.current.width / 2
            let cy = ref.current.height / 2
            let radius = (cx > cy ? cx : cy) - 20

            let newPoints = []
            props.data.forEach((el, index) => {
                const color = randomColor()
                context.fillStyle = color
                context.lineWidth = 1
                context.strokeStyle = color
                context.beginPath()

                let endAngle = (el[props.value.field] / total) * (Math.PI * 2) + startAngle
                newPoints.push({x: endAngle, y: startAngle, value: el[props.value.field]})

                context.moveTo(cx, cy)
                context.arc(cx, cy, radius, startAngle, endAngle, false)
                context.lineTo(cx, cy)
                context.fill()
                context.stroke()
                context.closePath()

                startAngle = endAngle
            })
            setPoints(newPoints)
        }
    }

    const {
        total,
        randomColor,
        ref,
        setPoints,
        theme
    } = useChart({
        data: props.data,
        valueKey: props.value.field,
        render: render
    })



    return (
        <div className={shared.wrapper}>
            <h1 className={shared.title}>
                {props.title}
            </h1>
            <canvas ref={ref} width={props.width} height={props.height}/>
        </div>
    )
}
PieChart.propTypes = {
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
