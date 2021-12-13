import hexToRgba from "../utils/hexToRgba";
import getEase from "../utils/getEase";

export default class Slice {
    animated = false
    animationStarted = false
    wasHovered = false

    constructor(radius, index, color, startAngle, endAngle, cx, cy) {
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.cx = cx
        this.cy = cy

        this.index = index
        this.color = color
        this.notHoveredColor = hexToRgba(color, .75)
    }
    animationQueue(ctx, strokeStyle){

    }
    draw(ctx, onHover = false, strokeStyle, onAnimationEnd) {

        if ((!this.animationStarted && !this.animated || this.animated && this.animationStarted)) {
            this.animationStarted = true
            const timestamp = this.animated ? 0 : 500
            let currentRadius = this.animated ? this.radius : 0
            let start, previousTimeStamp,
                targetTimestamp = timestamp === 0 ? 0 : timestamp + this.index * 50
            ctx.clearArc(this.cx, this.cy, this.radius * 100, this.startAngle, this.endAngle)

            const d = (elapsed) => {
                ctx.clearArc(this.cx, this.cy, this.radius * 100, this.startAngle, this.endAngle)
                ctx.lineWidth = 2
                ctx.strokeStyle = strokeStyle

                this.wasHovered = false
                ctx.beginPath()
                ctx.moveTo(this.cx, this.cy)
                ctx.arc(this.cx, this.cy, currentRadius, this.startAngle, this.endAngle, false)
                ctx.lineTo(this.cx, this.cy)

                ctx.fillStyle = onHover ? this.notHoveredColor : this.color
                ctx.fill()
                ctx.stroke()
                ctx.closePath()


                currentRadius = getEase(elapsed, 0, this.radius, targetTimestamp, 5)

                if (elapsed === -1) {
                    this.animated = true
                }
            }
            const step = (t) => {
                if (start === undefined)
                    start = t;
                const elapsed = t - start;
                if (previousTimeStamp !== t) {
                    d(elapsed)
                }
                if (targetTimestamp > elapsed) {
                    previousTimeStamp = t
                    requestAnimationFrame(step);
                } else {
                    currentRadius = this.radius
                    d(-1)
                    onAnimationEnd()
                }
            }
            if (targetTimestamp > 0)
                requestAnimationFrame(step)
            else {
                currentRadius = this.radius
                d(-1)
                onAnimationEnd()
            }
        }
    }
}