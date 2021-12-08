import hexToRgba from "../utils/hexToRgba";
import getEase from "../utils/getEase";



export default function animateSlice(strokeStyle, slice, cx, cy, timestamp, targetRadius, isOnHover, index, onEnded) {
    let {startAngle, endAngle, color, radius} = {...slice}
    let start, previousTimeStamp, targetTimestamp = timestamp === 0 ? 0 : timestamp + index * 50
    if (radius === undefined)
        radius = 0

    const draw = (elapsed) => {
        this.clearArc(cx, cy, targetRadius * 100, startAngle, endAngle)

        this.fillStyle = !isOnHover ? hexToRgba(color, targetTimestamp && targetTimestamp !== 0 ? .75*elapsed/targetTimestamp : .75) : color
        console.log(targetTimestamp && targetTimestamp !== 0)
        this.lineWidth = 2
        this.strokeStyle = strokeStyle

        this.beginPath()

        this.moveTo(cx, cy)
        this.arc(cx, cy, radius, startAngle, endAngle, false)
        this.lineTo(cx, cy)
        this.fill()
        this.stroke()

        this.closePath()

        radius = getEase(elapsed, 0, targetRadius, targetTimestamp, 5)
    }
    const step = (t) => {
        if (start === undefined)
            start = t;
        const elapsed = t - start;
        if (previousTimeStamp !== t) {
            draw(elapsed)
        }
        if (targetTimestamp > elapsed) {
            previousTimeStamp = t
            requestAnimationFrame(step);
        } else {
            radius = targetRadius
            draw(targetTimestamp)
            onEnded()
        }
    }
    if (targetTimestamp > 0)
        requestAnimationFrame(step)
    else {
        radius = isOnHover ? targetRadius * 1.05 : targetRadius
        draw(targetTimestamp)
        onEnded()
    }
}