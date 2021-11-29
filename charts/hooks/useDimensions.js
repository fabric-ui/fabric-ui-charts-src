import React, {useEffect, useRef, useState} from "react";

export default function useDimensions(element) {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    let resizeObs

    const callback = () => {
        console.log(element.parentNode.style.padding)
        setWidth(element.parentNode.offsetWidth - (element.parentNode.firstChild.offsetLeft - element.parentNode.offsetLeft))
        setHeight(element.parentNode.offsetHeight - element.parentNode.firstChild.offsetHeight)
    }

    useEffect(() => {
        if (element) {
            resizeObs = new ResizeObserver(callback)
            resizeObs.observe(element.parentNode)
        }
    }, [element])

    return {width, height}
}