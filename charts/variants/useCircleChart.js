import React, {useEffect, useMemo, useState} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import onHoverPieSlice from "../events/onHoverPieSlice";
import PropTypes from "prop-types";
import useHover from "../hooks/useHover";
import randomColor from "../utils/color/randomColor";
import Circle from "../elements/circle/Circle";


export default function useCircleChart({
                                        donutRatio,
                                        variant,
                                        totals,
                                        points,
                                        setPoints,
                                        getLayer,
                                        data,
                                        axis,
                                        values,
                                        width,
                                        height
                                    }) {

    const [elements, setElements] = useState([])
    const visibleValues = useMemo(() => {
        return values.filter(b => !b.hidden)
    }, [values])

    const {layerOne, layerTwo} = useMemo(() => {
        return {layerOne: getLayer(0), layerTwo: getLayer(2)}
    }, [width, height])

    const ratio = useMemo(() => {
        return (donutRatio ? donutRatio : .7)
    }, [donutRatio])

    useHover(layerTwo, points, (event) => {
        onHoverPieSlice({
            ctx: layerTwo,
            event: event,
            points: points,
            drawChart: i => drawChart(i, true),
            placement: placement,
            variant: variant,
            ratioRadius: (variant === 'donut' ? (placement.radius * ratio / (visibleValues.length)) : placement.radius)
        })
    }, [elements])

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
        if (!isMouseEvent) {
            layerOne.clearAll()
            visibleValues.forEach((valueObj, vi) => {
                const circle = new Circle(slice => {
                        const r = ((currentRadius) / 2)
                        let tooltipX = Math.cos((slice.startAngle + slice.endAngle) / 2) * r * 1.5,
                            tooltipY = Math.sin((slice.startAngle + slice.endAngle) / 2) * r * 1.5

                        newPoints.push({
                            valueIndex: vi,
                            dataIndex: slice.index,
                            tooltipX: tooltipX + placement.cx,
                            tooltipY: tooltipY + placement.cy,
                            valueLabel: valueObj.label,
                            radius: currentRadius,
                            startAngle: slice.startAngle,
                            endAngle: slice.endAngle,
                            value: slice.data[valueObj.field],
                            axis: slice.data[axis.field],
                            toRemoveRadius: currentRadius - iteration
                        })
                    },
                    currentRadius,
                    currentRadius - iteration,
                    vi,
                    valueObj,
                    totals,
                    coloredData,
                    placement.cx,
                    placement.cy,
                    layerOne,
                )

                newInstances.push(circle)
                if (vi > 0)
                    newInstances[vi - 1].linkedTo.push(circle)

                circle.draw()
                currentRadius = currentRadius - iteration > 0 ? currentRadius - iteration : iteration
            })
            if (points.length === 0)
                setPoints(newPoints)
            if (elements.length === 0)
                setElements(newInstances)
        } else {
            elements.forEach(circle => {
                if (onHover && circle.valueIndex === onHover.valueIndex)
                    circle.handleSliceHover(onHover.dataIndex)
                else
                    circle.handleHoverExit()
            })
        }

    }

    useEffect(() => {
        if (layerOne && width !== undefined && placement !== undefined && totals.length > 0)
            drawChart()
    }, [totals, width, height, placement, elements])

    useEffect(() => {
        setElements([])
    }, [values])


}


useCircleChart.propTypes = {
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