import PropTypes from "prop-types";
import React, {useContext, useMemo} from "react";
import DashboardContext from "./DashboardContext";
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/useLineChart";
import useVerticalChart from "./variants/useVerticalChart";
import useHorizontalChart from "./variants/useHorizontalChart";
import usePieChart from "./variants/usePieChart";
import useRadarChart from "./variants/useRadarChart";
import useData from "./hooks/useData";
import randomColor from "./utils/randomColor";

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
        case 'radar':
            return useRadarChart(params)
        default:
            return {}
    }
}

export default function Visual(props) {
    const datasets = useContext(DashboardContext)
    const data = useData(datasets, props.axis.field)
    const values = useMemo(() => {
        let res = []
        props.values.forEach(v => {
            if(v.hexColor !== undefined)
                res.push(v)
            else
                res.push({...v, hexColor: randomColor()})
        })

        return res
    }, [])
    const hook = getHook(props.variant, {
        data: data,
        variant: props.variant,
        axis: props.axis,
        values: values,
        ...props.styles
    })

    return (
        <div data-page={props.page ? `${props.page}` : '0'} ref={hook.parentRef}
             className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
            <h1 className={shared.title}>
                {props.title}
                {values.length > 0 ?
                    <div className={shared.datasets}>
                        {values.map(e => (
                            <div className={shared.datasetWrapper}>
                                <div className={shared.datasetLabel}>
                                    {e.label}
                                </div>
                                <div className={shared.datasetIndicator} style={{background: e.hexColor}}/>
                            </div>
                        ))}
                    </div>
                    : null}
            </h1>
            <canvas ref={hook.ref} width={hook.width} height={hook.height}/>
        </div>
    )
}
Visual.propTypes = {
    page: PropTypes.number.isRequired,
    values:PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            hexColor: PropTypes.string
        })
    ).isRequired,
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }).isRequired,
    title: PropTypes.string,
    styles: PropTypes.shape({
        donutRatio: PropTypes.number
    }),
    variant: PropTypes.oneOf(['radar', 'line', 'vertical-bar', 'horizontal-bar', 'pie', 'donut']).isRequired
}