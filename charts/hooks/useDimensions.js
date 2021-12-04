import React, {useEffect, useRef, useState} from "react";

export default function useDimensions(parent) {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    let resizeObs

    const callback = () => {
        setWidth(parent.offsetWidth - (parent.firstChild.offsetLeft - parent.offsetLeft) *2)
        const marginBottom = window.getComputedStyle(parent.firstChild, null).getPropertyValue('margin-bottom').replace('px', '')
        setHeight(parent.offsetHeight - parent.firstChild.offsetHeight - parseInt(marginBottom))


        console.log()
    }

    useEffect(() => {
        if (parent) {
            resizeObs = new ResizeObserver(callback)
            resizeObs.observe(parent)
        }
    }, [parent])

    return {width, height}
}