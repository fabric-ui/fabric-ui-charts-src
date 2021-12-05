import React from "react";
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/line/useLineChart";
import chartPropsTemplate from "./templates/chartPropsTemplate";


export default function Chart(props) {
    const {ref, width, height} = useLineChart(props)

    return (
        <div className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
            <h1 className={shared.title}>
                {props.title}
            </h1>
            <canvas ref={ref} width={width - 8} height={height}/>
        </div>
    )
}
Chart.propTypes = chartPropsTemplate