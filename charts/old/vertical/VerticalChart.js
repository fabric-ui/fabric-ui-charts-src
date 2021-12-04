import React from "react";
import PropTypes from 'prop-types'
import useChart from "../../hooks/useChart";

import shared from "../../styles/Charts.module.css";
import Bar from "../../utils/Bar";

export default function VerticalChart(props) {

    const drawBar = ({axis, value, position, context}) => {
        const length = props.data.length - 1
        const width = ref.current.width / length
        const x = position * width
        const y = ref.current.height - 20
        const height = (((value * 100) / biggest) * (ref.current.height - ref.current.height * 0.1)) / 100

        const bar = new Bar({
            x: x,
            y: y,
            value: value,
            label: axis,
            color: randomColor(),
            width: width,
            height: -height
        })

        bar.draw(context)

        setPoints(prevState => {
            return [...prevState, {x: x, y: y, value: value}]
        })

        context.fillStyle = theme.themes.fabric_color_primary
        context.fillText(axis, x, ref.current.height);
    }

    const render = (context) => {
        if (context) {
            context.clearRect(0, 0, ref.current.width, ref.current.height);

            props.data.forEach((el, index) => {
                drawBar({
                    axis: el[props.axis.field],
                    value: el[props.value.field],
                    context: context,
                    position: index
                })
            })
        }
    }

    const {
        biggest,
        randomColor,
        ref,
        setPoints,
        theme
    } = useChart({
        render: render,
        data: props.data,
        valueKey: props.value.field
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
VerticalChart.propTypes = {
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
