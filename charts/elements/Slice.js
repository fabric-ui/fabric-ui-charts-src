import ease from "../utils/animations/ease";
import hexToRgba from "../utils/hexToRgba";

export default class Slice {
    animated = false

    constructor(radius, index, color, startAngle, endAngle, cx, cy, ctx, data) {
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.cx = cx
        this.cy = cy


        this.data = data
        this.ctx = ctx
        this.index = index
        this.color = color

        this.strokeStyle = ctx.getThemes().fabric_background_primary

    }

    hover() {
        this.endedHover = false

        // this.ctx.opacityTransition(this.color, 500, (c) => {
            this.draw(this.color, this.radius,  this.ctx.getThemes().fabric_border_secondary)
        // }, .75, 1)
    }

    hoverEnd() {
        this.draw(hexToRgba(this.color, 0.75), this.radius)
        this.endedHover = true
    }

    draw(color, radius, strokeStyle=this.strokeStyle) {
        this.ctx.clearArc(this.cx, this.cy, this.radius * 1.01, this.startAngle, this.endAngle)

        this.ctx.fillStyle = color

        this.ctx.lineWidth = 2

        this.ctx.strokeStyle = strokeStyle


        this.ctx.beginPath()
        this.ctx.moveTo(this.cx, this.cy)
        this.ctx.arc(this.cx, this.cy, radius, this.startAngle, this.endAngle, false)
        this.ctx.lineTo(this.cx, this.cy)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()


    }

    init(ts) {
        this.endedHover = true
        this.animated = true

        let start, previousTimeStamp,
            targetTimestamp = ts === 0 ? 0 : 500 + this.index * 50,
            currentRadius = 0

        const d = (elapsed) => {
            this.draw(hexToRgba(this.color, 0.75), currentRadius)
            currentRadius = ease(elapsed, 0, this.radius, targetTimestamp, 5)
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
            }
        }
        if (targetTimestamp > 0)
            requestAnimationFrame(step)
        else {
            currentRadius = this.radius
            d(-1)
        }
    }
}