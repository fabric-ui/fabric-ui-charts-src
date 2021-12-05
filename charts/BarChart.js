import React from "react";
import PropTypes from 'prop-types'
import shared from "./styles/Charts.module.css";
import useVerticalChart from "./variants/useVerticalChart";
import chartPropsTemplate from "./templates/chartPropsTemplate";
import useHorizontalChart from "./variants/useHorizontalChart";


export default function BarChart(props) {
    const {
        parentRef,
        ref,
        width,
        height
    } = props.variant === 'vertical' ? useVerticalChart(props) : useHorizontalChart(props)

    return (
        <div ref={parentRef} className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
            <h1 className={shared.title}>
                {props.title}
            </h1>
            <canvas ref={ref}  width={width} height={height}/>
        </div>
    )
}
BarChart.propTypes = {
    ...chartPropsTemplate,
    variant: PropTypes.oneOf(['vertical', 'horizontal'])
}