import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {ThemeContext} from "mfc-core";
import useDimensions from "./useDimensions";

function animatedRect(
    {
        placement: {x, y},
        dimensions: {
            initialWidth,
            initialHeight,
            finalWidth,
            finalHeight
        },
        animationTimestamp,
        clear
    }
) {
    let currentDimensions = {width: initialWidth, height: initialHeight}
    const heightAdjustment = (finalHeight * 100 / animationTimestamp)
    const widthAdjustment = finalWidth / animationTimestamp
    let start, previousTimeStamp


    const step = (timestamp) => {

        if (start === undefined)
            start = timestamp;
        const elapsed = timestamp - start;

        if (previousTimeStamp !== timestamp) {
            clear()
            this.fillRect(x, y, currentDimensions.width, currentDimensions.height)
            this.fill()

            currentDimensions = {
                width: initialWidth !== finalWidth ? currentDimensions.width + widthAdjustment : currentDimensions.width,
                height: initialHeight !== finalHeight ? currentDimensions.height + heightAdjustment : currentDimensions.height
            }
            // console.log(currentDimensions)
        }
        if (elapsed < animationTimestamp) { // Stop the animation after 2 seconds
            previousTimeStamp = timestamp
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step)


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



    const {width, height} = useDimensions(parentRef.current)


    useEffect(() => {
        if (points.length > 0)
            setPoints([])
    }, [width, height, props.data])

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
    onMouseMove: PropTypes.func.isRequired
}
