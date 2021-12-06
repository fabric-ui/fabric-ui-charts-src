import React from "react";
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/useLineChart";
import chartPropsTemplate from "./templates/chartPropsTemplate";
import usePieChart from "./variants/usePieChart";


export default function PieChart(props) {
    const {parentRef, ref, width, height} = usePieChart(props)

    return (
        <div ref={parentRef} className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
            <h1 className={shared.title}>
                {props.title}
            </h1>
            <canvas ref={ref} width={width - 8} height={height}/>
        </div>
    )
}
PieChart.propTypes = chartPropsTemplate