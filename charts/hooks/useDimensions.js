import React, {useEffect, useRef, useState} from "react";

export default function useDimensions(parent) {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    let resizeObs

    const callback = () => {
        setWidth(parent.offsetWidth - (parent.firstChild.offsetLeft - parent.offsetLeft))
        setHeight(parent.offsetHeight - parent.firstChild.offsetHeight )
    }

    useEffect(() => {
        if (parent) {
            resizeObs = new ResizeObserver(callback)
            resizeObs.observe(parent)
        }
    }, [parent])

    return {width, height}
}