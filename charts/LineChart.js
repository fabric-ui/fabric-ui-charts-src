import React, {useEffect} from "react";
import PropTypes from 'prop-types'
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/line/useLineChart";


export default function LineChart(props) {
    const {parentRef, ref, width, height} = useLineChart(props)

    return (
        <div ref={parentRef} className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
            <h1 className={shared.title}>
                {props.title}
            </h1>

            {/*<div style={{display: 'flex'}}>*/}
            {/*    <label className={shared.horizontalLabel}>*/}
            {/*        {props.value.label}*/}
            {/*    </label>*/}
                <canvas ref={ref} width={width - 8} height={height}/>
            {/*</div>*/}
            {/*<label className={shared.label}>*/}
            {/*    {props.axis.label}*/}
            {/*</label>*/}
        </div>
    )
}
LineChart.propTypes = {
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
