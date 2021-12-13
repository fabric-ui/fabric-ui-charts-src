import React, {useEffect, useMemo} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import onHoverPieSlice from "../events/onHoverPieSlice";
import PropTypes from "prop-types";
import useHover from "../hooks/useHover";


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
        let currentRadius = placement.radius, newPoints = []
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

                if (points.length === 0)
                    newPoints.push(newPoint)
                layerOne.animateSlice(
                    theme.themes.fabric_background_primary,
                    newPoint,
                    placement.cx,
                    placement.cy,
                    layerOne.animationEnded ? 0 : 500,
                    currentRadius,
                    onHover?.axis === point[axis.field] && onHover.value === point[valueObj.field],
                    index + vi,
                    () => {
                        if (index === filteredData.length - 1 && vi === visibleValues.length - 1) {
                            if (points.length === 0)
                                setPoints(newPoints)
                            if (variant === 'donut')
                                layerOne.animatedArc(placement.cx, placement.cy, currentRadius * ratio, 0, Math.PI * 2, layerOne.donutAnimationEnded ? 0 : 500, () => layerOne.donutAnimationEnded = true)

                            layerOne.animationEnded = true
                        }

                    })
                startAngle = endAngle

            })

            currentRadius = currentRadius - iteration > 0 ? currentRadius - iteration : iteration
        })
    }

    useEffect(() => {
        if (layerOne && width !== undefined && placement !== undefined) {
            layerOne.defaultFont()
            drawChart()
        }

    }, [totals, layerOne, width, height, theme, placement])

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