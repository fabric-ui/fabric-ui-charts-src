import React, {useEffect, useState} from "react";

export default function useDimensions(target) {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    let resizeObs

    const callback = () => {
        setWidth(target.offsetWidth)
        setHeight(target.offsetHeight)
    }

    useEffect(() => {
        if (target) {
            resizeObs = new ResizeObserver(callback)
            resizeObs.observe(target)
        }
    }, [target])

    return {width, height}
}