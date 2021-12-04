import React, {useEffect} from "react";
import PropTypes from 'prop-types'
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/line/useLineChart";
import useVerticalChart from "./variants/bar/vertical/useVerticalChart";
import chartPropsTemplate from "./templates/chartPropsTemplate";
import useHorizontalChart from "./variants/bar/horizontal/useHorizontalChart";


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