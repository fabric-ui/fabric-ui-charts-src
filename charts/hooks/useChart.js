import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import useDimensions from "./useDimensions";
import ThemeContext from "../../../core/misc/context/ThemeContext";
import animatedRects from "../prototypes/animatedRects";
import roundRect from "../prototypes/roundRect";
import transition from "../prototypes/transition";
import drawGrid from "../prototypes/drawGrid";
import canvasTooltip from "../canvasTooltip";

import animateSlice from "../prototypes/animatedSlices";
import animatedArc from "../prototypes/animatedArc";
import polygon from "../prototypes/polygon";

const randomColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
}

const padding = 32

export default function useChart(props) {
    const theme = useContext(ThemeContext)
    const parentRef = useRef()
    const ref = useRef()
    const [points, setPoints] = useState([])
    const [context, setContext] = useState()
    const total = useMemo(() => {
        return props.data.reduce((total, el) => {
            return total + el[props.valueKey]
        }, 0)
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
        CanvasRenderingContext2D.prototype.grid = drawGrid
        CanvasRenderingContext2D.prototype.tooltip = canvasTooltip
        CanvasRenderingContext2D.prototype.animateSlice = animateSlice
        CanvasRenderingContext2D.prototype.animatedArc = animatedArc
        CanvasRenderingContext2D.prototype.polygon = polygon
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
        let q, b = Math.max(...props.data.map(d => d[props.valueKey])), nb, k, iterations = []

        if (props.variant === 'horizontal')
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

        return {biggest: (nb ? nb : b), iterations}
    }, [props.valueKey, props.data, width, height])

    return {
        iterations,
        parentRef, width, height,
        context, biggest, total,
        randomColor, points, setPoints,
        ref, theme, labelSpacing: padding + 3,
        clearCanvas: () => context?.clearRect(0, 0, ref.current?.width, ref.current?.height)
    }
}

useChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    valueKey: PropTypes.string.isRequired,
    axisKey: PropTypes.string.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['horizontal', 'vertical'])
}
