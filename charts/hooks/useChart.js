import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import useDimensions from "./useDimensions";
import ThemeContext from "../../../core/misc/context/ThemeContext";
import animatedRects from "../prototypes/animatedRects";
import roundRect from "../prototypes/roundRect";
import transition from "../prototypes/transition";
import grid from "../prototypes/grid";
import tooltip from "../prototypes/tooltip";

import animateSlice from "../prototypes/animatedSlices";
import animatedArc from "../prototypes/animatedArc";
import polygon from "../prototypes/polygon";
import animatedPolygon from "../prototypes/animatedPolygon";

const padding = 32
const getIterationCandidate = (data, valueKey, variant, height, width) => {
    let q, b = Math.max(...data.map(d => d[valueKey])), nb, k, iterations = []

    if (variant === 'horizontal')
        q = Math.round(width / 350)
    else
        q = Math.round(height / 100)

    k = Math.ceil(b / q)
    k = Math.ceil(k / q) * q
    nb = k * q

    let currentValue = nb
    for (let i = 0; i <= q; i++) {
        iterations.push(currentValue)
        currentValue -= k
    }
    console.log(nb, b, iterations)
    return {biggest: (nb), iterations}
}
export default function useChart(props) {
    const theme = useContext(ThemeContext)
    const parentRef = useRef()
    const ref = useRef()
    const [points, setPoints] = useState([])
    const [context, setContext] = useState()
    const totals = useMemo(() => {
        let res = []
        props.values.forEach((v) => {
            res.push(props.data.reduce((total, el) => {
                return total + el[v.field]
            }, 0))
        })
        return res
    }, [props.data])


    useEffect(() => {
        const ctx = ref.current?.getContext('2d')

        setContext(ctx)

        CanvasRenderingContext2D.prototype.roundRect = roundRect
        CanvasRenderingContext2D.prototype.defaultFont = function (color = theme.themes.fabric_color_primary) {
            this.fillStyle = color
            this.font = "500 14px Roboto";
        }
        CanvasRenderingContext2D.prototype.animatedRect = animatedRects
        CanvasRenderingContext2D.prototype.opacityTransition = transition
        CanvasRenderingContext2D.prototype.grid = grid
        CanvasRenderingContext2D.prototype.tooltip = tooltip
        CanvasRenderingContext2D.prototype.animateSlice = animateSlice
        CanvasRenderingContext2D.prototype.animatedArc = animatedArc
        CanvasRenderingContext2D.prototype.polygon = polygon
        CanvasRenderingContext2D.prototype.animatedPolygon = animatedPolygon
        CanvasRenderingContext2D.prototype.clearAll = function () {
            this.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
        CanvasRenderingContext2D.prototype.clearArc = function (cx, cy, radius, startAngle, endAngle) {
            this.globalCompositeOperation = 'destination-out'

            this.beginPath()
            // this.fillStyle = 'white'
            this.arc(cx, cy, radius, startAngle, endAngle, false)
            this.fill();
            this.closePath()

            this.globalCompositeOperation = 'source-over'
        }
    }, [])


    const {width, height} = useDimensions(parentRef.current)


    useEffect(() => {
        if (points.length > 0)
            setPoints([])
    }, [width, height, props.data])

    const {biggest, iterations} = useMemo(() => {
        let current = {}
        props.values.forEach(value => {
            const c = getIterationCandidate(props.data, value.field, props.variant, height, width)

            if(current.biggest === undefined || c.biggest > current.biggest)
                current = c
        })
        return current
    }, [props.valueKey, props.data, width, height])

    return {
        iterations,
        parentRef, width, height,
        context, biggest, totals,
        points, setPoints,
        ref, theme, labelSpacing: padding + 3
    }
}

useChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    values:PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            field: PropTypes.string,
            hexColor: PropTypes.string
        })
    ).isRequired,
    axisKey: PropTypes.string.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['horizontal', 'vertical'])
}
