import getEase from "../utils/getEase";
import hexToRgba from "../utils/hexToRgba";

export default class Slice {
    animated = false

    constructor(radius, index, color, startAngle, endAngle, cx, cy, ctx, strokeStyle) {
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.cx = cx
        this.cy = cy

        this.ctx = ctx
        this.index = index
        this.color = color

        this.strokeStyle = strokeStyle
    }

    animationListener({type}) {
        switch (type) {
            case 'hover': {
                if (this.endedHover) {
                    this.endedHover = false
                    this.draw(this.color, this.radius)
                }
                break
            }
            case 'hover-end': {
                this.draw(hexToRgba(this.color, 0.75), this.radius)
                this.endedHover = true
                this.ctx.lineWidth = 2
                this.ctx.strokeStyle = this.strokeStyle

                break
            }
            case 'init': {
                this.init(() => {}, 0, this.radius, 500)
                break
            }
            case 'update': {
                this.draw(hexToRgba(this.color, 0.75), this.radius)
                break
            }
            default: {
                break
            }
        }
    }


    draw(color, radius){
        this.ctx.clearArc(this.cx, this.cy, this.radius, this.startAngle, this.endAngle)

        this.ctx.fillStyle = color

        this.ctx.lineWidth = 2

        this.ctx.strokeStyle = this.strokeStyle


        this.ctx.beginPath()
        this.ctx.moveTo(this.cx, this.cy)
        this.ctx.arc(this.cx, this.cy, radius, this.startAngle, this.endAngle, false)
        this.ctx.lineTo(this.cx, this.cy)
        this.ctx.closePath()

        this.ctx.fill()
        this.ctx.stroke()
    }

    init(onAnimationEnd, initialRadius, finalRadius, timestamp, isBackwards) {
        this.endedHover = true
        this.animated = true
        let start, previousTimeStamp,
            targetTimestamp = timestamp === 0 ? 0 : timestamp + this.index * 50,
            currentRadius = initialRadius

        const d = (elapsed) => {
            this.draw(hexToRgba(this.color, 0.75), currentRadius)
            currentRadius = getEase(isBackwards ? timestamp - elapsed : elapsed, initialRadius, isBackwards ? initialRadius - finalRadius : finalRadius, targetTimestamp, 5)
        }
        const step = (t) => {
            if (start === undefined)
                start = t;
            const elapsed = t - start;

            if (previousTimeStamp !== t) {
                d(elapsed)
            }
            if (timestamp > elapsed) {
                previousTimeStamp = t
                requestAnimationFrame(step);
            } else {
                currentRadius = finalRadius
                d(-1)
                onAnimationEnd()

            }
        }
        if (targetTimestamp > 0)
            requestAnimationFrame(step)
        else {
            currentRadius = finalRadius
            d(-1)
            onAnimationEnd()
        }
    }
}