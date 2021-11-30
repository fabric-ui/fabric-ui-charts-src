import React, {useEffect} from "react";
import PropTypes from 'prop-types'
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/line/useLineChart";
import useVerticalChart from "./variants/vertical/useVerticalChart";


export default function VerticalBarChart(props) {
    const {parentRef,ref, width, height} = useVerticalChart(props)

    return (
        <div ref={parentRef}  className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
            <h1 className={shared.title}>
                {props.title}
            </h1>
            <canvas ref={ref} width={width} height={height}/>
        </div>
    )
}
VerticalBarChart.propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,

    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string.isRequired
    }).isRequired,
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string.isRequired
    }).isRequired,

    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.oneOf(['line-chart'])
}
