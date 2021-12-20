import React, {useEffect, useMemo, useState} from "react";
import useAsyncMemo from "../hooks/useAsyncMemo";
import onHover from "../events/onHover";
import Radar from "../elements/radar/Radar";
import useHover from "../hooks/useHover";


export default function useRadarChart({
                                          iterations,
                                          biggest,
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

    const visibleValues = useMemo(() => {
        return values.filter(b => !b.hidden)
    }, [values])

    const {layerZero, layerOne, layerTwo} = useMemo(() => {
        return {layerZero: getLayer(0), layerOne: getLayer(1), layerTwo: getLayer(2)}
    }, [width, height])
    let [radars, setRadars] = useState()

    const placement = useAsyncMemo(() => {
        if (width !== undefined && height !== undefined) {
            let cx = layerZero.canvas.width / 2
            let cy = layerZero.canvas.height / 2
            let radius = ((cx > cy ? cy : cx) - cy * .3) * 1.25

            return {cx, cy, radius}
        } else
            return undefined
    }, [width, height])

    useHover(layerTwo, points, (event) => {
        onHover({
            ctx: layerTwo,
            event: event,
            points: points,
            placement: placement,
            variant: 'line',
            drawChart: drawChart
        })
    })

    const runIncrement = (method) => {
        const increment = placement.radius / (iterations.length - 1)
        let currentIncrement = 0

        for (let i = 0; i < iterations.length; i++) {
            method(currentIncrement, i)
            currentIncrement += increment
        }
    }

    const drawChart = (onHover = undefined) => {
        layerOne.clearAll()

        let current
        if (!radars) {
            current = new Radar({
                dataLength: data.length,
                radius: placement.radius,
                biggest: biggest,
                cx: placement.cx,
                cy: placement.cy,
                axisKey: axis.field,
                axisLabel: axis.label,
                valuesLength: visibleValues.length
            })
            setRadars(current)
        } else
            current = radars

        current.draw(layerOne, data, visibleValues, onHover, current.valuesLength !== visibleValues.length, ps => {
            if (points.length === 0)
                setPoints(ps.map(p => {
                    return {...p, x: p.x - 10, y: p.y - 10}
                }))
        })

        current.valuesLength = visibleValues.length
    }

    useEffect(() => {
        if (layerZero && placement) {
            layerZero.clearAll()
            layerZero.defaultFont()
            let step = 2 * Math.PI / data.length,
                shift = (data.length % 2 ? -1 : 1) * (data.length / 2) * Math.PI / data.length
            data.map((d, index) => {
                let currentStep = index * step + shift;
                const px = placement.cx + (placement.radius * 1.1) * Math.cos(currentStep),
                    py = placement.cy + (placement.radius * 1.1 - 4) * Math.sin(currentStep)
                layerZero.fillStyle = layerOne.getThemes().fabric_color_tertiary

                layerZero.font = "500 12px Roboto"
                layerZero.fillText(d[axis.field], px - d[axis.field].length * 4, py + 4)
            })

            layerZero.lineWidth = 1
            runIncrement((currentIncrement, i) => {
                layerZero.polygon(layerOne.getThemes().fabric_border_secondary, data.length, placement.cx, placement.cy, currentIncrement, i === iterations.length - 1)
            })
            runIncrement((currentIncrement, i) => {
                if (i > 0) {
                    const value = `${iterations[iterations.length - i - 1]}`
                    const px = placement.cx - value.length * 3.5, py = placement.cy - currentIncrement + 8

                    layerZero.font = "600 12px Roboto"
                    layerZero.fillStyle = layerOne.getThemes().fabric_background_primary
                    layerZero.fillRect(px - value.length, py - 11, value.length * 10, 14)

                    layerZero.fillStyle = layerOne.getThemes().fabric_color_tertiary
                    layerZero.fillText(value, px, py)
                }
            })
        }
    }, [width, height, layerZero, placement, totals])

    useEffect(() => {
        if (layerOne && width !== undefined && placement !== undefined) {
            layerOne?.defaultFont()
            drawChart()
        }
    }, [totals, width, height, placement])

}
