import React, {useEffect, useMemo, useState} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import onHoverPieSlice from "../events/onHoverPieSlice";
import PropTypes from "prop-types";
import useHover from "../hooks/useHover";
import Slice from "../elements/Slice";
import randomColor from "../utils/randomColor";


export default function usePieChart({
                                        donutRatio,
                                        variant,
                                        totals,
                                        points,
                                        setPoints,
                                        theme,
                                        getLayer,
                                        data,
                                        axis,
                                        values,
                                        width,
                                        height,newLayer
                                    }) {
    let lastOnHover
    const [slices, setSlices] = useState([])
    const visibleValues = useMemo(() => {
        return values.filter(b => !b.hidden)
    }, [values])

    const {layerOne, layerTwo} = useMemo(() => {
        return {layerOne: getLayer(0), layerTwo: getLayer(2)}
    }, [width, height])
    const visualLayers = useAsyncMemo(() => {
        let r = []
        values.forEach((_, i) => {
            newLayer()
            r.push(getLayer(i))
        })

        return r
    }, [values])
    const ratio = useMemo(() => {
        return (donutRatio ? donutRatio : .7)
    }, [donutRatio])

    useHover(layerTwo, points, (event) => {
        onHoverPieSlice({
            ctx: layerTwo,
            event: event,
            points: points,
            drawChart: i => {
                if (lastOnHover || i)
                    drawChart(i, true)
            },
            placement: placement,
            variant: variant,
            ratioRadius: (variant === 'donut' ? (placement.radius * ratio / (visibleValues.length)) : placement.radius)
        })
    }, [slices])

    const placement = useAsyncMemo(() => {
        if (width !== undefined && height !== undefined) {
            let cx = layerOne.canvas.width / 2
            let cy = layerOne.canvas.height / 2
            let radius = (cx > cy ? cy : cx) - 14

            return {cx, cy, radius}
        } else
            return undefined
    }, [width, height])
    const coloredData = useMemo(() => {
        return data.map(d => {
            return {data: d, color: randomColor()}
        })
    }, [data])

    const drawChart = (onHover = undefined, isMouseEvent = false) => {

        const iteration = placement.radius / visibleValues.length
        let newPoints = [], newInstances = [], currentRadius = placement.radius
        visibleValues.forEach((valueObj, vi) => {
            const filteredData = coloredData.filter(e => e.data[valueObj.field] !== 0)
            let startAngle = 0
            const layer = visualLayers[vi]
            if(layer) {
                filteredData.forEach((point, index) => {
                    let instance
                    if (!isMouseEvent || points.length === 0 || slices.length === 0) {
                        let tooltipY, tooltipX,
                            endAngle = (point.data[valueObj.field] / totals[vi]) * (Math.PI * 2) + startAngle
                        const r = ((currentRadius) / 2)

                        tooltipY = Math.sin((startAngle + endAngle) / 2) * r * 1.5
                        tooltipX = Math.cos((startAngle + endAngle) / 2) * r * 1.5

                        const newPoint = {
                            value: point.data[valueObj.field],
                            color: point.color,
                            startAngle: startAngle,
                            endAngle: endAngle,
                            valueLabel: valueObj.label,
                            axis: point.data[axis.field],
                            radius: currentRadius,
                            tooltipX: tooltipX + placement.cx,
                            tooltipY: tooltipY + placement.cy,
                            valueIndex: vi
                        }

                        instance = slices.length === 0 || slices[vi + index] ? new Slice(currentRadius, index, point.color, startAngle, endAngle, placement.cx, placement.cy, layer, theme.themes.fabric_background_primary) : slices[vi + index]

                        if (slices.length === 0) {
                            newInstances.push(instance)
                        } else {

                            instance.radius = currentRadius
                            instance.cx = placement.cx
                            instance.cy = placement.cy
                            instance.startAngle = startAngle
                            instance.endAngle = endAngle
                        }

                        startAngle = endAngle
                        newPoints.push(newPoint)

                    } else
                        instance = slices[vi + index]

                    if (isMouseEvent) {

                        const isOnHover = onHover && onHover?.axis === point.data[axis.field] && onHover.value === point.data[valueObj.field]
                        if (isOnHover) {
                            instance.animationListener({type: 'hover', timestamp: 250})

                            lastOnHover = {...onHover, valueIndex: vi}
                        } else if (!instance.endedHover)
                            instance.animationListener({type: 'hover-end', timestamp: 250})


                    } else if (!isMouseEvent || points.length === 0 || slices.length === 0) {
                        console.log('U')
                        instance.animationListener({type: 'init', timestamp: 500})
                    }
                })

                layer.clearArc(placement.cx, placement.cy, currentRadius - iteration, 0, Math.PI * 2)
                currentRadius = currentRadius - iteration > 0 ? currentRadius - iteration : iteration



            }


        })

        if (points.length === 0)
            setPoints(newPoints)
        if (slices.length === 0)
            setSlices(newInstances)
    }

    useEffect(() => {
        if (layerOne && width !== undefined && placement !== undefined && visualLayers.length === values.length) {
            // layerOne.defaultFont()
            drawChart()
        }

    }, [totals, visualLayers, width, height, theme, placement])

    useEffect(() => {
        setSlices([])
        // layerOne?.clearAll()
    }, [values])

    useEffect(() => {
        console.log(points)
    }, [points])
}


usePieChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    variant: PropTypes.string,
    axis: PropTypes.object,
    values: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            hexColor: PropTypes.string
        })
    ).isRequired,
    styles: PropTypes.object
}