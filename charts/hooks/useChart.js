import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {ThemeContext} from "mfc-core";
import useDimensions from "./useDimensions";

const drawGrid = ({ctx, iterations, labelPadding, data, axisKey, element, color}) => {
    ctx.strokeStyle = '#e0e0e0'

    data.forEach((d, index) => {
        ctx.beginPath();
        let x
        x = (index * ((element.width - labelPadding * 2) / (data.length - 1))) + labelPadding * 1.5
        ctx.moveTo(x, labelPadding);
        ctx.lineTo(x, element.height - labelPadding );
        ctx.stroke();


        ctx.fillStyle = color
        ctx.fillText(d[axisKey], x - (d[axisKey].length * 8) / 2, element.height - 8);
    })
    iterations.forEach((i, index) => {
        ctx.beginPath();
        const y = (index * (element.height / iterations.length)) + labelPadding
        ctx.moveTo(labelPadding , y);
        ctx.lineTo(element.width - labelPadding/2, y);
        ctx.stroke();

        ctx.fillStyle = color
        ctx.fillText(i.value, 0, y + 4);
    })
}

const randomColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
}

const padding = 32

export default function useChart(props) {

    const {biggest, iterations} = useMemo(() => {
        let biggest
        let iterations = []
        props.data.forEach((e) => {
            if (biggest === undefined)
                biggest = parseInt(e[props.valueKey])
            else if (parseInt(e[props.valueKey]) > biggest)
                biggest = parseInt(e[props.valueKey])
        })

        let value = biggest
        let percent = Math.ceil(value * .2)
        let topValue = value - percent * 5

        if (topValue < 0) {
            topValue = topValue * (-1)
            value = value + topValue
            topValue = value - percent * 5
        }

        for (let i = 0; i < 6; i++) {
            iterations.push({
                value: (topValue > 0 ? topValue : value) - percent * (i)
            })
        }

        biggest = iterations[0].value
        return {biggest, iterations}
    }, [props.valueKey, props.data])

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

    const handleMouseMove = (event) => {
        const bBox = ref.current?.getBoundingClientRect()
        props.onMouseMove({
            x: event.clientX - bBox.left,
            y: event.clientY - bBox.top,
            width: bBox.width,
            height: bBox.height
        })
    }

    useEffect(() => {
        const ctx = ref.current?.getContext('2d')

        setContext(ctx)

        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
        }
    }, [])


    useEffect(() => {

        ref.current?.addEventListener('mousemove', handleMouseMove)
        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
        }
    }, [props.data, context, points])


    const grid = () => {
        if (context) {
            drawGrid({
                ctx: context,
                iterations: iterations,
                labelPadding: padding,
                data: props.data,
                axisKey: props.axisKey,
                element: ref.current,
                color: theme.themes.mfc_color_primary
            })
        }
    }
    const {width, height} = useDimensions(parentRef.current)


    useEffect(() => {
        if (points.length > 0)
            setPoints([])
    }, [width, height, props.data])

    return {
        parentRef, width, height,
        context, biggest, total,
        randomColor, points, setPoints,
        ref, theme, labelSpacing: padding + 3,
        drawGrid: grid, clearCanvas: () => context?.clearRect(0, 0, ref.current?.width, ref.current?.height)
    }
}

useChart.propTypes = {

    data: PropTypes.arrayOf(PropTypes.object).isRequired,

    valueKey: PropTypes.string.isRequired,
    axisKey: PropTypes.string.isRequired,
    onMouseMove: PropTypes.func.isRequired
}
