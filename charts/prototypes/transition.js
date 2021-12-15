import hexToRgba from "../utils/hexToRgba";
import ease from "../utils/animations/ease";

export default function transition(color, timestamp, drawContent, initialOpacity=0, finalOpacity=1, onAnimationEnd){
    let start, previousTimeStamp, currentOpacity = initialOpacity

    const step = (t) => {
        if (start === undefined)
            start = t;
        const elapsed = t - start;
        const rgbaColor = hexToRgba(color, currentOpacity)

        if (previousTimeStamp !== t) {
            drawContent(rgbaColor)
            currentOpacity = ease(elapsed, finalOpacity + initialOpacity/2, -initialOpacity, timestamp, 5)
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