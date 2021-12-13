import React, {useEffect, useMemo, useState} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import onHoverPieSlice from "../events/onHoverPieSlice";
import PropTypes from "prop-types";
import useHover from "../hooks/useHover";
import Bar from "../elements/Bar";
import Slice from "../elements/Slice";


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
                                        height
                                    }) {
    const [slices, setSlices] = useState([])
    const visibleValues = useMemo(() => {
        return values.filter(b => !b.hidden)
    }, [values])

    const {layerOne, layerTwo} = useMemo(() => {
        return {layerOne: getLayer(1), layerTwo: getLayer(2)}
    }, [width, height])

    const ratio = useMemo(() => {
        return (donutRatio ? donutRatio : .7)
    }, [donutRatio])

    useHover(layerTwo, points, (event) => {
        onHoverPieSlice({
            ctx: layerTwo,
            event: event,
            points: points,
            drawChart: drawChart,
            placement: placement,
            variant: variant,
            ratioRadius: (variant === 'donut' ? (placement.radius * ratio / (visibleValues.length)) : placement.radius)
        })
    })

    const placement = useAsyncMemo(() => {
        if (width !== undefined && height !== undefined) {
            let cx = layerOne.canvas.width / 2
            let cy = layerOne.canvas.height / 2
            let radius = (cx > cy ? cy : cx) - 14

            return {cx, cy, radius}
        } else
            return undefined
    }, [width, height])



    const drawChart = (onHover = undefined) => {
        layerOne.clearAll()
        const iteration = placement.radius / visibleValues.length
        let newPoints = [], newInstances = [], currentRadius =placement.radius
        visibleValues.forEach((valueObj, vi) => {

            const filteredData = data.filter(e => e[valueObj.field] !== 0)
            let startAngle = 0

            layerOne.clearArc(placement.cx, placement.cy, currentRadius, 0, Math.PI * 2)
            filteredData.forEach((point, index) => {
                let tooltipY, tooltipX, endAngle = (point[valueObj.field] / totals[vi]) * (Math.PI * 2) + startAngle
                const r = ((currentRadius) / 2)

                tooltipY = Math.sin((startAngle + endAngle) / 2) * r * 1.5
                tooltipX = Math.cos((startAngle + endAngle) / 2) * r * 1.5

                const newPoint = {
                    value: point[valueObj.field],
                    color: valueObj.hexColor,
                    startAngle: startAngle,
                    endAngle: endAngle,
                    valueLabel: valueObj.label,
                    axis: point[axis.field],
                    radius: currentRadius,
                    tooltipX: tooltipX + placement.cx,
                    tooltipY: tooltipY + placement.cy,
                }

                const instance = slices.length === 0 ? new Slice(currentRadius, index, valueObj.hexColor, startAngle, endAngle, placement.cx, placement.cy) : slices[vi + index]

                if (slices.length === 0)
                    newInstances.push(instance)
                else {

                    instance.radius = placement.radius
                    instance.cx = placement.cx
                    instance.cy = placement.cy
                    instance.startAngle = startAngle
                    instance.endAngle = endAngle
                }

                instance.draw(layerOne, onHover && onHover?.axis === point[axis.field] && onHover.value === point[valueObj.field], theme.themes.fabric_background_primary, () => {
                    if (index === filteredData.length - 1 && vi === visibleValues.length - 1) {
                        if (variant === 'donut')
                            layerOne.animatedArc(placement.cx, placement.cy, currentRadius * ratio, 0, Math.PI * 2, instance.donutAnimationEnded ? 0 : 500, () => instance.donutAnimationEnded = true)
                    }
                })
                startAngle = endAngle
                newPoints.push(newPoint)

            })
            currentRadius = currentRadius - iteration > 0 ? currentRadius - iteration : iteration
        })

        if (points.length === 0)
            setPoints(newPoints)
        if (slices.length === 0)
            setSlices(newInstances)
    }

    useEffect(() => {
        if (layerOne && width !== undefined && placement !== undefined) {
            layerOne.defaultFont()
            drawChart()
        }

    }, [totals, layerOne, width, height, theme, placement, slices])

    useEffect(() => {
        setSlices([])
        layerOne?.clearAll()
    }, [values])
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