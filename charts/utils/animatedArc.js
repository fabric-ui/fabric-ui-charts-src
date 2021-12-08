import getEase from "./getEase";

export default function animatedArc(cx, cy, radius, startAngle, endAngle, timestamp, onEnded) {
    let start, previousTimeStamp

    const draw = (elapsed) => {
        this.clearArc(cx, cy,elapsed === timestamp ? radius :  getEase(elapsed, 0, radius, timestamp, 5), startAngle, endAngle)

    }
    const step = (t) => {
        if (start === undefined)
            start = t;
        const elapsed = t - start;
        if (previousTimeStamp !== t) {
            draw(elapsed)
        }
        if (timestamp > elapsed) {
            previousTimeStamp = t
            requestAnimationFrame(step);
        } else {
            onEnded()
            draw(timestamp)
        }
    }
    if (timestamp > 0)
        requestAnimationFrame(step)
    else
        draw(timestamp)

}