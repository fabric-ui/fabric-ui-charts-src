import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from "react";
import DashboardContext from "./hooks/DataContext";
import shared from "./styles/Charts.module.css";
import useLineChart from "./variants/useLineChart";
import useBarChart from "./variants/useBarChart";
import useCircleChart from "./variants/useCircleChart";
import useRadarChart from "./variants/useRadarChart";
import useData from "./hooks/useData";
import randomColor from "./utils/color/randomColor";
import useChart from "./hooks/useChart";
import {Button} from "@f-ui/core";


export default function Visual(props) {
  const getHook = (variant, params) => {
    switch (variant) {
      case 'line':
        return useLineChart(params)
      case  'horizontal-bar':
      case  'vertical-bar':
        return useBarChart(params)
      case 'donut':
      case  'pie':
        return useCircleChart(params)
      case 'radar':
        return useRadarChart(params)
      default:
        return
    }
  }
  const datasets = useContext(DashboardContext)
  const data = useData(datasets, props.axis.field)
  const [values, setValues] = useState(props.values)

  useEffect(() => {
    let res = []
    props.values.forEach(v => {
      if (v.hexColor !== undefined)
        res.push(v)
      else
        res.push({...v, hexColor: randomColor()})
    })

    setValues(res)

  }, [props.values])

  const hook = useChart({
    axisKey: props.axis.field,
    data: data,
    values: values,
    layers: 3
  })

  getHook(props.variant, {
    ...props.styles,
    ...hook,
    data: data,
    variant: props.variant,
    axis: props.axis,
    values: values
  })

  return (
    <div data-page={props.page ? `${props.page}` : '0'}
         className={[shared.wrapper, props.className].join(' ')} style={props.styles}>
      <h1 className={shared.title}>
        {props.title}
        {values.length > 0 ?
          <div className={shared.datasets}>
            {values.map((e, i) => (
              <Button
                disabled={!e.hidden && values.filter(v => !v.hidden).length === 1}
                styles={{opacity: e.hidden ? '.5' : '1'}}
                className={shared.datasetWrapper}
                onClick={() => setValues(prevState => {
                  let v = [...prevState]
                  v[i] = {...v[i], hidden: !v[i].hidden}

                  return v
                })}>
                <div className={shared.datasetLabel}>
                  {e.label}
                </div>
                <div className={shared.datasetIndicator} style={{background: e.hexColor}}/>
              </Button>
            ))}
          </div>
          : null}
      </h1>
      <div className={shared.canvasMountingPoint} ref={hook.wrapperRef}/>
    </div>
  )
}
Visual.propTypes = {
  page: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(
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
