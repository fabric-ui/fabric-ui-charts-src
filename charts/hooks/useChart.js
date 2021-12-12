import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import useDimensions from "./useDimensions";
import ThemeContext from "../../../core/misc/context/ThemeContext";
import bar from "../prototypes/bar";
import roundRect from "../prototypes/roundRect";
import transition from "../prototypes/transition";
import drawGrid from "../utils/drawGrid";
import tooltip from "../prototypes/tooltip";

import animateSlice from "../prototypes/slice";
import arcEraser from "../prototypes/arcEraser";
import polygon from "../prototypes/polygon";
import animatedPolygon from "../prototypes/animatedPolygon";
import useLayeredCanvas from "./useLayeredCanvas";

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

    return {biggest: (nb), iterations}
}
export default function useChart({data, values, variant, layers}) {
    const [points, setPoints] = useState([])
    const theme = useContext(ThemeContext)
    const wrapperRef = useRef()
    const {newLayer, layer, contextLayers, updateDimensions} = useLayeredCanvas(wrapperRef.current, theme.themes.fabric_color_tertiary)
    const {width, height} = useDimensions(wrapperRef.current)

    const totals = useMemo(() => {
        let res = []
        values.forEach((v) => {
            res.push(data.reduce((t, el) => {
                return t + el[v.field]
            }, 0))
        })
        return res
    }, [data])

    const {biggest, iterations} = useMemo(() => {
        let current = {}
        values.forEach(value => {
            const c = getIterationCandidate(data, value.field, variant, height, width)

            if (current.biggest === undefined || c.biggest > current.biggest)
                current = c
        })
        return current
    }, [data, width, height])


    useEffect(() => {

        updateDimensions(wrapperRef.current)
        if (contextLayers === 0) {
            for (let i = 0; i < layers; i++)
                newLayer(wrapperRef.current)

            CanvasRenderingContext2D.prototype.baseFontColor = theme.themes.fabric_background_primary
        }
        if (points.length > 0)
            setPoints([])
    }, [width, height, data])


    return {
        iterations, biggest, totals,
        points, setPoints,
        wrapperRef, theme,
        labelSpacing: padding + 3,
        getLayer: layer,
        width, height
    }
}
