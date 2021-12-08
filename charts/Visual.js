import PropTypes from "prop-types";
import React, {useContext} from "react";
import DashboardContext from "./DashboardContext";
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/useLineChart";
import useVerticalChart from "./variants/useVerticalChart";
import useHorizontalChart from "./variants/useHorizontalChart";
import usePieChart from "./variants/usePieChart";

function getHook(variant, params) {
    switch (variant) {
        case 'line':
            return useLineChart(params)
        case  'vertical-bar':
            return useVerticalChart(params)
        case  'horizontal-bar':
            return useHorizontalChart(params)
        case 'donut':
        case  'pie':
            return usePieChart(params)
        default:
            return {}
    }
}

export default function Visual(props) {
    const data = useContext(DashboardContext)
    const hook = getHook(props.variant, {
        data: data,
        variant: props.variant,
        axis: props.axis,
        value: props.value, ...props.styles
    })

    return (
        <div data-page={props.page ? `${props.page}` : '0'} ref={hook.parentRef}
             className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
            <h1 className={shared.title}>
                {props.title}
            </h1>
            <canvas ref={hook.ref} width={hook.width} height={hook.height}/>
        </div>
    )
}
Visual.propTypes = {
    page: PropTypes.number,
    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    title: PropTypes.string,
    styles: PropTypes.shape({
        donutRatio: PropTypes.number
    }),
    variant: PropTypes.oneOf(['line', 'vertical-bar', 'horizontal-bar', 'pie', 'donut'])
}