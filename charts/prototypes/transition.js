import hexToRgba from "../utils/hexToRgba";
import getEase from "../utils/getEase";

export default function transition(backwards, color, timestamp, drawContent, finalOpacity=1, onAnimationEnd){
    let start, previousTimeStamp, currentOpacity = backwards ? 1 : 0

    const step = (t) => {
        if (start === undefined)
            start = t;
        const elapsed = t - start;
        const rgbaColor = hexToRgba(color, currentOpacity)

        if (previousTimeStamp !== t) {

            drawContent(rgbaColor)
            currentOpacity = getEase(elapsed, backwards ? 1 : 0, -finalOpacity, timestamp, 5)
        }
        if (timestamp > elapsed ) {
            previousTimeStamp = t
            requestAnimationFrame(step);

        } else {
            drawContent(rgbaColor)
            if(onAnimationEnd)
                onAnimationEnd()
        }

    }

    requestAnimationFrame(step)

}