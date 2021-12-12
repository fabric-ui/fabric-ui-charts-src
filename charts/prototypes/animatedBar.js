import hexToRgba from "../utils/hexToRgba";
import getEase from "../utils/getEase";

export default function animatedBar(initialWidth, initialHeight, width, height, x, y, timestamp, animDelay, color, onHover, onEnded) {
    let start, previousTimeStamp, targetTimestamp = timestamp + animDelay * 50
    let currentWidth = timestamp > 0 ? initialWidth : width, currentHeight = timestamp > 0 ? initialHeight : height, currentY = height - currentHeight + y

    const draw = (elapsed) => {
        this.clearRect(x -1, y -1, width + 2, height+ 2)

        this.fillStyle = onHover ? color : hexToRgba(color, .65)
        this.lineWidth = 1
        this.strokeStyle = color


        this.fillRect(x, currentY, currentWidth, currentHeight)
        // this.strokeRect(x, currentY, currentWidth, currentHeight)
        this.stroke()


        currentWidth = initialWidth === width || elapsed === 0 ? width : getEase(elapsed, 0, width, targetTimestamp, 5)
        currentHeight = initialHeight === height ? height : getEase(elapsed, 0,height, targetTimestamp, 5)

        currentY = height - currentHeight + y
    }

    const step = (t) => {
        if (start === undefined)
            start = t;
        const elapsed = t - start;
        if (previousTimeStamp !== t)
            draw(elapsed)
        if (targetTimestamp > elapsed) {
            previousTimeStamp = t
            requestAnimationFrame(step);
        } else {
            draw(elapsed)
            onEnded()
        }
    }
    if (timestamp > 0)
        requestAnimationFrame(step)
    else
        draw(targetTimestamp)
}


